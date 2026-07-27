# Church Software UK

A statically generated, independent directory that helps UK churches discover,
assess and compare software for administration, giving and ministry.

The current catalogue contains researched software listings, categories and
guides. It is not a market-wide shortlist; inclusion is not endorsement.

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
npm run check:guides
npm run check:stale
npm run build
npm run check:sitemap
npm run preview
git diff --check
```

`npm run check` validates TypeScript, Astro components, every content entry and
the mandatory guide baseline. `npm run check:guides` runs the guide standard
check directly; the full editorial rules and legacy migration audit are in
`docs/GUIDE_STANDARD.md` and `docs/GUIDE_AUDIT.md`. The production build repeats
the guide baseline so a non-conforming new guide cannot deploy through the
documented Cloudflare build command.
`npm run check:stale` exits unsuccessfully when a listing is older than the
configured review threshold. `npm run build` generates the production site in
`dist/`. `npm run check:sitemap` confirms that every canonical, indexable HTML
page in that build is present in Astro's generated XML sitemap.

The software export is generated from the content collection at
`public/data/software.json` and the lean client-side shortlist dataset at
`public/data/shortlist.json` before checks and builds. Do not edit either export by
hand.

## Internal maintenance dashboard

Generate the local-only maintainer dashboard with `npm run dashboard`, or use
`npm run dashboard:open` on macOS to generate and open it. It writes
`.internal/dashboard/index.html`, `report.json` and `maintenance-queue.csv`.
Those files are gitignored and a production-build check prevents internal
dashboard files entering `dist/`.

The dashboard's completeness percentage is a private maintenance measure, not
an accuracy or product score. It distinguishes required fields from useful
optional fields and does not expect genuinely inapplicable or unsupported data.
`staleListingDays` in `src/config/site.json` is the single
freshness threshold (currently 180 days). `npm run check:content` performs the
local analysis; optional `npm run check:links` stores cautious live URL results
at `.internal/dashboard/link-check.json`. Blocked or rate-limited automated
requests are not dead-link confirmations.

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
public/             Static assets and generated data
docs/               Product, implementation and maintenance documentation
```

The canonical visual rules are documented in `docs/DESIGN_SYSTEM.md`. The site
uses the Doorway direction: locally hosted Plus Jakarta Sans, warm-grey paper,
a plum accent, restrained borders and the aperture brand mark.

The validated collection schemas live in `src/content.config.ts`. Field
definitions and templates are documented in `docs/CONTENT_FIELDS.md` and
`docs/content-templates/`.

The persistent, evidence-led growth and distribution plan is in
`docs/GROWTH_STRATEGY.md`. It governs future promotion planning; it does not
authorise automatic outreach, publishing or supplier claims.

## Configuration

Edit `src/config/site.json` before production deployment. It controls:

- site name, production URL and description
- publisher, contact and social information
- public contribution routes and enabled state
- analytics state
- affiliate and sponsored feature flags
- default social image
- stale-listing threshold

`src/config/site.json` is the single source of truth for the production URL.
It supplies Astro's sitemap integration and the generated `robots.txt` route,
as well as canonical, Open Graph and structured-data URLs. The publisher and
public correction route are configured in the same file.

Suggestions and supplier updates open a pre-addressed email to
`directory@churchsoftware.co.uk`. They accept public
supplier evidence only; contributors must not submit
church-member, pastoral, safeguarding, financial or other sensitive information.
See `docs/MAINTENANCE.md` for the maintainer triage process. Analytics is
disabled. Affiliate links and sponsored listings must be enabled deliberately
for a confirmed relationship and visibly disclosed on the relevant listing.

## Sitemap maintenance

Astro generates the XML sitemap during every production build. Before pushing
or merging any change that adds, removes or makes a public page indexable, run
`npm run check:sitemap`; GitHub Actions enforces this coverage check for pull
requests and every push.

## AI discovery

`public/llms.txt` is published at `/llms.txt`. It gives AI tools a concise map
of the directory, its core decision tools and the evidence limits that apply to
every profile. Keep it aligned with the public routes, methodology and
editorial boundary when those change.

## Content maintenance

Software entries are structured JSON so the public data export can be generated
without a second source of truth. Categories and guides use Markdown.

Before publishing or updating an entry:

1. Prefer current official supplier sources.
2. Record the URL, checked date and exact fields each source supports.
3. Use `unknown` only as an internal three-state value; omit unsupported
   optional fields from public output.
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


GitHub Actions validates pull requests and pushes to `main`.

## Editorial boundary

Inclusion is not endorsement. The project does not invent prices, features,
integrations, compliance claims, reviews or hands-on testing. Current supplier
material is accepted as evidence for what the supplier publishes. Incidental
gaps are omitted; material gaps become specific supplier questions. “No” is
used only when a suitable source explicitly establishes absence.
