from fastapi import APIRouter, HTTPException, Query
from database import get_collection
from bson import ObjectId

router = APIRouter()

# ── PIPELINE HELPERS ──────────────────────────────────────────────────────────
# Reusable aggregation stages that "populate" related documents.
# $lookup = MongoDB's JOIN. $unwind = flatten a 1-item array into an object.
# $addFields + $convert = turn ObjectId into a string for JSON serialisation.

LOOKUP_CATEGORY = [
    {"$lookup": {
        "from": "categories",
        "localField": "categoryId",
        "foreignField": "_id",
        "as": "categoryId"
    }},
    {"$unwind": {"path": "$categoryId", "preserveNullAndEmptyArrays": True}},
]

LOOKUP_AUTHOR = [
    {"$lookup": {
        "from": "users",
        "localField": "authorId",
        "foreignField": "_id",
        "as": "authorId"
    }},
    {"$unwind": {"path": "$authorId", "preserveNullAndEmptyArrays": True}},
]

LOOKUP_TAGS = [
    {"$lookup": {
        "from": "tags",
        "localField": "tagIds",
        "foreignField": "_id",
        "as": "tagIds"
    }},
]

# Convert ObjectId fields to strings so they serialise to JSON cleanly
STRINGIFY_IDS = [
    {"$addFields": {
        "_id":               {"$toString": "$_id"},
        "categoryId._id":    {"$toString": "$categoryId._id"},
        "authorId._id":      {"$toString": "$authorId._id"},
        "tagIds": {
            "$map": {
                "input": "$tagIds",
                "as": "t",
                "in": {"$mergeObjects": ["$$t", {"_id": {"$toString": "$$t._id"}}]}
            }
        }
    }},
]


# ── GET /api/articles ─────────────────────────────────────────────────────────
# Query params: category (slug), page, limit
# Returns: { data: [...], meta: { total, page, limit, totalPages } }

@router.get("/articles")
async def list_articles(
    category: str = Query(None),   # optional filter by category slug
    page:     int = Query(1, ge=1),
    limit:    int = Query(10, ge=1, le=50),
):
    col = get_collection("articles")
    skip = (page - 1) * limit

    # Build match stage — always filter published only for public route
    match: dict = {"status": "published"}

    # If category slug provided, resolve it to an ObjectId first
    if category:
        cat = await get_collection("categories").find_one({"slug": category})
        if cat:
            match["categoryId"] = cat["_id"]

    pipeline = [
        {"$match": match},
        {"$sort": {"publishedAt": -1}},
        *LOOKUP_CATEGORY,
        *LOOKUP_AUTHOR,
        *LOOKUP_TAGS,
        *STRINGIFY_IDS,
        {"$skip": skip},
        {"$limit": limit},
    ]

    articles = await col.aggregate(pipeline).to_list(length=limit)
    total    = await col.count_documents(match)

    return {
        "data": articles,
        "meta": {
            "total":      total,
            "page":       page,
            "limit":      limit,
            "totalPages": -(-total // limit),  # ceiling division
        },
    }


# ── GET /api/articles/{slug} ──────────────────────────────────────────────────
# Returns: { data: article }

@router.get("/articles/{slug}")
async def get_article(slug: str):
    col = get_collection("articles")

    pipeline = [
        {"$match": {"slug": slug, "status": "published"}},
        *LOOKUP_CATEGORY,
        *LOOKUP_AUTHOR,
        *LOOKUP_TAGS,
        *STRINGIFY_IDS,
        {"$limit": 1},
    ]

    results = await col.aggregate(pipeline).to_list(length=1)

    if not results:
        raise HTTPException(status_code=404, detail="Article not found")

    article = results[0]

    # Increment view count — fire and forget (don't await the result)
    col.update_one({"slug": slug}, {"$inc": {"views": 1}})

    return {"data": article}
