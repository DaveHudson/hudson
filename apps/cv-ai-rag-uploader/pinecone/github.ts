import { Pinecone } from "@pinecone-database/pinecone";
import "dotenv/config";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { v4 as uuidv4 } from "uuid";

const pineconeIndexName = process.env.PINECONE_INDEX_NAME as string;
const openAIApiKey = process.env.OPENAI_API_KEY as string;

if (!pineconeIndexName || !openAIApiKey) {
  console.error("Environment variables not set");
  process.exit(1);
}

const urls = [
  "https://github.com/DaveHudson/hudson",
  "https://github.com/DaveHudson/langserve-cv",
  "https://github.com/DaveHudson/turbo-prisma-remix",
];

for (const url of urls) {
  try {
    const loader = new GithubRepoLoader(url, {
      accessToken: process.env.GITHUB_ACCESS_TOKEN,
      branch: "main",
      recursive: true,
      unknown: "warn",
      ignorePaths: [
        "*.md",
        "*.mdx",
        "*.svg",
        "*.png",
        "*.avif",
        "*.ico",
        "*.excalidraw",
        "**/tsconfig.json",
        "**/postcss.config.js",
        "**/.eslintrc.js",
        "**/next-env.d.ts",
        "**/next.config.js",
        "**/.npmrc",
        "**/turbo.json",
        "**/tsup.config.ts",
        "**/package-lock.json",
        "**/.gitignore",
        "**/styles.css",
        "**/poetry.lock",
        "**/requirements.txt",
      ],
      maxConcurrency: 5,
    });

    const repos = await loader.load();
    // console.log(repos.length);
    // console.log({ docs });

    const pinecone = new Pinecone();
    const pineconeIndex = pinecone.Index(pineconeIndexName);

    // For each document in docs, split into chunks useing RecursivieCharacterTextSplitter from LangChain
    for (const doc of repos) {
      try {
        let text = doc.pageContent;
        let meta = doc.metadata;
        meta.id = uuidv4();
        meta.sourcetype = "github";
        // console.log("meta", meta);
        // console.log("source", meta.source);
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
          chunkSize: 5000,
          separators: ["\n\n", "\n", " ", ""], // default setting (## popular in markdown)
          chunkOverlap: 150,
        });

        const docs = await splitter.createDocuments([text]);
        console.log("Chunks", docs.length);

        for (const doc of docs) {
          doc.metadata = { ...meta };
        }

        // console.log("Chunks", docs);
        // upload chunks to Pinecone
        await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
          // @ts-expect-error
          pineconeIndex,
          maxConcurrency: 5,
        });
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
