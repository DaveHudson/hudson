"use client";

import MessageAI from "@repo/ui/chat/message-ai";
import PromptInput from "@repo/ui/chat/prompt-input";
import { useCompletion } from "ai/react";

export default function Completion() {
  const { completion, input, isLoading, handleInputChange, handleSubmit, setInput } = useCompletion({
    api: "/api/completion/prompthub",
  });

  return (
    <>
      <div className="flex-1 space-y-8 overflow-y-auto leading-6 sm:text-base sm:leading-7">
        {completion && <MessageAI>{completion}</MessageAI>}
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10 lg:pl-72 bg-white dark:bg-slate-900">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
            setInput("");
          }}
          className="flex w-full items-center rounded-md pl-1 pr-2 pb-6"
        >
          <PromptInput input={input} handleInputChange={handleInputChange} disabled={isLoading} />
        </form>
      </div>
    </>
  );
}
