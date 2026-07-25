# Guide standard baseline audit

Audit date: 25 July 2026  
Standard: `docs/GUIDE_STANDARD.md` version 1.0

## Baseline

The guide collection contains 12 articles. Before the standard was introduced:

- body length ranged from approximately 306 to 2,960 words;
- the median body length was approximately 447 words;
- eight guides had fewer than 600 body words;
- section depth ranged from three to fourteen level-two sections;
- only two guides used the explicitly named `Software listings to explore`
  section;
- one comparison guide had no links to the corresponding internal software
  profiles; and
- the GDPR question guide cited no external authoritative source in its body.

Word count is not itself the problem. The shortest guides also omit decision
method, scope, simpler alternatives, implementation or exit, authoritative
context and practical working material. Their product tables are useful
starting points but do not yet form complete buying guides.

## Guide-by-guide assessment

| Guide | Type | Approx. body words | Status | Main work needed for version 1.0 |
| --- | --- | ---: | --- | --- |
| How to choose church management software | `how-to` | 3,100 | Version 1.0 exemplar | Keep sources and decision criteria current; review after material schema or regulatory change |
| Best church management software for UK churches | `buyers-guide` | 1,526 | Migrated to version 1.0 | Scope, representative method, listing links, trial, UK checks and decision record now meet the standard; refresh supplier evidence routinely |
| ChurchSuite vs Planning Center | `comparison` | 1,359 | Migrated to version 1.0 | Equal-criteria comparison, profile links, decision record and source dates added; recheck UK purchasing and Gift Aid evidence before publication updates |
| ChurchSuite alternatives | `alternatives` | 1,088 | Migrated to version 1.0 | Switching baseline, non-switch option, migration/exit plan, source dates and evidence limits added; supplier migration terms remain product-specific |
| Best church management software for small churches | `buyers-guide` | 566 | Migrated to version 1.0 | Scope, fit matrix, UK checks, named ownership, export and trial coverage added |
| Church software with Gift Aid support | `explainer` | 503 | Migrated to version 1.0 | HMRC record-keeping, finance controls, trial script, ownership and exit coverage added; continue routine source review |
| Best online giving platforms for UK churches | `buyers-guide` | 391 | Migrated to version 1.0 | Giving-model taxonomy, fee worksheet, finance trial, data/exit and accessible adoption coverage added; review live payment terms routinely |
| How much does church management software cost? | `cost-guide` | 377 | Migrated to version 1.0 | Three-year worksheet, fictional method, unknown-cost treatment, renewal and exit coverage added |
| GDPR questions for church software suppliers | `explainer` | 363 | Migrated to version 1.0 | ICO/NCSC sources, evidence worksheet, DPIA limits, contract, access, incident and exit coverage added; obtain legal advice where needed |
| Best church rota and volunteer scheduling software | `buyers-guide` | 348 | Migrated to version 1.0 | Scheduling scenarios, permissions, safeguarding boundary, accessible trial and continuity coverage added |
| Free church management software in the UK | `buyers-guide` | 340 | Migrated to version 1.0 | Free-model comparison, UK checks, ownership, continuity, export and review coverage added |
| Best church website builders in the UK | `buyers-guide` | 306 | Migrated to version 1.0 | Accessibility, content governance, domain/forms/privacy, migration and editor-trial coverage added |

## Remediation order

The migration should improve evidence-sensitive guides before lower-risk search
coverage.

1. GDPR questions, Gift Aid support and online giving.
2. Cost, free software and small-church software.
3. Website builders and rota scheduling.
4. ChurchSuite alternatives, ChurchSuite versus Planning Center and the broad
   UK buyer's guide.
5. Re-review the exemplar after the other guides expose any missing standard
   pattern.

Each rewrite is a separate evidence-led editorial task. Do not bulk-expand the
articles with generic prose. Remove its slug from the legacy allowlist only
after the article meets the standard, passes the checks and has received the
human editorial review required by `docs/GUIDE_STANDARD.md`.

## Completion gate

The guide-improvement programme is complete when:

- all 12 guides use `standardVersion: "1.0"`;
- the automated guide, content and production checks pass;
- every guide has current source access dates and an honest research-limit
  statement;
- evidence-sensitive claims have been manually checked against authoritative or
  first-party sources;
- every rendered guide has been reviewed on mobile and desktop; and
- there are no slugs left in the guide checker's legacy allowlist.
