"use client";

import { XCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "@repo/ui/base/button";
import { Select } from "@repo/ui/catalyst/select";
import Messages from "@repo/ui/messages";
import PromptInput from "@repo/ui/prompt-input";
import { Spinner } from "@repo/ui/spinner";
import { useChat } from "ai/react";
import { useActions, useUIState } from "ai/rsc";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { AI } from "./action";
import MessageUser from "@repo/ui/message-user";

export function Chat() {
  const [prompt, setPrompt] = useState("CV Chat");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { getSourceContext, submitUserMessage } = useActions<typeof AI>();
  const [sourcesUI, setSourcesUI] = useState<null | React.ReactNode>(null);
  const [systemUI, setSystemUI] = useState<null | React.ReactNode>(null);

  const textareaRef = useRef(null);

  useEffect(() => {
    setMessages([]);
  }, [prompt]);

  const prompts = [
    "What did you do at Peppy?",
    "What did you do at Pando?",
    "What experience do you have with React?",
    "What is your opinion of Redux?",
    "Do you have any views on component composition in React?",
  ];

  return (
    <div className="flex justify-center">
      <div className="flex flex-col pb-52 !w-full">
        {messages.length ? (
          <div className="flex flex-col">
            {messages.map((message, index) => (
              <div key={index} className="pb-4">
                {message.display}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-4 flex w-full gap-x-2 overflow-x-auto whitespace-nowrap text-xs text-slate-600 dark:text-slate-300 md:text-sm">
              {prompts.map((prompt) => {
                return (
                  <Button
                    className="mb-2"
                    variant="outline"
                    size="sm"
                    key={prompt}
                    onClick={async (e) => {
                      e.preventDefault();
                      const button = e.target as HTMLButtonElement;
                      // add user message to UI
                      setMessages((currentMessages) => [
                        ...currentMessages,
                        {
                          id: Date.now(),
                          display: <MessageUser>{`${button.textContent}`}</MessageUser>,
                        },
                      ]);

                      // submit and get response message
                      const responseMessage = await submitUserMessage(`${button.textContent}`);
                      setMessages((currentMessages) => [...currentMessages, responseMessage]);

                      // submit and get sources & system UI
                      const responseSources = await getSourceContext(`${button.textContent}`);
                      setSourcesUI(responseSources.sourcesUI);
                      setSystemUI(responseSources.systemUI);
                    }}
                  >
                    {prompt}
                  </Button>
                );
              })}
            </div>
          </>
        )}
        {sourcesUI ? (
          <>
            <div>{sourcesUI}</div>
          </>
        ) : null}
        {systemUI ? (
          <>
            <div>{systemUI}</div>
          </>
        ) : null}
      </div>
      <br />
      <div className="fixed bottom-0 w-11/12 md:w-1/2 z-10 bg-white dark:bg-slate-900">
        {/* <form
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
                  <option>Cover Letter</option>
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
                    : prompt === "CV Match"
                      ? "Paste in a job description to see if it is a good match"
                      : "Paste in a job description to generate a personalised cover letter"
                }
                fileUpload={false}
              />
            </div>
          </div>
        </form> */}
      </div>
    </div>
  );
}
