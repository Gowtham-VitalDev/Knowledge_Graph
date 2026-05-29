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
| Backend language | Python | 3.11 | AI/ML ecosystem; async-native; replaces Node/Express |
| Backend framework | FastAPI | latest | Async, Pydantic validation, auto Swagger docs, Depends() injection |
| Backend server | Uvicorn | latest | ASGI server for FastAPI (equivalent to nodemon in dev with --reload) |
| Backend DB driver | Motor | latest | Async MongoDB driver for Python; no ORM — raw aggregation pipeline |
| Backend validation | Pydantic v2 | latest | Request/response models; auto-validates before handler runs |
| Backend auth | python-jose + passlib | latest | JWT tokens + bcrypt; bcrypt==4.0.1 pinned for Node hash compatibility |
| Backend env loading | python-dotenv | latest | Equivalent to dotenv in Node |
| Database | MongoDB | ^7.x (local) | Document model fits article/tag/category shape; Atlas-ready for production |
| Auth | JWT httpOnly cookie | — | 7-day expiry; same pattern as Node backend |
| Node/Express backend | **Deprecated** | — | Replaced by Python/FastAPI in Stage 4 (back-end/ folder kept for reference) |
| Container registry | GCP Artifact Registry | us-central1 | Private Docker registry inside GCP project; Cloud Run pulls natively without extra auth |
| Backend hosting | GCP Cloud Run | managed | Serverless containers; scales to zero; HTTPS built-in; auto-provisioned HTTPS URL |
| Database hosting | MongoDB Atlas | M0 free | Cloud MongoDB; connects via `mongodb+srv://`; zero maintenance; free forever |
| Image storage | GCP Cloud Storage | Standard | Public bucket `kg-article-images-gg`; permanent URLs used directly in article Markdown |
| GCS SDK | google-cloud-storage | latest | Python SDK for admin uploads; blocking calls wrapped in `asyncio.to_thread` |

---

## Architecture Diagram

```
┌─────────────────────────────────────┐
│         Browser (modern)            │
│  React 19 SPA served by Vite        │
└────────────────┬────────────────────┘
                 │  axios (VITE_API_URL → http://127.0.0.1:5000)
                 ▼
┌─────────────────────────────────────┐
│      Frontend (Vite dev / build)    │
│  ┌──────────────────────────────┐   │
│  │  App.tsx (Router root)       │   │
│  │  ├─ /            FeedView    │   │
│  │  └─ /article/:slug BlogView  │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │  api/client.ts (axios)       │   │
│  │  api/articles.ts             │   │
│  │  api/adapters.ts             │   │
│  │  components/ (shared UI)     │   │
│  └──────────────────────────────┘   │
└────────────────┬────────────────────┘
                 │  HTTP REST
                 ▼
┌─────────────────────────────────────┐
│   Backend — Express 5 + TS          │
│   src/index.ts → imports models/    │
│   routes: articles, trending, tags  │
│           newsletter, categories    │
└────────────────┬────────────────────┘
                 │  Mongoose
                 ▼
            ┌──────────┐
            │ MongoDB  │  localhost:27017/knowledgegraph
            │ (local)  │  → Atlas for production
            └──────────┘
```

---

## Data Models

### Frontend `Article` type — `front-end/src/types/article.ts`
```ts
{
  slug: string,
  title: string,
  excerpt: string,
  body: string,                // raw Markdown (mapped from API content field)
  category: Category,
  breadcrumb: string[],
  tags: string[],
  author: { name: string, avatarUrl?: string },
  coverImageUrl: string,
  thumbnailUrl: string,
  readTimeMinutes: number,
  publishedAt: string,
  isHero: boolean,
}
```

### MongoDB: `articles` collection — `back-end/src/models/Article.ts`
```
slug, title, excerpt, content (Markdown), coverImage
categoryId → ref Category
tagIds[] → ref Tag
authorId → ref User
status: draft|published|archived
featured: boolean
trendingScore, readTime, views, likes, shares, bookmarks
seoTitle, seoDescription, publishedAt
Indexes: (status,publishedAt), (categoryId,status), (slug unique)
```

### MongoDB: `categories` collection — `back-end/src/models/Category.ts`
```
name, slug (unique), description, icon, colorCode, articleCount
```

### MongoDB: `tags` collection — `back-end/src/models/Tag.ts`
```
name, slug (unique), usageCount
```

### MongoDB: `users` collection — `back-end/src/models/User.ts`
```
fullName, username (unique), email (unique), passwordHash
role: reader|author|editor|admin
bio, avatarUrl, socialLinks{}, expertise[], isVerified, status
```

### MongoDB: `trendingrankings` collection — `back-end/src/models/TrendingRanking.ts`
```
articleId → ref Article, weekStartDate, rank, score
Unique index: (articleId, weekStartDate)
```

### MongoDB: `newslettersubscribers` collection — `back-end/src/models/NewsletterSubscriber.ts`
```
email (unique), status: active|unsubscribed, subscribedAt, unsubscribedAt
```

### MongoDB: `sitesettings` collection — `back-end/src/models/SiteSettings.ts`
```
homepageHeroTitle, homepageHeroSubtitle, featuredArticleId → ref Article
newsletterEnabled, maintenanceMode, seoDefaults{}
```

### Frontend `Category` type enum
```ts
type Category = "ai-ml" | "quantum" | "crypto" | "synth-bio" | "vr-ar" | "cybersec" | "neural" | "robotics"
```

