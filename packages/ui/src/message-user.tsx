import { UserIcon } from "@heroicons/react/20/solid";
import { cn } from "../lib/utils";

export default function MessageUser({ children }: { children: React.ReactNode }) {
  return (
    <div className="ui-flex">
      <div className="ui-flex ui-flex-row ui-px-4 ui-py-1">
        <span
          className={cn(
            "ui-bg-blue-400 ui-h-6 ui-w-6 ui-rounded-full ui-flex ui-items-center ui-justify-center ui-ring-8 ui-ring-white dark:ui-ring-gray-900"
          )}
        >
          <UserIcon aria-hidden="true" className="ui-h-4 ui-w-4 ui-text-white" />
        </span>
      </div>
      <div className="ui-flex ui-max-w-3xl ui-items-center">
        <p>{children}</p>
      </div>
    </div>
  );
}
