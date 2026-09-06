# Phase 4: Signature Scroll-Driven Animation

## Objective
Implement the single, memorable scroll-driven animation requested in `design_principles.md`. It must tell a coherent story: **Disorganized Manual Process → Connected Pipeline → Integrated Custom Web App**.

---

## 1. The Visual Storyboard (Monochrome Vector / UI)

Rather than random 3D shapes or colorful particle clouds, the sequence uses an architectural black & white schematic style:

```
SCROLL %     STAGE              VISUAL METAPHOR
─────────────────────────────────────────────────────────────────────────────
0% - 20%     Stage 1: Chaos     Scattered, disconnected monochromatic icons:
                                spreadsheets, email inbox threads, paper notes,
                                unorganized customer requests.

25% - 45%    Stage 2: Pipeline  Vector lines link together; data streams begin
                                converging into a central processing node.

50% - 70%    Stage 3: Schema    A modular system wireframe emerges:
                                [Orders] ──> [Inventory] ──> [Analytics]

75% - 95%    Stage 4: Real UI   The wireframe solidifies into a high-density,
                                crisp web dashboard inside a sleek device frame.

100%         Stage 5: Finished  Real-time KPI cards populate with clean stats.
                                Caption: "One unified system for every process."
```

---

## 2. Technical Implementation Architecture

### Canvas-Based Scrubber
* **Component**: `components/WorkflowScrollAnimation.tsx`
* **Container**: Pinned viewport (`position: sticky; top: 0; height: 100vh`) inside a scroll track of ~1500px (`height: 250vh`).
* **Render Pipeline**: An HTML5 `<canvas>` element that renders vector paths and component cards with hardware-accelerated 2D context.
* **Scroll Synchronization**:
  * Bound to Framer Motion's `useScroll({ target: containerRef })`.
  * `useMotionValueEvent(scrollYProgress, "change", (latest) => renderFrame(latest))`.
  * Uses `requestAnimationFrame` to ensure 60fps scrubbing with zero main-thread blocking.

### Monochrome Styling Rules:
* Device Frame: Dark charcoal border (`#262626`) with subtle inner shadow.
* Wireframe Elements: Crisp white lines (`rgba(255,255,255,0.7)`) and subtle dark translucent surfaces (`rgba(255,255,255,0.03)`).
* Zero rainbow colors: Accent cues use high-contrast white and subtle muted gray.

---

## 3. Reduced Motion & Performance

### `prefers-reduced-motion` Fallback:
If the user has enabled reduced motion:
1. The pinned scroll container is disabled.
2. The user sees a clean, static side-by-side comparison:
   * Left: "Before: Fragmented manual spreadsheets" (Static schematic)
   * Right: "After: Integrated web application" (Static dashboard preview)

### Performance Budgets:
* **Memory**: Frame drawing generates zero DOM nodes, preventing garbage collection spikes.
* **CLS**: Container reserved height prevents any layout shift during load.
* **DPR Clamping**: On mobile devices, `canvas` resolution is clamped to `window.devicePixelRatio = Math.min(window.devicePixelRatio, 2)`.
