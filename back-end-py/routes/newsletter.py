from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime, timezone
from database import get_collection

router = APIRouter()


class SubscribeBody(BaseModel):
    email: EmailStr


@router.post("/newsletter", status_code=201)
async def subscribe(body: SubscribeBody):
    col = get_collection("newslettersubscribers")
    existing = await col.find_one({"email": body.email})

    if existing:
        if existing.get("status") == "active":
            raise HTTPException(status_code=400, detail="Already subscribed.")
        # Re-subscribe if previously unsubscribed
        await col.update_one(
            {"email": body.email},
            {"$set": {"status": "active", "subscribedAt": datetime.now(timezone.utc)}}
        )
        return {"ok": True, "message": "Welcome back — you're re-subscribed."}

    await col.insert_one({
        "email": body.email,
        "status": "active",
        "subscribedAt": datetime.now(timezone.utc),
        "unsubscribedAt": None,
    })
    return {"ok": True, "message": "Subscribed successfully."}
