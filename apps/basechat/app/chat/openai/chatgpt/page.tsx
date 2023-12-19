"use client";
import PromptInput from "@repo/ui/chat/prompt-input";
import Messages from "@repo/ui/chat/messages";
import { useChat } from "ai/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import InfoSlideOver from "@repo/ui/chat/info-slide-over";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat/openai/chatgpt",
  });

  return (
    <>
      <div className="flex justify-end -mt-4 lg:md:-mr-2 md:-mr-0 sm:mr-0">
        <button
          type="button"
          className="relative rounded-md bg-white text-gray-500 hover:text-gray-500 focus:ring-2 focus:ring-sky-500"
          onClick={() => setOpen(true)}
        >
          <span className="absolute -inset-2.5" />
          <span className="sr-only">Close panel</span>
          <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="flex pb-4">
        <Messages messages={messages} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 lg:pl-72 bg-white dark:bg-slate-900">
        <form className="flex w-full items-center rounded-md pl-1 pr-2 pb-6" onSubmit={handleSubmit}>
          <PromptInput input={input} handleInputChange={handleInputChange} />
        </form>
      </div>
      <InfoSlideOver open={open} setOpen={setOpen} />
    </>
  );
}
