"use client";

import { Button } from "@repo/ui/base/button";
import { Select } from "@repo/ui/catalyst/select";
import Messages from "@repo/ui/messages";
import PromptInput from "@repo/ui/prompt-input";
import { Spinner } from "@repo/ui/spinner";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

export function Chat({ handler }: { handler: any }) {
  const [prompt, setPrompt] = useState("CV Chat");
  const textareaRef = useRef(null);
  const { messages, input, handleInputChange, handleSubmit, setInput, isLoading, setMessages } = useChat({
    api: handler,
  });

  useEffect(() => {
    setMessages([]);
  }, [prompt]);

  useEffect(() => {
    if (isLoading) {
      invariant(textareaRef.current, "Expected textarea to be defined");
      const textarea = textareaRef.current as HTMLTextAreaElement;
      textarea.style.height = "auto";
    }
  }, [isLoading]);

  const prompts = [
    "What did you do at Peppy?",
    "What did you do at Pando?",
    "What experience do you have with React?",
    "What is your opinion of Redux?",
    "Do you have any views on component composition in React?",
  ];

  return (
    <div className="flex justify-center">
      <div className="flex pb-52 !w-full">
        <Messages messages={messages} />
      </div>
      <br />
      <div className="fixed bottom-0 w-11/12 md:w-1/2 z-10 bg-white dark:bg-slate-900">
        <div className="flex w-full justify-center">{isLoading && <Spinner />}</div>
        <form
          onSubmit={(e) => {
            handleSubmit(e, {
              data: {
                prompt,
              },
            });
          }}
        >
          <div className="flex flex-col items-center rounded-md">
            {prompt === "CV Chat" && (
              <div className="mt-4 flex w-full gap-x-2 overflow-x-auto whitespace-nowrap text-xs text-slate-600 dark:text-slate-300 md:text-sm">
                {prompts.map((prompt) => {
                  return (
                    <Button className="mb-2" variant="outline" size="sm" onClick={() => setInput(prompt)} key={prompt}>
                      {prompt}
                    </Button>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col w-full pt-2 pb-2 md:pb-12 md:space-x-2 space-y-2">
              <div className="flex items-center">
                <label htmlFor="prompt" className="block text-sm font-medium leading-6 text-gray-900 sr-only">
                  Prompt
                </label>
                <Select
                  id="prompt"
                  name="prompt"
                  className="w-full ml-2 mr-8 sm:ml-2 sm:mr-12 md:ml-4 md:mr-10 py-1 appearance-none"
                  defaultValue="CV Chat"
                  onChange={(e) => setPrompt(e.target.value)}
                >
                  <option>CV Chat</option>
                  <option>CV Match</option>
                </Select>
              </div>
              <PromptInput
                textareaRef={textareaRef}
                handleInputChange={handleInputChange}
                input={input}
                disabled={isLoading}
                placeholder={
                  prompt === "CV Chat"
                    ? "Chat with AI about my CV"
                    : "Paste in a job description to see if it is a good match"
                }
                fileUpload={false}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
