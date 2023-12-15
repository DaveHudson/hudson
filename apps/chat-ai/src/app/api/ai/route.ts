import type { NextRequest } from "next/server";
import type { Message } from "ai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { getContext } from "../../utils/getContext";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // * Get all messages from the request
  const { messages } = await req.json();

  // * Current message
  const currentMessageContent = messages[messages.length - 1].content;

  // * Get RAG context
  const context = await getContext(currentMessageContent);

  // * Create Prompt with context
  const prompt = [
    {
      role: "system",
      content: `You are an AI designed to emulate the thoughts and views of Dave Hudson. Your responses should be in the first person, as if Dave himself is speaking. Use phrases like "In my view..." or "I believe...". 
  Your responses should be based solely on the context provided, which includes Dave's blog posts and his thoughts on various topics. If a question is asked that cannot be answered based on the context, respond with "I'm sorry, I don't have any views on that topic yet. Please feel free to email me at dave@applification.net for further discussion."  
  Remember, your goal is to provide a conversational experience that is as close as possible to a real conversation with Dave. Do not invent or assume any views that are not explicitly stated in the context.
  Current conversation:
  {chat_history}  
  Context: ${context}
  question: {question}
  answer: `,
    },
  ];

  // * Send request to OpenAI
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [...prompt, ...messages.filter((message: Message) => message.role === "user")],
  });

  // * Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // * Respond with the stream
  return new StreamingTextResponse(stream);
}
