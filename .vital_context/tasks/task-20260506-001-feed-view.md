# task-20260506-001: Build Page 1 — Feed View
- **Date:** 2026-05-06
- **Status:** done
- **Stage:** Stage 1 — Core Experience (MVP)
- **Requirements:** V1-REQ-001, V1-REQ-002, V1-REQ-003, V1-REQ-004, V1-REQ-005, V1-REQ-014, V1-REQ-015, V1-REQ-017

## Goal
Build the full Feed/List view (Page 1) end-to-end, matching the approved design screenshot.

## Plan
1. Create Navbar component (dark bg, logo, nav links, search icon, sign-in, get-started)
2. Build hero section (editorial eyebrow, Lora headline, subtitle)
3. Build FilterPills with single-active useState toggle
4. Build FeaturedArticleCard (hero card) and ListArticleCard (standard feed card)
5. Build sidebar: TrendingList, TopicCloud, NewsletterWidget
6. Build Footer
7. Assemble FeedView layout (two-column CSS grid: 1fr sidebar)

## Log
- Navbar uses `--color-bg-nav: #1A1A1A`; logo is a 22×22 blue square + wordmark
- FilterPills: 8 pills (All + 7 categories); active = dark bg + white text; `role="tablist"`
- FeaturedArticleCard: image top, Lora 22px/700 title, 3-line excerpt clamp, 24px avatar
- ListArticleCard: flex row; thumbnail 220×130 (larger than spec 72×56 to match screenshot); links via react-router-dom `<Link>`
- TrendingList: large muted numbers `--color-num-muted: #D1D5DB`
- TopicCloud: box tags with `--radius-md: 8px`, not pills
- NewsletterWidget: `e.preventDefault()` on submit, no backend call
- Footer: brand left + nav links + copyright right
- Load more button: click is no-op (UI only per Stage 1 scope)

## Files Changed
- `front-end/src/components/Navbar/Navbar.tsx` + `.css` — created
- `front-end/src/components/FilterPills/FilterPills.tsx` + `.css` — created
- `front-end/src/components/FeaturedArticleCard/FeaturedArticleCard.tsx` + `.css` — created
- `front-end/src/components/ListArticleCard/ListArticleCard.tsx` + `.css` — created
- `front-end/src/components/TrendingList/TrendingList.tsx` + `.css` — created
- `front-end/src/components/TopicCloud/TopicCloud.tsx` + `.css` — created
- `front-end/src/components/NewsletterWidget/NewsletterWidget.tsx` + `.css` — created
- `front-end/src/components/Footer/Footer.tsx` + `.css` — created
- `front-end/src/views/Feed/FeedView.tsx` + `.css` — created

## Outcome
Done. Feed view renders end-to-end matching approved design. All V1-REQ-001..005, 014, 015, 017 satisfied.
