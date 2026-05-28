import os
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, Depends, Response, Cookie
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt
from typing import Optional
from database import get_collection
from middleware.auth import get_current_user
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

JWT_SECRET      = os.getenv("JWT_SECRET", "change_me")
JWT_ALGORITHM   = "HS256"
JWT_EXPIRES_DAYS = int(os.getenv("JWT_EXPIRES_DAYS", "7"))

# passlib context — handles bcrypt hashing and verification.
# This is the equivalent of bcrypt.compare() and bcrypt.hash() from Node.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ── REQUEST BODY MODELS ───────────────────────────────────────────────────────
# Pydantic validates the request body automatically.
# If email or password is missing FastAPI returns 422 before your code runs.

class LoginRequest(BaseModel):
    email: str
    password: str


# ── HELPERS ───────────────────────────────────────────────────────────────────

def create_token(user_id: str, role: str) -> str:
    expire  = datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRES_DAYS)
    payload = {"userId": user_id, "role": role, "exp": expire}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


# ── POST /api/auth/login ──────────────────────────────────────────────────────
# Response sets an httpOnly cookie — same behaviour as the Node backend.
# `response: Response` is a FastAPI special parameter — injected automatically,
# lets you set headers/cookies from inside a route handler.

@router.post("/auth/login")
async def login(body: LoginRequest, response: Response):
    col  = get_collection("users")
    user = await col.find_one({"email": body.email.lower().strip()})

    if not user or not pwd_context.verify(body.password, user["passwordHash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(str(user["_id"]), user["role"])

    # Set httpOnly cookie — expires in 7 days
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=os.getenv("NODE_ENV") == "production",
        max_age=JWT_EXPIRES_DAYS * 24 * 60 * 60,
    )

    return {
        "user": {
            "id":       str(user["_id"]),
            "fullName": user["fullName"],
            "email":    user["email"],
            "role":     user["role"],
            "avatarUrl": user.get("avatarUrl", ""),
        }
    }


# ── POST /api/auth/logout ─────────────────────────────────────────────────────

@router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("token")
    return {"ok": True}


# ── GET /api/auth/me ──────────────────────────────────────────────────────────
# Protected — requires valid token in cookie.
# `user = Depends(get_current_user)` injects the decoded JWT payload.

@router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    col      = get_collection("users")
    from bson import ObjectId
    doc      = await col.find_one(
        {"_id": ObjectId(user["userId"])},
        {"passwordHash": 0}   # exclude password hash from response
    )
    if not doc:
        raise HTTPException(status_code=404, detail="User not found")

    doc["_id"] = str(doc["_id"])
    return {"user": doc}
