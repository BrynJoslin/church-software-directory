# Implementation Status

- Google Analytics 4 is configured centrally with measurement ID `G-PGQQGQWDXG`.
  A built-in consent banner stores an accepted or rejected analytics choice in
  local storage. The tag loads only after acceptance, and the product-profile
  supplier CTA sends a `referral` event with an event-scoped `referral_vendor` parameter.
  Create the corresponding GA4 custom dimension before using the parameter in
  reports. The privacy notice now describes the analytics processing.

## Current phase

Phase 10: comparison discovery and high-intent paths implemented; Search Console and analytics-led selection of future direct-comparison pages remains dependent on third-party account access.

The site is live. The dated 28 July 2026 repository baseline is 147 software
profiles, 17 categories, 27 guides and 549 recorded source references. Older
counts in the historical notes below describe earlier repository states; they
are not the current public total.

## Phase 8 acquisition baseline — 28 July 2026

- The homepage now leads with “Find church software that works in the UK”, a
  generated profile count, an evidence-scope explanation, a GET search route
  to the directory, four editorially selected common starting categories and
  explicit directory, comparison and shortlist routes.
- The homepage trust strip derives its profile and dated-source totals from the
  content collection at build time. It states the independent, no-paid-ranking
  policy without presenting an unverified quality claim.
- Consent-gated GA4 events record homepage search, directory entry, comparison
  entry and shortlist start without sending search terms or church information.
  GA4 measurement is configured centrally; the `referral_vendor` custom
  dimension and the Phase 8 event report should be configured in GA4 before
  interpreting the data.
- Search Console and Bing Webmaster Tools baseline figures are not available in
  this repository. Record dated impressions, clicks, click-through rate,
  homepage queries and index coverage there when account access is available;
  do not substitute estimates.

## Phase 10 comparison discovery — 28 July 2026

- The comparison page now uses four labelled product selectors with category
  narrowing, search, duplicate prevention and URL-safe restoration. The static
  fallback retains a complete linked profile list.
- Related-profile links provide deterministic two-product comparison starting
  points with the existing reason for the relationship. Editorial starting
  points remain evidence-gated and are not described as popular.
- The 14 strategic-expansion guides in `docs/GUIDE_BACKLOG.md` are now
  published as version 1.0 guides. Their sensitive safeguarding, pastoral and
  retention topics retain explicit scope and specialist-review limits.
- Future named comparison or alternatives pages remain demand-gated: use
  Search Console and consent-gated comparison events before creating an
  indexable editorial page.

## In progress

- Phase 9 implements a compact browse layer across the directory and category
  pages. Cards now use one-sentence descriptions, published starting prices
  where recorded, one relevant UK or Gift Aid signal, an approved best-fit
  phrase, a checked date and a comparison action. JavaScript reveals twenty
  matching cards at a time while the full static card list remains available
  without JavaScript. Product profiles now use a 30-second answer, five-minute
  assessment and full due-diligence sequence without hiding source links,
  disclosures or supplier questions. Consent-gated events identify profile
  opens, card comparison actions, filter submissions and result reveal depth.

- The 28 July 2026 competitor report has been converted into the post-launch
  programme in `docs/ROADMAP.md` and the 30/90-day sequence in
  `docs/GROWTH_STRATEGY.md`. The immediate order is homepage acquisition
  clarity, compact directory and product summaries, searchable comparison
  selection, then a small UK free-and-affordable software content cluster.
  Visible freshness, supplier-commercial infrastructure and original market
  reporting have explicit evidence and demand gates. This planning change does
  not implement those phases or authorise new public claims, outreach or
  commercial relationships.

- Added a standard-version 1.0 buyers' guide for accounting software for
  churches. It centres the decision on fund structures, controls,
  reconciliation, reports, a finance-led trial and migration rather than an
  unsupported product ranking. The representative directory shortlist retains
  product-specific data, contract and exit gaps as supplier questions.

- Retitled the online-giving buyers' guide to use the natural target phrase
  “best church online giving platforms” in its visible and search title. Its
  scope, criteria and evidence limits are unchanged.

- The 26 July 2026 base discovery pack ran 1,628 product-name queries across
  all 148 active listings and the private ledger records every identity card
  and query. The catalogue currently omits public panels while source-by-source
  permission and editorial review are completed. Discovery found potential
  feedback; it must not be represented publicly as no feedback merely because
  it has not been retained for a permitted thematic synthesis.

- The 26 July 2026 external-review audit checked the active catalogue against
  Trustpilot, the Apple App Store and Google Play. It retains only directly
  matched public product or company profiles, records scope explicitly and
  omits volatile aggregate figures unless separately verified. The current
  working catalogue contains 148 listings and 107 profile references; removed
  listings were not restored solely to carry review data.

- A catalogue-relevance review on 26 July 2026 reduced the main directory from
  156 to 140 listings. Sixteen entries were removed because they fell outside
  the tightened organisational-use boundary, were not available to UK
  customers, remained in private beta, relied on US-specific core workflows or
  lacked sufficient evidence of a usable UK route. The public methodology now
  requires current UK availability, a defined church-role decision, functional
  UK category fit, useful evidence and a non-arbitrary reason for including a
  general-purpose product. Historical catalogue notes below remain as a record
  of earlier research and do not indicate that a removed product is still
  published.

