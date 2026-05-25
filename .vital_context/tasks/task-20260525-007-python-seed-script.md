# task-20260525-007: Python Seed Script
- **Date:** 2026-05-25
- **Status:** done
- **Stage:** Stage 4 — V3-Backend-Python
- **Requirements:** V4-REQ-006

## Goal
Write `back-end-py/scripts/seed.py` so any developer can wipe and rebuild the full database in one command. Mirrors the old Node seed script (git history) using Motor async + passlib instead of Mongoose + bcryptjs.

## Plan
1. Load .env using dotenv (relative to script location)
2. Clear all collections
3. Insert categories, tags, users (hash admin password with passlib)
4. Insert 5 articles with full Markdown content, wiring IDs from previous inserts
5. Insert trending rankings and site settings
6. Print summary and exit cleanly

## Log
- Script is async (`asyncio.run`) — Motor requires an event loop
- Used `passlib.context.CryptContext` for admin password hash (same as the auth route)
- Author placeholder passwords hashed properly — not left as bare strings like the old Node script
- Windows console encoding error on emoji in print() — removed emoji, plain text only
- Tested: runs clean, all 6 collections populated

## Files Changed
- `back-end-py/scripts/seed.py` — created — full async seed script

## How to Run
```powershell
# From back-end-py/ with venv activated
.\venv\Scripts\python.exe scripts/seed.py
```

## Outcome
done — Script runs in ~2s, inserts 8 categories, 8 tags, 6 users, 5 articles, 4 trending, 1 settings doc. Idempotent — safe to run multiple times (clears first).
