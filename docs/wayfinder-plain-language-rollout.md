# Wayfinder: plain-language rollout

**Status:** route clear

**Last updated:** 31 July 2026

**Canonical location:** `docs/wayfinder-plain-language-rollout.md`

## Destination

Make every public part of Church Software UK understandable to a typical UK
church worker who does not have specialist software, procurement, legal or data
protection knowledge.

The writing should aim for a US Grade 8 reading level in explanatory prose. The
score is a useful warning, not a substitute for human judgement. Necessary
church, legal, finance, safeguarding and software terms should be kept when
readers need them, but explained in ordinary language where they first appear.

### Evidence of arrival

- Every public page family has been inventoried, reviewed and signed off.
- The main explanatory prose on priority pages scores at or below Grade 8, or
  has a recorded reason for retaining more complex language.
- No unexplained specialist term is needed to understand a task, choice,
  warning or next step.
- Acronyms are written out on first use and explained when their meaning is not
  obvious from the full name.
- Interface labels, form instructions, errors and empty states are understood
  without relying on a readability formula.
- At least 85% of representative church workers can complete the tested task
  and correctly explain the page's main point without help.
- Simplification has not changed a sourced fact, weakened an important warning
  or turned missing evidence into a negative claim.
- Page titles, descriptions, visible headings and internal links still describe
  the same reader need.
- The normal content, accessibility, link and production checks pass.

### Boundaries and non-negotiables

- Use UK English and familiar UK church language.
- Preserve factual accuracy, evidence labels and checked dates.
- Keep exact legal or technical terms where a church may need to recognise
  them in a contract or ask a supplier about them.
- Explain a necessary term close to its first use; do not make readers open a
  glossary to understand the page.
- Keep structured facts separate from editorial assessment.
- Do not imply legal, financial, safeguarding, accessibility or security
  assurance through simpler wording.
- Do not remove useful detail merely to improve a readability score.
- Do not change routes, schemas or product facts unless a reviewed content need
  makes that necessary.
- Keep static generation, semantic HTML, accessibility and shareable URL state.
- Avoid a large writing or readability dependency. Prefer a small local report
  and human review.

## What “plain language” means here

A church worker should be able to tell, on the first read:

1. what the page is about;
2. whether it applies to their church;
3. what is known and where that information came from;
4. what is not yet known;
5. what they should check or do next; and
6. which words they may need when speaking to a supplier, trustee or adviser.

The aim is not to remove every technical word. The aim is to remove the need
for specialist knowledge before a reader can act.

### Working writing rules

- Lead with the answer or action, then explain the method and evidence.
- Put one main idea in each sentence.
- Prefer active voice and concrete verbs.
- Aim for an average sentence length of 20 words or fewer.
- Keep most paragraphs to two to four sentences.
- Prefer common words: `use` over `utilise`, `before you buy` over
  `pre-procurement`, and `set up` over `implement` where precision is not lost.
- Replace abstract nouns with actions: `check who can see records` instead of
  `review permission configuration`.
- Address the church or reader directly where it makes an instruction clearer.
- Use descriptive question headings on long pages.
- Introduce the plain explanation before, or alongside, the precise term.
- Keep lists parallel and short enough to scan.
- Give dates, costs and evidence limits in a consistent form.
- Avoid stacked qualifications in one sentence. Split the fact, limit and next
  check into separate sentences.
- Do not use `simple`, `easy`, `obvious` or `just` to dismiss real work.

### How to use the Grade 8 target

Use a Flesch–Kincaid Grade Level calculation on substantial English prose, after
removing navigation, repeated furniture, source lists, product names, URLs,
code, table data and other text that makes the formula misleading.

- **Target:** Grade 8.0 or lower for the main explanatory prose on each priority
  page.
- **Warning:** Grade 8.1 to 10.0 needs a manual sentence-level review.
- **Escalation:** Above Grade 10.0 needs revision or a recorded editorial reason.
- **Short interface text:** review manually; do not score isolated labels,
  buttons or error messages.
- **Necessary specialist passages:** score the explanation around the term, not
  the official term itself.

