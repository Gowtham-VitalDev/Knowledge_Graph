# Implementation Plan - Knowledge Graph MVP

> **This document translates the MVP PRD into an execution blueprint for engineering.** It tracks scope, stack, stage playbooks, and quality bars so every contributor can see how day-to-day work ties back to BMAD artifacts.

---

## Document Meta

| Field | Value |
|-------|-------|
| **Product / Initiative** | Knowledge Graph MVP |
| **Current BMAD Cycle** | Stage 0 -> Stage 1 (2025-12-08 - 2026-01-19) |
| **Version** | 0.1.0 |
| **Owner** | Knowledge Graph Core Pod (Acting Tech Lead: Codex Agent) |
| **Status** | In Progress |
| **Last Updated** | 2025-12-11 |
| **Linked Docs** | `PRD - The MVP.md`, `Product_Backlog.md`, `Active_Task.md`, `.acontext/tasks/task-20251211-001-foundation.md` |

---

## 1. Scope Alignment

| PRD Epic | Included Features | Deferred To | Notes |
|----------|------------------|-------------|-------|
| Epic 1 - Core Article Display & Navigation | Markdown article rendering, typography + code styles, automatic outline generation, manual Markdown ingestion workflow | Outline customization, collaborative editing tools | Admin UI remains manual (Markdown files + git); live CMS deferred. |
| Epic 2 - Multimedia Content Consumption | Inline YouTube embeds via `!https://youtube.com/...` syntax, responsive player, validation that embeds don’t break the outline | Additional video providers, analytics surfaced to admins | Playback metrics + playlist embeds move to backlog. |
| Epic 3 - Public Content Access | Static article routes without auth, SEO-friendly metadata, Supabase-backed content sync, Vercel deployment | Search, personalization, caching layers | Login, notifications, monetization deliberately excluded per PRD. |

**Out of scope reminders:** search, auth, notifications, admin dashboard, AI summarization, monetization, commenting, Excalidraw-like tooling.

---

## 2. Technology & Tooling Stack

| Layer | Technology | Version | Notes / Rationale |
|-------|------------|---------|-------------------|
| Web App | Next.js App Router + React | Next.js 15.5.x / React 19 | Native Markdown + streaming support, hosted on Vercel. |
| Styling & Theme | Tailwind CSS 4 + custom tokens | 4.x | Theme tokens match `UI_UX_doc.md`. |
| Markdown Rendering | `react-markdown` + custom plugins | 10.x | Gives control over heading anchors + embed detection. |
| Backend API | Supabase Edge Functions | Latest | Hosts article metadata APIs + webhook ingestion. |
| Data | Supabase Postgres | 15.x | Stores articles, outlines, video metadata. |
| Storage | Supabase Storage buckets | Latest | Markdown source + media fallback. |
| Monitoring | Vercel Analytics + Sentry (JS SDK) | TBA | Capture performance + runtime errors pre/post launch. |
| Tooling | ESLint 9, TypeScript 5, Playwright (Stage 1) | Latest | Guard quality + provide CI hooks. |

---

## 3. BMAD Stage Blueprint

| Stage | Objective | Key Deliverables | Exit Criteria |
|-------|-----------|------------------|---------------|
| Stage 0 - Foundations | Ready the repo, workflow, and base theming | BMAD docs populated, src/ structure + aliases, Supabase + Vercel scaffolds, CI template | `npm run lint`/`npm run typecheck` clean, repo + docs approved. |
| Stage 1 - Core Experience | Enable reading experience w/ Markdown + outline | Article listing + detail views, outline sidebar, inline YouTube player, content fetch pipeline | Reader can open 1 of 5 seed articles with outline + embed functioning. |
| Stage 2 - Expansion | Harden content authoring + automation | Admin ingestion scripts, dynamic metadata, scheduling | Editorial workflow handles 10+ articles, automation smoke-tested. |
| Stage 3 - Polish & Hardening | Performance, accessibility, telemetry | Lighthouse = 90, Sentry + analytics dashboards, bug backlog burn-down | MVP RC signed off, outstanding bugs triaged. |
| Stage 4 - Launch & Feedback | Rollout + learn | Release notes, KPI dashboard, feedback loop | MVP live on custom domain with monitoring + backlog for next cycle. |

---

## 4. Stage Playbooks

### Stage 0: Foundations
- **Window:** 2025-12-08 -> 2025-12-20
- **Goals:**
  - Stand up BMAD documentation + `.acontext` logging rituals.
  - Restructure Next.js repo into the referenced `src/` layout with theme tokens + outline demo.
  - Provision Supabase + Vercel projects and document access.
  - Establish lint/type-check + CI placeholders.
- **Key Tasks:** `Stage0-FND-001`, `Stage0-FND-002`, `Stage0-FND-003` (see `Active_Task.md`).
- **Dependencies:** Supabase project + service role, Vercel project, final palette from design.
- **Acceptance Criteria:** Repo builds locally, docs updated, stage log completed, Supabase/Vercel credentials stored in 1Password, CI pipeline ready to be hooked in Stage 1.
- **Risks & Mitigations:** Access delays -> escalate to product for credentials; Tailwind 4 changes -> lock version + document tokens.
- **Hand-off Instructions:** Archive log `task-20251211-001-foundation`, update `Implementation.md` Stage summary, refresh `Active_Task.md` statuses.

