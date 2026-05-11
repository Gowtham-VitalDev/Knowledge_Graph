# Stage Playbook

<!-- Quick phase-level view: goals, requirements, tasks, acceptance criteria, definition of done, hand-offs -->
<!-- Agents: update this when completing a phase or planning a new one -->
<!-- Requirements (REQ IDs) are defined in PRD.md §7. Reference them here, don't duplicate details. -->
<!-- Acceptance Criteria = technical/testable checks (builds, tests pass, API responds) -->
<!-- Definition of Done = user-facing outcomes (user can do X, experience is Y) -->

## Stage 0: Foundations — done

**Window:** Pre-2026-05-06 (initial scaffolding)

**Goals:**
- Stand up the frontend (Vite + React 19 + TS + Tailwind v4)
- Stand up a backend skeleton (Express 5 + TS)
- Install Markdown rendering libs (react-markdown, remark-gfm) and routing (react-router-dom v7)
- Get the BlogView prototype rendering Markdown with a working outline panel

**Requirements:** V0-REQ-001, V0-REQ-002, V0-REQ-003, V0-REQ-004, V0-REQ-005, V0-REQ-006 _(see PRD.md §7 for details)_

**Key Tasks:** Initial scaffold (no formal task log; predates `.vital_context/`)

**Acceptance Criteria:**
- ✅ `npm run dev` starts the frontend (Vite dev server)
- ✅ `npm run dev` in `back-end/` starts the Express server
- ✅ `npm run build` produces a TS-compiled frontend bundle
- ✅ Tailwind directives compile (no errors in `index.css`)
- ✅ ESLint config present and parses TS/React

**Definition of Done:**
- ✅ App boots and renders the BlogView prototype
- ✅ Markdown content renders with H1/H2/H3, code blocks, lists
- ✅ Outline panel extracts headings and supports click-to-scroll

**Risks:** None at this stage.

**Hand-off:** Stage 1 inherits a working BlogView prototype at [front-end/src/views/Blog/BlogView.tsx](../front-end/src/views/Blog/BlogView.tsx). Markdown content is currently embedded as a constant — Stage 1 must extract it to seed data. The Express backend is a stub (single `index.ts`, currently empty/no routes) — not consumed by MVP.

---

## Stage 1: Core Experience (MVP) — done

**Window:** 2026-05-06 → 2026-05-06

**Goals:**
- Build Page 1 (Feed view) end-to-end matching the approved design
- Polish Page 2 (Blog view) — navbar with breadcrumb, article header, scroll spy
- Wire React Router so `/` → Feed, `/article/:slug` → Blog
- Define `Article` TypeScript model + 3+ static seed articles

**Requirements:** V1-REQ-001, V1-REQ-002, V1-REQ-003, V1-REQ-004, V1-REQ-005, V1-REQ-006, V1-REQ-007, V1-REQ-008, V1-REQ-009, V1-REQ-010, V1-REQ-011, V1-REQ-012, V1-REQ-013, V1-REQ-014, V1-REQ-015, V1-REQ-016, V1-REQ-017 _(see PRD.md §7)_

**Key Tasks:** task-20260506-001, task-20260506-002, task-20260506-003, task-20260506-004

**Acceptance Criteria:**
- ✅ `npm run build` passes with zero TS errors
- ✅ `npm run lint` passes
- ✅ Visiting `/` renders the Feed view; visiting `/article/:slug` renders the Blog view
- ✅ No console errors or warnings on either page (StrictMode-clean)
- ✅ All 17 V1 requirements marked ✅ in PRD.md §7
- ✅ All seed articles render without Markdown errors

**Definition of Done:**
- ✅ User can land on `/`, see the hero + feed + sidebar matching the approved design
- ✅ User can click a category pill and see active-state styling
- ✅ User can click an article card and navigate to its Blog view
- ✅ User can read an article and see the outline panel update as they scroll
- ✅ User can click any heading in the outline and the article scrolls smoothly to it
- ✅ All UI-only widgets (search, sign-in, get-started, share, bookmark, newsletter, load more) are visible and styled

