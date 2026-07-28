# Roadmap

Each phase should leave the project in a working, deployable state. Later phases
must not begin merely because they appear in this document.

## Post-launch direction: 28 July 2026

Church Software UK is live. A competitor review of
ChurchSoftwareDirectory.com found that this project has the stronger UK,
evidence and decision-support proposition, but the competitor communicates its
entry-level promise more quickly. The post-launch goal is therefore:

> Make the surface simpler without making the research shallower.

The dated repository baseline for this plan is 147 software profiles, 17
categories, 13 guides and 549 recorded source references. These figures are
planning context, not public constants. Any public total must be generated from
the live content collection at build time.

The next stages prioritise the complete visitor journey:

| Order | Stage | Primary outcome | Start gate |
| --- | --- | --- | --- |
| Now | Phase 8: acquisition clarity and measurement | A new visitor immediately understands what the site contains, who it serves and where to start. | Site is live; no further gate. |
| Next | Phase 9: directory and profile compression | Visitors can scan the catalogue and reach a useful first answer without absorbing the full evidence record. | Phase 8 interaction baseline is recorded. |
| Next | Phase 10: comparison discovery | People can find and compare two to four relevant products without searching a 147-item checkbox wall. | Compact browsing patterns are stable. |
| Then | Phase 11: free and affordable software cluster | The site earns earlier-stage demand with genuinely UK-relevant, maintainable resources. | Canonical intent and evidence brief approved. |
| Then | Phase 12: visible freshness and dataset integrity | Counts, dates and activity claims are generated from evidence the site can actually support. | Field volatility and review rules agreed. |
| Later | Phase 13: supplier participation and commercial readiness | Suppliers have a clear correction route and any commercial offer remains visibly separate from assessment. | Useful demand and operating capacity demonstrated. |
| Later | Phase 14: original market reporting | The structured dataset produces a defensible, citable view of the UK church-software market. | Coverage and methodology thresholds met. |

### Post-launch delivery rules

- Acquisition clarity comes before more catalogue volume.
- Use “common starting points” rather than “popular” until behaviour data
  supports a popularity claim.
- Preserve complete crawlable static product links while reducing what is shown
  by default to a human visitor.
- Do not create indexable query-parameter pages. Named comparisons and
  alternatives become indexable only when they contain a distinct,
  guide-standard editorial decision.
- Do not build a general grants database until UK eligibility, expiry and
  maintenance can be kept current.
- Do not publish “recently checked”, “changes recorded” or similar activity
  counts until the underlying events can be derived reproducibly.
- Do not call a product “verified” when only supplier identity or
  supplier-provided evidence has been checked.
- Keep every product selection, filter and comparison shareable in the URL.
- Test one small content tranche before expanding a cluster.

## Website review integration: 25 July 2026

The website review identified that the research layer has grown faster than the
decision layer. The next product goal is therefore **decision compression**:
help a church move from a broad catalogue to a defensible shortlist, understand
why each product appeared, estimate what can be estimated, identify unresolved
supplier questions and produce material that can be used in a leadership or
trustee discussion.

This direction does not turn the directory into an automated ranking service.
Recommendations must remain explainable, use structured evidence and be
described as starting points rather than winners. Missing facts are not guessed:
incidental gaps are omitted and material gaps become supplier questions.
AI-assisted research and drafting remain subject to the evidence and human
accountability rules in `AGENTS.md` and `docs/PRINCIPLES.md`.

### Delivery rules arising from the review (completed foundation)

These rules governed Phases 3–6 and are retained as the decision record. Their
completion does not reintroduce the earlier pause on catalogue work; the current
post-launch sequencing rules are above.

- Pause net-new catalogue growth until the Phase 3 completion gate is met.
- Resolve contradictory public wording and dead interactions before adding new
  decision features.
- Confirm the actual production-hosting state before changing privacy or
  deployment wording; the review and repository documentation currently
  disagree.
- Populate publisher identity, contact and relevant background only from facts
  explicitly supplied by the responsible person or organisation.
- Introduce decision-support fields through the content schema, templates,
  export and all existing entries rather than through page-specific data.
- Use deterministic, testable rules for related products and guided starting
  points. Do not use affiliate status, sponsorship or unsupported claims.
- Keep essential state in shareable URLs and preserve static generation.
- Add the lightest automated checks that provide meaningful confidence; do not
  add a large testing stack merely to mirror the review's suggested tooling.
- Treat source monitoring as a way to create reviewable change proposals.
  Automated publication of factual changes is out of scope unless a later,
  explicitly approved policy defines safe fields and confidence thresholds.

### Review backlog mapping

