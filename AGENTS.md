# Agent Instructions

This file contains persistent instructions for AI coding agents working in this repository.

Read this file before changing anything. Also read:

- `docs/DESIGN_SYSTEM.md`
- `docs/PROJECT_SPEC.md`
- `docs/IMPLEMENTATION.md`
- `docs/PRINCIPLES.md`
- `docs/ROADMAP.md`
- `docs/IMPLEMENTATION_STATUS.md`

When instructions conflict, use this order:

1. The user's current instruction
2. `AGENTS.md`
3. `docs/DESIGN_SYSTEM.md` for visual design decisions
4. `docs/IMPLEMENTATION.md`
5. `docs/PROJECT_SPEC.md`
6. `docs/PRINCIPLES.md`
7. `docs/ROADMAP.md`
8. Existing project conventions

## Project purpose

Church Software UK helps UK churches discover, assess and compare software used for administration, ministry, safeguarding, communication, finance and operations.

It is intended to become a trustworthy decision resource, not a thin affiliate website.

## Priorities

Optimise for:

1. Factual accuracy
2. Usefulness to UK churches
3. Maintainability
4. Accessibility
5. Performance
6. Search visibility
7. Simplicity

Do not prioritise novelty, automation or feature quantity over those goals.

## Required technology

Use:

- Astro
- TypeScript
- semantic HTML
- modern CSS
- vanilla JavaScript or small framework-free TypeScript modules
- Astro Content Collections
- static site generation
- npm

Do not add these unless the user explicitly approves them:

- React
- Vue
- Svelte
- Tailwind
- Bootstrap
- jQuery
- a database
- a headless CMS
- server-side rendering
- a large client-side state library
- a large component library

Do not add a dependency when a small, clear local implementation is more suitable.

## Working method

Before editing:

1. Read the relevant documentation.
2. Inspect the repository structure.
3. Check the current branch.
4. Run `git status`.
5. Understand existing conventions.
6. Identify whether the task affects schemas, routes, SEO, accessibility or deployment.
7. Preserve unrelated files and user changes.

For substantial work:

1. Use a dedicated branch.
2. Work in coherent steps.
3. Run checks after meaningful changes.
4. Review the final diff.
5. Update documentation where necessary.
6. Commit only coherent, working changes.

Do not rewrite working code merely to match a stylistic preference. Do not broaden the requested task.

## Git safety

Never:

- push directly to `main` unless explicitly instructed
- force-push
- rewrite published history
- merge a pull request
- bypass failing checks
- disable tests merely to make a build pass
- commit secrets or `.env` files
- commit `node_modules`
- discard uncommitted user changes

Use Conventional Commits where practical:

- `feat: add software comparison page`
- `fix: preserve directory filters in URL`
- `content: add ChurchSuite listing`
- `docs: update research workflow`
- `refactor: simplify software schema`
- `test: cover invalid comparison parameters`
- `chore: update dependencies`

Before committing, run:

```bash
npm run check
npm run build
git diff --check
```

If a command fails because of a pre-existing unrelated problem, report that plainly. Do not conceal it.

## Scope control

Complete the requested task fully, but do not start future roadmap phases without instruction.

When implementing a phase:

- implement only that phase
- use representative sample content where requested
- do not create large batches of unreviewed content
- record deferred work in `docs/IMPLEMENTATION_STATUS.md`

The roadmap is not permission to build everything at once.

## Architecture

Prefer:

- static generation
- small focused modules
- reusable Astro components
- strongly typed content schemas
- progressive enhancement
- URL-based state for search, filters and comparisons
- central configuration
- separation of factual data from editorial commentary
- content stored separately from presentation

Avoid:

- unnecessary abstraction
- deeply nested component trees
- global mutable state
- duplicated logic
- hidden coupling
- client-side rendering of content that can be generated statically
- special-case data structures that bypass the content model

The project must remain understandable to one primary maintainer.

## Astro and TypeScript

Use Astro components by default. Hydrate nothing unless interaction requires it.

Prefer:

- build-time data loading
- static route generation
- content collections
- framework-free scripts
- shared layouts
- reusable SEO components

The production site must build to `dist` and remain compatible with Cloudflare Pages static hosting.

Use TypeScript where it improves reliability. Avoid `any` unless a clear comment explains why it is unavoidable. Prefer readable types over elaborate type machinery.

## Content collections

Use Astro Content Collections for:

- software
- categories
- guides

Every collection must use schema validation. Software may belong to multiple categories.

Structured facts must remain separate from editorial body copy.

When changing a schema:

1. Check every existing entry.
2. Update templates and field documentation.
3. Update affected components.
4. Run the complete build.
5. Record the decision in `docs/IMPLEMENTATION_STATUS.md`.

## Editorial accuracy

Never invent:

- prices
- features
- integrations
- company locations
- customer counts
- testimonials
- ratings
- reviews
- certifications
- GDPR compliance claims
- data-hosting locations
- Gift Aid support
- safeguarding capabilities
- affiliate relationships
- support hours
- hands-on testing

Use official supplier sources as the primary evidence where possible. Write independent summaries rather than copying marketing text.

When information is uncertain, use clear wording such as:

