"use client";
import { Highlight, themes } from "prism-react-renderer";
import { extractJSON } from "../utils/extractJSON";

export const RenderCode = ({ content }: { content: any }) => {
  const possibleJson = extractJSON(content);
  if (!possibleJson) return null;

  const [jsonObject] = possibleJson;
  const codeBlock = JSON.stringify(jsonObject, null, 2);

  return (
    <Highlight theme={themes.shadesOfPurple} code={codeBlock} language="tsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
