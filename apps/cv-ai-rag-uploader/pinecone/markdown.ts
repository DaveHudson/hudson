import "dotenv/config";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { v4 as uuidv4 } from "uuid";

const openAIApiKey = process.env.OPENAI_API_KEY as string;
const pineconeIndexName = process.env.PINECONE_INDEX_NAME as string;

if (!pineconeIndexName || !openAIApiKey) {
  console.error("Environment variables not set");
  process.exit(1);
}

const loader = new DirectoryLoader("./corpus", {
  ".md": (path) => new TextLoader(path),
});

const files = await loader.load();
// console.log("num docs", docs.length);

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(pineconeIndexName);

// For each document in docs, split into chunks useing RecursivieCharacterTextSplitter from LangChain
for (const file of files) {
  try {
    let text = file.pageContent;
    let meta = file.metadata;
    meta.id = uuidv4();
    meta.sourcetype = "markdown";
    const trimmedSource = meta.source.substring(meta.source.lastIndexOf("/") + 1);
    meta.source = `https://github.com/DaveHudson/hudson/blob/main/apps/cv-ai-rag-uploader/corpus/${encodeURIComponent(
      trimmedSource
    )}`;
    // console.log("meta", meta);

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
      chunkSize: 1000,
      // separators: ["\n\n", "\n", " ", "", "##"], // default setting (## popular in markdown)
      chunkOverlap: 100,
    });

    const docs = await splitter.createDocuments([text]);

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
