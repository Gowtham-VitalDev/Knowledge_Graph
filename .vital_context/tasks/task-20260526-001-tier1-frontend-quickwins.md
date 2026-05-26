# task-20260526-001: Tier 1 Frontend Quick Wins
- **Date:** 2026-05-26
- **Status:** done
- **Stage:** Stage 5 — Polish & Launch
- **Requirements:** PB-001 (partial), PB-003, PB-023

## Goal
Make four dummy frontend elements functional: category filter pills, load more, topic cloud navigation, newsletter subscription form.

## Plan
1. Lift category filter state to FeedView via useSearchParams (?category=slug)
2. Wire load more to append paginated articles
3. Convert TopicCloud tags to buttons with onTopicClick callback
4. Wire NewsletterWidget to POST /api/newsletter

## Files Changed
- `front-end/src/views/Feed/FeedView.tsx` — useSearchParams, load more, topic click handler
- `front-end/src/components/FilterPills/FilterPills.tsx` — controlled (active + onChange props)
- `front-end/src/components/TopicCloud/TopicCloud.tsx` — button + onTopicClick callback
- `front-end/src/components/NewsletterWidget/NewsletterWidget.tsx` — full API wiring, loading/success/error states
- `back-end-py/routes/newsletter.py` — created: POST /api/newsletter with EmailStr validation, duplicate handling
- `back-end-py/main.py` — registered newsletter router

## Outcome
Done. All four interactions live. Category filter URL-based (shareable). Newsletter stores subscribers in MongoDB.
