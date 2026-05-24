# Quick Reference

> Cheat sheet for common commands, environment setup, and key lookups. Agents read this to run the project without asking how.

---

## File Structure

```
Knowledge_Graph/
├── .vital_context/             # Project documentation (this folder)
│   ├── CONTEXT.md              # Entry point — current stage + orchestration
│   ├── PRD.md                  # Product requirements + registry (§7)
│   ├── playbook.md             # Stage goals + AC + DoD
│   ├── architecture.md         # Stack, schemas, flows, decisions
│   ├── reference.md            # This file
│   ├── bugs.md                 # Bug log
│   ├── backlog.md              # Deferred / future work
│   ├── README.md               # (existing) framework readme
│   ├── playbook.md
│   ├── QuickPrompts.md         # (existing) prompt library
│   ├── rules/
│   │   ├── structure.md        # File org + naming
│   │   └── design.md           # Design tokens + components
│   └── tasks/
│       ├── index.md            # Task log index
│       └── example_task_template.md
│
├── claude.md                   # Project design brief (MVP scope)
│
├── front-end/                  # Vite + React 19 + TS app
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
│   ├── eslint.config.js
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   └── src/
│       ├── main.tsx            # Root mount
│       ├── App.tsx             # Currently renders <BlogView />; will host router
│       ├── App.css
│       ├── index.css           # Tailwind directives
│       ├── assets/             # Images (hero.png, react.svg, vite.svg)
│       ├── api/
│       │   ├── client.ts       # axios instance (baseURL from VITE_API_URL)
│       │   ├── articles.ts     # fetchArticles(), fetchArticleBySlug()
│       │   └── adapters.ts     # adaptArticle() — API shape → Article type
│       ├── types/
│       │   └── article.ts      # Article, Category types
│       ├── components/
│       │   ├── AuthorAvatar/
│       │   ├── BlogNavbar/
│       │   ├── CategoryBadge/
│       │   ├── MermaidBlock/   # Mermaid diagram renderer (useId, mermaid.render)
│       │   ├── Outline/        # TOC panel (desktop sticky + mobile accordion)
│       │   ├── TopicCloud/
│       │   └── TrendingList/
│       └── views/
│           ├── Feed/
│           │   ├── FeedView.tsx
│           │   └── FeedView.css
│           └── Blog/
│               ├── BlogView.tsx
│               └── BlogView.css
│
└── back-end/                   # Express 5 + TS + MongoDB
    ├── package.json
    ├── tsconfig.json           # includes "types": ["node"]
    ├── .env                    # MONGO_URI, PORT
    └── src/
        ├── index.ts            # Express bootstrap; imports models/ before routes
        ├── db.ts               # connectDB() with 5-retry, 3s delay
        ├── models/
        │   ├── index.ts        # re-exports all models (prevents MissingSchemaError)
        │   ├── Article.ts
        │   ├── Category.ts
        │   ├── Tag.ts
        │   ├── User.ts
        │   ├── TrendingRanking.ts
        │   ├── NewsletterSubscriber.ts
        │   └── SiteSettings.ts
        ├── routes/
        │   ├── articles.ts
        │   ├── trending.ts
        │   ├── tags.ts
        │   ├── categories.ts
        │   └── newsletter.ts
        └── scripts/
            └── seed.ts         # clears + inserts all collections
```

---

## Common Commands

```bash
# === Frontend (run from /front-end) ===
npm install                  # install deps (first time)
npm run dev                  # Vite dev server (default http://localhost:5173)
npm run build                # tsc -b && vite build → /dist
npm run preview              # serve the production build locally
npm run lint                 # eslint .

# === Backend (run from /back-end) ===
npm install                  # install deps
npm run dev                  # nodemon + ts-node-dev, watches src/index.ts
npm run build                # tsc → /dist
npm start                    # node dist/index.js (after build)
npx ts-node src/scripts/seed.ts   # seed MongoDB (clears + inserts all collections)

# === MongoDB ===
# Start: ensure mongod is running locally on 127.0.0.1:27017
# GUI: MongoDB Compass → connect to mongodb://127.0.0.1:27017
# DB name: knowledgegraph
# IMPORTANT: use 127.0.0.1 not localhost (Windows IPv6 issue)

# === Tests ===
# No test runner configured yet. Add Vitest (frontend) / Jest (backend) in Stage 4.

# === Deploy ===
# Frontend: Vercel (vercel.json with SPA catch-all). Root Directory set in Vercel dashboard.
# Backend: not deployed yet — pending Stage 5.
```

