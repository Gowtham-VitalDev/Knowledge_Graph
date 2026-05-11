# task-20260506-004: Define Article TS Interface + Static Seed Data
- **Date:** 2026-05-06
- **Status:** done
- **Stage:** Stage 1 — Core Experience (MVP)
- **Requirements:** V1-REQ-009

## Goal
Define a typed Article interface and populate static seed modules for articles, categories, topics, and trending items — replacing the hardcoded Markdown constant in BlogView.

## Plan
1. Define `Article`, `Author`, `Category`, `TrendingItem`, `Topic` types in `types/article.ts`
2. Create `data/articles.ts` with 7 seed articles (one isHero, one matching design screenshot)
3. Create `data/categories.ts`, `data/topics.ts`, `data/trending.ts`
4. Create `utils/formatDate.ts` helper
5. Create `styles/tokens.css` + `styles/globals.css`

## Log
- `CategoryId` union type: `"research" | "ai-ml" | "machine-learning" | "web" | "systems" | "data" | "design" | "engineering"`
- 7 articles: `the-future-of-distributed-systems` (hero), `demystifying-large-language-models`, `the-return-to-server-side-rendering`, `building-real-time-data-pipelines-with-kafka`, `effective-code-review-culture`, `typography-in-ui-a-practical-guide`, `scaling-graph-neural-networks-for-fraud-detection` (default Blog article, matches screenshot)
- Helpers: `getArticleBySlug()`, `getHeroArticle()`, `getFeedArticles()` (excludes isHero + research)
- Images: `https://picsum.photos/seed/{seed}/{w}/{h}`, avatars: `https://i.pravatar.cc/64?u={seed}`
- `tokens.css`: full token set from approved Visily design — colors, spacing (4px grid), typography, radii, layout vars
- `globals.css`: box-sizing reset, body font/bg, img display:block
- `index.css`: changed `@tailwind` directives → `@import "tailwindcss"` (Tailwind v4 syntax; resolves lightningcss warnings)
- `index.html`: added Google Fonts preconnect + Inter/JetBrains Mono/Lora; title → "KnowledgeGraph"
- Deleted Vite template boilerplate: `App.css`, `assets/react.svg`, `vite.svg`, `hero.png`, `public/icons.svg`

## Files Changed
- `front-end/src/types/article.ts` — created
- `front-end/src/data/articles.ts` — created (7 seed articles)
- `front-end/src/data/categories.ts` — created
- `front-end/src/data/topics.ts` — created (16 topics)
- `front-end/src/data/trending.ts` — created (4 trending items)
- `front-end/src/utils/formatDate.ts` — created
- `front-end/src/styles/tokens.css` — created
- `front-end/src/styles/globals.css` — created
- `front-end/src/index.css` — updated (Tailwind v4 import)
- `front-end/index.html` — updated (fonts, title)
- `front-end/src/components/CategoryBadge/CategoryBadge.tsx` + `.css` — created

## Outcome
Done. Typed data layer in place. BlogView + FeedView both consume seed data. LIM-002 resolved. V1-REQ-009 satisfied.
