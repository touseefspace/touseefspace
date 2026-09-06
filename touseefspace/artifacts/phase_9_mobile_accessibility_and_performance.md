# Phase 9: Mobile Polish, Accessibility, Performance & SEO

## Objective
Ensure the portfolio achieves production-grade excellence across mobile ergonomics, accessibility standards (WCAG 2.2 AA), Core Web Vitals (LCP < 1.8s), and search engine optimization.

---

## 1. Mobile Ergonomics

* **Viewport Adaptations**:
  * Hero H1 scales using CSS `clamp()` (`clamp(2rem, 8vw, 4rem)`), preventing text truncation.
  * Primary CTAs maintain minimum touch targets of `48×48px` with clear thumb spacing.
  * Horizontal scroll padding (`px-5 sm:px-8`) ensures breathing room on narrow displays (320px - 390px).
* **Scroll Animation on Mobile**:
  * Clamps device pixel ratio to `1.5` to prevent mobile GPU thermal throttling.
  * If device memory is constrained, falls back to the clean 3-card before/after visual swipe sequence.

---

## 2. Accessibility Compliance (WCAG 2.2 AA)

* **Color Contrast**:
  * Primary white on neutral black: `18.7:1` (Exceeds WCAG AAA).
  * Body copy (`#d4d4d4`) on black: `12.6:1` (Exceeds WCAG AAA).
  * Muted labels (`#8a8a8a`) on black: `5.3:1` (Exceeds WCAG AA 4.5:1).
* **Keyboard Navigation**:
  * Distinct, visible focus rings on all interactive elements: `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]`.
  * `Skip to content` link at top of DOM for screen reader and keyboard power users.
* **Reduced Motion (`prefers-reduced-motion: reduce`)**:
  * Frame animations snap immediately to final state.
  * Canvas scroll animation replaced with static schematic diagram.

---

## 3. Core Web Vitals & Performance Budgets

* **LCP (Largest Contentful Paint)**: Target `< 1.8s`.
  * Google fonts loaded via `next/font` with inline CSS injection.
  * Above-the-fold hero renders without blocking network waterfalls.
* **CLS (Cumulative Layout Shift)**: Target `0.00`.
  * Explicit aspect-ratio containers for all images and canvases (`aspect-[16/9]`, `aspect-[4/3]`).
* **INP (Interaction to Next Paint)**: Target `< 80ms`.
  * Scroll event scrubbing driven off main thread using `requestAnimationFrame`.

---

## 4. SEO & Structured Metadata

* **Global Metadata**:
  * Title: `Touseef Ahmed — Software Developer | Custom Web Apps & AI Systems`
  * Description: `Senior software developer in the UAE. I turn messy manual workflows into simple, reliable custom web applications and AI-powered systems.`
* **Schema.org JSON-LD**:
  * Injected into `<head>`: `Person` entity declaring name, job title, portfolio URL, and GitHub/LinkedIn profiles.
* **App Router SEO Files**:
  * `app/sitemap.ts`: Generates dynamic XML sitemap including `/` and all `/work/[slug]` case study URLs.
  * `app/robots.ts`: Allows indexing on public routes while disallowing `/admin/*`.
