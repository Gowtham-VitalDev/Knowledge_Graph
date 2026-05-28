import os
from fastapi import Depends, HTTPException, Cookie
from jose import jwt, JWTError
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET    = os.getenv("JWT_SECRET", "change_me")
JWT_ALGORITHM = "HS256"


# ── TOKEN DECODER ─────────────────────────────────────────────────────────────
# Reads the JWT from the httpOnly cookie named "token".
# Returns the decoded payload dict, or raises 401 if missing/invalid.
#
# `token: Optional[str] = Cookie(None)` is FastAPI's way of reading a cookie.
# Cookie() is a special parameter type — FastAPI extracts it from the request
# automatically, just like Query() extracts query params.

def get_current_user(token: Optional[str] = Cookie(None)) -> dict:
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


# ── REQUIRE ADMIN ─────────────────────────────────────────────────────────────
# Builds on get_current_user — first decodes the token, then checks the role.
# `Depends(get_current_user)` means: "run get_current_user first, inject result here".
# This is dependency chaining — one Depends() can depend on another.

def require_admin(user: dict = Depends(get_current_user)) -> dict:
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user
