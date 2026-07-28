# UK charity software discounts: implementation plan

Status: proposed  
Research completed: 28 July 2026  
Intended public route: `/charity-software-discounts/`

## Executive recommendation

Build a first-class, source-backed directory section called **Software discounts for UK churches and charities**.

The first release should be one substantial static hub page backed by a new Astro Content Collection. It should help a church answer four questions:

1. What is the current offer?
2. Is it available in the UK?
3. Does the provider actually accept churches or religious organisations?
4. What must the church check before applying or committing?

Do not call the section “grants”. Most relevant programmes are donated licences, reduced subscriptions, usage credits or special transaction rates. Google Ad Grants and cloud credits should be identified as in-kind credits, not cash and not guaranteed savings.

Do not claim to list “every” offer or calculate a total theoretical saving. The responsible promise is a maintained, evidence-led register of relevant programmes found and checked. Offers change, approval is discretionary, actual value depends on use, and several heavily promoted nonprofit programmes explicitly exclude churches.

The recommended MVP is:

- one indexable hub page, not dozens of thin offer pages;
- 12–18 fully checked programmes, plus a clearly separated exclusions/watchlist section;
- official supplier sources for every published benefit and eligibility conclusion;
- a visible checked date and provider-specific caveats;
- URL-based search and filters with static HTML as the baseline;
- links to existing directory listings where a product is already covered;
- a 90-day research cycle, with stale records blocked from publication after 120 days.

## Why this resource is valuable

UK churches often qualify for charitable pricing but have to search provider-by-provider, distinguish US-only material from UK offers, and work out whether “nonprofit” includes a religious organisation. A normal search result rarely settles those questions.

