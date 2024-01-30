import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { kv } from "@vercel/kv";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // * Current message
  const currentMessageContent = messages[messages.length - 1].content;

  const key = JSON.stringify(currentMessageContent);
  console.log("KEY", key);

  // Check if we have a cached response
  const cached = (await kv.get(key)) as string;
  console.log("CACHED", cached);
  if (cached) {
    console.log("CACHED RESPONSE");
    // return new Response(cached);

    // Optional: Emulate streaming by breaking the cached response into chunks

    const chunks = cached.split(" ");
    const stream = new ReadableStream({
      async start(controller) {
        for (const chunk of chunks) {
          const bytes = new TextEncoder().encode(chunk + " ");
          controller.enqueue(bytes);
          await new Promise((r) =>
            setTimeout(
              r,
              // get a random number between 10ms and 50ms to simulate a random delay
              Math.floor(Math.random() * 40) + 10
            )
          );
        }
        controller.close();
      },
    });
    return new StreamingTextResponse(stream);
  } else {
    console.log("FRESH RESPONSE");
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      async onFinal(completion) {
        // Cache the response. Note that this will also cache function calls.
        await kv.set(key, completion);
        await kv.expire(key, 60 * 60);
      },
    });

    // Respond with the stream
    return new StreamingTextResponse(stream);
  }
}
