"use server";

import MessageAIRSC from "@repo/ui/message-ai-rsc";
import { ThingsLove } from "@repo/ui/chat/things-love";
import { Availability } from "@repo/ui/chat/availability";
import { AICard } from "@repo/ui/chat/ai-card";
import { createStreamableUI, getMutableAIState, render } from "ai/rsc";
import OpenAI from "openai";
import { getContextPinecone } from "../../utils/getContextPinecone";
import { RenderSources } from "../../components/render-sources";
import { languages } from "../../utils/languages";
import { currentAvailability } from "../../utils/availability";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { runOpenAICompletion, sleep } from "../../utils";
import { z } from "zod";

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

  // const systemMessage = createStreamableUI(<div>Starting query...</div>);
  // systemMessage.update(<div>Consolidating query...</div>);

  const uiReply = createStreamableUI(
    <MessageAIRSC>
      <AICard>Searching Vector Database..</AICard>
    </MessageAIRSC>
  );

  const context = await getContextPinecone(content);

  // If your response contains a link to a YouTube video such as https://www.youtube.com/watch?v=3XaXKiXtNjw then you should always replace the link with a YouTube video embed iframe. For example <iframe width="560" height="315" src="https://www.youtube.com/embed/3XaXKiXtNjw?si=lxE073mgOOAM6GSb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>.

  const messages = [
    {
      role: "system",
      content: `You are an AI designed to emulate the thoughts and views of Dave Hudson. Your responses should be in the first person, as if Dave himself is speaking. Use phrases like "In my view..." or "I believe...".
  Your responses should be based on the context provided, which includes Dave's blog posts and his thoughts on various topics.
  Context: ${JSON.stringify(context.combinedContext)}

  
  If a question is asked that cannot be answered based on the context, respond with "I'm sorry, I don't have any views on that topic yet. Please feel free to email me at dave@applification.net for further discussion."
  
  If the user enquires about job status or availability, call \`getDaveAvailability\`.
  If the user enquires about a specific programming language, then call \`getProgrammingLanguages\` passing in the language as a parameter.
  If the user enquires about things Dave loves, then call \`getThingsLove\` passing in the things Dave loves as a parameter.

  If your response contains a link to a YouTube video then you should always call \`show_YouTube_video\` passing in the YouTube URL parameter which is the text after v= in the video url.
  
  Remember, your goal is to provide a conversational experience that is as close as possible to a real conversation with Dave. Do not invent or assume any views that are not explicitly stated in the context.
  `,
    },
    {
      role: "user",
      content,
    },
  ] as ChatCompletionMessageParam[];

  const completion = runOpenAICompletion(openai, {
    model: "gpt-3.5-turbo",
    messages,
    functions: [
      {
        name: "getContextPinecone",
        description: "Get context from Pinecone",
        parameters: z.object({}),
      },
      {
        name: "getDaveAvailability",
        description: "Get current availability",
        parameters: z
          .object({
            message: z.string().describe("message about current availability"),
          })
          .required(),
      },
      {
        name: "getProgrammingLanguages",
        description: "Get programming languages",
        parameters: z
          .object({
            programmingLanguage: z.string().describe("programming language"),
          })
          .required(),
      },
      {
        name: "getThingsLove",
        description: "Get things Dave loves",
        parameters: z
          .object({
            loves: z.array(z.string()).describe("array of things Dave loves"),
          })
          .required(),
      },
      {
        name: "show_YouTube_video",
        description: "Show a YouTube video",
        parameters: z
          .object({
            videoId: z
              .string()
              .describe(
                "The videoId of the YouTube video to show e.g in the URL https://www.youtube.com/watch?v=3XaXKiXtNjw the videoId would be 3XaXKiXtNjw. The videoId always comes after v= in the URL."
              ),
          })
          .required(),
      },
    ],
    temperature: 0,
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    sleep(1500);

    uiReply.update(<MessageAIRSC>{content}</MessageAIRSC>);

    if (isFinal) {
      uiReply.done();
      // systemMessage.done(<>system is done</>);
      aiState.done([...aiState.get(), { role: "assistant", content }]);
    }
  });

  completion.onFunctionCall("getDaveAvailability", async () => {
    uiReply.update(
      <MessageAIRSC>
        <AICard>Requesting contract status...</AICard>
      </MessageAIRSC>
    );

    await sleep(1500);

    const message = `Dave's current availability for work is ${currentAvailability}`;

    uiReply.done(
      <MessageAIRSC>
        <AICard done>
          <Availability status={currentAvailability} />
        </AICard>
      </MessageAIRSC>
    );

    aiState.done([...aiState.get(), { role: "assistant", name: "getCurrentAvailability", content: message }]);
  });

  completion.onFunctionCall("getProgrammingLanguages", async ({ programmingLanguage }) => {
    await sleep(1000);

    uiReply.update(
      <MessageAIRSC>
        <AICard>Getting programming languages...</AICard>
      </MessageAIRSC>
    );

    await sleep(1500);

    let message: string;
    const isKnownLanguage = languages.includes(programmingLanguage);
    if (isKnownLanguage) {
      message = `I have experience with ${programmingLanguage}.`;
    } else {
      message = `I'm sorry, I don't have any experience with ${programmingLanguage}.`;
    }

    uiReply.done(<MessageAIRSC>{message}</MessageAIRSC>);
    aiState.done([...aiState.get(), { role: "assistant", name: "getProgrammingLanguages", content: message }]);
  });

  completion.onFunctionCall("getThingsLove", async ({ loves }) => {
    await sleep(1000);

    uiReply.update(
      <MessageAIRSC>
        <AICard>Getting things Dave loves...</AICard>
      </MessageAIRSC>
    );

    await sleep(1500);

    uiReply.done(
      <MessageAIRSC>
        <AICard done>
          <ThingsLove loves={loves} />
        </AICard>
      </MessageAIRSC>
    );

    // systemMessage.done(<>system is done</>);

    aiState.done([...aiState.get(), { role: "assistant", name: "getThingsLove", content: loves }]);
  });

  completion.onFunctionCall("show_YouTube_video", async ({ videoId }) => {
    uiReply.update(
      <MessageAIRSC>
        <AICard>Fetching YouTube video...</AICard>
      </MessageAIRSC>
    );

    await sleep(1000);

    const videoUrl = `https://www.youtube.com/embed/${videoId}?si=lxE073mgOOAM6GSb`;
    const videoPlayer = (
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
    uiReply.done(<div className="flex justify-center">{videoPlayer}</div>);

    aiState.done([...aiState.get(), { role: "assistant", name: "showYouTubeVideo", content: videoPlayer }]);
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

    aiState.done([...aiState.get()]);
  })();

  return {
    id: Date.now(),
    display: uiReply.value,
    sources: sources.value,
    // system: systemMessage.value,
  };
}