- A reviewed UK-vendor expansion batch adds ExpensePlus, Church Planner,
  Omega Church, Hallmaster and iKnow Safeguarding. It also adds explicit room
  booking and safeguarding-administration categories so those specialist tools
  are discoverable in their actual decision contexts. All new listings use
  current supplier sources, specific supplier questions and, where available, Companies
  House registration evidence. This is evidence-led catalogue expansion at the
  user's request; it is not a claim that the UK market is now exhaustive.

- A second evidence-led pass adds The Church Organiser, MyFundAccounting.Online,
  Simple Church Rota and ShepherdCare. It completes explicit directory categories
  for volunteer scheduling and pastoral-care administration, alongside the
  Church of England-specific administration offer. Newer products turn missing
  contractual, hosting or company-registration information into specific
  procurement questions.

- AltarDesk is now included as a UK-registered, all-in-one church-management
  option. Its listing records the supplier's current pricing, trial, Gift Aid,
  export and unusually detailed data-processing material, while making its
  newly incorporated status and the need for church-led workflow testing clear.

- Contactless-giving coverage now includes Dona Donations and Donation Station.
  The entries distinguish purpose-built terminal hardware from a church-owned
  tablet and SumUp model, and record the stated pricing, Gift Aid workflow and
  remaining finance, data-processing and hardware due-diligence questions.

- ChurchPay adds a UK payment-first all-in-one platform covering giving, Gift
  Aid, websites, people records, pastoral care and network reporting. Its
  public plans and privacy roles are recorded, while hosting, sub-processors,
  export formats and contract detail remain supplier questions.

- ChurchBuilder adds an established UK website-and-administration platform,
  covering people, groups, planning, communications, booking and multi-church
  use. Its public tier names are recorded while current subscription pricing,
  processing terms and hosting evidence remain explicit supplier questions.

- Expanse CMS adds a newer UK-managed website option, especially relevant to
  Catholic parishes and ChurchSuite users. Its supplier identity, published
  starting prices and managed-service claims are recorded, while service terms,
  data-processing documentation, sub-processors and exact plan scope remain
  explicit procurement questions.

- Church Apps UK adds a UK church-mobile-app specialist and an explicit mobile
  app category. Its published GBP plans, operating company and app options are
  recorded, while its older privacy material means service-specific UK GDPR,
  hosting, app-store ownership and export arrangements remain procurement
  questions.

- Chobble Tickets adds a UK CIC-operated, open-source event-ticketing option
  relevant to church events. The listing records its managed and self-hosted
  routes, direct-payment options and supplier-published EU hosting detail; it
  is explicitly not represented as a church-management, Gift Aid or
  safeguarding platform.

- Aurnet adds a live, newly incorporated UK all-in-one church platform with a
  member app, website, giving and administration scope. The listing makes its
  early-stage status and makes service terms, DPA, sub-processors, hosting,
  paid subscription prices and migration evidence central questions in the
  procurement advice.

- Church Admin adds a maintained UK-built WordPress church-administration
  option. Its own-hosted data model and active plugin releases are recorded,
  alongside the church's resulting responsibility for WordPress patching,
  backups, hosting, security and access controls; public premium prices are in
  USD and require UK purchasing confirmation.

- Chancel adds an established UK church mobile-communications option, covering
  alerts, events, media, forms and member-facing information rather than full
  operational administration. Its live app and company evidence are recorded;
  price, contract, DPA, hosting, support, app-store ownership and exit terms
  remain questions for the supplier.

- TruthVine adds a UK CIC-operated sermon-hosting specialist, including a
  published £9.99/month audio-sermon service and optional managed church
  website. Hosting, DPA, sub-processors, media migration, accessibility and
  archive-exit terms are intentionally retained as questions for the supplier.

- Klemi adds a UK LLP-operated administration platform for small and medium
  churches, combining people records, service planning, rotas, communications,
  events, payments, Gift Aid and an optional mobile app. Its current terms
  publish GBP monthly fees and processor/controller roles; complete hosting,
  sub-processor, migration and implementation detail remain supplier questions.

- ChurchBox adds a UK-operated freemium directory, communications, rota and
  event-management option. Its free and paid GBP tiers, customer DPA route and
  operating-company link are recorded; cloud infrastructure, sub-processors,
  full migration and exit detail remain procurement questions.

- Levites adds a newly incorporated UK mobile-first communication and rota
  platform for church teams. The live App Store releases and operator evidence
  are recorded, while UK pricing, service terms, DPA, hosting, accessibility
  and exit arrangements are made explicit as early procurement questions.

- Church123 adds an established UK church-website builder with managed hosting,
  member pages, podcasting, support and a 30-day trial. Published annual GBP
  pricing and service terms are recorded; complete infrastructure, DPA, privacy,
  domain-transfer and website-export arrangements remain procurement questions.