| Review priority | Roadmap destination | Outcome |
| --- | --- | --- |
| P0: public contradictions, disabled forms, publisher disclosure, related products and comparison defaults | Phase 3 (completed) | The existing site is internally consistent; publisher and correction-route facts are publicly configured. |
| P1: mobile font loading, layout stability and render-blocking CSS | Mobile performance follow-up alongside Phase 8 | The homepage reaches a good CLS result without sacrificing accessibility, maintainability or repeat-navigation performance. |
| P1: field evidence, higher-signal decision fields and product-specific verdicts | Phase 4 | The content model can support explainable comparisons and shortlists. |
| P1: guided shortlist and cost estimation | Phase 5 | Users progressively narrow an exact candidate pool and receive up to five explained starting points with qualified cost information. |
| P2: decision packs and category families | Phase 5 | Users can take practical outputs into trials, supplier conversations and governance meetings. |
| P2: continuous quality checks | Phase 6 | Trust, accessibility and consistency regressions are caught before and after release. |
| P2: automated research maintenance | Phase 12 | Official-source changes create evidence-backed review work after demand is validated. |

## Guide quality programme: 25 July 2026

The guide audit found that the editorial layer is inconsistent: eight of the
twelve guides have fewer than 600 body words and omit material parts of the
reader's decision. `docs/GUIDE_STANDARD.md` version 1.0 now defines the mandatory
depth, structure, evidence, UK context, practical tools and publication workflow.
`docs/GUIDE_AUDIT.md` records the baseline and remediation order.

The standard applies to every new guide and substantial revision. The existing
`How to choose church management software` guide was the first version 1.0
exemplar. The migration is now complete: the automated guide check reports 13
version 1.0 guides and no legacy allowlist entries. `docs/GUIDE_AUDIT.md`
preserves the original 12-guide baseline and remediation record.

### Completed workstream: evidence-sensitive guides

- Expand the GDPR supplier-question guide with current ICO and NCSC evidence,
  an answer-assessment method and clear advice limits.
- Expand Gift Aid and online-giving guides with HMRC and Charity Commission
  context, end-to-end workflows, cost and reconciliation tools and current
  first-party product evidence.
- Treat every legal, tax, payment, security and safeguarding statement as a
  high-risk claim requiring authoritative sourcing and careful qualification.

### Completed workstream: buying and cost guides

- Add explicit scope, inclusion criteria, decision criteria and comparable
  option analysis.
- Provide a reusable trial, cost model, requirements list, supplier questions
  or decision record in every guide.
- Cover simpler alternatives, accessibility, ownership, implementation,
  migration and exit when material.
- Add a clearly labelled software-listing section and dated source-and-limits
  section without turning the guide into an endorsement or click-through page.

### Ongoing publication gate

- Every guide uses `standardVersion: "1.0"` and no legacy slugs remain.
- Every evidence-sensitive claim has received human source review.
- `npm run check:guides`, `npm run check`, `npm run build` and
  `git diff --check` pass.
- Every rendered guide has been checked on mobile and desktop for heading
  navigation, table readability, meaningful links and keyboard use.
- Each guide remains useful without a supplier click and produces a concrete
  next step for a church team.

## Mobile performance follow-up: 25 July 2026

The saved mobile PageSpeed Insights report scored performance at 84. Loading
speed was already strong: First Contentful Paint and Largest Contentful Paint
were 1.1 seconds and Total Blocking Time was 0 milliseconds. The material
failure was a Cumulative Layout Shift of 0.314, attributed to the local Plus
Jakarta Sans web font and movement of the complete `main` element. The report
also identified the shared 5.1 KiB stylesheet as render-blocking, with an
estimated saving of 420 milliseconds, and recorded a 220-millisecond render
delay for the hero heading.

The report contained no real-user field data. Treat its score and estimated
savings as lab diagnostics, not production guarantees. Fix the underlying
visual instability before optimising for a headline Lighthouse number.

### Workstream: Font and layout stability

- Preload the local WOFF2 font from the shared layout so the browser can request
  it before discovering the `@font-face` rule in the stylesheet.
- Retest the existing `font-display: swap` behaviour first. If the font still
  swaps after initial layout, test `fallback`; use `optional` only if needed to
  prevent a late swap, because it may leave first-time visitors on the fallback
  font for that navigation.
- Capture a throttled trace at 320px, 360px and approximately 412px to confirm
  whether font metrics change the number of mobile navigation rows and move the
  complete `main` element.
- If navigation wrapping is the remaining cause, replace font-sensitive flex
  wrapping with a deterministic responsive grid. Do not introduce a brittle
  fixed header height that could fail with enlarged text.
- If preloading and stable navigation do not bring CLS below the good threshold,
  investigate a metrics-compatible fallback using `size-adjust`,
  `ascent-override`, `descent-override` and `line-gap-override`.

### Workstream: Critical CSS and request chain

- Test Astro's `build.inlineStylesheets: "always"` setting against the current
  external shared stylesheet.
