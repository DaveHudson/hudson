import { extractYouTubeEmbed } from "../utils/extractYouTubeEmbed";
import { extractJSON } from "../utils/extractJSON";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const RenderContentStream = ({ content }: { content: any }) => {
  // Strip content of any Rich content
  const possibleJson = extractJSON(content);
  if (!possibleJson) {
    const iframe = extractYouTubeEmbed(content);
    const contentWithoutIframe = iframe ? content.replace(iframe, "") : content;

    return (
      <div className="prose">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a className="text-sky-700 hover:text-sky-500 underline" {...props} contentEditable="false" />
            ),
            code(props) {
              const { children, className, node, ...rest } = props;
              console.log("className", className);
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                // @ts-expect-error
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={vscDarkPlus}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {contentWithoutIframe}
        </ReactMarkdown>
      </div>
    );
  }

  // Remove JSON from original content
  const contentWithoutJson = content.slice(0, possibleJson[1]) + content.slice(possibleJson[2]);

  return <div>{contentWithoutJson}</div>;
};
