# Implementation Standards

This document defines how the product should be built. `PROJECT_SPEC.md` defines what should be built.

## General approach

Prioritise:

1. simplicity
2. maintainability
3. factual safety
4. accessibility
5. performance
6. search visibility

Assume one primary maintainer. Avoid clever solutions unless they materially improve the project.

## Repository structure

Prefer a clear structure similar to:

```text
src/
  components/
  content/
    software/
    categories/
    guides/
  layouts/
  pages/
  scripts/
  styles/
  utils/
  config/
public/
  images/
  data/
docs/
```

The exact structure may vary when Astro conventions justify it, but content, presentation, configuration and scripts should remain distinct.

## Configuration

Create one central configuration module for:

- site name
- site URL
- site description
- contact placeholder
- social placeholders
- form endpoints
- analytics state
- default SEO image
- affiliate feature flag
- sponsored listing feature flag
- stale listing threshold

Do not scatter environment-specific values across components.

## Content collections

Create validated collections for:

- software
- categories
- guides

Use narrow enumerations where they genuinely improve consistency. Do not make the schema so rigid that real products cannot be represented honestly.

Separate:

- factual structured fields
- supplier claims
- editorial assessment
- source references

External review-platform references are optional structured metadata, not
directory reviews. Store only a confirmed profile URL, collection scope,
checked date and, where manually or otherwise permissibly recorded, aggregate
figures. Do not scrape platforms, copy individual review content, load widgets
or scripts, or emit rating or review structured data.

Provide templates and field documentation for each collection.

Guides additionally use the mandatory editorial and research rules in
`docs/GUIDE_STANDARD.md`. The schema records each guide's type and standard
version. `scripts/check-guides.mjs` prevents new legacy guides and enforces the
machine-checkable version 1.0 floor during both `npm run check` and the
production build; human editorial review remains required for accuracy, balance
and usefulness.

## Components

Build reusable components only where reuse or clarity justifies them.

Likely components include:

- base layout
- SEO head
- header
- footer
- navigation
- breadcrumbs
- software card
- category card
- guide card
- badge
- verification badge
- product logo fallback
- search box
- filter panel
- result count
- empty state
- pricing summary
- comparison table
- related products
- disclosure notice

Avoid a component for every wrapper element.

## CSS

Use plain CSS.

Use `DESIGN_SYSTEM.md` as the authoritative visual specification. Shared
Doorway tokens and component rules belong in `src/styles/global.css`; page-level
styles should reuse those tokens rather than creating a parallel palette,
type scale or shape language.

Prefer:

- central design tokens with CSS custom properties
- logical properties
- fluid type and spacing
- Grid and Flexbox
- container queries where they improve components
- reduced-motion support
- component-scoped styles where practical

Avoid:

- `!important`
- deep selector nesting
- unexplained magic numbers
- fixed heights for variable content
- duplicated tokens
- large reset or utility libraries

## JavaScript

Use the browser platform before adding dependencies.

Interactive behaviour should:

- progressively enhance static content
- remain keyboard operable
- use URL state
- fail safely
- avoid global mutable state
- avoid rendering the primary content client-side

Directory filters and comparison selection should use small purpose-built modules.

## Search and filtering

Render every listing into static HTML.

Enhance with client-side filtering by:

- text query
- category
- UK focus
- church size
- pricing model
- free plan
- free trial
- Gift Aid support
- open-source status where applicable

Synchronise every selected filter and sort option to query parameters. Invalid parameters should be ignored safely.

## Comparison

Support two to four products. Keep product slugs in the URL.

The comparison table should:

- use structured fields only
- distinguish `No` from `Not confirmed`
- remain readable on mobile
- provide links to complete listings
- allow a comparison link to be copied
- handle missing or invalid products gracefully

## Accessibility

Aim for WCAG 2.2 AA.

Include:

- semantic landmarks
- one `h1` per page
- skip link
- visible focus states
- correctly associated form labels
- accessible validation and error messages
- keyboard-operable controls
- sufficient contrast
- reduced-motion behaviour
- appropriate table headers
- useful screen reader announcements for dynamic result counts
- sensible touch targets

