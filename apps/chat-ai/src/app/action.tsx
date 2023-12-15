"use server";

import OpenAI from "openai";
import type { Message } from "ai";
import { OpenAIStream, experimental_StreamingReactResponse } from "ai";
import { getContext } from "./utils/getContext";
import { extractJSON } from "./utils/extractJSON";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const RenderJson = ({ content }: { content: any }) => {
  const possibleJson = extractJSON(content);
  if (!possibleJson) return null;
  return (
    <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-md">
      <pre>{JSON.stringify(possibleJson, null, 2)}</pre>
    </div>
  );
};

export async function handler({ messages }: { messages: Message[] }) {
  // * Previous User Messages
  const userMessages = messages.filter((message: Message) => message.role === "user");

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
    messages: [...prompt, ...userMessages] as any,
  });

  // * Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // * Respond with the stream
  return new experimental_StreamingReactResponse(stream, {
    ui({ content }) {
      console.log("content", content);
      return (
        <div>
          {content}
          <div className="flex text-blue-500">Custom UI content rendered by the server</div>
          <RenderJson content={content} />
        </div>
      );
    },
  });
}