**Risks:**
- Image assets for article cards not yet sourced (R-01) — use placeholders
- Category accent colors not yet defined (R-02) — finalize in `rules/design.md` before Feed build
- Scroll spy edge cases with short/clustered sections (R-04)

**Hand-off:** Stage 2 inherits a fully working two-page site: Feed (`/`) + Blog (`/article/:slug`). All data is hardcoded in `front-end/src/data/` — 7 seed articles, 4 trending items, 16 topics. `Article` TypeScript interface (`types/article.ts`) is ready for backend integration. Design tokens live in `styles/tokens.css`. IntersectionObserver scroll spy and slugified stable heading anchors replace all fragile DOM-query approaches from Stage 0. Lightningcss `@theme` warnings from Tailwind v4 internals are known and acceptable.

---

## Stage 2: Expansion — pending

**Window:** TBD (after Stage 1 ships)

**Goals:**
- Replace hardcoded data with backend API
- Add live search and live category filtering
- Implement auth / sign-in flow
- Newsletter backend integration

**Requirements:** V2-REQ-001, V2-REQ-002, V2-REQ-003, V2-REQ-004, V2-REQ-005, V2-REQ-006, V2-REQ-007, V2-REQ-008, V2-REQ-009, V2-REQ-010 _(see PRD.md §7)_

**Key Tasks:** TBD — generate when stage becomes active

**Acceptance Criteria:**
- ⬜ Backend exposes `/api/articles` and `/api/articles/:slug` with documented schemas
- ⬜ Frontend service layer (axios) consumes both endpoints
- ⬜ Auth flow protects relevant routes; session persists across reloads
- ⬜ Search returns relevant results in <500ms for the seed corpus

**Definition of Done:**
- ⬜ User signs in and stays signed in
- ⬜ User searches and sees filtered articles
- ⬜ User selects a category and the feed reflects it (live filter)
- ⬜ Newsletter form stores emails on the backend

**Risks:**
- Database choice not yet made — need decision before this stage
- Auth provider not yet chosen (custom vs. third-party)

**Hand-off:** _pending._

---

## Stage 3: Polish & Hardening — pending

**Window:** TBD

**Goals:**
- Mobile / responsive layouts
- Dark mode
- Accessibility audit + fixes (WCAG 2.1 AA)
- Performance budget enforcement

**Requirements:** V3-REQ-001, V3-REQ-002, V3-REQ-003, V3-REQ-004, V3-REQ-005 _(see PRD.md §7)_

**Key Tasks:** TBD — generate when stage becomes active

**Acceptance Criteria:**
- ⬜ Lighthouse a11y ≥90 (desktop and mobile)
- ⬜ LCP <2.5s, CLS <0.1 on the Feed page
- ⬜ Both pages usable at 360px width without horizontal scroll
- ⬜ Dark mode toggle persists across sessions

**Definition of Done:**
- ⬜ User on a phone can read the feed and an article comfortably
- ⬜ User with reduced-motion preference doesn't see jarring animation
- ⬜ User using only a keyboard can tab through all interactive elements

**Risks:**
- Outline panel UX on mobile (current design hides it under 768px)

**Hand-off:** _pending._

---

## Stage 4: Launch — pending

**Window:** TBD

**Goals:**
- Deploy frontend + backend
- Wire telemetry
- Define and ship "AI features" (per design brief REQ-003)

**Requirements:** V4-REQ-001, V4-REQ-002, V4-REQ-003 _(see PRD.md §7)_

**Key Tasks:** TBD — generate when stage becomes active

**Acceptance Criteria:**
- ⬜ Production URL serves the frontend
- ⬜ Backend deployed with HTTPS
- ⬜ Telemetry captures pageviews + outline clicks at minimum
- ⬜ AI feature scope documented and at least one feature shipped

**Definition of Done:**
- ⬜ Public users can reach the site at the production URL
- ⬜ Internal team can view a basic analytics dashboard
- ⬜ At least one AI-assisted reading feature is live

**Risks:**
- AI feature scope undefined (R-03)
- Hosting choice not yet made

**Hand-off:** _pending._
