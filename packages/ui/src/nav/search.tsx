import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Search() {
  return (
    <form className="ui-relative ui-flex ui-flex-1" action="#" method="GET">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <MagnifyingGlassIcon
        className="ui-pointer-events-none ui-absolute ui-inset-y-0 ui-left-0 ui-h-full ui-w-5 ui-text-gray-400"
        aria-hidden="true"
      />
      <input
        id="search-field"
        className="ui-block ui-h-full ui-w-full ui-border-0 ui-py-0 ui-pl-8 ui-pr-0 dark:ui-bg-gray-900 ui-text-gray-900 dark:ui-text-gray-300 placeholder:ui-text-gray-400 focus:ui-ring-0 sm:ui-text-sm"
        placeholder="Search..."
        type="search"
        name="search"
      />
    </form>
  );
}