---

## Environment Variables

| Variable | Where | Purpose | Example | Required? |
|----------|-------|---------|---------|-----------|
| `MONGO_URI` | `back-end/.env` | MongoDB connection string | `mongodb://127.0.0.1:27017/knowledgegraph` | Yes |
| `PORT` | `back-end/.env` | Express listen port | `5000` | No (defaults to 5000) |
| `VITE_API_URL` | `front-end/.env` | Backend base URL for axios | `http://127.0.0.1:5000` | No (defaults to http://localhost:5000) |

> Keep `.env` files out of git. IMPORTANT: use `127.0.0.1` not `localhost` in MONGO_URI on Windows.

---

## Key API Endpoints (Quick Lookup)

### Implemented (Stage 3)
| Endpoint | What it does |
|----------|-------------|
| `GET /api/articles` | List articles (query: category, tag, limit, page) |
| `GET /api/articles/:slug` | Get one article with full Markdown body |
| `GET /api/trending` | Sidebar trending list (latest week, nested populate) |
| `GET /api/tags` | All tags sorted by usageCount |
| `GET /api/categories` | All categories sorted by articleCount |
| `POST /api/newsletter` | Subscribe email (validates, handles re-subscribe) |

Full details + schemas in [architecture.md](architecture.md).

---

## Key Collections / Tables

### Implemented (Stage 3)
| Collection | Purpose | Key Field |
|------------|---------|-----------|
| `articles` | Article content + metadata | `slug` (unique) |
| `categories` | Category taxonomy | `slug` (unique) |
| `tags` | Tag taxonomy | `slug` (unique) |
| `users` | Author profiles | `username`, `email` (unique) |
| `trendingrankings` | Weekly trending rankings | `(articleId, weekStartDate)` unique |
| `newslettersubscribers` | Email capture | `email` (unique) |
| `sitesettings` | Global site config | singleton document |

Full schemas in [architecture.md](architecture.md).

---

## Key File Locations

| What | Where |
|------|-------|
| Router root | [front-end/src/App.tsx](../front-end/src/App.tsx) |
| Entry point | [front-end/src/main.tsx](../front-end/src/main.tsx) |
| Article type | [front-end/src/types/article.ts](../front-end/src/types/article.ts) |
| API client (axios) | [front-end/src/api/client.ts](../front-end/src/api/client.ts) |
| API adapter | [front-end/src/api/adapters.ts](../front-end/src/api/adapters.ts) |
| Feed view | [front-end/src/views/Feed/FeedView.tsx](../front-end/src/views/Feed/FeedView.tsx) |
| Blog view | [front-end/src/views/Blog/BlogView.tsx](../front-end/src/views/Blog/BlogView.tsx) |
| Mermaid renderer | [front-end/src/components/MermaidBlock/MermaidBlock.tsx](../front-end/src/components/MermaidBlock/MermaidBlock.tsx) |
| TOC outline | [front-end/src/components/Outline/Outline.tsx](../front-end/src/components/Outline/Outline.tsx) |
| Backend entry | [back-end/src/index.ts](../back-end/src/index.ts) |
| DB connect | [back-end/src/db.ts](../back-end/src/db.ts) |
| Model registry | [back-end/src/models/index.ts](../back-end/src/models/index.ts) |
| Seed script | [back-end/src/scripts/seed.ts](../back-end/src/scripts/seed.ts) |
| Backend env | [back-end/.env](../back-end/.env) (not in git) |
| Project design brief | [CLAUDE.md](../CLAUDE.md) |

---

## External Service URLs & Docs

| Service / Lib | Why we use it | Docs |
|---------------|---------------|------|
| Vite | Build tool | https://vite.dev |
| React 19 | UI runtime | https://react.dev |
| react-router-dom v7 | Routing | https://reactrouter.com |
| react-markdown | Markdown rendering | https://github.com/remarkjs/react-markdown |
| remark-gfm | GFM Markdown plugin | https://github.com/remarkjs/remark-gfm |
| Tailwind CSS v4 | Styling | https://tailwindcss.com |
| Express 5 | Backend framework | https://expressjs.com |
| axios | HTTP client (Stage 2) | https://axios-http.com |