- Compare cold homepage loading and repeat navigation across several internal
  pages. Inlining removes the render-blocking request but repeats the stylesheet
  in every HTML response instead of allowing one shared cached asset.
- Retain inlining only when measured results justify that transfer trade-off.
  Avoid adding a critical-CSS dependency or a manually duplicated above-the-fold
  stylesheet unless the simpler Astro setting proves insufficient.
- Do not add preconnect hints for these assets: the stylesheet and font are
  same-origin, and the audit reported no additional preconnect candidates.

### Completion gate

- Median mobile CLS across three cold-cache runs is at most 0.1, with 0.05 or
  lower preferred.
- No remaining layout shift is attributed to the web font, mobile navigation or
  hero heading.
- Mobile LCP remains below 2.5 seconds and does not materially regress from the
  recorded 1.1-second result.
- Any CSS inlining decision is supported by cold-load and repeat-navigation
  measurements rather than the PageSpeed estimate alone.
- Layout is checked at 320px, 360px and approximately 412px, on desktop and with
  enlarged text; keyboard behaviour and visible focus remain intact.
- Lighthouse accessibility, best-practices and SEO checks do not regress from
  the recorded 100 scores.
- `npm run check`, `npm run build` and `git diff --check` pass.
- After production deployment, field data is reviewed when enough real-user
  traffic exists; the absence of field data does not block the lab fix.

### Deliverable

A visually stable mobile first load with an evidence-based decision on font
loading and CSS delivery. Re-measure the live homepage before applying the
2026 audit's specific remedies, then complete any remaining work alongside
Phase 8.

## Phase 1: Architectural foundation (completed)

### Goal

Create and validate the complete technical pattern using a small representative
content set.

### Scope

- Astro project and TypeScript configuration
- static output
- content collection schemas
- central site configuration
- layouts and core components
- design tokens and responsive foundations
- homepage
- software index
- individual software page
- categories index and category page
- guides index and guide page
- URL-based directory filtering
- URL-based comparison
- SEO foundations
- sitemap and robots
- methodology and disclosure page skeletons
- templates and maintenance documentation
- Cloudflare Pages compatibility
- quality checks and build

### Deliverable

A small but complete vertical slice that proves the architecture.

## Phase 2: Usability and technical hardening (completed)

### Goal

Make the foundation robust enough for real catalogue growth.

### Scope

- accessibility review
- mobile comparison refinement
- invalid URL-state handling
- internal link checks
- stale listing script
- publishable JSON export
- form templates with configurable actions
- 404 page
- performance review
- automated repository validation
- preview deployment workflow

### Deliverable

A reliable content platform that can accept researched entries safely.

## Phase 3: Catalogue credibility and public trust (completed)

### Goal

Bring the existing catalogue and public trust surfaces to a consistent,
launch-credible standard before adding more products.

The catalogue has already grown beyond the original target to fifty-one
listings. Completion is now based on quality and consistency rather than a
further numerical target.

### Completion record — 25 July 2026

- Public totals derive from the collection; obsolete public status wording is
  checked; and non-functional submission controls have been removed.
- Related-product selection is deterministic, requires meaningful similarity
  and explains the relationship. Comparison opens with an honest empty state
  and preserves valid, invalid and limited URL selections.
- The catalogue received a batch source-date review. Church Software UK is
  configured as the responsible publisher and the public correction route is live.

### Workstream 3.1: Public status and working interactions

- Replace fixed catalogue totals and sample-language with values derived from
  the content collection.
- Audit public pages, metadata and repository-facing copy for prototype,
  engineering-phase and deployment wording that no longer describes reality.
- Add a consistency check for hard-coded public totals and known obsolete
  status phrases.
- When forms are disabled, remove the non-functional form controls and provide
  only a real, clearly labelled contact or issue route if one is configured.
- When forms are enabled later, restore them only with a real endpoint, updated
  privacy information, success and error behaviour, and spam protection.
- Confirm the real hosting and production-domain state before revising privacy
  statements.

### Workstream 3.2: Publisher and AI-use disclosure

- Extend central configuration with optional, validated publisher fields.
- Show the responsible publisher or organisation, a working contact route,
  relevant supplied background, how AI assists the work, the commercial
  inclusion policy and the correction process.
- Omit missing publisher facts rather than filling them with placeholders.
- Keep supplier payment, affiliate and sponsorship disclosures separate from
  editorial assessment.

### Workstream 3.3: Related-product integrity

- Replace alphabetical shared-category fallback selection with deterministic
  similarity scoring.
- Give primary category and intended decision the greatest weight; use UK
  availability, operational scale, pricing model, major capabilities and
  integration breadth only when supported by structured data.
- Require at least two meaningful similarities and exclude candidates linked
  only by a secondary category.
- Display a short, factual explanation of why each related product is shown.
- Add fixtures covering products from materially different categories so a
  generic pair cannot appear across unrelated profiles.

