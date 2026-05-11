# UI / UX Reference — KnowledgeGraph

> Defines the design system, interaction rules, and accessibility guardrails for the KnowledgeGraph MVP. Tokens here are the source of truth for colors, type, and spacing — do not hard-code values in components.

---

## 1. Design Principles

- **Editorial calm.** The product reads like a curated tech publication, not a busy social feed. White space, restrained color, confident typography.
- **Structure is the feature.** Headings, code blocks, and outline navigation are first-class. Every article must feel scannable.
- **Light by default, accessible by default.** Light theme only for MVP. Contrast and keyboard support are non-negotiable, not polish.
- **AI-friendly content.** The DOM should mirror the Markdown structure (semantic `<h1>/<h2>/<h3>`, `<pre>/<code>`, `<ul>/<li>`) so downstream consumers can extract reliably.

---

## 2. Design Tokens

### 2.1 Color Palette

> Source values reflect the existing BlogView styling and the approved design direction. Migrate hard-coded hex values from BlogView.css into Tailwind theme extensions or a `theme/tokens.ts` module as the design system matures.

**Surface / background**
| Token | HEX | Usage |
|-------|-----|-------|
| `color.surface.canvas` | `#FFFFFF` | Primary page background (article reader, navbar) |
| `color.surface.muted` | `#F8F8F8` | Sidebar / outline panel background |
| `color.surface.code` | `#F8F8F8` | Code block background |
| `color.surface.code-inline` | `#F5F5F5` | Inline code background |
| `color.surface.tag` | `#F0F0F0` | Code label badge, neutral pills |
| `color.surface.active-soft` | `#E8E8E8` | Active outline item background |
| `color.surface.hover` | `#F0F0F0` | Hover background for list items |
| `color.surface.active-gradient-start` | `#EFF6FF` | Active heading highlight gradient start |

**Text**
| Token | HEX | Usage |
|-------|-----|-------|
| `color.text.primary` | `#1A1A1A` | Body emphasis (`<strong>`), H1 |
| `color.text.heading` | `#222222` | H2/H3 |
| `color.text.body` | `#333333` | Default body text |
| `color.text.muted` | `#555555` | Paragraph copy (longer-form) |
| `color.text.subtle` | `#666666` | TOC items, captions |
| `color.text.label` | `#999999` | Outline section label |

**Brand / accent**
| Token | HEX | Usage |
|-------|-----|-------|
| `color.brand.primary` | `#2563EB` | Active heading text, active outline accent, brand CTAs |
| `color.brand.code-magenta` | `#D63384` | Inline code text (existing pattern) |

**Borders**
| Token | HEX | Usage |
|-------|-----|-------|
| `color.border.default` | `#E5E5E5` | Sidebar divider, code block border |
| `color.border.subtle` | `#F0F0F0` | H2 underline (`border-bottom`) |
| `color.border.scroll` | `#DDDDDD` | Scrollbar thumb |

**Category accents (TBD — finalize before Feed implementation)**
| Category | Token | Suggested HEX |
|----------|-------|---------------|
| AI & ML | `color.cat.ai` | TBD |
| Machine Learning | `color.cat.ml` | TBD |
| Systems | `color.cat.systems` | TBD |
| Web | `color.cat.web` | TBD |
| Data Science | `color.cat.data` | TBD |
| Design | `color.cat.design` | TBD |
| Engineering | `color.cat.engineering` | TBD |
| Research | `color.cat.research` | TBD |

> **Action item (R-02):** Project Head to confirm a coherent 8-color category palette before Stage 1 Feed implementation. Until then, use a neutral pill with category text in `color.brand.primary`.

> Once Tailwind v4 `@theme` migration is done, expose tokens as CSS custom properties (`--kg-color-...`) and use Tailwind utilities like `bg-canvas`, `text-muted`.

### 2.2 Typography