### Stage 1: Core Experience
- **Window:** 2025-12-22 -> 2026-01-19
- **Goals:**
  - Fetch Markdown articles from Supabase and render via App Router routes.
  - Generate outline + embed metadata automatically server-side.
  - Implement inline YouTube component with error handling + skeleton states.
  - Publish 5 articles + 3 video embeds as acceptance bar.
- **Key Tasks:** To be groomed (`Stage1-CORE-00X`).
- **Dependencies:** Supabase schema freeze, final copy deck, brand approvals for typography usage.
- **Acceptance Criteria:** Article detail + TOC + embed validated on mobile + desktop, editors can upload Markdown + video slug via script, analytics capturing time-on-page.
- **Risks & Mitigations:** Large Markdown files degrade TTFB -> adopt incremental static regeneration + caching; embed API quota -> prefetch metadata + degrade gracefully.
- **Hand-off Instructions:** Link task logs to `.acontext/tasks`, update Stage summary before starting Stage 2.

(Stages 2-4 will be groomed after MVP validation.)

---

## 5. Research & Validation Work
- **Discovery Tasks:**
  - Analyze 5 competitor blogs for article layout + outline interactions (Owner: Product).
  - Interview 3 target readers about desired navigation aids (Owner: Research).
- **Tech Spikes:**
  - Markdown renderer performance benchmark vs. MDX (Owner: Engineering, due Stage 0).
  - Supabase row-level security strategy for public reads (Owner: Engineering, due Stage 1).
- **Decision Logs:**
  - `.acontext/decisions/20251211-markdown-renderer.md` (pending) - choose between pure Markdown vs. MDX.
  - `.acontext/decisions/20251215-supabase-ingestion.md` - document ingestion path.

---

## 6. Quality & Verification Strategy
- **Testing Pyramid:**
  - Unit: Markdown utilities, embed parser (Vitest once added).
  - Integration: App Router route tests + Playwright smoke flows (Stage 1).
  - E2E: Playwright happy path covering read + outline interactions before Stage 2.
- **Manual QA:**
  - Chrome + Safari desktop, Chrome + Safari mobile.
  - Screen-reader checks with VoiceOver + NVDA for outline navigation.
- **Monitoring & Alerts:**
  - Vercel Analytics for Core Web Vitals.
  - Sentry alert when Markdown parsing fails or embeds error.
  - Supabase row count + error dashboards (SQL monitor).
- **Definition of Done:**
  - Lint + type-check clean.
  - Tests updated/added and noted in task log.
  - Accessibility acceptance per `UI_UX_doc.md`.
  - Telemetry hooks documented.
  - `.acontext` task log + `Active_Task.md` updated.

---

## 7. Risk Register

| ID | Description | Stage Impacted | Owner | Mitigation / Trigger |
|----|-------------|----------------|-------|----------------------|
| R-01 | Supabase public schema may expose drafts if RLS misconfigured. | Stage 1 | Engineering | Implement RLS policy + QA with anon keys before go-live. |
| R-02 | YouTube embed quota limits or geo restrictions. | Stage 1 | Product/Engineering | Cache metadata offline + provide fallback poster + copy when blocked. |
| R-03 | Content pipeline relies on manual Markdown PRs causing bottlenecks. | Stage 2 | Editorial Lead | Automate CLI ingestion + schedule training. |
| R-04 | Tailwind 4 breaking changes vs. tokens. | Stage 0 | Engineering | Lock version and document overrides in `project_structure.md`. |

---

## 8. Working Agreements
- Async daily check-ins in Linear thread; synchronous stand-up Tues/Thu (15 min).
- Branch format: `stage#/task-id-short-desc` (e.g., `stage0/FND-001-foundations`).
- Every PR links to `.acontext` log + `Active_Task` entry; reviewers enforce.
- Use Conventional Commits referencing task ID.
- Blockers posted in Slack + logged in `Active_Task.md` within 1 business day.

---

## 9. Change Management
- **Scope Changes:** Require approval from Product + Tech lead; update PRD + this file before coding.
- **Emergency Work:** Log in `Active_Task.md` under “Hotfix” and capture a dedicated `.acontext` log even if trivial.
- **Versioning:** Snapshot this document at the end of each stage (tag in git `docs/implementation-v{n}`) to retain history.

---

## 10. Stage Summary Archive

_No stages completed yet. Populate once Stage 0 closes._

---

### Usage Checklist
- [x] Every stage listed here maps to entries in `Active_Task.md`.
- [x] Features outlined connect back to the MVP PRD.
- [ ] Research tasks still require success criteria sign-off.
- [ ] Risks tracked in `.acontext/decisions` once resolved.
- [x] Quality strategy lines up with `project_structure.md` guidance.
