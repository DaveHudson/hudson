import UserProfile from "./user-profile";
import Search from "./search";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Header({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) {
  return (
    <div className="ui-sticky ui-top-0 ui-z-40 ui-flex ui-h-16 ui-shrink-0 ui-items-center ui-gap-x-4 ui-border-b ui-border-gray-200 dark:ui-border-gray-700 ui-px-4 ui-shadow-sm sm:ui-gap-x-6 sm:ui-px-6 lg:ui-px-8">
      <button
        type="button"
        className="ui--m-2.5 ui-p-2.5 ui-text-gray-700 dark:ui-text-gray-300 lg:ui-hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="ui-sr-only">Open sidebar</span>
        <Bars3Icon className="ui-h-6 ui-w-6" aria-hidden="true" />
      </button>
      <div className="ui-flex ui-flex-1 ui-gap-x-4 ui-self-stretch lg:ui-gap-x-6">
        <Search />
        <div className="ui-flex ui-items-center ui-gap-x-4 lg:ui-gap-x-6">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
