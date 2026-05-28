# task-20260526-005: Dedicated Login Page + Auth Flow
- **Date:** 2026-05-26
- **Status:** done
- **Stage:** Stage 5 — Polish & Launch
- **Requirements:** PB-002

## Goal
Replace the embedded Google button in the navbar with a dedicated /login page. Protected routes redirect there with return-path state. Clean "Sign in" CTA in navbar.

## Plan
1. Create /login page — centered card, Google Sign-In button, redirect-back logic
2. Create RequireAuth component — redirects to /login with location.state.from
3. Protect /bookmarks and /profile with RequireAuth
4. Navbar: replace GoogleLogin widget with Link to="/login"

## Files Changed
- `front-end/src/views/Login/LoginView.tsx` — created: centered card, Google button, redirects to from or /
- `front-end/src/views/Login/LoginView.css` — created
- `front-end/src/components/RequireAuth/RequireAuth.tsx` — created: redirects unauthenticated users to /login
- `front-end/src/App.tsx` — /login route added, /bookmarks + /profile wrapped in RequireAuth
- `front-end/src/components/Navbar/Navbar.tsx` — GoogleLogin removed, replaced with Link "Sign in" → /login

## Outcome
Done. Standard auth flow: browse freely, sign in only when accessing protected pages. Return-path preserved across sign-in.
