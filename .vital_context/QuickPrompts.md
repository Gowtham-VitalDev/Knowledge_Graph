## Universal Prompt

Use this to start **any** task with an AI agent:

```
Read .vital_context/CONTEXT.md.
Task: [describe the work].

1. Create .vital_context/tasks/task-YYYYMMDD-NNN-[name].md with goal + plan.
2. Check referenced docs ONLY if CONTEXT.md points you there for this type of work.
3. Implement. Log key steps and decisions in the task file.
4. Update the Active Tasks table in CONTEXT.md and tasks/index.md when done.
```

### Variants

**Bug fix:**
```
Read .vital_context/CONTEXT.md. Check .vital_context/bugs.md.
Bug: [describe the bug].
Fix it, log in .vital_context/tasks/, update bugs.md with resolution.
```

**Resume previous work:**
```
Read .vital_context/CONTEXT.md. Read .vital_context/tasks/task-YYYYMMDD-NNN-[name].md.
Continue from where it left off. Update the task log when done.
```

**Check requirements for a stage:**
```
Read .vital_context/PRD.md (section 7 - Requirements Registry).
Show me all requirements for Stage [N] and their status.
```

**Phase status / what was delivered:**
```
Read .vital_context/playbook.md.
Show me the current status of all stages — what's done, what's active, what's next.
```

**Architecture / schema questions:**
```
Read .vital_context/architecture.md.
[Ask your question about stack, schemas, data flows, or API endpoints.]
```

**Agentic auto-dev (minimal intervention):**
```
Read .vital_context/CONTEXT.md. Pick the next active task from the Active Tasks table.
Execute it end-to-end following the universal prompt workflow.
When done, pick the next task. Continue until all active tasks are complete.
```


## First Load: Bootstrap Prompt

> **When to use:** You've copied `.vital_context/` into your project root and need to populate every file from your existing project context (a claude.md, a PRD, a conversation, or your own notes).

**You do once:**

1. Copy `.vital_context/` folder into your project root
2. Run the bootstrap prompt below
3. Review the output, correct anything wrong
4. You're done — every future session starts with `Read .vital_context/CONTEXT.md`

**The bootstrap prompt:**

```
Read all template files in .vital_context/ to understand the structure.
Then scan the project codebase (package.json, config files, src/ structure, schema files, .env.example).

I'm bootstrapping the .vital_context/ framework for this project.
Here is my project context:

[PASTE your claude.md / PRD / project description / feature list here]

Fill in EVERY file below, in this exact order. Follow the template structure already in each file.
Do NOT skip any file. Do NOT leave placeholder values — use real project data or mark "TBD" only if genuinely unknown.

---

FILE 1: .vital_context/CONTEXT.md
- Project name, one-line description, full tech stack
- Current stage and status (which phase is active RIGHT NOW)
- Phases table: break the project into 4-6 stages with goal + status for each
- Active Tasks table: the tasks for the CURRENT stage only
- Key Decisions table: every tech/architecture decision already made with rationale
- Key Rules: naming conventions, file placement rules for this stack
- Reference Docs table: keep as-is, just verify links work

FILE 2: .vital_context/PRD.md
- Product overview (what, why, who)
- Personas with goals and frictions
- Problem statements
- Epics & features with per-feature success criteria and dependencies
- §7 Requirements Registry: create EVERY requirement with unique IDs
  - Use pattern: V0-REQ-001, V1-REQ-001, V2-REQ-001 (prefix = stage number)
  - One row per requirement, not per feature — break features into implementable requirements
  - Set status: done for completed work, active for current stage, planned for future
  - Include Priority (P0/P1/P2/P3) and Notes column

FILE 3: .vital_context/playbook.md
- One section per stage from CONTEXT.md phases table
- Goals: 2-4 bullet points per stage
- Requirements: list the REQ IDs from PRD.md §7 that belong to this stage
- Key Tasks: task IDs if they exist, or "TBD — generate when stage becomes active"
- Acceptance Criteria: technical/testable checks (builds, tests pass, API responds)
- Definition of Done: user-facing outcomes (user can do X, feature works as expected)
- Risks: known blockers or unknowns
- Hand-off: what the next stage inherits (for completed stages, document what was delivered)

FILE 4: .vital_context/architecture.md
- Tech stack table with version numbers and purpose for each tool
- Data models / schemas (database tables, TypeScript interfaces, API types)
- Data flow diagram (text-based: user action → frontend → API → database → response)
- API endpoints table (method, path, description, auth required)
- Key Decisions log with alternatives considered and rationale
- Architecture diagram (text-based system overview)

FILE 5: .vital_context/reference.md
- Project file structure tree (actual current structure from codebase)
- Dev commands (install, dev, build, test, lint, deploy)
- Environment variables table (name, purpose, example value, required?)
- Key file locations (where to find config, routes, components, services, types)
- External service URLs and API docs links

FILE 6: .vital_context/rules/structure.md
- Folder layout conventions (where new components go, where services go, etc.)
- File naming conventions (camelCase, PascalCase, kebab-case — specify per file type)
- Import ordering rules
- Module boundaries (what can import what)

FILE 7: .vital_context/rules/design.md
- Color palette (hex values, semantic names)
- Typography (font families, sizes, weights)
- Spacing system (if using Tailwind, the scale)
- Component patterns (which UI library, how to compose components)
- Accessibility rules
- Responsive breakpoints

FILE 8: .vital_context/tasks/index.md
- Add rows for any tasks already completed (from existing project history)
- Set status: done for past work, active for current tasks
- Keep the task log template as-is at the bottom

FILE 9: .vital_context/bugs.md
- Add any known bugs or limitations from the existing project
- If none, leave the template empty but ready

FILE 10: .vital_context/backlog.md
- Add any future ideas, deferred features, or "nice to haves" not assigned to a stage
- Reference PRD.md requirement IDs where applicable

---

After filling all files:
1. Verify CONTEXT.md phases match playbook.md stages
2. Verify PRD.md §7 requirement IDs match playbook.md requirement references
3. Verify architecture.md schemas match any existing code/database
4. Report: list each file + summary of what was filled + any "TBD" items that need my input
```

