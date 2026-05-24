# Project Context

<!-- AGENT INSTRUCTIONS: This is your entry point for every task. -->
<!-- Read this file first. Then follow the orchestration rules below to know exactly -->
<!-- which files to read next and which to update when you're done. -->

## Project

- **Name:** KnowledgeGraph
- **Description:** Tech news + articles platform delivering structured Markdown content with an interactive outline panel, optimized for both human readability and AI-friendly consumption.
- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 (frontend) · Node.js + Express 5 + TypeScript + MongoDB + Mongoose (backend)

## Current Stage

- **Stage:** Stage 3 — V2-MongoDB (Live Backend Integration)
- **Branch:** `V2-MongoDB`
- **Objective:** Replace hardcoded frontend data with a real MongoDB backend. Express 5 REST API with Mongoose models, seed data, and axios-powered frontend data fetching. Rich article renderer: images, Mermaid diagrams, YouTube embeds. Collapsible sticky TOC on desktop.
- **Status:** Done — All Phase A–E complete. API live. Frontend wired. Seed data loaded. Rich renderer working. TOC toggle with localStorage persistence.
- **Exit Criteria:** Frontend fetches articles/trending/tags from Express+MongoDB API; BlogView renders markdown with images, Mermaid, and YouTube; desktop TOC is sticky and collapsible; all API routes return correct data.

## Phases

| # | Phase | Goal | Status |
|---|-------|------|--------|
| 0 | Foundations | Repo, tooling, Vite/React/TS scaffold, Tailwind, Express skeleton | done |
| 1 | Core Experience (MVP) | Page 1 Feed + Page 2 Blog View with outline panel and scroll spy | done |
| 2 | NeonScroll V2 UX | Dark futuristic design system, light/dark toggle, article page rebuild, mobile responsive, Vercel deploy | done |
| 3 | V2-MongoDB | MongoDB + Mongoose models, Express API routes, frontend axios wiring, rich article renderer, TOC toggle | done |
| 4 | Polish & Hardening | Performance, accessibility audit, SEO, search, auth/sign-in | pending |
| 5 | Launch | Backend deploy, telemetry, post-launch iteration | pending |

## Active Tasks

| ID | Task | Requirements | Status | Owner |
|----|------|--------------|--------|-------|
| task-20260506-001 | Build Page 1 — Feed view (navbar, hero, filters, article cards, sidebar, footer) | V1-REQ-001–005 | done | Gowtham |
| task-20260506-002 | Wire React Router routes (/ → Feed, /article/:slug → Blog) | V1-REQ-006 | done | Gowtham |
| task-20260506-003 | Polish BlogView — extract markdown, add navbar + breadcrumb + share/bookmark UI | V1-REQ-007, V1-REQ-008 | done | Gowtham |
| task-20260506-004 | Define Article TypeScript interface + static seed data | V1-REQ-009 | done | Gowtham |
| task-20260519-001 | NeonScroll V2 UX overhaul — Feed page redesign with dark futuristic tokens | V2-REQ-001 | done | Gowtham |
| task-20260519-002 | Light/dark theme toggle — zero-flicker, localStorage persistence, ThemeContext | V2-REQ-002 | done | Gowtham |
| task-20260519-003 | Vercel SPA deployment config (vercel.json with catch-all rewrite) | V2-REQ-003 | done | Gowtham |
| task-20260519-004 | Article page rebuild — sticky right-column TOC, reading progress bar | V2-REQ-004 | done | Gowtham |
| task-20260519-005 | Mobile TOC — collapsible accordion above article body, sticky below navbar | V2-REQ-005 | done | Gowtham |
| task-20260520-001 | Phase A — MongoDB + Express bootstrap, connectDB() with retry, CORS, dotenv | V3-REQ-001 | done | Gowtham |
| task-20260520-002 | Phase B — Mongoose models: Category, Tag, User, Article, TrendingRanking, NewsletterSubscriber, SiteSettings | V3-REQ-002 | done | Gowtham |
| task-20260520-003 | Phase C — Express API routes: /api/articles, /api/articles/:slug, /api/trending, /api/tags, /api/newsletter, /api/categories | V3-REQ-003 | done | Gowtham |
| task-20260520-004 | Phase D — Seed script: 8 categories, 8 tags, 5 users, 5 articles, 4 trending rankings, site settings | V3-REQ-004 | done | Gowtham |
| task-20260521-001 | Frontend API wiring — axios client, adaptArticle() adapter, FeedView + BlogView fetch from API | V3-REQ-005 | done | Gowtham |
| task-20260522-001 | Rich article renderer — images, Mermaid diagrams (MermaidBlock component), YouTube embeds via react-markdown custom components | V3-REQ-006 | done | Gowtham |
| task-20260523-001 | Desktop TOC sticky fix — move position:sticky to grid wrapper (.blog-toc-desktop), fix CSS grid child constraint | V3-REQ-007 | done | Gowtham |
| task-20260523-002 | TOC collapsible toggle — chevron button, data-toc CSS grid transition, localStorage persistence (kg-toc-open) | V3-REQ-008 | done | Gowtham |

