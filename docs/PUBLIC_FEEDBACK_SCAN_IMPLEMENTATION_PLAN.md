# Public feedback scan implementation plan

Status: proposed  
Date: 26 July 2026  
Internal working name: Online Sentiment Aggregator

## Purpose

Add a panel to every software profile that gives a balanced, dated and
traceable synthesis of eligible public feedback about that product for a UK
church reader.

The public feature name should be **Public feedback scan**. Do not describe the
research as having found “everything said online”: search coverage, platform
access, deleted material, closed communities, language and sampling make that
claim impossible to substantiate.

The intended reader outcome is:

> Understand the recurring experiences reported publicly, the limits of that
> evidence and the practical checks a UK church should perform before
> shortlisting the product.

This document is an implementation brief for an agent. It does not itself
authorise automatic publication of researched product claims. Research and
drafting may be agent-assisted, but the final public synthesis requires human
editorial approval.

## Instructions for the implementing agent

Before changing anything:

1. Read `AGENTS.md`.
2. Read `docs/DESIGN_SYSTEM.md`.
3. Read `docs/PROJECT_SPEC.md`.
4. Read `docs/IMPLEMENTATION.md`.
5. Read `docs/PRINCIPLES.md`.
6. Read `docs/ROADMAP.md`.
7. Read `docs/IMPLEMENTATION_STATUS.md`.
8. Read `docs/CONTENT_FIELDS.md`.
9. Read `docs/MAINTENANCE.md`.
10. Inspect the current content schema, software route, review component,
    software template, validation scripts and maintenance dashboard.
11. Check the branch and run `git status`.
12. Preserve unrelated work and do not broaden the task.

Use a dedicated feature branch for substantial implementation work. Implement
and validate the pilot before attempting a catalogue-wide rollout.

## Current repository baseline

At the time this plan was written, the checkout contained 148 software JSON
entries.

Existing partial implementations are:

- `src/components/ExternalReviews.astro`, which displays independently hosted
  review-profile links and optional platform ratings and counts;
- `externalReviews` in `src/content.config.ts`, which records confirmed profile
  URLs, product/company scope, checked dates and optional volatile figures;
- `longForm.userFeedback` in `src/content.config.ts`, which holds a limited
  prose summary and themes for long-form profiles;
- separate render locations for those two features in
  `src/pages/software/[slug].astro`; and
- research and field rules in `docs/CONTENT_FIELDS.md`.

The baseline audit found:

- 61 listings with at least one `externalReviews` reference;
- 107 external review-profile references in total;
- 51 listings with `longForm.userFeedback`; and
- approximately 14 of those 51 containing substantive independent-feedback
  synthesis rather than supplier-only or no-independent-review caveats.

Verify these figures again before migration because the catalogue is changing.

The new feature must consolidate these partial implementations. Do not create a
third unrelated review system or leave duplicate public summaries on the page.

## Product principles

The panel must:

- help a church make a decision rather than maximise supplier clicks;
- keep public feedback separate from supplier facts and directory assessment;
- expose source scope, dates, sampling and limitations;
- distinguish product, app, module and company-level feedback;
- treat old feedback as historical rather than current;
- describe themes and trade-offs rather than manufacture a score;
- give UK-specific practical checks without pretending the feedback is UK-wide;
- remain useful when evidence is very limited or no eligible material is found;
- preserve static generation and semantic HTML;
- contain no third-party widgets or required client-side JavaScript; and
- remain maintainable by one primary maintainer.

The panel must not:

- claim comprehensive coverage of the internet;
- publish a directory-wide star rating or sentiment percentage;
- describe a sample as representative unless that can genuinely be established;
- use phrases such as “most users” merely from review counts;
- turn a missing answer into a negative claim;
- merge company reviews into product reviews without a visible distinction;
- present a supplier testimonial as independent user feedback;
- copy review bodies, reviewer names or profile identifiers;
- republish personal disputes, defamatory allegations or sensitive information;
- imply hands-on testing;
- add `Review` or `AggregateRating` structured data;
- scrape review platforms;
- feed platform content into AI where the platform terms do not allow that use;
- load platform scripts, widgets, badges or hotlinked branding; or
- allow affiliate or sponsored status to affect selection, wording or prominence.

