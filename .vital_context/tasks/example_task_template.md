# task-20251204-004: Stage 2 - Automation & Notifications
- **Date:** 2025-12-04
- **Status:** active
- **Stage:** Stage 2 - Expansion

## Goal
Notification/automation service: schedule reminders against records, cancel on changes, log for audit.

## Plan
1. Implement `notificationService` adapter (schedule/cancel/reschedule/list)
2. Integrate into store/service layer
3. Add permission handling + error states
4. Document manual testing scenarios

## Log
- Created service interface + placeholder under `src/services/notifications/`
- Hooked schedule/cancel into `taskService` CRUD actions
- Added feature flag to toggle scheduling for environments without APIs
- Decision: abstract adapter pattern — template stays vendor-neutral
- Decision: manual testing over e2e for now — saves time, captures knowledge in docs
- Challenge: platform APIs differ for background execution — solved with adapter interface

## Files Changed
- `src/services/notifications/index.ts` — created — interface + default impl
- `src/services/taskService.ts` — modified — scheduling hooks
- `src/store/taskStore.ts` — modified — scheduler toggles + error states

## Outcome
In progress. Interface defined, integrated with core flow. Remaining: manual verification on devices, automated tests once concrete adapter chosen.
Next: complete testing, update bugs.md if limitations found.
