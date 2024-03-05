"use client";

import { Button } from "@repo/ui/base/button";
import { Select } from "@repo/ui/catalyst/select";
import { useActions, useUIState } from "ai/rsc";
import { useEffect, useRef, useState } from "react";
import { AI } from "./action";
import MessageUser from "@repo/ui/message-user";
import { useEnterSubmit } from "../utils/hooks/use-enter-submit";
import Textarea from "react-textarea-autosize";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export function Chat() {
  const [prompt, setPrompt] = useState("CV Chat");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { getSourceContext, submitUserMessage } = useActions<typeof AI>();
  const [sourcesUI, setSourcesUI] = useState<null | React.ReactNode>(null);
  const [systemUI, setSystemUI] = useState<null | React.ReactNode>(null);

  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState("");

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
        <div className="flex-1 space-y-2 overflow-y-auto leading-6 sm:text-base sm:leading-7">
          <div className="flex w-full justify-center">
            <ChatBubbleLeftRightIcon className="h-10 w-10 stroke-2 stroke-sky-600" aria-hidden="true" />
          </div>
          <div>
            {messages.length ? (
              <>
                {messages.map((message, index) => (
                  <div key={index} className="pb-4">
                    {message.display}
                  </div>
                ))}
              </>
            ) : null}
          </div>
          <div className="flex flex-col pl-16">{sourcesUI ? <>{sourcesUI}</> : null}</div>
          {systemUI ? (
            <div className="text-center text-sm">
              <pre>{systemUI}</pre>
            </div>
          ) : null}
        </div>
      </div>
      <br />
      <div className="fixed bottom-0 w-11/12 md:w-1/2 z-10 bg-white dark:bg-slate-900">
        <form
          ref={formRef}
          onSubmit={async (e) => {
            e.preventDefault();

            // Blur focus on mobile
            if (window.innerWidth < 600) {
              e.target["message"]?.blur();
            }

            const value = inputValue.trim();
            setInputValue("");
            if (!value) return;

            // get the form data
            const formData = new FormData(e.target as HTMLFormElement);
            // convert FormData to an object
            const formObject = Object.fromEntries(formData.entries());
            console.log("form data", formObject);
            // use Object.entries to get all form values
            for (const [key, value] of Object.entries(formObject)) {
              console.log(`${key}: ${value}`);
            }

            // add user message to UI
            setMessages((currentMessages) => [
              ...currentMessages,
              {
                id: Date.now(),
                display: <MessageUser>{`${value}`}</MessageUser>,
              },
            ]);

            // submit and get response message
            const responseMessage = await submitUserMessage(`${value}`);
            setMessages((currentMessages) => [...currentMessages, responseMessage]);

            // submit and get sources & system UI
            const responseSources = await getSourceContext(`${value}`);
            setSourcesUI(responseSources.sourcesUI);
            setSystemUI(responseSources.systemUI);
          }}
        >
          <div className="flex flex-col items-center rounded-md">
            {prompt === "CV Chat" && (
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
            )}

            <div className="flex flex-col w-full pt-2 pb-2 md:pb-12  space-y-2">
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
              <div className="flex flex-row w-full">
                <Textarea
                  ref={inputRef}
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  placeholder="Send a message."
                  className="min-h-[44px] w-full ml-4 resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none block rounded-md border-0 dark:bg-gray-900 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-sky-700 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  name="message"
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />{" "}
                <div className="flex items-center">
                  <button
                    className="inline-flex hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-600 sm:p-2"
                    type="submit"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
                      <path d="M10 14l11 -11" />
                      <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                    </svg>
                    <span className="sr-only">Send message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
