import { useState } from "react";
import "./Outline.css";

export interface OutlineHeading {
  id: string;
  level: number;
  text: string;
}

interface OutlineProps {
  headings: OutlineHeading[];
  activeId: string | null;
  onHeadingClick: (id: string) => void;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`outline-accordion__chevron${open ? " outline-accordion__chevron--open" : ""}`}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Outline = ({ headings, activeId, onHeadingClick }: OutlineProps) => {
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  const activeHeading = headings.find((h) => h.id === activeId);

  const handleClick = (id: string) => {
    onHeadingClick(id);
    setOpen(false);
  };

  return (
    <>
      {/* Desktop: sticky right column */}
      <aside className="outline" aria-label="On this page">
        <span className="outline__label">On this page</span>
        <div className="outline__list">
          {headings.map((heading) => (
            <button
              key={heading.id}
              type="button"
              onClick={() => onHeadingClick(heading.id)}
              className={[
                "outline__item",
                `outline__item--level-${heading.level}`,
                activeId === heading.id ? "outline__item--active" : "",
              ].join(" ").trim()}
            >
              {heading.text}
            </button>
          ))}
        </div>
      </aside>

      {/* Mobile: collapsible accordion rendered above article body via BlogView */}
      <div className="outline-accordion" aria-label="Table of contents">
        <button
          type="button"
          className="outline-accordion__trigger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="outline-accordion__label">On this page</span>
          <span className="outline-accordion__title">
            {activeHeading?.text ?? headings[0]?.text}
          </span>
          <ChevronIcon open={open} />
        </button>

        {open && (
          <div className="outline-accordion__body">
            {headings.map((heading) => (
              <button
                key={heading.id}
                type="button"
                onClick={() => handleClick(heading.id)}
                className={[
                  "outline-accordion__item",
                  `outline-accordion__item--level-${heading.level}`,
                  activeId === heading.id ? "outline-accordion__item--active" : "",
                ].join(" ").trim()}
              >
                {heading.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Outline;
