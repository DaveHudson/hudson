import { StreamingTextResponse } from "ai";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log("prompt", prompt);
  const body = {
    model_id: "eleven_multilingual_v2",
    text: prompt,
    voice_settings: {
      similarity_boost: 1,
      stability: 1,
      style: 1,
    },
  };
  const options = {
    method: "POST",
    headers: {
      accept: "audio/mpeg",
      "xi-api-key": `${process.env.ELEVENLABS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    responseType: "arraybuffer",
  };

  const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", options);

  // Check for errors
  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
    });
  }

  // console.log("res", response);
  return response;

  // return new Response(response);

  // return new Response(JSON.stringify({ text: "hello" }));
}
