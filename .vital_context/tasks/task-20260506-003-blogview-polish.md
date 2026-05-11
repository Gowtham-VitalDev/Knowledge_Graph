# task-20260506-003: Polish BlogView — Navbar, Breadcrumb, Share/Bookmark, Scroll Spy
- **Date:** 2026-05-06
- **Status:** done
- **Stage:** Stage 1 — Core Experience (MVP)
- **Requirements:** V1-REQ-007, V1-REQ-008, V1-REQ-010, V1-REQ-011, V1-REQ-012, V1-REQ-013, V1-REQ-016

## Goal
Rewrite BlogView to use the typed Article model, add BlogNavbar with breadcrumb, replace the fragile heading extraction + scroll spy with robust implementations.

## Plan
1. Create BlogNavbar component (light bg, breadcrumb, share/bookmark)
2. Replace setTimeout+querySelector heading extraction with pure Markdown string parser
3. Replace positional `heading-N` IDs with slugify(text) stable IDs
4. Wire IntersectionObserver scroll spy
5. Inject heading IDs at render time via react-markdown `components` prop
6. Extract Outline component from inline BlogView code

## Log
- BlogNavbar: `--color-bg-article: #FFFFFF`; breadcrumb maps `article.breadcrumb[]`; Share + Bookmark are UI-only
- `extractHeadings(markdown)`: pure string parser, skips fenced code blocks, produces `OutlineHeading[]` before render — no DOM dependency
- `slugify(text)`: lowercases, collapses non-alphanumeric to `-`, strips leading/trailing `-`
- IntersectionObserver: `rootMargin: "-80px 0px -70% 0px"`, `threshold: 0`; resolves LIM-001 + LIM-007
- Stable IDs: `react-markdown` components prop injects `id={slugify(text)}` at render time; resolves LIM-005
- Outline extracted to `components/Outline/Outline.tsx` with typed props
- DEFAULT_SLUG fallback: `"scaling-graph-neural-networks-for-fraud-detection"` (matches design screenshot)
- `scroll-margin-top: 80px` on h2/h3 so navbar doesn't occlude target

## Files Changed
- `front-end/src/components/BlogNavbar/BlogNavbar.tsx` + `.css` — created
- `front-end/src/components/Outline/Outline.tsx` + `.css` — created (extracted + improved)
- `front-end/src/views/Blog/BlogView.tsx` — rewritten
- `front-end/src/views/Blog/BlogView.css` — rewritten with design tokens

## Outcome
Done. Scroll spy works via IntersectionObserver. Headings have stable slugified IDs. Breadcrumb and share/bookmark present. LIM-001, LIM-005, LIM-007 resolved.
