# Product Backlog - Knowledge Graph MVP

> **Tracks future-ready work streams that are approved but not yet scheduled.** Use it to feed `Active_Task.md` when a new stage begins.

---

## 1. Document Purpose
- Centralize features across PRD epics that extend beyond the current implementation stage.
- Preserve prioritization rationale, dependencies, and acceptance hints so promotion is frictionless.
- Provide transparency during sprint planning + BMAD check-ins.

Flow reminder:
```
PRD ideas -> Groomed & approved -> Product_Backlog (this file)
           -> Selected for current stage -> Active_Task.md -> Implementation.md
```

---

## 2. Maintenance Rules
1. Capture stakeholder-approved ideas here immediately after PRD updates.
2. Document personas, hypotheses, and acceptance hints before asking for prioritization.
3. Rank within each epic via RICE scoring.
4. When a feature is promoted to `Active_Task.md`, record the move in `promotion_history` and delete from the snapshot table.
5. Archive shipped items monthly.

Update cadence: at least once per sprint or when scope shifts.

---

## 3. Backlog Snapshot

| Epic | Feature | Stage | Priority | Status | Notes |
|------|---------|-------|----------|--------|-------|
| Epic 1 - Core Article Display & Navigation | PB-101 Article search + filtering | Discovery | Medium | Idea | Depends on Supabase full-text search. |
| Epic 1 - Core Article Display & Navigation | PB-102 Author bios & metadata blocks | Ready | High | Groomed | Requires additional Markdown schema. |
| Epic 2 - Multimedia Content Consumption | PB-201 Multi-provider video embeds | Discovery | Medium | Idea | Evaluate Vimeo + Loom support. |
| Epic 3 - Public Content Access | PB-301 Scheduled publishing + drafts | Ready | High | Groomed | Needs editorial scripts + RLS rules. |
| Enablement | PB-401 CI test harness + Playwright smoke | Ready | High | Groomed | Moves into Stage0-FND-003 when scheduled. |

---

## 4. Feature Entries

### Epic 1: Core Article Display & Navigation
```yaml
- id: PB-101
  epic: "Epic 1 - Core Article Display & Navigation"
  title: "Article search + filtering"
  problem: >
    Readers cannot quickly locate content by topic or keyword once more than 10 posts exist, increasing bounce rates.
  audience: ["Tech Explorer", "Developer Deep-Diver"]
  hypothesis: >
    Adding Supabase full-text search with tag filters will reduce bounce by 10% and increase time-on-site.
  user_value:
    - "Locate relevant articles without manual scrolling."
    - "Filter by tags such as AI, Hardware, Opinion."
  acceptance_hints:
    - "Search bar returns ranked results within 250ms."
    - "Filters can be combined and persist between sessions." 
  dependencies:
    technical: ["Supabase FTS setup", "Tag taxonomy"]
    design: ["Search bar + results layout"]
    compliance: []
  effort_estimate: "M"
  priority_score:
    method: "RICE"
    score: 320
  stage_readiness:
    definition_of_ready:
      - "Personas + success metrics defined"
      - "Tag taxonomy documented"
    blockers: ["Need content >10 posts"]
  promotion_history: []
  notes: >
    Prototype search UI in Figma before grooming for Stage 2.

- id: PB-102
  epic: "Epic 1 - Core Article Display & Navigation"
  title: "Author bios & metadata blocks"
  problem: >
    Readers lack context about the author or article difficulty, lowering trust.
  audience: ["Tech Explorer"]
  hypothesis: >
    Showing author bios, estimated reading time, and difficulty rating near the top of each article will improve completion rate.
  user_value:
    - "Assess credibility quickly"
    - "Decide whether to invest time"
  acceptance_hints:
    - "Author block includes avatar, short bio, and social link."
    - "Reading time auto-calculated from word count."
  dependencies:
    technical: ["Markdown frontmatter expansion"]
    design: ["Author card component"]
    compliance: []
  effort_estimate: "S"
  priority_score:
    method: "RICE"
    score: 410
  stage_readiness:
    definition_of_ready:
      - "Design spec exists"
      - "Supabase schema change approved"
    blockers: []
  promotion_history: []
  notes: >
    Candidate for Stage 2 once Stage 1 launches.
```

