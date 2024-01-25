/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import invariant from "tiny-invariant";

export function combineDocuments(docs: any[]) {
  return docs.map((doc) => doc.pageContent).join("\n\n");
}

type DocMetadata = {
  id: string;
  sourcetype: string;
  source: string;
  "loc.lines.form:"?: number;
  "loc.lines.to"?: number;
  respository?: string;
  branch?: string;
};

export function document_sources(docs: any[]) {
  const sources: DocMetadata[] = [];
  docs.map((doc) => {
    // console.log("doc", doc);
    const metadata = doc.metadata as DocMetadata;
    sources.push(metadata);
  });
  return sources;
}

export async function getContextPinecone(message: string) {
  invariant(process.env.PINECONE_INDEX_NAME, "Missing PINECONE_INDEX_NAME");
  invariant(process.env.PINECONE_HOST, "Missing PINECONE_HOST");

  const pinecone = new Pinecone();

  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME, process.env.PINECONE_HOST);

  const vectorStore = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings(), { pineconeIndex });

  // console.log("getting context...");
  const context = await vectorStore.similaritySearch(message, 3, {});
  // console.log(context);

  const sources = document_sources(context);
  // console.log(sources);

  const combinedContext = combineDocuments(context);
  // console.log(combinedContext);

  return {
    combinedContext,
    sources,
  };
}