- VCS Parish Church Websites adds a UK company-operated, parish and benefice
  website option. Its active church-facing site, company identity and support
  route are recorded; current package pricing, hosting, privacy, DPA and exit
  terms remain questions for a written supplier proposal.

- SignMeUp adds a UK charity-operated option for children's events where
  attendee applications, volunteer roles, capacity, badges and on-site
  registers need to work together. Its £3-per-person event charge and £5 DBS
  check charge are published; churches still need to set access, retention and
  safeguarding arrangements for their own event data.

- Eventcube adds a UK-developed general event-ticketing option, clearly
  labelled as such rather than as church-management software. Its Starter fee,
  Stripe dependency and international-processing note are recorded alongside
  the questions a church should settle before using it for attendee data.

- ChurchBase adds an early UK safeguarding and compliance workspace. Its
  company identity, current public product scope and pricing inconsistency are
  recorded, while processing, export and contract terms remain procurement
  questions before a church migrates sensitive records.

- GiveTap adds a UK cashless-giving option spanning web, QR/NFC, card-device
  and phone-based collection. Its published fee examples, European-server
  statement, cancellation/export wording and supplier-described Gift Aid
  workflow are recorded without treating them as a church compliance result.

- Donr adds a UK text-giving and text-raffle fundraising option. Its percentage
  fees, payout charge, Gift Aid-information export and data-processing schedule
  are recorded; it remains a campaign-fundraising tool rather than a full church
  administration platform.

- DonorCloud adds a UK donation, Gift Aid and event platform. Its public plans,
  direct Stripe-payout approach and HMRC commercial-software listing are
  recorded alongside the need to obtain current hosting, subprocessor and
  updated contractual privacy detail before migration.

- iSingWorship adds a UK-developed worship backing-track and lyric-projection
  option. Its legal-name change, device support and published song/subscription
  routes are recorded; its displayed USD subscriptions and current data terms
  remain areas to check at purchase.

- SongPro 5 adds a long-established UK Windows worship-presentation option.
  Its per-install annual prices, 30-day trial and copyright/licence boundary are
  recorded so that churches do not mistake software access for rights to project
  music or Bible content.

- FaithFood TV adds a newer UK sermon-hosting and livestreaming service. Its
  published plans, active company and current mobile channel are recorded, while
  storage, processing, source-video ownership and exit terms remain essential
  procurement checks.

- Navaro adds a newer UK venue-management option for church and community halls.
  Its published company identity, plan limits, charity discount and retention
  wording are recorded; churches should test a real booking, cancellation,
  invoice and permissions workflow before adopting it.

- Fund Filer adds a specialised UK Gift Aid and GASDS claim-management option.
  Its current HMRC commercial-supplier listing, entry pricing, trial and public
  legal links are recorded; it remains a focused complement to, rather than a
  substitute for, a church's accounts package.

- GoodtoGive adds a UK giving and Gift Aid-management supplier with a
  church-focused mobile-app offering. Its HMRC listing, service operator, fee
  model and data-processing terms are recorded, with product-specific terms and
  the church's finance-control fit remaining essential purchase checks.

- Hubb.Church adds a UK all-in-one website, app and church-administration
  platform. Its active operator, HMRC listing and corroborated church feature
  scope are recorded; its current pricing and data-processing pack need to be
  obtained directly before a migration decision.

- iDonatio adds a UK giving and Gift Aid platform supporting digital, plate and
  envelope workflows. Its active company, HMRC listing, 5.75% + £0.30 published
  transaction fee and data-policy detail are recorded; finance teams should
  model that fee and the associated Stripe terms before proceeding.

- GoodHub adds a general UK charity fundraising option relevant to churches,
  combining donations, ticketing and Gift Aid. Its no-subscription model,
  payment and Gift Aid fees, company identity and organisation terms are
  recorded; churches need to model fees and payout/reconciliation flows.

- STEP Bible adds a free UK-developed Bible-study option, operated in a UK
  charitable context. Its downloadable offline software and data-policy context
  are recorded; it is a study resource rather than a management, presentation or
  licensed-content platform.

- Go-Worship adds a UK attendee-facing church-event discovery app with ticket
  booking. Its active operator, current app activity and terms are recorded;
  it remains a discovery channel rather than a substitute for event operations
  or church data-management software.

- ChurchOS adds a newly incorporated UK all-in-one church-administration
  platform. Its published GBP plans, trial, product scope and named UK operator
  are recorded, while its early-stage status and incomplete public legal detail
  make a controlled workflow trial and current contract pack essential before
  live use.

- Booking Space adds a general UK shared-resource option for church offices and
  charities. Its active-user pricing, UK operator, legal terms and workplace
  integrations are recorded, with an explicit distinction from a public
  community-hall hire and invoicing system.

- Gracely adds a new UK personal and small-group Bible-study app. Its active
  Android listing, operator, freemium pricing and privacy material are recorded;
  it is explicitly scoped as a reflection and accountability tool rather than a
  church-management or formal pastoral-record system.

