# Implementation Status

## Current phase

Phase 6: contribution and continuous quality completed.

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
- A first evidence-refresh pass has strengthened the UK online-giving listings:
  GoodBox now records its documented Gift Aid data workflow and privacy material;
  KindLink records its published EEA-storage statement, UK data-protection terms
  and account-download detail; Stewardship records current published partner fee
  evidence; and ChurchDesk and ChMeetings record published hosting, privacy,
  export and support material. Hosting locations remain unknown where suppliers
  do not state them clearly.
- The 25 July 2026 website review has been incorporated into
  `docs/ROADMAP.md`. Further net-new catalogue growth is paused until the Phase 3
  completion gate resolves contradictory public status wording, disabled
  interactions, publisher disclosure, related-product relevance and the
  unselected comparison state.
- The next dashboard-prioritised research batch covers Pushpay, SermonAudio,
  Praisenter, Beacon CRM and Donorbox. It adds source-backed privacy, hosting,
  integration, export and support detail where published. The research also
  confirms that Pushpay's current supplier country list excludes UK customers;
  it is retained as market context rather than a current UK purchasing option.

## Completed

- Phase 6 replaces disabled public submission controls with three documented
  GitHub issue-form routes for suggestions, corrections and supplier updates.
  The public route accepts only public supplier evidence and business details;
  triage remains independent of commercial status. The validation workflow now
  covers source-reference integrity, critical static accessibility conditions,
  built internal links, source-health reporting and core interaction states.
- The Phase 5 guided shortlist groups categories into four families and adds a
  URL-shareable, rules-based `/shortlist/` journey. It only returns three to
  five profiles when all selected structured requirements match, explains why
  each appears and exposes remaining unknowns rather than scoring products or
  silently widening the result set. The page includes qualified individual GBP
  starting points where published, never a total-cost estimate, plus a
  print-ready requirements worksheet, supplier questions, trial plan and
  trustee or elder summary. Technical-administration capacity is intentionally
  visible but not filtered because the catalogue does not yet have enough
  evidence to support that rule.
- The Phase 4 evidence layer defines procurement fields, transparent evidence
  states and source-date fallbacks; all 51 listings now have a structured
  problem, differentiator and first-check verdict. The directory no longer
  filters by broad church size while contact bands and operational measures are
  still unconfirmed for much of the catalogue. Profiles expose field-level
  evidence without a score; the public export contains every procurement field;
  and comparison separates differences, shared evidence and supplier questions.
- Guide pages now generate a persistent, scroll-aware `What's in this guide`
  contents panel from their Markdown headings. It remains available while
  reading, keeps the active section visible within an overflowing panel, links
  directly to each section and marks the section currently in view without
  making the guide content client-rendered.
- Phase 3 public-trust work: public catalogue counts now derive from the
  collection; inactive submission controls have been removed; known obsolete
  public-copy phrases are checked; publisher and correction-route gaps are
  explicit launch blockers; related-product links are deterministic and
  explained; and comparison starts honestly empty until two products are chosen.
- A batch review records a 25 July 2026 source-check date for all 51 listings.
  The configured domain returned HTTP 200 through Cloudflare on the same date.

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
- A generated XML sitemap with build-time coverage validation for every
  canonical, indexable public page; validation is required before relevant
  pushes and merges and runs in GitHub Actions
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
- Gift Aid is not confirmed for Planning Center, Breeze ChMS and ChurchCRM.
- Data hosting is not confirmed for ChurchSuite, iKnow Church, Planning Center or
  Breeze ChMS.
- Accessibility information, data processing agreements, complete integrations,
  migration scope and contractual details remain incomplete across the sample.
- The configured production domain returned HTTP 200 through Cloudflare on 25
  July 2026. The responsible organisation, public contact route, reuse licence,
  form service and analytics provider are not selected. The missing publisher
  and contact facts are launch blockers, not placeholder facts to publish.
- Forms expose no submission controls until an endpoint, privacy information,
  spam protection and accessible success/error behaviour are configured.
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
  the `robots.txt` route repeated that value separately.
- Comparison links containing more than four unique products were clipped
  without explaining the limit.

The comparison remains deliberately horizontally scrollable on small screens;
the table retains scoped headers, a visible caption and an explicit instruction
instead of collapsing factual fields into an ambiguous mobile card layout.

The foundation is ready for carefully researched catalogue expansion once the
remaining operational choices are configured. The next work should not add
entries until those launch prerequisites are resolved.

## Next recommended phase

The remaining Phase 3 launch blockers are user-supplied operational facts: the
responsible publisher or organisation, relevant public background and a working
correction contact route. The site must remain non-public until these are
confirmed. Once supplied, configure them in `src/config/site.json`, update the
privacy notice and enable a form only after its endpoint, spam protection and
accessible success/error handling are in place.

## Maintenance note

Do not add more listings until the revised Phase 3 completion gate passes.
Resume catalogue expansion only in small, reviewed evidence-backed batches.
