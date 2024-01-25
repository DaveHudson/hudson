"use server";

import OpenAI from "openai";
import type { Message } from "ai";
import { OpenAIStream, experimental_StreamData, experimental_StreamingReactResponse } from "ai";
import { getContextPinecone } from "./utils/getContextPinecone";
import { RenderContentStream } from "./components/render-content-stream";
import { RenderVideo } from "./components/render-video";
import { getPrompt } from "./utils/prompts";
import invariant from "tiny-invariant";
import { RenderSources } from "./components/render-sources";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function handler({ messages, data }: { messages: Message[]; data: any }) {
  // * Stream data
  const stream_data = new experimental_StreamData();

  // * Previous User Messages
  const userMessages = messages.filter((message: Message) => message.role === "user");

  // * Current message
  const currentMessageContent = messages[messages.length - 1].content;
  // console.log("currentMessageContent", currentMessageContent);

  // * Get RAG context
  const context = await getContextPinecone(currentMessageContent);
  // console.log("context", context);

  // * Create Prompt with context
  const prompt = getPrompt({
    name: data.prompt,
    context: context.combinedContext,
    currentMessageContent,
  });

  invariant(prompt, "Prompt must be provided");

  // * Send request to OpenAI
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: [...prompt, ...userMessages] as any,
  });

  // * Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onFinal() {
      stream_data.close();
    },
    experimental_streamData: true,
  });

  stream_data.append({ sources: context.sources });
  console.log("stream_data", stream_data[0]);

  // * Respond with the stream
  return new experimental_StreamingReactResponse(stream, {
    data: stream_data,
    ui({ content, data }) {
      return (
        <>
          <RenderContentStream content={content} />
          <RenderVideo content={content} />
          {data && data?.[0] !== null && typeof data[0] === "object" && "sources" in data?.[0] && (
            <RenderSources data={data} />
          )}
        </>
      );
    },
  });
}
