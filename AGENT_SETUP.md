# 🤖 AI Agent Setup Prompt (For Cursor, Antigravity, Claude Code, Copilot)

> **Copy and paste the prompt below into your AI coding assistant** (such as Google Antigravity, Cursor, Claude Code, Cline, or GitHub Copilot) to automatically rebrand, customize, and configure this entire portfolio in minutes.

---

```markdown
You are helping me customize and rebrand this open-source portfolio template (based on the touseefspace portfolio by Touseef Ahmed).

Here are my personal details to configure across the project:
- My Full Name: [YOUR FULL NAME e.g. Alex Chen]
- My Brand / Handle: [YOUR BRAND e.g. alexspace or alexchen]
- My Professional Role: [YOUR ROLE e.g. Full Stack & Systems Engineer]
- My Location: [YOUR LOCATION e.g. San Francisco, CA / London, UK / Remote]
- My Domain / Site URL: [YOUR DOMAIN e.g. https://alexchen.dev]
- My Contact Email: [YOUR EMAIL e.g. hello@alexchen.dev]
- My GitHub Username: [YOUR GITHUB e.g. alexchen]
- My LinkedIn / X Handles: [YOUR SOCIALS e.g. in/alexchen, @alexchen]
- Keep original template attribution in footer: [YES / NO] (If YES: "Based on touseefspace by Touseef Ahmed")

### Execution Steps for the Agent:

1. **Brand & Identity Rebranding**:
   - `app/layout.tsx`: Update `metadataBase`, `title`, `description`, `openGraph`, `twitter`, and Schema.org `jsonLd` with my name, role, domain, and social profiles.
   - `components/Navbar.tsx`: Update the brand logo text and wordmark to match my brand name and GitHub link.
   - `components/Footer.tsx`: Update brand name, email link, location, copyright line, and maintain template credit if requested.
   - `components/HomeScrollShowcase.tsx` & `components/HeroSection.tsx`: Update the bottom caption under the hero portrait to display my name with the pulsing green dot on the left, and my role on the right.
   - `app/blog/[slug]/page.tsx`: Update the "Written by" author card snippet with my name, bio, and contact links.
   - `public/site.webmanifest` & `package.json`: Update project title, app name, and author details.

2. **Sanity CMS & Environment Setup**:
   - If available in your environment, leverage Sanity skills or best practices (`sanity-best-practices` / `next-sanity`) to ensure optimal GROQ queries and schema definitions.
   - Create `.env.local` from `.env.example` and set `NEXT_PUBLIC_SITE_URL` to my domain.
   - If I provide my Sanity Project ID (`NEXT_PUBLIC_SANITY_PROJECT_ID`) and Dataset (`NEXT_PUBLIC_SANITY_DATASET`), configure them in `.env.local` and in `studio-touseefspace/sanity.cli.ts` / `studio-touseefspace/sanity.config.ts`.
   - Remind me to run `SANITY_TOKEN=my_write_token npm run seed` inside `studio-touseefspace` to initialize my content, or keep using the offline fallback data in `lib/placeholders.ts`.

3. **Asset Checklist**:
   - Remind me to replace `public/touseef.png` with my own portrait photo.
   - Remind me to replace favicon assets in `public/favicon_io_*` with my personal monogram or logo.

4. **Validation & Typecheck**:
   - Run `npx tsc --noEmit` to ensure zero TypeScript errors.
   - Run `npm run build` in `touseefspace` to verify production compilation succeeds with all routes statically pre-rendered.
   - Report back with a summary of modified files and verification results.
```

---

## What This Prompt Handles Automatically:
1. **SEO & Metadata**: Complete overhaul of `<head>`, OpenGraph, Twitter cards, and Schema.org JSON-LD Person/WebSite entities.
2. **Navigation & Badges**: Cleanly updates navbar wordmarks, footer credits, and hero portrait identity tags.
3. **Author Cards & Editorial Bio**: Replaces author snippets on case studies and technical blog posts.
4. **Resilient Architecture**: Preserves Next.js 16 cache directives (`cacheTag`, `cacheLife`), WebGL fluid background, and responsive styling without breaking any components.
