from fastapi import APIRouter
from database import get_collection
from bson import ObjectId
import json

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


@router.get("/trending")
async def list_trending():
    col = get_collection("trendingrankings")

    latest = await col.find_one(sort=[("weekStartDate", -1)])
    if not latest:
        return {"data": []}

    week_start = latest["weekStartDate"]

    pipeline = [
        {"$match": {"weekStartDate": week_start}},
        {"$sort": {"rank": 1}},
        {"$lookup": {
            "from": "articles",
            "localField": "articleId",
            "foreignField": "_id",
            "as": "articleId"
        }},
        {"$unwind": {"path": "$articleId", "preserveNullAndEmptyArrays": True}},
        {"$lookup": {
            "from": "users",
            "localField": "articleId.authorId",
            "foreignField": "_id",
            "as": "articleId.authorId"
        }},
        {"$unwind": {"path": "$articleId.authorId", "preserveNullAndEmptyArrays": True}},
        {"$lookup": {
            "from": "categories",
            "localField": "articleId.categoryId",
            "foreignField": "_id",
            "as": "articleId.categoryId"
        }},
        {"$unwind": {"path": "$articleId.categoryId", "preserveNullAndEmptyArrays": True}},
    ]

    results = await col.aggregate(pipeline).to_list(length=10)
    return {"data": sanitize(results)}
