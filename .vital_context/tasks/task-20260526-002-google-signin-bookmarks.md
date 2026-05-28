# task-20260526-002: Google Sign-In + User Bookmarks (Tier 2)
- **Date:** 2026-05-26
- **Status:** done
- **Stage:** Stage 5 — Polish & Launch
- **Requirements:** PB-002, PB-004, PB-026

## Goal
Full Google OAuth sign-in flow and persistent per-user bookmarks stored in MongoDB.

## Plan
1. Backend: POST /api/auth/google (verify Google ID token, upsert user, issue JWT cookie)
2. Backend: GET/POST/DELETE /api/user/bookmarks/:articleId
3. Frontend: UserAuthContext, @react-oauth/google, update Navbar, BookmarksView, BlogNavbar bookmark button

## Files Changed
- `back-end-py/routes/google_auth.py` — created: Google ID token verification, user upsert, JWT cookie
- `back-end-py/routes/bookmarks.py` — created: GET/POST/DELETE /api/user/bookmarks
- `back-end-py/requirements.txt` — added google-auth, requests
- `back-end-py/main.py` — registered both routers
- `back-end-py/.env` — added GOOGLE_CLIENT_ID
- `front-end/src/contexts/UserAuthContext.tsx` — created: loginWithGoogle, logout, addBookmark, removeBookmark, isBookmarked
- `front-end/src/main.tsx` — wrapped app with GoogleOAuthProvider + UserAuthProvider
- `front-end/src/components/Navbar/Navbar.tsx` — Google Sign-In button when logged out, avatar when logged in
- `front-end/src/components/BlogNavbar/BlogNavbar.tsx` — bookmark button wired, active/saved state
- `front-end/src/views/Bookmarks/BookmarksView.tsx` — created: lists saved articles
- `front-end/src/types/article.ts` — added id field
- `front-end/src/api/adapters.ts` — extended adaptArticle() with id
- `front-end/.env` — added VITE_GOOGLE_CLIENT_ID

## Outcome
Done. Google Sign-In works. Bookmarks persisted per user in MongoDB bookmarkedArticleIds array. Google Cloud Console required localhost:5173 to be added as an authorized JS origin.