- `Not confirmed`
- `Contact supplier`
- `Pricing needs verification`
- `No UK-specific information found`
- `Last checked: [date]`

Absence of evidence does not establish that a feature is unavailable. Use `Not confirmed` rather than `No` unless a reliable source establishes the absence.

## Research standards

Before publishing a listing:

1. Confirm the product exists and its official site is active.
2. Confirm plausible relevance to UK churches.
3. Prefer first-party documentation.
4. Record source URLs and the date checked.
5. Separate supplier claims from directory assessment.
6. Do not infer legal or regulatory compliance from vague marketing language.
7. Mark unresolved fields instead of guessing.
8. Do not publish dozens of listings in one unreviewed batch.

## UK context

Use UK English and British terminology.

Consider where relevant:

- Gift Aid
- UK GDPR
- Data Protection Act 2018
- charity accounting
- VAT
- DBS and safeguarding administration
- UK payment methods
- pounds sterling
- UK support hours
- Church of England, Catholic, free church, independent and multi-site structures

Do not imply that an international product is UK-specific without evidence. Do not give legal, tax, financial or safeguarding advice beyond reliable evidence.

## Design

Use `docs/DESIGN_SYSTEM.md` as the source of truth for visual design. The
Doorway direction, tokens, type scale, brand mark, components and imagery rules
defined there apply across the site.

The design should feel calm, trustworthy, practical, modern and editorially independent.

Avoid:

- aggressive affiliate styling
- fake urgency
- excessive gradients
- glassmorphism
- cluttered dashboards
- tiny text
- weak contrast
- decorative religious clichés
- excessive animation
- visual cues that imply endorsement

Use clear hierarchy, readable typography, consistent spacing, visible metadata, restrained colour, responsive layouts and useful empty states.

## CSS and JavaScript

Use plain CSS with custom properties, logical properties, Grid, Flexbox, fluid sizing and reduced-motion support.

Avoid `!important`, deeply nested selectors, unexplained magic numbers, brittle fixed heights and duplicate declarations.

Client-side scripts must be small, focused, progressively enhancing, keyboard accessible and resilient to missing elements.

Use URL query parameters for:

- search
- filters
- sorting
- comparisons

Do not store essential state only in `localStorage`.

## Accessibility

Aim for WCAG 2.2 AA.

Every change should consider:

- semantic headings
- one clear `h1`
- keyboard operation
- visible focus states
- labels and error messages
- skip links
- contrast
- reduced motion
- alternative text
- touch target size
- table semantics
- screen reader announcements where useful

Prefer native HTML over unnecessary ARIA. Do not make essential meaning depend on colour.

## SEO

Every indexable page should have:

- a unique title
- a unique meta description
- a canonical URL
- valid Open Graph metadata
- descriptive headings
- useful internal links
- appropriate structured data
- crawlable static content

Do not add fake review schema, unsupported price schema, hidden FAQ content, doorway pages, thin archives or keyword-stuffed copy.

## Performance

Keep client-side JavaScript minimal. Avoid large dependencies, unnecessary hydration, blocking third-party scripts, unoptimised images, layout shifts and excessive DOM complexity.

Use Lighthouse as a diagnostic tool, not as a target to manipulate.

## Forms, analytics and commercial links

The initial site should remain static unless explicitly approved otherwise.

Do not invent a working backend. Form endpoints and analytics providers must be configurable and disabled safely by default.

Do not add affiliate or sponsored links unless instructed. Any future commercial relationship must be clearly labelled and must not guarantee favourable coverage or ranking.

## Comparison functionality

Comparisons must use structured factual data.

Users should be able to compare two to four products. Selection must be encoded in the URL. Unknown data should display as `Not confirmed`, not as a negative answer.

Do not create an overall score unless the methodology is transparent, evidence-based and visible.

## Quality assurance

Before finishing substantial work:

1. Run `npm run check`.
2. Run `npm run build`.
3. Run `git diff --check`.
4. Inspect affected generated routes.
5. Test interactions and URL-loaded states.
6. Test keyboard behaviour.
7. Check responsive layouts.
8. Check internal links.
9. Check for unsupported factual claims.
10. Confirm documentation remains accurate.

For interactive features, cover at least:

- default state
- URL-loaded state
- empty state
- invalid parameters
- keyboard operation
- mobile layout

## Documentation

Keep these files current:

- `README.md`
- `docs/PROJECT_SPEC.md`
- `docs/IMPLEMENTATION.md`
- `docs/PRINCIPLES.md`
- `docs/ROADMAP.md`
- `docs/IMPLEMENTATION_STATUS.md`

Update documentation in the same change when commands, architecture, schemas, routes, deployment or maintenance steps change.

## Completion report

At the end of a task, report:

1. What changed
2. Important files changed
3. Checks run and whether they passed
4. Factual information still requiring review
5. Limitations or deferred work
6. Branch and commit, if created

Do not claim success when required checks failed.

## Decision rule

Choose the simplest approach that:

- meets the requirement
- remains maintainable
- preserves static generation
- performs well
- supports accessibility
- reduces factual risk
- avoids unnecessary dependencies

Prefer readable code over clever code. Prefer trustworthy incomplete data over polished fabricated data. Prefer a smaller complete feature over a larger half-working one.