Do not publish a reading-age badge. It is an internal quality tool. A low score
does not prove that copy is accurate, respectful or easy to act on.

## Current position

### Known facts

- The public content source currently contains 147 software profiles, 17
  categories, 27 guides and 19 charity-offer records.
- The current production build creates 220 static pages, including the 404
  page; 219 public HTML pages are covered by the sitemap check.
- Public wording also lives in page templates, shared components, browser
  scripts, site configuration, metadata, structured labels and generated data.
- The roadmap already sets the direction: “Make the surface simpler without
  making the research shallower.”
- The guide standard already requires clear language, explained acronyms,
  descriptive headings and a concrete next step.
- The site already separates supplier-published facts, independent sources,
  directory assessment and questions that still need answers.
- Existing validation covers content, guides, accessibility, internal links,
  public-copy consistency, the sitemap and the production build.
- No dedicated plain-language inventory, glossary, readability report or
  acceptance check currently exists.

### Initial language risks

Common public terms include `workflow`, `hosting`, `export`, `retention`,
`integration`, `migration`, `assessment`, `contract`, `reconciliation`,
`procurement`, `sub-processor`, `DPA`, `CRM`, `GDPR` and `API`.

Some are useful words that need a short explanation. Others are internal or
specialist language that can often be replaced. A site-wide search-and-replace
would be unsafe because the correct wording depends on the sentence, evidence
and reader task.

### Existing assets and commitments

- `AGENTS.md` supplies the factual, accessibility, SEO and UK-context rules.
- `docs/GUIDE_STANDARD.md` supplies the long-form editorial acceptance process.
- `docs/DESIGN_SYSTEM.md` supplies readable type, spacing and page hierarchy.
- Content collections provide clear page families and reusable fields.
- Source URLs and checked dates allow facts to be preserved during rewriting.
- Existing page templates make it possible to improve repeated labels once,
  before reviewing individual entries.
- Existing checks provide a release gate after each content batch.

### Constraints and risks

- A clearer paraphrase can accidentally change the strength or scope of a
  supplier claim.
- Legal, safeguarding, tax and data-protection language may become misleading
  if it is shortened without subject review.
- Readability formulae favour short words and sentences but cannot measure
  comprehension, factual accuracy, tone or decision usefulness.
- Product names, official programme names and exact contract terms may raise a
  score but cannot always be rewritten.
- Metadata may need different wording from body copy while remaining aligned
  with it.
- Changing every profile at once would create a diff too large for reliable
  factual review.
- A single global glossary can become another barrier if pages rely on it
  instead of explaining terms in context.
- Search visibility could suffer if useful phrases are removed everywhere.
  Important reader and supplier terms should normally appear once in a clear,
  natural explanation.

### Assumptions to test

- Grade 8 is an appropriate working target for the site's main audience.
- The most important comprehension problems will appear in the main decision
  journeys before they appear in source lists or detailed evidence sections.
- Plain-language labels can improve comprehension without changing the existing
  schema keys.
- Five to eight representative readers will expose the main vocabulary and
  task-comprehension problems in each pilot round.
- Analytics and search data can help order later batches, but are not required
  to start the audit.

## Language pattern register

Create and maintain a short register during the audit. It is guidance, not a
blind replacement list.

| Specialist or internal wording | Preferred first explanation | Keep the precise term when |
| --- | --- | --- |
| Procurement | Choosing and buying software | Referring to a formal procurement process |
| Due diligence | Checks to make before you buy | A policy or adviser uses the formal term |
| Evidence provenance | Where this information came from | Rarely in public copy |
| Supplier-published | Stated on the supplier's website | Used as a compact evidence label |
| Independent source | Confirmed by a public source outside the supplier | Used as a compact evidence label |
| Directory tested | Tested by Church Software UK | The test and date are documented |
| Decision field | Detail to compare | Rarely in public copy |
| Workflow | The steps people follow to complete the task | The supplier uses the term and it aids discussion |
| Implementation | Setting up and introducing the software | Discussing a supplier's implementation service |
| Migration | Moving records and work to the new system | Readers need the standard buying term |
| Integration | A connection between two systems | Naming a specific supplier integration |
| Hosting | Where the service stores and processes data | Asking a supplier about hosting |
| Data-processing agreement (DPA) | The contract that says how a supplier handles personal data | Giving the full document name or supplier question |
| Sub-processor | Another company the supplier uses to handle data | Reviewing data terms or supplier documents |
| International transfer | Sending or allowing access to personal data outside the UK | Giving a data-protection question |
| Role-based permissions | Rules for what each person can see and do | Naming the product feature or supplier control |
| Audit log | A record of important actions and changes | Naming the product feature |
| Reconciliation | Matching money received with payment and accounting records | Giving a finance workflow or supplier question |
| Export | Downloading a usable copy of church data | Naming file formats or exit terms |
| CRM | A system for managing contacts and relationships | The acronym appears in a product or category name |

