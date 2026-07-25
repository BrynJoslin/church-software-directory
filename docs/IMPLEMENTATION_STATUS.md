# Implementation Status

## Current phase

Phase 2: usability and technical hardening complete.

## Completed

- Astro static project, TypeScript configuration and Cloudflare-compatible output
- Central site, form, analytics, commercial and stale-threshold configuration
- Validated software, category and guide content collections
- Five sourced software entries, three categories and two guides
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
- Form endpoints, analytics, affiliate links and sponsored listings are disabled
  centrally by default.
- The stale-listing review threshold is 180 days.
- Directory and comparison changes made with select controls create history
  entries; text search updates the current entry to avoid one history entry per
  keystroke.

## Known limitations and unverified fields

- The five entries are representative samples, not a market-wide shortlist.
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
