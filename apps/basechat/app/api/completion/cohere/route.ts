import { StreamingTextResponse, CohereStream } from "ai";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  const body = JSON.stringify({
    prompt,
    model: "command-nightly",
    max_tokens: 300,
    stop_sequences: [],
    temperature: 0.9,
    return_likelihoods: "NONE",
    stream: true,
  });

  const response = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
    },
    body,
  });

  // Check for errors
  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
    });
  }

  // Extract the text response from the Cohere stream
  const stream = CohereStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
