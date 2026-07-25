# Implementation Status

## Current phase

Phase 1: architectural foundation complete in the working tree.

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

## Next recommended phase

Phase 2: usability and technical hardening. Prioritise a formal accessibility
review, automated internal-link checks, browser regression coverage for URL
states, production configuration and a preview deployment.

## Maintenance note

Keep catalogue expansion out of Phase 2. Resolve technical and editorial workflow
gaps before adding larger batches of listings.