## Legal, policy and trust gate

Treat the proposed synthesis as potentially within the scope of UK rules for
publishing consumer review information until a competent review establishes the
project’s precise position.

The Competition and Markets Authority describes overall summaries, ratings,
review counts and rankings derived from reviews as consumer review information.
Its current guidance addresses:

- misleading presentation;
- suppression or cherry-picking;
- old reviews that may no longer describe the current product;
- concealed incentives;
- clear public policies;
- proportionate risk assessment, detection and investigation;
- correction or removal of false or misleading review information; and
- disclosure of commercial interests.

Relevant primary guidance:

- <https://www.gov.uk/government/publications/fake-reviews>
- <https://www.gov.uk/government/publications/reviews-guidance-for-online-review-sites/reviews-guidance-for-online-review-sites>
- <https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf>

Before publishing the first panel:

1. Add a plain-English public-feedback methodology and policy to the site.
2. Explain the approach to fake, suspicious and incentivised feedback.
3. Explain source inclusion, exclusions, sampling and ageing.
4. Provide a working route for reporting a misleading summary or source.
5. Define an internal challenge, investigation and correction procedure.
6. Retain the existing commercial-independence disclosures.
7. Obtain an appropriate legal review of the method and public wording.

Do not treat this document as legal advice.

## Source-permission policy

Maintain a source register before undertaking systematic research. Record the
source or platform, access route, applicable terms checked date, permitted use
and any deletion or attribution obligations.

Use these default treatments:

| Source position | Treatment |
| --- | --- |
| Permitted API or syndication arrangement | Retrieve only within the licence and rate limits; minimise stored data and honour deletion obligations |
| Public page whose terms allow the intended use | Review manually and create original, anonymised evidence notes |
| Public page with unclear reuse or automated-use terms | Use for discovery or a profile link only until permission is established |
| Terms prohibit scraping, automated acquisition, derivative summaries or AI input | Do not retrieve automatically or submit its content to an AI workflow |
| Closed, private, paid or sign-in-only community | Exclude unless explicit permission covers the intended research and publication |
| Search-result snippet | Use for discovery only; open and confirm the underlying source before relying on it |

Examples that need special care:

- Trustpilot provides licensed API/data products. If review data is stored from
  its APIs, follow the applicable deletion process and licence terms:
  <https://developers.trustpilot.com/data-solutions-get-started>.
- Gartner’s terms cover Capterra and restrict automated acquisition and
  generative-AI use of its content:
  <https://www.gartner.com/en/about/policies/terms-of-use>.

The existing project rule remains authoritative: do not scrape review
platforms. A normal public profile link may still be recorded when it has been
manually matched to the right product or company.

## Research protocol

### 1. Create a product identity card

Before searching for opinions, record:

- current product name;
- supplier or operating company;
- official domain;
- previous names and common abbreviations;
- mobile app names and store IDs;
- known modules or companion apps;
- suite relationships;
- the geographic market;
- similarly named products that must be excluded; and
- whether each discovered profile concerns the product, app, module or company.

Do not use a review-profile match unless the identity is sufficiently clear.

### 2. Define the research window

Default proposal:

- prioritise material published in the previous 24 months;
- retain older feedback only where it provides useful historical context;
- label historical themes and do not present them as current product behaviour;
- record the earliest and latest item dates actually reviewed; and
- record the scan completion date separately from the listing’s general
  `lastChecked` date.

The pilot may adjust the default window when product release cycles or very thin
samples justify a different approach. Any variation must be recorded.

### 3. Run a balanced query pack

Record the search date, search service and exact queries used.

Base queries:

```text
"[product name]" review
"[product name]" church software
"[product name]" support
"[product name]" migration
"[product name]" export
"[product name]" mobile
"[product name]" usability
"[product name]" recommend
"[product name]" problems
"[product name]" alternative
"[product name]" UK
```

Add decision-specific queries where material:

