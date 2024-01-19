import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";

const openAIApiKey = process.env.OPENAI_API_KEY as string;
const pineconeIndexName = process.env.PINECONE_INDEX_NAME as string;

if (!pineconeIndexName || !openAIApiKey) {
  console.error("Environment variables not set");
  process.exit(1);
}

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(pineconeIndexName);

const response = await pineconeIndex.deleteAll();
console.log("response", response);