Add terms only when they recur. Each entry should record the approved public
explanation, contexts where the precise term must remain and any high-risk
meaning that must not be lost.

## Content inventory and review order

Review by reader journey and page family, not by file extension.

| Order | Page family | Current scope | Why it comes here |
| --- | --- | ---: | --- |
| 1 | Shared navigation, cards, buttons, form help, errors and empty states | Reused site-wide | One change can improve many pages and expose the public vocabulary |
| 2 | Homepage, directory, categories index and guide hub | Main entry routes | Readers must quickly understand what the site offers and where to start |
| 3 | Shortlist and comparison | Two decision tools | Instructions and evidence labels must be clear before a reader can use them |
| 4 | Representative software profiles | Pilot set of 6–8 | Tests the balance between plain language and detailed evidence |
| 5 | All remaining software profiles | 147 total, in small batches | Largest repeated content set and highest factual-review risk |
| 6 | Category pages | 17 | Introduces specialist software types and selection questions |
| 7 | Charity-software discounts | 19 records plus hub | Eligibility and price caveats need especially careful wording |
| 8 | Trust, privacy, disclosure and contribution pages | Static public routes | Formal wording needs plain explanations without changing its meaning |
| 9 | Guides | 27, in topic-led batches | Longest prose and greatest sentence-level effort |
| 10 | Metadata, generated public data and non-HTML public text | Site-wide | Final consistency pass after visible wording has settled |

Use traffic and search data to order items within a page family when available.
When it is not available, start with the main navigation paths and the pages
with the most repeated terminology.

## Emerging route

| Milestone | Evidence produced | Depends on | Confidence |
| --- | --- | --- | --- |
| Plain-language standard agreed | Writing rules, score use, exceptions and language register are approved | Destination | ready |
| Public-copy baseline complete | Page inventory, extracted text, score report and issue backlog exist | Standard | complete |
| Main journeys simplified | Shared interface, homepage, directory, shortlist and comparison pass review | Baseline | complete |
| Profile pattern proven | A representative profile batch passes factual review | Main journeys | complete |
| Catalogue migrated | Every software profile is reviewed in controlled batches | Proven profile pattern | complete |
| Supporting pages migrated | Categories, offers, trust pages and contribution routes pass | Baseline and stable language patterns | complete |
| Guide library migrated | All guides pass the plain-language and existing guide checks | Guide pilot and language register | complete |
| Regression protection active | Maintenance docs and a proportionate automated warning are in place | Stable baseline and accepted exceptions | complete |
| Reader validation complete | Representative users meet the task and comprehension threshold | Access to participants | waived by maintainer |

## Rollout workstreams

### 1. Establish the baseline

Build the static site and extract visible reader-facing text from the generated
HTML. Keep each route tied to its source file and page family.

The report should:

- remove navigation and footer duplication before scoring page prose;
- exclude URLs, source lists, code, product names and raw table values where
  they distort the score;
- show sentence count, average sentence length and Flesch–Kincaid grade;
- list long sentences, unexplained acronyms and terms from the language register;
- distinguish body copy, headings, labels, metadata and source material;
- record exclusions so results can be reproduced; and
- produce a backlog, not an automatic rewrite.

Manually review a sample from every page family to check that the extraction is
honest before using its figures as the baseline.

**Output:** a dated baseline report and route-level backlog.

### 2. Improve shared language first

