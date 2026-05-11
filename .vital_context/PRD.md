# Product Requirements Document

> Defines **what** the product must deliver. Keep it solution-agnostic — no file paths or tech choices here. Update this doc first when scope changes, then cascade to `CONTEXT.md`.

---

## Document Meta

| Field | Value |
|-------|-------|
| **Product Name** | KnowledgeGraph |
| **Version** | 1.0 |
| **Owner** | Gowtham (Project Head) |
| **Status** | In Review |
| **Last Updated** | 2026-05-06 |

---

## 1. Product Overview

- **What:** A tech news + articles platform that delivers structured Markdown content with an interactive outline panel for fast navigation.
- **Why:** Long-form technical content is hard to scan; existing platforms either prioritize SEO theatrics or lock content behind paywalls. KnowledgeGraph delivers clean, AI-friendly Markdown with editorial polish so readers (and downstream AI agents) can navigate by section, jump to code blocks, and consume technical depth without friction.
- **Who:** Software engineers, ML/AI practitioners, technical leads, and AI agents that ingest tech articles.

---

## 2. Personas

### Persona 1 – Practicing Engineer ("Ravi")
- **Profile:** Mid-to-senior software engineer, reads 3–5 articles per week, often on multiple devices, frequently scans before deep-reading.
- **Goals:** Find high-signal articles fast; jump straight to the relevant section (architecture, code, perf numbers).
- **Frictions:** Articles without TOC force scrolling; ad-heavy sites break flow; code blocks unstyled or unrendered.
- **Success:** Lands on a feed, picks a category, opens an article, jumps to the section he needs in <10 seconds.

### Persona 2 – Curious Technical Leader ("Priya")
- **Profile:** Engineering manager / staff engineer, scans for trends in AI/ML, systems, and architecture.
- **Goals:** See what's trending, browse by topic, save articles for later.
- **Frictions:** Trending sections are usually fluff; topic taxonomies are inconsistent across sites.
- **Success:** Opens the feed, sees a curated trending list + topic cloud, bookmarks an article in one click.

### Persona 3 – AI Agent / Downstream Consumer
- **Profile:** Programmatic consumer (LLM, indexer, summarizer) ingesting article content.
- **Goals:** Reliably extract structured Markdown — H1/H2/H3 hierarchy, code blocks, lists.
- **Frictions:** HTML-only platforms are noisy; pages with JS-rendered content are hard to scrape.
- **Success:** Receives clean Markdown with stable heading anchors and predictable structure.

---

## 3. Problem Statements

| # | Problem | Who | Urgency |
|---|---------|-----|---------|
| 1 | Long-form technical articles lack a persistent outline, making in-page navigation slow. | Ravi, Priya | Critical |
| 2 | Existing tech-news feeds bury signal under low-quality pieces; trending sections are gameable. | Priya | Important |
| 3 | Most platforms render Markdown to HTML and discard structure — downstream AI consumption is unreliable. | AI Agent | Important |
| 4 | Mobile and desktop reading experiences for code-heavy content are inconsistent (code blocks overflow, fonts shift). | Ravi | Emerging |

---

## 4. Goals & Success Metrics

| Metric | Baseline | Target | Notes |
|--------|----------|--------|-------|
| Time-to-first-paint on Feed page | n/a | <1.5s on broadband | Vite build, no heavy SSR for MVP |
| Outline click → scroll latency | n/a | <100ms perceived | Smooth scroll, no jank |
| Articles renderable from static seed | 0 | ≥3 sample articles | MVP exit |
| Lighthouse a11y score (desktop) | n/a | ≥90 | Stage 3 target |
| Active reader retention (D7) | n/a | TBD post-launch | Telemetry deferred to Stage 4 |

---

## 5. Scope

### In Scope (Current Release — MVP)
- Page 1 — Feed view (navbar, hero, category filter pills, article cards, sidebar widgets, footer)
- Page 2 — Blog/Article view with Markdown rendering
- Outline panel with click-to-scroll and scroll spy
- All UI-only widgets (search icon, sign-in, get-started CTA, newsletter, share, bookmark, load more)

### Out of Scope (deferred — see [backlog.md](backlog.md))
- Search functionality (live)
- Auth / sign-in flow
- Newsletter backend
- Filters wired to live data
- Dark mode
- Mobile / responsive layout (post-MVP polish)
- AI features (REQ-003 — to be defined)

### Assumptions & Constraints
- All article data is hardcoded in the frontend for MVP — no backend integration required.
- Single approved visual direction (light theme) per design brief.
- Browser target: modern evergreen (Chrome, Safari, Firefox latest two majors).

