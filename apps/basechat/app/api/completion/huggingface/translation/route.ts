import { HfInference } from "@huggingface/inference";

// Create a new Hugging Face Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  const response = await Hf.translation({
    model: "t5-small",
    inputs: prompt,
  });

  const translation = JSON.parse(JSON.stringify(response));

  return new Response(translation.translation_text);
}
