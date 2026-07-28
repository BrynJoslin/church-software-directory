# Guide navigation research and implementation plan

Status: proposed

Prepared: 28 July 2026

Scope: guide discovery, guide-to-guide navigation, and guide relationships with
category and software pages

## Executive recommendation

The guide library has outgrown a latest-first card grid. Replace it with a
small, static guide hub that supports several routes to the same content:

1. a prominent guide search;
2. four reader-centred task routes;
3. browsing by the existing software categories;
4. a curated `Start here` group; and
5. contextual guide links from category, software and other guide pages.

Keep `/guides/` as the only general guide index. Do not create indexable tag,
archive or topic pages at this stage. Category pages already provide suitable
topic landing pages, and URL-based guide filters can help visitors narrow the
hub without creating thin search pages.

The core content-model change should put curation in guide frontmatter. A guide
should record:

- the reader task it supports;
- whether it is a `Start here` guide;
- the categories on which it should be featured;
- the software profiles on which it should be featured; and
- the next two or three guides that form a useful continuation.

Software and category pages can then perform a build-time reverse lookup. This
keeps the relationship in one place and avoids adding guide arrays to 147
software profiles.

## Why this work is needed now

The repository contains 27 version 1.0 guides, compared with the original
proof-of-concept target of approximately 8 to 10.

The current implementation has several scaling problems:

- `/guides/` is one undifferentiated grid sorted only by `updated`;
- many guides share the same update date, so recency does not provide a useful
  decision order;
- `GuideCard` shows the update date, title and summary, but not the topic or the
  task the guide helps to complete;
- there is no guide search, topic browse, result count, filter or empty state;
- the homepage selects the three most recently updated guides rather than
  deliberate starting points;
- category pages do not show guides, although the project specification calls
  for useful guides on category pages;
- software pages do not show guides, although the project specification calls
  for relevant guides on software listings; and
- guide pages link to related categories but not to a useful next guide.

The content already contains useful relationship data, but it is not yet used
as a navigation system:

- all 27 guides have `relatedCategories`;
- 15 of the 17 categories have at least one related guide;
- `presentation-software` and `bible-study` currently have no related guide;
- the guide bodies link to 45 distinct software profiles;
- ChurchSuite appears in 23 guides, while most linked products appear in only
  one or two; and
- 17 guides are related to `church-management`, so shared category membership
  alone is too broad to choose guides for a software page.

### Current guide mix

| Editorial type | Guides |
| --- | ---: |
| Buyers' guide | 14 |
| Explainer | 6 |
| How-to | 4 |
| Comparison | 1 |
| Alternatives | 1 |
| Cost guide | 1 |

This mix also shows why editorial type should not be the main public
navigation. `Explainer` is meaningful to an editor, but a reader is more likely
to think “I need to check risk and cost” or “I need to choose a system”.

## Research findings

### 1. People need more than one way to find a guide

WCAG 2.2 success criterion 2.4.5 requires more than one way to locate pages
within a set. W3C gives related links, a table of contents, a site map and
search as suitable mechanisms. It also notes that some people find search
easier than a hierarchical navigation scheme.

The implication for this project is that category browsing alone is not enough,
and search alone is not enough. The library should support search, task browse,
topic browse, breadcrumbs and contextual related links.

Sources:

