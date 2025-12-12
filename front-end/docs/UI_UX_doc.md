# UI / UX Reference - Knowledge Graph MVP

> **Defines the design language, tokens, and accessibility guardrails for the Knowledge Graph reading experience.** Engineers must cite relevant sections in `.acontext` logs when building or modifying UI.

---

## 1. Design Principles
1. **Clarity Over Novelty** - Prioritize legibility and information density. Typography should resemble high-end editorial sites.
2. **Predictable Navigation** - The outline sidebar behaves consistently across articles; no surprising motion or placement shifts.
3. **Assistive Feedback** - Loading, error, and embed states must surface clear textual cues plus skeletons when possible.
4. **Inclusive By Default** - Meet or exceed WCAG 2.1 AA (contrast, keyboard nav, ARIA labels) with every feature.
5. **Fast Feels Trustworthy** - Perceived performance matters; animations <150ms and avoid blocking inline embeds.

---

## 2. Design Tokens

### 2.1 Color Palette

| Token | HEX | Usage Notes |
|-------|-----|-------------|
| `color.background.default` | `#FFFFFF` | Page background (light mode). |
| `color.background.alt` | `#0F1115` | Page background (dark mode). |
| `color.surface.panel` | `#FFFFFF` | Card/panel surfaces, outline containers. |
| `color.surface.panel.dark` | `#111827` | Dark-mode card surface. |
| `color.text.primary` | `#101828` | Primary body text. |
| `color.text.muted` | `#475467` | Supporting copy + metadata. |
| `color.text.subtle` | `#667085` | Outline headings, helper labels. |
| `color.intent.success` | `#12B76A` | Positive states / accent. |
| `color.intent.warning` | `#F79009` | Caution banners. |
| `color.intent.error` | `#F04438` | Critical errors / embed failures. |

All tokens live in `src/theme/tokens.ts` and mirror CSS variables declared in `src/app/globals.css`.

### 2.2 Typography

| Token | Font Family | Weight | Size / Line Height | Usage |
|-------|-------------|--------|--------------------|-------|
| `type.display.lg` | Geist Sans | 600 | 32 / 40 | Article hero headlines. |
| `type.heading.md` | Geist Sans | 600 | 24 / 32 | Outline titles + H2 headings. |
| `type.body.md` | Geist Sans | 400 | 16 / 24 | Article body text. |
| `type.body.sm` | Geist Sans | 400 | 14 / 20 | Outline links, captions. |
| `type.mono` | Geist Mono | 500 | 13 / 20 | Inline code, code blocks. |

Fallbacks: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` for Sans; `SFMono-Regular, Consolas` for Mono.

### 2.3 Spacing & Layout
- Base grid = 4px multiples.
- Panel padding: 24px desktop / 16px mobile.
- Outline sidebar width: 280px on =1024px screens; stack vertically otherwise.
- Container max widths: 960px default, 1200px for marketing pages.
- Breakpoints: `sm 0-599`, `md 600-1023`, `lg 1024+`.

---

## 3. Component Library

### 3.1 Button
- **Variants:** `primary` (success green), `secondary` (outlined), `ghost` (text link), `destructive` (error red).
- **States:** default, hover (+4% brightness), focus (2px outline), active (-4% brightness), disabled (30% opacity).
- **Usage:** Buttons are rare in MVP (mainly admin scripts). When needed, prefer `ghost` variant for inline actions.

### 3.2 Card / Panel
- Use rounded 24px corners, subtle shadow (`shadow-sm`), border color `color.border`.
- Cards should include a title, supporting copy, and optional metadata row.

### 3.3 Outline List Item
- Typography `type.body.sm`.
- Each item indents 12px per hierarchy level.
- Active section = accent color + 2px left border.

### 3.4 Markdown Article
- H1 top margin 0, rest 32px.
- Code blocks use dark background with 12px radius.
- Lists have 16px spacing with 32px left padding.

### 3.5 YouTube Embed
- Aspect ratio 16:9 with rounded 20px corners.
- Loading skeleton uses `color.surface.panel` background + shimmer.
- Error state shows `color.intent.error` icon + message.

Add new components here before building them.

---

## 4. Interaction Patterns

| Pattern | Description | Triggers | Guidelines |
|---------|-------------|----------|------------|
| **Article Outline** | Sticky outline on desktop, collapsible accordion on mobile. | Page load; scroll updates active heading. | Highlight active heading, allow keyboard focus, provide skip link to content. |
| **Inline Embed** | Lazy-load iframe with placeholder poster + CTA. | Markdown `!https://youtube...` syntax. | Validate URL server-side; show fallback text with watch link if blocked. |
| **Article Navigation** | Next/Previous article controls (Stage 2). | End-of-article view. | Provide contextual titles, ensure 44px tap target. |

---

## 5. Accessibility Requirements
- Minimum contrast: body text =4.5:1, headings =3:1, buttons =4.5:1.
- Outline panel must be keyboard navigable; use `aria-current="true"` for active section.
- Embeds include `title` attributes describing the video.
- Honor “Reduce Motion” by disabling shimmer animations.
- Provide skip links to main content and outline.

---

## 6. Content & Tone
- Voice: confident, curious, and concise.
- Headlines =70 characters; introductory paragraphs =160 words.
- Microcopy uses verbs first (“View source”, “Copy link”).
- Error format: `{What happened}. {Impact}. {What to do next}.`
- Inline code uses backticks and `type.mono` token.

---

## 7. Assets & References
- Logo + icons stored under `public/assets/`.
- Illustration style: simple line art; convert to SVG before committing.
- Source Figma file: `https://figma.com/file/knowledge-graph-mvp` (placeholder link).

---

## 8. Review & Handoff
- Designers update this doc whenever tokens/components change and note revisions in `.acontext/tasks`.
- Engineers cite section numbers in task logs when implementing UI.
- Accessibility audits recorded in `Bug_tracking.md` with IDs referencing affected components.

---

### Usage Checklist
- [x] Every UI change references a section of this doc in its task log.
- [ ] Accessibility checklist documented for Stage 1 features.
- [x] Token tables synced with `src/theme/tokens.ts`.
- [x] Outline + embed patterns described for upcoming work.
