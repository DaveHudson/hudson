import { cn } from "../../lib/utils";
import { SunIcon } from "@heroicons/react/20/solid";

export default function MessageAI({ children }: { children: React.ReactNode }) {
  return (
    <div className="ui-flex">
      <div className="ui-flex ui-flex-row ui-px-4 ui-py-1">
        <span
          className={cn(
            "ui-bg-yellow-500 ui-h-6 ui-w-6 ui-rounded-full ui-flex ui-items-center ui-justify-center ui-ring-8 ui-ring-white dark:ui-ring-gray-900"
          )}
        >
          <SunIcon className="ui-h-4 ui-w-4 ui-text-white" aria-hidden="true" />
        </span>
      </div>

      <div className="ui-flex ui-w-full ui-flex-col ui-items-start lg:ui-flex-row lg:ui-justify-between">
        <p className="ui-max-w-3xl">{children}</p>
        <div className="ui-mt-4 ui-flex ui-flex-row ui-justify-start ui-gap-x-2 ui-text-slate-500 lg:ui-mt-0">
          <button className="hover:ui-text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ui-h-5 ui-w-5"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
            </svg>
          </button>
          <button className="hover:ui-text-blue-600" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ui-h-5 ui-w-5"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>
            </svg>
          </button>
          <button
            className="hover:ui-text-blue-600"
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`${children}`).then(
                function () {
                  console.log("Copying to clipboard was successful!");
                },
                function (err) {
                  console.error("Could not copy text: ", err);
                }
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ui-h-5 ui-w-5"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
              <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
