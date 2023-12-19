import { StreamingTextResponse } from "ai";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST() {
  const response = await fetch("https://app.prompthub.us/api/v1/projects/1100/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PROMPT_HUB_API_KEY}`,
    },
  });

  // Check for errors
  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
    });
  }

  const apiRes = await response.json();

  // Respond with the res
  return new StreamingTextResponse(apiRes.data.text);
}
