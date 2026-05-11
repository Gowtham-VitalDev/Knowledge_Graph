# Project Structure & Conventions

> Defines where every file lives and how to name, organize, and (eventually) test code in the KnowledgeGraph project.
> When in doubt, follow this doc; if reality diverges, update this doc first.

---

## 1. Purpose
- Provide a deterministic directory layout so agents know exactly where to create or edit files.
- Capture naming conventions, import aliases, and lint rules to minimize code review friction.
- Serve as the canonical reference whenever `CONTEXT.md` says "Check structure rules".

---

## 2. Repository Overview

```
Knowledge_Graph/
├── .vital_context/             # Project documentation (do not put runtime code here)
├── claude.md                   # Design brief
├── front-end/                  # Vite + React 19 + TS app
│   ├── public/                 # Static files served as-is (favicon, icons.svg)
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig*.json
│   ├── eslint.config.js
│   └── src/
│       ├── main.tsx            # Mount point — do not modify
│       ├── App.tsx             # Top-level shell; hosts the Router (planned)
│       ├── App.css             # App-shell styles
│       ├── index.css           # Tailwind base + globals
│       ├── assets/             # Imported images / SVGs (compiled by Vite)
│       ├── components/         # (PLANNED) Reusable UI atoms/molecules — go here for shared UI
│       ├── views/              # Route-level pages
│       │   ├── Blog/           # Article reader (Page 2)
│       │   │   ├── BlogView.tsx
│       │   │   └── BlogView.css
│       │   └── Feed/           # (PLANNED) Article feed (Page 1)
│       │       ├── FeedView.tsx
│       │       └── FeedView.css
│       ├── data/               # (PLANNED) Static seed data (articles.ts, topics.ts, trending.ts)
│       ├── types/              # (PLANNED) Shared TS types (Article, Category, ...)
│       ├── hooks/              # (PLANNED) Reusable React hooks (useScrollSpy, useHeadings)
│       ├── services/           # (PLANNED, Stage 2) API clients (articlesService.ts)
│       ├── store/              # (PLANNED, Stage 2 if needed) State management
│       └── utils/              # (PLANNED) Pure helpers (formatDate, slugify)
└── back-end/                   # Express 5 + TS skeleton
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── index.ts            # Server bootstrap (currently a stub)
        ├── routes/             # (PLANNED, Stage 2) Express routers per resource
        ├── services/           # (PLANNED, Stage 2) Business logic
        ├── db/                 # (PLANNED, Stage 2) DB client + queries
        ├── middleware/         # (PLANNED, Stage 2) Auth, validation, error handling
        └── types/              # (PLANNED, Stage 2) Shared backend TS types
```

When you create a new directory not listed above, add it here in the same PR.

---

