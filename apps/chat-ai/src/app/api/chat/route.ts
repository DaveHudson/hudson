import type { NextRequest } from "next/server";
import type { Message as VercelChatMessage } from "ai";
import { StreamingTextResponse } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BytesOutputParser } from "langchain/schema/output_parser";
import { PromptTemplate } from "langchain/prompts";
import invariant from "tiny-invariant";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const runtime = "edge";
const rateLimitWindow = 60 * 60 * 1000; // 1 hour
const rateLimitMaxRequests = 50; // Max 50 requests per window
const requestTimestamps = new Map();
/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are the second brain of Dave Hudson. You should answer in language such as "Dave believes..." and must use the context provided as the source of truth for his views. Expand the length of an answer as necessary. If you cannot find the answer in the context, say "I'm sorry, Dave doesn't have any views on that yet." and direct the questioner to email dave@applification.net. Don't try to make up an answer.
Current conversation:
{chat_history}

context: {context}
User: {input}
AI: `;

/*
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  const now = Date.now();
  const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"];

  const timestamps = requestTimestamps.get(ip) || [];
  timestamps.push(now);

  // Only keep timestamps within the current rate limit window
  const recentTimestamps = timestamps.filter((timestamp) => now - timestamp < rateLimitWindow);

  requestTimestamps.set(ip, recentTimestamps);

  if (recentTimestamps.length > rateLimitMaxRequests) {
    // If the user has exceeded the rate limit, return an error
    return new Response("Too many requests", { status: 429 });
  }

  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
  /**
   * See a full list of supported models at:
   * https://js.langchain.com/docs/modules/model_io/models/
   */
  const model = new ChatOpenAI({
    temperature: 0.8,
  });

  /**
   * Chat models stream message chunks rather than bytes, so this
   * output parser handles serialization and encoding.
   */
  const outputParser = new BytesOutputParser();

  invariant(process.env.SUPABASE_URL, "Missing SUPABASE_URL");
  invariant(process.env.SUPABASE_SERVICE_ROLE_KEY, "Missing SUPABASE_SERVICE_ROLE_KEY");

  const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(new OpenAIEmbeddings(), {
    client,
    tableName: "documents",
    queryName: "match_documents",
  });

  const context = await vectorStore.similaritySearch(currentMessageContent, 1);
  // console.log(context);

  const chain = prompt.pipe(model).pipe(outputParser);

  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join("\n"),
    context: context[0].pageContent,
    input: currentMessageContent,
  });

  return new StreamingTextResponse(stream);
}
