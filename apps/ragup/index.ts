import "dotenv/config";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const sbApiKey = process.env.SUPABASE_API_KEY as string;
const sbUrl = process.env.SUPABASE_URL as string;
const openAIApiKey = process.env.OPENAI_API_KEY as string;

if (!sbApiKey || !sbUrl || !openAIApiKey) {
  console.error("Environment variables not set");
  process.exit(1);
}

const loader = new DirectoryLoader("./corpus", {
  ".md": (path) => new TextLoader(path),
});

const docs = await loader.load();
console.log("num docs", docs.length);

const client = createClient(sbUrl, sbApiKey);

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