| Token | Font Family | Weight | Size / Line height | Usage |
|-------|-------------|--------|--------------------|-------|
| `type.display.lg` | system-ui stack | 700 | 40 / 48 | Feed hero headline (Page 1) |
| `type.display.md` | system-ui stack | 700 | 32 / 40 | Article title (H1, Page 2) |
| `type.heading.lg` | system-ui stack | 600 | 24 / 32 | H1 inside article body |
| `type.heading.md` | system-ui stack | 600 | 18 / 28 | H2 |
| `type.heading.sm` | system-ui stack | 600 | 15 / 22 | H3 |
| `type.body.md` | system-ui stack | 400 | 15 / 27 (~1.8) | Paragraphs (line-height 1.8 per BlogView) |
| `type.body.sm` | system-ui stack | 400 | 13 / 20 | Captions, byline |
| `type.label` | system-ui stack | 600 | 11 / 16 | Section labels (e.g., "ON THIS PAGE"), category pills |
| `type.toc.h2` | system-ui stack | 400 / 600 (active) | 12 / 16 | Outline H2 entries |
| `type.toc.h3` | system-ui stack | 400 / 600 (active) | 11 / 16 | Outline H3 entries (indented) |
| `type.mono` | `Menlo, Monaco, "Courier New", monospace` | 500 | 13 / 21 | Inline code + code blocks |

**Font stack (current):** `-apple-system, system-ui, "Segoe UI", sans-serif`

> Use a system stack for MVP — zero font-loading cost. A custom display font (e.g., a refined serif/display sans) can be introduced in Stage 3 once the visual identity is locked.

**Letter-spacing:** Section labels (`ON THIS PAGE`) use `letter-spacing: 0.1em` and `text-transform: uppercase`.

### 2.3 Spacing & Layout

- **Base grid:** `4px`. All spacing is a multiple (`4, 8, 12, 16, 20, 24, 32, 40, 60`).
- **Reader content max-width:** ~720–800px for prose; the BlogView reader currently uses `padding: 40px 60px` — preserve that visual rhythm.
- **Outline panel width:** `280px` (fixed at desktop; full-width below 1024px).
- **Page max-width (Feed):** `1200px` content container, centered.
- **Card spacing:** standard cards in the feed use `24px` vertical spacing between cards.

### 2.4 Breakpoints

| Name | Range | Notes |
|------|-------|-------|
| `sm` | `0–767px` | Outline panel hidden; reader gets tight padding (`20px 24px`) |
| `md` | `768–1023px` | Outline becomes a horizontal strip below content (max-height 280px) |
| `lg` | `1024px+` | Side-by-side: reader + outline (target experience) |
| `xl` | `1280px+` | Same as lg with more breathing room |

> MVP scope is `lg+`. `sm` and `md` are available because BlogView.css already handles them, but they are not part of the MVP acceptance criteria — full responsive design is Stage 3 (V3-REQ-001).

---

## 3. Component Library

For each component: structure, states, usage, file location (when implemented). Reference these specs in task logs.

### 3.1 Top Navbar (Feed)
- **Anatomy:** Logo (left) · Nav links (center: Feed / AI & ML / Systems / Web / Data) · Search icon + Sign in (text link) + Get started (CTA) (right)
- **States:** default, link-hover (subtle underline or color shift to `color.brand.primary`), CTA-hover (darken).
- **Hit area:** Min 44×44 for icon buttons.
- **MVP behavior:** Search icon and Sign in are visual-only; Get started is visual-only.
- **File:** TBD `front-end/src/components/Navbar/Navbar.tsx`

### 3.2 Hero Section (Feed)
- **Anatomy:** Editorial label (uppercase, small) + Headline (`type.display.lg`) + Subheading (`type.body.md`).
- **Spacing:** ~64px top, 40px bottom margin.

