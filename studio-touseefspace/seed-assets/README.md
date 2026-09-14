# 📦 Seed Assets Directory (`studio-touseefspace/seed-assets/`)

This directory centralizes all static media assets ingested by the automated Sanity seed script (`npm run seed`). 

Every folder here directly corresponds 1:1 to content seeded into Sanity CMS. Anyone cloning or forking this repository can customize or replace these assets with their own files before running `npm run seed` for instant full-site personalization.

---

## 📂 Folder Structure & Specifications

| Subdirectory | Purpose | Recommended Formats | File Naming & Conventions |
| :--- | :--- | :--- | :--- |
| **`projects/`** | Hero preview mockups and screenshots for editorial case studies. | `.jpg`, `.png`, `.webp` | Name files after your project slugs or descriptive keys (e.g. `heritage-law-firm.jpg`, `real-time-analytics.jpg`, or `<slug>.png`). |
| **`blogposts/`** | Hero cover images for technical engineering articles and field notes. | `.jpg`, `.png`, `.webp` | Name files after your article slugs or topic keywords (e.g. `barcode.jpg`, `pdfextraction.jpg`, or `<slug>.png`). |
| **`category_icons/`** | Unified icons for skill categories with built-in dual-theme support. | `.svg` | Place both light and dark SVGs in this same folder using the `-dark.svg` suffix for dark mode: `code-xml.svg` & `code-xml-dark.svg`, `cpu.svg` & `cpu-dark.svg`, `database.svg` & `database-dark.svg`. |
| **`skill_icons/`** | Normalized brand and technology SVG icons for skills. | `.svg` | Name after technology slugs (e.g. `next-js.svg`, `react-js.svg`, `typescript.svg`, `python.svg`, `docker.svg`, etc.). |
| **`socials/`** | Theme-adaptive platform icons for the contact page and global footer. | `.svg` | Provide brand SVGs with optional dual-theme support (e.g. `github.svg` & `github-light.svg`, `x.svg` & `x-light.svg`, `linkedin.svg`, `gmail.svg`, `whatsapp.svg`). |

---

## 🚀 Onboarding Workflow (For Repo Clones & Forks)

1. **Personalize Your Projects**:
   - Drop your case study screenshots or UI mockups into `projects/`.
   - Update the project details in `studio-touseefspace/scripts/seed-sanity.ts`.

2. **Personalize Your Articles**:
   - Drop your article cover graphics into `blogposts/`.
   - Update or add your article markdown/metadata in `seed-sanity.ts`.

3. **Add Your Custom Skills & Categories**:
   - Drop normalized technology SVGs into `skill_icons/`.
   - Add matching category icons to `category_icons/` (with a `-dark.svg` counterpart for dark mode).

4. **Run the Seeder**:
   ```bash
   cd studio-touseefspace
   SANITY_TOKEN=your_write_token npm run seed
   ```
   The script will upload all media assets directly to Sanity CDN and wire up all references automatically.
