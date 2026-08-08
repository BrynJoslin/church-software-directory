# Maintenance guide

## Add or update software

1. Copy `docs/content-templates/software.template.json`.
2. Name the new file after its slug in `src/content/software/`.
3. Confirm the product and official site are active.
4. Research current first-party sources and record what each supports.
5. Use `unknown` only as an internal three-state sentinel; omit unsupported
   optional fields and write material gaps as supplier questions.
6. Use only the controlled keys documented in `docs/CONTENT_FIELDS.md` for
   `decisionEvidence`. Put a genuinely product-specific sourced fact in
   `supplementaryEvidence`; it will be preserved but will not enter comparisons,
   shortlists or the public export.
7. Keep supplier facts outside the `editorial` object and assessment inside it.
8. Run:

   ```bash
   npm run check
   npm run check:stale
   npm run build
   ```

9. Review the listing, affected category pages, filters, comparison and generated
   JSON export.

Do not add large unreviewed batches. A schema change also requires updating every
existing entry, the page templates, `docs/CONTENT_FIELDS.md` and
`docs/IMPLEMENTATION_STATUS.md`.

## Add a category

Copy `docs/content-templates/category.template.md` into
`src/content/categories/`. The filename is the collection ID referenced by
software and guides. Add the corresponding allowed directory-filter value in
`src/scripts/directory.ts`.

Explain when a church may not need specialist software and keep legal, tax and
safeguarding wording appropriately qualified.

## Add a guide

Copy `docs/content-templates/guide.template.md` into `src/content/guides/`.
Read and follow `docs/GUIDE_STANDARD.md` before researching or drafting. Define
the reader, decision, guide type, scope and inclusion criteria before selecting
products. Use only structured or evidence-backed listing information, record
source access dates, name material questions and keep the guide useful without a
supplier click.

Before starting a new guide, check `docs/GUIDE_BACKLOG.md`. Add new search terms
there, group wording variants under a single decision and use its transparent
priority score to select the next brief. Do not create a separate guide for a
minor keyword variation when an existing canonical guide can answer the same
decision.

Complete the standard's human editorial checklist, then run:

```bash
npm run check:guides
npm run check
npm run build
```

A new guide must use `standardVersion: "1.0"` and cannot enter the legacy
allowlist. Update `published` only when the guide first becomes public and
`updated` only after a meaningful editorial review.

The pre-standard migration is recorded in `docs/GUIDE_AUDIT.md`. Do not remove a
slug from `scripts/check-guides.mjs` until its rewrite has passed the complete
standard and rendered-page review.

## Review stale content

The threshold is set in `src/config/site.json`.

```bash
npm run check:stale
```

The command fails when any `lastChecked` date exceeds the threshold. Reviewing a
listing means re-opening its sources, checking material facts and recording
changes or remaining questions. Do not update the date without doing the review.

## Weekly maintenance cycle

On the first Monday of a 13-week cycle, initialise the proposal-only maintenance
state with:

```bash
npm run maintenance:initialise -- --date YYYY-MM-DD
```

The command creates a versioned manifest, non-public review ledger and compact
run report under `maintenance/weekly/`. It uses an ignored concurrency lock
while running and exits if a previous invocation still owns it. It neither
publishes nor deploys content: the current release policy still requires
Bryn's explicit approval for public changes. Future weekly runs must load the
frozen manifest rather than recalculate its allocations.

## Review public feedback scans

Keep the feedback scan date separate from `lastChecked`. Recheck scans after 180 days, or earlier after a major product, app or supplier change. Confirm profile scope, source availability, date range, source-permission position, theme support and contrary evidence. Do not automatically rewrite a public summary from newly found material. Report a misleading scan through `/supplier-update/`; retain the internal challenge and editorial-decision record outside the public repository.

Create or refresh the private scan queue and anonymised evidence ledger with:

```bash
npm run prepare:public-feedback-ledger -- YYYY-MM-DD
```

