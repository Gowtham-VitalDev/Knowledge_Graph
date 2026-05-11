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

const Outline = ({ headings, activeId, onHeadingClick }: OutlineProps) => {
  if (headings.length === 0) return null;

  return (
    <aside className="outline" aria-label="On this page">
      <h2 className="outline__title">On this page</h2>
      <div className="outline__list">
        {headings.map((heading) => (
          <button
            key={heading.id}
            type="button"
            onClick={() => onHeadingClick(heading.id)}
            className={`outline__item outline__item--level-${heading.level} ${
              activeId === heading.id ? "outline__item--active" : ""
            }`}
          >
            {heading.text}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Outline;