### Workstream 3.4: Comparison entry state

- Do not present an unselected fifty-one-product table as the apparent fallback
  comparison.
- Show an honest empty state until two to four products are selected.
- Preserve selected slugs in the URL, handle invalid or excessive selections,
  keep the table accessible on narrow screens and provide a useful no-JavaScript
  route to product profiles without implying that comparison works without the
  enhancement.
- Defer evidence grouping and supplier-question generation to Phase 4, after
  the supporting field model exists.

### Completion gate

- Every public total agrees with generated content.
- No public page describes the deployed site using obsolete prototype or
  unsupported hosting language.
- Every visible submission action either works or has been removed.
- Source-backed publisher, contact, commercial-policy and AI-use information is
  visible.
- Every related product shares a meaningful primary decision context and shows
  the reason.
- The comparison default, valid URL, invalid URL, two-product, four-product,
  keyboard and mobile states pass.
- Existing listing evidence and source dates have received a batch review; net
  catalogue growth may resume only after this gate.

### Deliverable

A trustworthy catalogue whose public claims and interactions match its actual
state.

## Phase 4: Evidence model and decision-ready comparison (completed)

### Goal

Reshape structured content around the questions a church must answer during
procurement, while preserving source traceability.

### Completion record — 25 July 2026

- All 51 listings use the revised schema and have a structured procurement
  verdict covering the problem, differentiator and first uncertainty to check.
- Profiles and the public export expose sourced procurement fields with
  provenance and checked dates.
- Comparisons group key differences, shared characteristics and questions to
  settle, while keeping an evidenced `No` distinct from a missing answer.
- Content validation checks structured verdict coverage and flags repeated or
  generic wording for editorial review without blocking legitimate factual
  repetition. The broad church-size filter was removed because the replacement
  operational evidence is not complete enough across the catalogue.

### Workstream 4.1: Field-level evidence

- Define a small set of important decision fields and attach a source reference,
  checked date and evidence state to each.
- Use the provenance states `Supplier published`, `Independent source`,
  `Directory tested` and `Needs refresh`, with precise editorial definitions.
- Display sourced fields without an overall completeness or quality badge.
- Migrate every existing entry, templates, field documentation, components and
  the public JSON export in the same schema change.

### Workstream 4.2: Higher-signal decision fields

- Replace the broad church-size claim with evidence-led operational measures
  such as contact or pricing band, multi-site support, administrator limits,
  volunteer usability, implementation complexity and likely technical
  administration.
- Prioritise UK purchasing availability, GBP pricing, VAT treatment, Gift Aid,
  MFA, role-based permissions, audit logs, data-processing agreement, hosting
  and transfers, export formats, migration assistance, UK support hours and
  contract or cancellation terms.
- Make every field optional where the evidence does not support a value.
- Update directory filters only where the new data is complete enough to avoid
  misleading users.

### Workstream 4.3: Product-specific assessment

- Require each opening verdict to identify the relevant problem, the product's
  material differentiator and the first risk or question to investigate.
- Add a content check for repeated generic verdict phrases and high similarity.
- Review flagged copy manually; do not auto-rewrite assessments without checking
  their recorded evidence.

### Workstream 4.4: Comparison as a due-diligence tool

- Group selected-product rows into `Key differences`, `Shared characteristics`
  and `Questions to settle`.
- Open key differences by default and use accessible disclosure controls for the
  other groups.
- Generate a copyable, product-specific supplier-question list from missing or
  stale decision fields.
- Order security, exit, Gift Aid, cost and support evidence ahead of
  low-signal organisation facts.
- Preserve the distinction between an evidenced `No` and a missing answer.

### Completion gate

- All existing entries validate against the revised schema.
- Each important displayed field exposes its evidence state, source and checked
  date.
- No evidence summary is presented as a product score.
- A two-product comparison emphasises differences, separates shared facts and
  produces useful supplier questions.
- Content checks flag generic verdict repetition without blocking legitimate
  repeated factual language.
- Full schema, route, export, accessibility and build checks pass.

### Deliverable

Profiles and comparisons that turn recorded evidence and uncertainty into
clear due-diligence work.

## Phase 5: Guided shortlist and decision outputs (completed)

### Goal

Help a church move from its operational problem to a small set of explainable
starting points and practical next steps.

### Completion record — 25 July 2026

- Existing categories are organised into four navigation families without
  changing their routes or product membership. Administration, finance and
  giving are prominent starting points, alongside the remaining categories.
- The `/shortlist/` journey uses URL-encoded answers and deterministic,
  published rules. It starts with category, asks one useful question at a time
  and shows the exact remaining count after every answer. Zero-result and
  no-change answers are not offered.
- Detailed results show up to five profiles while retaining a complete compact
  list when more match. One or two supported matches remain visible rather than
  becoming an artificial empty state.
