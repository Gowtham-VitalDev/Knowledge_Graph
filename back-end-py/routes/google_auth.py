import os
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel
from jose import jwt
from google.oauth2 import id_token
from google.auth.transport import requests as g_requests
from database import get_collection
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

GOOGLE_CLIENT_ID  = os.getenv("GOOGLE_CLIENT_ID", "")
JWT_SECRET        = os.getenv("JWT_SECRET", "change_me")
JWT_ALGORITHM     = "HS256"
JWT_EXPIRES_DAYS  = int(os.getenv("JWT_EXPIRES_DAYS", "7"))


class GoogleAuthBody(BaseModel):
    credential: str   # Google ID token from @react-oauth/google


def _make_token(user_id: str, role: str) -> str:
    expire  = datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRES_DAYS)
    payload = {"userId": user_id, "role": role, "exp": expire}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


@router.post("/auth/google")
async def google_login(body: GoogleAuthBody, response: Response):
    try:
        info = id_token.verify_oauth2_token(
            body.credential,
            g_requests.Request(),
            GOOGLE_CLIENT_ID,
        )
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=f"Invalid Google token: {exc}")

    email     = info["email"].lower().strip()
    full_name = info.get("name", email)
    avatar    = info.get("picture", "")

    col  = get_collection("users")
    user = await col.find_one({"email": email})

    if user:
        # Update avatar / name in case they changed on Google side
        await col.update_one(
            {"_id": user["_id"]},
            {"$set": {"fullName": full_name, "avatarUrl": avatar}},
        )
        user_id = str(user["_id"])
        role    = user["role"]
    else:
        result  = await col.insert_one({
            "email":       email,
            "fullName":    full_name,
            "avatarUrl":   avatar,
            "role":        "reader",
            "provider":    "google",
            "bookmarkedArticleIds": [],
            "createdAt":   datetime.now(timezone.utc),
        })
        user_id = str(result.inserted_id)
        role    = "reader"

    token = _make_token(user_id, role)

    is_production = os.getenv("ENVIRONMENT", "production") != "development"
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        samesite="none" if is_production else "lax",
        secure=is_production,
        max_age=JWT_EXPIRES_DAYS * 24 * 60 * 60,
    )

    return {
        "user": {
            "id":       user_id,
            "fullName": full_name,
            "email":    email,
            "role":     role,
            "avatarUrl": avatar,
        }
    }