- Parish Safeguarding Dashboard adds a Church of England-specific safeguarding
  administration option from Clearly Simpler. Its diocesan access model and
  governance workflow are recorded, with a clear warning that it is neither
  self-serve everywhere nor a replacement for professional safeguarding advice.

- Avodah adds a Newcastle-operated church-management option covering people,
  rotas, expenses, communications and worship planning. Its public product and
  privacy material are recorded, while the absence of a published company number
  and a detailed UK commercial pack make direct supplier due diligence essential.

- UKChurches adds a Bristol-based managed church-website option with published
  GBP packages for design, hosting, updates and support. Its public agreement
  and privacy notice are recorded, while the absence of a published company
  number and detailed data-processing and exit material should be agreed with
  the supplier before a church migrates a live site.

- Bible Companion adds a free, UK charity-backed Bible-study app from Carelinks,
  with text, commentary, audio, reading plans and a study course. Its named CIO
  and app routes are recorded, while churches need to assess its Carelinks
  teaching context and the absence of a current app-specific privacy notice.

- The Digital Church Platform adds a UK module-based option from GIGCMO Limited
  for parish websites, visitation documents, role compliance and document
  repositories. Its named active operator and module scope are recorded, with
  explicit warnings that pricing, processor detail and exit arrangements require
  a current written supplier pack.

- Hallmaster adds an active UK public-hall hire and invoicing option with clear
  GBP annual prices, a 90-day trial and a documented processor role for venue
  data. It is deliberately distinguished from internal ministry-room scheduling;
  payment, SaaS and current data-processing terms still need procurement review.

- Hall Booking Online adds a low-cost UK public-hall hire alternative from Fen
  Street Designs Ltd. Its public price, free trial, ICO registration statement,
  booking, invoicing, payment and website-calendar features are recorded; its
  current processor, hosting, sub-processor and exit terms require supplier
  documentation before a church uploads hirer data.

- Simply Halls adds a UK public-hall listing and booking option from GKR
  Solutions Limited. Its no-subscription, no-commission model for hall owners,
  customer booking fee, controller/processor roles and retention statement are
  recorded; payment, payout, refund, hosting and exit terms need a current
  supplier contract before a church lists its hall.

- HCOMS Diocese Management System adds a UK diocesan and parish-portal option
  from Hayes Computing Solutions Ltd. Its Church House, parish, property,
  compliance, finance and National CMS scope is recorded, while public pricing
  and detailed DMS data-processing, permission and exit terms require a scoped
  diocesan supplier proposal.

- Paxton Church & Charity Accounting Software adds a current UK charity-finance
  option from Paxton Software Limited. Its published monthly GBP pricing,
  30-day trial, multi-fund accounting, Gift Aid, Charity Commission reporting
  and supplier-stated UK hosting are recorded; a church should still obtain a
  current data-processing, sub-processor and exit-data pack before adoption.

- TheFaithApp adds a newly incorporated UK operator with a free small-church
  entry tier for member management, content, communications, events, mobile
  apps and payment-provider connections. Its global positioning, international
  processing statement, paid-price currency, Gift Aid scope and data-processing
  terms remain explicit procurement checks rather than UK-specific claims.

- ShareRota adds a UK-operated specialist for church volunteer scheduling,
  with published GBP tiers, a no-card trial, reminders, controlled swaps and
  exports. Its linked legal pages were not available to the public research
  index, so a current DPA, hosting, sub-processor, retention and exit-data pack
  remains essential before a church uploads team records.

- RotaCentral adds an established UK volunteer-rota option for churches that
  need allocation or self-sign-up, availability, swaps and email or SMS
  reminders without a full church-management system. Its public notice identifies
  the processor role, UK application hosting and seven-year retention periods;
  the full agreement, sub-processors, export, security and SMS arrangements
  still need direct supplier review.

- LoveGiving adds ExpensePlus's UK online-giving module for existing
  ExpensePlus churches and charities. The listing records its branded giving
  pages, fund links, Gift Aid workflow, Stripe connection and published fee
  example, while making its ExpensePlus dependency and the need to assess
  payment, data-processing, retention, export and exit terms explicit.

- Tes MyConcern adds a specialist UK safeguarding case-management option from
  The Safeguarding Company, now part of Tes. It is relevant because the Church
  of England identifies MyConcern as its national casework system for dioceses
  and cathedrals. The listing deliberately limits its scope: public marketing
  is school-led, pricing is by proposal and any church use requires specialist
  safeguarding and data-protection approval.

- Liberty Accounts adds a UK charity-accounting option with documented church
  collection workflows, fund accounting, Gift Aid, GASDS, donor ledger, SoFA
  reporting and Church of England Return of Parish Finance support. It is a
  finance system rather than a whole church-management platform; churches still
  need current contractual, data-processing, migration and accounting advice.

- Worship Player adds a church worship-media option from Movation Productions,
  with lyric videos, backing tracks, playlists, simple presentation media and
  offline downloads. The listing records the free five-song evaluation route
  and CCLI licensing distinction, while marking the public company identity,
  price, hosting, data-processing and exit details as supplier questions.

