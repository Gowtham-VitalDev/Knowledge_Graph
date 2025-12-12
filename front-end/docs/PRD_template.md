# Product Requirements Document (Template)

> **This file defines what the product must deliver before any implementation work begins.** Keep the structure intact, swap the bracketed placeholders with project-specific data, and preserve the inline guidance so future contributors always understand the “why” behind each section.

---

## Document Meta

| Field | Guidance |
|-------|----------|
| **Product Name** | Clear, user-facing label. |
| **Version** | Increment when scope or direction changes. |
| **Owner** | Product lead responsible for accuracy. |
| **Status** | Draft / In Review / Approved. |
| **Last Updated** | ISO date (`YYYY-MM-DD`). |
| **Review Cadence** | e.g., “Monthly with Product + Tech leads.” |
| **Linked Docs** | `Implementation.md`, `Product_Backlog.md`, `Active_Task.md`, `.acontext/tasks`. |

**BMAD Relationship:** PRD states **what** value must exist. Implementation.md explains **how and when** a subset ships. Product_Backlog.md stores everything deferred. Active_Task.md contains the currently groomed slice ready for engineering.

---

## 1. Product Overview
- **Mission Statement:** Single sentence that captures the promise to users.
- **Elevator Pitch:** Two or three sentences for stakeholders new to the idea.
- **Strategic Alignment:** How this effort supports portfolio OKRs, KPIs, or guardrails.

> Keep this section solution-agnostic. If you find yourself mentioning file paths or tech choices here, move that detail to Implementation.md.

---

## 2. Personas & Stakeholders
Document every persona the product must serve. Use the same structure throughout so readers can compare quickly.

```
### Persona N – <Role / Identifier>
- **Profile:** Snapshot of their environment, responsibilities, constraints.
- **Goals:** What outcome they chase (verbs!).
- **Frictions:** Pain points in today’s workflow.
- **Definition of Success:** How they know the product helps.
- **Channels / Devices:** Surfaces they rely on.
```

Include non-user stakeholders if they influence adoption (compliance, legal, operations).

---

## 3. Problem Statements
Write crisp statements describing unmet needs. Each statement should answer:
- **Who** experiences the problem.
- **When/Where** it occurs.
- **What** breaks or blocks progress.
- **Why** solving it matters now.

Use supporting bullets for evidence (research, analytics, anecdotes) and note urgency (`Critical / Important / Emerging`).

---

## 4. Goals & Success Metrics

### 4.1 Business Goals
Tie the initiative to measurable company outcomes (revenue, retention, compliance posture, strategic differentiators).

### 4.2 User Goals
Describe what users want to accomplish—not features they interact with.

### 4.3 Success Metrics
| Metric | Type | Baseline | Target | Notes |
|--------|------|----------|--------|-------|
| `% of critical tasks completed on time` | North Star | `<current>` | `<goal>` | Example |
| `<Metric>` | Leading | | | |

> Keep the list short (<6 metrics). If a metric requires net-new telemetry, document the dependency.

---

## 5. Scope Definition

### 5.1 In Scope (Current Release)
Describe the epics/features included in the MVP or current release train. Reference the epic names exactly as they appear below.

### 5.2 Out of Scope
List promising ideas or adjacent features that are deliberately deferred. Link each to `Product_Backlog.md` so the reasoning stays traceable.

### 5.3 Assumptions & Constraints
- Platform, geography, regulatory, or device limitations.
- Tooling or resourcing assumptions that could change the plan.

---

## 6. Epics & Feature Sets
Structure each epic consistently to make grooming easier later.

```
### Epic N: <Name>
- **Persona / JTBD:** Who benefits + what job they’re trying to get done.
- **Problem in Context:** Link back to Section 3 entry.
- **Outcome:** Observable change in user behavior or business value.
- **Feature Set:** 
  1. `<Feature>` – user value + measurable acceptance hints.
  2. `<Feature>` – ...
- **Success Criteria:** How we know the epic works as a whole.
- **Future Enhancements:** Ideas that belong in Product_Backlog.md.
- **Risks / Notes:** Unknowns or platform gotchas.
```

Mark each epic with a phase tag (`MVP`, `Future`, `Research`) to signal downstream planning.

---

## 7. Experience Scenarios
Describe canonical flows proving the product works. For each scenario:

| Scenario | Trigger | Steps | Happy Path Outcome | Exceptions / Edge Cases |
|----------|---------|-------|--------------------|-------------------------|
| `<Example>` | `<Start condition>` | `<Bullet or numbered steps>` | `<What success looks like>` | `<How we handle failures>` |

Link to supporting artifacts (journey maps, sequence diagrams, prototypes).

---

## 8. Experience Requirements
- **Design Principles:** Tone, accessibility, motion philosophy.
- **Information Architecture:** Primary entities, hierarchies, and relationships.
- **Content Strategy:** Voice, localization, regulatory language guidelines.

> Leave pixel-level details for `UI_UX_doc.md`. This section ensures everyone agrees on the qualitative bar.

---

## 9. Compliance, Privacy, and Security
- Data classification, residency, encryption, and retention expectations.
- Regulatory frameworks (HIPAA, GDPR, SOC 2) and attestation needs.
- Consent flows, audit trails, or permission prompts that must exist in the product.

---

## 10. Risks & Open Questions
Track the unknowns early so Implementation planning can mitigate them.

| ID | Risk / Question | Severity | Owner | Mitigation / Next Step |
|----|-----------------|----------|-------|------------------------|
| R-01 | Example: “Mobile OS background limits may block critical alarms.” | High | Tech Lead | Spike in Stage 0 to validate. |

Update severity/owners as decisions evolve; never leave a risk owner blank.

---

## 11. Release Strategy
- **Milestones / Gates:** e.g., Research ✅ → Alpha → Beta → GA.
- **Dependency Map:** External teams, vendors, certifications, or content readiness.
- **Rollout Plan:** Feature flags, staged cohorts, comms plan.
- **Success Criteria per Phase:** How we decide to move forward or pivot.

---

## 12. Appendices
- **Glossary:** Acronyms, domain terms, definitions.
- **Competitive Landscape:** Table comparing primary alternatives.
- **Research Sources:** Interview summaries, survey links, analytics dashboards.
- **Revision History:** `Date | Author | Change`.

---

### Validation Checklist
- [ ] Every epic links back to a persona + problem statement.
- [ ] Product_Backlog.md captures every out-of-scope idea mentioned here.
- [ ] Implementation.md references this PRD when selecting stages.
- [ ] Success metrics are measurable within the current analytics stack (or dependencies noted).
- [ ] Document includes no implementation specifics (file paths, module names, etc.).

Use this PRD template at project kickoff to anchor strategy and keep BMAD documentation coherent. When the product evolves, update this doc first, then cascade changes into Implementation and Active Tasks so execution always mirrors intent.