After the full base query pack has actually been run, add
`--complete-discovery` to record that fact. The generated
`.internal/public-feedback/ledger.json` is ignored by Git; it is not a
publishable evidence store.

## Public data export

`npm run prepare:data` generates `public/data/software.json` and the lean
client-side shortlist dataset at `public/data/shortlist.json` from publishable
software fields. It excludes editorial assessment and any future private notes.
The command runs automatically before checks, builds and local development.
Only the controlled `decisionEvidence` fields enter these decision datasets;
`supplementaryEvidence` remains in the canonical source record for future
research and is not exported.

## Contribution triage

Public suggestions and supplier updates open an email addressed to
`directory@churchsoftware.co.uk`. Each asks for public first-party sources and
instructs contributors not to share church-member, pastoral, safeguarding,
financial or other sensitive information.

1. Read the stated change and its official sources; do not treat a supplier
   submission as confirmation by itself.
2. Check the source is current and supports the exact field claimed.
3. Update the structured listing and source date only when the evidence supports
   it. Keep independent assessment separate from supplier facts.
4. Reply with the outcome: updated, needs clarification, not supported or not in
   scope. Close the issue only after recording that decision.
5. Never put private correspondence or sensitive church information into the
   repository. Ask contributors to remove it and use a safe, confirmed contact
   route once one exists.

## Sitemap

The XML sitemap is generated by Astro during `npm run build`; it includes the
current static routes and collection pages automatically. It is not maintained
as a hand-written list.

When adding, removing or making a public page indexable, run:

```bash
npm run check:sitemap
```

The check verifies that every canonical, indexable page in the built `dist/`
output has exactly one self-referencing canonical derived from its output path
and the configured production origin, and is in the generated sitemap. It also
rejects query or fragment canonicals, cross-origin canonicals and sitemap URLs
that do not represent an indexable self-canonical route. It is mandatory before
pushing or merging such a change and is enforced by GitHub Actions validation.

`npm run check:internal-links` also verifies crawl paths: every indexable route
apart from the homepage needs a static, crawlable incoming link from another
indexable route. Links with query strings, fragments, downloads, external
origins or `nofollow` do not count. The check continues to reject static
one-product comparison query links.

## Search Console indexing follow-up — 8 August 2026

Expected exclusions are filtered query variants that canonicalise to their
path-only hub and intentional HTTP-to-HTTPS redirects. Do not use **Validate
fix** for those states as though they were defects.

Treat sitemap errors, blocked crawling, an incorrect or missing canonical,
`noindex`, 4xx/5xx responses and a genuine orphan route as actionable defects.
Correctly configured pages that Google reports as discovered or crawled but not
selected for indexing remain Google-controlled states: the repository can
verify crawl signals, not guarantee indexing.

After deploying an indexing-validation change:

1. Confirm that Search Console still reports a successful sitemap with the
   complete canonical route set.
2. Inspect one representative category, guide, guide-topic and software-profile
   URL in production.
3. Use **Validate fix** only for a `Discovered – currently not indexed` group
   after confirming those production signals.
4. Recheck after 7–14 days and again after 28 days, recording counts and crawl
   dates rather than claiming guaranteed indexing.
5. If representative URLs still have `Last crawled: N/A` after 14–28 days,
   inspect Cloudflare bot/security settings and production request logs for
   Googlebot access before changing content.
6. If the sitemap remains successful but representative high-value pages still
   lack a crawl date, request indexing for only a small representative set; do
   not repeatedly submit every affected URL.

## Production configuration

Before launch:

1. Confirm `src/config/site.json` has the production URL. This central setting
   supplies Astro's sitemap integration and the generated `robots.txt` route.
2. Confirm the responsible publisher and public correction route.
3. Select and document the structured-data reuse licence.
4. Configure a private form service only after updating the privacy notice,
   testing spam protection and documenting accessible success and error handling.
6. Enable analytics only after choosing a privacy-conscious provider and
   documenting it.

## Cloudflare Pages

Use Node 22.12 or newer.

```text
Build command: npm run build
Output directory: dist
```

The site uses static output and requires no adapter.