Review repeated labels and explanations in components, templates, configuration
and scripts. Typical candidates include evidence labels, comparison headings,
shortlist instructions, pricing labels, buttons, notices and error states.

For each change:

1. state the reader's task;
2. identify what the old wording assumes;
3. write the shortest accurate alternative;
4. keep the precise term in brackets when readers will need it later;
5. test every place the shared string appears; and
6. check that the new label still makes sense without surrounding colour or
   layout.

**Output:** an approved shared vocabulary and a smaller backlog for individual
pages.

### 3. Pilot the main decision journey

Rewrite and review the homepage, software directory, one category page,
shortlist, comparison and one guide-hub route as a connected journey.

The pilot should answer:

- Can a reader choose between browsing, comparing and building a shortlist?
- Do labels such as `evidence`, `question to settle` and `checked` make sense?
- Can the reader explain why a product appeared without understanding the
  internal matching rules?
- Can the reader distinguish “the supplier says this” from “the directory has
  tested this”?
- Does each page give one clear next action?

Do not change filtering or comparison behaviour unless the copy review exposes
a genuine usability defect.

**Output:** a proven pattern for navigation, evidence explanations and next
steps.

### 4. Pilot software profiles

Choose six to eight profiles that cover:

- an all-in-one church management system;
- accounting or Gift Aid;
- safeguarding or pastoral records;
- giving or payments;
- worship or presentation;
- a general-purpose product;
- a profile with strong evidence coverage; and
- a profile with material unanswered questions.

Review the 30-second answer, five-minute assessment, labels, supplier questions,
source notes and metadata together. Check every changed factual sentence
against its recorded source.

Record which improvements belong in the shared profile template and which are
specific to one product. Apply template improvements before starting the full
catalogue.

**Output:** an approved profile pattern and checklist.

### 5. Migrate the catalogue in small batches

Review profiles in coherent batches of no more than 10–15. Group them by
category or language pattern so the reviewer can compare like with like.

For each batch:

- preserve product facts and source references;
- replace internal editorial language with reader-facing wording;
- explain unavoidable acronyms and specialist terms;
- split overloaded sentences into fact, limit and next check;
- align short description, assessment, verdict, first check and metadata;
- check that repeated boilerplate has not hidden a product-specific decision;
- review all affected cards, categories, comparisons and shortlist output; and
- commit or review the batch before opening the next one.

Do not use an automated rewrite across JSON entries. Mechanical reports may
find candidates, but every published change needs editorial review.

**Output:** signed-off catalogue batches with a recorded reviewer and checks.

### 6. Review categories, offers and trust pages

Categories should define the software type in the language of the church task,
then introduce the industry term. Charity offers should separate the benefit,
eligibility, cost and first check. Trust pages should use plain explanations
before formal evidence or policy terms.

Legal, tax, safeguarding, privacy and affiliate wording needs an additional
meaning check. The test is not whether the passage is short; it is whether a
reader can understand both the practical message and the limit of the site's
claim.

**Output:** supporting routes that use the same language patterns as the main
journey.

### 7. Migrate guides by topic

Start with one representative guide and review it against both this plan and
`docs/GUIDE_STANDARD.md`. Then work in batches of three to five related guides.

For every guide:

- keep the quick answer direct and within the first 150 words;
- make headings reflect reader questions;
- define acronyms and specialist terms on first use;
- put formal terms after a plain explanation;
- shorten sentences without removing qualifications or evidence;
- keep source attribution close to the claim;
- preserve the practical tool, implementation, exit and next-step coverage;
- check tables and lists for plain row and column labels; and
- update the visible `updated` date only after a meaningful editorial review.

Changing the wording must not silently change a shortlist, conclusion, evidence
claim or guide scope. If it does, treat the work as a substantive editorial
revision and complete the full guide-standard review.

**Output:** topic batches that pass automated and human guide checks.

### 8. Validate with representative readers

Recruit five to eight people across roles such as church administrator, pastor,
treasurer, safeguarding lead, operations worker and occasional volunteer.
Include people with different confidence levels using software.

Give each person realistic tasks rather than asking whether they “like” the
copy. For example:

