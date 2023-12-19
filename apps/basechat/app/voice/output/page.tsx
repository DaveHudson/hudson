"use client";

import PromptInput from "@repo/ui/chat/prompt-input";
import { useCompletion } from "ai/react";
import { useState } from "react";

export default function Voice() {
  const { input, isLoading, handleInputChange, setInput } = useCompletion({
    api: "/api/voice",
  });

  const [audioURL, setAudioURL] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    fetch("/api/voice", {
      body: JSON.stringify({ prompt: input }),
      method: "post",
    }).then(async (result) => {
      setInput("");
      const blob = new Blob([await result.blob()], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
    });
  };

  return (
    <>
      <div className="flex-1 space-y-8 overflow-y-auto leading-6 sm:text-base sm:leading-7">
        {audioURL && (
          <audio autoPlay controls>
            <source src={audioURL} type="audio/mpeg" />
          </audio>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10 lg:pl-72 bg-white dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="flex w-full items-center rounded-md pl-1 pr-2 pb-6">
          <PromptInput input={input} handleInputChange={handleInputChange} disabled={isLoading} />
        </form>
      </div>
    </>
  );
}
