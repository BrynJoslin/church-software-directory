# Guide editorial standard

Version: 1.0  
Adopted: 25 July 2026  
Applies to: every new guide and every guide receiving a substantial revision

This is the mandatory editorial standard for `src/content/guides/`. It defines
what a complete Church Software UK guide must help a reader understand and do.
The guide schema and automated check enforce an objective baseline; this
document remains authoritative where editorial judgement is required.

The canonical example is
`src/content/guides/how-to-choose-church-management-software.md`. It shows the
expected decision depth, UK context, evidence limits and practical usefulness.
It is a model, not a section-by-section script for every topic.

## What comprehensive means

A comprehensive guide is not simply long. It lets a reader move from a question
to a responsible next step without needing to click a supplier link.

It must:

1. answer the main question near the start;
2. define who the advice is for and what is outside its scope;
3. explain the underlying decision, including when software or a broader system
   may not be needed;
4. use explicit, topic-relevant criteria rather than a generic feature list;
5. address the material UK context;
6. distinguish supplier-published facts, independent sources, documented
   directory testing, directory assessment and questions still to settle;
7. explain fit, trade-offs, limitations and operating responsibility;
8. give the reader a reusable tool such as a comparison table, checklist,
   trial script, calculation method, decision record or supplier-question list;
9. cover implementation, ownership, migration or exit where those affect the
   decision;
10. link to relevant directory listings without creating an unsupported
    ranking or endorsement;
11. cite current sources and state research limits; and
12. end with a proportionate, concrete next step.

If a section is genuinely irrelevant, the editorial review may mark it not
applicable. It must not be silently omitted because the research is incomplete.

## Research benchmark

The standard was informed by a review of church-software guides, charity
technology guidance and authoritative UK procurement, data and accessibility
material on 25 July 2026.

### Patterns worth adopting

