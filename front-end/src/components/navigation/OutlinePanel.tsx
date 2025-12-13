import type { OutlineNode } from "@utils/markdown";

type OutlinePanelProps = {
  items: OutlineNode[];
  title?: string;
};

export function OutlinePanel({
  items,
  title = "On this page",
}: OutlinePanelProps) {
  return (
    <nav className="rounded-xl border border-stroke bg-panel p-4 shadow-sm">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-subtle">
        {title}
      </p>
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className="text-foreground transition hover:text-accent focus-within:text-accent"
            style={{ paddingLeft: item.level * 12 }}
          >
            <a href={`#${item.id}`} className="block py-1">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
