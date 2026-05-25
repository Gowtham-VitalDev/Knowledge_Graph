from fastapi import APIRouter
from database import get_collection

router = APIRouter()


# ── GET /api/trending ─────────────────────────────────────────────────────────
# Finds the latest week's trending rankings, populates article → author + category.
# Returns: { data: [...] }

@router.get("/trending")
async def list_trending():
    col = get_collection("trendingrankings")

    # Step 1: find the most recent weekStartDate
    latest = await col.find_one(sort=[("weekStartDate", -1)])
    if not latest:
        return {"data": []}

    week_start = latest["weekStartDate"]

    # Step 2: aggregate all rankings for that week, populate article
    pipeline = [
        {"$match": {"weekStartDate": week_start}},
        {"$sort": {"rank": 1}},

        # Populate articleId → article document
        {"$lookup": {
            "from": "articles",
            "localField": "articleId",
            "foreignField": "_id",
            "as": "articleId"
        }},
        {"$unwind": {"path": "$articleId", "preserveNullAndEmptyArrays": True}},

        # Populate article.authorId → user document
        {"$lookup": {
            "from": "users",
            "localField": "articleId.authorId",
            "foreignField": "_id",
            "as": "articleId.authorId"
        }},
        {"$unwind": {"path": "$articleId.authorId", "preserveNullAndEmptyArrays": True}},

        # Populate article.categoryId → category document
        {"$lookup": {
            "from": "categories",
            "localField": "articleId.categoryId",
            "foreignField": "_id",
            "as": "articleId.categoryId"
        }},
        {"$unwind": {"path": "$articleId.categoryId", "preserveNullAndEmptyArrays": True}},

        # Convert all ObjectIds to strings
        {"$addFields": {
            "_id":                          {"$toString": "$_id"},
            "articleId._id":                {"$toString": "$articleId._id"},
            "articleId.authorId._id":       {"$toString": "$articleId.authorId._id"},
            "articleId.categoryId._id":     {"$toString": "$articleId.categoryId._id"},
        }},
    ]

    results = await col.aggregate(pipeline).to_list(length=10)
    return {"data": results}
