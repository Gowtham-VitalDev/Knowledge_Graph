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
├── back-end/                   # DEPRECATED — Node/Express (kept for reference)
│
└── back-end-py/                # ACTIVE — Python 3.11 + FastAPI + Motor
    ├── venv/                   # virtual environment (never commit)
    ├── .env                    # MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
    ├── .gitignore
    ├── requirements.txt        # pip dependencies
    ├── main.py                 # FastAPI app — lifespan, CORS, router mounts
    ├── database.py             # Motor client, connect_db(), get_collection()
    ├── middleware/
    │   └── auth.py             # get_current_user(), require_admin() as Depends()
    ├── models/
    │   └── article.py          # Pydantic response models
    ├── routes/
    │   ├── articles.py         # GET /api/articles, GET /api/articles/{slug}
    │   ├── categories.py       # GET /api/categories
    │   ├── tags.py             # GET /api/tags
    │   ├── trending.py         # GET /api/trending
    │   ├── auth.py             # POST /api/auth/login, logout, GET /api/auth/me
    │   └── admin/
    │       ├── articles.py     # All /api/admin/articles routes (protected)
    │       └── upload.py       # Image upload routes — single, bulk, delete, list
    ├── gcs.py                  # GCS helper — upload_file, upload_files, delete_file, list_files
    ├── Dockerfile              # Two-stage build for Cloud Run
    ├── .dockerignore           # Excludes venv/, __pycache__/, .env from image
    └── scripts/
        └── seed.py             # Python seed script
```

---

## Common Commands

```bash
# === Frontend (run from /front-end) ===
npm install                  # install deps (first time)
npm run dev                  # Vite dev server (default http://localhost:5173)
```

```powershell
# === Python Backend (run from /back-end-py) ===
python -m venv venv                        # create virtual environment (first time)
venv\Scripts\Activate.ps1                  # activate venv (Windows PowerShell)
pip install -r requirements.txt            # install deps (first time or after changes)
uvicorn main:app --reload --port 5000      # dev server with hot reload
# API docs auto-generated at: http://127.0.0.1:5000/docs
# Admin credentials: ADMIN_EMAIL / ADMIN_PASSWORD from .env
```

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
# Backend: GCP Cloud Run — https://kg-backend-107068948109.us-central1.run.app
# GCP Project: bright-aileron-497503-d7
# Artifact Registry: us-central1-docker.pkg.dev/bright-aileron-497503-d7/kg-backend/api:v1
# GCS Bucket: gs://kg-article-images-gg (us-central1, public read)
# MongoDB: Atlas M0 free cluster (knowledgegraph DB)

# Redeploy backend after changes:
# 1. docker build -t us-central1-docker.pkg.dev/bright-aileron-497503-d7/kg-backend/api:v2 .
# 2. docker push us-central1-docker.pkg.dev/bright-aileron-497503-d7/kg-backend/api:v2
# 3. gcloud run deploy kg-backend --image us-central1-docker.pkg.dev/bright-aileron-497503-d7/kg-backend/api:v2 --region us-central1
```

---

## Environment Variables

| Variable | Where | Purpose | Example | Required? |
|----------|-------|---------|---------|-----------|
| `MONGO_URI` | `back-end-py/.env` | MongoDB connection string | `mongodb://127.0.0.1:27017/knowledgegraph` | Yes |
| `DB_NAME` | `back-end-py/.env` | MongoDB database name | `knowledgegraph` | Yes |
| `JWT_SECRET` | `back-end-py/.env` | JWT signing secret | `change_me_before_use` | Yes |
| `JWT_EXPIRES_DAYS` | `back-end-py/.env` | JWT cookie expiry in days | `7` | No (default 7) |
| `CLIENT_ORIGIN` | `back-end-py/.env` | CORS allowed origin | `http://localhost:5173` | No |
| `ADMIN_EMAIL` | `back-end-py/.env` | Admin login email | `admin@knowledgegraph.io` | Yes |
| `ADMIN_PASSWORD` | `back-end-py/.env` | Admin login password | `Admin@1234` | Yes |
| `VITE_API_URL` | `front-end/.env` | Backend base URL for axios | `http://127.0.0.1:5000` | No (defaults to http://localhost:5000) |
| `GOOGLE_CLIENT_ID` | `back-end-py/.env` + `front-end/.env` | Google OAuth client ID | `your-google-client-id.apps.googleusercontent.com` | Yes (for Google login) |
| `GCS_BUCKET_NAME` | `back-end-py/.env` | GCS bucket for image uploads | `kg-article-images-gg` | Yes (for image upload) |
| `GCS_KEY_PATH` | `back-end-py/.env` | Path to GCS service account JSON (local dev only) | `/path/to/key.json` | No (empty on Cloud Run — uses Workload Identity) |

> Keep `.env` files out of git. IMPORTANT: use `127.0.0.1` not `localhost` in MONGO_URI on Windows.

---

## Key API Endpoints (Quick Lookup)

### Implemented (Stage 4 + 5)
| Endpoint | What it does |
|----------|-------------|
| `GET /health` | Health check — returns `{"status":"ok"}` |
| `GET /api/articles` | List articles (query: category, tag, q, limit, page) |
| `GET /api/articles/{slug}` | Get one article with full Markdown body |
| `GET /api/trending` | Sidebar trending list (latest week) |
| `GET /api/tags` | All tags sorted by usageCount |
| `GET /api/categories` | All categories sorted by articleCount |
| `POST /api/auth/login` | Login — issues JWT httpOnly cookie |
| `POST /api/auth/logout` | Clear JWT cookie |
| `GET /api/auth/me` | Current user from JWT |
| `POST /api/google-auth/login` | Google OAuth ID token verification |
| `GET /api/user/bookmarks` | Get user's bookmarked article IDs |
| `POST /api/user/bookmarks` | Add bookmark |
| `DELETE /api/user/bookmarks/{id}` | Remove bookmark |
| `POST /api/admin/upload` | Upload single image to GCS |
| `POST /api/admin/upload/bulk` | Upload up to 20 images to GCS in parallel |
| `DELETE /api/admin/upload` | Delete image from GCS |
| `GET /api/admin/images` | List images in GCS bucket |
| `GET /api/admin/articles` | List all articles (admin, all statuses) |
| `POST /api/admin/articles` | Create article |
| `PUT /api/admin/articles/{id}` | Update article |
| `PATCH /api/admin/articles/{id}/publish` | Toggle draft ↔ published |
| `DELETE /api/admin/articles/{id}` | Delete article |

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