- find two products worth investigating for a church need;
- explain what a missing answer means;
- identify the first supplier question to ask;
- explain the difference between a supplier statement and a directory test;
- find the cost limit or data-handling warning; and
- say what the church should do next.

Record task completion, incorrect interpretations, words that need explanation
and any point where the participant asks for help. A page passes when at least
85% complete the task and correctly explain its main message. Revise the shared
pattern when the same problem appears more than once.

**Output:** a short findings record and resolved high-severity comprehension
issues.

### 9. Add proportionate regression protection

After the baseline and exceptions are stable, add a small local
`check:plain-language` report.

Initially it should warn rather than fail. It may become a blocking check only
for clear regressions such as:

- a new unexplained acronym in public prose;
- a new banned internal phrase;
- a substantial new guide above the agreed threshold with no exception; or
- a changed priority page that exceeds its accepted baseline.

Update:

- the guide standard and checklist;
- content templates;
- the maintenance guide;
- field documentation where reader-facing labels change;
- the implementation status; and
- the normal review or pull-request checklist.

Keep exceptions narrow, documented and attached to a real reason. Do not create
a growing global ignore list.

**Output:** plain language becomes part of normal maintenance rather than a
one-off clean-up.

## Batch acceptance checklist

### Meaning and evidence

- [ ] Every changed factual statement still matches its source.
- [ ] Supplier claims, independent facts, directory tests and editorial
      assessment remain distinguishable.
- [ ] A missing fact has not become `No`.
- [ ] Legal, tax, safeguarding, security and accessibility limits remain clear.
- [ ] Precise terms needed for a supplier or adviser conversation remain
      available.

### Comprehension

- [ ] The answer or action appears before the method.
- [ ] Specialist words are removed, replaced or explained at first use.
- [ ] Acronyms are expanded and explained where needed.
- [ ] Sentences contain one main idea and average no more than 20 words.
- [ ] Headings, links, buttons, labels, errors and empty states make sense out
      of context.
- [ ] Main prose meets the Grade 8 target or has a recorded reason.

### Page quality

- [ ] There is one clear `h1` and a logical heading order.
- [ ] Metadata and visible copy describe the same reader need.
- [ ] Tables retain clear headers and work on narrow screens.
- [ ] Keyboard, screen-reader, enlarged-text and mobile behaviour is unchanged
      or improved.
- [ ] Internal links use descriptive wording.
- [ ] The next action is concrete and proportionate.

### Release

- [ ] `npm run check:guides` passes for changed guides.
- [ ] `npm run check` passes.
- [ ] `npm run build` passes.
- [ ] `git diff --check` passes.
- [ ] Affected generated routes have been inspected.
- [ ] `npm run check:sitemap` passes if indexable page coverage changed.
- [ ] The diff contains only the intended batch.

## Release and version-control approach

- Use a dedicated `codex/` branch when implementation starts.
- Keep the baseline tool and editorial rules in one coherent change.
- Release the shared-language and main-journey pilot before catalogue batches.
- Keep profile batches, supporting-page batches and guide batches separately
  reviewable.
- Do not mix factual source refreshes into a language-only batch unless the old
  fact cannot safely be retained.
- Record each completed batch in `docs/IMPLEMENTATION_STATUS.md`.
- Deploy after a coherent page family passes, rather than holding every change
  for one site-wide release.
- Watch correction reports, zero-result behaviour, comparison use and shortlist
  completion after each release. Treat analytics as supporting evidence, not
  proof that wording is understood.

## Frontier

### Ready now

- **Approve the plain-language standard**
  - Type: decision
  - Question or outcome: Confirm the Grade 8 target, exception rules and
    language patterns in this document.
  - Unlocks: A reproducible baseline and consistent editorial review.
  - Resolution evidence: The standard is accepted or revised by the maintainer.

- **Create the public-copy baseline**
  - Type: enabling action
  - Question or outcome: Produce a route-level inventory and readability
    backlog from the generated site.
  - Unlocks: Evidence-based prioritisation and a measurable before state.
  - Resolution evidence: Complete on 31 July 2026. `npm run check:plain-language`
    produced a 220-route report in `.internal/plain-language/`; a representative
    route from every current page family was manually sampled against the
    rendered source extraction.