- Hymnal Plus adds an established UK digital hymn-player option from Hymn
  Technology Ltd. Its published HT-400 hardware, UK repertoire, hymn-book
  indexes, playlist capability and GBP prices make it useful for hymn-led
  churches without a regular musician; hardware, content rights, room audio,
  warranty and support need a real service demonstration before purchase.

- VerseAir adds a newly incorporated UK worship-presentation supplier. Its
  free and USD-paid plans, 14-day evaluation, desktop compatibility and
  speech-to-verse, schedule, companion and broadcast scope are recorded;
  churches must validate real-service reliability, content licences, AI data
  handling and the current privacy, hosting and support terms before live use.

- Catholic Live Streaming adds a UK managed Mass-streaming, recording and
  parish-website offer from Every Day Christian Marketing Ltd. Its recurring
  GBP plans and installation starting points are recorded, while safeguarding,
  consent, copyright, hosting, retention, accessibility and exit terms remain
  matters for a written parish proposal rather than assumptions about a service.

- Church Streaming by Litenet adds a UK connectivity-and-installation option
  for churches needing camera, cabling, internet and Wi-Fi support around a
  service broadcast. Its historic package document is only an indicative price;
  current hardware, ownership, support, publishing, retention and safeguarding
  terms require a site-specific written quote.

- `docs/GROWTH_STRATEGY.md` now records the long-term, evidence-led growth and
  distribution strategy. It prioritises decision assets, source-backed supplier
  facts, useful existing-audience distribution, internal linking and search-data
  learning over content volume or automated promotion. It is a planning document
  only: no campaign, outreach, website feature or additional product research
  was started by this documentation change.

- Guide quality is now governed by `docs/GUIDE_STANDARD.md` version 1.0, based
  on a benchmark of comparable church-software articles and authoritative UK
  technology, data, security, charity-governance and accessibility guidance.
  The content schema records guide type and standard version; a new automated
  check prevents new legacy guides and enforces the objective floor for version
  1.0. `How to choose church management software` is the first conforming
  exemplar. All twelve current guides now use version 1.0; the baseline audit
  remains as the record of the evidence-led migration.

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
  export and support material. Where suppliers do not publish a hosting
  location, profiles omit it and decision tools prompt churches to ask.
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

- Retired the Church123 profile after its official website and recorded terms
  and pricing pages returned confirmed 404 responses. Its related ChurchBox
  company evidence now relies on the current Companies House record rather than
  the unavailable Church123 terms. Updated the remaining affected source records
  to live first-party pages or removed stale app-store references where the
  public source could no longer be checked.

- Public evidence language now treats current official supplier material as
  sufficient evidence for what the supplier publishes. Overall completeness
  badges and statuses have been removed. Profiles omit incidental gaps,
  comparisons and shortlists turn material gaps into specific questions, and
  the public export omits internal `unknown` values. Field provenance uses
  `supplier-published`, `independent-source`, `directory-tested` and
  `needs-refresh`.
- Software listings now support optional, structured external review-platform
  references. The profile component makes product-versus-company scope visible,
  links safely to the named destination and keeps platform-hosted and moderated
  reviews separate from the directory assessment. The initial recorded examples
  are a product-level G2 profile for Planning Center Services and a company-level
  Trustpilot profile for ChurchSuite; neither contributes rating or review
  structured data.
- Phase 6 replaces disabled public submission controls with three documented
  GitHub issue-form routes for suggestions, corrections and supplier updates.
  The public route accepts only public supplier evidence and business details;
  triage remains independent of commercial status. The validation workflow now
  covers source-reference integrity, critical static accessibility conditions,
  built internal links, source-health reporting and core interaction states.
- The Phase 5 guided shortlist groups every current category into four families
  and adds a URL-shareable, rules-based `/shortlist/` journey. It begins with
  category, asks one useful question at a time and reports the exact remaining
  count after every answer. An option appears only when it produces a smaller,
  non-empty set; unusable questions are skipped and exhausted journeys show the
  list automatically. Up to five profiles receive detailed explanations, with
  all remaining matches still visible and one- or two-profile results retained.
  The page includes qualified individual GBP starting points where published,
  never a total-cost estimate, plus a print-ready requirements worksheet,
  supplier questions, trial plan and trustee or elder summary.
  Technical-administration capacity remains a due-diligence question rather
  than a filter because the catalogue does not yet have enough evidence to
  support that rule.
- The Phase 4 evidence layer defines procurement fields, transparent source
  provenance and checked dates; all listings have a structured
  problem, differentiator and first-check verdict. The directory no longer
  filters by broad church size while contact bands and operational measures are
  still sparsely evidenced across the catalogue. Profiles expose only sourced
  field-level evidence; the public export omits absent optional facts; and
  comparison separates differences, shared evidence and supplier questions.
- Guide pages now generate a concise `In this guide` contents block from their
  level-two Markdown headings. It follows the guide introduction in document
  order, scrolls away with the page and uses a compact disclosure on narrow
  screens, avoiding sticky overlays and independently scrolling navigation.
  Static anchor links remain available without JavaScript.
