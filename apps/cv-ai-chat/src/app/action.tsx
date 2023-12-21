"use server";

import OpenAI from "openai";
import type { Message } from "ai";
import { OpenAIStream, experimental_StreamingReactResponse } from "ai";
import { getContext } from "./utils/getContext";
import { RenderContentStream } from "./components/render-content-stream";
import { RenderCode } from "./components/render-code";
import { RenderVideo } from "./components/render-video";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

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
  Your responses should be based solely on the context provided, which includes Dave's blog posts and his thoughts on various topics. 
  If your response contains a link to a YouTube video such as https://www.youtube.com/watch?v=3XaXKiXtNjw then you should always replace the link with a YouTube video embed iframe. For example <iframe width="560" height="315" src="https://www.youtube.com/embed/3XaXKiXtNjw?si=lxE073mgOOAM6GSb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>.
  If a question is asked that cannot be answered based on the context, respond with "I'm sorry, I don't have any views on that topic yet. Please feel free to email me at dave@applification.net for further discussion."  
  Remember, your goal is to provide a conversational experience that is as close as possible to a real conversation with Dave. Do not invent or assume any views that are not explicitly stated in the context.
  Current conversation:
  {chat_history}  
  Context: ${context}
  question: ${currentMessageContent}
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
      return (
        <>
          <RenderContentStream content={content} />
          {/* <RenderCode content={content} /> */}
          <RenderVideo content={content} />
          {/* <div className="flex text-blue-500">Custom UI content rendered by the server</div> */}
        </>
      );
    },
  });
}
