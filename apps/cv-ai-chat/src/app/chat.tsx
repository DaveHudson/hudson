"use client";

import Messages from "@repo/ui/messages";
import PromptInput from "@repo/ui/prompt-input";
import { useChat } from "ai/react";

export function Chat({ handler }: { handler: any }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: handler,
  });

  return (
    <>
      <div className="flex pb-4">
        <Messages messages={messages} />
      </div>
      <br />
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="flex w-full items-center rounded-md pl-1 pr-2 pb-6">
          <PromptInput handleInputChange={handleInputChange} input={input} />
        </form>
      </div>
    </>
  );
}
