# task-20260525-006: Bugfix — ObjectId serialization crash + stale Express backend on port 5000
- **Date:** 2026-05-25
- **Status:** done
- **Stage:** Stage 4 — V3-Backend-Python
- **Requirements:** V4-REQ-002, V4-REQ-004

## Goal
Fix two bugs discovered during end-to-end testing: (1) FastAPI crashing with `TypeError: 'ObjectId' object is not iterable` on all routes that run MongoDB aggregation pipelines, and (2) POST /api/admin/articles returning 404 because the old Express backend was still alive on port 5000.

## Bugs Fixed

### BUG-001 — ObjectId serialization crash (all aggregation routes)
**Symptom:** GET /api/trending (and all routes using $lookup pipelines) returned 500. CORS error appeared in the browser because a 500 crash bypasses FastAPI's CORS middleware, so the error response has no `Access-Control-Allow-Origin` header.

**Root cause:** Motor returns raw `bson.ObjectId` objects from MongoDB. FastAPI's JSON serialiser (`jsonable_encoder`) cannot handle ObjectId. The original fix attempt used `$addFields` with dot-notation keys like `"categoryId._id": {"$toString": ...}` — but MongoDB dot-notation in `$addFields` creates a **new top-level field** with that literal key name; it does NOT update the nested field. So the ObjectId inside `categoryId` was never converted.

**Fix:** Replaced all MongoDB-side `$toString` attempts with a Python `sanitize()` function that recursively walks the entire result dict/list and converts every `ObjectId` to `str()` before returning the response. Applied to `routes/articles.py`, `routes/trending.py`, and `routes/admin/articles.py`.

### BUG-002 — Old Express backend intercepting requests on localhost:5000
**Symptom:** POST /api/admin/articles returned HTML `Cannot POST /api/admin/articles` (Express 404 response), not a FastAPI response.

**Root cause:** The old Node/Express `npm run dev` process was still running in a background terminal, bound to `0.0.0.0:5000` (all interfaces including `localhost`). The Python uvicorn process was bound to `127.0.0.1:5000` only. The frontend hits `localhost:5000` which Windows resolves to `::1` (IPv6), hitting Express — not FastAPI.

**Fix:** Killed the Express process (PID 6108) via `Stop-Process`. Going forward: always verify only one backend is running with `netstat -ano | grep :5000`.

### BUG-003 — categoryId required in CreateArticleBody
**Symptom:** Creating an article without selecting a category caused a Pydantic 422 validation error.

**Root cause:** `categoryId: str` had no default in the Pydantic model — required field with no UI picker.

**Fix:** Changed to `categoryId: Optional[str] = None`. Added null-guard in the insert handler. Added a category dropdown to `ArticleEditor.tsx` populated from `/api/categories`.

### BUG-004 — Admin API response shape mismatch
**Symptom:** Dashboard showed "0 total" and empty table even when network tab showed data.

**Root cause:** Backend returns `{ articles: [], total, page, limit }` but `listAdminArticles()` was calling `.then(r => r.data)` — treating the whole envelope as the array.

**Fix:** Updated all admin API helpers in `front-end/src/api/admin.ts` to unwrap correctly: `.then(r => r.data.articles)`, `.then(r => r.data.article)`.

## Plan
1. Add `sanitize()` recursive ObjectId converter to articles.py, trending.py, admin/articles.py
2. Make `categoryId` Optional in CreateArticleBody + null-guard insert
3. Fix admin API helper response unwrapping
4. Add category dropdown to ArticleEditor
5. Kill stale Express process; document diagnosis pattern

## Files Changed
- `back-end-py/routes/articles.py` — rewritten — added sanitize(), removed broken $addFields pipeline stages
- `back-end-py/routes/trending.py` — rewritten — added sanitize(), simplified pipeline (no MongoDB-side stringify)
- `back-end-py/routes/admin/articles.py` — modified — added sanitize(), categoryId Optional, sanitize() on all returns
- `front-end/src/api/admin.ts` — modified — fixed response unwrapping for all helpers, added listCategories()
- `front-end/src/views/Admin/ArticleEditor.tsx` — modified — added category dropdown, listCategories fetch on mount

## Outcome
done — All routes return correct JSON. Admin dashboard shows articles. Article creation works without category. Trending sidebar loads. CORS errors resolved (they were a symptom of the 500 crash, not a CORS config issue).