- Phase 3 public-trust work: public catalogue counts now derive from the
  collection; inactive submission controls have been removed; known obsolete
  public-copy phrases are checked; publisher and correction-route details are
  configured; related-product links are deterministic and
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
- Three-state values retain `unknown` internally to prevent missing information
  becoming `no`; that sentinel is not rendered or exported.
- Directory and comparison content is generated as static HTML; small browser
  modules progressively enhance it.
- `llms.txt` is a static root resource describing the directory, its primary
  decision tools and evidence limits for AI-assisted discovery. Product-profile
  comparison links retain a no-JavaScript `/compare/` fallback, while browser
  enhancement adds the selected product to the shareable comparison URL. This
  prevents crawler-facing one-product query variants from becoming internal-link
  destinations.
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

## Known limitations and open questions

- The current entries are representative samples, not a market-wide shortlist.
- None represents hands-on testing unless a field explicitly says otherwise.
- Churches considering Planning Center, Breeze ChMS or ChurchCRM for Gift Aid
  should ask each supplier to demonstrate the required UK workflow.
- Churches should ask ChurchSuite, iKnow Church, Planning Center and Breeze ChMS
  for current hosting and sub-processor details where those affect the decision.
- Accessibility information, data processing agreements, complete integrations,
  migration scope and contractual details remain incomplete across the sample.
- The configured production domain returned HTTP 200 through Cloudflare on 25
  July 2026. Church Software UK is configured as the responsible publisher,
  with public correction and email contact routes. Reuse-licence and form-service
  decisions remain outside this implementation record.
- Forms expose no submission controls until an endpoint, privacy information,
  spam protection and accessible success/error behaviour are configured.
- The sample content was checked for unsupported claims against its recorded
  source notes only; those official supplier sources still need periodic human
  refreshes before catalogue expansion.

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

### Phase 8: acquisition clarity and measurement

- Rewrite the homepage around the concrete UK church-software proposition.
- Add a no-JavaScript-compatible homepage search into the existing directory
  query state.
- Generate the profile count and trust strip from canonical content.
- Present four common starting categories and the browse, compare and shortlist
  routes without claiming unmeasured popularity.
- Record the search and consented interaction baseline before deciding whether
  to broaden acquisition content.

## Maintenance note

### Charity software discounts — delivered 28 July 2026

- Added the indexable `/charity-software-discounts/` decision hub, a 19-record
  `charityOffers` collection and a public `/data/charity-offers.json` export.
- The first register contains 15 current programmes, three separately rendered
  warnings (Slack, Airtable and HubSpot), and one non-public hold record.
  Programme cards show source-backed benefit types, UK and church eligibility,
  caveats, checked dates and official routes; Ticket Tailor links to its
  existing profile.
- Added `check:charity-offers`, including source-reference, publication-status,
  related-profile and 75/120-day freshness safeguards. The hub filters by
  search, task, benefit and eligibility using URL state with static HTML as the
  no-JavaScript baseline.

Catalogue expansion is no longer the next product priority. Add or remove
listings only in small, reviewed, evidence-backed batches required for
credibility or a separately approved research task. The next general
implementation work should follow Phases 8–10 before another broad expansion.

### 2026-07-25 catalogue research note

- Added Energize as a narrowly scoped children’s-ministry resource and
  session-planning listing after confirming the active UK operator, published
  subscription/trial information and product workflow. It is intentionally not
  presented as child check-in or safeguarding case-management software.
- Added The Bible with Nicky and Pippa Gumbel (formerly Bible in One Year) as
  a UK-operated daily Bible-reading listing, distinct from church databases or
  research-library software.
- Added Bookteq as a general UK venue-booking option that can be relevant to
  church halls and rooms. Its listing explicitly distinguishes this from a
  church-specialist administration platform and keeps pricing, data-processing
  and contract questions visible.
- Added MCN Media as a Northern Ireland-operated church and cathedral
  livestreaming option after reconciling its current public operating entity
  with the service terms and company record. Public pricing, hosting and
  contract detail remain supplier questions rather than assumptions.
- Added Bookitbee as a general UK event-ticketing option for church events,
  clearly separated from church-management, Gift Aid and safeguarding systems.
  Its published free-event and percentage-fee models are recorded alongside
  data-processing and payment due-diligence questions.
- Added TryBooking, a UK ticketing service with a dedicated church-event route,
  published free-event and paid-event fees, plus current public DPA and
  sub-processor information. It remains an event tool, not a replacement for
  church administration or safeguarding records.
- Added Tersia as a distinct UK Christian-community app covering groups,
  events, prayer, tickets and Stripe-connected fundraising. Its recent
  incorporation and unpublished paid-event platform fee are deliberately
  visible in the assessment and procurement questions.
- Added Enthuse, operated by Online Giving Ltd, as a general UK charity
  fundraising option for churches. It is deliberately bounded to donations,
  campaigns and event registration rather than presented as church-management
  or safeguarding software; its subscription and percentage-fee components are
  recorded for churches to model before adoption.
