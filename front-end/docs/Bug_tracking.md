# Bug Tracking & Incident Log (Template)

> **Use this document to capture defects, platform quirks, and the playbooks for fixing them.** It complements issue trackers by preserving deeper context, root causes, and lessons for future BMAD cycles.

---

## 1. How to Use
- Log any bug that required meaningful investigation, produced user-visible impact, or exposed platform constraints.
- Keep the format lightweight but structured so agents can search quickly.
- Reference this file during Stage 3 (Polish/Hardening) to ensure known issues remain top-of-mind.

Update cadence: **Immediately after resolution** (capture the fix while it’s fresh).

---

## 2. Status Board

| ID | Title | Severity | Status | Platform | Owner | Notes |
|----|-------|----------|--------|----------|-------|-------|
| BUG-001 | `<Summary>` | Critical / High / Medium / Low | Open / Validated / Fixed / Won’t Fix | iOS / Android / Web / API | `<Name>` | `<Next step>` |

Use this table for quick visibility; full entries live below.

---

## 3. Bug Entry Template

Duplicate this block per bug and keep the comments so new contributors know what to include.

```yaml
- id: BUG-000
  title: "Describe the symptom, not the fix"
  severity: critical | high | medium | low
  status: open | validated | in-progress | fixed | won't-fix
  reported_on: YYYY-MM-DD
  detected_in: "Build number / stage"
  environment:
    os: "iOS 17.2"
    device: "iPhone 14 Pro"
    app_version: "1.0.3"
  reporter: "Name or agent ID"
  owner: "Responsible engineer/agent"
  area: "notifications / storage / ui"
  description: >
    Detailed narrative of what happens. Mention preconditions if the bug is intermittent.
  steps_to_reproduce:
    - "Step 1"
    - "Step 2"
  expected_result: >
    State the correct behavior.
  actual_result: >
    What actually happened.
  impact:
    scope: "How many users or flows are affected."
    user_risk: "Data loss, compliance, reputation..."
  logs_and_artifacts:
    - path: ".acontext/tasks/task-YYYYMMDD-###-bug-investigation.md"
    - path: "screenshots/BUG-000.png"
  root_cause: >
    Once known, explain the underlying defect.
  resolution: >
    Describe the fix, code references, and why it works.
  regression_tests:
    automated: ["test path or suite"]
    manual: ["QA checklist item"]
  follow_up:
    - "Add monitoring for ..."
    - "Update documentation section ..."
```

---

## 4. Patterns & Learnings
Capture recurring issues or platform quirks so future contributors can avoid re-learning them.

| Pattern | Description | Mitigation | Related Bugs |
|---------|-------------|-----------|--------------|
| Notification throttling | Example: Android caps alarms at 500 per app. | Batch scheduling + warn users. | BUG-012, BUG-019 |

---

## 5. Platform Constraints
- OS background execution limits.
- Permission prompts that reset after denial.
- Vendor rate limits or quota restrictions.

Move stable learnings here once a bug becomes a “known limitation”.

---

## 6. Incident Response Playbook
Outline steps for critical incidents:
1. Assign severity level.
2. Page on-call / notify stakeholders.
3. Capture current impact metrics.
4. Create `.acontext/tasks` entry for the investigation.
5. Update this doc once mitigation is in place.

Include communication templates or runbooks if you have them.

---

## 7. Audit Trail

| Date | Change | Author |
|------|--------|--------|
| `YYYY-MM-DD` | Added BUG-023 summary, linked decision log. | `<Name>` |

---

### Checklist
- [ ] Every closed bug lists the verifying test or QA step.
- [ ] High-severity incidents have an accompanying `.acontext/tasks` log and, if architecture-related, a `.acontext/decisions` entry.
- [ ] Patterns table updated when two or more related bugs exist.
- [ ] This document links back to `Implementation.md` Stage 3/4 work when relevant.

Keeping bugs documented here ensures the next BMAD cycle starts with a full understanding of historical pitfalls, reducing repeated regressions and onboarding time.
