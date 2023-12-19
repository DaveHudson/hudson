import { NextRequest } from "next/server";

type StabilityAIImage = {
  base64: string;
  seed: number;
  finishedReason: string;
};

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const { style_preset, positive, negative } = Object.fromEntries(data.entries());
  const path = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${process.env.STABILITY_API_KEY}`,
  };

  const body = {
    steps: 40,
    width: 1024,
    height: 1024,
    seed: 0,
    cfg_scale: 5,
    samples: 1,
    style_preset,
    text_prompts: [
      {
        text: positive,
        weight: 1,
      },
      {
        text: negative,
        weight: -1,
      },
    ],
  };

  const response = await fetch(path, {
    headers,
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const responseJSON = await response.json();
  responseJSON.artifacts.forEach((image: StabilityAIImage) => {
    const base64Image = image.base64;
    return base64Image;
  });

  return new Response(JSON.stringify(responseJSON));
}
