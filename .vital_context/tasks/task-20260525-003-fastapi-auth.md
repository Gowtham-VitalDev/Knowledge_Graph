# task-20260525-003: FastAPI Auth — JWT + httpOnly Cookie
- **Date:** 2026-05-25
- **Status:** done
- **Stage:** Stage 4 — V3-Backend-Python
- **Requirements:** V4-REQ-003

## Goal
Implement login/logout/me endpoints with JWT issued as an httpOnly cookie. Implement `get_current_user()` and `require_admin()` Depends() functions for route protection.

## Plan
1. Create `middleware/auth.py` — JWT decode, get_current_user(), require_admin()
2. Create `routes/auth.py` — POST /api/auth/login, POST /api/auth/logout, GET /api/auth/me
3. Use passlib CryptContext with bcrypt scheme for password verification
4. Issue JWT as httpOnly cookie (7-day expiry from JWT_EXPIRES_DAYS env var)

## Log
- **Critical bug:** bcrypt 500 error — `ValueError: password cannot be longer than 72 bytes`. Root cause: newer bcrypt strict mode rejects hashes created by Node's bcryptjs even when password is short. Fix: pin `bcrypt==4.0.1` in requirements.txt (last version before strict checks were added).
- `Cookie(None)` FastAPI parameter reads httpOnly cookie as a typed function argument
- `require_admin()` implemented as flat function (not chaining get_current_user) for simplicity — decodes JWT and checks role in one step
- `create_token()` encodes userId, role, exp into JWT payload
- GET /api/auth/me excludes passwordHash from response using MongoDB projection

## Files Changed
- `back-end-py/middleware/auth.py` — created — get_current_user(), require_admin() as Depends() functions
- `back-end-py/routes/auth.py` — created — login, logout, me endpoints
- `back-end-py/requirements.txt` — modified — pinned bcrypt==4.0.1
- `back-end-py/main.py` — modified — mount auth router

## Outcome
done — Login sets httpOnly JWT cookie; /api/auth/me returns user object; bcrypt==4.0.1 pin resolves cross-language hash compatibility.
