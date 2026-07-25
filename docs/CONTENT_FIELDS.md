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
| `company` | Yes | Supplier name as established by an official source. |
| `countryOfOrigin` | No | Include only when established. |

### UK fit and classification

`ukFocus` is one of:

- `strong`: current supplier evidence is specifically UK-facing.
- `general`: the product is presented for broader use without verified
  UK-specific evidence in this review.
- `unknown`: relevance could not be classified safely.

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

### Editorial assessment

The `editorial` object contains the directory's assessment:

- `assessment`: balanced summary of fit and remaining due diligence.
- `bestFor`: contexts where the known shape may be relevant.
- `strengths`: evidence-backed advantages, not marketing superlatives.
- `limitations`: trade-offs, caveats and unresolved questions.

Do not claim hands-on experience unless it actually occurred and is documented.

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
