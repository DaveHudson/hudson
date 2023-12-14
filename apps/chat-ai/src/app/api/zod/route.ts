import type { NextRequest } from "next/server";
import { StreamingTextResponse, type Message as VercelChatMessage } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import invariant from "tiny-invariant";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RunnableSequence } from "langchain/runnables";
import { HttpResponseOutputParser, StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

export type Answer = {
  message: VercelChatMessage;
  source: string;
};

export const runtime = "edge";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

export function combineDocuments(docs) {
  return docs.map((doc) => doc.pageContent).join("\n\n");
}

export async function POST(req: NextRequest) {
  const model = new ChatOpenAI({
    temperature: 0.3,
    // modelName: "gpt-4",
  });

  // const parser = new HttpResponseOutputParser();
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      answer: z.string().describe("answer to the user's question"),
      sources: z
        .array(z.string())
        .describe(
          "sources used to answer the question, should be blog post articles from https://applification.net/posts."
        ),
    })
  );

  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  // RAG
  const answerTemplate = `You are an AI designed to emulate the thoughts and views of Dave Hudson. Your responses should be in the first person, as if Dave himself is speaking. Use phrases like "In my view..." or "I believe...". 

  Your responses should be based solely on the context provided, which includes Dave's blog posts and his thoughts on various topics. If a question is asked that cannot be answered based on the context, respond with "I'm sorry, I don't have any views on that topic yet. Please feel free to email me at dave@applification.net for further discussion."
  
  Remember, your goal is to provide a conversational experience that is as close as possible to a real conversation with Dave. Do not invent or assume any views that are not explicitly stated in the context.
  
  Current conversation:
  {chat_history}
  
  Context: {context}

  question: {question}
  
  answer: {format_instructions}`;

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

  const context = await vectorStore.similaritySearch(currentMessageContent, 3);

  const chain = RunnableSequence.from([prompt, model, parser]);

  const response = await chain.invoke({
    chat_history: formattedPreviousMessages.join("\n"),
    context: combineDocuments(context),
    question: currentMessageContent,
    format_instructions: parser.getFormatInstructions(),
  });
  console.log("response", response);

  // const stream = await chain.stream({
  //   chat_history: formattedPreviousMessages.join("\n"),
  //   question: currentMessageContent,
  //   format_instructions: parser.getFormatInstructions(),
  // });

  return new Response(JSON.stringify(response));

  // const httpResponse = new Response(stream, {
  //   headers: {
  //     "Content-Type": "text/plain; charset=utf-8",
  //   },
  // });

  // return httpResponse;
}
