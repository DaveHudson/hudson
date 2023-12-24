import { UserIcon } from "@heroicons/react/20/solid";
import { cn } from "../lib/utils";
import ReactMarkdown from "react-markdown";

export default function MessageUser({ children }: { children: string }) {
  return (
    <div className="ui-flex">
      <div className="ui-flex ui-flex-row ui-px-4 ui-py-1">
        <span
          className={cn(
            "ui-bg-blue-400 ui-h-8 ui-w-8 ui-rounded-full ui-flex ui-items-center ui-justify-center ui-ring-8 ui-ring-white dark:ui-ring-gray-900"
          )}
        >
          <UserIcon aria-hidden="true" className="ui-h-4 ui-w-4 ui-text-white" />
        </span>
      </div>
      <div className="ui-flex ui-flex-col ui-max-w-2xl ui-prose ui-text-sky-900 dark:ui-text-slate-200 ui-font-medium">
        <ReactMarkdown>{children}</ReactMarkdown>
      </div>
    </div>
  );
}