```text
"[product name]" Gift Aid
"[product name]" GDPR
"[product name]" VAT
"[product name]" safeguarding
"[product name]" volunteer
"[product name]" multisite
"[product name]" app login
```

Run relevant site-specific searches for:

- Apple App Store UK;
- Google Play;
- confirmed independent review platforms;
- public church-technology forums;
- public Reddit discussions;
- public videos and their substantive discussion;
- church-technology publications;
- public implementation or migration accounts; and
- the supplier name where company-level service feedback may otherwise be
  missed.

Use positive and negative search terms. Do not use search ranking as evidence
of prevalence.

### 4. Apply eligibility rules

Include material only when:

- the product, app, module or company match is clear;
- the source is publicly accessible under an acceptable use route;
- the item contains a relevant experience or decision signal;
- the item date is known or its unknown date is recorded as a limitation;
- its scope can be described honestly; and
- retaining an anonymised evidence note is proportionate.

Exclude or quarantine:

- duplicates and syndicated copies;
- supplier-selected testimonials from the independent-feedback synthesis;
- vague reactions without a relevant product experience;
- likely product-name mismatches;
- copied marketing material;
- reviewer identities and unnecessary personal information;
- private or closed-community material without permission;
- allegations of crime, fraud, abuse, data breach, unlawful conduct or other
  high-risk factual claims unless supported by an appropriate authoritative
  source and separately editorially reviewed; and
- content whose platform terms do not permit the intended use.

Record exclusion reasons so positive and negative material are treated
consistently.

### 5. Use a repeatable volume and sampling rule

Proposed pilot rule:

- when a source contains 50 or fewer eligible items in the window, review all
  accessible items;
- when it contains more than 50, review the 20 most recent items and a
  documented systematic sample of 30 from the remainder of the window;
- where ratings are available and their use is permitted, check that the sample
  is not accidentally limited to one rating band;
- deduplicate the recent and systematic portions;
- record inaccessible pages and platform-result limits;
- cap the total reviewed per product during the pilot; and
- do not publish sample percentages or claim statistical representativeness.

The final cap should be approved after the pilot measures research time and
theme stability.

### 6. Record an anonymised evidence ledger

The internal ledger should use stable evidence IDs and contain:

- source URL;
- source/platform name;
- source type;
- product, app, module or company scope;
- publication date where known;
- checked date;
- UK, non-UK or unknown geographic context;
- product version or period where identifiable;
- first-hand, second-hand or editorial evidence classification;
- disclosed incentive or commercial relationship;
- topic tags;
- positive, negative, mixed or neutral signal;
- a concise original evidence note;
- a possible theme;
- eligibility state;
- exclusion reason where relevant; and
- researcher/editor notes.

Suggested topic tags include:

- setup and onboarding;
- everyday administration;
- volunteer and member adoption;
- mobile use;
- support;
- reliability;
- integrations;
- import and migration;
- export and leaving;
- communications;
- payments or Gift Aid;
- permissions and sensitive records;
- reporting;
- pricing and value;
- learning curve; and
- product changes over time.

Do not store copied review bodies, names, profile handles or unnecessary
identifiers. Public usernames and online identifiers can constitute personal
data. Relevant ICO guidance:

- <https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/personal-information-what-is-it/what-is-personal-information-a-guide/>

If the repository is public, do not commit raw research material containing
personal data or licence-restricted content. Keep any necessary restricted
working material in an approved private location with a documented retention
period.

## AI-assisted synthesis protocol

AI may assist only after eligible source material has been converted into the
anonymised evidence ledger, and only where the source terms permit the intended
processing.

The agent should:

1. Group evidence by operational topic rather than only positive/negative
   polarity.
2. Separate current and historical material.
3. Separate product, app, module and company feedback.
4. Separate UK-specific feedback from non-UK or unknown-location feedback.
5. Identify conflicting experiences and possible context such as date, version,
   church size, implementation quality or geography.
6. Generate candidate themes with the exact evidence IDs that support each one.
7. Generate a list of contrary evidence for every candidate theme.
8. Draft a qualified UK-church implication separately from what contributors
   reported.
