import { extractJSON } from "../utils/extractJSON";
import ReactMarkdown from "react-markdown";

export const RenderContentStream = ({ content }: { content: any }) => {
  // Strip content of any Rich content
  const possibleJson = extractJSON(content);
  if (!possibleJson)
    return (
      <div>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );

  // Remove JSON from original content
  const contentWithoutJson = content.slice(0, possibleJson[1]) + content.slice(possibleJson[2]);

  return <div>{contentWithoutJson}</div>;
};