- Substantial commercial buying guides usually offer a quick answer, a
  comparison, product-by-product fit, pricing context, selection criteria and
  frequently asked questions. Examples include
  [ChurchSoftwareGuide's church management guide](https://www.churchstack.io/guides/best-church-management-software-2026),
  [Scriptured's buyer's guide](https://blog.scriptured.app/blog/church-management-software-guide/)
  and
  [Plinth's UK faith-charity software guide](https://www.plinth.org.uk/complete-guide/software-faith-charities).
- Practical sector guidance is strongest when it distinguishes different
  operating models, ongoing expertise and migration cost rather than treating
  products as interchangeable. See
  [Charity Digital on CRM and donor-management systems](https://charitydigital.org.uk/topics/crm-or-donor-management-system-which-one-is-right-for-you-5050).
- The Church of England's older
  [Church Management Solution Apps guide](https://parishresources.org.uk/wp-content/uploads/Church-Management-Solution-Apps_updated-2020.pdf)
  is useful in separating broader church applications from specialist donation
  platforms and explicitly avoids presenting its list as a recommendation.
- GOV.UK technology guidance starts with the problem, existing systems, user
  needs, security and prototyping rather than a supplier shortlist. See
  [Choosing technology](https://www.gov.uk/service-manual/technology/choosing-technology-an-introduction)
  and
  [using commercial off-the-shelf products](https://www.gov.uk/service-manual/technology/commercial-off-the-shelf-products-and-services).
- NCSC guidance makes the required confidence proportionate to the sensitivity
  and impact of the proposed use, and asks buyers to examine evidence rather
  than rely on assertions. See
  [Choosing a cloud provider](https://www.ncsc.gov.uk/collection/cloud/choosing-a-cloud-provider).
- ICO guidance requires real attention to controller–processor contracts,
  security, sub-processors and end-of-contract provisions. See
  [contracts and liabilities between controllers and processors](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/).
- Charity Commission guidance keeps responsibility for financial controls with
  trustees even when tools and tasks are delegated. See
  [internal financial controls for charities](https://www.gov.uk/government/publications/internal-financial-controls-for-charities-cc8).
- Accessible long-form content needs descriptive headings, meaningful link text
  and simple, clear language. See
  [W3C guidance on writing for web accessibility](https://www.w3.org/WAI/tips/writing/).
- Google's review guidance usefully asks for user-centred evaluation, evidence,
  comparable criteria, benefits and drawbacks, important decision factors and
  clear reasons for any `best` claim. It also says quality and originality
  matter more than length. See
  [Write high quality reviews](https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews).

### Patterns this project rejects

The benchmark also found recurring practices that do not meet this project's
trust standard:

- an overall winner, star rating or score without a visible, defensible method;
- supplier-authored or affiliate content presented as neutral market research;
- precise prices, market claims or savings without a dated primary source;
- claims of hands-on testing, interviews or user experience that did not occur;
- comparison tables that turn a missing answer into `No`;
- product summaries that repeat marketing copy without analysing fit;
- confident UK, GDPR, Gift Aid or safeguarding claims inferred from general
  availability;
- long product lists with little help choosing between operating models; and
- search-oriented length, repetition or FAQs that add no decision value.

These sources are benchmarks, not evidence for product facts in a guide.
Product claims still require current, recorded supplier or authoritative
sources.

## Guide types

Set `guideType` in frontmatter and use the relevant module below.

| Type | Use it for | Additional required coverage |
| --- | --- | --- |
| `buyers-guide` | `Best`, shortlist and category-selection guides | Inclusion boundary, decision criteria, comparable option summaries, who each option may suit, who it may not suit and a common trial method |
| `comparison` | Named product-versus-product guides | Same criteria for every product, material similarities and differences, scenario-based fit, questions to settle and no universal winner unless evidence supports one |
| `alternatives` | Alternatives to a named product or approach | Reasons for switching, viable non-switch options, alternatives grouped by trade-off, migration cost and what may be lost |
| `cost-guide` | Pricing and total-cost explainers | Dated examples, tax/currency/term qualifiers, a reusable cost model, unanswered-cost treatment and no invented total |
| `explainer` | GDPR, Gift Aid, safeguarding and concept guides | Clear limits, authoritative sources, practical questions or controls, and a statement of when professional or denominational advice is needed |
| `how-to` | Step-by-step procurement, implementation or migration guidance | Roles, prerequisites, ordered process, reusable working material, decision or completion gate and review point |

## Mandatory guide structure

Headings should answer reader questions rather than reproduce this list
mechanically. Every standard-version 1.0 guide must nevertheless contain these
clearly identifiable parts.

### 1. Opening answer

In the first 150 words:

- answer the main query;
- identify the intended UK church context;
- state the most important qualification or trade-off; and
- say when the guide was researched or where that date is recorded.

Use a `## Quick answer` section. A table or short list is useful when the query
has several legitimate answers.

### 2. Scope and method

State:

- who the guide is for;
- what decision it covers and excludes;
- whether the market review is representative or comprehensive;
- the inclusion criteria for named products;
- whether conclusions come from documents, independent evidence or hands-on
  testing; and
- any commercial relationship relevant to the page.

Never imply testing, supplier contact, user research or market coverage that
did not occur.

### 3. Need and simpler alternatives

Explain the operational problem before comparing products. Include when a
spreadsheet, shared calendar, documented process, existing system or specialist
tool may be sufficient. Name the organisational problem that software cannot
solve.

### 4. Decision criteria

Use criteria specific to the topic. Cover the factors that would genuinely
change a shortlist, not every available feature.

Consider where relevant:

- real workflows and users;
- role permissions, multi-factor authentication, audit information and
  sensitive-data boundaries;
- total cost, VAT, currency, contract and renewal;
- Gift Aid, UK payments and charity-finance controls;
- integrations and duplicate-record risk;
- accessibility and the experience of occasional or low-confidence users;
- implementation, training, technical administration and support;
- imports, exports, migration and exit; and
- the evidence still missing.

### 5. Options or evidence

Apply the same criteria to every named product or approach. Each option summary
must include:

- why it is in scope;
- the context it may fit;
- the material strength or differentiator supported by evidence;
- a limitation, trade-off or question to settle;
- the first practical check; and
- a link to its directory listing where one exists.

Omit incidental gaps. Turn material gaps into precise supplier questions. Do
not use a vague `best for` label as a substitute for analysis.

### 6. Software listings to explore

Include a `## Software listings to explore` section even when products have
already appeared in a table. Explain why each link is relevant and repeat that
the list is not a ranking or endorsement. Two relevant links are the minimum;
use fewer only when the guide genuinely covers a single product and its current
listing.

The guide must remain complete without clicking these links.

### 7. Practical decision tool

Include at least one material reusable tool:

- a requirements checklist;
- a like-for-like comparison table;
- a total-cost worksheet or calculation method;
- a trial script using fictional or minimised data;
- supplier questions;
- a migration or exit checklist; or
- a one-page decision-record outline.

The tool must be specific enough to use, not a decorative recap.

### 8. Implementation and next step

Explain who must own the selected process, what should be tested before
commitment, what implementation or migration work is likely and how the church
can leave. End with a concrete next action proportionate to the topic.

### 9. Sources and research limits

Use a final `## Sources and research limits` section.

- Link claims close to the relevant text as well as listing the most important
  sources at the end.
- Record an accessed date for every source in the final source list.
- Prefer official supplier sources for current product facts.
- Prefer ICO, NCSC, GOV.UK, HMRC, Charity Commission, denominational or similarly
  authoritative material for legal, tax, security and governance context.
- Use independent reviews or community discussions only for clearly attributed
  experience themes; describe sample and recency limits.
- State the research date, market-coverage limit, material questions and whether
  hands-on testing occurred.
- Do not cite search-result pages, AI output or another comparison article as
  proof of a product fact.

At publication, a guide must have at least four relevant external sources across
at least two domains.

## Depth and length

Version 1.0 sets an automated floor of 1,200 body words, six level-two sections,
two internal software-listing links, four external source links and one
practical decision tool.

These are minimum diagnostics, not writing targets:

- focused explainers will often need 1,200–2,000 words;
- comparisons and alternatives will often need 1,500–2,500 words;
- broad buyers' and how-to guides will often need 2,000–3,500 words.

Stop when the decision is adequately covered. Do not pad a guide to reach a
number. A guide over the range is acceptable when its structure remains clear
and every section changes what the reader understands or does.

## Evidence and language rules

- Use UK English and British terminology.
- State dates as exact dates, not `currently` or `recently` on their own.
- Qualify prices with currency, VAT position, billing term, relevant capacity
  and source date.
- Attribute supplier claims explicitly when independent evidence is absent.
- Separate product capability from the church's legal, financial, safeguarding
  and governance responsibility.
- Do not call a product UK-specific, compliant, secure, accessible, suitable or
  the best without defined evidence.
- Do not present absence of evidence as absence of a feature.
- Explain acronyms on first use.
- Use short, descriptive headings in a logical hierarchy; do not skip heading
  levels.
- Use meaningful link text, accessible data tables and prose that does not
  depend on colour or layout.
- Do not manufacture urgency or force a supplier click.

## Publication workflow

1. Write a one-paragraph brief: reader, query, decision, guide type and scope.
2. Review the existing directory data and related guides to avoid contradiction
   or duplication.
3. Define inclusion and comparison criteria before choosing products.
4. Research official and authoritative sources; record URLs, access dates,
   supported claims and material questions.
5. Draft the opening answer and decision tool before expanding product sections.
6. Check every factual claim against its source and keep supplier claims
   attributable.
7. Complete the editorial acceptance checklist below.
8. Set `standardVersion: "1.0"` only when all applicable requirements pass.
9. Run `npm run check:guides`, `npm run check` and `npm run build`.
10. Review the rendered page on mobile and desktop, including heading
    navigation, tables, links and keyboard behaviour.

Changing only spelling, a broken link or one dated fact is maintenance, not a
substantial revision. A rewrite, new conclusion, changed shortlist or material
new section is substantial and must migrate the guide to the current standard.

## Editorial acceptance checklist

The author or reviewer must answer every item before publication.

### Reader and decision

- [ ] The main question is answered in the first 150 words.
- [ ] The audience, scope, exclusions and market-coverage limit are explicit.
- [ ] The guide explains when software or a broader system may not be needed.
- [ ] The guide produces a responsible next action, not merely product clicks.

### Method and evidence

- [ ] Inclusion and comparison criteria were defined before products were
      selected.
- [ ] Product facts use current first-party sources wherever possible.
- [ ] Regulatory, tax, security and governance statements use authoritative
      sources and are appropriately qualified.
- [ ] Supplier-published facts, independent sources, documented testing,
      directory assessment and questions to settle are distinguishable.
- [ ] Price statements include date, currency, tax/term/capacity qualifiers
      where relevant.
- [ ] No hands-on testing, market coverage, interview or user-experience claim
      is implied unless documented.
- [ ] Commercial relationships are disclosed at the point where they matter.

### Decision usefulness

- [ ] The same relevant criteria are applied to every compared option.
- [ ] Each option includes fit, trade-off, limitation or material question and
      a first practical check.
- [ ] UK-specific questions are covered where they could change the decision.
- [ ] The guide includes a usable table, checklist, trial, calculation, question
      pack or decision record.
- [ ] Ownership, implementation, migration and exit are covered where relevant.

### Quality and publication

- [ ] The guide is independently useful without a supplier click.
- [ ] Internal software links are relevant and do not imply endorsement.
- [ ] Headings, links, lists and tables remain accessible.
- [ ] The source list includes access dates and research limits.
- [ ] `standardVersion` is honest and the automated checks pass.
- [ ] The rendered guide has been reviewed on mobile and desktop.

## Automated enforcement and legacy migration

`npm run check:guides` enforces the machine-checkable floor and is part of
`npm run check`. It cannot verify factual accuracy, balance or genuine
usefulness; the editorial checklist remains mandatory.

The pre-standard guides are named in the checker's temporary legacy allowlist
and recorded in `docs/GUIDE_AUDIT.md`. A new slug cannot use
`standardVersion: legacy`. Remove a guide from that allowlist when it is
rewritten and approved at version 1.0. The legacy state is migration debt, not
permission to create or substantially revise thin guides.