Do not use ARIA where native HTML is sufficient.

## SEO

Implement:

- unique titles and descriptions
- canonical URLs
- sitemap
- robots.txt
- Open Graph metadata
- breadcrumbs
- useful internal linking
- image dimensions
- appropriate lazy loading
- JSON-LD where supported by visible content

Possible schema types:

- `WebSite`
- `Organization`
- `BreadcrumbList`
- `SoftwareApplication`
- `ItemList`
- `Article`
- `FAQPage`, only when the questions and answers are visible

Do not add rating, review, price or offer schema without reliable displayed evidence.

## Performance

Keep client-side JavaScript small and avoid unnecessary hydration.

Use local or system fonts. Optimise images. Avoid blocking third-party scripts.

Target strong Lighthouse results, but do not manipulate tests or sacrifice usability for a number.

## Forms

Keep the first build static.

Form action URLs should be configurable. Include:

- labels
- browser validation
- honeypot
- privacy wording
- accessible success and error placeholders
- minimal personal data collection

Document options for connecting a service later. Do not hard-code a provider unnecessarily.

## Images and product logos

Do not hotlink third-party images.

Use official assets only where appropriate and record provenance. Otherwise use a neutral initials-based fallback.

Do not fabricate official-looking logos.

## Data export

Generate a public JSON export of publishable software data at:

```text
/public/data/software.json
```

Do not expose internal notes or private information.

## Stale content checking

Provide a command:

```bash
npm run check:stale
```

It should report listings whose `lastChecked` date exceeds the configurable review threshold.

## npm scripts

The completed foundation should provide:

```text
npm run dev
npm run check
npm run check:guides
npm run check:stale
npm run build
npm run preview
```

Additional scripts are acceptable when clearly documented.

## Internal maintenance dashboard

`scripts/dashboard.mjs` creates a self-contained local report in
`.internal/dashboard/`, outside Astro's `dist/` output. It reads existing
software JSON and category/guide frontmatter; it is not a second content model,
public route or deployment artifact. The report has a schema version, timestamp,
counts, issues, completeness, freshness, taxonomy and source-health records;
the queue CSV has stable maintenance fields.

Priority rules are explicit: invalid category references, duplicate identifiers
and invalid official URLs are Critical; absent sources, stale or invalid dates
and missing required fields are High; partial verification, useful missing data
and metadata are Medium; logos, short summaries and comparison opportunities
are Low. The optional `check:links` command uses limited-concurrency HEAD
requests and reports blocked automated requests separately from failures.

## Deployment

Use Astro static output.

Cloudflare Pages settings:

```text
Build command: npm run build
Output directory: dist
```

Do not add a server adapter unless server functionality is explicitly approved.

## Testing

Use the lightest testing method that gives meaningful confidence.

Before completing substantial work, verify:

- build success
- content schema validation
- internal links
- default filter state
- query-parameter filter state
- empty filter state
- invalid query parameters
- comparison with valid and invalid product slugs
- mobile layouts
- keyboard operation
- no unsupported factual claims in sample content

Do not install a heavy testing stack merely to test trivial static output.

## Git workflow

Use a feature branch for substantial work. Commit coherent units using Conventional Commits.

Before committing:

```bash
npm run check
npm run build
git diff --check
```

Before pushing or merging a change that adds, removes or makes a public page
indexable, run `npm run check:sitemap`. Astro generates the sitemap from the
static build; this check verifies every canonical, indexable HTML page in
`dist/` appears in it. The GitHub validation workflow runs the same check, so
a pull request with an omitted public page cannot pass validation.

Never push to `main` or merge without explicit instruction.

## Documentation

The implementation must create and maintain:

- `README.md`
- collection entry templates
- field reference documentation
- contributor or maintenance guide
- `docs/IMPLEMENTATION_STATUS.md`

Documentation must describe the real implementation, not intended features that do not yet work.

## Definition of done

A task is complete only when:

- the requested behaviour works
- required checks pass
- factual uncertainty is visible
- affected documentation is updated
- unrelated files have not been changed
- the final report identifies limitations honestly
