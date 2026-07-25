# Roadmap

Each phase should leave the project in a working, deployable state. Later phases
must not begin merely because they appear in this document.

## Website review integration: 25 July 2026

The website review identified that the research layer has grown faster than the
decision layer. The next product goal is therefore **decision compression**:
help a church move from a broad catalogue to a defensible shortlist, understand
why each product appeared, estimate what can be estimated, identify unresolved
supplier questions and produce material that can be used in a leadership or
trustee discussion.

This direction does not turn the directory into an automated ranking service.
Recommendations must remain explainable, use structured evidence and be
described as starting points rather than winners. Unknown facts remain unknown.
AI-assisted research and drafting remain subject to the evidence and human
accountability rules in `AGENTS.md` and `docs/PRINCIPLES.md`.

### Delivery rules arising from the review

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
| P0: public contradictions, disabled forms, publisher disclosure, related products and comparison defaults | Phase 3 (completed; launch blockers recorded) | The existing site is internally consistent; publisher and correction-route facts remain explicit pre-launch blockers. |
| P1: mobile font loading, layout stability and render-blocking CSS | Mobile performance follow-up before Phase 7 | The homepage reaches a good CLS result without sacrificing accessibility, maintainability or repeat-navigation performance. |
| P1: field evidence, higher-signal decision fields and product-specific verdicts | Phase 4 | The content model can support explainable comparisons and shortlists. |
| P1: guided shortlist and cost estimation | Phase 5 | Users receive three to five explained starting points and qualified cost information. |
| P2: decision packs and category families | Phase 5 | Users can take practical outputs into trials, supplier conversations and governance meetings. |
| P2: continuous quality checks | Phase 6 | Trust, accessibility and consistency regressions are caught before launch. |
| P2: automated research maintenance | Phase 9 | Official-source changes create evidence-backed review work after demand is validated. |

## Guide quality programme: 25 July 2026

The guide audit found that the editorial layer is inconsistent: eight of the
twelve guides have fewer than 600 body words and omit material parts of the
reader's decision. `docs/GUIDE_STANDARD.md` version 1.0 now defines the mandatory
depth, structure, evidence, UK context, practical tools and publication workflow.
`docs/GUIDE_AUDIT.md` records the baseline and remediation order.

The standard applies immediately to every new guide and substantial revision.
The existing `How to choose church management software` guide is the first
version 1.0 exemplar. Eleven pre-standard guides remain in an explicit legacy
allowlist so the normal build stays deployable while they are researched and
rewritten carefully; no new slug can enter that allowlist.

### Workstream: evidence-sensitive guides

- Expand the GDPR supplier-question guide with current ICO and NCSC evidence,
  an answer-assessment method and clear advice limits.
- Expand Gift Aid and online-giving guides with HMRC and Charity Commission
  context, end-to-end workflows, cost and reconciliation tools and current
  first-party product evidence.
- Treat every legal, tax, payment, security and safeguarding statement as a
  high-risk claim requiring authoritative sourcing and careful qualification.

### Workstream: buying and cost guides

- Add explicit scope, inclusion criteria, decision criteria and comparable
  option analysis.
- Provide a reusable trial, cost model, requirements list, supplier questions
  or decision record in every guide.
- Cover simpler alternatives, accessibility, ownership, implementation,
  migration and exit when material.
- Add a clearly labelled software-listing section and dated source-and-limits
  section without turning the guide into an endorsement or click-through page.

### Completion gate before launch

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
loading and CSS delivery, completed before the Phase 7 launch audit.

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

## Phase 3: Catalogue credibility and public trust (completed; launch blockers recorded)

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
- The catalogue received a batch source-date review. The completion gate is met
  for the implemented site, but publication remains blocked until a responsible
  publisher, public correction route and related operational facts are supplied.

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
- Omit unknown publisher facts rather than filling them with placeholders.
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
  unverified hosting language.
- Every visible submission action either works or has been removed.
- Verified publisher, contact, commercial-policy and AI-use information is
  visible, or the missing user-supplied facts are explicitly recorded as a
  launch blocker.
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
procurement, while preserving uncertainty and source traceability.

### Completion record — 25 July 2026

- All 51 listings use the revised schema and have a structured procurement
  verdict covering the problem, differentiator and first uncertainty to check.
- Profiles and the public export expose procurement fields with evidence state,
  source and checked-date fallbacks; evidence summaries are explicitly not
  product scores.
- Comparisons group key differences, shared characteristics and unresolved
  supplier questions, while keeping `No` distinct from `Not confirmed`.
- Content validation checks structured verdict coverage and flags repeated or
  generic wording for editorial review without blocking legitimate factual
  repetition. The broad church-size filter was removed because the replacement
  operational evidence is not complete enough across the catalogue.

### Workstream 4.1: Field-level evidence

- Define a small set of important decision fields and attach a source reference,
  checked date and evidence state to each.
- Use the states `Confirmed`, `Independently evidenced`, `Supplier claim`,
  `Not confirmed` and `Possibly outdated`, with precise editorial definitions.
- Calculate and display a profile evidence summary without turning it into a
  quality score or product rating.
