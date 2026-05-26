# task-20260526-003: User Profile Page
- **Date:** 2026-05-26
- **Status:** done
- **Stage:** Stage 5 — Polish & Launch
- **Requirements:** PB-002

## Goal
Dedicated /profile page showing signed-in user's info, bookmark count, and sign-out button. Navbar avatar navigates there instead of logging out directly.

## Files Changed
- `front-end/src/views/Profile/ProfileView.tsx` — created: avatar, name, email, role badge, bookmark count, sign-out
- `front-end/src/views/Profile/ProfileView.css` — created
- `front-end/src/components/Navbar/Navbar.tsx` — avatar click → navigate("/profile")
- `front-end/src/App.tsx` — added /profile route

## Outcome
Done. Clean profile card. Sign-out on profile page redirects to feed.
