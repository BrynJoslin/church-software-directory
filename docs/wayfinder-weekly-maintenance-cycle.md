# Wayfinder: Weekly maintenance and controlled growth cycle

**Status:** route clear; implementation not started
**Last updated:** 31 July 2026
**Canonical location:** `docs/wayfinder-weekly-maintenance-cycle.md`

## Destination

Run one unattended maintenance cycle at the start of every week that keeps the
software directory and guide library current, discovers credible new products,
and creates the most useful next guides without allowing catalogue or editorial
bloat.

The cycle should normally require no action from Bryn. It must be conservative:
uncertain, consequential or disputed changes wait safely rather than being
guessed or published merely to complete the run.

### Evidence of arrival

- The cycle starts once each Monday and cannot run twice concurrently.
- Every published software profile receives an evidenced review within each
  rolling 13-week period.
- Every published guide receives an evidenced editorial review within each
  rolling 13-week period.
- A review date is changed only after the recorded sources and material claims
  have actually been checked.
- Each week evaluates the next guide opportunities. At most two new guides are
  published, and only when each represents a distinct decision, has adequate
  demand and evidence, and passes the complete guide standard.
- The first-year stretch ceiling is 120 published guides. It is pursued through
  quarterly evidence and maintenance gates rather than treated as a requirement
  to publish a weak page.
- If fewer than two new guides clear the gate, the remaining writing capacity
  improves or rewrites the highest-value existing guide. The cycle never
  creates a thin page to satisfy a weekly quota.
- New-software discovery covers every current category during each 13-week
  cycle. At most one new product is admitted in a week, and zero is a valid
  result.
- Every published fact remains traceable to an appropriate current source.
- All required checks pass before release, and the live deployment receives a
  small post-release verification.
- Each run records what was reviewed, changed, added, rejected, deferred and
  blocked, plus the measured maintenance effort.

### Boundaries and non-negotiables

- Factual accuracy, UK relevance and decision usefulness remain more important
  than publishing volume.
- Search results, snippets and AI output are discovery aids, not evidence for a
  product claim.
- Missing evidence is not converted into `No`, and a blocked source is not
  treated as a dead source.
- No overall scores, unsupported rankings, invented prices, compliance claims,
  hands-on testing claims, testimonials or endorsements are created.
- A supplier's current official page is suitable evidence for what that
  supplier publishes. It does not establish legal compliance, accessibility,
  real-world performance or suitability for a particular church.
- No private correspondence, personal data, church-member data or unpublished
  commercially sensitive material enters the repository or public site.
- No new framework, database, CMS or large client-side dependency is required.
- The cycle may reduce output when evidence or validation is weak. It may not
  lower the editorial standard to keep a schedule.

## Current position

### Known facts

- The repository currently contains 147 software profiles, 27 version 1.0
  guides and 17 categories.
- A 13-week rotation therefore requires 147 software reviews and 27 guide
  reviews per cycle.
- The present software stale threshold is 180 days. That detects seriously old
  profiles but does not by itself guarantee the requested three-month review.
- Software entries have `lastChecked`; guides have `published` and `updated`,
  but no separate review date.
- Guide `updated` should change only after a meaningful editorial update. A
  no-change review therefore needs its own maintenance record.
- The repository already has content validation, guide checks, stale checks,
  link checks, sitemap checks, accessibility checks, interaction tests, a
  maintenance dashboard and a static production build.
- `docs/GUIDE_BACKLOG.md` already defines a demand, decision-value and
  evidence-readiness scoring method and records merge or defer decisions.
- Existing project policy allows automated monitoring and preparation but says
  that product facts and guide publication require human approval.
- Reaching 120 guides from the current 27 requires 93 additions, an average of
  1.79 per week. A two-per-week ceiling supplies enough capacity without making
  two publications compulsory.
