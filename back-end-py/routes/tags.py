from fastapi import APIRouter
from database import get_collection

router = APIRouter()


# ── GET /api/tags ─────────────────────────────────────────────────────────────

@router.get("/tags")
async def list_tags():
    col  = get_collection("tags")
    docs = await col.find().sort("usageCount", -1).to_list(length=100)

    for doc in docs:
        doc["_id"] = str(doc["_id"])

    return {"data": docs}
