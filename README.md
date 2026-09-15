> [!NOTE]
> **Personal Portfolio & Open-Source Template**: This repository powers my live personal production website and is shared as-is as an open-source reference and template. You are welcome to fork, customize, and deploy it for your own portfolio. Please see [Support & Contributions](#-support--contributions) to read more about how this repository is maintained.

# 👋 About Me

Hey! I'm **Touseef Ahmed**, an **AI Systems & Software Developer** based in the United Arab Emirates. 

I turn messy workflows into simple, reliable software spaces — engineering custom full-stack web applications, automated business pipelines, and AI systems designed to eliminate operational clutter and give ambitious teams the room to scale with calm, dependable reliability.

- 🌐 **Live Website**: [https://touseefspace.com](https://touseefspace.com)
- 💼 **LinkedIn**: [linkedin.com/in/touseefspace](https://linkedin.com/in/touseefspace)
- 🐙 **GitHub**: [@touseefspace](https://github.com/touseefspace)
- 🐦 **X / Twitter**: [@touseefspace](https://x.com/touseefspace)
- 📬 **Email**: [hello@touseefspace.com](mailto:hello@touseefspace.com)

---

# 🪐 touseefspace — Developer Portfolio & Case Study Engine

> **Live Production Website:** 🌐 **[https://touseefspace.com](https://touseefspace.com)**

[![Live Website](https://img.shields.io/badge/Live-touseefspace.com-000000?style=flat&logo=safari&logoColor=white)](https://touseefspace.com)
[![GitHub Stars](https://img.shields.io/github/stars/touseefspace/touseefspace?style=social)](https://github.com/touseefspace/touseefspace)
[![Version](https://img.shields.io/badge/Version-v4.1.8-emerald)](#)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org/)
[![Sanity v3](https://img.shields.io/badge/Sanity-v3-f03e2f?logo=sanity)](https://www.sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-000000?logo=vercel)](https://turbo.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features & Architecture

`touseefspace` is an open-source, production-grade **case study engine and portfolio architecture** designed for engineers, systems architects, and technical creators who demand editorial visual craft without sacrificing performance:

- **⚡ Next.js 16 App Router & Cache Primitives**: Built with `"use cache"`, `cacheTag`, and `cacheLife` for sub-millisecond page transitions, minimal database hits, and instant edge revalidations.
- **🌊 Ambient WebGL Fluid Simulation**: Monochromatic, continuous living liquid currents rendered via custom GLSL vertex/fragment shaders, synchronized with system/theme preferences and throttled during browser idle time to safeguard Core Web Vitals.
- **📖 Deep-Dive Editorial Case Studies (`/projects/[slug]`)**: Dedicated production breakdown pages with quantified impact metrics, problem-solution narratives, technology chips, and rich Portable Text bodies.
- **📝 Technical Engineering Blog (`/blog/[slug]`)**: Minimalist reading experience featuring Apple-inspired Table of Contents, syntax-highlighted code blocks, and breakout visual cards.
- **🛡️ Resilient Offline Fallbacks (Template Mode)**: Zero-config local development! If Sanity is offline, unconfigured, or unseeded, the app automatically falls back to rich built-in data in `lib/placeholders.ts` with 0 crashes.
- **🤖 AI-Agent Ready**: Includes ready-to-copy prompts in **[`AGENT_SETUP.md`](./AGENT_SETUP.md)** allowing coding assistants (Antigravity, Cursor, Claude Code, Copilot) to personalize and rebrand the entire portfolio in one pass.
- **🎯 100/100 Core Web Vitals Focus**: Zero heavy icon packages (native lightweight SVGs), pre-rendered static `<head>` meta tags, Schema.org JSON-LD, and strict accessibility hierarchies.

---

## 📁 Repository Structure

```
├── touseefspace/              # Next.js 16 Web Application (Frontend)
│   ├── app/                   # App Router pages, loading skeletons & routes
│   │   ├── page.tsx           # Home landing page (living canvas & work showcase)
│   │   ├── projects/          # Filterable project spotlight index
│   │   ├── projects/[slug]/   # Editorial case studies (SSG / ISR)
│   │   ├── blog/              # Engineering blog & field notes index
│   │   ├── blog/[slug]/       # Engineering articles & Table of Contents
│   │   ├── experiences/       # Timeline & role breakdowns
│   │   ├── skills/            # Interactive capability categories
│   │   ├── contact/           # Theme-adaptive social channels & contact form
│   │   ├── sitemap.ts         # Dynamic sitemap generator (/sitemap.xml)
│   │   └── robots.ts          # Search engine crawler directives (/robots.txt)
│   ├── components/            # UI design system, WebGL canvas & layouts
│   ├── lib/                   # GROQ queries, caching tags & placeholder fallbacks
│   └── sanity/                # Sanity client, image URL builder & live preview
│
└── studio-touseefspace/       # Sanity Studio v3 (Content Management System)
    ├── seed-assets/           # SVG icons, project mockups & covers for instant seeding
    ├── schemaTypes/           # Document schemas (skills, categories, projects, posts, hero)
    ├── scripts/               # Turnkey seeding script (seed-sanity.ts)
    └── sanity.config.ts       # Desk structure, singletons & presentation tool
```

---

## 🚀 Quickstart for Developers

You can run this portfolio locally in under 2 minutes, with or without a Sanity account.

### 1. Clone the Repository
```bash
git clone https://github.com/touseefspace/touseefspace.git
cd touseefspace
```

### 2. Run the Next.js Frontend
```bash
# Navigate to the frontend directory
cd touseefspace

# Install dependencies and start local dev server
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.  
*Thanks to the built-in offline fallback engine, the entire website is fully populated, interactive, and beautifully styled immediately without any setup!*

---

## 🔐 Environment Variables Guide

The repository separates frontend environment variables from the CMS studio environment variables.

### 1. Next.js Frontend (`touseefspace/.env.local`)
Copy the provided template:
```bash
cd touseefspace
cp .env.example .env.local
```

| Variable | Required | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Optional | Your Sanity project ID (leave empty to run in offline fallback mode). |
| `NEXT_PUBLIC_SANITY_DATASET` | Optional | Dataset name (`development` for local testing, `production` for live). |
| `NEXT_PUBLIC_SANITY_API_VERSION`| Optional | API version date (e.g. `2026-02-01`). |
| `SANITY_API_READ_TOKEN` | Optional | Read token for draft mode and live preview. |
| `SANITY_REVALIDATE_SECRET` | Optional | Shared secret string for on-demand revalidation webhooks. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical site domain for metadata, sitemap, and OpenGraph (default: `https://touseefspace.com`). |
| `MAIL_USER` / `MAIL_PASS` / `MAIL_TO` | Optional | SMTP credentials for the `/contact` form (leave blank if not using email dispatch). |

### 2. Sanity Studio (`studio-touseefspace/.env.local`)
Copy the studio template:
```bash
cd studio-touseefspace
cp .env.example .env.local
```

| Variable | Required | Description |
| :--- | :--- | :--- |
| `SANITY_STUDIO_PROJECT_ID` | Yes | Sanity project ID to connect the Studio. |
| `SANITY_STUDIO_DATASET` | Yes | Dataset targeted by the Studio (e.g. `development` or `production`). |
| `SANITY_STUDIO_HOST` | Optional | Subdomain hostname for online deployment (e.g. `yourname.sanity.studio`). |
| `SANITY_STUDIO_APP_ID` | Optional | Cloud application ID assigned by Sanity. |
| `SANITY_TOKEN` | Yes (for seed)| Write-enabled API token used by `npm run seed` to ingest starter assets and content. |

---

## 🛠️ Sanity CMS & Studio Setup

Content for this portfolio (case studies, articles, hero text, and normalized skill entities) is managed via **Sanity Studio v3**.

To keep this main guide clean, all detailed Studio instructions — including:
- Creating a new Sanity project (`npx sanity init --bare`)
- Configuring datasets (`development` vs `production`)
- Running the turnkey seed script (`npm run seed`) to ingest sample mockups & normalized skills
- Local Studio development (`http://localhost:3333`)
- Deploying the Studio to Sanity Cloud (`npx sanity deploy`)

👉 **[Read the Complete Sanity Studio & Seeding Guide in `studio-touseefspace/README.md`](./studio-touseefspace/README.md)**

---

## 🤖 AI Agent Quickstart (Cursor, Antigravity, Claude Code, Copilot)

Using an AI coding assistant to customize this portfolio? We've created a ready-to-copy prompt in **[`AGENT_SETUP.md`](./AGENT_SETUP.md)** that guides your agent to:

- 🏷️ **Rebrand Everything in One Go**: Updates your name, role, domain, and social handles across `app/layout.tsx` (metadata, OpenGraph, JSON-LD), `Navbar`, `Footer`, hero captions, and blog author snippets.
- ⚙️ **Sanity & Environment Setup**: Prepares `.env.local` and instructs the agent to utilize Sanity development best practices (`sanity-best-practices`).
- ✍️ **Attribution**: Seamlessly handles optional attribution (*"Based on touseefspace by Touseef Ahmed"*).
- 🧪 **Verification**: Automatically runs `npx tsc --noEmit` and `npm run build` to ensure your personalized version builds with 0 errors.

👉 **[Open AGENT_SETUP.md to copy the prompt](./AGENT_SETUP.md)**

---

## 🗺️ Search Engine Optimization (SEO) & Sitemaps

The portfolio automatically implements full SEO best practices:
- **Dynamic Sitemap (`/sitemap.xml`)**: Generated by `app/sitemap.ts`, indexing all static pages plus every case study (`/projects/[slug]`) and blog article (`/blog/[slug]`) with accurate priority weights and modification timestamps.
- **Crawler Directives (`/robots.txt`)**: Generated by `app/robots.ts`, allowing search engines to index public content while protecting private studio routes.
- **OpenGraph & Twitter Cards**: Native social sharing cards with pre-rendered `<head>` metadata.
- **Zero Preload Console Warnings**: Strictly optimized with `loading="lazy"` and asynchronous image decoding.

### Configuring CORS Origins
To allow your deployed site to fetch data from Sanity:
1. Go to [sanity.io/manage](https://sanity.io/manage) -> Your Project -> **API** -> **CORS origins**.
2. Add your Vercel production domain (e.g. `https://yourdomain.com` or `https://*.vercel.app`).
3. Check **Allow credentials**.

---

## ⚡ Automated Lighthouse CI Audits

This repository includes turnkey automated performance benchmarking powered by Lighthouse CI (`@lhci/cli`):

### 1. Automated GitHub Actions Workflow
On every `git push` to `main`, GitHub Actions automatically:
- Builds the production bundle and spins up a local server.
- Runs Lighthouse across all major pages: `/`, `/projects`, `/projects/heritage-corporate-law-firm-web-presence`, `/skills`, `/experiences`, `/blog`, and `/contact`.
- Generates a **Markdown Scorecard** directly into the GitHub Actions run summary with real-time Performance, Accessibility, Best Practices, and SEO scores.
- Attaches the complete interactive HTML reports as downloadable build artifacts (retained for 30 days).

### 2. Local Ad-Hoc Audits
Run a local audit across all pages anytime from `touseefspace/`:
```bash
npm run audit
```
Detailed reports will be generated in `touseefspace/.lighthouseci/`.

---

## 🎨 Personalizing for Your Own Brand

1. **Favicons & Logos**: Replace files in `public/favicon_io_*` with your brand monogram or logo assets.
2. **Hero Portrait**: Replace `public/touseef.png` with your portrait or avatar.
3. **Typography & Styling**: Colors, gradients, and typography tokens are defined cleanly in `app/globals.css` using modern CSS variables.
4. **Site Manifest**: Update `public/site.webmanifest` with your app name and theme color.

---

## 💡 Support & Contributions

This repository is shared **as-is as an open-source template and personal portfolio**. You are welcome to fork it, modify it, deploy it, and use it as a foundation for your own site.

Because this repository powers my personal production portfolio:
- **No External Pull Requests / Code Merges**: To maintain design integrity and personal production stability, pull requests and external code contributions are not accepted into this upstream repo. Please feel free to fork and build your own version!
- **No Individual Support**: Technical support, bug tracking, and personalized setup troubleshooting are not provided.
- **Self-Service & AI-Friendly**: If you fork this project, please consult the [Quickstart Guide](#-quickstart-for-developers), [Next.js Docs](https://nextjs.org/docs), and [Sanity Docs](https://www.sanity.io/docs). Follow **[`AGENT_SETUP.md`](./AGENT_SETUP.md)** to configure your instance using AI coding assistants.

---

## ⭐ Show Your Support

If you found this codebase, design system, or documentation helpful, inspiring, or useful for your own portfolio:

- ⭐ **Star this repository on GitHub** to help other developers discover it!
- 📢 **Share it** on X / Twitter or LinkedIn.
- 💬 **Connect** with me on [LinkedIn](https://linkedin.com/in/touseefspace) or [X (@touseefspace)](https://x.com/touseefspace).

---

## 📄 License

Distributed under the **MIT License**. You are free to fork, customize, and deploy this project for your personal portfolio or client projects. Attribution is appreciated!

---

*Engineered by [Touseef Ahmed](https://touseefspace.com) · Built with Next.js · Powered by Sanity.*

