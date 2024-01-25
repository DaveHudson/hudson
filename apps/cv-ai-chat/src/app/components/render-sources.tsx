import { JSONValue } from "ai";
import invariant from "tiny-invariant";
import { SourceBlog } from "./source-blog";
import { SourceMarkdown } from "./source-markdown";
import { SourceGitHub } from "./source-github";

export type BaseSourceType = {
  id: string;
  sourcetype: string;
  source: string;
};

export type SourceMarkdownType = BaseSourceType & {
  "loc.lines.from"?: number;
  "loc.lines.to"?: number;
};

export type SourceGitHubType = BaseSourceType & {
  branch?: string;
  repository?: string;
};
export type SourceBlogType = BaseSourceType & {};

export const RenderSources = ({ data }: { data: JSONValue }) => {
  invariant(data, "Data must be provided");
  // console.log("data", data);
  if (typeof data[0] === "object" && data[0] !== null && "sources" in data[0]) {
    const sources = data[0].sources as BaseSourceType[];
    // console.log("sources", sources);

    const seenUrls = new Set();
    const uniqueSources = sources.filter((source) => {
      if (seenUrls.has(source.source)) {
        return false;
      } else {
        seenUrls.add(source.source);
        return true;
      }
    });

    return (
      <>
        <hr className="mt-4 pb-2" />
        <h2 className="text-sm pb-2">Sources referenced in this answer</h2>
        {/* <pre>{JSON.stringify(uniqueSources, null, 2)}</pre> */}
        {uniqueSources.map((item: BaseSourceType) => {
          return (
            <>
              {item.sourcetype === "blog" && <SourceBlog source={item as SourceBlogType} />}
              {item.sourcetype === "github" && <SourceGitHub source={item as SourceGitHubType} />}
              {item.sourcetype === "markdown" && <SourceMarkdown source={item as SourceMarkdownType} />}
            </>
          );
        })}
      </>
    );
  }
};