- Added Simple Church Rota as a small-church volunteer-scheduling option after
  confirming a current UK developer identity and app availability. It has no
  verified limited-company identity in the reviewed material, so the listing
  makes its privacy, hosting, contract and exit gaps explicit and recommends a
  non-sensitive trial before broader use.
- Added Visual Liturgy Live as a Church of England-specific worship-planning
  listing after confirming its current Church of England support-page price and
  ongoing subscription model. Its listing deliberately preserves the current
  PC-only, legacy-product caveat and does not represent it as a general church
  management or presentation system.
- Added MIDAS Room Booking as a general UK-developed room and resource
  scheduling option for church halls and facilities teams. The profile keeps
  the non-church-specific scope clear and makes its selectable cloud locations,
  UK/US backup implications, self-hosting option and incomplete public company
  identity visible to procurement teams.
- Added A Church Near You as the Church of England’s free, nationally operated
  church-finding and website platform. The profile intentionally limits its
  scope to public-web, events and communications workflows, records the
  Archbishops’ Council operator and privacy material, and does not portray it
  as a general church-management or sensitive-records system.
- Added Common Worship Lectionary as a separate official Church of England
  app-and-web-app listing for daily calendar material and simple service-sheet
  preparation. Its profile preserves the narrow liturgical scope, the national
  support page’s “less than £9” annual-price ceiling and the unresolved
  subscription, account and data-processing questions.
- Added ChurchWebsites UK as a Coventry-based, church-focused website
  subscription option. Its published Basic and Pro prices, support model and
  content-export statement are recorded alongside the important limitation that
  the subscription design remains supplier property and that public DPA,
  hosting and legal-entity detail still requires written procurement evidence.
- Added iChurch as a United Reformed Church-supported WordPress website
  service, open to other denominations. The listing records its current
  published standard, managed-update and setup pricing, while keeping hosting,
  data-processing, export and service-level details as explicit contract
  checks rather than assumptions.
- Added Church Pages, the Church Pages Initiative operated by Khoo Systems
  Limited, as a UK church-website, events and sermon-publishing option. The
  profile treats its discretionary discount model carefully: published rates
  are recorded but each church is directed to obtain its actual offer and the
  underlying data-processing, hosting, export and terms evidence in writing.
- Added Websites4Christians, a Scottish Project Huddle Ltd trading name, as a
  bespoke managed website option for churches. The listing records its public
  hosting agreement, entry pricing, domain-transfer statement and technical
  support scope, while keeping all customer-data, DPA, hosting-location and
  asset-ownership questions visible for a written agreement.
- Added OnNuma, a London product of The Media Lounge Ltd, as a distinct
  volunteer-first coordination platform for rotas, events and communications,
  with optional youth, DBS, safeguarding and pastoral workflows. The profile
  makes the sensitive-data boundary explicit: product labels do not establish
  compliance, so written controls and a non-sensitive pilot remain necessary.
- Added Three Rings, an active English Community Interest Company, as a
  general charity-sector volunteer-management option for eligible church
  projects. The profile deliberately limits it to rotas, volunteer records,
  communications and controlled file sharing; its published controller-
  processor terms, storage statement and turnover-linked price model are
  recorded without treating it as church-specific management software.
- Added Infreemation Volunteer, supplied by Digital Interactive Ltd, as a
  general UK option for structured volunteer applications, approvals, training
  and event booking. It is not classed as safeguarding software: the profile
  makes its handling of identity and vetting documents a contract and process
  diligence question, rather than a product-compliance conclusion.
- Added Cadence, a church-specific UK rota product supplied by Vue Solutions
  Ltd, while retaining its private-beta status as a central limitation. The
  entry records the free initial beta, fairness-and-rest scheduling approach,
  unresolved product-data terms and the company's overdue confirmation
  statement so a church can make a proportionate decision about early access.
- Added Plinth, Time To Spare Ltd's UK charity-sector platform, for church
  charities and community projects that need more than a basic rota: volunteer
  profiles, matching, DBS-status tracking, communications and impact reporting.
  It is deliberately not presented as congregation management or a complete
  safeguarding solution; data-processing, retention, sub-processor and AI
  terms remain procurement checks for each module set.
- Added Churchee, Treefish Ltd's Welsh church-website platform, as a beta
  website, media and integration option. The entry gives its 36-month contract
  term the same prominence as its published prices and hosting scope, and does
  not assume a DPA, hosting region, integration list or content-exit workflow
  where those were not publicly established.
- Added Jovo, the current name for the former Joyned/CommLoop church and
  community communication platform. The profile captures its ChurchSuite and
  Planning Center connections, GBP tiers and public processing schedule, while
  prominently preserving a material contracting check: current supplier terms
  and the available Companies House record cite conflicting company numbers.
- Added BookingsPlus, Kajima Community's UK-operated venue-lettings platform,
  as a general facility-hire option for churches. The profile distinguishes its
  full booking, payment and compliance workflow from church management, and
  keeps the percentage-of-booking-value commercial model, international parent
  group and incomplete public product-data terms as explicit procurement checks.