### `OutlineHeading` — TOC panel entry (`front-end/src/components/Outline/Outline.tsx`)
```ts
{ id: string, level: 2 | 3, text: string }
```

### API Adapter — `front-end/src/api/adapters.ts`
`adaptArticle(apiArticle) → Article` maps:
- `content` → `body`
- `categoryId.slug` → `category`
- `categoryId.name` → `breadcrumb[0]`
- `tagIds[].name` → `tags[]`
- `authorId.fullName` → `author.name`
- `featured` → `isHero`

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

### Implemented (Stage 4 — V3-Backend-Python, FastAPI)

All routes served by `back-end-py/` running on port 5000.

| Method | Route | Purpose | Auth |
|--------|-------|---------|------|
| GET | `/health` | Health check | No |
| GET | `/api/articles` | List published articles | No |
| GET | `/api/articles/{slug}` | Get one article + increment views | No |
| GET | `/api/trending` | Trending sidebar (latest week) | No |
| GET | `/api/tags` | All tags sorted by usageCount | No |
| GET | `/api/categories` | All categories sorted by articleCount | No |
| POST | `/api/auth/login` | Login — issues JWT httpOnly cookie | No |
| POST | `/api/auth/logout` | Clear cookie | No |
| GET | `/api/auth/me` | Current user from JWT | Yes |
| GET | `/api/admin/articles` | List all articles (all statuses) | Admin |
| GET | `/api/admin/articles/{id}` | Get one article by _id for editor | Admin |
| POST | `/api/admin/articles` | Create article | Admin |
| PUT | `/api/admin/articles/{id}` | Update article | Admin |
| PATCH | `/api/admin/articles/{id}/publish` | Toggle draft ↔ published | Admin |
| DELETE | `/api/admin/articles/{id}` | Delete article | Admin |
| POST | `/api/admin/upload` | Upload single image to GCS (`?folder=`) | Admin |
| POST | `/api/admin/upload/bulk` | Upload up to 20 images in parallel to GCS | Admin |
| DELETE | `/api/admin/upload` | Delete image from GCS (`?destination=`) | Admin |
| GET | `/api/admin/images` | List images in GCS bucket (`?prefix=`) | Admin |

### Key FastAPI patterns used

- `Depends()` — dependency injection for auth (replaces Express middleware)
- `APIRouter(dependencies=[Depends(require_admin)])` — router-level protection
- `Cookie(None)` — reads httpOnly cookie as a typed parameter
- MongoDB aggregation pipeline (`$lookup`, `$unwind`, `$addFields`) — replaces Mongoose populate()
- `$toString` in `$addFields` — converts ObjectId to string for JSON serialisation

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
| 7 | Database | MongoDB + Mongoose | Postgres, SQLite, Firestore | Document model fits article/tag/category shape; Mongoose gives typed schemas + populate() |
| 8 | Scroll spy mechanism | IntersectionObserver (`rootMargin: "-80px 0px -70% 0px"`) | manual querySelector | Stable heading IDs via slugify(); handles dynamic content correctly |
| 9 | Code block syntax highlighting | Stylistic monospace | Shiki, Prism, highlight.js | Defers payload weight; Mermaid diagrams handled via MermaidBlock component |
| 10 | Image strategy | picsum.photos URLs in seed data | CDN, dynamic optimization | Simplest path for dev; swap to real CDN in production |
| 11 | DB localhost issue | 127.0.0.1 in MONGO_URI | localhost | Windows Node resolves localhost → IPv6 ::1 but MongoDB binds IPv4 |
| 12 | Model registry | models/index.ts re-exported at startup in index.ts | lazy imports per route | Prevents MissingSchemaError when populate() references a model not yet imported |
| 13 | API adapter | adaptArticle() in front-end/src/api/adapters.ts | rewrite Article type | Maps API shape → existing frontend type; no card components needed to change |
| 14 | Mermaid rendering | MermaidBlock with useId() for stable SVG IDs | remark-mermaid plugin | Client-side only; dark theme; error fallback; no SSR issues |
| 15 | YouTube embeds | Bare URL detection in react-markdown `a` component | remark plugin | Only embeds autolinked URLs, not named links — matches Obsidian behavior |
| 16 | TOC collapse | data-toc CSS attribute + grid column transition | JS-driven width change | Single source of truth; CSS handles both width and panel opacity |

---

## Constraints & Limitations

- **TypeScript ~6.0.2**: pinned in package.json; verify React 19 type compatibility on every dependency upgrade.
- **No tests yet**: neither frontend nor backend has a test runner configured. Untested code is the norm for now; add Vitest/Jest in Stage 3.
- **Backend `index.ts` is empty**: do not assume any backend behavior in MVP. The frontend must remain self-contained until Stage 2.
- **Tailwind v4** is a major version with new config conventions — when extending the theme, prefer the new `@theme` CSS-first approach over the legacy JS config (`tailwind.config.js` is present but minimal).
- **No HTTPS in dev**: Express runs HTTP in dev; any feature requiring secure context (Service Workers, Web Push) cannot be tested in dev without a tunnel.
- **Browser support**: modern evergreen only. IE / legacy Edge / older Safari (<15) are explicitly out of scope.
- **No CI configured**: lint/build is manual until Stage 0 follow-up adds a pipeline.
