"use server";

import type { Message } from "ai";
import { experimental_StreamingReactResponse } from "ai";
import { getContext } from "./utils/getContext";
import { RenderContentStream } from "./components/render-content-stream";
import { RenderVideo } from "./components/render-video";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { formatAIChatHistory } from "./utils/formatChatHistory";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { getLangChainPrompt } from "./utils/prompts";
import invariant from "tiny-invariant";
import { currentAvailability } from "./utils/availability";
import { languages } from "./utils/languages";

type ChainInputType = {
  question: string;
  chat_history: string;
  context: string;
  currentAvailability: string;
  languages: string;
};

const model = new ChatOpenAI({
  modelName: "gpt-4-0613",
  temperature: 0,
});

const httpResponseOutputParser = new HttpResponseOutputParser({
  contentType: "text/plain",
});

export async function handler({ messages, data }: { messages: Message[]; data: any }) {
  // * Current message
  const currentMessageContent = messages[messages.length - 1].content;

  // * Get RAG context
  const context = await getContext(currentMessageContent);

  // * Create Selected Prompt with context
  const prompt = getLangChainPrompt({
    name: data.prompt,
  });

  const condenseQuestionTemplate = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.
    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:`;
  const CONDENSE_QUESTION_PROMPT = PromptTemplate.fromTemplate(condenseQuestionTemplate);

  invariant(prompt, "Prompt must be provided");
  const ANSWER_PROMPT = PromptTemplate.fromTemplate(prompt);

  const standaloneQuestionChain = RunnableSequence.from([
    {
      question: (input: ChainInputType) => input.question,
      chat_history: (input: ChainInputType) => input.chat_history,
      context: (input: ChainInputType) => input.context,
    },
    CONDENSE_QUESTION_PROMPT,
    model,
    new StringOutputParser(),
  ]).withConfig({ runName: "standaloneQuestion" });

  const answerChain = RunnableSequence.from([
    {
      context: () => context,
      chat_history: new RunnablePassthrough(),
      question: new RunnablePassthrough(),
      currentAvailability: () => currentAvailability,
      languages: () => languages,
    },
    ANSWER_PROMPT,
    model,
  ]).withConfig({ runName: "answer" });

  const finalRetrievalChain = standaloneQuestionChain
    .pipe(answerChain)
    .pipe(httpResponseOutputParser)
    .withConfig({ runName: "CVQuery" });

  // * Stream the response passing in the params needed
  const stream = await finalRetrievalChain.stream({
    question: currentMessageContent,
    chat_history: formatAIChatHistory(messages),
    context,
    currentAvailability,
    languages,
  });

  // * Respond with the stream
  return new experimental_StreamingReactResponse(stream, {
    ui({ content }) {
      return (
        <>
          <RenderContentStream content={content} />
          <RenderVideo content={content} />
        </>
      );
    },
  });
}
