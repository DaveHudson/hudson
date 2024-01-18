import "dotenv/config";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

const openAIApiKey = process.env.OPENAI_API_KEY as string;
const pineconeIndexName = process.env.PINECONE_INDEX_NAME as string;

if (!pineconeIndexName || !openAIApiKey) {
  console.error("Environment variables not set");
  process.exit(1);
}

const loader = new DirectoryLoader("./corpus", {
  ".md": (path) => new TextLoader(path),
});

const docs = await loader.load();
// console.log("num docs", docs.length);

const pinecone = new Pinecone();

const pineconeIndex = pinecone.Index(pineconeIndexName);

// For each document in docs, split into chunks useing RecursivieCharacterTextSplitter from LangChain
for (const doc of docs) {
  try {
    let text = doc.pageContent;
    const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
      chunkSize: 500,
      // separators: ["\n\n", "\n", " ", "", "##"], // default setting (## popular in markdown)
      chunkOverlap: 50,
    });

    const output = await splitter.createDocuments([text]);
    // console.log("Chunks", output);

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