---

## 6. Epics & Features

### Epic 1: Feed / Discovery (`MVP`)
- **Persona:** Ravi, Priya
- **Problem:** §3.2 (signal vs noise), §3.1 (navigation)
- **Outcome:** A reader landing on the home page can scan the latest articles, filter by category, and pick an article to read.
- **Features:**
  1. **Top navbar** — logo, nav links (Feed / AI & ML / Systems / Web / Data), search icon, sign-in, get-started CTA
     - Success: All elements visible on desktop ≥1024px; hover states on nav links
     - Dependencies: Static nav config, route stubs
  2. **Hero section** — editorial label + large headline + subheading
     - Success: Renders above the article feed; typography matches design
     - Dependencies: Typography tokens
  3. **Category filter pills row** — All / AI / ML / Systems / Web / Data Science / Design / Engineering
     - Success: Click toggles active state visually; multiple-pill click swaps active
     - Dependencies: Category list + active-state styling
  4. **Article feed (left column)** — hero card (first article) + standard cards (subsequent)
     - Success: Hero card has large image, category tag, title, excerpt, byline; standard cards have right-aligned thumbnail
     - Dependencies: Article seed data, image assets
  5. **Sidebar — Trending This Week** — numbered list (01–04)
     - Success: 4 entries, each with title + author + read time
     - Dependencies: Trending seed data
  6. **Sidebar — Browse Topics tag cloud** — Algorithms, Architecture, Blockchain, Career, CSS, Databases, DevOps, Go, GraphQL, JavaScript, Leadership, Performance, Python, React, Security, TypeScript
     - Success: All 16 tags rendered; visual density matches design
     - Dependencies: Tag list constant
  7. **Sidebar — Newsletter widget** — heading "The Weekly Graph" + email input + Subscribe button
     - Success: Form renders; submit is no-op (UI only)
     - Dependencies: Form component
  8. **Footer** — logo + About / Privacy / Terms / Contact + copyright
     - Success: Pinned to bottom of page; links are stubs
  9. **Load more articles button** — at the bottom of the feed
     - Success: Button visible; click is no-op for MVP
- **Overall Success Criteria:** Feed page renders end-to-end in light theme matching the approved design screenshot; all interactive elements have hover/active visual feedback; no console errors.
- **Risks:** Image assets not yet sourced; category color mapping not yet defined.

### Epic 2: Article Reading (`MVP`)
- **Persona:** Ravi, AI Agent
- **Problem:** §3.1 (navigation), §3.3 (structured extraction)
- **Outcome:** A reader on an article page can read clean Markdown content and use the outline panel to jump to any section.
- **Features:**
  1. **Minimal article navbar** — logo + breadcrumb (e.g., Engineering > System Architecture) + Share + Bookmark
     - Success: Breadcrumb reflects article category; Share/Bookmark are visual-only
     - Dependencies: Breadcrumb data on article model
  2. **Article body — Markdown rendering** — H1/H2/H3, paragraphs, inline code, code blocks (syntax-highlighted, monospace), bullet lists with bold lead-ins
     - Success: All Markdown elements from the seed article render correctly; code blocks have a language label badge
     - Dependencies: react-markdown, remark-gfm
  3. **Article header** — category pill, large title, byline (author + read time)
     - Success: Renders above body content
     - Dependencies: Article model fields
  4. **Outline panel ("On This Page")** — sticky, lists H2/H3 with H3 indented under H2
     - Success: All H2 and H3 from the article appear in the panel; visual hierarchy matches design
     - Dependencies: Heading extraction logic on render
  5. **Click-to-scroll** — clicking a heading in the outline scrolls the article smoothly to that section
     - Success: Scroll lands the heading near the top of the viewport (with offset)
     - Dependencies: Smooth scroll, offset calc
  6. **Scroll spy** — active heading highlights in the outline panel as the user scrolls
     - Success: Active heading updates as the corresponding section enters the viewport
     - Dependencies: IntersectionObserver or scroll-position calc
- **Overall Success Criteria:** Article page renders the seed article with all Markdown elements; outline panel is fully functional (click + scroll spy); UI matches the approved design.
- **Risks:** Scroll spy edge cases (very short sections, headings clustered together).

### Epic 3: Routing & Shell (`MVP`)
- **Persona:** All
- **Problem:** Page 1 and Page 2 must be reachable as distinct URLs.
- **Outcome:** `/` shows the Feed; `/article/:slug` shows the Blog View. Direct linking works.
- **Features:**
  1. **Route configuration** — react-router-dom v7 routes wired in App.tsx
     - Success: Refreshing on `/article/foo` lands on the Blog View; back/forward nav works
     - Dependencies: react-router-dom
