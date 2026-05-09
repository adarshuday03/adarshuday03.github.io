# Adarsh Uday Personal Site

This repository is a content-first Astro site built to turn the resume, project folders, and future media into a long-lived personal archive rather than a compressed portfolio.

The foundation is already in place for:

- Georgia Tech M.S. in Supply Chain Engineering
- IIT Madras B.Tech in Mechanical Engineering
- scholastic achievements and schooling
- leadership and extracurricular material
- future project folders and asset backfills

## Current Foundation

- Astro static-site scaffold at the repo root
- GitHub Pages deployment workflow in `.github/workflows/deploy.yml`
- Global site copy in `site-content/site.json`
- Shared theme and layout layer in `src/styles`, `src/layouts`, and `src/components`
- Build-time content loading in `src/lib/content.ts`
- Asset publishing script in `scripts/sync-content-assets.mjs`
- Manifest-backed project routing under `src/pages/projects/[slug].astro`
- Twelve project manifests currently scaffolded from the CV, including the original KDOM project and the rest of the GT/IITM project framework

## Repo Structure

### Canonical content

- `btech_iitm/` contains undergraduate project folders
- `ms_gatech/` contains graduate project folders
- `achievements/` is reserved for future canonical non-project content if needed
- Each publishable project lives in its own folder with a `project.json`
- Raw assets stay beside the manifest inside the same folder

### Site copy

- `site-content/site.json` stores editable global content
- Use it for:
  - homepage and about-page copy
  - institution summaries and focus areas
  - achievements and schooling
  - leadership entries
  - extracurricular entries
  - skills
  - contact links

### Theme and layout

- `src/styles/global.css` contains the current visual system and tokens
- `src/layouts/` contains page shells
- `src/components/` contains reusable presentation pieces
- Major frontend redesigns should primarily happen here

### Content loading and routing

- `src/lib/content.ts` defines the site-content and project-manifest contract
- `src/pages/` contains top-level routes and project routing
- `scripts/sync-content-assets.mjs` publishes only manifest-listed assets plus selected root files into `public/content/`

## Editing Workflows

### Update biography, skills, achievements, leadership, or contact details

Edit `site-content/site.json`.

This is the right place for anything that is not a standalone project folder.

### Update an existing project page

Edit the `project.json` inside that project folder.

Use the manifest for:

- title
- summary
- highlights
- sections
- tags
- timeline metadata
- course or context metadata
- asset list

### Add a new project

1. Create a folder inside `btech_iitm/` or `ms_gatech/`
2. Add `project.json`
3. Place raw assets in the same folder if they exist
4. Reference only real filenames in the manifest
5. Run `npm run build`

Important:

- A project can ship with an empty `assets` array if the writeup is ready before the media is ready
- Do not duplicate project copy inside Astro page files
- Keep slugs stable once published unless a redirect strategy is added later

### Redesign the frontend

For a major visual refresh, start here first:

- `src/styles/global.css`
- `src/layouts/`
- `src/components/`

Only change `site-content/site.json` or the manifests if the information architecture itself needs to change.

## Commands

- `npm install` installs dependencies
- `npm run dev` starts local development
- `npm run check` runs Astro diagnostics
- `npm run build` runs asset sync plus production build
- `npm run preview` serves the built site locally

## Deployment

- The repository already contains a GitHub Pages workflow
- Pushes to `main` should trigger the deployment workflow
- Because this is the `adarshuday03.github.io` repository, the expected public URL is `https://adarshuday03.github.io`
- After pushing, verify deployment from the GitHub Actions tab if the site does not update immediately

## AI Agent Quickstart

If an AI agent is dropped into this repository, it should do this first:

1. Read `AGENTS.md`
2. Read this `README.md`
3. Inspect `site-content/site.json` for editable global content
4. Inspect the relevant project folder and `project.json` for project-specific changes
5. Run `npm run check` and `npm run build` after edits

Working rules for agents:

- Academic and research work should prefer canonical project folders with manifests
- Leadership, extracurriculars, skills, and top-level biography belong in `site-content/site.json`
- Frontend revamps should mostly stay inside `src/styles`, `src/layouts`, and `src/components`
- Keep routing generic so new manifests appear automatically
- Do not move raw source assets into `src/`

## Why This Repo Is Ready To Grow

- New projects can be added without changing route files
- Existing sections can be rewritten without touching the visual layer
- The visual layer can be replaced without rewriting the content manifests
- Projects can start as text-only manifests and be enriched later with PDFs, images, video, CAD files, or source downloads
- The repository already supports both incremental content growth and full frontend redesigns

## Natural Next Expansion

- Add richer source assets to the newly scaffolded GT and IITM folders
- Promote leadership or extracurricular items into standalone pages only if they gain enough depth
- Add search or filtering once the archive has enough detailed entries to justify it
- Add alternate visual themes after the content model stabilizes