- Keep the existing overall verification status as a broad editorial workflow
  state.
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
- Make every field optional or explicitly unknown where the evidence does not
  support a value.
- Update directory filters only where the new data is complete enough to avoid
  misleading users.

### Workstream 4.3: Product-specific assessment

- Require each opening verdict to identify the relevant problem, the product's
  material differentiator and the first risk or uncertainty to investigate.
- Add a content check for repeated generic verdict phrases and high similarity.
- Review flagged copy manually; do not auto-rewrite assessments without checking
  their recorded evidence.

### Workstream 4.4: Comparison as a due-diligence tool

- Group selected-product rows into `Key differences`, `Shared characteristics`
  and `Unresolved supplier questions`.
- Open key differences by default and use accessible disclosure controls for the
  other groups.
- Generate a copyable, product-specific supplier-question list from unknown or
  stale decision fields.
- Order security, exit, Gift Aid, cost and support evidence ahead of
  low-signal organisation facts.
- Preserve the distinction between `No` and `Not confirmed`.

### Completion gate

- All existing entries validate against the revised schema.
- Each important displayed field exposes its evidence state, source and checked
  date.
- No evidence summary is presented as a product score.
- A two-product comparison emphasises differences, separates shared facts and
  produces useful unresolved questions.
- Content checks flag generic verdict repetition without blocking legitimate
  repeated factual language.
- Full schema, route, export, accessibility and build checks pass.

### Deliverable

Profiles and comparisons that turn recorded evidence and uncertainty into
clear due-diligence work.

## Phase 5: Guided shortlist and decision outputs (completed)

### Goal

Help a church move from its operational problem to three to five explainable
starting points and practical next steps.

### Completion record — 25 July 2026

- Existing categories are organised into four navigation families without
  changing their routes or product membership. Administration, finance and
  giving are prominent starting points, alongside the remaining categories.
- The `/shortlist/` journey uses URL-encoded answers and deterministic,
  published rules. It returns only three to five matching profiles; fewer than
  three produces an honest no-result state rather than widened requirements.
- Each starting point explains the matching recorded facts, material unknowns,
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

- Build a rules-based, progressively enhanced journey covering the job to
  improve, approximate contact band, UK location, Gift Aid need, integrated
  versus specialist preference and available technical administration.
- Encode answers and the resulting shortlist in the URL.
- Return three to five starting points only when the evidence supports them.
- Explain why each product appeared, which requirements are evidenced, what
  remains unconfirmed and the first real workflow to test.
- Publish the rules and tie handling. Do not label the output `best`, use an
  overall score or use commercial relationships as ranking inputs.
- Provide a useful no-result state that helps the user relax or verify
  requirements rather than silently widening the rules.

### Workstream 5.3: Qualified cost estimation

- Introduce structured pricing rules only for products whose public pricing can
  be represented faithfully.
- Separate subscription, transaction, implementation, add-on and tax questions.
- Show the pricing date, currency, assumptions and unresolved costs.
- Use `Contact supplier` or `Pricing needs verification` rather than estimating
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

- Representative scenarios return three to five explainable starting points,
  including an honest no-result case.
- Every reason is traceable to structured evidence and unknown requirements are
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

- Public software suggestions, listing corrections and supplier updates now open
  separate GitHub issue forms. They make the public nature of the workflow,
  evidence requirements and sensitive-data boundary explicit; maintenance
  documentation records the triage process.
- Validation now checks structured evidence references, affiliate consistency,
  generated internal links and critical static accessibility conditions. The
  build fails when these checks, sitemap coverage or content validation fail.
- Interaction-state tests cover shortlist bounds and no-result behaviour plus
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

## Phase 7: Launch

### Goal

Publish a credible first public decision resource.

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

## Phase 8: Validation period

### Goal

Determine whether the decision-assistant direction deserves further investment.

### Suggested period

Three to six months.

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

Continue, narrow, reposition or stop based on evidence. Do not begin automated
publishing or commercial ranking because engagement alone appears promising.

## Phase 9: Evidence maintenance and responsible growth

Only consider after demand has been demonstrated.

### Evidence maintenance

- Monitor recorded official product, pricing, security, privacy and support
  sources for material changes.
- Preserve source URL, retrieval date and supporting evidence internally.
- Compare proposed facts with the current record and surface contradictions.
- Create small, reviewable change proposals for broken links, stale sources and
  low-risk factual updates.
- Reject or queue ambiguous claims for human review.
- Generate editorial copy only from accepted structured evidence.
- Run the full consistency, accessibility, link and build checks on every
  proposal.

### Possible growth

- resume carefully reviewed catalogue expansion
- add the deferred decision-pack resources
- migration checklists and implementation guidance
- newsletter
- supplier interviews
- implementation partner directory
- denomination-specific guidance
- community venue software section
- church AI tools section
- public data API
- affiliate links or sponsored placements with strict disclosure

Avoid user reviews until moderation, verification and legal implications are
understood. Do not automate legal or regulatory compliance claims, safeguarding
judgements, fabricated user experience, affiliate-influenced ranking or
unsupported `best software` verdicts.
