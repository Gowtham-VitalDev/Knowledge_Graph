# KnowledgeGraph — MVP Design Brief
**Version:** 1.0  
**Prepared by:** AI Project Manager  
**Project Head:** Gowtham  
**Scope:** Frontend MVP — Page 1 (Feed) + Page 2 (Blog View)

---

## Project Overview

KnowledgeGraph is a tech news and articles platform. The core differentiator is **how content is delivered** — structured Markdown with an interactive outline panel, designed for both human readability and AI-friendly consumption.

---

## Design References (from approved screens)

Both screens have been reviewed and approved as the visual direction for MVP.

- **Page 1 reference:** Provided design screenshot (Feed view)
- **Page 2 reference:** Provided design screenshot (Blog view)

---

## Page 1 — Feed / List View

### Layout
- Fixed top navbar: Logo (left), Nav links: Feed / AI & ML / Systems / Web / Data (center), Search icon + Sign in + Get started CTA (right)
- Hero section: Editorial label + large headline + subheading
- Horizontal category filter pill row: All / Artificial Intelligence / Machine Learning / Systems / Web Development / Data Science / Design / Engineering
- Two-column body layout:
  - **Left (main):** Article card list — latest articles feed
  - **Right (sidebar):** Trending this week + Browse topics tag cloud + Newsletter signup widget

### Article Card — Hero Card (first article)
- Large image (left, ~40% width)
- Category tag (pill, coloured)
- Large title
- Excerpt (2–3 lines)
- Author avatar + name + date + read time

### Article Card — Standard Cards (below hero)
- Category tag
- Title
- Short excerpt
- Author avatar + name + date + read time
- Thumbnail image (right-aligned)

### Sidebar Components
**Trending This Week**
- Numbered list (01–04)
- Title + Author + Read time

**Browse Topics**
- Tag cloud of topics: Algorithms, Architecture, Blockchain, Career, CSS, Databases, DevOps, Go, GraphQL, JavaScript, Leadership, Performance, Python, React, Security, TypeScript

**Newsletter Widget**
- Heading: "The Weekly Graph"
- Short description
- Email input + Subscribe button

### Footer
- Logo + About / Privacy / Terms / Contact links (left)
- Copyright (right)

### Interactions (MVP)
- Category filter pills: active state styling on selection
- "Load more articles" button at bottom of feed
- Navbar links: hover states

---

## Page 2 — Blog / Article View

### Layout
- Minimal top navbar: Logo + breadcrumb trail (e.g. Engineering > System Architecture) + Share + Bookmark actions (right)
- Two-column reading layout:
  - **Left (main, ~70% width):** Full article content rendered in Markdown
  - **Right (sidebar, ~30% width):** "On This Page" outline panel

### Article Content Area (Left)
- Category pill tag at top (e.g. RESEARCH)
- Large article title (H1)
- Byline: Author name + read time
- Body content in clean Markdown render:
  - H2 / H3 section headings
  - Paragraph text
  - Inline code formatting
  - Code blocks (syntax-highlighted, monospace)
  - Bullet lists with bold lead-in labels

### Outline Panel (Right) — "On This Page"
- Sticky panel, stays in view while scrolling
- Lists H2 and H3 headings extracted from article
- Indented hierarchy (H3 sits under parent H2)
- **Click to scroll:** Clicking any heading smoothly scrolls the article to that section
- **Scroll spy:** Active heading highlights in the panel as the user reads (tracks scroll position)
- Label: "ON THIS PAGE"

### Interactions (MVP)
- Click heading in outline → smooth scroll to section in article
- Scroll spy → active heading highlights in outline panel as user scrolls
- Share + Bookmark buttons in navbar (UI only for MVP, no backend required)

---

## Typography Direction
- Editorial / refined tone
- Large, confident display font for titles and hero text
- Clean, readable body font — optimised for long-form reading
- Monospace font for all code blocks

---

## Colour & Theme
- Light theme (as per reference screens)
- Neutral off-white background
- Dark text for readability
- Coloured category pills per topic (each category gets a distinct accent colour)
- Active outline heading: highlighted with a brand accent colour

---

## MVP Scope — What's IN

| Item | Included |
|------|----------|
| Page 1 — Feed layout | ✅ |
| Page 2 — Blog view layout | ✅ |
| Outline panel with click-to-scroll | ✅ |
| Scroll spy on outline panel | ✅ |
| Category filter pills (UI) | ✅ |
| Trending sidebar | ✅ |
| Browse topics tag cloud | ✅ |
| Newsletter widget (UI only) | ✅ |
| Load more button (UI only) | ✅ |
| Share / Bookmark (UI only) | ✅ |
| Markdown rendering | ✅ |
| Code block syntax highlighting | ✅ |

## MVP Scope — What's OUT (post-MVP)

| Item | Notes |
|------|-------|
| Search functionality | Post-MVP |
| Auth / Sign in flow | Post-MVP |
| Newsletter backend | Post-MVP |
| Filters with live data | Post-MVP |
| Dark mode | Post-MVP |
| Mobile / responsive layout | Post-MVP |
| AI features | To be defined (see REQ-003) |

---

## Notes for Developer

- Treat all data as static/hardcoded for MVP — no backend required
- Markdown rendering: use an existing library (e.g. `marked.js` or `react-markdown`)
- Outline panel headings: parse H2/H3 from the Markdown content at render time
- Scroll spy: use `IntersectionObserver` API — lightweight, no library needed
- Smooth scroll: CSS `scroll-behavior: smooth` is sufficient for MVP

---

*Requirements tracked under REQ-004, REQ-005, REQ-006 in the project requirements log.*
