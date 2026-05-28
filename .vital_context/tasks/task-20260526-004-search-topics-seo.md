# task-20260526-004: Search, Topics Page, SEO Meta
- **Date:** 2026-05-26
- **Status:** done
- **Stage:** Stage 5 — Polish & Launch
- **Requirements:** PB-001, PB-009 (partial)

## Goal
Three Stage 5 polish items: live article search, working Topics page (fix dead nav link), page-level SEO meta tags.

## Plan
1. Backend: add ?q= regex search to GET /api/articles
2. Frontend: SearchModal component, wire search icon in Navbar
3. Topics page at /topics — category cards linking to /?category=slug
4. usePageMeta hook — document.title + meta description + OG tags per page

## Files Changed
- `back-end-py/routes/articles.py` — added q= param: $or regex on title + excerpt
- `front-end/src/api/articles.ts` — added q? to fetchArticles params
- `front-end/src/components/SearchModal/SearchModal.tsx` — created: debounced search, results list, Esc to close
- `front-end/src/components/SearchModal/SearchModal.css` — created
- `front-end/src/components/Navbar/Navbar.tsx` — search icon opens SearchModal, Topics link fixed
- `front-end/src/views/Topics/TopicsView.tsx` — created: category grid, links to /?category=slug
- `front-end/src/views/Topics/TopicsView.css` — created
- `front-end/src/hooks/usePageMeta.ts` — created: sets title, meta description, og:title, og:description
- `front-end/src/views/Feed/FeedView.tsx` — usePageMeta added
- `front-end/src/views/Blog/BlogView.tsx` — usePageMeta with article title + excerpt
- `front-end/src/views/Bookmarks/BookmarksView.tsx` — usePageMeta added
- `front-end/src/views/Profile/ProfileView.tsx` — usePageMeta added
- `front-end/src/views/Topics/TopicsView.tsx` — usePageMeta added
- `front-end/src/App.tsx` — added /topics route

## Outcome
Done. Search debounced at 300ms, results navigate to article. Topics page shows all DB categories. Every page has correct browser tab title and meta description.
