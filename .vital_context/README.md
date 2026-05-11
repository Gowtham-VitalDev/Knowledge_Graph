# BMAD Context Framework

A lightweight documentation template that makes any project AI-agent-friendly. One file in, one file out.

## Quick Start

1. Copy this `.vital_context/` folder into your project root
2. Fill in `CONTEXT.md` with your project details (name, stack, current stage, active tasks)
3. Fill in `PRD.md` with your product requirements
4. Customize `rules/` files for your stack's conventions

Then start any AI session with:
```
Read .vital_context/CONTEXT.md. Task: [describe the work].
```

That's it. The agent reads context, does the work, logs what it did.

## Structure

```
.vital_context/
├── CONTEXT.md          # THE entry point. Agents read this first and only this per task.
├── README.md           # You're reading it.
├── playbook.md         # Stage-level progress, acceptance criteria, hand-offs
├── QuickPrompts.md     # Universal prompts for AI agents
├── PRD.md              # Product requirements & detailed feature specs
├── architecture.md     # Stack, schemas, data flows, API endpoints, decisions
├── reference.md        # Commands, env vars, file structure, quick lookups
├── backlog.md          # Future work & ideas
├── bugs.md             # Known issues & resolutions
├── rules/
│   ├── structure.md    # File organization & naming conventions
│   └── design.md       # UI/UX design system & components
└── tasks/
    ├── index.md        # Task registry + lightweight log template
    └── task-*.md       # Individual task logs (~20 lines each)
```

## Philosophy

- **One file per task** — agents read `CONTEXT.md`, nothing else unless directed
- **No ceremony** — task logs are ~20 lines, not 120
- **You own it** — keep `CONTEXT.md` updated as your single source of truth
- **Read on demand** — deeper docs (PRD, rules, bugs) are reference material, not prerequisites
