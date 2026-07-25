# Content field reference

The schemas in `src/content.config.ts` are authoritative. This document explains
how maintainers should use them without turning uncertainty into a claim.

## Shared evidence rules

- Use official supplier pages as the primary source.
- Record a `checked` date and a short `supports` list for every source.
- A source supports only the named fields; it does not verify the whole product.
- Use `unknown` when evidence does not establish `yes` or `no`.
- Do not infer UK suitability from worldwide availability.
- Do not infer legal compliance from a general marketing statement.
- Structured facts and editorial assessment must remain distinct.

Dates use `YYYY-MM-DD`.

## Software

Software entries are JSON files in `src/content/software/`.

### Identity and summary

| Field | Required | Meaning |
| --- | --- | --- |
| `name` | Yes | Public product name. |
| `slug` | Yes | Lowercase URL segment. Must match the intended filename and route. |
| `shortDescription` | Yes | Independent factual summary, 40–220 characters. |
| `officialWebsite` | Yes | Supplier-owned product website. |
| `affiliateUrl` | No | A confirmed, publicly usable affiliate URL. Include only when `affiliateRelationship` is `yes`; the site labels it at the point of use. |
| `company` | Yes | Supplier name as established by an official source. |
| `countryOfOrigin` | No | Include only when established. |

### UK fit and classification

`ukFocus` is one of:

- `strong`: current supplier evidence is specifically UK-facing.
- `general`: the product is presented for broader use without verified
  UK-specific evidence in this review.
- `unknown`: relevance could not be classified safely.

`ukOrganisation` is a separate three-state fact about the supplier or operating
organisation, not a proxy for product fit. Use `yes` only where a recorded
source confirms registration in the United Kingdom. This can include a company
or charity. Use `unknown` when that evidence has not been recorded; do not use
`no` merely because the product has international customers or is not
UK-focused.

`categories` contains references to category entry IDs. `suitableChurchSizes`
uses `small`, `medium`, `large` or `multi-site`. These are editorial fit labels,
not supplier customer-count claims.

### Pricing

`pricing.model` is `free`, `freemium`, `flat-rate`, `tiered`, `usage-based`,
`quote-based` or `unknown`.

`pricing.summary` explains the verified structure. `startingPrice` is optional
and must have a current official pricing source. Use `qualifier` to name contact,
module, tax or transaction conditions. A displayed starting price is not a
complete cost estimate.

Use `pricing.tiers` for a visible, concise summary of the supplier’s current
published tiers. Each tier needs a label, displayed price and scope detail. Do
not try to reconstruct a complex price calculator; name the relevant contact,
module, usage, tax or currency condition. `pricing.trialDetails` records the
published duration or evaluation arrangement beside the three-state trial fact.

### Three-state facts

`freePlan`, `freeTrial`, `giftAid`, `demoAvailable` and
`affiliateRelationship` use:

- `yes`: current evidence confirms it.
- `no`: current evidence explicitly confirms absence.
- `unknown`: not established.

An empty search result must never turn `unknown` into `no`.

### Operations

`dataHosting`, `gdprInformation`, `coreFeatures`, `integrations`,
`importExport` and `support` contain only evidence-backed information. Omit an
optional string or use an empty array when not confirmed; the interface displays
`Not confirmed`.

### Brand assets (optional)

`brandAssets.logo` may be used only for a supplier-provided logo asset. Store it
locally under `public/images/software/[slug]/`; never hotlink it. Record the
official `source` and `checked` date, preserve the supplier’s artwork without
recolouring, cropping or distortion, and use an accurate `alt` label. Do not
reuse product screenshots unless the supplier has given clear permission for
that reuse; a public product page alone is not a licence.

### Editorial assessment

The `editorial` object contains the directory's assessment:

- `assessment`: balanced summary of fit and remaining due diligence.
- `bestFor`: contexts where the known shape may be relevant.
- `strengths`: evidence-backed advantages, not marketing superlatives.
- `limitations`: trade-offs, caveats and unresolved questions.

Do not claim hands-on experience unless it actually occurred and is documented.

### Long-form profile (optional)

`longForm` turns a structured profile into a substantial decision page. Use it
only where there is enough evidence and editorial value to support the depth.
It contains:

- `verdict`: a concise, independent fit statement.
- `decisionLens`: one non-obvious practical frame for the decision, rather than
  a product slogan.
- `sections`: evidence-led sections, each with a reader question, heading and
  one or more paragraphs. Cover the real buying and implementation trade-offs,
  not a feature-by-feature rewrite of supplier copy.
- `userFeedback`: a clearly limited account of external review or peer-discussion
  themes. Name thin samples, dated feedback and commercial review coverage as
  limitations. Do not use it for a score, endorsement or review schema.
- `faq`: visible questions and answers grounded in the page’s research. FAQ
  structured data is emitted only for this visible content.

Long-form copy is editorial assessment. Keep supplier statements attributable
through the listing’s sources, state uncertainty plainly and never imply
hands-on testing.

### Verification and sources

`verificationStatus` is:

- `verified`: important fields in scope are strongly evidenced and reviewed.
- `partially-verified`: useful facts are evidenced, but material unknowns remain.
- `needs-review`: evidence is old, incomplete or awaiting editorial review.

`lastChecked` is the most recent meaningful review date. Every source needs a
label, URL, checked date and list of fields it supports.

`sponsored` must remain `false` unless a real relationship is approved and
disclosed. `seo` holds the unique title and description.

## Categories

Category entries are Markdown files in `src/content/categories/`.

- `name`, `slug` and `shortDescription` define the category.
- `ownerRoles` identifies likely selectors or managers.
- `selectionCriteria` gives practical buying criteria.
- `ukConsiderations` names UK-specific questions without giving legal advice.
- `seo` provides the unique title and description.
- The Markdown body explains the problem, when specialist software may not be
  needed and useful questions.

## Guides

Guide entries are Markdown files in `src/content/guides/`.

- `title`, `slug` and `summary` identify the guide.
- `published` and `updated` support transparent maintenance.
- `relatedCategories` contains category entry IDs.
- `seo` supplies the unique metadata.
- The Markdown body is independent editorial guidance.

Guides must be useful without requiring a supplier click and should name when a
simpler process may be enough.
