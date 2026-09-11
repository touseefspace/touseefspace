# 🪐 touseefspace — Developer Portfolio & Case Study Engine

> **Live Production Website:** 🌐 **[https://touseefspace.com](https://touseefspace.com)**

[![Live Website](https://img.shields.io/badge/Live-touseefspace.com-000000?style=flat&logo=safari&logoColor=white)](https://touseefspace.com)
[![Version](https://img.shields.io/badge/Version-v4.1.5-emerald)](#)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org/)
[![Sanity v3](https://img.shields.io/badge/Sanity-v3-f03e2f?logo=sanity)](https://www.sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-000000?logo=vercel)](https://turbo.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 👋 About Me

Hey! I'm **Touseef Ahmed**, an **AI Systems & Software Developer** based in the United Arab Emirates. 

I turn messy workflows into simple, reliable software spaces — engineering custom full-stack web applications, automated business pipelines, and AI systems designed to eliminate operational clutter and give ambitious teams the room to scale with calm, dependable reliability.

- 🌐 **Live Website**: [https://touseefspace.com](https://touseefspace.com)
- 💼 **LinkedIn**: [linkedin.com/in/touseefspace](https://linkedin.com/in/touseefspace)
- 🐙 **GitHub**: [@touseefspace](https://github.com/touseefspace)
- 🐦 **X / Twitter**: [@touseefspace](https://x.com/touseefspace)
- 📬 **Email**: [contact@touseefspace.com](mailto:contact@touseefspace.com)

---

## 🌟 Open Source & Architecture

This repository is **100% open source** under the [MIT License](https://opensource.org/licenses/MIT). 

I built this project not just to serve as my personal portfolio, but to provide an open-source, production-grade **case study engine and portfolio architecture** for developers, systems engineers, and technical creators who want to showcase their work with editorial visual craft without sacrificing performance or accessibility.

### Why It's Open Source
- **Real-World Next.js 16 Patterns**: Built on App Router with modern `"use cache"`, `cacheTag`, and `cacheLife` cache primitives, eliminating slow database hits while keeping content fresh.
- **Zero-Contention WebGL Living Canvas**: Features a continuous GLSL fluid simulation background that initializes during browser idle time and runs at a throttled 30 FPS on mobile to protect your Core Web Vitals (LCP, TBT, INP).
- **Ready for Forking & Rebranding**: Completely decoupled frontend and CMS. You can clone it, customize your schemas, and deploy in minutes.
- **AI-Agent Ready**: Includes ready-to-copy prompts in **[`AGENT_SETUP.md`](./AGENT_SETUP.md)** that allow AI coding assistants (Antigravity, Cursor, Claude Code, Copilot) to personalize and rebrand the entire portfolio in one pass.

---

## 📸 Overview & Architecture

`touseefspace` is designed for engineers, systems architects, and technical creators who need a portfolio that balances **editorial visual elegance** with **real-world production engineering**:

- **⚡ Next.js 16 App Router & Cache Primitives**: Built with `"use cache"`, `cacheTag`, and `cacheLife` for sub-millisecond page transitions and instant edge revalidations.
- **🌊 Ambient WebGL Fluid Simulation**: Monochromatic, continuous living liquid currents rendered via custom GLSL vertex/fragment shaders, synchronized with system/theme preferences and optimized via `requestIdleCallback` to protect main-thread performance.
- **📖 Deep-Dive Editorial Case Studies (`/work/[slug]`)**: Dedicated production breakdown pages with quantified impact metrics, problem-solution narratives, technology chips, and rich Portable Text bodies.
- **📝 Technical Engineering Blog (`/blog/[slug]`)**: Minimalist reading experience featuring Apple-inspired Table of Contents, syntax-highlighted code blocks, and breakout visual cards.
- **🛡️ Resilient Offline Fallbacks**: Zero-config local development! If Sanity is offline or unconfigured, the app automatically falls back to rich built-in data in `lib/placeholders.ts` with 0 crashes.
- **🎯 100/100 Core Web Vitals Focus**: Zero heavy icon packages (native lightweight SVGs), pre-rendered static `<head>` meta tags, Schema.org JSON-LD, and strict `h1 -> h2` accessibility hierarchies.

---

## 📁 Repository Structure

```
├── touseefspace/              # Next.js 16 Web Application (Frontend)
│   ├── app/                   # App Router pages, loading skeletons & routes
│   │   ├── work/[slug]/       # Editorial case studies (SSG / ISR)
│   │   ├── blog/[slug]/       # Engineering articles & TOC
│   │   ├── projects/          # Filterable project spotlight index
│   │   ├── experiences/       # Timeline & role breakdowns
│   │   ├── skills/            # Interactive capability categories
│   │   ├── contact/           # Zero-runtime brand channels & contact form
│   │   ├── sitemap.ts         # Dynamic sitemap generator (/sitemap.xml)
│   │   └── robots.ts          # Search engine crawler directives (/robots.txt)
│   ├── components/            # UI design system, WebGL canvas & layouts
│   ├── lib/                   # GROQ queries, caching tags & placeholder fallbacks
│   └── sanity/                # Sanity client, image URL builder & live preview
│
└── studio-touseefspace/       # Sanity Studio v3 (Content Management)
    ├── category_icons/        # Light-mode SVG icons for skill categories
    ├── category_icons_dark/   # High-contrast dark-mode SVG icons (#F4F4F5 stroke)
    ├── skill_icons/           # 30 normalized SVG icons for individual skills
    ├── schemaTypes/           # Document schemas (skill, skillCategory, project, post, hero)
    ├── scripts/               # Seeding, deduplication & dark icon scripts
    └── sanity.config.ts       # Desk structure, singletons & presentation tool
```

---

## 🚀 Quickstart for Developers

You can run this portfolio locally in under 3 minutes, with or without a Sanity account.

### 1. Clone the Repository
```bash
git clone https://github.com/touseefspace/touseefspace.git
cd touseefspace
```

### 2. Run the Next.js Frontend
```bash
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)**.  
*Because of the built-in fallback system, the site is fully populated and navigable immediately!*

---

## 🤖 AI Agent Quickstart (Cursor, Antigravity, Claude Code, Copilot)

Using an AI coding assistant to customize this portfolio? We've created a ready-to-copy prompt in **[`AGENT_SETUP.md`](./AGENT_SETUP.md)** that guides your agent to:

- 🏷️ **Rebrand Everything in One Go**: Updates your name, role, domain, and social handles across `app/layout.tsx` (metadata, OpenGraph, JSON-LD), `Navbar`, `Footer`, hero captions, and blog author snippets.
- ⚙️ **Sanity & Environment Setup**: Prepares `.env.local` and instructs the agent to utilize Sanity development best practices (`sanity-best-practices`).
- ✍️ **Attribution**: Seamlessly handles optional attribution (*"Based on touseefspace by Touseef Ahmed"*).
- 🧪 **Verification**: Automatically runs `npx tsc --noEmit` and `npm run build` to ensure your personalized version builds with 0 errors.

👉 **[Open AGENT_SETUP.md to copy the prompt](./AGENT_SETUP.md)**

---

## 🛠️ Setting Up Sanity CMS (Content Management)

To manage your own projects, case studies, blog articles, and hero content through a visual dashboard:

### 1. Create a Free Sanity Project
Run this command from inside the `studio-touseefspace` folder:
```bash
cd studio-touseefspace
npm install
```
If you don't have a Sanity project ID yet, run:
```bash
npx sanity init --bare
```
Note your **Project ID** and **Dataset name** (default: `production`).

### 2. Configure Environment Variables
Copy `.env.example` in the `touseefspace` frontend directory:
```bash
cp .env.example .env.local
```
Fill in your Sanity keys:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-02-01"
```

### 3. Seed Sample Content & Asset Icons
The template features a **normalized skills architecture**: skills are first-class, top-level documents in Sanity rather than duplicate strings. Each skill references its parent `skillCategory`, and projects and experiences reference these shared skill entities.

Inside `studio-touseefspace`, create a write token at [sanity.io/manage](https://sanity.io/manage) (under **API** > **Tokens** > **Add API token** with **Editor/Write** permissions), then run:
```bash
SANITY_TOKEN=your_write_token npm run seed
```

This automated seed script:
1. Uploads light-mode icons from `category_icons/` (`code-xml.svg`, `cpu.svg`, `database.svg`, `cloud.svg`, `paintbrush.svg`, `smartphone.svg`).
2. Uploads high-contrast dark-mode icons from `category_icons_dark/` (`#F4F4F5` stroke) to `iconDark`.
3. Uploads 30 tech stack SVG icons from `skill_icons/` (Next.js, TypeScript, Python, Docker, AWS, PostgreSQL, etc.).
4. Creates the 6 canonical `skillCategory` documents (`cat-web`, `cat-ai`, `cat-cloud`, `cat-devops`, `cat-tools`, `cat-mobile`).
5. Seeds 30 normalized `skill` documents with direct category references and proficiency ratings.
6. Seeds 3 comprehensive case studies with metrics, problem-solution narratives, and skill references.
7. Seeds 3 technical engineering articles, 2 career milestones, and 5 social media links.

#### 🔄 Dataset Separation & Management Scripts
The project strictly isolates local development from production to ensure local experiments, drafts, and tests never alter your live site:
- **Local Next.js & Studio**: Connects to the **`development`** sandbox dataset by default.
- **Production Deployment (Vercel)**: Connects to the **`production`** live dataset.
- **Studio Dual Workspaces**: Switch between **Development (Sandbox)** (`/dev`) and **Production (Live)** (`/prod`) directly in the Studio top bar.

```bash
# Safely refresh your local dev sandbox with the latest production content:
npm run dataset:sync-down

# Create timestamped local JSON backups before making major schema/content changes:
npm run dataset:backup-prod
npm run dataset:backup-dev

# Promote approved development data to production (requires confirmation):
npm run dataset:sync-up -- --confirm

# Clean up any legacy duplicate documents or drafts:
npm run clean-duplicates

# Regenerate and sync high-contrast dark-mode category icons:
npm run update-dark-icons
```

### 4. Run Sanity Studio Locally
```bash
npm run dev
```
Open **[http://localhost:3333](http://localhost:3333)** to visually curate your portfolio. You will see top-level navigation for **Projects**, **Skills**, **Skill Categories**, **Experiences**, **Blog Posts**, and the **Home Page**.

### 5. Deploy Updated Studio Online (Sanity Cloud)
Whenever you modify schemas (such as top-level Skills) or update Studio code, deploy your changes to Sanity's free global hosting so your online dashboard reflects your local studio:
```bash
npx sanity deploy
```
1. Sanity CLI will compile your studio and deploy it with automatic SSL.
2. Access your live studio anytime at `https://yourname.sanity.studio`!

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
- Runs Lighthouse across all major pages: `/`, `/projects`, `/projects/wholesale-distribution-erp-platform`, `/skills`, `/experiences`, `/blog`, and `/contact`.
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

## 📄 License

Distributed under the **MIT License**. You are free to fork, customize, and deploy this project for your personal portfolio or client projects. Attribution is appreciated!

---

*Engineered by [Touseef Ahmed](https://touseefspace.com) · Built with Next.js · Powered by Sanity.*
