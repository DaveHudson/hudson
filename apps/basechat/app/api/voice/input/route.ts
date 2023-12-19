import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const requestFormData = await request.formData();
  const { file } = Object.fromEntries(requestFormData.entries());

  const audiofile = new File([file], "audiofile.mp3", {
    type: "audio/mpeg",
  });

  const formData = new FormData();
  formData.append("file", audiofile);
  formData.append("model", "whisper-1");

  const path = "https://api.openai.com/v1/audio/transcriptions";

  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  const response = await fetch(path, {
    headers,
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const responseJSON = await response.json();

  return new Response(JSON.stringify(responseJSON.text));
}