9. Produce a limitations statement.
10. Stop and flag high-risk claims rather than trying to neutralise them through
    wording.

Suggested recurring-theme threshold:

- support from at least two distinct source contexts; or
- at least three apparently independent reports on one suitable platform.

This threshold identifies repetition, not truth or population prevalence. A
theme supported by one source type should be attributed to that context, for
example “Recent App Store feedback repeatedly mentions…”, rather than “Users
say…”.

One-off material may be presented only as an isolated issue to test when it is
decision-relevant, low risk and clearly labelled. Do not inflate it into a
theme.

The synthesis must not:

- convert item counts into satisfaction percentages;
- state or imply that all, most or a representative set of users agree;
- treat platform verification as proof that every statement is true;
- treat an absence of complaints as evidence of quality;
- treat negative feedback as evidence that a capability is absent;
- use a supplier response to erase the original concern;
- turn review text into unsupported factual claims; or
- create a universal recommendation.

## Human editorial review

Before publication, a human editor must:

1. Confirm the product identity and every profile match.
2. Confirm that the source-permission rules were followed.
3. Open the underlying eligible sources supporting every public theme.
4. Check that positive and negative evidence received equivalent treatment.
5. Check the recency, product version and geographic qualifications.
6. Check every theme’s evidence threshold and contrary evidence.
7. Ensure the UK-church takeaways are directory assessment, not attributed user
   claims.
8. Remove copied language, personal information and high-risk allegations.
9. Confirm the coverage and sampling disclosure is accurate.
10. Approve the final wording and next review date.

Suppliers may report factual mismatches and provide evidence through the normal
correction route. They must not receive approval rights over independent
editorial conclusions or the ability to suppress genuine negative themes.

## Public copy structure

Every completed panel should answer:

1. What positive experiences recur?
2. What concerns or trade-offs recur?
3. Where does feedback conflict?
4. How current and UK-relevant is it?
5. What should a UK church test for itself?
6. What can the sample not establish?

Recommended public language:

- eyebrow: `Public feedback scan`;
- heading: `What public reviewers and church-tech discussions suggest`;
- short balanced synthesis;
- `Repeated positive themes`;
- `Repeated concerns and trade-offs`;
- optional `Where experiences differ`;
- `What this means for a UK church`;
- coverage metadata; and
- expandable `Sources searched, scope and limitations`.

Avoid the public label “sentiment aggregator”. It sounds automated and may imply
a complete or statistically representative score.

## Meaningful content states

After the full rollout, every software listing should render one of:

### Recurring themes found

There is enough eligible material to publish qualified repeated themes.

### Limited public feedback

There are useful observations but not enough evidence for a broad synthesis.
State what was found without implying recurrence.

### No usable public feedback found

The documented scan was completed but found no eligible material. Say:

> We did not find usable public feedback in the sources and date range checked.

Do not say:

> No one has reviewed this product.

During the pilot and staged migration, an unresearched listing should omit the
panel. Do not confuse “not yet researched” with “no feedback found”. Make the
field required only after every current listing has genuinely completed the
research process.

## Proposed content model

Move the public synthesis to an optional top-level `publicFeedback` object
during the pilot. It must not depend on `longForm`.

Illustrative schema shape:

```ts
publicFeedback: {
  status:
    | "themes-found"
    | "limited"
    | "no-usable-feedback";
  summary: string;
  positiveThemes: Array<{
    label: string;
    summary: string;
    sourceUrls: string[];
  }>;
  concernThemes: Array<{
    label: string;
    summary: string;
    sourceUrls: string[];
  }>;
  conflictingEvidence: Array<{
    summary: string;
    sourceUrls: string[];
  }>;
  ukChurchTakeaways: string[];
  checked: Date;
  windowStart?: Date;
  windowEnd: Date;
  itemsReviewed: number;
  sourceTypes: string[];
  ukEvidence: "substantial" | "some" | "limited" | "none-found";
  sampleMethod: string;
  limitations: string[];
  methodVersion: "1.0";
}
```

