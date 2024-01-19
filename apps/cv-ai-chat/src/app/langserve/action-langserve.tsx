"use server";

import type { Message } from "ai";
import { LangChainStream, StreamingTextResponse, experimental_StreamingReactResponse } from "ai";
import { RenderContentStream } from "../components/render-content-stream";
import { RenderVideo } from "../components/render-video";
import { RemoteRunnable } from "langchain/runnables/remote";

export async function handler({ messages, data }: { messages: Message[]; data: any }) {
  // Prompt
  // console.log("prompt", data.prompt);

  let selectedPrompt = "cv";
  if (data.prompt === "CV Chat") {
    selectedPrompt = "cv";
  } else if (data.prompt === "CV Match") {
    selectedPrompt = "match";
  } else if (data.prompt === "Cover Letter") {
    selectedPrompt = "cover";
  }

  // * Current message
  const currentMessageContent = messages[messages.length - 1].content;
  // console.log("currentMessageContent", currentMessageContent);

  const langServeEndpoint = `${process.env.LANGCHAIN_LANGSERVE_API}/${selectedPrompt}/`;
  console.log("langServeEndpoint", langServeEndpoint);
  const chain = new RemoteRunnable({
    url: langServeEndpoint,
    options: {
      timeout: 100000,
    },
  });

  const lcStream = LangChainStream();
  const result = await chain.stream(currentMessageContent);

  for await (const chunk of result) {
    if (typeof chunk === "object" && chunk !== null && !Array.isArray(chunk) && !(chunk instanceof Function)) {
      // ! Init of RemoteRunnable ignore JSON object
      console.log("init RemoteRunnable", chunk);
    } else {
      lcStream.writer.write(chunk);
    }
  }

  lcStream.writer.close();

  // * Respond with the stream
  return new experimental_StreamingReactResponse(lcStream.stream, {
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