- Each starting point explains the matching recorded facts, material questions,
  a first workflow to test and—only where a public GBP starting point exists—a
  qualified pricing reference. It never calculates a quote or total cost.
- A printable decision pack produces a requirements worksheet, supplier
  questions, four-week trial plan and trustee or elder decision summary from
  the selected answers and shortlist.

### Workstream 5.1: Category families

- Group existing categories under four top-level families:
  `Church administration and people`, `Finance, giving and bookings`,
  `Services, worship and media`, and
  `Websites, communication and discipleship`.
- Keep existing category routes and multi-category membership.
- Give administration, finance and giving greater prominence in the first
  journey without implying endorsement or hiding other categories.

### Workstream 5.2: Find suitable starting points

- Build a rules-based, progressively enhanced journey beginning with category,
  then considering approximate contact band, strong UK-specific evidence, Gift
  Aid need and integrated versus specialist preference one question at a time.
- Display an answer only when it leaves a positive count smaller than the
  current candidate set. Skip unusable questions and show results when none
  remain.
- Encode answers and the resulting shortlist in the URL.
- Return up to five detailed starting points only when the evidence supports
  them, while keeping the full matching set visible.
- Explain why each product appeared, which requirements are evidenced, which
  questions remain and the first real workflow to test.
- Publish the rules and tie handling. Do not label the output `best`, use an
  overall score or use commercial relationships as ranking inputs.
- Provide a useful no-result state that helps the user relax or verify
  requirements rather than silently widening the rules.

### Workstream 5.3: Qualified cost estimation

- Introduce structured pricing rules only for products whose public pricing can
  be represented faithfully.
- Separate subscription, transaction, implementation, add-on and tax questions.
- Show the pricing date, currency, assumptions and unresolved costs.
- Use `Pricing by quote` or `Written quote required` rather than estimating
  quote-based or ambiguous charges.

### Workstream 5.4: Practical decision pack

Start with a small complete set rather than all proposed outputs:

1. Requirements worksheet.
2. Supplier question pack.
3. Four-week trial plan.
4. Trustee or elder decision summary.

Generate printable static HTML from the selected category, answers and shortlist.
Add Markdown or CSV downloads only where the format remains accessible and
maintainable. Defer migration readiness, data exit, responsibility matrix and
the full `Do we need software?` assessment until the first four resources have
been tested.

### Completion gate

- Representative scenarios return an exact positive candidate count and up to
  five explainable starting points, including one-product and early-finish
  cases.
- Every reason is traceable to structured evidence and material questions are
  visible.
- Cost output never invents or extrapolates an unsupported price.
- URL-loaded, invalid, empty, keyboard, reduced-motion and mobile states work.
- Users can print a coherent decision pack without a server or live language
  model.

### Deliverable

An explainable church software decision assistant built from static content and
deterministic rules.

## Phase 6: Contribution and continuous quality (completed)

### Goal

Make corrections manageable and catch regressions before public launch.

### Completion record — 25 July 2026

- Supplier update now serves the correction and update path. Public contribution
  actions open a pre-addressed email until a reviewed first-party submission
  service is justified.
- Validation now checks structured evidence references, affiliate consistency,
  generated internal links and critical static accessibility conditions. The
  build fails when these checks, sitemap coverage or content validation fail.
- Interaction-state tests cover shortlist bounds, strictly narrowing questions
  and exhausted-question behaviour plus
  the directory, comparison and printable decision-pack safeguards. GitHub
  Actions runs these, freshness, verdict, source-health and production-build
  checks on every push and pull request.
- Source checks write a local report, distinguish blocked or rate-limited hosts
  from failures, and fail only for confirmed HTTP 404 or 410 source URLs.

### Scope

- working software suggestion, error report and supplier update routes
- spam protection, triage process, evidence requirements and privacy wording
- generated-count and contradictory-copy checks
- broken internal-link and source-health checks
- content-schema, evidence-reference and verdict-similarity checks
- automated tests for directory, comparison, shortlist and decision-pack states
- accessibility checks for critical templates and interactions
- performance diagnostics using Lighthouse where useful
- preview deployment workflow

Choose the lightest suitable tooling. Playwright or an accessibility library may
be added only if its maintenance cost is justified by coverage that existing
build-time and browser checks cannot provide.

### Completion gate

- Every public submission action completes a real, documented workflow.
- Critical interaction states and WCAG 2.2 AA risks are covered.
- Builds fail on contradictory totals, broken internal routes, invalid evidence
  references and material accessibility regressions.
- External sites that block automation are reported separately from confirmed
  broken links.

### Deliverable

A sustainable accuracy workflow and a release candidate protected by proportionate
quality checks.

## Phase 7: Launch (completed)

### Goal

Publish a credible first public decision resource.

