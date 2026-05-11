# Technical Architecture

> The technical brain of the project. Agents read this to understand how the system is built, what schemas exist, and why key decisions were made.

---

## Stack

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| Frontend framework | React | ^19.2.5 | Modern, hooks-first, concurrent features |
| Frontend language | TypeScript | ~6.0.2 | Type safety; team standard |
| Build tool | Vite | ^8.0.9 | Fast HMR, ESM-native, minimal config |
| Routing | react-router-dom | ^7.14.2 | Standard React routing; v7 supports framework-mode if needed later |
| Styling | Tailwind CSS | ^4.2.4 | Utility-first speed |
| Styling (per-view) | Plain CSS files | n/a | BlogView already uses scoped CSS for complex layouts; keep this pattern alongside Tailwind |
| Markdown rendering | react-markdown | ^10.1.0 | Mature, plugin-based, secure-by-default |
| Markdown plugin | remark-gfm | ^4.0.1 | GitHub-flavored Markdown (tables, strikethrough, task lists) |
| HTTP client | axios | ^1.15.2 | Installed; reserved for Stage 2 backend integration (unused in MVP) |
| CSS post-processor | PostCSS + Autoprefixer | ^8.5.10 / ^10.5.0 | Tailwind dependency |
| Linting | ESLint + typescript-eslint + eslint-plugin-react-hooks | ^9.39.4 / ^8.58.2 / ^7.1.1 | Standard TS+React lint stack |
| Backend runtime | Node.js | n/a (latest LTS recommended) | Standard JS server runtime |
| Backend framework | Express | ^5.2.1 | Lightweight, ubiquitous |
| Backend language | TypeScript | ^6.0.3 | Match frontend |
| Backend dev runner | nodemon + ts-node-dev | ^3.1.14 / ^2.0.0 | Hot reload during dev |
| Backend env loading | dotenv | ^17.4.2 | Standard .env loader |
| Backend CORS | cors | ^2.8.6 | Permit frontend origin in dev |
| Database | TBD | — | Not chosen for MVP (no backend data yet); decide before Stage 2 |
| Auth | TBD | — | Not in MVP scope |
| Hosting | TBD | — | Decide before Stage 4 |

---

## Architecture Diagram

```
┌─────────────────────────────────────┐
│         Browser (modern)            │
│  React 19 SPA served by Vite        │
└────────────────┬────────────────────┘
                 │
                 │  (MVP: no network calls — all data hardcoded)
                 │  (Stage 2+: HTTPS / axios)
                 ▼
┌─────────────────────────────────────┐
│      Frontend (Vite dev / build)    │
│  ┌──────────────────────────────┐   │
│  │  App.tsx (Router root)       │   │
│  │  ├─ /            FeedView    │   │
│  │  └─ /article/:slug BlogView  │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │  data/articles.ts (static)   │   │
│  │  components/ (shared UI)     │   │
│  └──────────────────────────────┘   │
└────────────────┬────────────────────┘
                 │ (Stage 2+ only)
                 ▼
┌─────────────────────────────────────┐
│   Backend — Express 5 + TS          │
│   src/index.ts (currently a stub)   │
│   Future routes: /api/articles      │
└────────────────┬────────────────────┘
                 │ (Stage 2+)
                 ▼
            ┌──────────┐
            │ Database │  ← TBD
            │ (TBD)    │
            └──────────┘
```

---

## Data Models

### `Article` — single tech article (frontend type, MVP-static)
```ts
{
  id: string,                  // unique stable id (e.g., uuid or slug)
  slug: string,                // URL-safe identifier used in /article/:slug
  title: string,               // article display title
  excerpt: string,             // 2–3 line preview shown on feed cards
  category: Category,          // see Category enum below
  breadcrumb: string[],        // e.g., ["Engineering", "System Architecture"]
  tags: string[],              // freeform topic tags (Algorithms, Architecture, etc.)
  author: {
    name: string,
    avatarUrl: string
  },
  coverImageUrl: string,       // hero/thumbnail image
  readTimeMinutes: number,     // computed or hand-authored
  publishedAt: string,         // ISO 8601 timestamp
  isHero: boolean,             // true for the lead card on the feed (one per category context)
  isTrending: boolean,         // surfaces in "Trending This Week"
  body: string                 // raw Markdown content (rendered by react-markdown)
}
```

### `Category` — feed/filter taxonomy
```ts
type Category =
  | "ai-ml"            // "AI & ML"
  | "machine-learning"
  | "systems"
  | "web"              // "Web Development"
  | "data-science"
  | "design"
  | "engineering"
  | "research";        // article-page only (e.g., "RESEARCH" pill)
```

### `Heading` — outline panel entry (already in BlogView.tsx)
```ts
{
  id: string,        // heading-N anchor
  level: number,     // 1 | 2 | 3
  text: string,      // raw heading text
  icon?: string      // optional emoji/icon prefix
}
```

### `Topic` — Browse Topics tag cloud entry
```ts
{
  label: string,     // "Algorithms", "Architecture", ...
  slug: string       // url-safe
}
```

### `TrendingItem` — sidebar "Trending This Week"
```ts
{
  rank: number,            // 1..4
  title: string,
  authorName: string,
  readTimeMinutes: number,
  articleSlug: string
}
```

> All models above live on the frontend for MVP. When Stage 2 introduces the backend API, mirror these in `back-end/src/types/` and validate at the boundary.

---

## Data Flows

### Flow: Render Feed page (MVP — no network)
```
User navigates to "/"
  → React Router matches FeedView
  → FeedView imports static articles from data/articles.ts
  → Filters: { isHero } → hero card; remainder → standard cards
  → Sidebar imports trending[] + topics[] from data/
  → Renders navbar + hero + filter pills + cards + sidebar + footer
```