## Key Decisions

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| 1 | Frontend framework | React 19 + Vite | Modern DX, fast HMR, TS-first |
| 2 | Styling | Tailwind CSS v4 + scoped CSS files per view | Utility-first speed; per-view CSS for complex layouts |
| 3 | Markdown rendering | react-markdown + remark-gfm | Mature, plugin ecosystem, handles GFM tables/strikethrough |
| 4 | Routing | react-router-dom v7 | Already installed; standard React routing |
| 5 | Backend | Node.js + Express 5 + TypeScript | Lightweight API skeleton, easy to expand |
| 6 | HTTP client | axios | Used for all frontend API calls; baseURL from VITE_API_URL env var |
| 7 | Data source (MVP) | Hardcoded in frontend | No backend dependency for MVP per design brief |
| 8 | Outline panel scroll spy | IntersectionObserver (`rootMargin: "-80px 0px -70% 0px"`) | Replaced fragile setTimeout+querySelector; stable heading IDs via slugify() |
| 9 | Theme system | `data-theme` attribute on `<html>` + CSS custom properties | Zero-flicker with inline IIFE in `<head>`; React ThemeContext syncs with DOM |
| 10 | Dark theme | NeonScroll — `#0c0c10` bg, `#FF2D95` accent | Approved futuristic design direction from V2 UX schema |
| 11 | Light theme | Warm cream editorial — `#F7F6F3` bg, `#2563EB` accent | Preserved from Stage 1, toggled via `html[data-theme="light"]` CSS overrides |
| 12 | Mobile TOC | Two Outline instances in BlogView; CSS controls visibility per breakpoint | Desktop gets sticky aside in right grid column; mobile gets sticky accordion above body |
| 13 | Deployment | Vercel with `vercel.json` catch-all SPA rewrite | `rootDirectory` set in Vercel dashboard UI (not in vercel.json — schema rejects it) |
| 14 | Database | MongoDB + Mongoose | Document model fits article/tag/category shape; Mongoose gives typed schemas + populate() |
| 15 | DB connection | 127.0.0.1 not localhost in MONGO_URI | Windows Node resolves localhost → IPv6 ::1 but MongoDB binds IPv4; always use 127.0.0.1 |
| 16 | Model registry | Central models/index.ts re-exported at startup | Prevents MissingSchemaError when populate() references a model not yet imported |
| 17 | API adapter pattern | adaptArticle() in front-end/src/api/adapters.ts | Maps API shape → existing Article type without rewriting all card components |
| 18 | Mermaid rendering | MermaidBlock component; mermaid.render() in useEffect with useId() | Stable SVG IDs; dark theme initialized once; error fallback to pre block |
| 19 | YouTube embeds | Bare URL detection regex in react-markdown `a` component | Only embed when link text === href (autolinked URL); avoids embedding named links |
| 20 | TOC collapse | CSS `data-toc` attribute on grid container drives column width + panel opacity | Single source of truth; CSS grid transitions between `minmax(0,1fr) 220px` and `minmax(0,1fr) 32px` |

Full decision log with alternatives in [architecture.md](architecture.md).

## Key Rules