- **Overall Success Criteria:** Both pages reachable; no 404 on direct refresh.
- **Risks:** None.

### Epic 4: Backend Foundations (`Future`)
- **Persona:** AI Agent, future Ravi
- **Problem:** Static data won't scale beyond MVP.
- **Outcome:** Articles are fetched from an API rather than hardcoded.
- **Features:** TBD — see Stage 2 requirements.

---

## 7. Requirements Registry

<!-- 
  Master list of all requirements with unique IDs.
  - IDs follow the pattern: [STAGE_PREFIX]-REQ-NNN (e.g., V1-REQ-001, V2-REQ-001)
  - Agents: reference these IDs in playbook.md stages and tasks/task-*.md files
  - Status: 🔲 Not Started | 🔄 In Progress | ✅ Done | ⏸️ Deferred | ❌ Dropped
  - When deferring/dropping, note the reason and move to backlog.md if applicable
-->

### Stage 0: Foundations

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| V0-REQ-001 | Vite + React 19 + TypeScript frontend scaffold | P0 | ✅ | `front-end/` exists |
| V0-REQ-002 | Tailwind CSS v4 configured | P0 | ✅ | tailwind.config.js + index.css |
| V0-REQ-003 | ESLint configured for TS + React | P0 | ✅ | eslint.config.js |
| V0-REQ-004 | Express 5 + TypeScript backend skeleton | P0 | ✅ | `back-end/` exists |
| V0-REQ-005 | react-markdown + remark-gfm installed | P0 | ✅ | package.json |
| V0-REQ-006 | react-router-dom v7 installed | P0 | ✅ | package.json |

