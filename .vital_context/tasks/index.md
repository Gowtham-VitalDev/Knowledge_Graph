# Task Index

All completed and active task logs, newest first.

| ID | Title | Status | Date |
|----|-------|--------|------|
| task-20260526-005 | Dedicated /login page + RequireAuth guard — clean auth flow | done | 2026-05-26 |
| task-20260526-004 | Search (live ?q=), Topics page (/topics), SEO usePageMeta hook | done | 2026-05-26 |
| task-20260526-003 | User profile page (/profile) — avatar, bookmark count, sign-out | done | 2026-05-26 |
| task-20260526-002 | Google Sign-In (OAuth) + persistent user bookmarks | done | 2026-05-26 |
| task-20260526-001 | Tier 1 frontend quick wins — category filter, load more, topic cloud, newsletter | done | 2026-05-26 |
| task-20260525-007 | Python seed script — async Motor, passlib hashing, full dataset, idempotent | done | 2026-05-25 |
| task-20260525-006 | Bugfix — ObjectId serialization crash + stale Express backend + admin API shape mismatches | done | 2026-05-25 |
| task-20260525-005 | Admin frontend — /admin login, dashboard, article editor (NeonScroll theme) | done | 2026-05-25 |
| task-20260525-004 | FastAPI admin CRUD routes — router-level protection, create/update/delete/publish | done | 2026-05-25 |
| task-20260525-003 | FastAPI auth — JWT login/logout/me, passlib bcrypt, httpOnly cookie, Depends() | done | 2026-05-25 |
| task-20260525-002 | FastAPI public routes — articles, categories, tags, trending (aggregation pipeline) | done | 2026-05-25 |
| task-20260525-001 | Python FastAPI foundation — project structure, Motor DB, lifespan, CORS, health | done | 2026-05-25 |
| task-20260523-002 | TOC collapsible toggle — chevron button, data-toc CSS grid transition, localStorage | done | 2026-05-23 |
| task-20260523-001 | Desktop TOC sticky fix — move position:sticky to .blog-toc-desktop grid child | done | 2026-05-23 |
| task-20260522-001 | Rich article renderer — images, MermaidBlock, YouTube embeds in react-markdown | done | 2026-05-22 |
| task-20260521-001 | Frontend API wiring — axios client, adaptArticle() adapter, FeedView + BlogView fetch | done | 2026-05-21 |
| task-20260520-004 | Phase D — Seed script (8 categories, 8 tags, 5 users, 5 articles, trending, settings) | done | 2026-05-20 |
| task-20260520-003 | Phase C — Express API routes (articles, trending, tags, newsletter, categories) | done | 2026-05-20 |
| task-20260520-002 | Phase B — Mongoose models (Category, Tag, User, Article, TrendingRanking, NewsletterSubscriber, SiteSettings) | done | 2026-05-20 |
| task-20260520-001 | Phase A — MongoDB + Express bootstrap, connectDB() retry, CORS, dotenv | done | 2026-05-20 |
| task-20260519-005 | Mobile TOC — collapsible accordion above article body, sticky below navbar | done | 2026-05-19 |
| task-20260519-004 | Article page rebuild — sticky right-column TOC, reading progress bar | done | 2026-05-19 |
| task-20260519-003 | Vercel SPA deployment config (vercel.json with catch-all rewrite) | done | 2026-05-19 |
| task-20260519-002 | Light/dark theme toggle — zero-flicker, localStorage persistence, ThemeContext | done | 2026-05-19 |
| task-20260519-001 | NeonScroll V2 UX overhaul — Feed page redesign with dark futuristic tokens | done | 2026-05-19 |
| task-20260506-004 | Define Article TS interface + static seed data | done | 2026-05-06 |
| task-20260506-003 | Polish BlogView — navbar, breadcrumb, share/bookmark, scroll spy | done | 2026-05-06 |
| task-20260506-002 | Wire React Router routes (/ → Feed, /article/:slug → Blog) | done | 2026-05-06 |
| task-20260506-001 | Build Page 1 — Feed view | done | 2026-05-06 |
| task-bootstrap-0001 | Bootstrap .vital_context/ framework (CONTEXT, PRD, playbook, architecture, reference, rules, tasks, bugs, backlog) | done | 2026-05-06 |
| task-bootstrap-0000 | Initial scaffold — Vite + React + TS + Tailwind + Express + BlogView prototype | done | pre-2026-05-06 |

---

## Task Log Template

When creating a new task file (`task-YYYYMMDD-NNN-brief-name.md`), use this structure:

```markdown
# task-YYYYMMDD-NNN: Brief Title
- **Date:** YYYY-MM-DD
- **Status:** planned | active | done | blocked
- **Stage:** [which stage/epic this belongs to]
- **Requirements:** [REQ IDs this task implements, e.g., V1-REQ-001, V1-REQ-003]

## Goal
[1-2 sentences: what does success look like?]

## Plan
1. [step]
2. [step]

## Log
- [what actually happened, key decisions, commands run]

## Files Changed
- `path/to/file` — created/modified — why

## Outcome
[done/partial/blocked — summary + next steps if any]
```

Keep it under 30 lines. If a task takes <5 minutes, skip the log.
