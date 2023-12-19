import { NextRequest } from "next/server";

type StabilityAIImage = {
  base64: string;
  seed: number;
  finishedReason: string;
};

export async function POST(request: NextRequest) {
  const requestFormData = await request.formData();

  const { style_preset, positive, negative, file } = Object.fromEntries(requestFormData.entries());

  const formData = new FormData();
  formData.append("init_image", file);
  formData.append("init_image_mode", "IMAGE_STRENGTH");
  formData.append("image_strength", "0.35");
  formData.append("steps", "35");
  formData.append("seed", "0");
  formData.append("cfg_scale", "5");
  formData.append("samples", "1");
  formData.append("style_preset", style_preset);
  formData.append("text_prompts[0][text]", positive);
  formData.append("text_prompts[0][weight]", "1");
  formData.append("text_prompts[1][text]", negative);
  formData.append("text_prompts[1][weight]", "-1");

  const path = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image";

  const headers = {
    Accept: "application/json",
    Authorization: `${process.env.STABILITY_API_KEY}`,
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
  responseJSON.artifacts.forEach((image: StabilityAIImage) => {
    const base64Image = image.base64;
    return base64Image;
  });

  return new Response(JSON.stringify(responseJSON));
}
