"use server";

import MessageAIRSC from "@repo/ui/message-ai-rsc";
import { createStreamableUI, getMutableAIState, render } from "ai/rsc";
import { getContextPinecone } from "../../utils/getContextPinecone";
import { RenderSources } from "../../components/render-sources";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function submitCVMatch(content: string) {
  const aiState = getMutableAIState();
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content,
    },
  ]);

  const ui = render({
    model: "gpt-3.5-turbo",
    provider: openai,
    messages: [
      {
        role: "system",
        content: `You are an AI designed to assess whether a contract is relevant to Dave Hudson (dave@applification.net) based on his thoughts and views. Your responses should be in the first person, as if Dave himself is speaking. Use phrases like "In my view..." or "I believe..." or "My experience...". 
    Your responses should be based solely on the context provided, primarily Dave's CV. 
    If the question contains:
    - the text "Inside IR35" then your response should always contain the text "I'm unlikely to accept this contract due to his preference for Outside IR35".  
    - the text "on-site" or "on site" then your response should always contain the text "I'm unlikely to accept this contract due to his preference for remote working".
    - the text "full-time" or "full time" or "FTE" then your response should always contain the text "I am an I.T contractor operating outside of IR35. I am not interested in full time employment."
    - the text "day rate", then your response should always containt the text "My day rate depends on the specific requirements of the contract."
    Remember, your goal is to assess whether a contract is a match for Dave Hudson's knowledge and experience. Do not invent or assume any previous experience or qualifications that are not explicitly stated in the context.
    Current conversation:
    {chat_history}  
    question: ${content}
    answer: `,
      },
      {
        role: "user",
        content,
      },
    ],
    text: ({ content, done }) => {
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            content,
          },
        ]);
      }

      return <MessageAIRSC>{content}</MessageAIRSC>;
    },
  });

  const sources = createStreamableUI(<div>Fetching sources..</div>);
  const systemMessage = createStreamableUI(null);

  // This async function is immediately invoked but it will not block the
  // return statement. Because of that, the client will receive the initial
  // UI immediately and then the updates will be streamed later.
  (async () => {
    sources.update(<div>Consolidating sources...</div>);

    const responseSources = await getContextPinecone(content);

    const data = [{ sources: responseSources.sources }];

    sources.done(<RenderSources data={data} />);

    systemMessage.done(<>system is done</>);

    aiState.done([...aiState.get()]);
  })();

  return {
    id: Date.now(),
    display: ui,
    sources: sources.value,
    system: systemMessage.value,
  };
}
