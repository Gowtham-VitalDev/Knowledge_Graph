from fastapi import APIRouter, HTTPException, Query
from database import get_collection
from bson import ObjectId

router = APIRouter()


def sanitize(obj):
    """Recursively convert ObjectId and other non-serialisable types to strings."""
    if isinstance(obj, dict):
        return {k: sanitize(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [sanitize(i) for i in obj]
    if isinstance(obj, ObjectId):
        return str(obj)
    return obj


LOOKUP_CATEGORY = [
    {"$lookup": {"from": "categories", "localField": "categoryId", "foreignField": "_id", "as": "categoryId"}},
    {"$unwind": {"path": "$categoryId", "preserveNullAndEmptyArrays": True}},
]

LOOKUP_AUTHOR = [
    {"$lookup": {"from": "users", "localField": "authorId", "foreignField": "_id", "as": "authorId"}},
    {"$unwind": {"path": "$authorId", "preserveNullAndEmptyArrays": True}},
]

LOOKUP_TAGS = [
    {"$lookup": {"from": "tags", "localField": "tagIds", "foreignField": "_id", "as": "tagIds"}},
]


@router.get("/articles")
async def list_articles(
    category: str = Query(None),
    q:        str = Query(None),
    page:     int = Query(1, ge=1),
    limit:    int = Query(10, ge=1, le=50),
):
    col = get_collection("articles")
    skip = (page - 1) * limit
    match: dict = {"status": "published"}

    if category:
        cat = await get_collection("categories").find_one({"slug": category})
        if cat:
            match["categoryId"] = cat["_id"]

    if q and q.strip():
        match["$or"] = [
            {"title":   {"$regex": q.strip(), "$options": "i"}},
            {"excerpt": {"$regex": q.strip(), "$options": "i"}},
        ]

    pipeline = [
        {"$match": match},
        {"$sort": {"publishedAt": -1}},
        *LOOKUP_CATEGORY,
        *LOOKUP_AUTHOR,
        *LOOKUP_TAGS,
        {"$skip": skip},
        {"$limit": limit},
    ]

    articles = await col.aggregate(pipeline).to_list(length=limit)
    total    = await col.count_documents(match)

    return {
        "data": sanitize(articles),
        "meta": {
            "total":      total,
            "page":       page,
            "limit":      limit,
            "totalPages": -(-total // limit),
        },
    }


@router.get("/articles/{slug}")
async def get_article(slug: str):
    col = get_collection("articles")

    pipeline = [
        {"$match": {"slug": slug, "status": "published"}},
        *LOOKUP_CATEGORY,
        *LOOKUP_AUTHOR,
        *LOOKUP_TAGS,
        {"$limit": 1},
    ]

    results = await col.aggregate(pipeline).to_list(length=1)

    if not results:
        raise HTTPException(status_code=404, detail="Article not found")

    col.update_one({"slug": slug}, {"$inc": {"views": 1}})

    return {"data": sanitize(results[0])}
