"use client";

import { Button } from "@repo/ui/base/button";
import Messages from "@repo/ui/messages";
import PromptInput from "@repo/ui/prompt-input";
import { useChat } from "ai/react";

export function Chat({ handler }: { handler: any }) {
  const { messages, input, handleInputChange, handleSubmit, setInput, isLoading } = useChat({
    api: handler,
  });

  const prompts = [
    "What did you do at Peppy?",
    "What did you do at Pando?",
    "What experience do you have with React?",
    "What is your opinion of Redux?",
    "Do you have any views on component composition in React?",
  ];

  return (
    <div className="flex justify-center">
      <div className="flex pb-56 w-full">
        <Messages messages={messages} />
      </div>
      <br />
      <div className="fixed bottom-0 w-10/12 md:w-1/2 z-10 dark:bg-slate-900">
        <div className="flex w-full justify-center">{isLoading && <div>Loading...</div>}</div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full items-center rounded-md">
            <div className="mt-4 flex w-full gap-x-2 overflow-x-auto whitespace-nowrap text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
              {prompts.map((prompt) => {
                return (
                  <Button className="mb-2" variant="outline" onClick={() => setInput(prompt)} key={prompt}>
                    {prompt}
                  </Button>
                );
              })}
            </div>
            <div className="flex flex-row w-full pt-1 pl-3 pr-3 pb-12">
              <PromptInput handleInputChange={handleInputChange} input={input} disabled={isLoading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