### Completion record — 28 July 2026

- The production site is live at the configured Cloudflare-hosted domain.
- Google Analytics 4 is configured behind an explicit accept-or-reject consent
  choice, with supplier referral measurement implemented.
- Static catalogue, category, guide, shortlist, comparison, trust and
  contribution routes are published.
- The post-launch roadmap now starts with proposition clarity and measurable
  decision use rather than treating deployment as the remaining milestone.

### Scope

- final factual and editorial audit
- accessibility and performance audit
- broken-link review
- confirmed publisher, production domain and responsible organisation
- Cloudflare Pages production deployment
- search engine verification and sitemap submission
- privacy-conscious analytics, if a provider has been explicitly selected
- baseline decision-support metrics

Privacy-conscious events may cover shortlist completion, product selection,
comparison creation, comparison-link copying, supplier-question copying,
decision-pack download, official product-link opening, return to a saved
comparison, and zero-result searches or filters. Do not collect church-member,
pastoral or other sensitive information.

### Deliverable

Version 1.0.

## Phase 8: Acquisition clarity and measurement

### Goal

Make the homepage an immediately understandable acquisition surface for UK
church-software decisions, then measure whether visitors take a useful next
step.

### Scope

- Lead with the concrete phrase “Find church software that works in the UK”.
- State the current generated product count and explain that profiles cover
  pricing, Gift Aid, UK availability, data handling, exports and practical fit
  where evidence is available.
- Add a homepage search form that submits to the directory's existing `q`
  parameter and remains useful without JavaScript.
- Show four common starting categories selected editorially from the core
  decision set. Do not label them “popular” until measured use supports that
  claim.
- Add a compact, build-derived trust strip: researched profiles, dated source
  links, UK-specific checks and no paid rankings.
- Present three clear routes: browse by task, compare known products and build
  a guided shortlist.
- Reduce the homepage category display to a manageable starting set, retaining
  a crawlable route to every category.
- Rewrite the homepage title, meta description and first substantial paragraph
  around the concrete proposition so the intended search snippet is not
  dominated by category copy.
- Add consent-respecting events for homepage search, directory entry,
  comparison entry and shortlist start. Keep event payloads free of sensitive
  church information.
- Record the Search Console, Bing Webmaster Tools and analytics baseline where
  access is available. Lack of third-party access does not prevent the
  usability work.

### Completion gate

- The first viewport answers what the site is, who it is for, the current scale
  and the primary next action.
- Homepage search reaches a URL-loaded directory result with and without
  JavaScript.
- Every displayed catalogue count comes from the content collection; no public
  template repeats a manual total.
- The page has one `h1`, visible focus, at least 44px touch targets and a useful
  layout at 320px, 360px, approximately 412px and desktop widths.
- Metadata, canonical, Open Graph and visible copy remain aligned.
- Relevant interaction, accessibility, internal-link, sitemap, build and
  diff checks pass.

### Measure

- homepage-to-directory, homepage-to-shortlist and homepage-to-comparison rate
- homepage search use and zero-result terms
- organic homepage impressions, click-through rate and query relevance
- consent rate as measurement context, not a conversion target

### Deliverable

A clear, search-led homepage and a dated post-launch acquisition baseline.

## Phase 9: Directory and profile compression

### Goal

Let a visitor scan a large catalogue quickly while preserving the full
evidence-led record and complete static HTML.

### Directory and category scope

- Replace the current long default card with a compact scan layer: name,
  one-sentence description, published starting-price summary where available,
  one relevant UK or Gift Aid signal, one best-fit phrase, last-checked date and
  a comparison action.
- Initially reveal a small, tested number of results, expected to be 20, with an
  accessible “show more” control. Keep every product link in server-rendered
  HTML and show all listings when enhancement is unavailable.
- Make filtering and sorting operate on the complete result set, not only the
  currently revealed cards.
- Preserve every existing filter in the URL, restore URL-loaded and
  back/forward states and retain the evidence-sensitive empty state.
- Apply the same compact hierarchy to category results where long card lists
  currently dominate the page.
- Defer a list/grid preference until testing shows that two presentations solve
  a real need.

### Product-profile scope

- Put a “30-second answer” immediately after the product identity and primary
  actions.
- Answer from existing structured evidence: what it is, contexts worth testing,
  published starting price, relevant UK checks, why it may enter a shortlist,
  the first unresolved question and evidence date.
- Follow with a five-minute assessment and then the full due-diligence record.
- State the methodology boundary once near the summary, then use decisive
  labels such as “Shortlist when”, “Check first” and “Settle before buying”
  within the evidence boundary.
- Do not turn absent evidence into a negative answer or auto-generate editorial
  conclusions from incidental fields.

### Completion gate

- Default, URL-loaded, empty, invalid-parameter and no-JavaScript states remain
  useful.
