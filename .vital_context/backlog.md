# Product Backlog

> Approved-but-not-scheduled work. When an item is ready, add it to the Active Tasks table in [CONTEXT.md](CONTEXT.md) and start a task log.

---

## Backlog

| ID | Title | Priority | Status | Notes |
|----|-------|----------|--------|-------|
| PB-001 | Live search wired to backend | High | **done** | Implemented 2026-05-26. ?q= regex on title+excerpt. SearchModal with debounce. |
| PB-002 | Auth / sign-in flow | High | **done** | Implemented 2026-05-26. Google OAuth, /login page, RequireAuth guard, /profile page. |
| PB-003 | Newsletter backend integration | Med | **done** | Implemented 2026-05-26. POST /api/newsletter, EmailStr validation, duplicate handling. |
| PB-004 | Persistent bookmarks | Med | **done** | Implemented 2026-05-26. GET/POST/DELETE /api/user/bookmarks, stored in MongoDB. |
| PB-005 | Article authoring / Markdown ingest pipeline | Med | idea | V2-REQ-009. How do articles enter the system? Likely an admin tool or git-based content pipeline. |
| PB-006 | Full code-block syntax highlighting (Shiki / Prism) | Med | groomed | V2-REQ-010 / LIM-004. Decide between server-rendered (Shiki) and client (Prism). Shiki is heavier but better tokens. |
| PB-007 | Mobile / responsive layout pass | High | idea | V3-REQ-001. BlogView already has some breakpoints; Feed will need full responsive design. |
| PB-008 | Dark mode | Med | idea | V3-REQ-002. Tokens in `rules/design.md` need a dark counterpart. |
| PB-009 | Lighthouse a11y ≥ 90 audit + fixes | Med | idea | V3-REQ-003. Includes skip-link, focus-visible across all components, contrast verification. |
| PB-010 | Performance budget enforcement | Med | idea | V3-REQ-004. LCP <2.5s, CLS <0.1. May involve image optimization (PB-011). |
| PB-011 | Image optimization (responsive sizes, lazy loading) | Med | idea | V3-REQ-005. Consider `vite-imagetools` or similar. |
| PB-012 | Production deployment | High | idea | V4-REQ-001. Hosting decision pending — Vercel / Cloudflare Pages / self-hosted? |
| PB-013 | Telemetry / analytics | Med | idea | V4-REQ-002. Privacy-friendly default (Plausible / Umami). |
| PB-014 | "AI features" definition + first feature | Med | idea | V4-REQ-003. From design brief REQ-003 (undefined). Candidates: AI summary, "ask this article", semantic search, related-article suggestions. |
| PB-015 | Move BlogView markdown to seed data + load by slug | High | groomed | LIM-002. Will land in task-20260506-004. |
| PB-016 | Replace setTimeout-based heading extraction | Med | groomed | LIM-007. Use `react-markdown` `components` prop to register headings during render instead of querying the DOM after. |
| PB-017 | Stable heading anchors based on slugified text | Med | idea | LIM-005. Enables URL fragment links (`/article/foo#data-flows`). |
| PB-018 | Reduced-motion media query for smooth scroll | Low | groomed | LIM-008. Cheap accessibility win — guard `scroll-behavior: smooth`. |
| PB-019 | Test infrastructure (Vitest frontend, Jest/node:test backend) | High | idea | LIM-009. Needed before Stage 3 hardening. |
| PB-020 | Path aliases (`@components/*`, `@views/*`, etc.) | Low | idea | Add when relative imports get noisy — not yet. |
| PB-021 | Skip-to-content link | Low | idea | A11y nicety. |
| PB-022 | Custom display font | Low | idea | After visual identity is locked in Stage 3. |
| PB-023 | Define category accent colors | High | groomed | R-02 / `rules/design.md` §2.1. Blocker for Feed implementation polish. |
| PB-024 | Source/license real article images | Med | idea | R-01. Placeholders OK for MVP development; replace before launch. |
| PB-025 | CI pipeline (lint + build on PR) | Med | idea | Tee up before Stage 3 to catch regressions. |
| PB-026 | Google Sign-In (OAuth) | Med | **done** | Implemented 2026-05-26. google-auth backend verification, UserAuthContext, @react-oauth/google. |

---

## Entry Template

```yaml
- id: PB-NNN
  title: "Outcome-based title"
  priority: high | med | low
  status: idea | groomed | ready
  summary: >
    1-2 sentences on user value.
  acceptance_hints:
    - "Testable condition"
  dependencies: []
  notes: >
    Links to research/decisions / related REQ IDs.
```

---

## Status Model
- **idea** — captured, not vetted
- **groomed** — scoped, acceptance hints drafted
- **ready** — meets Definition of Ready, can move to CONTEXT.md active tasks

## Definition of Ready
- Acceptance hints are testable
- Blocking dependencies known
- Design link present if UI work involved

## Promotion
When `status = ready`: add to Active Tasks in `CONTEXT.md`, create `tasks/task-*.md` when work starts.

---

## Parking Lot (unvetted ideas)

```
- id: IDEA-001
  title: "Reader 'AI summary' button per article"
  next_step: "Discovery — define what AI features mean (REQ-003 from claude.md)"

- id: IDEA-002
  title: "Public RSS feed of articles"
  next_step: "Discovery — confirm audience demand"

- id: IDEA-003
  title: "Heading-anchor permalinks (hover a heading to copy a deep link)"
  next_step: "Design — discoverability without clutter"

- id: IDEA-004
  title: "Reading progress indicator at top of article"
  next_step: "Design exploration"

- id: IDEA-005
  title: "Code block 'copy' button"
  next_step: "Spec — placement and accessible label"

- id: IDEA-006
  title: "Per-article 'related articles' module"
  next_step: "Discovery — needs tagging or embeddings infra"
```
