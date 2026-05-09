# Repo Protocol

This repository is split into four layers. Keep edits inside the right layer.

## 1. Canonical content

- Root content folders are the source of truth: `btech_iitm/`, `ms_gatech/`, and `achievements/`.
- Each publishable project should live in its own folder with raw assets beside it.
- Add a `project.json` file inside the project folder. Do not hardcode project copy in Astro pages.
- Prefer manifest-backed folders for academic, research, internship, and case-study work derived from the CV.

## 2. Site copy

- Global page copy that is easier to edit than the resume lives in `site-content/site.json`.
- Home, about, contact, achievements, leadership, extracurriculars, and skills should be edited there unless a project has its own manifest.

## 3. Theme and layout

- Theme tokens and shared visual language live in `src/styles/global.css`.
- Shared page structure lives in `src/layouts/` and `src/components/`.
- Visual redesigns should stay in theme/layout files and avoid touching content manifests.
- Major frontend revamps should start in `src/styles/global.css`, `src/layouts/`, and `src/components/` before changing schemas or routes.

## 4. Content loading and routing

- Build-time content loading lives in `src/lib/content.ts`.
- Routes live in `src/pages/`.
- The build step copies only manifest-listed assets into `public/content/` through `scripts/sync-content-assets.mjs`.

## Validation commands

- Run `npm run check` after changing site content, loaders, layouts, or routes.
- Run `npm run build` after changing manifests, asset references, or deployment-relevant files.
- Treat `npm run build` as the final verification step before pushing.

## Adding a new project

1. Create or populate the project folder in a canonical content directory.
2. Add `project.json` with metadata, sections, and asset filenames.
3. Keep the referenced files in the same folder.
4. Run `npm run build` to validate the manifest and copied assets.

## Guardrails

- Do not move original source assets into `src/`.
- Do not duplicate project text across multiple files.
- Prefer JSON structure over free-form code edits for new content.
- Keep routing generic so new projects appear from manifests without page changes.
- A project may ship with an empty `assets` array if the narrative is ready before the media is ready.
- Keep leadership, extracurriculars, and skills out of project folders unless they become standalone published entries.