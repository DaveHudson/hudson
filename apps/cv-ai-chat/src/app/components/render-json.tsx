import { extractJSON } from "../utils/extractJSON";

export const RenderJson = ({ content }: { content: any }) => {
  const possibleJson = extractJSON(content);
  if (!possibleJson) return null;

  const [jsonObject] = possibleJson;

  return (
    <pre className="h-[400px] overflow-auto rounded-lg p-4 text-base ring-1 ring-slate-200/10 lg:h-[600px]">
      <code className={`"language-json"`}>{JSON.stringify(jsonObject, null, 2)}</code>
    </pre>
  );
};
