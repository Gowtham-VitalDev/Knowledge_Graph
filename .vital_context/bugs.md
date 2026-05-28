# Bug Tracking

> Log bugs that required meaningful investigation or had user-visible impact. Check this file before investigating any issue — it may already be documented.

---

## Status Board

| ID | Title | Severity | Status | Owner |
|----|-------|----------|--------|-------|
| BUG-001 | ObjectId serialization crash — 500 on all aggregation routes | critical | fixed | Gowtham |
| BUG-002 | Stale Express backend intercepting requests on localhost:5000 | high | fixed | Gowtham |
| BUG-003 | categoryId required in CreateArticleBody — 422 on article create | medium | fixed | Gowtham |
| BUG-004 | Admin API response envelope mismatch — dashboard showed empty table | medium | fixed | Gowtham |

---

## Known Limitations / Tech Debt (from current code)

These are not bugs per se — they are knowingly-incomplete behaviors that should be tracked so they aren't rediscovered.

| ID | Area | Description | Tracked As |
|----|------|-------------|-----------|
| LIM-004 | Code block syntax highlighting | Code blocks are stylistic only (mono font + bg), no actual syntax tokenization. | V2-REQ-010 |
| LIM-006 | Backend `index.ts` is empty | The backend skeleton has no routes, no listen call. Not a bug; future contributors should note backend is intentionally out-of-scope for MVP. | V2-REQ-001 / V2-REQ-002 |
| LIM-008 | Reduced-motion not respected | `scrollIntoView({ behavior: "smooth" })` is unconditional; users with `prefers-reduced-motion: reduce` see smooth scroll anyway. | Stage 3 (V3-REQ-003 a11y) |
| LIM-009 | No tests | Neither the frontend nor the backend has a test runner configured. | Stage 3 |
| LIM-010 | Placeholder images | Article covers and avatars use picsum.photos + i.pravatar.cc seed URLs. Must be replaced before launch. | PB-024 |

### Resolved Limitations (Stage 1)

| ID | Area | Resolution | Date |
|----|------|------------|------|
| LIM-001 | BlogView scroll spy | Replaced click-driven highlight with IntersectionObserver (`rootMargin: "-80px 0px -70% 0px"`). | 2026-05-06 |
| LIM-002 | Hardcoded markdown body | Extracted to typed `Article` model in `data/articles.ts`; `getArticleBySlug()` used in BlogView. | 2026-05-06 |
| LIM-003 | No router | `App.tsx` now uses react-router-dom v7 BrowserRouter; `/article/:slug` direct links work. | 2026-05-06 |
| LIM-005 | Positional heading IDs | Replaced `heading-N` with `slugify(text)` — stable, URL-fragment-friendly IDs. | 2026-05-06 |
| LIM-007 | setTimeout DOM query | Replaced with pure Markdown string parser (`extractHeadings()`) + `react-markdown` component overrides that inject IDs at render time. | 2026-05-06 |

---

## Resolved Bugs (Stage 4)

### BUG-001 — ObjectId serialization crash
- **Severity:** critical | **Status:** fixed | **Date:** 2026-05-25
- **Symptom:** All routes using MongoDB `$lookup` aggregation returned 500. Browser showed a CORS error (symptom — 500 crash bypasses FastAPI CORS middleware so no `Access-Control-Allow-Origin` header is added to the error response).
- **Root cause:** Motor returns raw `bson.ObjectId` objects. FastAPI's `jsonable_encoder` cannot serialize them. Attempted fix using `$addFields` with dot-notation keys (`"categoryId._id": {"$toString": ...}`) failed — MongoDB dot-notation in `$addFields` creates a new top-level field with that literal key; it does NOT update the nested field. ObjectIds inside nested objects survived untouched.
- **Fix:** Added `sanitize(obj)` Python function in each route file — recursively walks the entire result and converts every `ObjectId` to `str()` before the return statement. No MongoDB-side pipeline tricks needed.
- **Files:** `routes/articles.py`, `routes/trending.py`, `routes/admin/articles.py`
- **Task:** `tasks/task-20260525-006-bugfix-objectid-serialization.md`

### BUG-002 — Stale Express backend on port 5000
- **Severity:** high | **Status:** fixed | **Date:** 2026-05-25
- **Symptom:** POST /api/admin/articles returned HTML `Cannot POST ...` — an Express 404, not FastAPI.
- **Root cause:** Old `npm run dev` Express process was still alive in a background terminal, bound to `0.0.0.0:5000` (all interfaces). Python uvicorn binds to `127.0.0.1:5000` only. `localhost` resolves to `::1` (IPv6) on Windows, hitting Express instead of FastAPI.
- **Fix:** `Stop-Process -Id <PID>`. Diagnose with `netstat -ano | grep :5000` — two PIDs = two backends. Only one should exist.
- **Pattern to remember:** On Windows, always run `netstat -ano | grep :5000` when you see unexpected responses. Two PIDs on the same port = stale process.

### BUG-003 — categoryId required, no UI picker
- **Severity:** medium | **Status:** fixed | **Date:** 2026-05-25
- **Symptom:** Creating an article without a category returned Pydantic 422 validation error.
- **Fix:** `categoryId: Optional[str] = None` in `CreateArticleBody`. Added category `<select>` dropdown to `ArticleEditor.tsx` populated from `/api/categories`.

### BUG-004 — Admin API response envelope mismatch
- **Severity:** medium | **Status:** fixed | **Date:** 2026-05-25
- **Symptom:** Dashboard showed "0 total" / empty table even though network tab showed correct data.
- **Root cause:** Backend returns `{ articles: [], total, ... }` but frontend helper did `.then(r => r.data)` — treating the envelope as the array.
- **Fix:** All helpers in `api/admin.ts` updated to unwrap correctly: `.then(r => r.data.articles)`, `.then(r => r.data.article)`.

---

## Bug Entry Template

```yaml
- id: BUG-001
  title: "Describe the symptom, not the fix"
  severity: critical | high | medium | low
  status: open | in-progress | fixed | won't-fix
  reported: YYYY-MM-DD
  environment: "OS / device / version"
  steps_to_reproduce:
    - "Step 1"
    - "Step 2"
  expected: "What should happen"
  actual: "What actually happens"
  root_cause: "Once known"
  resolution: "The fix + code references"
  task_log: "tasks/task-YYYYMMDD-NNN-*.md (if applicable)"
```

---

## Patterns & Known Limitations

| Pattern | Description | Mitigation |
|---------|-------------|------------|
| DOM querying after render | Components reading the DOM after `react-markdown` renders are timing-sensitive. | **Resolved:** headings extracted via pure Markdown string parser before render; IDs injected via `components` prop. |
| Hard-coded color values | BlogView.css previously contained many hex values. | **Resolved:** All component styles use `var(--color-*)` from `styles/tokens.css`; no hardcoded hex in any component file. |

---

## Incident Response
1. Assign severity (critical/high/medium/low).
2. Create `tasks/task-YYYYMMDD-NNN-bugfix-*.md` for the investigation.
3. Reproduce, document expected vs actual, identify root cause.
4. Fix, verify, update this doc with root cause + resolution.
5. Add a regression test if testing infra exists.