- A keyboard user can reveal results, filter, sort and add a product to a
  comparison without losing context.
- Compact cards use only structured facts and approved editorial fields.
- The full profile remains available in document order and all source links,
  disclosures and material supplier questions remain visible.
- Mobile, enlarged-text and 200% zoom checks pass without clipped controls or
  hidden information.

### Measure

- directory searches and filters per session
- zero-result and clear-filter use
- product-profile opens from result cards
- comparison additions from cards and profiles
- result-reveal depth

### Deliverable

A compact browse layer and a three-level product profile: 30-second answer,
five-minute assessment and full due diligence.

## Phase 10: Comparison discovery and high-intent paths

### Goal

Make it easy to assemble a relevant comparison and use comparison demand to
select future editorial pages.

### Scope

- Replace the complete checkbox grid with four clearly labelled, searchable
  product selectors implemented with small framework-free TypeScript.
- Retain an accessible static fallback that exposes the full product list.
- Allow the available options to be narrowed by category and prevent duplicate
  products, invalid slugs and selections above four.
- Preserve the existing canonical URL state, browser history, copy-link
  behaviour, field-level evidence grouping and supplier-question output.
- Add deterministic “compare similar products” routes from profiles using the
  existing related-product logic and a clear reason for the relationship.
- Add a small set of editorially selected “comparison starting points” only
  where both profiles have adequate comparable evidence. Do not call them
  popular until analytics supports that description.
- Use repeated on-site combinations and Search Console demand to choose the
  first new direct-comparison or alternatives guide. A query URL alone is not
  an indexable versus page.

### Initial comparison candidates to validate

- ChurchSuite and iKnow Church
- ExpensePlus and Liberty Accounts
- ProPresenter and EasyWorship
- ChurchSuite and ChurchTools
- Parish Giving Scheme and Stewardship

These are research candidates from the competitor report, not claims that the
products are equivalent or the combinations are popular.

### Completion gate

- Search and selection work with keyboard, pointer, screen reader and mobile
  layouts.
- Valid two-to-four-product URL states restore exactly; invalid, duplicate and
  overflow values receive clear feedback.
- The complete comparison remains based on structured fields and distinguishes
  an evidenced `No` from no answer.
- Any new indexable comparison guide passes `docs/GUIDE_STANDARD.md`, has
  distinct decision intent and is included in the sitemap and internal-link
  system.

### Measure

- comparison starts, valid two-product states and completed comparisons
- most frequent valid combinations
- comparison-link and supplier-question copies
- profile visits and supplier referrals from a comparison

### Deliverable

A searchable comparison journey and an evidence-based queue of named
comparison opportunities.

## Phase 11: UK free and affordable software acquisition cluster

### Goal

Reach churches earlier in their search with a clear savings-oriented entry
point that remains specific to UK eligibility and real operating trade-offs.

### First tranche

- Turn the existing free church-management guide into the canonical anchor for
  a broader free-and-affordable cluster.
- Create one substantial UK free-software hub only when its evidence brief,
  canonical intent and relationship to the existing guide are explicit.
- Prepare no more than two supporting pages in the first tranche. The strongest
  candidates are free church presentation software and software discounts for
  registered UK charities.
- Link source-backed free-plan and charity-discount facts to directory filters
  and full product profiles without implying that “free” means suitable or
  costless to operate.
- Give every page a simpler-tool section, UK eligibility checks, implementation
  and exit costs, last-checked dates and a practical selection output.
- Add the cluster to the homepage only after the first anchor is complete.

### Deferred within this stage

- A grants and funding directory is deferred until eligibility, closing dates,
  geography and review ownership can be maintained reliably.
- Free Church of England tools may become a focused resource only when the
  scope adds more than a thin denomination filter.
- Do not create many narrowly varied “free” pages or import US 501(c)(3),
  dollar-denominated or ACH assumptions into UK guidance.

### Completion gate

- Search Console or another dated source supports the intended query, or the
  page has a separately documented direct-distribution use.
- Every material product, price, eligibility and funding claim has a current
  suitable source and checked date.
- The new page does not duplicate an existing guide, category or filter state.
- Each guide passes the guide standard and supplies a useful decision tool or
  next step without requiring a supplier click.
- The first tranche is measured for at least one review cycle before further
  pages are approved.

### Measure

- relevant impressions, clicks and ranking queries for free/affordable intent
- directory filter use and profile opens from the cluster
- assisted shortlist and comparison starts
- maintenance time and stale-claim count

### Deliverable

A small, maintainable UK free-and-affordable software cluster that earns
top-of-funnel demand without becoming a generic grants catalogue.

## Phase 12: Visible freshness and dataset integrity

### Goal

Make freshness and scale demonstrable product features rather than marketing
claims.

### Scope

- Add build-time consistency checks for public totals, category membership,
  empty live categories, duplicate product identities and incompatible
  publication statuses.