- Google's current guidance treats about 500 indexable pages as a small site
  and reserves crawl-budget management chiefly for sites with at least tens of
  thousands of rapidly changing URLs. The technical risk at 120 guides is
  therefore not crawl scale; it is duplication or low-value content. Google's
  people-first and spam guidance warns against extensive or scaled production
  when pages add little value or exist primarily to manipulate search results.
  See [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview),
  [crawl-budget guidance](https://developers.google.com/crawling/docs/crawl-budget),
  [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
  and [scaled-content policy](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content).

### Existing assets and commitments

- Structured source references and checked dates on software profiles.
- A mandatory guide editorial standard and automated guide baseline.
- A strict public methodology, correction route and separation between facts,
  supplier claims and directory assessment.
- A local maintenance dashboard and source-health report.
- Static generation, URL-based decision tools and complete release checks.
- A guide backlog that already prevents minor keyword variants becoming
  separate pages.

### Constraints and risks

- The desired no-input publishing model conflicts with the current
  `docs/GROWTH_STRATEGY.md` and provisional agent protocol. Until a precise
  pre-authorised release policy replaces that restriction, a scheduled cycle
  may research, draft, test and open a change proposal, but may not safely
  publish it without approval.
- Software pages vary greatly in source count and volatility. A profile with
  published pricing, Gift Aid and data terms is not equivalent in effort or
  risk to a narrow free tool.
- A compulsory two-guide weekly quota would create 104 guides a year whether
  or not 104 distinct decisions exist. The first-year 120-guide ceiling is
  acceptable only while candidate quality and quarterly maintenance coverage
  remain intact.
- New software can be easy to discover but difficult to verify. A live landing
  page alone does not always establish current UK availability, a usable
  product, supplier identity or a meaningful church decision.
- Search and analytics access may be unavailable in an unattended runner.
  Candidate selection must degrade safely rather than substituting invented
  demand.
- Sources may block automated requests. The process needs a browser fallback
  and an honest `blocked` outcome.

### Assumptions to test

- Eleven or twelve software reviews and two or three guide reviews are
  sustainable when unchanged source pages are screened with stored
  fingerprints before deeper research.
- A strict maximum of two new guides and one new software listing per week is
  enough capacity to approach 120 guides in the first year; the evidence gate
  will sometimes produce fewer.
- A persistent review ledger and a deterministic manifest can prove quarterly
  coverage without relying on Git history or public `updated` dates.
- The existing validation suite can support unattended low-risk releases once
  governance, browser review and rollback controls are added.

## Workload model

### Thirteen-week manifest

At the start of each 13-week cycle:

1. Snapshot all published software and guides.
2. Sort each collection by:
   - oldest evidenced review first;
   - then higher volatility and unresolved risk;
   - then higher measured use, comparison use or affiliate exposure;
   - then slug as the stable final tie-breaker.
3. Allocate every item to exactly one of 13 weekly slots.
4. Persist the manifest. Do not recalculate it from scratch every week, because
   repeated recalculation can starve low-priority pages.

Use balanced allocation rather than a fixed ceiling:

| Collection | Current total | Base per week | Extra slots | Exact 13-week result |
| --- | ---: | ---: | ---: | ---: |
| Software | 147 | 11 | Four weeks receive one extra | 147 |
| Guides | 27 | 2 | One week receives one extra | 27 |

For any collection size `N`, week `w` receives the items from:

```text
floor((w - 1) × N / 13) through floor(w × N / 13) - 1
```

This distributes the remainder evenly and is the minimum whole-item workload
that still covers the complete snapshot.

### First-year guide-growth checkpoints

Use 120 guides as a stretch ceiling. Starting from 27, the indicative
quarter-end totals are:

| Checkpoint | Total guide ceiling | Maximum additions in the quarter | Following cycle's balanced review load |
| --- | ---: | ---: | --- |
| End of quarter 1 | 50 | 23 | 3 reviews in two weeks; 4 in eleven weeks |
| End of quarter 2 | 73 | 23 | 5 reviews in five weeks; 6 in eight weeks |
| End of quarter 3 | 96 | 23 | 7 reviews in eight weeks; 8 in five weeks |
| End of quarter 4 | 120 | 24 | 9 reviews in ten weeks; 10 in three weeks |

These are ceilings, not make-up quotas. Do not publish extra guides late in a
quarter to compensate for candidates that correctly failed the gate.

Continue towards the next checkpoint only when:

- every guide assigned in the completed 13-week manifest was reviewed or has a
  visible unresolved exception;
- the software-review schedule did not fall behind to support guide growth;
- every new guide passed the full editorial standard and rendered-page review;
- no new guide duplicates or materially cannibalises an existing canonical
  decision;
- source, correction and incident checks found no pattern of unsupported
  claims;
- Search Console, on-site behaviour or another dated signal supports the
  developing topic mix, while recognising that new organic pages need time to
  mature; and
- measured review and research effort remains sustainable for the unattended
  cycle.

If a checkpoint fails, pause net-new guide publication and use the writing lane
for evidence refreshes, consolidation and rewrites until the missed condition
is resolved. Do not lower the guide standard or extend the three-month review
interval to preserve the numerical target.

### Changes during a cycle

- A newly published item counts as reviewed on its publication date and enters
  the next manifest unless its next due date falls inside the current cycle.
- A removed or merged item is marked closed and does not create a replacement
  quota.
- A correction, product shutdown, security concern or confirmed price change
  may be pulled forward. The displaced scheduled item moves to the next
  available slot and retains its 13-week deadline.
- A failed or blocked review remains due. It cannot be marked reviewed merely
  because an attempt was made.
- The weekly run may borrow at most two items from the following week's software
  slot when this prevents an imminent breach. It must record the reason.

### Review records

Implement a non-public, versioned maintenance ledger with one event per content
item and run. Each event should contain:

```text
run ID
content type
slug
scheduled slot
reviewed at
previous review date
outcome
sources checked
source fingerprints
material changes found
files changed
risk flags
next due date
elapsed effort
release or hold reference
```

Keep internal research notes and private contact information out of the public
export. Software `lastChecked` may be updated after a completed evidence review.
Add a separate guide `lastReviewed` field or equivalent ledger-derived value;
do not misuse the public `updated` date for a no-change review.

## The weekly cycle

### 0. Start safely

- Schedule one run for Monday morning in the `Europe/London` time zone.
- Use a concurrency lock. If the preceding run is active, the new invocation
  exits without starting a second sweep.
- Work on a dated `codex/weekly-maintenance-YYYY-MM-DD` branch or isolated
  worktree.
- Fetch the current default branch, confirm a clean automation worktree and
  record the exact starting commit.
- Load the current 13-week manifest, ledger and unresolved holds.
- Run the dashboard, content checks and stale check before editing. Record
  pre-existing failures separately.

### 1. Select this week's work

Create one run manifest containing:

- the assigned 11 or 12 software profiles;
- the assigned 2 or 3 guides;
- any genuinely urgent item pulled forward;
- the category or categories assigned to new-product discovery;
- the ranked guide-candidate inputs; and
- unresolved source-access retries that are still within scope.

The manifest is frozen for the run so that later discoveries do not cause
unbounded work.

### 2. Review the selected software profiles

Use a two-pass process to minimise work without weakening the review.

#### Pass A: change detection

For every recorded source:

- confirm that the URL still resolves or record that it blocks automation;
- compare the current title, canonical URL and normalised content fingerprint
  with the previous snapshot;
- inspect official release notes, pricing, terms, privacy, support and product
  pages where relevant;
- search the product name plus `pricing`, `UK`, `Gift Aid`, `data processing`,
  `export`, `release notes` and `discontinued` only as discovery prompts; and
- note newly found official pages, redirects, rebrands, acquisitions or
  shutdown signals.

An unchanged fingerprint reduces the amount of re-reading but does not by
itself prove that every fact remains current. The reviewer still checks the
material facts and the source's scope.

#### Pass B: evidence and editorial review

Check, where relevant:

- product identity, official site and current availability;
- a plausible route for UK churches to obtain and use it;
- category membership and whether the profile still represents a distinct
  church decision;
- current published pricing, currency, VAT, free plan, trial and contract
  qualifiers;
- Gift Aid or UK payment workflow claims;
- data-processing, hosting, transfer, permissions, audit and security wording;
- integrations, import, export, migration, cancellation and support;
- source dates, evidence state and material supplier questions;
- editorial fit, limitations and the opening procurement verdict;
- affiliate or sponsorship disclosure; and
- related guides, categories, comparisons and internal links.

Choose exactly one outcome:

| Outcome | Meaning |
| --- | --- |
| `reviewed-no-change` | Material claims and sources remain supportable; update the genuine review record. |
| `updated` | Current evidence supports a factual or editorial correction. |
| `expanded` | Important new evidence improves the profile without changing its fundamental scope. |
| `candidate-removal` | The product appears inactive, unavailable in the UK, duplicative or outside the inclusion boundary. Hold removal when evidence is not conclusive. |
| `blocked` | Material sources could not be accessed or a contradiction could not be resolved. Do not refresh the review date. |
| `escalated` | The issue is disputed, consequential or outside the cycle's release authority. Preserve evidence and continue with other work. |

Do not rewrite working copy merely because a different phrasing is possible.

### 3. Review the selected guides

For each assigned guide:

1. Re-open every material supplier and authoritative source.
2. Check dates, links, product facts, prices, legal or regulatory context and
   any conclusion that depends on them.
3. Reconcile the guide with changes in linked software profiles and current
   category coverage.
4. Check whether the search intent remains distinct or is now better served by
   another guide, category, comparison or tool.
5. Check the opening answer, scope, simpler alternative, criteria, comparable
   option treatment, practical tool, implementation/exit advice, software links
   and research limits against `docs/GUIDE_STANDARD.md`.
6. Review Search Console, comparison combinations, on-site searches and guide
   use when those data are available. Low data is not proof that the guide has
   no value.
7. Inspect the rendered page, source list, tables, headings, internal links and
   navigation journey.

Choose one outcome:

| Outcome | Meaning |
| --- | --- |
| `reviewed-no-change` | The guide remains current and useful. Record `lastReviewed`; do not change `updated`. |
| `targeted-update` | Correct dated facts, links or a bounded section. |
| `substantial-revision` | Conclusions, shortlist, scope or a material section change; rerun the full version 1.0 editorial acceptance review. |
| `merge-or-retire` | The decision is duplicative or no longer supportable. Preserve useful routes and avoid an unexplained deletion. |
| `blocked` or `escalated` | Evidence or specialist judgement is insufficient. Do not imply completion. |

### 4. Discover possible new software

Distribute the 17 categories across the same 13-week manifest so that every
category receives a discovery scan each quarter. Four weeks scan two categories
and nine scan one.

For the assigned category or categories:

- search current UK-facing product results and recent announcements;
- inspect relevant supplier directories, denominational resources and
  reputable UK charity-technology sources;
- check products newly encountered in supplier integrations, guide research,
  user searches, correction submissions and competitor/category coverage;
- compare names, domains, companies and previous slugs with current and removed
  records to catch duplicates and rebrands; and
- record both admitted and rejected candidates so the same weak candidate is
  not researched from scratch every week.

Search results identify candidates only. A candidate enters the admission queue
only when all hard gates pass:

- the product and official site are active;
- UK churches have a plausible current route to obtain it;
- it supports a defined organisational decision made by a church role;
- it fits at least one current category without stretching that category;
- adequate official evidence exists for a useful, honest profile;
- it is not a duplicate, simple rebrand, private beta or incidental
  general-purpose tool; and
- its long-term decision value justifies another quarterly review obligation.

Admission then requires at least one of:

- it fills a material coverage gap;
- it offers a meaningfully different operating model;
- credible search, comparison, correction or user evidence shows demand; or
- it is a material UK-specific option whose omission weakens the directory.

At most one new product may be published in a weekly run. Additional passing
candidates enter a dated queue. Zero additions is the expected correct outcome
when no candidate clears the bar.

Every admitted listing must follow the normal software research workflow,
update affected categories and exports, and pass the complete release checks.
Commercial status never improves admission priority.

### 5. Select and write the next guides

Every week, assemble candidates from:

- `docs/GUIDE_BACKLOG.md`;
- Search Console queries and page/query gaps;
- repeated on-site searches, filter combinations and product comparisons;
- material unanswered decisions exposed by this week's profile reviews;
- category coverage without an adequate decision guide;
- direct correction or user questions that can be safely generalised; and
- newly admitted products only when they reveal a broader distinct decision,
  not merely because they are new.

First apply hard gates:

- a clearly defined UK church reader and decision;
- a distinct canonical intent not adequately served by an existing page;
- enough current first-party and authoritative evidence;
- enough comparable options or approaches for the selected guide type;
- a useful practical output;
- a sustainable quarterly maintenance burden; and
- no requirement to invent experience, give unsupported legal advice, create a
  ranking or rely on inaccessible evidence.

Rank candidates that pass using the backlog's existing nine-point method:

- demand: 1–3;
- decision value: 1–3; and
- evidence readiness: 1–3.

Use these tie-breakers in order:

1. Measured current demand rather than speculative volume.
2. Consequence and usefulness of the church decision.
3. A gap in the existing decision journey.
4. Lower ongoing volatility and review cost.
5. Stronger internal evidence and linking support.

#### Publication rule

- Publish no more than two new guides in a week and stop at the current
  quarter's total-guide ceiling.
- A candidate must be `Ready to brief`, pass every hard gate and score at least
  7 out of 9.
- Two guides may ship in the same run only when they serve distinct decisions,
  neither depends on the other's unfinished research, and each can receive the
  complete evidence, editorial and rendered-page review.
- A direct comparison additionally needs repeated on-site comparison use,
  branded search demand or direct user questions; the generic comparison tool
  remains the default for an unproven pair.
- Follow the complete `docs/GUIDE_STANDARD.md` workflow, not just its automated
  minimums.
- If only one candidate qualifies, publish one and use the second writing slot
  for the highest-value justified revision. If none qualifies, create no new
  URL and use the writing lane for justified revisions, or record
  `no qualifying guide` when no change is warranted.

This rule provides the capacity to grow from 27 towards 120 guides in the first
year while preventing a mechanical two-pages-every-week publishing target.

At the current baseline, the first candidate to revalidate is **Church
presentation software for UK churches**. It is ranked second in the existing
writing queue, scores 8 out of 9 and is marked `Ready to brief`; the rank-one
accounting guide has already been published. This is a starting candidate, not
permission to publish from the dated backlog alone. The first live cycle must
confirm present demand, source coverage, licensing evidence and that the guide
still represents a distinct decision.

### 6. Integrate and verify the final change set

Exclude held or failed candidate work from the release branch so it does not
block sound routine maintenance. Then:

1. Regenerate public data.
2. Run `npm run check:guides`.
3. Run `npm run check`.
4. Run `npm run check:stale`.
5. Run `npm run build`.
6. Run `npm run check:sitemap` when a public page was added, removed or changed
   from non-indexable to indexable.
7. Run the internal-link, accessibility and relevant interaction checks.
8. Run `git diff --check`.
9. Review the complete diff for unsupported facts, accidental broad rewrites,
   public leakage of internal notes and unrelated changes.
10. Inspect affected generated routes on mobile and desktop, including tables,
    focus, keyboard use, internal links and URL-loaded interactions where
    relevant.

No failing check may be bypassed. A pre-existing unrelated failure is recorded
plainly and prevents an unattended merge until the release policy defines a
safe, narrow exception.

### 7. Release and verify

When the unattended release gate is enabled:

- commit coherent changes with Conventional Commits;
- open a dated change proposal containing the run summary and evidence;
- merge automatically only if all required checks pass and no hold flag exists;
- deploy through the existing production route;
- verify the live homepage, sitemap and every added or materially changed route;
- confirm that generated totals and public exports agree with the collection;
- submit the live sitemap or IndexNow notification through the existing
  approved mechanism when indexable pages changed; and
- if deployment verification fails, stop further publication and use the
  approved rollback procedure to restore the last known-good release.

The run report should be concise:

```text
Cycle and week
Software scheduled / completed / changed / blocked
Guides scheduled / completed / changed / rewritten
New guide candidates, scores and outcomes
New software categories scanned, candidates and admission outcome
Checks and deployment result
Held or escalated items
Measured effort
Next week's assigned counts
```

## Unattended release authority

### Required policy change

The current growth strategy says never to publish product facts or guides
automatically. The requested end state therefore requires an explicit,
repository-recorded pre-authorisation before automatic merging is enabled.

That policy should define:

- which evidence types can support an unattended change;
- which fields and content changes may be automatically released;
- the exact automated and visual checks required;
- the source-access and contradiction rules;
- the rollback authority;
- the maximum weekly additions;
- the audit sample and incident thresholds; and
- the events that immediately suspend auto-release.

Without this policy, implement the same weekly cycle in proposal-only mode. It
will run without prompting Bryn, but the public site will change only after a
separate approval. Do not quietly treat scheduling as publication authority.

### Automatic hold triggers

Even after pre-authorisation, the following remain out of unattended release:

- disputed supplier claims, takedown requests, criticism or legal threats;
- a new affiliate, sponsorship, referral or other commercial relationship;
- rankings, endorsements, awards or claims of hands-on experience;
- consequential legal, tax, security, privacy, safeguarding or accessibility
  conclusions not stated by an appropriate authoritative source;
- contradictory price, contract, Gift Aid, hosting, transfer or company
  evidence that cannot be reconciled;
- evidence derived from private correspondence;
- a product removal without clear public evidence;
- a new guide requiring specialist denominational, safeguarding, pastoral,
  legal or financial judgement that the evidence pack cannot supply;
- a schema, route, deployment or automation-code change outside the already
  approved maintenance implementation;
- any failed required check or post-deployment verification; or
- more than two new guides or one new software listing in a run.

A held item does not stop the rest of the safe weekly review. It remains in a
bounded exception queue and the report states the consequence of waiting.

## Failure handling

- **Source blocked:** retry with the approved browser route. If still blocked,
  retain the previous qualified claim, mark the item incomplete and do not
  refresh its review date.
- **Source removed:** look for an official replacement or redirect. Do not use
  an unauthoritative mirror to preserve a claim.
- **Conflicting evidence:** prefer the newer, more specific official source
  only when its scope is clear; otherwise hold the field and publish no
  inference.
- **No analytics access:** rank from the recorded backlog, direct site signals
  and evidence readiness. Mark demand as unverified.
- **No guide passes:** publish no new guide and improve an existing one only
  when a real change is justified.
- **No software passes:** record the discovery sweep and add nothing.
- **Checks fail:** publish nothing from that release set; preserve the branch,
  logs and evidence for diagnosis.
- **Run exceeds its budget:** finish assigned quarterly reviews before growth
  work. Defer guide creation first, then new-software deep research. Never skip
  assigned reviews silently.
- **Previous run still active:** skip the duplicate invocation and report the
  lock state.
- **Three consecutive blocked reviews for one item:** move it to a focused
  exception investigation without falsely marking it current.

## Implementation route

| Milestone | Evidence produced | Depends on | Confidence |
| --- | --- | --- | --- |
| Approve unattended release boundaries | A precise policy resolves the conflict with current no-auto-publish rules | Bryn's authority decision | blocked |
| Add review state and manifests | A deterministic 13-week plan covers every current item exactly once | Ledger format and guide review-date decision | ready |
| Build selection and reporting tools | A dry run produces the correct weekly allocation and complete report without editing content | Persistent state | ready |
| Add source-change screening | Stored fingerprints and source-health outcomes reduce unnecessary deep work without refreshing unchecked facts | Review ledger | ready |
| Run proposal-only pilot | Four weekly runs complete their assigned reviews and expose real effort, blocked-source and false-positive rates | Selection and screening tools | ready after tooling |
| Complete one full 13-week dry cycle | Every snapshot item has a valid review event or an explicit unresolved exception | Stable weekly runs | provisional |
| Enable low-risk unattended maintenance | Pre-authorised factual refreshes pass checks, deploy and verify without Bryn's routine input | Policy approval and successful pilot | blocked |
| Enable controlled guide and catalogue growth | New pages pass the strict admission gates and do not cause missed maintenance | Two reliable maintenance cycles and approved release scope | blocked |
| Operate and recalibrate | Quarterly reports show coverage, growth, effort, holds and any incidents | Live unattended cycle | provisional |

## Frontier

### Ready now

- **Define the persistent ledger and 13-week manifest**
  - Type: enabling action
  - Outcome: the repository can prove the exact minimum weekly workload and
    quarterly coverage independently of public dates.
  - Unlocks: selection tooling, dry runs and effort measurement.
  - Resolution evidence: a schema, initial manifest for all current items and
    tests showing 147 software plus 27 guides are allocated exactly once.

- **Specify proposal-only weekly automation**
  - Type: enabling action
  - Outcome: one Monday run can research, draft and validate without implying
    publication authority.
  - Unlocks: real workload and source-access measurements.
  - Resolution evidence: a scheduled dry run with a concurrency lock, isolated
    branch, complete report and no public deployment.

### Blocked

- **Enable unattended publication**
  - Blocked by: an approved policy replacing the current general prohibition on
    automatic publication and defining rollback and incident authority.

- **Fix a time budget**
  - Blocked by: measured effort from at least four representative weekly runs.
    Counts are known; credible review minutes are not.

## Decisions and findings

- **Use a balanced 13-week manifest**
  - Result: current minimum workload is 11 software reviews in nine weeks and
    12 in four weeks, plus 2 guide reviews in twelve weeks and 3 in one week.
  - Basis: exact distribution of 147 software profiles and 27 guides over 13
    weekly slots.
  - Implication: a fixed 12-plus-3 weekly quota would do unnecessary work.
  - Date: 31 July 2026

- **New content is a maximum, not a quota**
  - Result: the cycle may publish at most two new guides and one new product per
    week, but publishes fewer or none when the hard gate fails.
  - Basis: the project prioritises depth and maintainability over volume.
    A two-guide ceiling is sufficient to approach the agreed 120-guide
    first-year stretch ceiling from the current baseline.
  - Implication: weekly research always occurs; publishing two guides does not.
    Quarterly ceilings are 50, 73, 96 and 120 total guides.
  - Date: 31 July 2026

- **One hundred and twenty guides is a gated ceiling**
  - Result: the first-year plan may grow to 120 guides when the quarterly
    evidence, quality and maintenance gates continue to pass.
  - Basis: 120 guides is not a material crawl-scale concern for this site, but
    93 additional guides require 93 distinct decisions and create a mature
    review load of 9 or 10 guides each week.
  - Implication: checkpoint failure pauses net growth rather than relaxing the
    editorial standard or review interval.
  - Date: 31 July 2026

- **Guide review and guide update are different events**
  - Result: a completed no-change review receives a maintenance record without
    changing the public `updated` date.
  - Basis: current maintenance rules reserve `updated` for meaningful
    editorial changes.
  - Implication: implementation needs `lastReviewed` or an equivalent
    persistent ledger field.
  - Date: 31 July 2026

- **No-input operation needs explicit release authority**
  - Result: scheduling alone is not authority to publish.
  - Basis: the current growth strategy and agent protocol expressly reserve
    publication of product facts and guides for human approval.
  - Implication: proposal-only automation can start first; auto-release remains
    blocked until a narrower policy is adopted.
  - Date: 31 July 2026

## Out of scope

- A daily news or release-monitoring service.
- A guarantee that every supplier change is found immediately.
- Mass creation of guides, listings, keyword variants, glossary pages or
  denomination pages.
- Automatic supplier contact, correction disputes, outreach or social posts.
- New commercial relationships or paid placement.
- Automatic public conclusions from analytics.
- User reviews, ratings, awards or product scores.
- A database, CMS or server-rendered maintenance application.

## Next checkpoint

**Recommended next item:** Define and implement the persistent review ledger,
initial 13-week manifest and proposal-only Monday scheduler.

**Why this is next:** It provides immediate unattended operation, proves the
actual workload and source-access constraints, and does not require the project
to weaken its current publication safeguards. The resulting evidence is what
the pre-authorised release policy should be designed around.