- [W3C: Understanding success criterion 2.4.5, Multiple Ways](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways)
- [W3C: Interaction — navigating and finding](https://www.w3.org/WAI/people-use-web/tools-techniques/navigation/)

### 2. Navigation should use readers' language and mental models

The GOV.UK Service Manual recommends starting user research with explicit
questions and testing assumptions rather than treating internal opinion as
evidence. A June 2026 Department for Education design history describes using
an open card sort because categories based on internal thinking might not match
where users expected to find guidance, then using tree testing to validate the
draft structure.

The implication is to expose labels such as `Choose software` and `Plan a
change`, not the internal `buyers-guide` and `how-to` values. The proposed
labels should still be tested with church administrators, leaders, treasurers
and volunteers before being treated as permanent.

Sources:

- [GOV.UK: Plan user research for your service](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service)
- [Department for Education: Using a card sort to understand how users group information](https://design-histories.education.gov.uk/deliver-good-services/using-a-card-sort-to-understand-how-users-group-information)
- [GOV.UK: Remote card sorts and tree tests](https://www.gov.uk/service-manual/user-research/remote-user-research-phone-video-call)

### 3. Search should complement navigation when a list becomes difficult to scan

The Home Office design guidance recommends search when navigation alone is not
practical, while first asking who the users are and what they are trying to
achieve. W3C also identifies keyword search as one of the mechanisms people use
to navigate in different ways.

For 27 guides, a small in-page search is proportionate. It should search
controlled, high-signal fields rather than every word in every guide:

- title;
- summary;
- category names;
- reader-task label; and
- optional editorial search terms added only when real zero-result searches
  reveal a vocabulary gap.

Searching the full article body would create noisy matches from incidental
product or regulatory mentions.

Sources:

- [Home Office: Search for something](https://design.homeoffice.gov.uk/design-system/patterns/help-users-to/search-for-something)
- [W3C: Understanding success criterion 2.4.5, Multiple Ways](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways)

### 4. Filters need to be few, visible and reversible

Baymard's large-scale product-list research is commerce-focused, so it is a
transferable signal rather than direct evidence about this guide library. Its
findings consistently support showing applied filters, a result count and a
quick way to remove filters. The GOV.UK Design System cautions that long select
controls can be difficult for some users and recommends reducing the options
where possible.

The implication is to start with only two filtering dimensions:

- reader task; and
- software category.

The current guide type, publication year and update date should not become
filters. They do not represent primary reader decisions. Applied filters should
be repeated above the results in plain language, with a clear-all control.

Sources:

- [Baymard Institute: Display applied filters in an overview](https://baymard.com/blog/how-to-design-applied-filters)
- [GOV.UK Design System: Select](https://design-system.service.gov.uk/components/select/)

### 5. Contextual internal links help people and search engines understand the site

Google recommends a logical site structure, linking important pages from other
relevant pages and using concise, relevant anchor text. Its breadcrumb guidance
describes breadcrumbs as a way to communicate a page's position and help users
explore the hierarchy. W3C similarly recommends orientation cues, descriptive
headings and clear link labels.

The implication is to add crawlable server-rendered guide links to category and
software pages, while retaining the existing guide breadcrumbs. Link labels
should use the guide title or a descriptive phrase, never generic labels such
as `Read more`.

Sources:

- [Google Search Central: Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google Search Central: Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [W3C: Designing for web accessibility](https://www.w3.org/WAI/tips/designing/)

### 6. Comparable content libraries combine topic and format, but this site should stay simpler

A current benchmark scan found that Capterra exposes articles by software topic
and separately presents buying guidance, while Zapier's App Picks hub exposes
content families such as best-app guides and app comparisons. These are useful
examples of offering both subject and intent routes, not templates to copy.
Both sites are much larger and more commercial than Church Software UK.

The project should adopt only the useful structural principle: let people browse
by subject and by what they need to do. It should not adopt ratings, popularity
claims, advertising-heavy cards or a large magazine-style taxonomy.

Examples reviewed:

- [Capterra: Blog and research categories](https://www.capterra.com/resources/)
- [Zapier: App Picks](https://zapier.com/blog/categories/app-picks/)

All external sources in this section were accessed on 28 July 2026.

## Proposed information architecture

### Route structure

Keep the public route structure small:

```text
/guides/                         Main searchable and filterable guide hub
/guides/[slug]/                  Individual guide
/categories/[slug]/              Topic page with selected guides and products
/software/[slug]/                Product page with selected relevant guides
```

Do not add `/guides/topics/`, `/guides/tags/`, year archives or separate
indexable filter pages in this phase. Filtered states should use query
parameters on the canonical guide hub:

```text
/guides/?q=migration
/guides/?task=choose
/guides/?category=online-giving
/guides/?task=check&q=gift+aid
```

The unfiltered `/guides/` page remains canonical. Query states should not be
added to the sitemap or treated as separate indexable pages.

### Reader-task navigation

Use four public task labels:

| URL value | Public label | Typical guides |
| --- | --- | --- |
| `choose` | Choose software | Buyers' guides and operating-model explainers |
| `compare` | Compare or replace options | Comparisons and alternatives |
| `change` | Plan or make a change | Audits, spreadsheet moves and migrations |
| `check` | Check risk, cost and responsibilities | GDPR, Gift Aid, records, pastoral care and cost guides |

These are navigation labels, not changes to `guideType`. Editorial type remains
useful for the guide standard and validation.

The mapping must be curated in frontmatter because editorial type does not
always establish reader intent. For example, `All-in-one church software vs
specialist tools` is an explainer editorially, but it supports a choice.

### Topic navigation

Continue using `relatedCategories` as the detailed topic taxonomy. Present the
categories under the four existing category families from
`src/utils/category-families.ts`.

This avoids inventing a separate set of guide tags. A guide can belong to more
than one category, but it appears only once in the result list.

Category-family labels should be included in the user research. In particular,
the current fourth family, `Websites, communication and discipleship`, overlaps
with `church-communications` in the first family and may not match users'
expectations. Any change should update the central family configuration rather
than create a guide-only taxonomy.

### Guide hub page order

The proposed `/guides/` page should contain:

1. **Introduction and search** — one `h1`, a short explanation and a labelled
   guide search.
2. **Start here** — three deliberately selected evergreen guides covering
   choosing, due diligence and reviewing or changing an existing setup.
3. **What do you need to do?** — the four reader-task routes with a short
   description and guide count.
4. **Browse by church task** — the existing category families and their
   category links.
5. **All guides** — result count, applied filters, clear-all control and
   scannable guide cards.

Default results should not be described as `latest` or `popular`. Sort them by
reader-task order and then title, or use a small explicit editorial order for
the first few items. Keep the updated date visible as freshness information,
not as the primary navigation logic.

### Guide card content

Each card should show:

- the guide title as the main link;
- one reader-task label;
- no more than two category labels, with an accessible `and one more` summary
  where necessary;
- the existing summary;
- updated date; and
- a descriptive link hit area without making the whole card an inaccessible
  nested interactive element.

Do not add images merely to distinguish guide cards. The Doorway design system's
type, spacing, rules and restrained badges are sufficient.

## Relationship model

### Proposed guide frontmatter

Extend the guide schema with four navigation fields:

```yaml
navigationTask: choose
startHereOrder: 1
featuredOnCategories:
  - church-management
featuredOnSoftware:
  - churchsuite
  - planning-center
nextGuides:
  - church-management-software-cost
  - uk-church-gdpr-questions
```

Recommended validation:

- `navigationTask` is required and uses the four-value enumeration;
- `startHereOrder` is optional, limited to the three available positions and
  unique across the collection;
- every `featuredOnCategories` value is a typed category reference and is also
  present in `relatedCategories`;
- every `featuredOnSoftware` value is a typed software reference and has a
  corresponding crawlable software-profile link in the guide body;
- no category has more than three guides featured on it;
- no software profile has more than three guides featured on it;
- `nextGuides` contains two or three typed guide references, has no duplicate
  or self-reference and preserves editorial order; and
- every current guide is migrated in the same schema change.

`featuredOnSoftware` should mean “show this guide on this product profile”, not
“this guide mentions the product”. This distinction is necessary because
ChurchSuite is linked from 23 current guides. Automatically displaying the
latest three of those would be arbitrary and difficult to explain.

### Software pages

Perform a build-time reverse lookup across the guide collection:

```text
guide.featuredOnSoftware includes current software id
```

Show the result after the five-minute assessment and before the full
due-diligence record, or immediately before `Related products` after visual
testing. Use:

- heading: `Guides that discuss [product name]`;
- up to three compact guide cards;
- guide task and summary so the reason for the link is clear; and
- a short statement that inclusion in a guide is not a ranking or endorsement.

If no guide explicitly features the product, omit the section. Do not fill it
with loosely shared-category guides.

### Category pages

Perform a build-time reverse lookup:

```text
guide.featuredOnCategories includes current category id
```

Place `Guides for this decision` after the category selection criteria and
before the product list. Show up to three selected guides plus:

```text
See all guides about [category]
```

The link should open `/guides/?category=[slug]`. If a category has related
guides but none has been selected for featuring, complete the editorial mapping
rather than silently choosing the most recently updated guide.

For `presentation-software` and `bible-study`, omit the section until a
guide-standard article genuinely covers the category. Do not create a thin
guide to remove an empty state.

### Guide pages

Retain the current `In this guide` contents and related-category sidebar. Add a
server-rendered `Continue your decision` section after the article body using
the ordered `nextGuides` references.

Each current guide should have two or three deliberately selected next guides.
The links may be directional rather than reciprocal. A migration guide may
lead to records retention and GDPR due diligence without those explainers
needing to lead back to the migration guide.

Avoid an automatic “shared category” carousel. With 17 church-management
guides, it would produce weak and repetitive recommendations.

### Homepage

Replace latest-updated selection with `startHereOrder`. This makes the homepage
stable and editorially intentional. The three guides should be reviewed when
the library strategy changes, not whenever an unrelated guide receives a date
refresh.

## Search and filtering behaviour

### Progressive enhancement

Render all guide cards and links into static HTML. A small framework-free
TypeScript module may enhance the page by:

- filtering cards;
- updating the result count;
- maintaining query parameters;
- restoring URL-loaded and browser back/forward state; and
- announcing result-count changes politely.

Without JavaScript, the search form should still submit a GET request to
`/guides/`. Because Astro output is static, the server cannot generate filtered
HTML at request time; the no-JavaScript response should therefore show the
complete, organised guide list and an explanation that the browser enhancement
narrows it on the page. Topic and task links must remain normal crawlable
anchors.

### Search matching

For the first release:

- normalise case, repeated whitespace and common punctuation;
- match all entered terms across title, summary, category names and
  reader-task label;
- do not use fuzzy matching that could create surprising results;
- do not rank on commercial relationships or supplier prominence;
- show the number of matching guides;
- show the entered search phrase in the applied-filter summary; and
- provide a useful no-result state with `Clear search`, category browse and
  software-directory links.

Invalid `task` or `category` values should be ignored with a clear result state,
not cause an error.

### Filter controls

Use the four task routes as visible links or radio-style controls. Present
categories within their existing families. Do not place all 17 categories in a
top-level site menu.

On mobile, the category controls may use a native disclosure labelled
`Filter guides`, but the search, current result count and applied filters must
remain visible. Do not create an independently scrolling filter panel.

## Accessibility, SEO and performance requirements

### Accessibility

- Preserve one clear `h1`.
- Use semantic search and results regions with visible labels.
- Give each navigation region a distinct accessible name.
- Keep all controls at least 44px.
- Do not move focus on every keystroke.
- Announce result counts using a polite live region.
- Preserve keyboard, pointer, touch and screen-reader operation.
- Use clear link text that remains meaningful out of context.
- Ensure badges do not carry meaning through colour alone.
- Retain useful results and clear controls at 200% zoom and with enlarged text.
- Respect reduced-motion preferences; filtering needs no animation.

### SEO

- Keep guide links as normal `<a href>` elements in static HTML.
- Keep `/guides/` as the canonical page for query states.
- Do not add filtered URLs to the sitemap.
- Continue emitting `Article` data for guide pages and breadcrumb data through
  the shared layout.
- Do not create topic landing pages until a distinct search intent, enough
  content and an editorial introduction justify them.
- Add guide links to category and software pages for people first; improved
  crawl paths are a secondary benefit.

### Performance

- Reuse the directory's small URL-state and filtering patterns where suitable.
- Do not add a search service, client framework or search dependency for 27
  guide records.
- Keep primary guide data in server-rendered HTML; an optional compact JSON
  payload is unnecessary unless the card markup cannot supply the filter data
  cleanly.

## Implementation sequence

### Phase 1 — Editorial mapping and validation

1. Agree the four reader-task labels through a short review with likely users.
2. Assign `navigationTask` to all 27 guides.
3. Select three `Start here` guides.
4. Select up to three featured guides for each covered category.
5. Select up to three guides for each software profile where a guide materially
   discusses that product.
6. Define two or three ordered next guides for every guide.
7. Add the schema fields and collection-wide validation.
8. Extend `check-guides.mjs` to enforce the relationship rules.
9. Extend the internal dashboard to report:
   - guides missing navigation metadata;
   - categories with related but no featured guides;
   - software profiles with more than the allowed featured-guide count;
   - featured software without a body link; and
   - broken or self-referencing guide journeys.

Deliverable: a complete, reviewed navigation map in content, with no public UI
depending on inference from update date or broad category overlap.

### Phase 2 — Guide hub

1. Rework `/guides/` into the five-part hub.
2. Update `GuideCard` with task, category and freshness metadata.
3. Add search, task and category URL state using a small TypeScript module.
4. Add result count, applied-filter summary, clear control and empty state.
5. Replace homepage latest-guide logic with `startHereOrder`.
6. Add consent-gated events without recording the raw search phrase.

Deliverable: visitors can search, browse by intent, browse by topic and reach
every guide without relying on a chronological grid.

### Phase 3 — Contextual navigation

1. Add selected guides to category pages.
2. Add selected guides to software pages.
3. Add `Continue your decision` to guide pages.
4. Confirm all new links are crawlable, descriptive and do not imply
   endorsement.

Deliverable: guide discovery is available at the point a visitor is choosing a
category, assessing a product or finishing a related guide.

### Phase 4 — User and production validation

Test at least these tasks:

1. Find guidance for choosing church hall-booking software.
2. Find a ChurchSuite comparison or alternatives guide.
3. Find the questions to ask a supplier about UK GDPR.
4. Find help moving from spreadsheets or between church systems.
5. Start on a software profile and reach the most relevant guide.
6. Finish a guide and identify a sensible next step.

Use a small first round of four to eight participants, including:

- a church administrator or operations lead;
- a volunteer with lower confidence using software;
- a treasurer or finance lead;
- a safeguarding or pastoral role; and
- disabled participants where recruitment permits.

Record task completion, wrong turns, use of search versus browse, labels that
cause hesitation and whether the contextual links match expectations. Test the
structure with a lightweight tree test before polishing visual details.

## Measurement

Use consent-respecting event names such as:

- `guide_search`;
- `guide_filter`;
- `guide_zero_results`;
- `guide_open_from_hub`;
- `guide_open_from_category`;
- `guide_open_from_software`; and
- `guide_continue_open`.

Do not send raw search queries or church-identifying information to analytics.
Review any useful zero-result terms through an appropriately privacy-conscious
method before adding controlled search vocabulary.

Success should be judged by:

- task-completion rate in usability testing;
- fewer wrong turns and faster time to a relevant guide;
- guide opens from category and software pages;
- hub search and filter use;
- zero-result rate;
- use of next-guide links; and
- whether visitors continue to software, comparison or shortlist tools after a
  guide when that is a responsible next step.

Do not label guides `popular` without sufficient, dated behaviour evidence.

## Acceptance criteria

### Content and relationships

- All 27 current guides have a reader task and two or three next guides.
- Exactly three guides have unique `startHereOrder` values.
- Featured category references are also related-category references.
- Every featured software reference corresponds to a real body link.
- No software or category page shows more than three featured guides.
- No relationship is selected because of affiliate or sponsored status.

### Guide hub states

- Default, search, task, category, combined-filter, empty and invalid-parameter
  states are useful.
- A shared URL restores the exact valid state.
- Back and forward navigation restore controls and results.
- The complete guide list and crawlable topic/task routes remain available
  without JavaScript.
- A keyboard user can search, filter, clear and open a guide without losing
  context.

### Contextual navigation

- Category, software and guide pages render selected guide links at build time.
- Empty relationships are omitted cleanly.
- Link headings and surrounding copy explain why the guides are present.
- Software-page wording does not imply ranking, testing or endorsement.

### Quality checks

Run:

```bash
npm run check
npm run build
npm run check:sitemap
npm run test:interactions
git diff --check
```

Also review:

- 320px, 360px, approximately 412px and desktop layouts;
- keyboard and screen-reader behaviour;
- 200% zoom and enlarged text;
- no-JavaScript output;
- URL-loaded and back/forward state;
- internal links and canonical output; and
- the final relationship mapping for editorial relevance.

## Important files likely to change

| File | Expected responsibility |
| --- | --- |
| `src/content.config.ts` | Validate guide navigation and relationship fields |
| `src/content/guides/*.md` | Store curated navigation metadata |
| `src/pages/guides/index.astro` | Render the new guide hub |
| `src/pages/guides/[slug].astro` | Render next-guide navigation |
| `src/pages/categories/[slug].astro` | Render selected category guides |
| `src/pages/software/[slug].astro` | Render selected product-relevant guides |
| `src/components/GuideCard.astro` | Provide a more scannable guide summary |
| `src/utils/category-families.ts` | Remain the central topic-family source |
| `src/scripts/guides.ts` | Progressively enhance search and filters |
| `src/styles/global.css` | Add Doorway-consistent hub and result styles |
| `scripts/check-guides.mjs` | Enforce navigation metadata integrity |
| `scripts/dashboard.mjs` | Report relationship and coverage gaps |
| `test/interaction-state.test.mjs` | Cover guide URL and filtering states |
| `docs/IMPLEMENTATION_STATUS.md` | Record the completed schema and routes |
| `docs/GUIDE_STANDARD.md` | Add navigation metadata to publication workflow |

## Risks and controls

| Risk | Control |
| --- | --- |
| A second uncontrolled tag taxonomy develops | Reuse categories; keep four validated reader tasks |
| Shared categories produce irrelevant software links | Use explicit `featuredOnSoftware`, never category fallback |
| The hub becomes a miniature magazine homepage | Keep one search, four task routes, existing categories and restrained cards |
| JavaScript hides content from users or crawlers | Render all guide links and cards in static HTML |
| Update dates dominate evergreen guidance | Use dates as freshness metadata, not default relevance |
| Product-guide links imply endorsement | Use neutral explanatory copy and the existing evidence boundary |
| Manual curation becomes stale | Add collection checks and dashboard coverage reports |
| New topic pages become thin SEO archives | Keep filtered states on `/guides/` until distinct intent and content justify a page |
| Search produces noisy results | Search high-signal metadata; add controlled terms only from evidence |

## Explicitly deferred

- site-wide search across software, categories and guides;
- a hosted search provider;
- personalised or behaviour-ranked recommendations;
- indexable tag, year or filtered archive pages;
- automatic related-guide selection based only on shared categories;
- full-text or fuzzy search;
- user accounts, saved reading lists or history;
- a `popular guides` label; and
- new guides created only to fill an empty navigation slot.

These can be reconsidered when the guide library, observed search behaviour or
maintenance burden establishes a real need.
