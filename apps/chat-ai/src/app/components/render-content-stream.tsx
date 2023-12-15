import { extractJSON } from "../utils/extractJSON";
import ReactMarkdown from "react-markdown";

export const RenderContentStream = ({ content }: { content: any }) => {
  // Strip content of any Rich content
  const possibleJson = extractJSON(content);
  if (!possibleJson)
    return (
      <div>
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a className="text-sky-700 hover:text-sky-500 underline" {...props} contentEditable="false" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );

  // Remove JSON from original content
  const contentWithoutJson = content.slice(0, possibleJson[1]) + content.slice(possibleJson[2]);

  return <div>{contentWithoutJson}</div>;
};
