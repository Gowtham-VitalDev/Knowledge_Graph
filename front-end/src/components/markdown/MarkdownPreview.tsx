import { type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { slugifyHeading } from "@utils/markdown";

type MarkdownPreviewProps = {
  content: string;
  className?: string;
};

const collectText = (children?: ReactNode): string => {
  if (!children) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map((child) => collectText(child)).join(" ");
  }
  if (
    typeof children === "object" &&
    "props" in (children as Record<string, unknown>)
  ) {
    return collectText((children as Record<string, unknown>).props?.children);
  }
  return "";
};

const heading =
  (Tag: keyof JSX.IntrinsicElements) =>
  ({ children }: { children?: ReactNode }) => {
    const label = collectText(children);
    const id = slugifyHeading(label);
    return <Tag id={id}>{children}</Tag>;
  };

export function MarkdownPreview({
  content,
  className = "",
}: MarkdownPreviewProps) {
  return (
    <article className={`markdown-preview ${className}`}>
      <ReactMarkdown
        components={{
          h1: heading("h1"),
          h2: heading("h2"),
          h3: heading("h3"),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