### Stage 1: Core Experience (MVP)

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| V1-REQ-001 | Feed page top navbar with logo, nav links, search icon, sign-in, get-started CTA | P0 | ✅ | Navbar component with dark bg (#1A1A1A), all elements present |
| V1-REQ-002 | Feed page hero section (editorial label + headline + subheading) | P0 | ✅ | Lora display font, "Ideas worth reading." headline |
| V1-REQ-003 | Category filter pills row with active state on click | P0 | ✅ | FilterPills component; useState; active = dark bg + white text |
| V1-REQ-004 | Article feed: hero card + standard cards with image, tag, title, excerpt, byline | P0 | ✅ | FeaturedArticleCard + ListArticleCard; 7 seed articles |
| V1-REQ-005 | Sidebar: Trending This Week + Browse Topics + Newsletter widget | P0 | ✅ | TrendingList + TopicCloud + NewsletterWidget |
| V1-REQ-006 | React Router routes: `/` → Feed, `/article/:slug` → Blog | P0 | ✅ | App.tsx; Navigate fallback; direct refresh works |
| V1-REQ-007 | Blog view minimal navbar with breadcrumb + Share + Bookmark (UI only) | P0 | ✅ | BlogNavbar component; breadcrumb from article.breadcrumb[] |
| V1-REQ-008 | Blog view article header (category pill + title + byline) | P0 | ✅ | CategoryBadge + Lora title + author byline |
| V1-REQ-009 | Article TypeScript interface + 3+ static seed articles with Markdown content | P0 | ✅ | types/article.ts; 7 seed articles in data/articles.ts |
| V1-REQ-010 | Markdown rendering with H1/H2/H3, paragraphs, code blocks (with language label), inline code, lists | P0 | ✅ | react-markdown + remark-gfm; components prop injects IDs |
| V1-REQ-011 | Outline panel "On This Page" — sticky, indented H3 under H2 | P0 | ✅ | Outline component; H3 indented via .outline__item--level-3 |
| V1-REQ-012 | Click outline heading → smooth scroll to article section | P0 | ✅ | scrollIntoView({ behavior: "smooth", block: "start" }) |
| V1-REQ-013 | Scroll spy — active heading highlights in outline as user scrolls | P0 | ✅ | IntersectionObserver; rootMargin: "-80px 0px -70% 0px" |
| V1-REQ-014 | Footer with logo + About/Privacy/Terms/Contact + copyright | P1 | ✅ | Footer component; link stubs |
| V1-REQ-015 | Load more button at bottom of feed (UI only, no-op) | P1 | ✅ | Button present; click is no-op |
| V1-REQ-016 | Code block syntax highlighting (or stylistic monospace + language label badge) | P1 | ✅ | Stylistic mono + bg; full tokenization deferred to V2-REQ-010 |
| V1-REQ-017 | Hover states on navbar links and category pills | P1 | ✅ | CSS hover states on all interactive elements |

### Stage 2: Expansion

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| V2-REQ-001 | Backend `/api/articles` list endpoint | P1 | 📅 | Replaces hardcoded feed data |
| V2-REQ-002 | Backend `/api/articles/:slug` detail endpoint | P1 | 📅 | Replaces hardcoded article body |
| V2-REQ-003 | Frontend service layer (axios) wired to backend endpoints | P1 | 📅 | |
| V2-REQ-004 | Live category filter (filters feed against backend data) | P1 | 📅 | |
| V2-REQ-005 | Search functionality wired to backend | P1 | 📅 | Search icon currently UI-only |
| V2-REQ-006 | Auth / Sign-in flow | P1 | 📅 | Sign-in button currently UI-only |
| V2-REQ-007 | Newsletter signup backend integration | P2 | 📅 | |
| V2-REQ-008 | Persistent bookmark / "saved articles" feature | P2 | 📅 | |
| V2-REQ-009 | Article authoring/upload pipeline (Markdown ingest) | P2 | 📅 | |
| V2-REQ-010 | Full code-block syntax highlighting (e.g., shiki / prism) | P2 | 📅 | Upgrade from V1-REQ-016 |

### Stage 3+: Polish, Hardening, Launch

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| V3-REQ-001 | Mobile / responsive layout for both pages | P1 | 💡 | |
| V3-REQ-002 | Dark mode | P2 | 💡 | |
| V3-REQ-003 | Lighthouse a11y ≥90 (keyboard nav, ARIA, contrast) | P2 | 💡 | |
| V3-REQ-004 | Performance budget (LCP <2.5s, CLS <0.1) | P2 | 💡 | |
| V3-REQ-005 | Image optimization (responsive sizes, lazy loading) | P2 | 💡 | |
| V4-REQ-001 | Production deployment (frontend hosting + backend hosting) | P1 | 💡 | |
| V4-REQ-002 | Telemetry / analytics integration | P2 | 💡 | |
| V4-REQ-003 | AI feature definition (REQ-003 placeholder from brief) | P2 | 💡 | Scope TBD |

### Requirements Inbox

_New requirements discovered during development. Assign an ID and move to the appropriate stage during planning._

| Requirement | Date Added | Source | Notes |
|-------------|------------|--------|-------|
| - | - | - | - |

---

## 8. Experience Scenarios

| Scenario | Trigger | Steps | Happy Path | Edge Cases |
|----------|---------|-------|------------|------------|
| First-time visitor explores feed | User opens `/` | 1. See navbar + hero. 2. Scan article feed. 3. Click hero card. | Lands on Blog View for that article. | No articles in feed → empty state (deferred); image fails to load → fallback. |
| Reader uses outline to jump | User on `/article/:slug` | 1. Reads intro. 2. Clicks H2 in outline. | Article smooth-scrolls to that H2; outline highlights it. | Heading text has special chars; very long heading truncates. |
| Reader scrolls through article | User on `/article/:slug` | 1. Scrolls down naturally. | Outline highlights track active section. | Two H2s very close together — only one should be active at a time. |
| Reader filters by category | User on `/` | 1. Clicks "AI & ML" pill. | Pill becomes active visually. (MVP: no actual filtering; UI only.) | Multiple rapid clicks should not desync state. |

---

## 9. Risks & Open Questions

| ID | Risk / Question | Severity | Owner | Mitigation |
|----|-----------------|----------|-------|------------|
| R-01 | Image assets for article cards not yet sourced | Med | Gowtham | Use placeholder images for MVP; replace before launch |
| R-02 | Category accent color palette not defined | Med | Gowtham | Define in `rules/design.md` before Feed implementation |
| R-03 | "AI features" (REQ-003 from brief) undefined | Low | Gowtham | Defer to post-MVP; create discovery task in Stage 4 |
| R-04 | Scroll spy with very short sections may flicker | Low | TBD | Use IntersectionObserver with proper rootMargin |
| R-05 | TypeScript ~6.0.2 in package.json — confirm compatibility with React 19 | Low | TBD | Verify build passes; downgrade if blockers |
| R-06 | No tests in either project yet | Med | TBD | Defer test infrastructure to Stage 3 |

---

## Checklist
- [x] Every epic links to a persona + problem statement
- [x] Out-of-scope items tracked in `backlog.md`
- [x] Success metrics are measurable
- [x] No implementation specifics in this doc