- **Choose the profile pilot**
  - Type: decision
  - Question or outcome: Select six to eight profiles that cover the main risk
    and content patterns.
  - Unlocks: A tested profile template before catalogue-scale editing.
  - Resolution evidence: The named set covers the criteria in workstream 4.

### Waived

- **Reader validation**
  - Maintainer decision: Do not run the five-to-eight-person reader validation
    round for this rollout.
  - Implication: The 85% task-completion target is not evidenced. The baseline,
    manual editorial review and normal automated checks remain required.
  - Date: 31 July 2026

- **Blocking automated threshold**
  - Blocked by: A stable baseline, agreed exceptions and evidence that the
    report flags real comprehension risks without encouraging harmful edits.

## Fog

- Which words real readers find unclear may differ from the initial technical
  term list.
- Traffic data may change the order of later profile and guide batches.
- Some recurring product language may need a page-specific explanation rather
  than one standard replacement.
- Privacy or safeguarding passages may need specialist review after the first
  plain-language draft exposes their real complexity.

## Decisions and findings

- **Finding: shared route language now leads with the reader task**
  - Result: The homepage, directory, category index, guide hub, shortlist and
    comparison now use direct route labels and explain evidence, filters and
    missing details in ordinary language.
  - Basis: Reviewed against the generated baseline on 31 July 2026; `npm run
    check` and the full production build passed after the change.
  - Implication: Later batches should retain this pattern rather than reusing
    internal terms such as `due diligence`, `field-level evidence` or
    `workflow` without explanation.
  - Date: 31 July 2026

- **Finding: six-profile editorial pilot is complete**
  - Result: ChurchSuite, ExpensePlus, iKnow Safeguarding, Stewardship,
    ProPresenter and Church Edit now demonstrate concise, plain-language
    summaries and assessments across the main product types.
  - Basis: Each changed sentence was limited to editorial wording; structured
    facts, sources and supplier questions were retained. The normal content,
    build and plain-language checks passed.
  - Implication: Use the same fact–limit–next-check structure in catalogue
    batches of no more than 10–15 profiles.
  - Date: 31 July 2026

- **Decision: use plain language without hiding precise terms**
  - Result: Explain a necessary formal term in ordinary language and keep the
    precise term where it supports a real church decision.
  - Basis: Readers need both understanding and useful vocabulary for supplier,
    trustee and adviser conversations.
  - Implication: The programme is not a global word replacement.
  - Date: 31 July 2026

- **Decision: use Grade 8 as a target, not a badge or sole gate**
  - Result: Score substantial prose and combine the result with factual and
    task-based human review.
  - Basis: Formulae cannot judge evidence, specialist necessity or whether a
    reader can act.
  - Implication: Exceptions require a reason; a low score does not guarantee
    approval.
  - Date: 31 July 2026

- **Decision: roll out by page family in small batches**
  - Result: Shared language and main journeys come first, followed by a profile
    pilot, catalogue batches, supporting pages and guide batches.
  - Basis: Reused wording has the widest effect, while small batches keep
    factual review manageable.
  - Implication: The site can improve and ship throughout the programme.
  - Date: 31 July 2026

## Out of scope

- Rewriting supplier source titles, official product names or legal document
  names.
- Changing facts, ratings, rankings, commercial relationships or inclusion
  decisions as part of language editing.
- Redesigning the site or rebuilding working interactions.
- Publishing a public reading-age score.
- Removing important qualifications to make copy shorter.
- Creating a standalone glossary as the main way readers understand pages.
- Automated publication of AI-rewritten content.
- Representative-reader validation for this rollout, waived by the maintainer
  on 31 July 2026.
- Beginning new catalogue, guide or roadmap phases unrelated to this programme.

## Next checkpoint

**Recommended next item:** Use the local warning report during normal content
maintenance, revisiting a page when a new change adds avoidable complexity.

**Why this is next:** The planned shared-route, catalogue, supporting-page and
guide passes are complete. The report is deliberately non-blocking because
necessary evidence-led passages can score poorly; use it to target editorial
review rather than to force shorter but less reliable copy.
