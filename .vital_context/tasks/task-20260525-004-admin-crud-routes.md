# task-20260525-004: FastAPI Admin CRUD Routes
- **Date:** 2026-05-25
- **Status:** done
- **Stage:** Stage 4 — V3-Backend-Python
- **Requirements:** V4-REQ-004

## Goal
Implement all admin article management routes (list, get, create, update, publish toggle, delete) protected at router level so every route requires admin JWT.

## Plan
1. Create `routes/admin/articles.py` with `APIRouter(dependencies=[Depends(require_admin)])`
2. Implement GET /api/admin/articles — all statuses, full populate pipeline
3. Implement GET /api/admin/articles/{id} — single article for editor
4. Implement POST /api/admin/articles — create with Pydantic body validation
5. Implement PUT /api/admin/articles/{id} — partial update (all fields Optional)
6. Implement PATCH /api/admin/articles/{id}/publish — toggle draft ↔ published
7. Implement DELETE /api/admin/articles/{id}
8. Mount admin router in main.py

## Log
- `APIRouter(dependencies=[Depends(require_admin)])` applies admin check to every route in the router — cleaner than per-route decoration
- `UpdateArticleBody` uses all-Optional fields (partial update pattern); only non-None fields are applied via dict comprehension
- Publish toggle: draft→published sets `publishedAt` timestamp and increments `categoryId.articleCount`; published→draft decrements it
- `fetch_article_by_id()` helper reused across GET and after create/update to return fully-populated response
- Pydantic `CreateArticleBody` uses `model_validator` to set slug default from title if not provided

## Files Changed
- `back-end-py/routes/admin/__init__.py` — created — empty package marker
- `back-end-py/routes/admin/articles.py` — created — all 6 admin article routes
- `back-end-py/main.py` — modified — mount admin_articles_router with prefix="/api"

## Outcome
done — All CRUD endpoints confirmed working via FastAPI Swagger UI at /docs. Router-level Depends() blocks unauthenticated requests with 401.