- **File placement:** Follow `rules/structure.md` when creating new files or directories
- **Naming:** PascalCase for React components (`FeedView.tsx`), camelCase for helpers (`formatDate.ts`), kebab-case for routes and CSS files when not co-located
- **UI work:** Follow `rules/design.md` for colors, components, spacing, and accessibility
- **Bugs:** Check `bugs.md` before investigating any issue — it may already be documented

---

## Orchestration Rules

> These rules tell you exactly what to read and what to update for every type of work.
> Follow them on every task — don't read more than needed, don't skip updates.

### Starting a Task

**Read before you start:**
- This file (done) — you know the stage, active tasks, and decisions
- `tasks/index.md` — check if similar work was done before to avoid duplication
- Then follow the rules below based on task type

**Create before you implement:**
- `tasks/task-YYYYMMDD-NNN-[name].md` — goal, plan, requirements being addressed

---

### By Task Type — What to Read

| Task Type | Read These Files |
|-----------|-----------------|
| **Feature / UI work** | `rules/structure.md`, `rules/design.md`, `architecture.md` (data models + endpoints) |
| **API / backend work** | `architecture.md` (full), `rules/structure.md` |
| **Bug fix** | `bugs.md` first, then `architecture.md` for the affected flow |
| **Architecture decision** | `architecture.md` (Key Decisions — check if already decided) |
| **Planning next stage** | `PRD.md`, `playbook.md`, `backlog.md` |
| **Resume previous work** | `tasks/task-[ID].md` for the specific task log |
| **Checking requirements** | `PRD.md` §7 (Requirements Registry) |
| **New component / module** | `rules/structure.md`, `rules/design.md` |
| **Deploy / environment** | `reference.md` (commands, env vars) |

---

### By Task Type — What to Update When Done

| Task Type | Update These Files |
|-----------|--------------------|
| **Any task** | `tasks/task-[ID].md` (log outcome), `tasks/index.md` (status), this file (Active Tasks) |
| **Feature complete** | `PRD.md` §7 (mark requirements done), `playbook.md` (check off DoD items) |
| **Bug fixed** | `bugs.md` (add resolution), task log |
| **Architecture decision** | `architecture.md` (Key Decisions table), this file (Key Decisions summary) |
| **Schema / data model changed** | `architecture.md` (Data Models), `reference.md` (Key Collections table) |
| **New API endpoint** | `architecture.md` (API Endpoints), `reference.md` (Quick Lookup) |
| **New file / folder created** | `rules/structure.md` (if pattern changes), `reference.md` (File Structure) |
| **New env var** | `reference.md` (Environment Variables table) |
| **Stage complete** | `playbook.md` (mark AC + DoD done, fill Hand-off), this file (Phases table + Current Stage) |
| **New requirement discovered** | `PRD.md` §7 (Requirements Inbox), then assign ID + stage |
| **Backlog item promoted** | `backlog.md` (remove), `CONTEXT.md` Active Tasks (add), `playbook.md` (add to stage) |

---

### Completing a Stage — Checklist

Before marking a stage done, verify:
- [ ] All requirements for this stage are `done` in `PRD.md` §7
- [ ] All Acceptance Criteria checked in `playbook.md`
- [ ] All Definition of Done items checked in `playbook.md`
- [ ] Hand-off note written in `playbook.md` (what the next stage inherits)
- [ ] This file's Phases table updated to `done`
- [ ] Current Stage section updated to the next stage
- [ ] Active Tasks table refreshed with next stage tasks

---

## Reference Docs

| Doc | Purpose |
|-----|---------|
| [PRD.md](PRD.md) | Product vision, epics, features, requirements registry (§7) |
| [playbook.md](playbook.md) | Stage goals, requirements, acceptance criteria, Definition of Done |
| [architecture.md](architecture.md) | Stack, schemas, data flows, API endpoints, decisions |
| [reference.md](reference.md) | Commands, env vars, file structure, quick lookups |
| [rules/structure.md](rules/structure.md) | File organization, naming conventions, module boundaries |
| [rules/design.md](rules/design.md) | Colors, typography, spacing, components, accessibility |
| [bugs.md](bugs.md) | Known issues and resolutions |
| [backlog.md](backlog.md) | Deferred features and future ideas |
| [tasks/index.md](tasks/index.md) | All task history — check before starting similar work |