- Added CharityFinancials, NfP Accountants Ltd's UK charity-accounting platform,
  as a church-accounting option for fund, project, donor and location reporting.
  Its supplier identity and functional scope are well evidenced, but its current
  price, product DPA, hosting, integrations, support and export commitments are
  not publicly clear, so the listing makes a written supplier pack a first-step
  procurement requirement.
- Added Lectio 365, 24-7 Prayer's free UK charity-operated daily devotional app,
  as a Bible-study and formation resource. It is deliberately bounded to
  individual and small-group Scripture-and-prayer use: its app privacy notice,
  no-account design and technical-data boundary are recorded, while it is not
  presented as a collaborative study, pastoral-record or church-data system.
- Added RaiseUp Faith, an active Bristol curriculum-platform supplier, as a
  children’s-ministry option for lesson libraries, adaptation, presentation and
  volunteer sharing. Its free sampler and plan structure are recorded without
  asserting unconfirmed GBP prices, and the profile makes clear that it is not
  a child check-in or safeguarding-record system and needs written account-data
  terms before volunteer or children’s information is entered.
- Added The Donation App, Abacus Apps Limited's UK charity-giving and Gift Aid
  product, for churches combining online, bank-transfer, contactless and cash
  donation records. The profile records its current HMRC supplier listing,
  advertised £9 entry price and trial, while keeping exact fees, payment terms,
  product DPA, hosting and export evidence as written procurement requirements.
- Added Encounter with God, Scripture Union's current deeper Bible-study app, as
  a narrow individual and group-recommended resource. Its UK charity identity
  and organisation-wide app privacy information are recorded; pricing,
  subscription and app-specific data terms remain a current app-store check,
  and it is not represented as a collaborative church-data platform.
- Added Donorfy, a UK charity CRM now controlled by Access UK, for larger church
  charities with multi-channel donor, fundraising and Gift Aid needs. It is
  deliberately bounded as fundraising CRM rather than a church-specific
  ministry, pastoral or safeguarding platform; volume pricing, implementation,
  data-processing and export checks are made explicit.
- Added Swiftaid, Streeva Ltd's UK Gift Aid intermediary and claim-submission
  service, for churches using a compatible donation route or uploaded claim
  data. It is deliberately bounded as a Gift Aid workflow rather than a giving,
  CRM or church-management system; published allowances and success fees are
  recorded while compatibility, data-protection roles and audit-record access
  remain explicit procurement checks.
- Added Aedon.Charities, Aedon.Co Limited's Salesforce-native UK charity
  accounting platform, for larger church charities with complex funds, projects,
  SORP, partial-VAT and Gift Aid workflows. It is deliberately not positioned as
  a general church-management system; pricing and the stated one-year minimum
  are recorded, while product data-processing, transfer, migration and export
  terms remain written procurement requirements.
- Added Guardians of Ancora, Scripture Union England & Wales' free Bible-story
  game for children aged roughly eight to eleven, as a supervised children’s
  ministry and Bible-engagement resource. It is deliberately not positioned as
  check-in, safeguarding, attendance or pastoral-record software; device
  compatibility, player-profile privacy and supervised use remain essential
  checks before a church introduces it.
- Added GiftAider, Systematic Marketing Limited's UK Gift Aid and basic charity
  CRM product, for churches needing donation import, validation and HMRC claim
  submission outside a wider church-management system. Its cloud and
  self-hosted options are documented without assuming they have identical data
  responsibilities; product DPA, hosting, migration, exports and all commercial
  terms remain explicit procurement checks.
- Added Free Gift Aid eClaim, eFile Ready Limited's UK browser-based Charities
  Online filing service, for churches that hold their donor records elsewhere
  but need a single- or multiple-charity HMRC submission route. It is bounded as
  an e-filing tool rather than a CRM or giving platform; its published ISO/IEC
  27001 certificate is recorded without treating it as a substitute for product
  data-processing, hosting, retention, export or contract evidence.
- Corrected ChurchLinker's category coverage to surface the supplier-published
  rota, communications, sermon and member-app capabilities in the corresponding
  directory categories. This is a discoverability correction only: it does not
  add any new product claim beyond its existing source-backed listing.
- Added BMc Azurri Tap To Donate, a UK NFC and QR-code donation product that
  explicitly supports places of worship. It is bounded as contactless giving,
  rather than a full church-management system; published fixed and percentage
  fees are recorded, while current payment, Gift Aid, data-processing, export
  and cancellation terms remain procurement checks.
- Added Churchable, Prompt Miner Ltd's UK sermon-repurposing and communications
  tool. It is bounded as a reviewed content workflow rather than a general
  church-management or pastoral system; its Irish hosting statement and
  potential third-party international processing make current processor,
  transfer and retention evidence essential before using confidential material.
- Added WorshipFlow AI, a UK sole-trader Planning Center companion for
  sermon-to-song matching and worship-team rehearsal preparation. It is
  explicitly dependent on Planning Center and is treated as an early product;
  churches should validate its permissions, recommendations, processor terms,
  ICO position and support capacity before connecting live volunteer data.
