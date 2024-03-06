"use server";

import MessageAIRSC from "@repo/ui/message-ai-rsc";
import { createStreamableUI, getMutableAIState, render } from "ai/rsc";
import OpenAI from "openai";
import { getContextPinecone } from "../../utils/getContextPinecone";
import { RenderSources } from "../../components/render-sources";
import { languages } from "../../utils/languages";
import { currentAvailability } from "../../utils/availability";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

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

  const systemMessage = createStreamableUI(<div>Starting query...</div>);
  systemMessage.update(<div>Consolidating query...</div>);

  const context = await getContextPinecone(content);

  const messages = [
    {
      role: "system",
      content: `You are an AI designed to emulate the thoughts and views of Dave Hudson. Your responses should be in the first person, as if Dave himself is speaking. Use phrases like "In my view..." or "I believe...".
  Your responses should be based solely on the context provided, which includes Dave's blog posts and his thoughts on various topics.
  If your response contains a link to a YouTube video such as https://www.youtube.com/watch?v=3XaXKiXtNjw then you should always replace the link with a YouTube video embed iframe. For example <iframe width="560" height="315" src="https://www.youtube.com/embed/3XaXKiXtNjw?si=lxE073mgOOAM6GSb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>.
  If the question asks about a programming languages that is not in ${languages} then your response should always containt the text "I am not famililar with that language".
  If a question is asked that cannot be answered based on the context, respond with "I'm sorry, I don't have any views on that topic yet. Please feel free to email me at dave@applification.net for further discussion."
  If a question is asked about a full time job, respond with "I am an I.T contractor operating outside of IR35, full-time employment is not of interest to me at this time."
  If a question is asked about day rate, respond with "My day rate depends on the specific requirements of the contract."
  Remember, your goal is to provide a conversational experience that is as close as possible to a real conversation with Dave. Do not invent or assume any views that are not explicitly stated in the context.
  Dave's current availability for work is ${currentAvailability}
  Context: ${JSON.stringify(context.combinedContext)}
  question: ${content}
  answer: `,
    },
    {
      role: "user",
      content,
    },
  ] as ChatCompletionMessageParam[];

  const ui = render({
    model: "gpt-3.5-turbo",
    provider: openai,
    messages,
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

  // This async function is immediately invoked but it will not block the
  // return statement. Because of that, the client will receive the initial
  // UI immediately and then the updates will be streamed later.
  (async () => {
    sources.update(<div>Consolidating sources...</div>);

    // const responseSources = await getContextPinecone(content);

    const data = [{ sources: context.sources }];

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
