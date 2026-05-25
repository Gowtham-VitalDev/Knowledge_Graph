# task-20260525-002: FastAPI Public Routes
- **Date:** 2026-05-25
- **Status:** done
- **Stage:** Stage 4 — V3-Backend-Python
- **Requirements:** V4-REQ-002

## Goal
Implement all public-facing read API routes matching the contract already consumed by the frontend. Must produce the same JSON shape as the old Node/Express routes so no frontend adapter changes are needed.

## Plan
1. Define shared MongoDB aggregation pipeline stages (LOOKUP_CATEGORY, LOOKUP_AUTHOR, LOOKUP_TAGS, STRINGIFY_IDS)
2. Implement `routes/articles.py` — GET /api/articles (paginated + category filter) + GET /api/articles/{slug}
3. Implement `routes/categories.py` — GET /api/categories
4. Implement `routes/tags.py` — GET /api/tags
5. Implement `routes/trending.py` — GET /api/trending (two-level nested $lookup)
6. Mount all routers in main.py with prefix="/api"

## Log
- Aggregation pipeline ($lookup, $unwind, $addFields, $toString) replaces Mongoose `.populate()`
- ObjectId serialisation: `$addFields + $toString` converts `_id` to string since Motor returns raw ObjectIds
- Trending requires two-level nested lookup: trendingrankings → articles → (users + categories)
- Category filter in GET /api/articles: resolve slug → ObjectId first, then match in pipeline
- View increment on article fetch: fire-and-forget `col.update_one()` not awaited (non-blocking)
- Pydantic response models defined in `models/article.py`

## Files Changed
- `back-end-py/models/article.py` — created — Pydantic response models (ArticleResponse, CategoryResponse, etc.)
- `back-end-py/routes/articles.py` — created — GET /api/articles, GET /api/articles/{slug}
- `back-end-py/routes/categories.py` — created — GET /api/categories
- `back-end-py/routes/tags.py` — created — GET /api/tags
- `back-end-py/routes/trending.py` — created — GET /api/trending with nested $lookup pipeline
- `back-end-py/main.py` — modified — mount all four public routers

## Outcome
done — All public routes return correct JSON; frontend feed and blog views load data successfully.
