# Phase 1: Monochrome Design System & Black/White Tokens

## Objective
Replace the current hyper-saturated neon palette (`#818cf8` indigo, `#fb7185` rose, `#38bdf8` sky) and generic system fonts (`Arial`) with a **strict, editorial Black & White / Grayscale design system** rooted in Swiss Modernism and Dieter Rams's minimalist ethos.

---

## 1. Color Palette Philosophy: Pure Monochrome

The site will not use flashy neon accents or colorful gradients. It operates on high-contrast black, white, and finely tuned neutral grays.

### Color Tokens Specification
```css
:root {
  /* Surface & Background */
  --bg-primary: #0a0a0a;         /* Deep neutral black */
  --bg-surface: #121212;         /* Elevated card surface */
  --bg-surface-elevated: #171717;/* Higher elevation / dropdowns */
  --bg-subtle: #1c1c1c;          /* Subtle hover fill */

  /* Text & Ink */
  --text-primary: #ffffff;       /* Pure white - Primary headings */
  --text-secondary: #d4d4d4;     /* Light neutral - High-legibility body */
  --text-muted: #8a8a8a;         /* Mid gray - Captions, tags, labels */
  --text-faint: #525252;         /* Low-emphasis metadata / indices */

  /* Hairlines & Dividers */
  --border-subtle: rgba(255, 255, 255, 0.08); /* 1px crisp Swiss hairlines */
  --border-strong: rgba(255, 255, 255, 0.18); /* Focus & active borders */
  --border-card: #262626;                     /* Card boundary */

  /* Interaction & Accents */
  --ink-inverted: #0a0a0a;       /* Text on white primary buttons */
  --surface-inverted: #ffffff;   /* Solid white primary button fill */
  --accent-warm: #f43f5e;        /* Only for the intentional strapline '💖' */
}
```

### Contrast Compliance (WCAG 2.2 AA / AAA):
* White on `#0a0a0a`: **18.7:1** (Exceeds AAA requirement of 7.0:1)
* Secondary text (`#d4d4d4`) on `#0a0a0a`: **12.6:1** (Exceeds AAA)
* Muted text (`#8a8a8a`) on `#0a0a0a`: **5.3:1** (Exceeds AA 4.5:1)

---

## 2. Typography Foundation

* **Headings & Body**: `Geist Sans` or `Inter` via Next.js `next/font/google`.
* **Metadata, Tags & Code**: `Geist Mono`.
* **Editorial Typographic Scale**:
  * `H1 / Display`: `clamp(2.5rem, 5vw, 4rem)` (40px - 64px), Weight: 700, Leading: `1.05`, Tracking: `-0.03em`.
  * `H2 / Section Title`: `clamp(1.75rem, 3.5vw, 2.75rem)` (28px - 44px), Weight: 600, Leading: `1.15`, Tracking: `-0.02em`.
  * `H3 / Subheading`: `1.25rem - 1.5rem` (20px - 24px), Weight: 500, Leading: `1.3`.
  * `Body Text`: `1rem - 1.125rem` (16px - 18px), Weight: 400, Leading: `1.6`, Max line width: `68ch`.
  * `Label / Mono Tag`: `0.75rem` (12px), Font: Mono, Uppercase, Tracking: `0.15em`, Weight: 500.

---

## 3. Implementation Tasks

### Task 1.1: Font Integration
* **File**: `app/layout.tsx`
* Load `GeistSans` and `GeistMono` using `next/font/google` with `display: 'swap'` to guarantee zero Cumulative Layout Shift (CLS = 0).

### Task 1.2: Refactor `app/globals.css`
* Remove old colored variables (`--accent-primary: #818cf8`, etc.).
* Replace `body` background with solid neutral black (`#0a0a0a`), eliminating radial indigo gradients.
* Establish standard utility classes:
  * `.editorial-shell`: Centered container with max width `1200px` and responsive horizontal padding.
  * `.hairline-border`: `border: 1px solid var(--border-subtle)`.
  * `.mono-tag`: Section numbering and category tag typography.
  * `.focus-ring`: `outline: none; ring: 2px solid #fff; ring-offset: 2px; ring-offset-color: #0a0a0a`.

### Task 1.3: Standardized Button & Interactive Components
* Primary Button: Solid pure white background (`#ffffff`), pitch-black text (`#0a0a0a`), subtle hover scale (`scale: 1.015`), zero glow.
* Secondary Button: Transparent background, crisp 1px border (`var(--border-strong)`), white text.
