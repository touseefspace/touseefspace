# 🎨 Sanity Content Studio (`studio-touseefspace`)

This is the content management studio for **touseefspace**, powered by **Sanity v3**. It provides an editorial dashboard where you can visually manage your portfolio projects, deep-dive case studies, technical blog posts, skills, categories, and career experiences.

---

## ⚡ Quickstart (Local Studio)

### 1. Install Dependencies
```bash
cd studio-touseefspace
npm install
```

### 2. Start the Local Studio
```bash
npm run dev
```
Open **[http://localhost:3333](http://localhost:3333)** in your browser. You can immediately browse documents and edit content in real time.

---

## 📂 Content Schema Structure

The Studio desk is organized into clear editorial sections:

| Section | Type | Description |
| :--- | :--- | :--- |
| **🏠 Home Page Hero** | Singleton | Main headline, subtitle, badges, and call-to-action buttons. |
| **💼 Projects** | Collection | Editorial case studies with problem/solution breakdowns, metrics, gallery mockups, and skill tags. |
| **⚡ Skills** | Collection | Normalized technology entities (Next.js, Python, Docker, etc.) with proficiency ratings and category links. |
| **📁 Skill Categories** | Collection | High-level capability domains with light & dark mode SVG icons. |
| **⏳ Experiences** | Collection | Career milestones, roles, achievements, and company details. |
| **📝 Blog Posts** | Collection | Technical articles and field notes with Table of Contents and Portable Text. |

---

## 🌱 Automated Content Seeding (`npm run seed`)

The studio includes a turnkey seeding script (`scripts/seed-sanity.ts`) that uploads static media and populates canonical starter content in seconds.

### How to Run the Seeder:
1. Generate an **Editor/Write** API token at [sanity.io/manage](https://sanity.io/manage) (under **API** > **Tokens**).
2. Run the seed script:
   ```bash
   SANITY_TOKEN=your_write_token npm run seed
   ```
   *(Alternatively, if you have `SANITY_TOKEN` saved in `touseefspace/.env.local`, simply running `npm run seed` will detect it automatically!)*

### What the Seeder Does:
- **Media Upload**: Ingests assets from `seed-assets/` directly to Sanity CDN (dual-theme category SVGs, skill icons, project mockups, and blog covers).
- **Relational Integrity**: Seeds normalized skills and links them to categories, projects, and experiences with 0 duplicate strings.
- **Idempotency**: Re-running `npm run seed` safely updates canonical documents without creating clutter or duplicate items.

---

## 📁 Starter Assets (`seed-assets/`)

All media files used for onboarding live in `seed-assets/`:
- `category_icons/`: Dual-theme category icons (`*.svg` and `*-dark.svg`).
- `skill_icons/`: Clean technology SVGs.
- `projects/`: Case study mockups and screenshots.
- `blogposts/`: Editorial article cover graphics.
- `socials/`: Adaptive platform icons for footer and contact page.

See [seed-assets/README.md](./seed-assets/README.md) for full formatting details and asset customization guidelines.

---

## 🚀 Deploying Studio Online (Sanity Cloud)

To host your Studio on Sanity's free global edge infrastructure so you can edit content from any device:

```bash
npx sanity deploy
```

1. Enter your chosen studio hostname (e.g. `yourname`).
2. Your studio will be live at `https://yourname.sanity.studio` with automatic SSL and continuous collaboration.