**What happens:** The agent reads your project context + scans the actual codebase, then fills all 10 files in one pass with real data. You review once, and the framework is live.

---

## Phase 1: Starting a Feature Task

**Your prompt:**

```
Read .vital_context/CONTEXT.md. 
Task: Build the task CRUD API endpoints (Phase 2, Task 2.3).

Follow the workflow — create a task log, check architecture.md for schemas, 
implement, and update docs when done.
```

**What the agent does:**

1. Reads `CONTEXT.md` — knows the project, current phase, active tasks
2. Reads `architecture.md` — gets the data model schemas, API endpoint patterns
3. Reads `rules/structure.md` — knows where to put files (`backend/routes/`, `backend/services/`)
4. Creates `tasks/task-20260319-001-crud-api.md` with goal + plan
5. Implements the code
6. Updates the task log with what was done, files changed, decisions
7. Updates `CONTEXT.md` active tasks table (marks task done)
8. Updates `tasks/index.md` with new entry

---

## Phase 2: Architecture / Design Decision

**Your prompt:**

```
Read .vital_context/CONTEXT.md. Read .vital_context/architecture.md.
I need to decide: should we use WebSockets or Server-Sent Events for real-time alerts?
Research both, recommend one, and update architecture.md with the decision.
```

**Agent responds:** Analyzes tradeoffs, picks one, then updates:

- `architecture.md` → adds row to Key Decisions table + updates Architecture Diagram if needed
- `CONTEXT.md` → adds to Key Decisions summary
- Optionally creates a task log if the research was significant

---

## Phase 3: Bug Investigation

**Your prompt:**

```
Read .vital_context/CONTEXT.md. Check .vital_context/bugs.md.
Bug: Calendar sync creates duplicate events when task is updated twice within 1 minute.
Fix it, log in tasks/, update bugs.md with resolution.
```

**Agent does:**

1. Reads `bugs.md` — checks if it's already known
2. Reads `architecture.md` — understands the Calendar sync data flow
3. Creates `tasks/task-20260319-002-fix-duplicate-sync.md`
4. Investigates, finds root cause, implements fix
5. Updates `bugs.md` — adds entry with root cause + resolution
6. Updates task log with outcome

---

## Phase 4: Planning Next Phase

**Your prompt:**

```
Read .vital_context/CONTEXT.md. Read .vital_context/PRD.md. Read .vital_context/backlog.md.
Phase 2 (Backend) is complete. Plan Phase 3 (Frontend Dashboard).
Break it into tasks, update CONTEXT.md with the new phase status and active tasks,
and promote items from backlog.md if applicable.
```

**Agent updates:**

- `CONTEXT.md` → Phase 2 marked `done`, Phase 3 marked `active`, new Active Tasks table
- `backlog.md` → promoted items removed or marked
- `PRD.md` → if any feature scope changed during Phase 2, updates the epic

---

## Phase 5: Resuming After a Break

**Your prompt:**

```
Read .vital_context/CONTEXT.md. Read .vital_context/tasks/index.md.
What's the current status? What should I work on next?
```

**Agent responds:** Reads the phase table, active tasks, recent task logs — gives you a status summary and recommends the next task. No re-explanation needed.

---

## Phase 6: New Developer / New Agent Session

**Your prompt (or paste into any AI tool):**

```
Read .vital_context/CONTEXT.md.
Task: [whatever you need].
```

That's it. The agent has everything. If it needs deeper info, CONTEXT.md's reference table tells it exactly which file to read.

---

## Quick Cheat Sheet: Which File Gets Updated When

|Situation|Files to update|
|---|---|
|**Starting a task**|Create `tasks/task-*.md`, update `CONTEXT.md` active tasks|
|**Finishing a task**|Update task log, `tasks/index.md`, `CONTEXT.md` active tasks|
|**Tech decision made**|`architecture.md` decisions table, `CONTEXT.md` decisions|
|**Schema changed**|`architecture.md` data models|
|**New API endpoint**|`architecture.md` endpoints, `reference.md` quick lookup|
|**Bug found/fixed**|`bugs.md`, create task log if significant|
|**New feature scoped**|`PRD.md` epic, `backlog.md` or `CONTEXT.md` active tasks|
|**New requirement added**|`PRD.md` §7 requirements registry, assign ID + stage|
|**Requirement completed**|`PRD.md` §7 status update, `playbook.md` if DoD criteria met|
|**Phase completed**|`CONTEXT.md` phases table, `playbook.md` acceptance criteria + DoD|
|**File structure changed**|`rules/structure.md`, `reference.md` file structure|
|**New env var added**|`reference.md` env vars table|
|**UI component pattern**|`rules/design.md`|

---

## The One Rule

**Every prompt starts with:**

```
Read .vital_context/CONTEXT.md.
```

Everything else follows from there. The agent knows what to read, what to update, and where things go.