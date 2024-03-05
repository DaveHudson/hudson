"use client";
import { Avatar } from "./catalyst/avatar";
import profile from "./profile.jpg";

export default function MessageAIRSC({ children }: { children: string }) {
  return (
    <div className="ui-flex">
      <div className="ui-flex ui-flex-row ui-px-4 ui-y-1">
        <Avatar className="ui-size-8" src={profile.src} />
      </div>

      <div className="ui-flex ui-w-full ui-flex-col ui-items-start">
        <div className="ui-w-full ui-pb-2">{children}</div>
        <div className="ui-mt-4 ui-flex ui-flex-row ui-justify-start ui-gap-x-2 ui-text-slate-500 lg:ui-mt-0">
          <button className="hover:ui-text-sky-500" type="button">
            <svg
              className="ui-h-5 ui-w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" stroke="none" />
              <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
            </svg>
          </button>
          <button className="hover:ui-text-sky-500" type="button">
            <svg
              className="ui-h-5 ui-w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" stroke="none" />
              <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
            </svg>
          </button>
          <button
            className="hover:ui-text-sky-500"
            onClick={() => {
              console.log(children);
              navigator.clipboard.writeText(`${children}`).then(
                () => {
                  console.log("Copying to clipboard was successful!");
                },
                (err) => {
                  console.error("Could not copy text: ", err);
                }
              );
            }}
            type="button"
          >
            <svg
              className="ui-h-5 ui-w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" stroke="none" />
              <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
              <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
