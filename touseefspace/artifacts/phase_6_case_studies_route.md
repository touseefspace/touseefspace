# Phase 6: Dedicated Case Study Route (`/work/[slug]`)

## Objective
Create dedicated deep-dive case study pages allowing technical leaders, clients, and recruiters to inspect Touseef's architecture, problem-solving, and engineering decisions in depth.

---

## 1. Page Template Architecture (`app/work/[slug]/page.tsx`)

```
┌────────────────────────────────────────────────────────────────────────┐
│  ← Back to Home                                                        │
│                                                                        │
│  CASE STUDY 01                                                         │
│  Aunvu / MISBAH ERP Platform                                           │
│  Centralizing regional inventory and automated sales reporting.        │
│                                                                        │
│  Client: Wholesale Retailer · Role: Lead Full Stack · Year: 2025       │
├────────────────────────────────────────────────────────────────────────┤
│  THE CONTEXT & OPERATIONAL FRICTION                                    │
│  In-depth explanation of legacy spreadsheets and bottleneck.           │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                    SYSTEM ARCHITECTURE DIAGRAM                    │ │
│  │      Client App ──> Next.js Server ──> PostgreSQL / Ledger         │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  KEY ENGINEERING DECISIONS                                             │
│  1. Optimistic UI Updates for high-throughput barcode scanning.        │
│  2. Row-Level Security for multi-branch data isolation.                │
│  3. Server-Sent Events (SSE) for instant inventory sync.               │
│                                                                        │
│  MEASURABLE IMPACT & OUTCOME                                           │
│  • 80% reduction in end-of-month audit cycles                          │
│  • 12 regional branches onboarded in 6 weeks                           │
│                                                                        │
│  TECHNOLOGY                                                            │
│  Next.js · React 19 · TypeScript · PostgreSQL · Docker · Tailored APIs │
│                                                                        │
│  [Explore Live App ↗]                   [Discuss a Similar Project →]  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Implementation Tasks

### Task 6.1: Dynamic Query in `lib/queries.ts`
* Add `getProjectBySlug(slug: string)` with cached execution (`cacheTag("projects")`).
* Add `getAllProjectSlugs()` to power `generateStaticParams()` for instant SSG page loads.

### Task 6.2: Build `app/work/[slug]/page.tsx`
* Server Component with rich editorial styling.
* Full OpenGraph metadata generated per case study (`generateMetadata`).
* Semantic headings (`h1` for project name, `h2` for case study sections).
* Clean breadcrumb navigation back to `#selected-work`.
