"use server";

import MessageAIRSC from "@repo/ui/message-ai-rsc";
import { createStreamableUI, getMutableAIState, render } from "ai/rsc";
import OpenAI from "openai";
import { getContextPinecone } from "../../utils/getContextPinecone";
import { RenderSources } from "../../components/render-sources";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function submitCVChat(content: string) {
  "use server";

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
        content: `You are an AI designed to emulate the thoughts and views of Dave Hudson. Your responses should be in the first person, as if Dave himself is speaking. Use phrases like "In my view..." or "I believe...".
        Your responses should be based solely on the context provided, which includes Dave's blog posts and his thoughts on various topics.
        If a question is asked that cannot be answered based on the context, respond with "I'm sorry, I don't have any views on that topic yet. Please feel free to email me at dave@applification.net for further discussion."
        If a question is asked about a full time job, respond with "I am an I.T contractor operating outside of IR35, full-time employment is not of interest to me at this time."
        If a question is asked about day rate, respond with "My day rate depends on the specific requirements of the contract."
        Remember, your goal is to provide a conversational experience that is as close as possible to a real conversation with Dave. Do not invent or assume any views that are not explicitly stated in the context.        
        Always provide context for your sources of information using the function \`getContextPinecone\` 
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
    // tools: {
    //   getContextPinecone: {
    //     description: "Get context from Pinecone",
    //     parameters: z
    //       .object({
    //         message: z.string().describe("user input message to get context for"),
    //       })
    //       .required(),
    //     render: async function* (message) {
    //       console.log("render with", message);
    //       yield <div>Getting Pinecone context</div>;
    //       const response = await getContextPinecone(message.toString());

    //       aiState.done([
    //         ...aiState.get(),
    //         {
    //           role: "function",
    //           name: "getContextPinecone",
    //           content: JSON.stringify(response),
    //         },
    //       ]);

    //       return <pre>{JSON.stringify(response, null, 2)}</pre>;
    //     },
    //   },
    // },
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