### 3.3 Category Filter Pills
- **Anatomy:** Horizontal row of pill buttons (rounded-full).
- **States:** default (transparent bg, gray border), hover (light gray fill), active (`color.brand.primary` fill, white text).
- **Behavior:** Single-select; clicking another pill swaps active.
- **MVP:** No actual filtering; visual state only.

### 3.4 Article Card — Hero (Feed, first card)
- **Anatomy:** Large image (left, ~40% width) + content column (category tag, large title, excerpt, byline with avatar/date/read time).
- **States:** default, hover (subtle elevation or background shift).
- **Click:** navigates to `/article/:slug`.

### 3.5 Article Card — Standard
- **Anatomy:** Content column (category tag, title, excerpt, byline) + thumbnail (right).
- **Same states/behavior as hero card.**

### 3.6 Sidebar — Trending This Week
- **Anatomy:** Numbered list (`01`–`04`), each with title + author + read time.
- **Number style:** `type.label`, `color.text.label`, larger weight.

### 3.7 Sidebar — Browse Topics (tag cloud)
- **Anatomy:** Inline-block tags, `color.surface.tag` background, `color.text.body` text.
- **Hover:** background shifts to `color.surface.active-soft`.

### 3.8 Sidebar — Newsletter Widget
- **Anatomy:** Heading "The Weekly Graph" + short description + email input + Subscribe button.
- **MVP:** Submit is no-op (preventDefault + visible toast/animation optional).

### 3.9 Footer
- **Anatomy:** Logo + About / Privacy / Terms / Contact (left) + Copyright (right).
- **Style:** `color.text.subtle` text on `color.surface.canvas`.

### 3.10 Blog Navbar (Page 2)
- **Anatomy:** Logo + breadcrumb trail (e.g., `Engineering > System Architecture`) + Share + Bookmark icon buttons (right).
- **MVP:** Share and Bookmark are visual-only.

### 3.11 Article Body
- See Markdown Render Spec (§4).

### 3.12 Outline Panel ("On This Page")
- **Anatomy:** Section label (uppercase, `type.label`, `color.text.label`) + list of TOC items.
- **TOC item:** button with left border (3px transparent), padded `10px 20px`. Active state: `color.brand.primary` text, `color.surface.active-soft` bg, primary left border.
- **Hierarchy:** H3 indented (`padding-left: 40px`) and slightly smaller font.
- **Sticky behavior:** Panel is fixed in the right column on `lg+`.
- **File:** Currently embedded in [BlogView.tsx](../../front-end/src/views/Blog/BlogView.tsx); may be extracted to a dedicated `components/Outline/` later.

### 3.13 Buttons
- **Variants:** `primary` (Get started CTA), `ghost` (nav links), `icon` (search, share, bookmark).
- **States:** default / hover / pressed / focus-visible / disabled.
- **Focus ring:** Always present in `focus-visible`. Use `outline: 2px solid color.brand.primary; outline-offset: 2px`.
- **Hit area:** Min 44×44.

### 3.14 Inputs (newsletter only for MVP)
- **States:** default / focus / error / disabled.
- **Border:** `color.border.default`. Focus: `color.brand.primary`.

---

## 4. Markdown Render Spec

The Markdown rendered in BlogView must produce these visual elements (existing BlogView.css already covers most):

| Markdown | Element | Style notes |
|----------|---------|-------------|
| `# H1` | `<h1>` | `type.heading.lg`, dark text, 32px top margin |
| `## H2` | `<h2>` | `type.heading.md`, with `border-bottom: 2px solid color.border.subtle`, padding-bottom 8px |
| `### H3` | `<h3>` | `type.heading.sm`, lighter weight |
| paragraph | `<p>` | `type.body.md`, line-height 1.8, `color.text.muted` |
| `**bold**` | `<strong>` | `color.text.primary`, weight 600 |
| `` `code` `` | `<code>` (inline) | mono font, `color.brand.code-magenta`, 1px border |
| triple-backtick block | `<pre><code>` | `color.surface.code` bg, language label badge top-right (`color.surface.tag`) |
| `- item` | `<ul><li>` | `color.text.muted`, line-height 1.8 |

