# Phase 5: Selected Work & CMS Schema Expansion

## Objective
Elevate the presentation of projects from shallow summaries with disappearing titles into structured, authoritative case studies displaying **Problem → Solution → Quantified Outcome** and high-fidelity visuals.

---

## 1. Schema Enhancement (`collections/Projects.ts`)

Expand the Payload CMS `Projects` collection fields so every project can store deep narrative data without hardcoding:

```typescript
// New fields to append to collections/Projects.ts
{
  name: "client",
  type: "text",
  label: "Client / Context (e.g., Retail Distribution ERP)"
},
{
  name: "role",
  type: "text",
  label: "Your Role (e.g., Lead Full Stack Engineer)"
},
{
  name: "problem",
  type: "textarea",
  required: true,
  label: "Business Problem & Operational Friction"
},
{
  name: "solution",
  type: "textarea",
  required: true,
  label: "Engineered Solution & Key Decisions"
},
{
  name: "outcome",
  type: "textarea",
  required: true,
  label: "Measurable Impact & Results"
},
{
  name: "metrics",
  type: "array",
  label: "Key Metrics",
  fields: [
    { name: "value", type: "text", required: true, label: "Metric (e.g. 80%)" },
    { name: "label", type: "text", required: true, label: "Description (e.g. Inventory Time Cut)" }
  ]
}
```

---

## 2. Selected Work Section Layout

Replace the 7-second auto-rotating spotlight carousel with an editorial stacked layout of 3 flagship case studies:

```
┌────────────────────────────────────────────────────────────────────────┐
│  02 / SELECTED WORK                                                    │
│  Systems built around real business workflows.                         │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ 01 · AUNVU / MISBAH ERP                              [View Study →]│ │
│  │ Multi-branch Inventory & Sales Management Platform                │ │
│  │                                                                   │ │
│  │ [ PROBLEM ]                                                       │ │
│  │ Manual branch reconciliation caused 2-day inventory sync delays   │ │
│  │ and frequent stockout discrepancies across regional warehouses.    │ │
│  │                                                                   │ │
│  │ [ SOLUTION ]                                                      │ │
│  │ Architected an automated event-driven ERP with real-time stock    │ │
│  │ ledger, barcode scanning, and multi-tenant access control.        │ │
│  │                                                                   │ │
│  │ [ OUTCOME: 80% Faster Stock Audit · 0 Unaccounted Discrepancies ] │ │
│  │                                                                   │ │
│  │ ┌───────────────────────────────────────────────────────────────┐ │ │
│  │ │                  HIGH-RES DASHBOARD PREVIEW                   │ │ │
│  │ └───────────────────────────────────────────────────────────────┘ │ │
│  │ Stack: Next.js · TypeScript · PostgreSQL · Payload CMS            │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Implementation Tasks

### Task 5.1: Update `collections/Projects.ts`
* Add fields: `client`, `role`, `problem`, `solution`, `outcome`, `metrics`.
* Maintain backwards compatibility with existing records.

### Task 5.2: Create `components/SelectedWorkSection.tsx`
* Fetch curated featured projects using existing `getProjects(true)`.
* Render using the black/white Swiss grid.
* No disappearing titles on hover: title, problem, and solution remain permanently visible and accessible to search engines and screen readers.
* Direct link on each project to `/work/[slug]`.
