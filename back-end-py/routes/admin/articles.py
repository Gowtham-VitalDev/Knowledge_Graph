from fastapi import APIRouter, HTTPException, Depends, Query
from pydantic import BaseModel
from typing import Optional
from bson import ObjectId
from datetime import datetime, timezone
from database import get_collection
from middleware.auth import require_admin


def sanitize(obj):
    if isinstance(obj, dict):
        return {k: sanitize(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [sanitize(i) for i in obj]
    if isinstance(obj, ObjectId):
        return str(obj)
    return obj

# ── ROUTER ────────────────────────────────────────────────────────────────────
# dependencies=[Depends(require_admin)] protects every route in this router.
# No need to add Depends() to each individual route handler.

router = APIRouter(dependencies=[Depends(require_admin)])


# ── PIPELINE HELPERS ──────────────────────────────────────────────────────────
# Same populate logic as the public articles route — reused here for admin.

LOOKUP_STAGES = [
    {"$lookup": {"from": "categories", "localField": "categoryId", "foreignField": "_id", "as": "categoryId"}},
    {"$unwind": {"path": "$categoryId", "preserveNullAndEmptyArrays": True}},
    {"$lookup": {"from": "users",       "localField": "authorId",   "foreignField": "_id", "as": "authorId"}},
    {"$unwind": {"path": "$authorId",   "preserveNullAndEmptyArrays": True}},
    {"$lookup": {"from": "tags",        "localField": "tagIds",     "foreignField": "_id", "as": "tagIds"}},
    {"$addFields": {
        "_id": {"$toString": "$_id"},
        "categoryId": {
            "$mergeObjects": [
                "$categoryId",
                {"_id": {"$cond": [{"$ifNull": ["$categoryId._id", False]}, {"$toString": "$categoryId._id"}, None]}}
            ]
        },
        "authorId": {
            "$mergeObjects": [
                "$authorId",
                {"_id": {"$cond": [{"$ifNull": ["$authorId._id", False]}, {"$toString": "$authorId._id"}, None]}}
            ]
        },
        "tagIds": {
            "$map": {
                "input": {"$ifNull": ["$tagIds", []]},
                "as":    "t",
                "in":    {"$mergeObjects": ["$$t", {"_id": {"$toString": "$$t._id"}}]}
            }
        }
    }},
]


# ── REQUEST BODY MODELS ───────────────────────────────────────────────────────

class CreateArticleBody(BaseModel):
    title:          str
    slug:           str
    excerpt:        str            = ""
    content:        str            = ""
    coverImage:     str            = ""
    categoryId:     Optional[str]  = None
    tagIds:         list[str]      = []
    status:         str            = "draft"
    featured:       bool           = False
    readTime:       int            = 0
    seoTitle:       str            = ""
    seoDescription: str            = ""


class UpdateArticleBody(BaseModel):
    title:          Optional[str]       = None
    slug:           Optional[str]       = None
    excerpt:        Optional[str]       = None
    content:        Optional[str]       = None
    coverImage:     Optional[str]       = None
    categoryId:     Optional[str]       = None
    tagIds:         Optional[list[str]] = None
    status:         Optional[str]       = None
    featured:       Optional[bool]      = None
    readTime:       Optional[int]       = None
    seoTitle:       Optional[str]       = None
    seoDescription: Optional[str]       = None


# ── HELPERS ───────────────────────────────────────────────────────────────────

def to_object_ids(ids: list[str]) -> list[ObjectId]:
    """Convert a list of string IDs to ObjectIds, skipping invalid ones."""
    result = []
    for id in ids:
        try:
            result.append(ObjectId(id))
        except Exception:
            pass
    return result


async def fetch_article_by_id(article_id: str) -> dict:
    col = get_collection("articles")
    pipeline = [
        {"$match": {"_id": ObjectId(article_id)}},
        *LOOKUP_STAGES,
        {"$limit": 1},
    ]
    results = await col.aggregate(pipeline).to_list(length=1)
    if not results:
        raise HTTPException(status_code=404, detail="Article not found")
    return sanitize(results[0])


# ── GET /api/admin/articles ───────────────────────────────────────────────────
# Lists ALL articles regardless of status (drafts + published + archived).
# Public route only shows published — admin sees everything.

@router.get("/admin/articles")
async def list_articles(
    status:   str = Query(None),
    category: str = Query(None),
    page:     int = Query(1, ge=1),
    limit:    int = Query(50, ge=1, le=100),
):
    col   = get_collection("articles")
    skip  = (page - 1) * limit
    match: dict = {}

    if status:
        match["status"] = status
    if category:
        try:
            match["categoryId"] = ObjectId(category)
        except Exception:
            pass

    pipeline = [
        {"$match": match},
        {"$sort": {"createdAt": -1}},
        *LOOKUP_STAGES,
        {"$skip": skip},
        {"$limit": limit},
    ]

    articles = await col.aggregate(pipeline).to_list(length=limit)
    total    = await col.count_documents(match)

    return {"articles": sanitize(articles), "total": total, "page": page, "limit": limit}


# ── GET /api/admin/articles/{id} ──────────────────────────────────────────────
# Fetch a single article by MongoDB _id (for the editor page).

@router.get("/admin/articles/{article_id}")
async def get_article(article_id: str):
    article = await fetch_article_by_id(article_id)
    return {"article": article}


# ── POST /api/admin/articles ──────────────────────────────────────────────────
# Create a new article. authorId comes from the JWT — not from the request body.

@router.post("/admin/articles", status_code=201)
async def create_article(body: CreateArticleBody, user: dict = Depends(require_admin)):
    col = get_collection("articles")

    # Check slug is unique
    existing = await col.find_one({"slug": body.slug})
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")

    now = datetime.now(timezone.utc)
    doc = {
        "title":          body.title,
        "slug":           body.slug,
        "excerpt":        body.excerpt,
        "content":        body.content,
        "coverImage":     body.coverImage,
        "categoryId":     ObjectId(body.categoryId) if body.categoryId else None,
        "tagIds":         to_object_ids(body.tagIds),
        "authorId":       ObjectId(user["userId"]),
        "status":         body.status,
        "featured":       body.featured,
        "readTime":       body.readTime,
        "seoTitle":       body.seoTitle,
        "seoDescription": body.seoDescription,
        "trendingScore":  0,
        "views":          0,
        "likes":          0,
        "shares":         0,
        "bookmarks":      0,
        "publishedAt":    now if body.status == "published" else None,
        "createdAt":      now,
        "updatedAt":      now,
    }

    result  = await col.insert_one(doc)

    # Bump category article count if published
    if body.status == "published" and body.categoryId:
        await get_collection("categories").update_one(
            {"_id": ObjectId(body.categoryId)},
            {"$inc": {"articleCount": 1}}
        )

    article = await fetch_article_by_id(str(result.inserted_id))
    return {"article": article}


# ── PUT /api/admin/articles/{id} ──────────────────────────────────────────────
# Full update — only sends fields that changed (all optional in UpdateArticleBody).

@router.put("/admin/articles/{article_id}")
async def update_article(article_id: str, body: UpdateArticleBody):
    col = get_collection("articles")

    # Fetch current document to detect status transitions
    current = await col.find_one({"_id": ObjectId(article_id)})
    if not current:
        raise HTTPException(status_code=404, detail="Article not found")

    was_published = current["status"] == "published"

    # Build update dict — only include fields that were actually sent
    updates: dict = {"updatedAt": datetime.now(timezone.utc)}

    if body.title          is not None: updates["title"]          = body.title
    if body.slug           is not None: updates["slug"]           = body.slug
    if body.excerpt        is not None: updates["excerpt"]        = body.excerpt
    if body.content        is not None: updates["content"]        = body.content
    if body.coverImage     is not None: updates["coverImage"]     = body.coverImage
    if body.featured       is not None: updates["featured"]       = body.featured
    if body.readTime       is not None: updates["readTime"]       = body.readTime
    if body.seoTitle       is not None: updates["seoTitle"]       = body.seoTitle
    if body.seoDescription is not None: updates["seoDescription"] = body.seoDescription

    if body.categoryId is not None:
        updates["categoryId"] = ObjectId(body.categoryId)
    if body.tagIds is not None:
        updates["tagIds"] = to_object_ids(body.tagIds)

    # Handle status transition
    if body.status is not None and body.status != current["status"]:
        updates["status"] = body.status
        now = datetime.now(timezone.utc)

        if body.status == "published" and not was_published:
            updates["publishedAt"] = now
            await get_collection("categories").update_one(
                {"_id": current["categoryId"]}, {"$inc": {"articleCount": 1}}
            )
        elif body.status != "published" and was_published:
            await get_collection("categories").update_one(
                {"_id": current["categoryId"]}, {"$inc": {"articleCount": -1}}
            )

    await col.update_one({"_id": ObjectId(article_id)}, {"$set": updates})

    article = await fetch_article_by_id(article_id)
    return {"article": article}


# ── PATCH /api/admin/articles/{id}/publish ────────────────────────────────────
# Toggle draft ↔ published in one click. Used by the dashboard publish button.

@router.patch("/admin/articles/{article_id}/publish")
async def toggle_publish(article_id: str):
    col     = get_collection("articles")
    current = await col.find_one({"_id": ObjectId(article_id)})
    if not current:
        raise HTTPException(status_code=404, detail="Article not found")

    was_published = current["status"] == "published"
    new_status    = "draft" if was_published else "published"
    updates       = {
        "status":    new_status,
        "updatedAt": datetime.now(timezone.utc),
    }
    if not was_published:
        updates["publishedAt"] = datetime.now(timezone.utc)

    await col.update_one({"_id": ObjectId(article_id)}, {"$set": updates})

    delta = -1 if was_published else 1
    await get_collection("categories").update_one(
        {"_id": current["categoryId"]}, {"$inc": {"articleCount": delta}}
    )

    article = await fetch_article_by_id(article_id)
    return {"article": article}


# ── DELETE /api/admin/articles/{id} ──────────────────────────────────────────

@router.delete("/admin/articles/{article_id}")
async def delete_article(article_id: str):
    col     = get_collection("articles")
    current = await col.find_one({"_id": ObjectId(article_id)})
    if not current:
        raise HTTPException(status_code=404, detail="Article not found")

    await col.delete_one({"_id": ObjectId(article_id)})

    if current["status"] == "published":
        await get_collection("categories").update_one(
            {"_id": current["categoryId"]}, {"$inc": {"articleCount": -1}}
        )

    return {"ok": True}
