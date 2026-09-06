# 🪐 touseefspace — Developer Portfolio & Case Study Engine

> A high-craft, editorial portfolio and systems architecture showcase engineered with **Next.js 16 (Turbopack)**, **TypeScript**, **Tailwind CSS**, and **Sanity CMS v3**, featuring an ambient **WebGL living fluid canvas**.

[![Version](https://img.shields.io/badge/Version-v4.0.0-emerald)](#)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org/)
[![Sanity v3](https://img.shields.io/badge/Sanity-v3-f03e2f?logo=sanity)](https://www.sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-000000?logo=vercel)](https://turbo.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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
│   │   └── contact/           # Zero-runtime brand channels & contact form
│   ├── components/            # UI design system, WebGL canvas & layouts
│   ├── lib/                   # GROQ queries, caching tags & placeholder fallbacks
│   └── sanity/                # Sanity client, image URL builder & live preview
│
└── studio-touseefspace/       # Sanity Studio v3 (Content Management)
    ├── schemaTypes/           # Document schemas (projects, posts, hero, skills)
    ├── scripts/               # Automated dataset seed script
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

### 3. Seed Sample Content
Inside `studio-touseefspace`, create a write token at [sanity.io/manage](https://sanity.io/manage) (under **API** > **Tokens** > **Add API token** with **Editor/Write** permissions), then run:
```bash
SANITY_TOKEN=your_write_token npm run seed
```
This automatically populates your Sanity dataset with:
- The Home Page Hero singleton
- 3 comprehensive case studies with metrics and problem-solution writeups
- 2 technical blog posts with structured blocks
- All experience milestones, skills categories, and social media channels

### 4. Run Sanity Studio Locally
```bash
npm run dev
```
Open **[http://localhost:3333](http://localhost:3333)** to visually curate your portfolio.

---

## 🌐 Production Deployment Guide

### Deploying the Frontend (Vercel)
1. Push your code to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new) and import your repository.
3. If your repository contains both folders, set the **Root Directory** to `touseefspace`.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`
   - `NEXT_PUBLIC_SITE_URL`: `https://yourdomain.com`
5. Click **Deploy**. Vercel will build and serve your site globally.

### Deploying the Sanity Studio (100% Free on Sanity Cloud)
You do not need an extra server or Vercel project to host your Studio. Sanity provides free global hosting:
```bash
cd studio-touseefspace
npx sanity deploy
```
1. Sanity CLI will ask you to choose a studio subdomain (e.g. `yourname.sanity.studio`).
2. It compiles the studio and hosts it globally with automatic SSL.
3. Access your live studio anytime at `https://yourname.sanity.studio`!

### Configuring CORS Origins
To allow your deployed site to fetch data from Sanity:
1. Go to [sanity.io/manage](https://sanity.io/manage) -> Your Project -> **API** -> **CORS origins**.
2. Add your Vercel production domain (e.g. `https://yourdomain.com` or `https://*.vercel.app`).
3. Check **Allow credentials**.

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