### Flow: Render Article (Blog) page (MVP — no network)
```
User navigates to "/article/:slug"
  → React Router matches BlogView with slug param
  → BlogView looks up article in static data/articles.ts by slug
  → ReactMarkdown + remarkGfm render article.body
  → useEffect on mount queries DOM for h1/h2/h3, builds headings[]
  → Outline panel renders headings[] (h3 indented under h2)
```

### Flow: Outline click → smooth scroll
```
User clicks heading button in outline
  → handleHeadingClick(index)
  → setActiveHeadingIndex(index)
  → useEffect: queries DOM for h1/h2/h3
  → Removes .active-heading from all
  → Adds .active-heading to indexed element
  → reader.scrollTo({ top: element.offsetTop - reader.offsetTop - 20, behavior: "smooth" })
```

### Flow: Scroll spy (planned — V1-REQ-013)
```
User scrolls article body
  → IntersectionObserver fires on heading enter/exit viewport (rootMargin tuned)
  → Most recently entered heading wins → setActiveHeadingIndex(i)
  → Outline panel reflects active state via .active class
```

### Flow: Category filter (UI only, MVP)
```
User clicks a pill
  → setActivePill(pillId)
  → Pill renders with active styling
  → No data filter applied for MVP; visual only
```

### Flow: Future — Backend article fetch (Stage 2)
```
User navigates to "/"
  → FeedView mounts
  → axios GET /api/articles?category=...&limit=...
  → Backend queries DB (TBD)
  → Returns Article[]
  → FeedView renders
```

---

## API Endpoints

### Current (MVP) — none

The Express backend at [back-end/src/index.ts](../back-end/src/index.ts) is currently a stub (empty/single line). No endpoints are wired. The frontend does not call the backend in MVP.

### Planned (Stage 2)

| Method | Route | Purpose | Auth |
|--------|-------|---------|------|
| GET | `/api/articles` | List articles (query: `category`, `tag`, `limit`, `cursor`) | No (public) |
| GET | `/api/articles/:slug` | Get one article (full body Markdown) | No (public) |
| GET | `/api/trending` | Trending articles for sidebar | No (public) |
| GET | `/api/topics` | Topic cloud entries | No (public) |
| POST | `/api/newsletter` | Subscribe email | No (rate-limited) |
| POST | `/api/auth/sign-in` | Sign in | No |
| POST | `/api/auth/sign-up` | Sign up | No |
| POST | `/api/bookmarks` | Bookmark an article | Yes |
| GET | `/api/bookmarks` | List user bookmarks | Yes |

Schemas, query params, and request/response shapes to be specified when Stage 2 activates.

---

## Key Decisions

| # | Decision | Chose | Over | Why |
|---|----------|-------|------|-----|
| 1 | Frontend framework | React 19 + Vite | Next.js, Remix | Static SPA is enough for MVP; no SSR requirement; team familiarity with Vite |
| 2 | Styling approach | Tailwind v4 + scoped CSS per view | Pure Tailwind, CSS-in-JS, CSS Modules | Hybrid lets BlogView keep its rich existing CSS while new components stay utility-first |
| 3 | Markdown library | react-markdown + remark-gfm | MDX, marked.js | Plugin-based, safer (no `dangerouslySetInnerHTML`), simpler than MDX for MVP |
| 4 | Routing library | react-router-dom v7 | TanStack Router, framework router | Already installed; widely understood; v7 leaves door open for framework mode |
| 5 | MVP data source | Hardcoded TS modules | Mock API, JSON file, real backend | Per design brief — eliminates backend coupling for MVP velocity |
| 6 | Backend skeleton choice | Express 5 + TS | Fastify, Hono, NestJS | Universally familiar; minimal surface area for an empty MVP backend; easy to swap later if needed |
| 7 | Database | _Deferred_ | Postgres, SQLite, Firestore | Not needed for MVP; revisit at Stage 2 with concrete read/write patterns |
| 8 | Scroll spy mechanism (current) | Manual `querySelector` + click-driven highlight | IntersectionObserver | Sufficient for current click-driven behavior; upgrade to IO for V1-REQ-013 (scroll-driven spy) |
| 9 | Code block syntax highlighting (MVP) | Stylistic monospace + language label badge | Shiki, Prism, highlight.js | Defers payload weight; visual differentiation via label is "good enough" for MVP. Full highlighting tracked as V2-REQ-010 |
| 10 | Image strategy (MVP) | Static assets in `front-end/src/assets/` and `front-end/public/` | CDN, dynamic optimization | Simplest path; revisit at Stage 3 with responsive sizes |

---

## Constraints & Limitations

- **TypeScript ~6.0.2**: pinned in package.json; verify React 19 type compatibility on every dependency upgrade.
- **No tests yet**: neither frontend nor backend has a test runner configured. Untested code is the norm for now; add Vitest/Jest in Stage 3.
- **Backend `index.ts` is empty**: do not assume any backend behavior in MVP. The frontend must remain self-contained until Stage 2.
- **Tailwind v4** is a major version with new config conventions — when extending the theme, prefer the new `@theme` CSS-first approach over the legacy JS config (`tailwind.config.js` is present but minimal).
- **No HTTPS in dev**: Express runs HTTP in dev; any feature requiring secure context (Service Workers, Web Push) cannot be tested in dev without a tunnel.
- **Browser support**: modern evergreen only. IE / legacy Edge / older Safari (<15) are explicitly out of scope.
- **No CI configured**: lint/build is manual until Stage 0 follow-up adds a pipeline.
