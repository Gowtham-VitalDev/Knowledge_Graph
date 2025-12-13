import { AppShell } from "@components/layout/AppShell";
import { MarkdownPreview } from "@components/markdown/MarkdownPreview";
import { OutlinePanel } from "@components/navigation/OutlinePanel";
import { theme } from "@theme";
import type { OutlineNode } from "@utils/markdown";
import { extractOutline } from "@utils/markdown";

const sampleArticle = `# Designing a Knowledge Graph MVP

Welcome to the Stage 0 foundation of the Knowledge Graph experience. This page exists to validate the documentation-driven workflow and to show how Markdown content will look in the browser.

## Why Markdown?

Markdown keeps articles structured, screen-reader friendly, and lightning fast. It becomes the single source of truth for both article rendering and navigation outlines.

### Supported Elements

- Headings
- Inline code like \`console.log\`
- Code blocks
- Embedded assets

## Outline Generation

Every heading will be parsed into a table of contents so readers can jump to any section. The quick navigation on the right demonstrates the intent for future stages.

## Next Steps

Stage 1 will swap in live content, automatic outline generation, and inline video embeddings using the \`!https://youtube.com/watch?v=xyz\` syntax.
`;

const outlineItems: OutlineNode[] = extractOutline(sampleArticle);

export default function Home() {
  return (
    <AppShell maxWidth={layoutColumnWidth}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="rounded-2xl border border-stroke bg-panel p-6 shadow-md">
          <header className="mb-6 space-y-2">
            <p className="text-sm font-medium uppercase tracking-wide text-subtle">
              Stage 0 · Foundations
            </p>
            <h1 className="text-3xl font-semibold text-foreground">
              Knowledge Graph Reference Article
            </h1>
            <p className="text-base text-muted">
              Demo content rendered from Markdown to verify typography, spacing,
              and outline scaffolding ahead of the core MVP work.
            </p>
          </header>

          <MarkdownPreview content={sampleArticle} />
        </section>
        <div className="lg:sticky lg:top-10">
          <OutlinePanel items={outlineItems} />
        </div>
      </div>
    </AppShell>
  );
}

const layoutColumnWidth = theme.layout.containerWidths.desktop;
