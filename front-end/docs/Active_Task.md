# Active Tasks - Knowledge Graph MVP

This is the groomed backlog for the current BMAD cycle. Update it whenever task ownership or status changes. All tasks must have a matching `.acontext` log.

---

## 1. Dashboard Snapshot

| Stage | Owner | Tasks Ready | In Progress | Blocked | Done | % Complete | Notes |
|-------|-------|-------------|-------------|---------|------|------------|-------|
| Stage 0 - Foundations | Codex Agent | 2 | 1 | 0 | 0 | 33% | Waiting on Supabase + CI setup access. |

---

## 2. Task Entries

```yaml
tasks:
  - id: Stage0-FND-001
    title: "Establish BMAD foundations + repo structure"
    summary: >
      Populate BMAD docs, restructure the Next.js project into the agreed src layout, and ship a Stage 0 demo article with theme tokens + outline navigation so engineers share a baseline before coding Stage 1.
    status: in-progress
    priority: high
    related_epic: "Epic 1 - Core Article Display & Navigation"
    stage: "Stage 0 - Foundations"
    type: enablement
    estimated_hours: 12
    actual_hours: 6
    owner: "Codex Agent"
    start_date: 2025-12-11
    due_date: 2025-12-18
    dependencies: []
    blockers: []
    context_links:
      prd: "PRD - The MVP.md#features--user-stories-the-what-we-build"
      backlog: "Product_Backlog.md#epic-1-core-article-display--navigation"
      implementation: "Implementation.md#1-scope-alignment"
      research: null
    acceptance_criteria:
      - "Implementation, project_structure, and UI_UX docs populated with Knowledge Graph data."
      - "Next.js repo uses src/ layout, theme tokens, and sample outline screen."
      - "Task log updated with outcomes + validation."
    deliverables:
      - path: "src/app/page.tsx"
        note: "Stage 0 reference article"
      - path: "docs/Implementation.md"
        note: "Cycle blueprint"
      - path: "docs/project_structure.md"
        note: "Structural guidance"
      - path: "docs/UI_UX_doc.md"
        note: "Design contract"
    validation:
      manual: "Verify Stage 0 demo renders locally"
      automated: "Run npm run lint / npm run typecheck (Stage 0 exit)"
    communication_plan:
      cadence: "Update `.acontext` log after each major step"
      stakeholders: ["Product", "Design"]
    task_log_path: "docs/acontext/tasks/task-20251211-001-foundation.md"
    notes: >
      Stage closing once Supabase + CI tasks move forward.

  - id: Stage0-FND-002
    title: "Provision Supabase + Vercel + secure env config"
    summary: >
      Create Supabase project (schema for articles, outlines, embeds) and Vercel deployment target, wire env variables, and document access for future agents.
    status: not-started
    priority: high
    related_epic: "Epic 3 - Public Content Access"
    stage: "Stage 0 - Foundations"
    type: enablement
    estimated_hours: 10
    actual_hours: null
    owner: "TBD"
    start_date: null
    due_date: 2025-12-20
    dependencies:
      - "Supabase org admin approval"
    blockers: []
    context_links:
      prd: "PRD - The MVP.md#features--user-stories-the-what-we-build"
      backlog: "Product_Backlog.md#epic-3-public-content-access"
      implementation: "Implementation.md#4-stage-playbooks"
      research: null
    acceptance_criteria:
      - "Supabase schema exported + stored under docs/acontext/artifacts."
      - "Service + anon keys managed via environment files (not committed)."
      - "Vercel project created with build pipeline stub."
    deliverables:
      - path: "docs/acontext/artifacts/supabase-schema.sql"
        note: "Schema snapshot"
      - path: "docs/acontext/tasks/task-YYYYMMDD-supabase.md"
        note: "Provisioning log"
    validation:
      manual: "Connect local dev server to Supabase and fetch sample article."
      automated: "CI env vars injected without leaking secrets."
    communication_plan:
      cadence: "Post status to #knowledge-graph daily until provisioned"
      stakeholders: ["Product", "Ops"]
    task_log_path: "docs/acontext/tasks/task-YYYYMMDD-supabase.md"
    notes: >
      Owner will be assigned once access confirmed.

  - id: Stage0-FND-003
    title: "Add CI + quality guardrails"
    summary: >
      Configure lint/type-check scripts, GitHub Actions workflow, and placeholder Playwright suite so Stage 1 work inherits automation.
    status: not-started
    priority: medium
    related_epic: "Enablement"
    stage: "Stage 0 - Foundations"
    type: enablement
    estimated_hours: 8
    actual_hours: null
    owner: "TBD"
    start_date: null
    due_date: 2025-12-22
    dependencies:
      - "Outcome of Stage0-FND-001 (structure + scripts)"
    blockers: []
    context_links:
      prd: null
      backlog: "Product_Backlog.md#enablement--quality"
      implementation: "Implementation.md#3-bmad-stage-blueprint"
      research: null
    acceptance_criteria:
      - "npm run lint and npm run typecheck available + documented."
      - "GitHub Actions workflow runs lint + typecheck on push."
      - "CI badges documented in README."
    deliverables:
      - path: ".github/workflows/ci.yml"
        note: "Lint + typecheck pipeline"
      - path: "package.json"
        note: "Scripts"
    validation:
      manual: "Run scripts locally before committing"
      automated: "Actions workflow completes without manual intervention"
    communication_plan:
      cadence: "Post update in PR + `.acontext` log"
      stakeholders: ["Engineering"]
    task_log_path: "docs/acontext/tasks/task-YYYYMMDD-ci.md"
    notes: >
      Convert to Stage 1 once automation stable.
```

---

## 3. Grooming Checklist
- [x] Each task references a PRD epic or enablement objective.
- [x] Acceptance criteria are binary and testable.
- [ ] Owners assigned for provisioning + CI once access resolved.
- [x] `.acontext` log paths reserved for every task.

---

## 4. Status Definitions (Quick Reference)
- `not-started`: Groomed, awaiting bandwidth.
- `in-progress`: Active code/doc changes + log updates.
- `blocked`: Waiting on dependency; must call out owner + ETA in notes.
- `ready-for-review`: Implementation done, awaiting validation.
- `completed`: Acceptance criteria met, docs + logs updated.

Keep this document synced with daily updates so Implementation + Product Backlog always reflect the latest plan.