**Active heading highlight** (driven by scroll spy): linear gradient bg + 4px primary left border + bold primary text.

---

## 5. Interaction Patterns

| Pattern | Description | Triggers | Guidelines |
|---------|-------------|----------|------------|
| Outline click → scroll | Click any heading in the outline; article smooth-scrolls to that section. | Click on `.toc-item`. | Account for sticky navbar offset (~20px in current implementation). Use `behavior: "smooth"`. |
| Scroll spy | Active heading highlights as the user reads. | Vertical scroll within `.reader`. | Use IntersectionObserver with `rootMargin: "-20% 0px -70% 0px"` so a heading becomes "active" near the top of the viewport. |
| Category pill toggle | Single-select pill row. | Click. | Visual-only for MVP; no debouncing needed. |
| Share / Bookmark | Icon buttons in Blog navbar. | Click. | MVP: visual-only — don't implement share APIs yet. |
| Newsletter submit | Email input + Subscribe button. | Click / Enter. | MVP: preventDefault, optionally show "Thanks!" message; no network call. |
| Load more | Bottom of feed. | Click. | MVP: visual-only (no-op). |

---

## 6. Accessibility Requirements

- **Contrast:** Body text ≥ 4.5:1, large text ≥ 3:1. Verify before tokenizing category accent colors.
- **Keyboard:** All interactive elements (nav links, pills, cards, outline buttons, share/bookmark, newsletter input) reachable via Tab in DOM order. Visible `:focus-visible` ring required.
- **Semantic HTML:** Use `<button>` for clickable non-link actions, `<a>` for navigation, `<nav>`, `<main>`, `<aside>`, `<footer>` landmarks.
- **Outline panel:** Each TOC item must be a real `<button>` (already true in BlogView.tsx) with descriptive accessible text.
- **Reduced motion:** Respect `prefers-reduced-motion: reduce` — disable smooth scroll for those users (use `scroll-behavior: auto`).
- **Skip link:** "Skip to content" link, visible on focus, target the article reader. (Stage 3 follow-up if not in MVP.)
- **Images:** Always `alt` text. Decorative images use `alt=""`.

---

## 7. Content & Tone

- **Voice:** Calm, confident, technical. No marketing fluff.
- **Microcopy:** Verbs first ("Subscribe", "Save article", "Share"). Avoid jargon outside its proper context.
- **Error / empty states:** `{What happened}. {What to do next}.` E.g., "No articles in this category. Try All or Engineering."
- **Read time copy:** "5 min read" (lowercase, no period).

---

## 8. Assets & References

- **Design files:** Approved screenshots referenced in [claude.md](../../claude.md). Figma project: TBD.
- **Icon source:** [front-end/public/icons.svg](../../front-end/public/icons.svg) (SVG sprite — confirm contents and document IDs).
- **Image directory:** [front-end/src/assets/](../../front-end/src/assets/) for imported images, [front-end/public/](../../front-end/public/) for static.
- **Image licensing:** TBD — placeholder images for MVP; replace with licensed/owned imagery before launch.

---

## 9. Review & Handoff

- Any UI change must reference the relevant section of this doc in its task log.
- New shared components require a spec entry in §3 before merging.
- Token additions/changes go through this doc first, then propagate to Tailwind theme / `tokens.ts`.
- Accessibility regressions are tracked in [bugs.md](../bugs.md).

---

### Usage Checklist
- [ ] No hard-coded hex values added outside this doc / theme module.
- [ ] New component has a spec entry in §3 with file path.
- [ ] Keyboard reachable + focus-visible verified.
- [ ] Contrast verified for new text/background pairings.
- [ ] No layout depends on a fixed pixel viewport (use tokens / utilities).
