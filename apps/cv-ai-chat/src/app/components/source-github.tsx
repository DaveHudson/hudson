import invariant from "tiny-invariant";
import type { SourceGitHubType } from "./render-sources";

export const SourceGitHub = ({ source }: { source: SourceGitHubType }) => {
  invariant(source, "Source must be provided");
  // console.log("source", source);
  return (
    <div id={source.id} className="space-y-2">
      {/* <pre>{JSON.stringify(source, null, 2)}</pre> */}

      <div className="flex space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
          />
        </svg>

        <a
          href={`${source.repository}/blob/${source.branch}/${source["source"]}`}
          target="_blank"
          className="text-sky-500 hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-500 text-sm"
        >
          {source["source"]}
        </a>
      </div>
    </div>
  );
};