Refine exact field names during implementation, but preserve these concepts.
Avoid a single `sentiment` value or numeric score.

Schema rules should include:

- at least one public summary;
- non-empty UK church takeaways for `themes-found` and `limited`;
- at least one source URL for every published theme;
- `sourceUrls` must also exist in the listing’s normal `sources[]`;
- no themes required for `no-usable-feedback`;
- non-negative integer `itemsReviewed`;
- valid date ordering;
- no future checked dates;
- an explicit sampling method;
- an explicit limitation statement; and
- a method-version field to support later methodological changes.

Decide during the pilot whether source coverage should be represented by
structured source records rather than the `sourceTypes` summary. Do not duplicate
the item-level ledger inside the public software JSON.

## Existing-field migration

### `externalReviews`

Retain confirmed external profile references initially because they already
encode:

- platform;
- profile URL;
- product/company scope;
- access method;
- checked date; and
- optional rating/count metadata.

Integrate their presentation into the new panel. Do not render the existing
standalone `External reviews` block once the new panel is active.

Review whether public ratings and counts should remain visible. The safer
version-one default is:

- link to the matched external profile;
- show product/company scope and checked date;
- show a material scope note;
- omit volatile ratings and review counts from the main synthesis; and
- retain no rating-based rich-result markup.

Do not remove existing data until the migration decision and public rendering
have been reviewed.

### `longForm.userFeedback`

Migrate substantive feedback into the new top-level object with fresh source
and method review. Do not mechanically copy it:

- verify the sources;
- confirm dates and scope;
- apply the recurring-theme threshold;
- add coverage and sampling metadata;
- add UK-church takeaways; and
- remove the old duplicate page section after migration.

Supplier-only or “no independent score” placeholders should normally become a
completed `limited` or `no-usable-feedback` state only after a real scan.

Update:

- `src/content.config.ts`;
- `docs/content-templates/software.template.json`;
- `docs/CONTENT_FIELDS.md`;
- `docs/IMPLEMENTATION.md`;
- `docs/IMPLEMENTATION_STATUS.md`;
- `docs/MAINTENANCE.md`;
- the public data export decision;
- the maintenance dashboard;
- content-integrity checks; and
- any other route or script that reads the affected fields.

## Public component and page position

Create a focused reusable component, for example:

```text
src/components/PublicFeedbackScan.astro
```

Recommended placement in `src/pages/software/[slug].astro`:

```text
Directory assessment
Public feedback scan
Procurement verdict
Decision evidence
Best suited to
Strengths and limitations
...
```

This preserves the directory’s assessment as the primary conclusion, adds the
external-feedback signal and then turns both into procurement questions.

Remove the duplicate later `longForm.userFeedback` section when the new panel
is rendered.

## Panel wireframe

```text
┌──────────────────────────────────────────────────────────┐
│ Public feedback scan                                     │
│ What public reviewers and church-tech discussions suggest│
│                                                          │
│ Two-to-three sentence balanced synthesis.                │
│                                                          │
│ Repeated positive themes   Repeated concerns             │
│ • Qualified theme          • Qualified theme             │
│ • Qualified theme          • Qualified theme             │
│                                                          │
│ Where experiences differ                                 │
│ Qualified conflicting evidence, when useful.             │
│                                                          │
│ What this means for a UK church                          │
│ • Concrete trial or supplier check                       │
│ • Concrete implementation or exit check                  │
│                                                          │
│ Coverage                                                 │
│ Items examined · source types · date range · checked date│
│ UK-specific evidence: Limited / Some / Substantial       │
│                                                          │
│ ▸ Sources searched, scope and limitations                │
└──────────────────────────────────────────────────────────┘
```

## Design and accessibility requirements

Follow `docs/DESIGN_SYSTEM.md`.

Use:

- a normal Doorway `--surface` or paper background;
- a one-pixel `--rule` border;
- the standard 16px card radius;
- existing spacing and typography tokens;
- semantic headings and lists;
- a metadata `<dl>`;
- native `<details>` and `<summary>` for expanded methodology/source detail;
- descriptive external-link labels;
- visible focus states; and
- a single-column layout at narrow widths.

