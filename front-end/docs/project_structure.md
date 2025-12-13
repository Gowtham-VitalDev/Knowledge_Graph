# Project Structure & Conventions - Knowledge Graph MVP

> **This is the source of truth for where files live, how we name things, and which tools back the Knowledge Graph web app.** Update it whenever architecture changes so AGENT_WORKFLOW callers know exactly where to work.

---

## 1. Purpose
- Provide a deterministic layout for the Next.js App Router + Supabase stack.
- Capture naming, aliasing, and testing rules enforced during code review.
- Serve as the reference whenever AGENT_WORKFLOW says “check project_structure.”

---

## 2. Repository Overview

```
front-end/
+-- src/
¦   +-- app/                 # Next.js App Router entries, layouts, metadata
¦   +-- components/          # Reusable UI atoms/molecules
¦   +-- hooks/               # Shared React hooks (client + server)
¦   +-- screens/             # Page-level compositions (client components)
¦   +-- services/            # Supabase + external API helpers
¦   +-- store/               # Client-side state (Zustand or Context)
¦   +-- theme/               # Tokens + ThemeProvider
¦   +-- types/               # Global TypeScript interfaces
¦   +-- utils/               # Pure helpers (markdown, formatting, etc.)
¦   +-- __tests__/           # Vitest/Playwright utilities & fixtures
+-- public/                  # Static assets served by Next.js
+-- docs/                    # BMAD + operational docs (this folder)
+-- ... Next.js config (package.json, tsconfig.json, eslint, etc.)
```

Rules:
- No feature code outside `src/` (aside from Next-generated `.next` artifacts).
- Server components + route handlers stay under `src/app`. Keep components under `src/components` for reuse.
- `.acontext/` remains within `docs/` per BMAD kit.

---

## 3. Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| React components | `PascalCase` | `ArticleOutline.tsx` |
| Hooks | `camelCase` + `use` prefix | `useArticleOutline.ts` |
| Utilities | `camelCase` | `formatReadingTime.ts` |
| Files in `app/` | follow Next.js route naming | `app/(marketing)/page.tsx` |
| Tests | Mirror file + `.test.ts(x)` | `utils/markdown.test.ts` |
| Assets | `kebab-case` | `hero-graph.png` |

General guidance:
- Export a single default component per file when possible; grouped exports via `index.ts` for directories.
- Keep server-only helpers suffixed with `.server.ts` when necessary.

---

## 4. Module Boundaries

### Components vs. Screens
- `components/` = presentational, reusable primitives. **Never** import data-fetching logic directly.
- `screens/` = feature assemblies (e.g., ArticleDetailScreen) that wire hooks + services.
- Route files under `app/` delegate heavy lifting to `screens/` to keep routing thin.

### Services
- `services/` encapsulate Supabase clients, fetchers, and embed resolvers.
- Each service exports pure async functions; pass dependencies (e.g., Supabase client) as parameters for testability.

### Store
- Co-locate Zustand slices or context providers here. Persisted state (e.g., user preferences) uses adapters housed under `services/`.

---

## 5. Import Paths & Order

`tsconfig.json` defines the following aliases:

```
@app/*
@components/*
@hooks/*
@screens/*
@services/*
@store/*
@types/*
@utils/*
@theme/*
```

Always import in this order: (1) Node/built-ins, (2) third-party packages, (3) alias-based modules, (4) relative paths, (5) styles.

---

## 6. Testing Layout
- Unit tests live alongside logic (`src/utils/*.test.ts`) or inside `src/__tests__` for shared fixtures.
- Integration tests target App Router routes via Playwright (Stage 1) and live in `src/__tests__/integration`.
- Snapshot tests allowed only for stable UI primitives (buttons, typography components).
- Use Vitest (Stage 1) for units; Playwright for e2e; GitHub Actions workflow will run both once CI lands.
- Document custom mocks in `.acontext/artifacts` so future debuggers understand behavior.

---

## 7. Styling & Theming
- `src/theme/tokens.ts` contains the canonical palette, typography scale, spacing, and layout tokens derived from `UI_UX_doc.md`.
- `ThemeProvider` exposes these tokens via React context; CSS variables in `src/app/globals.css` must use the same values.
- Tailwind CSS 4 is configured to scan `src/**/*`. Avoid inline hex colors--reference CSS variables or theme tokens.
- Dark mode switches automatically via `prefers-color-scheme`; theme overrides belong near providers, not per component.

---

## 8. Platform Guidelines

| Concern | Guidance |
|---------|----------|
| Next.js routing | Keep all routes inside `src/app`. Shared layouts go under `src/app/(group)/layout.tsx`. |
| Supabase access | Use server actions or route handlers to interact with Supabase; never expose service keys client-side. |
| Markdown ingestion | Utilities under `src/utils/markdown.ts` manage parsing + slugging. Any new behavior (e.g., custom syntax) must be documented in `UI_UX_doc.md` and `Implementation.md`. |
| Embeds | Dedicated component under `src/components/media/YouTubeEmbed.tsx`; sanitize URLs before rendering iframes. |

---

## 9. Documentation Hooks
- Every new directory or alias change requires an update to this file + `AGENT_WORKFLOW.md`.
- Add references to relevant BMAD sections in `.acontext/tasks` when introducing new modules.
- Architecture decisions affecting structure must be logged in `.acontext/decisions`.

---

## 10. Code Comments & Patterns
- Favor descriptive component/prop names over long comments.
- Use docblocks for exported hooks/services describing inputs + outputs.
- Flag follow-ups using `TODO(<owner>)` and link to a task or backlog entry.
- Keep Markdown parsing + embed logic pure and covered by unit tests.

---

## 11. Git & Branching
- Branch per task using `stage#/TASK-ID-desc` (e.g., `stage1/CORE-002-outline-sidebar`).
- Squash merges are acceptable, but commits must reference the Active Task ID in the message.
- Update docs (`Implementation.md`, `project_structure.md`, `UI_UX_doc.md`, `Active_Task.md`) in the same PR as code changes they describe.

---

### Checklist for Contributors
- [ ] Directory you’re editing exists here; if not, update the doc first.
- [ ] File names follow the conventions above.
- [ ] Imports respect alias order; run `npm run lint` locally.
- [ ] Tests live next to the modules they cover.
- [ ] When refactoring structure, update this document + AGENT_WORKFLOW before merging.
