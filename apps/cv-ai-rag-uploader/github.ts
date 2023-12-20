import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";

const sbApiKey = process.env.SUPABASE_API_KEY as string;
const sbUrl = process.env.SUPABASE_URL as string;
const openAIApiKey = process.env.OPENAI_API_KEY as string;

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

const client = createClient(sbUrl, sbApiKey);

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

    // upload chunks to Supabase
    await SupabaseVectorStore.fromDocuments(output, new OpenAIEmbeddings({ openAIApiKey }), {
      client,
      tableName: "documents",
    });
  } catch (err) {
    console.error(err);
  }
}