- Define central volatility rules for fields such as pricing, availability,
  privacy/data terms and affiliate-linked profiles.
- Surface the most relevant field-level checked dates near the product summary
  where the evidence model supports them.
- Show a clear stale warning for a material volatile field only after the
  threshold and wording have been approved.
- Prioritise affiliate-linked and high-use profiles in the maintenance queue;
  commercial value must never weaken or hide the stale warning.
- Add a “recently checked” homepage or directory section only when several real
  review dates exist and the displayed set can be derived reproducibly.
- Introduce a structured change record before claiming numbers such as pricing
  changes recorded or products added in a period. Git commits or a batch-wide
  `lastChecked` date alone do not establish those events.

### Completion gate

- A deliberate count mismatch, empty category, duplicate identity and stale
  volatile field each fail or warn at the documented level.
- Public activity and freshness statements can be reproduced from the canonical
  dataset or structured change record.
- The public wording distinguishes “profile rechecked”, “supplier evidence
  updated” and “product changed”.
- Internal history or maintenance data is not leaked into the public export.

### Measure

- stale profiles and material stale fields
- median review age by field family
- confirmed changes per review cycle
- maintenance time per profile
- supplier corrections generated by visible evidence dates

### Deliverable

A trustworthy freshness layer with reproducible totals, dates and change
language.

## Phase 13: Supplier participation and commercial readiness

### Goal

Make it easy for suppliers to improve factual accuracy and understand the
commercial boundary without buying editorial influence.

### Scope

- Expand the existing supplier-update route into a clear “For software
  suppliers” journey, or add one focused landing page if the correction route
  would otherwise become overloaded.
- Explain how to correct a listing, what evidence to provide, how
  supplier-provided evidence is labelled and what the directory may decide not
  to change.
- Define any future supplier status precisely. Prefer “supplier evidence
  reviewed on [date]” over an ambiguous “verified product” badge.
- Explain what sponsorship and affiliate relationships can and cannot buy,
  while keeping commercial formats disabled until separately approved.
- Describe the audience with measured, date-bounded figures only after useful
  traffic exists.
- Keep the first version static and contact-led; do not add a portal, account
  system or database without a demonstrated workflow need.

### Commercial pilot gate

- Relevant traffic and supplier referrals are measured over a meaningful
  period.
- Listing correction, dispute, disclosure and stale-affiliate procedures have
  been tested.
- Inventory, price, contract, tax treatment and fulfilment capacity have been
  decided by the responsible human.
- Sponsored and affiliate presentation passes accessibility, public-copy and
  disclosure checks and does not influence selection or ranking.

### Deliverable

A credible supplier participation page and a documented, still-disabled
commercial model ready for a separate human decision.

## Phase 14: Original market reporting and validated scale

### Goal

Turn the structured evidence base into original, citable UK market insight.

### Scope

- Define coverage, inclusion, field-completeness, freshness and methodology
  thresholds before calling any output a market report.
- Preserve the controlled taxonomy and aggregate only comparable, current
  fields.
- Publish bounded findings on topics such as pricing transparency, Gift Aid
  workflow evidence, export information, UK purchasing routes and data-term
  availability.
- Explain the difference between supplier-published evidence, independent
  sources and directory testing.
- Seek expert or sector review for higher-risk interpretations.
- Prepare distribution to denominations, dioceses, church networks, sector
  publishers and suppliers only through separately approved outreach.

### Candidate deliverable

*The State of UK Church Software 2027*, or a smaller pilot briefing if the
dataset does not yet justify market-wide language.

### Completion gate

- The report can be reproduced from a versioned dataset and documented method.
- Every denominator, exclusion and checked period is visible.
- The title and conclusions do not imply exhaustive market coverage unless that
  has been demonstrated.
- The report is valuable without lead capture, affiliate clicks or supplier
  sponsorship.

## Post-launch validation period

### Goal

Determine whether each new stage improves relevant decision use enough to
justify the next one.

### Suggested period

Review after each release and make a formal continue, revise, pause or stop
decision every four to six weeks. Use a three-to-six-month view for slower
organic-search and maintenance signals.

### Measure

- indexed pages, organic impressions, clicks and search terms
- guided-shortlist starts and completions
- products added to a shortlist
- comparisons created and revisited
- comparison links and supplier questions copied
- decision packs downloaded
- official product links opened
- zero-result searches and filter combinations
- correction submissions
- maintenance time and evidence freshness
- pages and decision tools that attract no meaningful use

### Decision

Continue, narrow, reposition or stop based on evidence. A later stage is not a
reward for finishing the previous build: it starts only when the preceding
outcome and maintenance burden justify it. Do not begin automated factual
publishing, user reviews, commercial ranking or large-scale content generation
because engagement alone appears promising.
