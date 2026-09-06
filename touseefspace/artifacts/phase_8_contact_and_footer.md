# Phase 8: Contact Section & Editorial Footer

## Objective
Provide a frictionless, high-conversion inquiry point for potential clients, partners, and engineering teams, paired with a restrained, monochromatic footer.

---

## 1. Contact Section Architecture (`#contact`)

```
┌────────────────────────────────────────────────────────────────────────┐
│  05 / CONTACT                                                          │
│  Have something worth building?                                        │
│                                                                        │
│  Whether you are planning a full-stack custom application or want      │
│  to automate manual business workflows, my inbox is always open.      │
│                                                                        │
│  DIRECT INQUIRY                                                        │
│  touseefspace@gmail.com  [Copy Email]  ·  United Arab Emirates         │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ Your Name                                                         │ │
│  ├───────────────────────────────────────────────────────────────────┤ │
│  │ Email Address                                                     │ │
│  ├───────────────────────────────────────────────────────────────────┤ │
│  │ Tell me about your project or workflow...                         │ │
│  ├───────────────────────────────────────────────────────────────────┤ │
│  │ [Send Message →]                                                  │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Features:
1. **One-Click Email Copy**: Clicking the email copies `touseefspace@gmail.com` to the clipboard with an instant visual toast confirmation (`Copied to clipboard`).
2. **Direct Inquiry Form**: Simple, accessible form with fields: `Name`, `Email`, `Project Description`. Submitted directly via Server Action or API route.
3. **Monochrome Styling**: Pure black input backgrounds (`#121212`), hairline borders (`#262626`), high-contrast white placeholder/text, solid white submit button.

---

## 2. Minimalist Footer (`components/Footer.tsx`)

* **Left**: `touseef আহমেদ · Software Developer — Developing with love 💖`.
* **Middle**: Subtle social links (`GitHub`, `LinkedIn`) rendered in muted monochrome gray (`hover:text-white`).
* **Right**: `© 2026 Touseef Ahmed · UAE · Built with Next.js & Payload CMS`.
* Zero floating widgets, zero clutter.
