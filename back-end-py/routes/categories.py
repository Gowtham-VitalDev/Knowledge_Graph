from fastapi import APIRouter
from database import get_collection

router = APIRouter()


# ── GET /api/categories ───────────────────────────────────────────────────────

@router.get("/categories")
async def list_categories():
    col  = get_collection("categories")
    docs = await col.find().sort("articleCount", -1).to_list(length=100)

    # Convert ObjectId to string for each document
    for doc in docs:
        doc["_id"] = str(doc["_id"])

    return {"data": docs}