## 3. Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| React components (files) | `PascalCase.tsx` | `FeedView.tsx`, `ArticleCard.tsx` |
| Component styles (co-located) | Same name, `.css` | `BlogView.css` |
| Helper / utility files | `camelCase.ts` | `formatDate.ts`, `slugify.ts` |
| React hooks | `useThing.ts` (camelCase, `use` prefix) | `useScrollSpy.ts` |
| TS type modules | `camelCase.ts` (or grouped in `types/index.ts`) | `article.ts`, `category.ts` |
| Service modules (Stage 2) | `<domain>Service.ts` | `articlesService.ts` |
| Route files (Stage 2 backend) | `<domain>.routes.ts` | `articles.routes.ts` |
| Route URL paths | `kebab-case` | `/article/:slug`, `/api/news-letter` |
| Directories under `src/` | lowercase or `PascalCase` matching the dominant component | `views/Blog/` (PascalCase OK when it mirrors the component) |
| TS interfaces / types | `PascalCase` | `Article`, `ArticleCardProps`, `HeadingExtractor` |
| Type suffixes | `Props`, `Response`, `Request`, `Params` | `FeedViewProps`, `ListArticlesResponse` |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_FEED_PAGE_SIZE` |
| CSS classes (handwritten) | `kebab-case` | `.toc-item`, `.active-heading` |
| Test files (when added) | `Source.test.tsx` next to source | `FeedView.test.tsx` |
| Image / asset filenames | `kebab-case` | `hero-banner.png` |

**Existing patterns to preserve:**
- `BlogView.tsx` + `BlogView.css` (PascalCase folder + co-located CSS) — keep this pattern for new view-level pages.
- `App.tsx` + `App.css` — leave as-is.

---

## 4. Module Boundaries

### `views/` vs `components/`
- **`views/`** — route-level pages. One subfolder per page (`Blog/`, `Feed/`). Views know about routing, fetching (post-Stage 2), and layout.
- **`components/`** — reusable building blocks. Components must NOT import from `views/`. They receive props; they don't know about routes.

### `data/` (MVP)
- Pure static modules that export typed seed data.
- Components and views may import from `data/` directly during MVP.
- When Stage 2 lands, replace these imports with `services/` calls and keep `data/` only for fixtures/tests.

### `types/`
- Shared types only. View-local types stay in the view file.
- Avoid circular imports — types should not depend on runtime modules.

### `services/` (Stage 2)
- All HTTP / IO lives here. No JSX, no React imports.
- Return `Promise<T>` with strict types.
- A view importing axios directly is a code smell — go through a service.

### `hooks/` (planned)
- Custom hooks live here when used by 2+ components.
- Single-use hooks can stay co-located with their consumer until they grow.

### Backend module boundaries (Stage 2)
- `routes/` — only HTTP concerns (req/res shape, status codes). No business logic.
- `services/` — pure logic, returns plain objects/promises. No `req`/`res`.
- `db/` — query implementations. Services call into `db/`.
- `middleware/` — cross-cutting concerns (auth, logging, error handling).

---

## 5. Import Paths & Order

### Aliases (recommended — to be added when needed)
Update `tsconfig.app.json` `paths` and `vite.config.ts` `resolve.alias` together:
```
@/*            → src/*
@components/*  → src/components/*
@views/*       → src/views/*
@data/*        → src/data/*
@types/*       → src/types/*
@hooks/*       → src/hooks/*
@utils/*       → src/utils/*
@services/*    → src/services/*
```
> Until aliases land, use relative imports. Don't introduce aliases piecemeal — add the full set in one task.

### Import order (top → bottom)
1. Node / polyfill modules
2. Third-party packages (`react`, `react-router-dom`, `axios`, ...)
3. Absolute aliases (`@components/...`)
4. Relative imports (`./BlogView.css`, `../utils/formatDate`)
5. Style / asset imports (`./BlogView.css`, `./hero.png`)

Blank line between groups. ESLint will be configured to enforce this in Stage 3.

---

## 6. Testing Layout (planned — Stage 3)

```
front-end/src/
  views/Blog/BlogView.test.tsx
  components/ArticleCard/ArticleCard.test.tsx
  hooks/useScrollSpy.test.ts
  utils/slugify.test.ts
back-end/src/
  routes/articles.routes.test.ts
  services/articlesService.test.ts
```

- Vitest for the frontend (Vite-native).
- Jest or node:test for the backend.
- E2E (Playwright) deferred to Stage 4.

---

## 7. Styling & Theming

- Tailwind utilities are the default for new components. Use `index.css` only for global resets / base layer customizations.
- For complex layouts (already true in `BlogView.css`), a co-located `.css` file is acceptable. Keep classnames `kebab-case` and scoped to that component.
- **Do not hard-code colors or spacing** in components once design tokens are defined in `rules/design.md` — import from there or extend the Tailwind theme.
- Dark mode is post-MVP; build for light theme only for now but avoid color names that lock that in (`bg-paper` over `bg-white`-with-no-token).

---

## 8. Routing Conventions

- All routes declared in `App.tsx` (or a dedicated `router.tsx` once routes exceed ~5).
- URL paths are `kebab-case`, lowercase.
- Dynamic params use a clear name (`:slug`, not `:id` unless it's a numeric id).
- Route → View mapping (Stage 1 plan):
  - `/` → `views/Feed/FeedView`
  - `/article/:slug` → `views/Blog/BlogView`

---

## 9. Comments & Patterns

- Default to no comments. Self-documenting code wins.
- Reserve comments for **why** something is non-obvious (workarounds, tricky scroll math, browser quirks).
- No `// TODO` without an owner or a backlog ID (e.g., `// TODO(V2-REQ-005): wire to /api/search`).
- Capture decisions that affect future work in `architecture.md` Key Decisions, not in code comments.

---

## 10. Git & Branching

- Branch per task: `feature/TASK-YYYYMMDD-NNN-short-name` or `fix/BUG-NNN-short-name`.
- Commit message format: `feat(scope): summary` or `fix(scope): summary`. Reference task IDs in the body.
- Doc updates (`tasks/task-*.md`, `CONTEXT.md`) ship in the same PR as code changes.

---

## Checklist for Contributors
- [ ] The directory you are about to touch exists in §2; if not, update §2 first.
- [ ] New files follow the naming conventions in §3.
- [ ] Imports respect alias order from §5.
- [ ] You did not put runtime code under `.vital_context/`.
- [ ] You did not introduce a backend coupling in MVP scope.
- [ ] Tests (when present) live next to or under the module they validate.
