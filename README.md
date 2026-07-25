# UK Church Software Directory

A statically generated, independent directory that helps UK churches discover,
assess and compare software for administration, giving and ministry.

This repository currently contains the Phase 1 architectural foundation: five
representative software entries, three categories and two guides. It proves the
content, route, filtering, comparison, SEO and maintenance patterns without
pretending to be a complete catalogue.

## Technology

- Astro static site generation
- TypeScript
- Astro Content Collections
- semantic HTML
- plain CSS
- small framework-free browser scripts
- npm

There is no database, CMS, server rendering or hydrated UI framework.

## Requirements

- Node.js 22.12 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Astro prints the local address, normally `http://localhost:4321/`.

## Checks and production build

```bash
npm run check
npm run check:stale
npm run build
npm run preview
git diff --check
```

`npm run check` validates TypeScript, Astro components and every content entry.
`npm run check:stale` exits unsuccessfully when a listing is older than the
configured review threshold. `npm run build` generates the production site in
`dist/`.

The software export is generated from the content collection at
`public/data/software.json` before checks and builds. Do not edit the export by
hand.

## Main structure

```text
src/
  components/       Reusable Astro UI
  config/           Central site and feature configuration
  content/          Software, category and guide entries
  layouts/          Shared page layout and metadata
  pages/            Static routes
  scripts/          Progressive directory and comparison behaviour
  styles/           Design system and responsive CSS
scripts/            Maintenance and export commands
public/             Static assets, robots file and generated data
docs/               Product, implementation and maintenance documentation
```

The validated collection schemas live in `src/content.config.ts`. Field
definitions and templates are documented in `docs/CONTENT_FIELDS.md` and
`docs/content-templates/`.

## Configuration

Edit `src/config/site.json` before production deployment. It controls:

- site name, production URL and description
- contact and social placeholders
- form endpoints and enabled state
- analytics state
- affiliate and sponsored feature flags
- default social image
- stale-listing threshold

`astro.config.mjs` and `public/robots.txt` must use the same production URL.
Placeholder `.example` and `.invalid` values are deliberate.

Forms are static and safely disabled until a real endpoint is configured and the
privacy notice is completed. Analytics, affiliate links and sponsored listings
are also disabled.

## Content maintenance

Software entries are structured JSON so the public data export can be generated
without a second source of truth. Categories and guides use Markdown.

Before publishing or updating an entry:

1. Prefer current official supplier sources.
2. Record the URL, checked date and exact fields each source supports.
3. Leave uncertain values as `unknown` or omit optional fields.
4. Keep supplier facts separate from editorial assessment.
5. Run the full checks and review the rendered page.

See `docs/MAINTENANCE.md` for the complete workflow.

## Deployment

The project produces static output compatible with Cloudflare Pages.

```text
Build command: npm run build
Output directory: dist
Node version: 22.12 or newer
```

GitHub Actions validates pull requests and pushes to `main`. Deployment is not
configured in this foundation phase.

## Editorial boundary

Inclusion is not endorsement. The project does not invent prices, features,
integrations, compliance claims, reviews or hands-on testing. “Not confirmed” is
different from “No”.