The reference [Church Software Directory grants page](https://www.churchsoftwaredirectory.com/grants) demonstrates the demand, but its model should not be copied. It:

- uses US-dollar and 501(c)(3)-centred presentation;
- combines recurring discounts, donated subscriptions, advertising credit and competitive cash grants into one total;
- duplicates Google and Microsoft suites as both parent and child entries;
- presents ordinary free plans as though they were charity benefits;
- presents Slack and Atlassian as church opportunities even though current official material contains religious-organisation restrictions; and
- gives a large theoretical “total value” that does not represent money a church would necessarily save or use.

Church Software UK can be more useful by making UK and church eligibility the organising principle rather than the size of the headline discount.

## Product principles for this section

The section must follow the directory’s existing evidence and editorial rules:

- A current official supplier page is the primary source for what a supplier publishes.
- A provider saying it supports nonprofits does not establish that it accepts churches.
- A UK registered-charity route is not the same as explicit confirmation that religious organisations qualify.
- No evidence is not a negative answer. Use a precise question or “confirm before applying”.
- Use “not available to churches” only where a current source explicitly establishes that exclusion.
- Keep the discount fact separate from an assessment of whether the software is suitable.
- State currency, VAT, billing term, seat limit, budget cap, renewal condition and new-customer restriction where material.
- Do not imply that a free licence makes implementation, migration, administration, training or support free.
- Do not use affiliate links in place of the official application route.
- Inclusion is not endorsement.

## Audience and jobs to be done

Primary readers:

- church administrators and operations leads;
- trustees, treasurers and finance teams;
- communications staff and volunteers;
- ministry leaders choosing collaboration tools;
- denominational, parish and multi-site support teams.

The page should help them:

- discover credible offers by task rather than brand familiarity;
- see immediately whether church eligibility is explicit, conditional or excluded;
- identify the correct UK application and verification route;
- prepare the right organisational evidence;
- compare the discounted offer with a simpler free or paid alternative;
- avoid signing up before a discount is approved;
- record renewal, seat and total-cost conditions; and
- find the directory’s fuller software assessment where one exists.

## Scope

### Include

Include a programme when all of the following are true:

- it concerns software, a digital service or a closely connected transaction service;
- it has a plausible operational use for a UK church;
- a current official supplier or authorised UK programme page establishes an offer or application route;
- UK availability can be established, or a material uncertainty can be stated precisely;
- the provider’s religious-organisation eligibility can be classified without inference; and
- the record can be maintained from a stable source.

Suitable offer types are:

- donated or no-cost nonprofit plans;
- donated licences or seats;
- percentage or fixed-price subscription discounts;
- charity transaction rates;
- usage or cloud credits;
- in-kind advertising credits; and
- competitive technology grants only when currently open to UK organisations and clearly separated from recurring offers.

### Exclude from the main offer results

- generic free plans available to everyone;
- consumer, student, education or startup discounts;
- closed or invitation-only grants with no current application route;
- hardware-only offers in the first release;
- supplier claims reproduced only by an unauthorised blog;
- a percentage with no current official eligibility or application information;
- US-only programmes;
- programmes that explicitly exclude churches; and
- products with no plausible church operating use.

Excluded and uncertain programmes may still appear in a short, separately labelled warning section when that prevents a likely procurement mistake.

### “Comprehensive” rather than “all”

The public copy should say that the directory aims to be comprehensive, not that it contains every charity discount. There is no authoritative complete market register, negotiated discounts may not be public, and programmes change without notice. A supplier-update route should invite missing or changed programmes for editorial review.

## Required eligibility model

Religious eligibility is the most important field and must not be compressed to a yes/no badge.

| Internal status | Public wording | Evidence threshold |
| --- | --- | --- |
| `explicitly-eligible` | “Churches are explicitly included” | Current official material names churches, religious charities or faith-based organisations as eligible. |
| `registered-charity-route` | “A UK registered charity may qualify” | Current material accepts UK or international-equivalent registered charities and does not expressly include or exclude churches. Approval remains required. |
| `confirm-first` | “Confirm church eligibility before applying” | UK availability, religious eligibility or conflicting official material is unresolved. |
| `not-for-churches` | “The charity programme excludes churches” | A current official source expressly excludes churches, religious organisations or religious affiliation. |
| `not-in-uk` | “The programme is not currently available in the UK” | Current official geographic criteria omit or exclude the UK. |

The first two statuses still require provider approval. They are evidence classifications, not guarantees that a particular church will be accepted.

Do not expose `unknown`. If a material question cannot be resolved, use `confirm-first` with the exact unresolved question.

## Offer classification

Use these types so unlike benefits are not totalled or compared as though they were cash:

| Type | Meaning | Example |
| --- | --- | --- |
| `donated-plan` | A nonprofit-only plan with no subscription charge | Google Workspace for Nonprofits |
| `donated-licences` | A defined number of licences or seats at no charge | Salesforce Power of Us |
| `subscription-discount` | A lower recurring subscription price | Asana for Nonprofits |
| `transaction-rate` | A reduced processing or per-use fee | PayPal charity rate |
| `usage-credit` | Credit against metered services | Microsoft Azure grant |
| `advertising-credit` | In-kind media inventory with programme conditions | Google Ad Grants |
| `competitive-grant` | Selective funding or credit awarded through a grant round | Future scope only unless a current UK round is verified |

A suite such as Google for Nonprofits should be one record with several benefits, not several duplicate programme cards. The interface may filter by benefit type while retaining one supplier record.

## Research findings

The following landscape was checked on 28 July 2026. It is a planning ledger, not publication-ready copy. Every figure and eligibility rule must be rechecked on the implementation date.

### Strong MVP candidates

| Programme | Current published benefit | Church/UK conclusion | Important qualification | Primary source |
| --- | --- | --- | --- | --- |
| Google for Nonprofits | Workspace for Nonprofits at £0; discounted paid Workspace plans; up to £7,000/month in-kind Search ads; other product benefits | `explicitly-eligible` | Google’s UK eligibility page expressly includes churches and several UK registration/HMRC routes. Each product is activated separately. Advertising credit is not cash. | [UK eligibility](https://support.google.com/nonprofits/answer/3215869?co=GENIE.CountryCode%3DGB&hl=en), [Workspace offers](https://www.google.com/intl/en-GB/nonprofits/offerings/workspace/), [Ad Grants](https://www.google.com/intl/en_uk/grants/) |
| Microsoft for Nonprofits | Microsoft 365 Business Basic free for up to 300 users; Business Standard £2.60/user/month and Business Premium £4.20/user/month, annual commitment and excluding VAT; $2,000 annual Azure credit | `registered-charity-route` | The free grant is Basic, not Premium. Eligible user types and the difference between staff, volunteers, members and beneficiaries must be recorded. | [UK Microsoft 365 pricing](https://www.microsoft.com/en-gb/microsoft-365/business/nonprofit-plans-and-pricing/), [eligibility](https://learn.microsoft.com/en-us/industry/nonprofit/microsoft-for-nonprofits/eligibility), [Azure grant](https://www.microsoft.com/en-us/nonprofits/azure) |
| Canva for Nonprofits | Canva Pro features and collaboration tools free for one team of up to 50 users; 50% off Enterprise for additional seats | `registered-charity-route` | UK registered charities can follow the international verification route, but Canva retains approval discretion and does not expressly single out churches. | [programme](https://www.canva.com/nonprofits/), [eligibility](https://www.canva.com/nonprofits/eligibility-guidelines/) |
| monday.com for Nonprofits | 10 Pro seats free across named monday products; 70% off additional seats; 33% off Enterprise; other product-specific reductions | `registered-charity-route` | UK CICs are expressly ineligible. A registered charity may apply through Goodstack; church eligibility is not expressly stated. | [programme and eligibility](https://support.monday.com/hc/en-us/articles/115005321269-monday-com-for-nonprofits) |
| Asana for Nonprofits | 50% off Starter or Advanced | `registered-charity-route` | International equivalents are accepted. Anti-discrimination review applies; churches are not expressly included or excluded on the current page. | [programme](https://asana.com/industry/nonprofit) |
| Notion for Nonprofits | 50% off the Plus plan for up to three workspaces | `registered-charity-route` | The programme is worldwide, but applies to Plus rather than every paid plan. Notion verifies applications in-house. | [programme](https://www.notion.com/nonprofits) |
| Salesforce Power of Us | 10 Nonprofit Cloud or Sales/Service Cloud licences at no cost; additional licences discounted | `explicitly-eligible` | Religious charitable organisations are included in the published eligibility guidance. The likely implementation and administration cost must be made prominent. | [UK nonprofit pricing](https://www.salesforce.com/uk/nonprofit/pricing/), [eligibility guidance](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/company/p10-eligibility-guidelines-English-2023.pdf) |
| Adobe for Nonprofits | Adobe Express for no charge, discounted Acrobat Pro and Creative Cloud routes; published licence caps vary by product | `registered-charity-route` | Exact UK prices must be checked in the live application/catalogue. Creative Cloud is routed through TechSoup; individual and team licensing differ. | [UK programme](https://www.adobe.com/uk/nonprofits.html), [eligibility and routes](https://helpx.adobe.com/ie/enterprise/using/non-profit.html) |
| Zoom for Nonprofits | 50% off selected annual Zoom products | `registered-charity-route` | Goodstack verification, operating budget of $10 million or less, product restrictions and direct-sales exclusions apply. The old TechSoup route ended; do not reuse stale catalogue instructions. | [programme rules](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0080298) |
| Mailchimp | 15% off marketing plans for verified nonprofits and charities | `registered-charity-route` | International applicants may need to provide a website and other evidence. No retroactive discount; request it before purchase. | [discount guidance](https://mailchimp.com/help/about-nonprofit-discount/) |
| Buffer | 50% off every paid plan for qualifying nonprofit and charity organisations | `confirm-first` | The current page does not clearly establish a UK-specific or church-specific rule. Obtain confirmation before using stronger eligibility wording. | [programme](https://buffer.com/nonprofits), [application guidance](https://support.buffer.com/article/536-nonprofit-discount) |
| Sage nonprofit discounts | 50% off Sage Accounting, Payroll and HR; 20% off Sage People | `explicitly-eligible` | Sage’s UK nonprofit material includes faith-based organisations, but approval is still completed through its validation partner. Product suitability and charity accounting requirements remain separate questions. | [discounts](https://www.sage.com/en-gb/industry/non-profit/product-discounts/), [faith-based context](https://www.sage.com/en-gb/industry/non-profit/) |
| Xero for non-profits | 25% off a business pricing plan | `registered-charity-route` | Available to registered not-for-profit organisations. It is general business accounting software, not proof of fund-accounting or church-reporting fit. | [UK nonprofit offer](https://www.xero.com/uk/small-businesses/non-profit/) |
| PayPal charity pricing | 1.4% plus the applicable fixed fee for domestic charity transactions; the UK charity page currently states £0.20 | `registered-charity-route` | Charity status must be confirmed and approved before the rate applies. International, currency and product-specific charges still matter. | [UK charity page](https://www.paypal.com/uk/charities), [merchant fees](https://www.paypal.com/uk/business/paypal-business-fees?locale.x=en_GB), [application](https://www.paypal.com/uk/cshelp/article/how-do-i-apply-for-the-charity-rate-help221) |
| Ticket Tailor | 50% off Ticket Tailor’s own fees for eligible charities | `registered-charity-route` | Payment-processor fees and VAT are separate. Reuse the existing directory profile and source rather than creating a second assessment. | [official discount guidance](https://help.tickettailor.com/en/articles/8687492-what-discounts-do-we-offer), [directory profile](/software/ticket-tailor/) |
| OpenAI for Nonprofits | ChatGPT Business at $8/user/month annually or $10 monthly; up to 75% off Enterprise | `registered-charity-route` | Prices are in USD, Goodstack approval is required, and there is no nonprofit API discount. AI governance and data-handling decisions remain necessary. | [programme](https://help.openai.com/en/articles/9359041-do-you-offer-nonprofit-pricing) |

### Follow-up candidates

These are useful, but should not be in the initial publication set until the named gap has been settled.

| Programme | Published indication | Gap before publication | Source |
| --- | --- | --- | --- |
| Miro | 30% off paid plans; supplier says it may combine with annual pricing | Establish UK and church eligibility and record the actual combined calculation rather than repeating “about 50%”. | [programme](https://miro.com/npo/) |
| Hootsuite | Up to 60% off selected plans | Establish the applicable UK price, route and religious-organisation criteria. | [HootGiving](https://www.hootsuite.com/about/hootgiving) |
| Okta for Good | 50 Workforce Identity licences free and 50% off additional/advanced products | Confirm the church eligibility route and decide whether the technical relevance justifies an MVP card. | [UK nonprofit page](https://www.okta.com/en-gb/industries/nonprofits/) |
| Twilio.org Impact Access | $100 product credit and unspecified product discounts | Confirm UK church eligibility and obtain the exact current discount terms relevant to likely church use. | [Impact Access](https://www.twilio.org/en-us/support-and-resources/impact-access-program) |
| AWS via Charity Digital | Promotional credits for eligible UK registered charities and public libraries | Verify the current live catalogue amount, administration fee, term and church eligibility. Do not rely on an older article or treat credit as cash. | [Charity Digital supplier page](https://charitydigital.org.uk/suppliers/amazon-web-services) |
| Dropbox team accounts | Nonprofit team-account discounts are available | The official page does not publish a percentage or clear UK/church criteria. Do not repeat the reference directory’s unsupported 50% figure. | [Dropbox help](https://help.dropbox.com/billing/discounts) |
| Existing church-software offers | The repository already records charity pricing or subsidy information for Ticket Tailor, Navaro, Chobble Tickets, Church Pages, SignMeUp and others | Audit each existing entry and source before surfacing it. Do not infer that every discretionary subsidy is a standard charity discount. | Existing `src/content/software/*.json` records |

### Exclusions and warnings worth publishing

| Programme | Current conclusion | Evidence |
| --- | --- | --- |
| Slack for Charities | `not-for-churches`: Slack offers a free Pro upgrade for eligible workspaces of 250 or fewer and 85% discounts in other cases, but explicitly excludes a church, association of churches or other religious organisation. The ordinary Slack free plan remains available on normal terms. | [Slack eligibility](https://slack.com/intl/en-gb/help/articles/204368833-Apply-for-the-Slack-for-Charities-discount) |
| Airtable nonprofit plan | `not-for-churches`: Airtable’s 50% Team discount explicitly excludes churches and other religious/evangelical organisations. | [Airtable eligibility](https://support.airtable.com/nonprofit-and-educational-plans-faqs) |
| HubSpot for Nonprofits | `not-in-uk`: the current 40% programme is limited to nonprofits registered in North America, Australia or New Zealand. | [HubSpot programme](https://www.hubspot.com/nonprofits) |
| Atlassian Social Impact/Community pricing | `confirm-first`: current official pages conflict. The cloud licensing page says eligible organisations must have no religious affiliation, while newer Social Impact purchasing material does not repeat that phrase. Do not present the discount as church-available without written clarification. | [cloud licensing](https://www.atlassian.com/licensing/cloud), [purchasing FAQ](https://www.atlassian.com/licensing/purchase-licensing) |
| Stripe | No current published UK charity-specific rate was found. Standard or negotiated commercial pricing is not a charity offer. | [UK pricing](https://stripe.com/gb/pricing) |

### Verification routes

The page should explain these once, not repeat a long definition on every card:

- **Goodstack** validates many international nonprofit programmes. Verification does not override the supplier’s own exclusions or guarantee approval.
- **TechSoup UK and Charity Digital** are important UK access routes. The former Charity Digital Exchange catalogue transferred to TechSoup UK in July 2025, while Charity Digital continues to provide resources and a smaller selection of services. Product-specific eligibility and administration fees still apply. Treat each as a gateway, not as one giant discount. See [Charity Digital’s transition notice](https://charitydigital.org.uk/topics/changes-to-the-charity-digital-exchange-12151?redirected=1).
- **Direct supplier verification** may require an organisation website, governing document, regulator entry, HMRC recognition, official email address or proof that the applicant is authorised.

The page must recognise that not every English or Welsh church has a Charity Commission number. Some churches are excepted from registration, while small charities and exempt bodies may use other evidence. The [Charity Commission’s excepted-charity guidance](https://www.gov.uk/government/publications/excepted-charities) should inform the application checklist. Do not advise a church to change legal structure or register merely to obtain a discount.

## Information architecture

### Recommended route and title

- Route: `/charity-software-discounts/`
- H1: `Software discounts for UK churches and charities`
- Suggested SEO title: `Software discounts for UK churches and charities`
- Suggested description: `Find current software discounts, donated licences and credits for UK churches, with church eligibility, application routes and checked sources.`

Avoid `/grants/` as the canonical route. If later keyword evidence justifies it, `/grants/` may redirect to the hub, but it should not create a duplicate page.

### MVP page structure

1. **Quick answer**  
   Explain that registered and otherwise recognised churches may qualify, but every programme has its own rules.

2. **Before you apply**  
   A short checklist: identify the legal body, gather regulator/HMRC/governing evidence, use an organisational email, count eligible staff seats rather than the congregation, and compare total cost after the discounted term.

3. **Best-established starting points**  
   Four calm, non-ranked callouts for Google, Microsoft, Canva and one finance/operations option. “Starting points” must not imply endorsement.

4. **Search and filters**  
   Search by product or task. Filter by category, benefit type and eligibility confidence.

5. **Programme results**  
   Accessible cards or rows containing the current benefit, church status, UK route, material conditions, checked date, official application link and optional internal profile link.

6. **Not available or confirm first**  
   A visibly separate section for Slack, Airtable, HubSpot and unresolved Atlassian eligibility.

7. **How verification works**  
   Explain Goodstack, Charity Digital and direct supplier routes without implying partnership.

8. **Application and renewal checklist**  
   A reusable procurement tool covering proof, seats, VAT/currency, annual commitment, implementation, data export, renewal and an accountable owner.

9. **Method and research limits**  
   State inclusion rules, source preference, checked date, absence of hands-on testing and how to report a change.

### Filters and URL state

Use progressive enhancement and URL query parameters:

- `q=` for text search;
- `category=` for office/collaboration, communications/design, work management, finance/payroll, CRM/fundraising, meetings/events, payments, security, AI/cloud/developer;
- `benefit=` for donated plan, licences, subscription discount, transaction rate or credit; and
- `eligibility=` for explicitly eligible, registered-charity route or confirm first.

The unfiltered page must contain all main results in crawlable static HTML. Invalid parameters should be ignored safely. Query variants should canonicalise to the base route. Essential state must not depend on `localStorage`.

Do not include excluded programmes in a default “available offers” count. Do not rank by percentage, because percentages apply to unlike bases and can favour expensive products.

### Card content

Every published programme card should show:

- provider/programme name;
- independent one-sentence summary;
- task categories;
- benefit type;
- exact published benefit with currency and billing qualifier where known;
- human-readable church eligibility status;
- material limits such as seats, staff-only use, budget cap, new-customer rule or product exclusions;
- application route;
- one “First check” question;
- last checked date;
- official source/application link; and
- related Church Software UK profile when one exists.

Use CTA text such as “Check eligibility with Canva”, not “Claim now”.

## Content model

Add a `charityOffers` collection in `src/content.config.ts`, loaded from `src/content/charity-offers/*.json`.

One entry represents one supplier programme or suite. Benefits within a suite are nested so Google and Microsoft are not duplicated.

### Proposed fields

| Field | Purpose |
| --- | --- |
| `name`, `slug`, `provider`, `officialWebsite` | Stable identity |
| `summary` | Independent 40–220 character description |
| `categories` | Controlled task categories |
| `benefits[]` | One or more typed benefits with `type`, `label`, `value`, `qualifier`, optional term/seat/currency fields and `sourceRefs` |
| `churchEligibility.status` | One of the five statuses defined above |
| `churchEligibility.summary` | Exact public explanation |
| `churchEligibility.sourceRefs` | Evidence for the classification |
| `ukAvailability.status` | `confirmed`, `conditional` or `not-available` |
| `ukAvailability.summary` | Country/registration qualification |
| `requirements[]` | Documents, customer status, budget, eligible users, billing and renewal conditions |
| `application.route` | `direct`, `goodstack`, `techsoup-uk`, `charity-digital`, `sales` or `support` |
| `application.url` | Current application or programme URL |
| `application.steps[]` | Only source-backed steps |
| `caveats[]` | Material exclusions and total-cost conditions |
| `firstCheck` | One procurement question specific to this offer |
| `relatedSoftware` | Optional `reference("software")`; offers link to listings, not vice versa |
| `sources[]` | `id`, label, URL, checked date and supported fields |
| `lastChecked`, `reviewDue` | Freshness control |
| `publicationStatus` | `published`, `warning`, `hold` or `retired` |
| `affiliateRelationship`, `sponsored` | Existing commercial safeguards |

Benefits and eligibility records must reference source IDs that exist in `sources[]`. A checked date without a source must fail validation.

`publicationStatus: warning` permits an explicitly excluded or not-UK programme to appear only in the warning section. `hold` records research without rendering it. `retired` preserves history without presenting an old offer as current.

### Relationship to existing software entries

The offer collection should be the source of truth for the charity programme section. `relatedSoftware` creates an optional one-way link to a fuller product profile. This avoids adding empty fields to all current software records and lets the offer page find related listings by reverse lookup.

When an existing profile already mentions the same offer:

1. recheck both records against the same current official source;
2. keep the full pricing context in the software profile;
3. keep the eligibility/application context in the offer record;
4. use consistent checked dates and wording; and
5. add an integrity check that reports divergent benefit text or source URLs for linked records.

Do not create a normal software listing solely because a provider has a charity discount. General-purpose tools still need to meet the directory’s normal product-scope and research threshold.

## Technical implementation

### Likely files

- `src/content.config.ts` — add and export the new collection schema.
- `src/content/charity-offers/*.json` — researched programme records.
- `src/pages/charity-software-discounts/index.astro` — static hub route.
- `src/components/CharityOfferCard.astro` — programme presentation.
- `src/components/CharityOfferFilters.astro` — semantic controls and result summary.
- `src/components/SiteHeader.astro` and `src/components/SiteFooter.astro` — add a restrained navigation link after the page is complete.
- `src/styles/global.css` — reuse Doorway tokens and existing card/table conventions.
- `src/pages/data/charity-offers.json.ts` — optional structured public export, with internal/hold fields removed.
- `scripts/check-charity-offers.mjs` — evidence, source-reference, freshness and relationship checks.
- `test/charity-offer-state.test.mjs` — URL-loaded, empty and invalid filter states.
- `package.json` — include the new content check in `npm run check` and the interaction test where appropriate.
- `docs/CONTENT_FIELDS.md` — document the schema and editorial thresholds.
- `docs/PROJECT_SPEC.md`, `docs/IMPLEMENTATION.md` and `docs/IMPLEMENTATION_STATUS.md` — record the route, collection and delivered phase.
- `docs/GROWTH_STRATEGY.md` or `docs/ROADMAP.md` — add the maintained decision asset only if its strategic/phase status changes.

### Rendering and behaviour

- Load and sort collection data at build time.
- Render all published main records on the server.
- Enhance filtering with a small framework-free TypeScript or inline module.
- Update the URL with `history.replaceState` or `pushState` as appropriate.
- Preserve browser back/forward behaviour.
- Announce result-count changes with a restrained `aria-live="polite"` region.
- Keep excluded programmes in a separate server-rendered section.
- Do not add React, a search dependency or a client-side state library.

### Design

Follow `docs/DESIGN_SYSTEM.md`.

- Use Doorway tokens, standard borders, restrained green/blue accents and existing type scale.
- Use text labels for every eligibility state; colour may reinforce but must not carry meaning.
- Avoid coupon styling, oversized percentages, countdowns, “free money” language, animated totals and supplier-logo walls.
- Do not use supplier logos unless the project has a suitable licensed asset and provenance record.
- On mobile, keep each card readable without horizontal scrolling. Use a responsive table only for the optional compact comparison.
- Keep source dates and caveats visible rather than hiding them in hover content.

### SEO and structured data

- Unique title, description, canonical URL and Open Graph metadata.
- `CollectionPage`, `ItemList` and `BreadcrumbList` structured data may describe visible content.
- Do not emit aggregate-price, review, rating or unsupported `Offer` schema.
- Do not add FAQ structured data unless the matching questions and answers are visible.
- Link internally from relevant guides, category pages and software profiles only where editorially useful.
- Include the route in the generated sitemap and run the sitemap validation.
- Canonicalise filtered URLs to the unfiltered route; do not create indexable filter archives.

### Public data export

An optional `/data/charity-offers.json` export would support transparency and future reuse. It should expose:

- published and warning records only;
- the evidence-backed public benefit and eligibility wording;
- checked dates and source URLs;
- related software slugs; and
- no internal notes, hold records or unverified values.

Do not publish an aggregate theoretical saving.

## Editorial workflow

For every programme:

1. Confirm the official programme exists.
2. Confirm UK availability from the supplier or authorised UK route.
3. Search the full eligibility and exclusion text for church, religious, faith, membership and discrimination terms.
4. Record whether the offer applies to staff, volunteers, members, beneficiaries or a limited set of seats.
5. Record price, currency, VAT, annual commitment, renewal, product and new-customer qualifiers.
6. Record the application and verification route.
7. Separate donated subscription, credit and competitive grant benefits.
8. Write one independent summary and one first-check question.
9. Record exact source support and checked dates.
10. Have a second editorial review for `explicitly-eligible`, `not-for-churches` and `not-in-uk` classifications.

Do not automatically copy updates from supplier pages. Monitoring may create a review task, but a maintainer must approve public changes.

## Freshness and maintenance

Offers are more volatile than ordinary product descriptions.

- Review published programmes every 90 days.
- Warn maintainers when an entry is 75 days old.
- Fail `check:charity-offers` when a published or warning record is more than 120 days old.
- Recheck any programme immediately when a reader or supplier reports a change.
- Review official eligibility and exclusions, not only the headline percentage.
- Retire a programme rather than deleting its evidence trail.
- Never display “updated weekly” unless a real weekly review occurred.

Suggested routine:

- monthly: review the highest-use providers and reported changes;
- quarterly: recheck every published and warning record;
- six-monthly: rescan the market, TechSoup UK and Charity Digital for candidates;
- annually: review whether the section’s categories, filters and route still match reader needs.

## Analytics and feedback

If analytics are enabled later, measure:

- visits to the hub;
- filter and search use;
- outbound official-application clicks;
- visits from offers to related directory profiles;
- searches with no results; and
- submitted correction/supplier-update reports.

Do not track a church’s legal documents, application state or eligibility answers. Do not estimate “money saved” from click data.

Useful success measures after three months:

- at least 12 current, source-complete programmes;
- no published record beyond its freshness threshold;
- no programme incorrectly presented as church-eligible;
- evidence that readers use official-application and related-profile links; and
- a manageable correction/review workload for one maintainer.

## Delivery phases

### Phase 1: schema and editorial foundation

- Add the collection schema and field documentation.
- Add validation for source references, eligibility status and dates.
- Create three representative fixtures: Google, Canva and Slack warning.
- Confirm that warning and hold records cannot leak into the main results.
- Decide the initial category vocabulary from the verified seed set.

Exit criterion: schema and checks pass with representative records.

### Phase 2: verified seed set

- Research and enter 12–18 programmes from the MVP table.
- Add Slack, Airtable and HubSpot warning records.
- Add Atlassian as `hold` until the official-source conflict is settled; publish a warning only if the wording can remain precise.
- Link Ticket Tailor and any other audited existing profiles.
- Complete a factual editorial review of every benefit and eligibility conclusion.

Exit criterion: every visible claim has a current source and no hold record renders.

### Phase 3: page and interaction

- Build the static hub, cards, filters, checklists and methodology.
- Implement URL-loaded filter state, back/forward state, empty state and invalid-parameter handling.
- Add the route to appropriate navigation.
- Add structured data and optional public JSON export.

Exit criterion: the page remains complete and usable with JavaScript disabled, while filters enhance it when enabled.

### Phase 4: quality assurance and documentation

- Run the full content, type, build, sitemap, internal-link and accessibility checks.
- Inspect the generated page, metadata, structured data and export.
- Test keyboard interaction, visible focus, screen-reader labels, result announcements and mobile layout.
- Check default, URL-loaded, empty and invalid filter states.
- Review every external link and every GBP/USD/VAT qualifier.
- Recheck all programme facts on the implementation date.
- Update project documentation and implementation status.

Exit criterion: all required checks pass and the final factual review is recorded.

### Phase 5: measured expansion

- Add Miro, Hootsuite, Okta, Twilio, AWS, Dropbox and further Charity Digital programmes only as their gaps are settled.
- Audit existing software entries with charity pricing and add relationships where useful.
- Consider individual offer detail pages only where a programme needs substantial unique guidance. Do not generate thin pages mechanically.
- Consider a separate standard-compliant guide, “How to apply for charity software discounts”, only if it adds a reusable decision tool beyond the hub.

## Acceptance criteria

The implementation is complete when:

- `/charity-software-discounts/` is statically generated and indexable;
- the page accurately distinguishes discounts, donated licences, credits and grants;
- every main programme has a sourced UK and church-eligibility classification;
- programmes that explicitly exclude churches never appear as available;
- no unpublished, hold or stale record leaks into public output;
- source and checked dates are visible;
- the page works without JavaScript;
- filtering is keyboard accessible and URL-based;
- invalid parameters fail safely;
- existing software profiles link without duplicating assessments;
- no theoretical total saving, ranking score or fake urgency appears;
- metadata, canonical URL, structured data and sitemap are valid;
- project documentation reflects the new collection and maintenance process; and
- `npm run check`, `npm run build`, `git diff --check` and `npm run check:sitemap` pass.

## Main risks and mitigations

| Risk | Mitigation |
| --- | --- |
| A generic nonprofit programme excludes religious organisations | Mandatory religious-eligibility field, full exclusion-text review and second editorial check |
| A UK church has no Charity Commission number | Explain excepted/HMRC and nation-specific routes without giving legal advice; tell readers to use the provider’s accepted evidence |
| A headline “free” plan has staff, seat or product limits | Show eligible-user, seat, term and renewal conditions beside the benefit |
| Old TechSoup or blog information remains in search results | Prefer the current supplier route and record retired routes in caveats |
| A credit is mistaken for cash or saving | Separate benefit types and ban aggregate totals |
| Duplicated suite entries inflate coverage | One programme record with nested benefits |
| Discount content drifts from an existing profile | Related-record integrity check and shared sources/checked dates |
| The page becomes a coupon directory | Keep first-check questions, total-cost cautions, source dates and independent presentation |
| Maintenance becomes too large | Start with a small verified set, impose a freshness gate and hold incomplete candidates |
| Filter pages create thin SEO variants | Static single route, canonical base URL and no indexable filter archives |

## Decision

Proceed with a dedicated `/charity-software-discounts/` hub backed by a new `charityOffers` collection.

The defining value should be **accurate church eligibility**, not the number of logos or the size of an unverifiable savings total. Launch with a small, current and useful set; publish explicit exclusions where they prevent mistakes; and make maintenance part of the feature rather than a later clean-up task.
