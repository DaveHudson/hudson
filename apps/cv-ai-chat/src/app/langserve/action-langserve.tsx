"use server";

import type { Message } from "ai";
import { LangChainStream, StreamingTextResponse, experimental_StreamingReactResponse } from "ai";
import { RenderContentStream } from "../components/render-content-stream";
import { RenderVideo } from "../components/render-video";
import { RemoteRunnable } from "langchain/runnables/remote";

export async function handler({ messages, data }: { messages: Message[]; data: any }) {
  // * Current message
  const currentMessageContent = messages[messages.length - 1].content;
  // console.log("currentMessageContent", currentMessageContent);

  const chain = new RemoteRunnable({
    // url: "https://web-production-09bc.up.railway.app/cv/",
    // url: "http://127.0.0.1:8000/cv/",
    url: `${process.env.LANGCHAIN_LANGSERVE_API}`,
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
