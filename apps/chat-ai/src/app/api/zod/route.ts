import type { NextRequest } from "next/server";
import type { Message as VercelChatMessage } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { StringOutputParser } from "langchain/schema/output_parser";
import { PromptTemplate } from "langchain/prompts";
import invariant from "tiny-invariant";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RunnableSequence } from "langchain/runnables";
import { HttpResponseOutputParser } from "langchain/output_parsers";

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

export function combineDocuments(docs) {
  return docs.map((doc) => doc.pageContent).join("\n\n");
}

/*
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  /**
   * See a full list of supported models at:
   * https://js.langchain.com/docs/modules/model_io/models/
   */
  const model = new ChatOpenAI({
    temperature: 0.3,
    // modelName: "gpt-4",
  });

  const parser = new HttpResponseOutputParser();

  const now = Date.now();
  const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"];

  const timestamps = requestTimestamps.get(ip) || [];
  timestamps.push(now);

  // Only keep timestamps within the current rate limit window
  const recentTimestamps = timestamps.filter((timestamp: number) => now - timestamp < rateLimitWindow);

  requestTimestamps.set(ip, recentTimestamps);

  if (recentTimestamps.length > rateLimitMaxRequests) {
    // If the user has exceeded the rate limit, return an error
    return new Response("Too many requests", { status: 429 });
  }

  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  // Convert to question chain
  const standaloneQuestionTemplate =
    "Given a question, convert it to a standalone question. question: {question} standalone question:";
  const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

  const standaloneQuestionChain = RunnableSequence.from([standaloneQuestionPrompt, model, new StringOutputParser()]);

  const standaldoneQuestionResult = await standaloneQuestionChain.invoke({
    question: currentMessageContent,
  });
  // console.log("standaloneQuestionResult", standaldoneQuestionResult);

  // RAG
  const answerTemplate = `You are an AI designed to emulate the thoughts and views of Dave Hudson. Your responses should be in the first person, as if Dave himself is speaking. Use phrases like "In my view..." or "I believe...". 

  Your responses should be based solely on the context provided, which includes Dave's blog posts and his thoughts on various topics. If a question is asked that cannot be answered based on the context, respond with "I'm sorry, I don't have any views on that topic yet. Please feel free to email me at dave@applification.net for further discussion."
  
  Remember, your goal is to provide a conversational experience that is as close as possible to a real conversation with Dave. Do not invent or assume any views that are not explicitly stated in the context.
  
  Current conversation:
  {chat_history}
  
  Context: {context}
  
  question: {question}
  
  answer: `;

  // const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

  const prompt = PromptTemplate.fromTemplate(answerTemplate);

  /**
   * Chat models stream message chunks rather than bytes, so this
   * output parser handles serialization and encoding.
   */
  // const outputParser = new BytesOutputParser();

  invariant(process.env.SUPABASE_URL, "Missing SUPABASE_URL");
  invariant(process.env.SUPABASE_SERVICE_ROLE_KEY, "Missing SUPABASE_SERVICE_ROLE_KEY");

  const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(new OpenAIEmbeddings(), {
    client,
    tableName: "documents",
    queryName: "match_documents",
  });

  const context = await vectorStore.similaritySearch(standaldoneQuestionResult, 5);
  // console.log(context);

  const chain = RunnableSequence.from([prompt, model, parser]);

  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join("\n"),
    // context: context[0].pageContent,
    context: combineDocuments(context),
    question: standaldoneQuestionResult,
  });

  const httpResponse = new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });

  return httpResponse;
}
