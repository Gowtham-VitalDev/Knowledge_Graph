# Project Context

<!-- AGENT INSTRUCTIONS: This is your entry point for every task. -->
<!-- Read this file first. Then follow the orchestration rules below to know exactly -->
<!-- which files to read next and which to update when you're done. -->

## Project

- **Name:** KnowledgeGraph
- **Description:** Tech news + articles platform delivering structured Markdown content with an interactive outline panel, optimized for both human readability and AI-friendly consumption.
- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 (frontend) · Node.js + Express 5 + TypeScript (backend) · static/hardcoded data for MVP

## Current Stage

- **Stage:** Stage 2 — NeonScroll V2 UX (Dark Futuristic Theme)
- **Branch:** `V2-DarkUX`
- **Objective:** Complete UI overhaul to NeonScroll dark futuristic design system. Light/dark theme toggle. Article page rebuilt to spec. Mobile responsive layouts. Vercel deployment config.
- **Status:** Done — All V2 UX work complete. Feed + Blog pages rebuilt. Theme toggle working. Mobile TOC accordion sticky. Vercel SPA config deployed.
- **Exit Criteria:** NeonScroll dark theme renders correctly, light theme preserved as toggle option, article page has sticky right-column TOC on desktop and sticky accordion TOC on mobile, Vercel deployment works with SPA rewrites.

## Phases

| # | Phase | Goal | Status |
|---|-------|------|--------|
| 0 | Foundations | Repo, tooling, Vite/React/TS scaffold, Tailwind, Express skeleton | done |
| 1 | Core Experience (MVP) | Page 1 Feed + Page 2 Blog View with outline panel and scroll spy | done |
| 2 | NeonScroll V2 UX | Dark futuristic design system, light/dark toggle, article page rebuild, mobile responsive, Vercel deploy | done |
| 3 | Expansion | Markdown content from backend, search, category filters with live data, auth/sign-in flow | pending |
| 4 | Polish & Hardening | Performance, accessibility audit, SEO | pending |
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

## Key Decisions

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| 1 | Frontend framework | React 19 + Vite | Modern DX, fast HMR, TS-first |
| 2 | Styling | Tailwind CSS v4 + scoped CSS files per view | Utility-first speed; per-view CSS for complex layouts |
| 3 | Markdown rendering | react-markdown + remark-gfm | Mature, plugin ecosystem, handles GFM tables/strikethrough |
| 4 | Routing | react-router-dom v7 | Already installed; standard React routing |
| 5 | Backend | Node.js + Express 5 + TypeScript | Lightweight API skeleton, easy to expand post-MVP |
| 6 | HTTP client | axios | Installed but unused in MVP — reserved for Stage 3 |
| 7 | Data source (MVP) | Hardcoded in frontend | No backend dependency for MVP per design brief |
| 8 | Outline panel scroll spy | IntersectionObserver (`rootMargin: "-80px 0px -70% 0px"`) | Replaced fragile setTimeout+querySelector; stable heading IDs via slugify() |
| 9 | Theme system | `data-theme` attribute on `<html>` + CSS custom properties | Zero-flicker with inline IIFE in `<head>`; React ThemeContext syncs with DOM |
| 10 | Dark theme | NeonScroll — `#0c0c10` bg, `#FF2D95` accent | Approved futuristic design direction from V2 UX schema |
| 11 | Light theme | Warm cream editorial — `#F7F6F3` bg, `#2563EB` accent | Preserved from Stage 1, toggled via `html[data-theme="light"]` CSS overrides |
| 12 | Mobile TOC | Two Outline instances in BlogView; CSS controls visibility per breakpoint | Desktop gets sticky aside in right grid column; mobile gets sticky accordion above body |
| 13 | Deployment | Vercel with `vercel.json` catch-all SPA rewrite | `rootDirectory` set in Vercel dashboard UI (not in vercel.json — schema rejects it) |

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
