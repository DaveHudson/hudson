import invariant from "tiny-invariant";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";

export function combineDocuments(docs) {
  return docs.map((doc) => doc.pageContent).join("\n\n");
}

export async function getContext(message: string) {
  invariant(process.env.SUPABASE_URL, "Missing SUPABASE_URL");
  invariant(process.env.SUPABASE_SERVICE_ROLE_KEY, "Missing SUPABASE_SERVICE_ROLE_KEY");

  const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(new OpenAIEmbeddings(), {
    client,
    tableName: "documents",
    queryName: "match_documents",
  });

  const context = await vectorStore.similaritySearch(message, 3);

  const combinedContext = combineDocuments(context);

  return combinedContext;
}
