# Phase 3: Editorial Hero Section Rebuild

## Objective
Rebuild the top-of-page hero experience to immediately answer the visitor's core question: *"What does Touseef Ahmed do, and why does it matter?"* within 3 seconds, using editorial typography, black/white clarity, and authentic positioning.

---

## 1. Content & Messaging Matrix

| Element | Target Copy | Visual Treatment |
| :--- | :--- | :--- |
| **Eyebrow Tag** | `01 / OVERVIEW` · `UNITED ARAB EMIRATES` | Small monospace uppercase (`Geist Mono`, `text-xs text-neutral-400 tracking-widest`). |
| **Primary Headline (H1)** | `I turn messy workflows into simple, reliable software.` | High-impact white headline (`text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white`). |
| **Strapline / Subtitle** | `Developing with love 💖 — custom web applications and AI systems engineered for operational clarity.` | Light slate body text (`text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-2xl`). The `💖` provides the single touch of human warmth. |
| **Action Group** | `[See Selected Work ↓]` & `[Let's Talk →]` | Primary button: Solid white with black text. Secondary button: Subtle border with white text. |
| **Proof Strip** | 3 clean monochromatic stat cells: <br/>• **Specialization**: Full-Stack Web & AI <br/>• **Focus**: Business Operations & ERPs <br/>• **Status**: Available for select projects | Grid of 3 minimal cards with hairline borders (`border-neutral-800 bg-neutral-900/40 p-4 rounded-lg`). |

---

## 2. Visual Composition & Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│  01 / OVERVIEW · UNITED ARAB EMIRATES                                  │
│                                                                        │
│  I turn messy workflows into                                           │
│  simple, reliable software.                                            │
│                                                                        │
│  Developing with love 💖 — custom web applications and AI systems     │
│  engineered for operational clarity.                                   │
│                                                                        │
│  [See Selected Work ↓]    [Let's Talk →]                               │
│                                                                        │
│  ┌──────────────────────┬──────────────────────┬─────────────────────┐ │
│  │ SPECIALIZATION       │ FOCUS                │ STATUS              │ │
│  │ Full-Stack Web & AI  │ Business Operations  │ Open for Projects   │ │
│  └──────────────────────┴──────────────────────┴─────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

* **Elimination of Missing Portrait Error**: If a portrait is not provided in Payload CMS, the hero gracefully defaults to an asymmetric, purely typographic Swiss editorial layout without rendering awkward "Portrait Missing" developer error boxes.

---

## 3. Implementation Tasks

### Task 3.1: Create `components/HeroSection.tsx`
* Implement the responsive grid layout using `page-shell`.
* Connect to `getHomeGlobalData()` from Payload CMS with safe, elegant fallbacks.
* Smooth scroll handler on `[See Selected Work ↓]` linking directly to `#selected-work`.

### Task 3.2: Mobile Adaptation
* Headline scales smoothly down to `text-3xl / 36px` on narrow viewports without wrapping awkwardly.
* Proof strip collapses from a 3-column row to a tidy stacked grid.
* Primary CTA is positioned above the fold on mobile screens (viewport height > 600px).
