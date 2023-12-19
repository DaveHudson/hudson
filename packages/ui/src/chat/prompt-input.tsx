import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";

export default function PromptInput({
  input,
  handleInputChange,
  disabled,
}: {
  input: string;
  handleInputChange: (event: any) => void;
  disabled?: boolean;
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    invariant(textareaRef.current, "Expected textarea to be defined");
    const textarea = textareaRef.current as HTMLTextAreaElement;
    const resizeTextarea = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };
    textarea.addEventListener("input", resizeTextarea);
    resizeTextarea();
    return () => {
      textarea.removeEventListener("input", resizeTextarea);
    };
  }, []);

  return (
    <>
      <label htmlFor="prompt" className="ui-sr-only">
        Enter your prompt
      </label>
      <div>
        <button
          className="hover:ui-text-blue-600 dark:ui-text-slate-200 dark:hover:ui-text-blue-600 sm:ui-p-2"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ui-h-6 ui-w-6"
            aria-hidden="true"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 5l0 14"></path>
            <path d="M5 12l14 0"></path>
          </svg>
          <span className="ui-sr-only">Attach file</span>
        </button>
      </div>

      <textarea
        ref={textareaRef}
        id="prompt"
        rows={1}
        className="ui-block ui-w-full ui-rounded-md ui-border-0 ui-py-1.5 dark:ui-bg-gray-900 ui-text-gray-900 dark:ui-text-gray-300 ui-shadow-sm ui-ring-1 ui-ring-inset ui-ring-gray-300 dark:ui-ring-gray-700 placeholder:ui-text-gray-400 focus:ui-ring-2 focus:ui-ring-inset focus:ui-ring-sky-600 sm:ui-text-sm sm:ui-leading-6"
        placeholder="Message AI..."
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            invariant(event.currentTarget.form, "Expected form to be defined");
            event.preventDefault();
            const formEvent = new Event("submit", { bubbles: true, cancelable: true });
            event.currentTarget.form.dispatchEvent(formEvent);
          }
        }}
        value={input}
      ></textarea>
      <div>
        <button
          className="ui-inline-flex hover:ui-text-blue-600 dark:ui-text-slate-200 dark:hover:ui-text-blue-600 sm:ui-p-2"
          type="submit"
          disabled={disabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ui-h-6 ui-w-6"
            aria-hidden="true"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 14l11 -11"></path>
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
          </svg>
          <span className="ui-sr-only">Send message</span>
        </button>
      </div>
    </>
  );
}
