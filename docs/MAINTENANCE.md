# Maintenance guide

## Add or update software

1. Copy `docs/content-templates/software.template.json`.
2. Name the new file after its slug in `src/content/software/`.
3. Confirm the product and official site are active.
4. Research current first-party sources and record what each supports.
5. Use `unknown` only as an internal three-state sentinel; omit unsupported
   optional fields and write material gaps as supplier questions.
6. Keep supplier facts outside the `editorial` object and assessment inside it.
7. Run:

   ```bash
   npm run check
   npm run check:stale
   npm run build
   ```

8. Review the listing, affected category pages, filters, comparison and generated
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

## Review public feedback scans

Keep the feedback scan date separate from `lastChecked`. Recheck scans after 180 days, or earlier after a major product, app or supplier change. Confirm profile scope, source availability, date range, source-permission position, theme support and contrary evidence. Do not automatically rewrite a public summary from newly found material. Report a misleading scan through `/update-a-listing/`; retain the internal challenge and editorial-decision record outside the public repository.

Create or refresh the private scan queue and anonymised evidence ledger with:

```bash
npm run prepare:public-feedback-ledger -- YYYY-MM-DD
```

After the full base query pack has actually been run, add
`--complete-discovery` to record that fact. The generated
`.internal/public-feedback/ledger.json` is ignored by Git; it is not a
publishable evidence store.

## Public data export

`npm run prepare:data` generates `public/data/software.json` from publishable
software fields. It excludes editorial assessment and any future private notes.
The command runs automatically before checks, builds and local development.

## Contribution triage

Public suggestions, corrections and supplier updates open a GitHub issue form.
Each asks for public first-party sources and instructs contributors not to share
church-member, pastoral, safeguarding, financial or other sensitive information.
GitHub account and anti-abuse controls apply to the submission route.

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
output is in the generated sitemap. It is mandatory before pushing or merging
such a change and is enforced by GitHub Actions validation.

## Production configuration

Before launch:

1. Confirm `src/config/site.json` has the production URL. This central setting
   supplies Astro's sitemap integration and the generated `robots.txt` route.
2. Confirm the responsible publisher and public correction route.
3. Select and document the structured-data reuse licence.
4. Confirm GitHub issue forms remain enabled and review their public-data
   warning before changing contribution routes.
5. Configure a private form service only after updating the privacy notice,
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
