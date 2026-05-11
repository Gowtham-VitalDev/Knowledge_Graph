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
│       └── views/
│           └── Blog/
│               ├── BlogView.tsx
│               └── BlogView.css
│
└── back-end/                   # Express 5 + TS skeleton
    ├── package.json
    ├── tsconfig.json
    └── src/
        └── index.ts            # Currently a stub (empty/single line)
```

> **Planned additions for Stage 1** (not yet present): `front-end/src/views/Feed/`, `front-end/src/components/`, `front-end/src/data/articles.ts`, `front-end/src/types/`, `front-end/src/router.tsx`.

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
npm run dev                  # nodemon + ts-node, watches src/index.ts
npm run build                # tsc → /dist
npm start                    # node dist/index.js (after build)

# === Tests ===
# No test runner configured yet. Add Vitest (frontend) / Jest (backend) in Stage 3.

# === Deploy ===
# No deployment configured yet. Hosting decision pending Stage 4.
```

---

## Environment Variables

| Variable | Where | Purpose | Example | Required? |
|----------|-------|---------|---------|-----------|
| `PORT` | `back-end/.env` | Express listen port | `3000` | No (default TBD) |
| _(none required for MVP)_ | | The frontend has no env vars in MVP. | | |

> Stage 2+ will add: `DATABASE_URL`, `JWT_SECRET`, `VITE_API_BASE_URL`, etc. Keep `.env` out of git; create `.env.example` files when env vars are introduced.

---

## Key API Endpoints (Quick Lookup)

### MVP
_None — backend not consumed in MVP._

### Planned (Stage 2)
| Endpoint | What it does |
|----------|-------------|
| `GET /api/articles` | List articles (filters: category, tag) |
| `GET /api/articles/:slug` | Get one article with full Markdown body |
| `GET /api/trending` | Sidebar trending list |
| `GET /api/topics` | Topic cloud entries |
| `POST /api/newsletter` | Subscribe email |

Full details + schemas in [architecture.md](architecture.md).

---

## Key Collections / Tables

### MVP
_None — no database._ All data lives in static frontend modules (planned: `front-end/src/data/articles.ts`).

### Planned (Stage 2)
| Name | Purpose | Primary Key |
|------|---------|-------------|
| `articles` | Article content + metadata | `slug` |
| `topics` | Tag cloud taxonomy | `slug` |
| `users` | Account info (when auth lands) | `userId` |
| `bookmarks` | User-saved articles | `(userId, articleSlug)` |
| `newsletter_subscribers` | Email capture | `email` |

Full schemas in [architecture.md](architecture.md).

---

## Key File Locations

| What | Where |
|------|-------|
| Router root | [front-end/src/App.tsx](../front-end/src/App.tsx) (TBD: route table here) |
| Entry point | [front-end/src/main.tsx](../front-end/src/main.tsx) |
| Tailwind directives | [front-end/src/index.css](../front-end/src/index.css) |
| Tailwind config | [front-end/tailwind.config.js](../front-end/tailwind.config.js) |
| Vite config | [front-end/vite.config.ts](../front-end/vite.config.ts) |
| ESLint config | [front-end/eslint.config.js](../front-end/eslint.config.js) |
| Blog view | [front-end/src/views/Blog/BlogView.tsx](../front-end/src/views/Blog/BlogView.tsx) |
| Blog view styles | [front-end/src/views/Blog/BlogView.css](../front-end/src/views/Blog/BlogView.css) |
| Static images | [front-end/src/assets/](../front-end/src/assets/) |
| Public assets | [front-end/public/](../front-end/public/) |
| Backend entry | [back-end/src/index.ts](../back-end/src/index.ts) |
| Backend tsconfig | [back-end/tsconfig.json](../back-end/tsconfig.json) |
| Project design brief | [claude.md](../claude.md) |

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