Do not use:

- star icons;
- gauges;
- score rings;
- positive/negative colour coding;
- red/green meaning;
- testimonial quotation styling;
- platform logos or badges;
- large shadows;
- animation; or
- client-side rendering.

The panel must remain understandable when CSS is unavailable and must not rely
on colour for any distinction.

## SEO and structured data

Keep the existing `SoftwareApplication` structured data limited to supported
visible facts.

Do not add:

- `Review`;
- `AggregateRating`;
- a cross-platform calculated rating;
- hidden review content;
- author identities copied from platforms; or
- a rating assembled by the directory.

Google’s review structured-data guidance says not to aggregate reviews or
ratings from other websites:

- <https://developers.google.com/search/docs/appearance/structured-data/review-snippet>

The panel is independent editorial analysis, not a source of review-star rich
results.

## Pilot

Implement and research five deliberately different products before changing
the complete catalogue:

1. ChurchSuite — mixed UK, app-store, review-platform and public church-tech
   discussion.
2. Tithely — higher-volume international material and product/company scope
   questions.
3. One app-led product — to test app-versus-suite wording.
4. One small UK product with very little public feedback — to test the `limited`
   or `no-usable-feedback` state.
5. One open-source product — to test community discussion without a conventional
   commercial review profile.

Confirm the exact products after checking the current catalogue and source
availability.

For each pilot entry, record:

- time spent on identity resolution;
- time spent searching;
- items discovered and examined;
- excluded items and main reasons;
- source-permission issues;
- number and stability of themes;
- UK-specific evidence found;
- editor revision required;
- disputes or high-risk content encountered; and
- estimated next-review effort.

## Pilot decision gate

Do not start catalogue-wide rollout until the pilot answers:

1. Is the feature meaningfully useful to a UK church?
2. Can readers distinguish public feedback from directory assessment?
3. Is the research process reproducible by another researcher?
4. Are the source-permission boundaries workable?
5. Does the sampling rule create balanced, stable themes?
6. Is the panel still honest and useful for thin evidence?
7. How long does each evidence-volume band take?
8. Can one maintainer keep the scan dates current?
9. Does the correction and challenge process work?
10. Has the legal/method review been completed?

If the maintenance cost or legal risk is disproportionate, narrow the feature
to confirmed profile links plus a limited manually authored feedback note.

## Catalogue rollout

If the pilot passes:

1. Finalise schema version 1.0.
2. Finalise the public methodology and correction process.
3. Implement the component and remove duplicate rendering.
4. Add validation and maintenance tooling.
5. Migrate the five pilot products.
6. Roll out in small, reviewable batches.
7. Prioritise high-traffic, high-consequence and strong-evidence products.
8. Include thin-evidence products in the batches so empty-state quality is
   tested continuously.
9. Run the full checks after every batch.
10. Require human approval for each public synthesis.
11. Make `publicFeedback` schema-required only after every current listing has a
    completed scan.

Do not generate and publish all catalogue summaries in one unreviewed batch.

## Maintenance

Give the feedback scan its own `checked` date. Do not update the main listing
date merely because the feedback scan changed, or vice versa.

Initial proposal:

- flag normal feedback scans after 180 days;
- consider a 90-day interval for high-volume or rapidly changing products;
- trigger an earlier review after a major product/app rewrite, acquisition,
  rebrand or recurring new complaint theme;
- re-check source links and product/company scope;
- reassess whether older themes still describe the current product;
- record source deletions or platform moderation changes;
- use monitoring only to create review work; and
- never automatically rewrite the public synthesis from new online material.

Extend the internal maintenance dashboard to report:

- listings not yet researched;
- feedback status;
- feedback checked date and freshness;
- source count/type coverage;
- UK evidence level;
- missing theme source references;
- deleted or broken feedback sources;
- method-version mismatch; and
- content requiring human review.

If a permitted API is used and its terms require deletion synchronisation,
implement and document that before storing API-derived data.

## Validation and tests

### Schema and integrity

