import { Pinecone } from "@pinecone-database/pinecone";
import "dotenv/config";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";

const pineconeIndexName = process.env.PINECONE_INDEX_NAME as string;
const openAIApiKey = process.env.OPENAI_API_KEY as string;

if (!pineconeIndexName || !openAIApiKey) {
  console.error("Environment variables not set");
  process.exit(1);
}

const url = "https://github.com/DaveHudson/hudson";
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
  ],
  maxConcurrency: 5,
});

const docs = await loader.load();
console.log(docs.length);
// console.log({ docs });

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(pineconeIndexName);

// For each document in docs, split into chunks useing RecursivieCharacterTextSplitter from LangChain
for (const doc of docs) {
  try {
    let text = doc.pageContent;
    let meta = doc.metadata;
    console.log("source", meta.source);
    const splitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
      chunkSize: 5000,
      separators: ["\n\n", "\n", " ", ""], // default setting (## popular in markdown)
      chunkOverlap: 150,
    });

    const output = await splitter.createDocuments([text]);
    console.log("Chunks", output.length);

    // upload chunks to Pinecone
    await PineconeStore.fromDocuments(output, new OpenAIEmbeddings(), {
      // @ts-expect-error
      pineconeIndex,
      maxConcurrency: 5,
    });
  } catch (err) {
    console.error(err);
  }
}
