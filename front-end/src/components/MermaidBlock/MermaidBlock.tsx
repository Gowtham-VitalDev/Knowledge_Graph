import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";
import "./MermaidBlock.css";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    background: "#13131a",
    primaryColor: "#FF2D95",
    primaryTextColor: "#e2e2e8",
    primaryBorderColor: "#2a2a35",
    lineColor: "#6e6e8a",
    secondaryColor: "#1e1e2e",
    tertiaryColor: "#1e1e2e",
    edgeLabelBackground: "#13131a",
    fontFamily: "var(--font-ui, system-ui)",
  },
});

interface MermaidBlockProps {
  code: string;
}

const MermaidBlock = ({ code }: MermaidBlockProps) => {
  const id = useId().replace(/:/g, "mermaid");
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mermaid
      .render(`mermaid-${id}`, code)
      .then(({ svg }) => {
        if (containerRef.current) containerRef.current.innerHTML = svg;
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to render diagram");
      });
  }, [code, id]);

  if (error) {
    return (
      <pre className="mermaid-block mermaid-block--error">
        <code>{code}</code>
      </pre>
    );
  }

  return <div className="mermaid-block" ref={containerRef} />;
};

export default MermaidBlock;
