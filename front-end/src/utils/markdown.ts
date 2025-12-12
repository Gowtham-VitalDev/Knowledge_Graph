export type OutlineNode = {
  id: string;
  label: string;
  level: number;
};

const headingRegEx = /^(#{1,3})\s+(.*)$/gm;

export function extractOutline(markdown: string): OutlineNode[] {
  const matches: OutlineNode[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegEx.exec(markdown)) !== null) {
    const level = match[1].length;
    const label = match[2].trim();
    const id = slugifyHeading(label);

    matches.push({ id, label, level });
  }

  return matches;
}

export function slugifyHeading(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
