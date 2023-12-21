"use server";

import OpenAI from "openai";
import type { Message } from "ai";
import { OpenAIStream, experimental_StreamingReactResponse } from "ai";
import { getContext } from "./utils/getContext";
import { RenderContentStream } from "./components/render-content-stream";
import { RenderVideo } from "./components/render-video";
import { getPrompt } from "./utils/prompts";
import invariant from "tiny-invariant";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function handler({ messages, data }: { messages: Message[]; data: any }) {
  // * Previous User Messages
  const userMessages = messages.filter((message: Message) => message.role === "user");

  // * Current message
  const currentMessageContent = messages[messages.length - 1].content;
  // console.log("currentMessageContent", currentMessageContent);

  // * Get RAG context
  const context = await getContext(currentMessageContent);
  // console.log("context", context);

  // * Create Prompt with context
  const prompt = getPrompt({
    name: data.prompt,
    context,
    currentMessageContent,
  });

  invariant(prompt, "Prompt must be provided");

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
          <RenderVideo content={content} />
        </>
      );
    },
  });
}
