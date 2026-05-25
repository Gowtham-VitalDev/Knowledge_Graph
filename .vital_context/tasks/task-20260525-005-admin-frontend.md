# task-20260525-005: Admin Frontend — Login, Dashboard, Article Editor
- **Date:** 2026-05-25
- **Status:** done
- **Stage:** Stage 4 — V3-Backend-Python
- **Requirements:** V4-REQ-005

## Goal
Build the admin UI at /admin using the NeonScroll dark design system. Three pages: login, article dashboard, and article editor (create + edit mode with live Markdown preview).

## Plan
1. Create `AdminAuthContext.tsx` — session check on mount, login/logout helpers
2. Create `AdminRoute.tsx` — protected route wrapper (redirects to /admin/login if no user)
3. Create `Admin.css` — full NeonScroll dark CSS for all admin components
4. Create `api/admin.ts` — typed API helpers for all admin endpoints
5. Create `Dashboard.tsx` — article table with publish toggle + delete
6. Create `ArticleEditor.tsx` — create/edit form with meta fields + split editor/preview
7. Wire all routes into `App.tsx` under `AdminAuthProvider`

## Log
- Admin uses same NeonScroll tokens (--color-bg, --color-accent etc.) — no separate token layer needed
- `AdminAuthProvider` wraps the entire app in App.tsx so any route can call `useAdminAuth()`
- `AdminRoute` shows "Checking session…" during initial /api/auth/me check to prevent flash-of-login
- ArticleEditor handles both create (/admin/articles/new) and edit (/admin/articles/:id/edit) via `useParams`
- Auto-slug generation from title on create; slug field becomes manually editable on edit to avoid breaking existing URLs
- Live preview uses ReactMarkdown + remarkGfm — same renderer as the public blog view
- TypeScript check (`tsc --noEmit`) passed clean before shipping

## Files Changed
- `front-end/src/contexts/AdminAuthContext.tsx` — created — AdminAuthProvider, useAdminAuth hook
- `front-end/src/views/Admin/AdminRoute.tsx` — created — protected route wrapper
- `front-end/src/views/Admin/Admin.css` — created — NeonScroll dark styles for login, nav, table, editor, badges, buttons
- `front-end/src/views/Admin/LoginPage.tsx` — created — email + password login form
- `front-end/src/views/Admin/Dashboard.tsx` — created — article table with publish toggle + delete
- `front-end/src/views/Admin/ArticleEditor.tsx` — created — create/edit form with split markdown editor + live preview
- `front-end/src/api/admin.ts` — created — typed API helpers (list, get, create, update, togglePublish, delete)
- `front-end/src/App.tsx` — modified — added AdminAuthProvider wrapper + 4 admin routes (/admin/login, /admin, /admin/articles/new, /admin/articles/:id/edit)

## Outcome
done — Admin UI complete. Login → dashboard → editor flow works end-to-end. TypeScript clean. NeonScroll dark theme consistent with public site.