Test:

- all three public states;
- invalid status;
- invalid/future/reversed dates;
- missing summary;
- missing limitations;
- zero and invalid item counts;
- themes without sources;
- theme URLs missing from `sources[]`;
- `no-usable-feedback` with accidental recurring themes;
- app/company/product scope mismatches where they can be validated; and
- method-version handling.

### Rendering

Test:

- a full themes panel;
- a limited panel;
- a no-usable-feedback panel;
- an unresearched listing during rollout;
- a listing with long-form content;
- a listing without long-form content;
- external profile links with product and company scope;
- narrow mobile layout;
- long theme labels and URLs; and
- absence of duplicate feedback sections.

### Accessibility

Check:

- one clear page `h1`;
- logical panel heading order;
- useful list semantics;
- correctly structured metadata;
- keyboard operation of `<details>`;
- visible focus styles;
- external-link descriptions;
- contrast;
- touch targets;
- zoom and text reflow; and
- comprehension without colour.

### Editorial

For every pilot and rollout entry, verify:

- balanced discovery queries;
- recorded scope and search dates;
- source-permission compliance;
- product identity;
- current versus historical distinction;
- product/app/company distinction;
- UK evidence qualification;
- source support for every theme;
- contrary evidence considered;
- no copied review text or personal data;
- no high-risk unverified allegation;
- no unsupported prevalence language; and
- concrete UK-church next checks.

### Required repository checks

After meaningful implementation changes run:

```bash
npm run check
npm run build
git diff --check
```

Also run the focused tests and inspect affected generated software routes. If
the work adds or changes indexable routes, run:

```bash
npm run check:sitemap
```

Review the final diff and report pre-existing unrelated failures plainly.

## Acceptance criteria

The feature is ready for catalogue rollout only when:

- the public policy and method are visible and accurate;
- the working correction/challenge route exists;
- the source-permission register exists;
- five pilot products cover the three meaningful evidence states;
- the panel renders without client-side JavaScript;
- every public theme has traceable eligible evidence;
- no reviewer identity or copied review body is published;
- product/app/company scope is visible;
- dates, sampling and limitations are visible;
- the panel provides UK-church trial or procurement checks;
- there is no sentiment score, overall rating or review structured data;
- duplicate legacy feedback rendering has been removed for migrated entries;
- validation and maintenance tooling cover the new data;
- the pilot has passed human editorial and appropriate legal/method review;
- accessibility and responsive inspection pass; and
- the required repository checks pass.

The feature is complete across the catalogue only when:

- every current software entry has completed research;
- every entry uses one of the three honest public states;
- no entry uses “not researched” as “no feedback found”;
- the top-level field can safely become schema-required;
- documentation and templates describe the real implementation;
- the maintenance dashboard can identify stale or invalid scans; and
- a sustainable owner and review cycle are recorded.

## Expected files affected

The exact implementation may differ after inspection, but likely files include:

```text
src/content.config.ts
src/pages/software/[slug].astro
src/components/PublicFeedbackScan.astro
src/components/ExternalReviews.astro
src/styles/global.css
docs/CONTENT_FIELDS.md
docs/IMPLEMENTATION.md
docs/IMPLEMENTATION_STATUS.md
docs/MAINTENANCE.md
docs/content-templates/software.template.json
scripts/check-content-integrity.mjs
scripts/dashboard-analysis.mjs
scripts/dashboard.mjs
scripts/export-software.mjs
test/
src/content/software/*.json
```

Do not expose the item-level evidence ledger in
`public/data/software.json` unless a separate public-data decision defines a
safe, useful and licensed schema.

## Completion report required from the implementing agent

At the end of each implementation phase, report:

1. What changed.
2. Important files changed.
3. Products researched or migrated.
4. Research coverage and limitations.
5. Source-permission or legal questions still open.
6. Factual information requiring human review.
7. Accessibility and responsive checks performed.
8. Automated checks run and whether they passed.
9. Deferred work.
10. Branch and commit, if created.

Do not claim catalogue completion when only the schema, component or pilot has
been implemented.
