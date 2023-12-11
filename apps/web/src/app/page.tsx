"use client";
import PromptInput from "@repo/ui/prompt-input";
import { useChat } from "ai/react";
import Messages from "@repo/ui/messages";

export default function Chat(): React.ReactNode {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/rag",
  });

  return (
    <>
      <div className="flex pb-4">
        <Messages messages={messages} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-slate-900">
        <form className="flex w-full items-center rounded-md pl-1 pr-2 pb-6" onSubmit={handleSubmit}>
          <PromptInput handleInputChange={handleInputChange} input={input} />
        </form>
      </div>
    </>
  );
}