### Epic 2: Multimedia Content Consumption
```yaml
- id: PB-201
  epic: "Epic 2 - Multimedia Content Consumption"
  title: "Multi-provider video embeds"
  problem: >
    Some creators host video on Vimeo or Loom; limiting to YouTube prevents reuse of existing content.
  audience: ["Developer Deep-Diver"]
  hypothesis: >
    Supporting at least Vimeo URLs will unlock 30% more video-ready content.
  user_value:
    - "Watch supplementary videos regardless of hosting service"
  acceptance_hints:
    - "Parser recognizes Vimeo + Loom URLs"
    - "Fallback messaging consistent"
  dependencies:
    technical: ["Embed component refactor", "Additional oEmbed APIs"]
    design: ["Player controls parity review"]
    compliance: []
  effort_estimate: "M"
  priority_score:
    method: "RICE"
    score: 240
  stage_readiness:
    definition_of_ready:
      - "YouTube embed stable"
      - "Legal review for provider ToS"
    blockers: ["Need Stage 1 telemetry"]
  promotion_history: []
  notes: >
    Ensure caching + rate limits before Stage 3.
```

### Epic 3: Public Content Access
```yaml
- id: PB-301
  epic: "Epic 3 - Public Content Access"
  title: "Scheduled publishing + drafts"
  problem: >
    Editors currently merge Markdown manually; lack of scheduling hinders timely launches.
  audience: ["Administrator"]
  hypothesis: >
    Allowing drafts + scheduled publish dates will streamline editorial workflow and reduce manual deploys.
  user_value:
    - "Prepare posts ahead of embargoes"
    - "Avoid manual midnight releases"
  acceptance_hints:
    - "Drafts hidden from public queries"
    - "Scheduler triggers Supabase function to publish"
  dependencies:
    technical: ["Supabase cron triggers", "CLI ingestion updates"]
    design: ["Admin CLI UX copy"]
    compliance: []
  effort_estimate: "L"
  priority_score:
    method: "RICE"
    score: 350
  stage_readiness:
    definition_of_ready:
      - "Supabase access roles defined"
      - "CLI design drafted"
    blockers: ["Need Stage 1 data model stabilized"]
  promotion_history: []
  notes: >
    Add to Stage 2 planning once ingestion script exists.
```

### Enablement / Quality
```yaml
- id: PB-401
  epic: "Enablement"
  title: "CI test harness + Playwright smoke"
  problem: >
    Without automation, regressions slip through and BMAD Stage 1 risks delay.
  audience: ["Engineering"]
  hypothesis: >
    Adding lint/typecheck + Playwright smoke tests in CI will reduce review time and protect the reading experience.
  user_value:
    - "Confidence in each deploy"
    - "Faster code reviews"
  acceptance_hints:
    - "CI workflow runs on every PR"
    - "Smoke test covers Markdown render + outline"
  dependencies:
    technical: ["npm scripts finalized", "Playwright scaffolding"]
    design: []
    compliance: []
  effort_estimate: "M"
  priority_score:
    method: "RICE"
    score: 380
  stage_readiness:
    definition_of_ready:
      - "Stage 0 repo restructuring done"
      - "Owners assigned"
    blockers: []
  promotion_history:
    - "2025-12-11: Ready for Stage 0 (mapped to Stage0-FND-003)"
  notes: >
    Move to Active_Task once Stage0-FND-001 closes.
```

---

## 5. Prioritization Guidance
- Default model = RICE. Document reach, impact, confidence, effort when adjusting `priority_score`.
- Use MoSCoW tags during planning when stakeholder pressure rises; keep them in notes.

---

## 6. Definition of Ready (DoR)
- [x] Persona/problem traced to PRD.
- [ ] UX explorations exist for every Ready item (PB-101 waiting on search UI).
- [x] Technical spikes recorded where needed (`.acontext/decisions`).
- [x] Dependencies tracked with owners.
- [x] Acceptance criteria are binary + automation friendly.

---

## 7. Ideas Under Consideration
```
- idea: "Reader mode toggle with larger fonts"
  source: "Customer interview 2025-12-10"
  next_step: "Validate demand with analytics once MVP live"
  owner: "Product"
  due: 2026-01-31
```

---

## 8. Audit Trail

| Date | Change | Reason | Author |
|------|--------|--------|--------|
| 2025-12-11 | Initial backlog populated for Knowledge Graph MVP | Stage 0 kickoff | Codex Agent |

---

### Usage Checklist
- [x] Each backlog entry references a PRD epic + persona.
- [x] Implementation only shows Stage 0/1 work; future items remain here.
- [ ] Blocked items include owners once assigned.
- [x] The backlog snapshot stays lean via epic grouping.
