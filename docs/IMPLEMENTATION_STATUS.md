# Implementation Status

## Current phase

Phase 3: initial catalogue research in progress.

## In progress

- A local-only internal maintenance dashboard now creates an accessible HTML
  report, machine-readable report and maintenance CSV from the repository's
  source content. It is excluded from Git and production output; optional live
  link checking remains separate from normal validation.

- A long-form software profile template is being validated with ChurchSuite. It
  keeps factual fields separate from editorial assessment while adding a clear
  decision lens, practical section prompts, limited external-feedback context
  and visible FAQs. The FAQ schema is emitted only when those questions and
  answers are visible on the listing.
- The initial catalogue now includes a Bible study and research category with a
  sourced Logos Bible Study profile. It is deliberately separate from church
  management software because it supports research, preaching and teaching
  rather than people administration.

## Completed

- Astro static project, TypeScript configuration and Cloudflare-compatible output
- Central site, form, analytics, commercial and stale-threshold configuration
- Validated software, category and guide content collections
- Six sourced software entries, four categories and two guides
- Shared layout, accessible design system and reusable cards
- All Phase 1 routes, trust pages, disabled static forms and useful 404 page
- Progressive directory search, filters, sorting, result count and URL state
- Two-to-four-product comparison with URL state and invalid-slug handling
- Canonical, Open Graph, JSON-LD, breadcrumbs, sitemap and robots foundations
- Generated public software JSON export and stale-listing check
- Maintenance documentation, templates and GitHub Actions validation
- Phase 2 audit of architecture, collection validation, directory and comparison
  URL states, generated metadata, forms, static export and deployment settings
- Browser checks of filtered and invalid URL states, comparison limits and
  keyboard controls, and the comparison layout at a 320px viewport
- Browser back/forward support for directory filter and comparison selection
  state, while retaining shareable URLs and progressive enhancement
- A single source of truth for the configured site URL across canonical tags,
  the sitemap integration and generated `robots.txt`
- The Doorway brand direction rolled out across shared layouts, cards, forms,
  directory controls, comparison tables and brand assets
- A canonical design system document, locally hosted Plus Jakarta Sans and a
  single set of shared Doorway tokens for future visual work
- A separate directory filter for products run by a UK-registered organisation,
  with UK registration recorded as a source-backed fact rather than inferred
  from the broader UK-focus assessment

## Architectural decisions

- Astro static site generation
- TypeScript
- semantic HTML
- plain CSS
- vanilla JavaScript or framework-free TypeScript
- Astro Content Collections
- npm
- GitHub as source control
- Cloudflare Pages as host
- no database or CMS for the proof of concept
- URL-based state for filters and comparisons
- evidence-backed product content only
- Software uses structured JSON collection entries so the public export has one
  source of truth; categories and guides use Markdown.
- Unknown facts use three-state values and render as `Not confirmed`.
- Directory and comparison content is generated as static HTML; small browser
  modules progressively enhance it.
- Form endpoints and analytics are disabled centrally by default. Affiliate
  links and sponsored listings are enabled only for confirmed, listing-level
  relationships that are visibly disclosed; the Logos Bible Study listing is
  the first disclosed affiliate use, and no sponsored listing is currently
  published.
- The stale-listing review threshold is 180 days.
- Directory and comparison changes made with select controls create history
  entries; text search updates the current entry to avoid one history entry per
  keystroke.
- `docs/DESIGN_SYSTEM.md` is the source of truth for visual design. The Doorway
  direction uses a warm-grey paper base, plum accent, one Plus Jakarta Sans
  family, 16px card radii, 12px control radii and the aperture mark.

## Known limitations and unverified fields

- The fifty-one entries are representative samples, not a market-wide shortlist.
- All entries remain `Partially verified`; none represents hands-on testing.
- Gift Aid is not confirmed for Planning Center, Breeze ChMS or ChurchTools.
- Data hosting is not confirmed for ChurchSuite, iKnow Church, Planning Center or
  Breeze ChMS.
- Accessibility information, data processing agreements, complete integrations,
  migration scope and contractual details remain incomplete across the sample.
- The production domain, responsible organisation, contact details, reuse
  licence, form service and analytics provider are not selected.
- Forms are deliberately non-submitting and analytics is disabled.
- Deployment is documented but not connected to Cloudflare Pages.
- The sample content was checked for unsupported claims against its recorded
  source notes only; it still needs periodic human re-verification at the
  official supplier URLs before catalogue expansion.

## Phase 2 audit outcome

The Phase 1 foundation was structurally sound: it uses static Astro output,
validated collections, central configuration, small framework-free browser
modules and static directory content. No framework, server adapter, database or
unsupported commercial feature was found.

Material defects found and fixed:

- Browser back and forward navigation did not restore filter or comparison
  controls after URL state changed.
- Astro's sitemap configuration could diverge from the central site URL, and
  the static `robots.txt` repeated that value separately.
- Comparison links containing more than four unique products were clipped
  without explaining the limit.

The comparison remains deliberately horizontally scrollable on small screens;
the table retains scoped headers, a visible caption and an explicit instruction
instead of collapsing factual fields into an ambiguous mobile card layout.

The foundation is ready for carefully researched catalogue expansion once a
production URL and the remaining operational choices are configured. The next
work should not add entries until those launch prerequisites are resolved.

## Next recommended phase

Phase 3: initial catalogue, beginning only after selecting the production URL,
responsible organisation and contact details, connecting a preview deployment,
and deciding the form and analytics arrangements. Keep additions in small,
reviewed evidence-backed batches.

## Maintenance note

Keep catalogue expansion out of Phase 2. Resolve technical and editorial workflow
gaps before adding larger batches of listings.
