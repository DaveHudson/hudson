"use server";

import MessageAIRSC from "@repo/ui/message-ai-rsc";
import { createStreamableUI, getMutableAIState, render } from "ai/rsc";
import { getContextPinecone } from "../../utils/getContextPinecone";
import { RenderSources } from "../../components/render-sources";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function submitCoverLetter(content: string) {
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
        content: `You are an AI designed to write a cover letter for Dave Hudson. Your responses should be in the first person, as if Dave himself is speaking. Use phrases like "In my view..." or "I believe..." or "My experience...".
        Your response should be:
          - based solely on the context provided, which includes Dave's CV and his thoughts on various topics
          - as short as possible whilst covering Dave's experience with the technologies mentioned in the job description
          - emphasise that Dave is a T-Shaped person with deep specialism in React & front-end engineering.
          - cover hard skills such as technologies and soft skills such as communication, collaboration and team work
        If the question contains:
          - Security Clearance then your response should mention that "I have SC clearance but have not worked in the Public Sector in the last 12 months."
          - Hybrid working then your response should mention that the maximum I can commit to on-site working is "2-3 days per month."
          - agile or scrum then mention that Dave is also "a certified Scrum Master"          
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
