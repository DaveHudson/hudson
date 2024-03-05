"use client";

import { Button } from "@repo/ui/base/button";
import { Select } from "@repo/ui/catalyst/select";
import { useActions, useUIState } from "ai/rsc";
import { useEffect, useRef, useState } from "react";
import { AI } from "./action";
import MessageUser from "@repo/ui/message-user";
import { useEnterSubmit } from "../utils/hooks/use-enter-submit";
import Textarea from "react-textarea-autosize";

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
        {messages.length ? (
          <div className="flex flex-col">
            {messages.map((message, index) => (
              <div key={index} className="pb-4">
                {message.display}
              </div>
            ))}
          </div>
        ) : null}
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
              <Textarea
                ref={inputRef}
                tabIndex={0}
                onKeyDown={onKeyDown}
                placeholder="Send a message."
                className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                name="message"
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
