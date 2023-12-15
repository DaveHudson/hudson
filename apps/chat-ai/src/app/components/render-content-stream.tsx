import { extractJSON } from "../utils/extractJSON";

export const RenderContentStream = ({ content }: { content: any }) => {
  // Strip content of any Rich content
  const possibleJson = extractJSON(content);
  if (!possibleJson) return null;

  // Remove JSON from original content
  const contentWithoutJson = content.slice(0, possibleJson[1]) + content.slice(possibleJson[2]);

  return <>{contentWithoutJson}</>;
};
