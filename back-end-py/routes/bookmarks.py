from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from database import get_collection
from middleware.auth import get_current_user

router = APIRouter()


def sanitize(obj):
    if isinstance(obj, dict):
        return {k: sanitize(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [sanitize(i) for i in obj]
    if isinstance(obj, ObjectId):
        return str(obj)
    return obj


# ── GET /api/user/bookmarks ───────────────────────────────────────────────────

@router.get("/user/bookmarks")
async def get_bookmarks(user: dict = Depends(get_current_user)):
    users_col    = get_collection("users")
    articles_col = get_collection("articles")

    doc = await users_col.find_one({"_id": ObjectId(user["userId"])})
    if not doc:
        raise HTTPException(status_code=404, detail="User not found")

    ids = [ObjectId(i) for i in doc.get("bookmarkedArticleIds", [])]
    if not ids:
        return {"bookmarks": []}

    cursor   = articles_col.find({"_id": {"$in": ids}})
    articles = await cursor.to_list(length=100)
    return {"bookmarks": sanitize(articles)}


# ── POST /api/user/bookmarks/:articleId ───────────────────────────────────────

@router.post("/user/bookmarks/{article_id}")
async def add_bookmark(article_id: str, user: dict = Depends(get_current_user)):
    col = get_collection("users")

    try:
        oid = ObjectId(article_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid article ID")

    await col.update_one(
        {"_id": ObjectId(user["userId"])},
        {"$addToSet": {"bookmarkedArticleIds": article_id}},
    )
    return {"ok": True}


# ── DELETE /api/user/bookmarks/:articleId ─────────────────────────────────────

@router.delete("/user/bookmarks/{article_id}")
async def remove_bookmark(article_id: str, user: dict = Depends(get_current_user)):
    col = get_collection("users")
    await col.update_one(
        {"_id": ObjectId(user["userId"])},
        {"$pull": {"bookmarkedArticleIds": article_id}},
    )
    return {"ok": True}
