# 🎨 Sanity Content Studio (`studio-touseefspace`)

This is the content management studio for **touseefspace**, powered by **Sanity v3**. It provides an editorial visual dashboard where you can curate your portfolio projects, deep-dive case studies, technical blog articles, normalized skills, categories, and career milestones.

---

## ⚡ Quickstart Guide

### 1. Initialize or Link a Sanity Project
If you are setting up your own Sanity project for the first time:
```bash
cd studio-touseefspace
npm install
```

If you don't have a Sanity Project ID yet, create or link one by running:
```bash
npx sanity init --bare
```
Follow the interactive prompts to log in, choose or create a project, and specify your default dataset (typically `production` or `development`). Note down your **Project ID**.

> 💡 *Need help setting up your project or Sanity account? Refer to the official [Sanity Getting Started Documentation](https://www.sanity.io/docs/getting-started-with-sanity-cli).*

---

## 🔐 Environment Variables (`.env.local`)

Copy the provided environment template:
```bash
cp .env.example .env.local
```

Configure the following variables in `.env.local`:

```env
# 1. Project & Dataset Configuration
SANITY_STUDIO_PROJECT_ID="your_sanity_project_id"
SANITY_STUDIO_DATASET="development" # or "production"

# 2. Studio Hosting & Deployment (used by 'npx sanity deploy')
SANITY_STUDIO_HOST="your-chosen-subdomain" # e.g. "yourname" -> https://yourname.sanity.studio
SANITY_STUDIO_APP_ID=""

# 3. Write Token (Required for running 'npm run seed')
SANITY_TOKEN="sk..."
```

| Variable | Required | Description |
| :--- | :--- | :--- |
| `SANITY_STUDIO_PROJECT_ID` | **Yes** | Your project ID from [sanity.io/manage](https://sanity.io/manage). |
| `SANITY_STUDIO_DATASET` | **Yes** | Dataset name (`development` for local sandboxing, `production` for live). |
| `SANITY_STUDIO_HOST` | Recommended | The subdomain for Sanity cloud hosting (`https://<host>.sanity.studio`). |
| `SANITY_STUDIO_APP_ID` | Optional | Application ID generated when deploying to Sanity Cloud. |
| `SANITY_TOKEN` | For seeding | Write token with **Editor/Write** permissions (required for `npm run seed`). |

---

## 💻 Local Studio Development

To run the Sanity Studio locally on your computer:

```bash
npm run dev
```

Open **[http://localhost:3333](http://localhost:3333)** in your browser. You can immediately browse documents, edit text, manage media, and preview content in real time.

---

## 🌱 Automated Content Seeding (`npm run seed`)

The studio includes a turnkey seeding script (`scripts/seed-sanity.ts`) that uploads media and populates canonical starter content in seconds.

### How to Seed:
1. Generate an **Editor/Write** API token at [sanity.io/manage](https://sanity.io/manage) (navigate to **API** > **Tokens** > **Add API token**).
2. Save it as `SANITY_TOKEN` in `.env.local` (or pass it directly in your terminal):
   ```bash
   SANITY_TOKEN=your_write_token npm run seed
   ```

### What the Seeder Does:
- **Media Upload**: Ingests starter assets from `seed-assets/` directly to Sanity CDN (dual-theme category SVGs, skill icons, project mockups, and blog covers).
- **Normalized Skills Architecture**: Creates top-level `skill` documents and links them to categories, projects, and experiences with zero duplicate string literals.
- **Idempotency**: Re-running `npm run seed` safely updates or recreates canonical documents without accumulating duplicate items.

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

## 📁 Starter Assets (`seed-assets/`)

All media files used for site onboarding live in `seed-assets/`:
- `category_icons/`: Dual-theme category icons (`*.svg` and `*-dark.svg`).
- `skill_icons/`: Clean technology SVGs.
- `projects/`: Case study mockups and screenshots.
- `blogposts/`: Editorial article cover graphics.
- `socials/`: Adaptive platform icons for footer and contact page.

See [seed-assets/README.md](./seed-assets/README.md) for full formatting details and asset customization guidelines.

---

## 🌐 Configuring CORS Origins

To allow your Next.js frontend to fetch live data from Sanity:
1. Go to [sanity.io/manage](https://sanity.io/manage) -> Select your Project -> **API** -> **CORS origins**.
2. Click **Add CORS origin**.
3. Add your local development URL: `http://localhost:3000`.
4. Add your deployed production domain: `https://yourdomain.com` (or `https://*.vercel.app`).
5. Check **Allow credentials**.

---

## 🚀 Deploying Studio Online (Sanity Cloud)

To host your Studio on Sanity's global edge infrastructure so you can curate content from any browser or mobile device:

```bash
npx sanity deploy
```

1. Enter your chosen studio hostname (e.g. `yourname`).
2. Sanity CLI will build the Studio bundle and deploy it with automatic SSL.
3. Access your live studio anytime at `https://yourname.sanity.studio`!
