Read these files in full before making changes:

- `AGENTS.md`
- `docs/PROJECT_SPEC.md`
- `docs/IMPLEMENTATION.md`
- `docs/PRINCIPLES.md`
- `docs/ROADMAP.md`
- `docs/IMPLEMENTATION_STATUS.md`

You are implementing Phase 1 only: the architectural foundation of the UK Church Software Directory.

Do not merely produce a plan. Build the working vertical slice in this repository.

## Before editing

1. Inspect the current repository.
2. Run `git status`.
3. Confirm whether an Astro project already exists.
4. Preserve all unrelated files and uncommitted user work.
5. Create and switch to a branch named `feature/foundation` if it does not already exist.
6. Do not push or merge anything.

## Build

Create a statically generated Astro site using TypeScript, semantic HTML, plain CSS and small framework-free JavaScript or TypeScript modules.

Do not add React, Vue, Svelte, Tailwind, Bootstrap, a database, a CMS or server-side rendering.

Implement:

1. Astro project configuration and npm scripts.
2. A central site configuration module.
3. Validated Astro Content Collections for:
   - software
   - categories
   - guides
4. A maintainable content model that represents verified facts, unknown information, editorial assessment, source URLs and last-checked dates.
5. Shared layouts and a restrained, accessible design system.
6. Reusable components needed for the vertical slice.
7. These routes:
   - `/`
   - `/software/`
   - `/software/[slug]/`
   - `/categories/`
   - `/categories/[slug]/`
   - `/compare/`
   - `/guides/`
   - `/guides/[slug]/`
   - `/about/`
   - `/methodology/`
   - `/suggest-software/`
   - `/update-a-listing/`
   - `/privacy/`
   - `/affiliate-disclosure/`
   - `/404.html`
8. A software directory with:
   - keyword search
   - category filtering
   - UK-focus filtering
   - church-size filtering
   - free-plan filtering
   - free-trial filtering
   - Gift Aid filtering
   - pricing-model filtering
   - sort by name
   - sort by last checked
   - visible result count
   - clear-all control
   - useful empty state
9. Static HTML containing the complete directory, with JavaScript used only for progressive enhancement.
10. Shareable URL query parameters that restore the selected search, filters and sort state after reload.
11. A comparison page supporting two to four products through a URL such as:
    `/compare/?products=churchsuite,planning-center,breeze`
12. Graceful handling of missing, unknown or invalid comparison data.
13. SEO foundations:
    - unique page titles and descriptions
    - canonical URLs
    - Open Graph metadata
    - appropriate JSON-LD
    - sitemap
    - robots.txt
    - breadcrumbs
14. A public structured export at:
    - `/public/data/software.json`
15. A stale-listing check exposed through:
    - `npm run check:stale`
16. Accessible static forms with centrally configurable placeholder endpoints. Do not invent a working backend.
17. Cloudflare Pages-compatible static output to `dist`.
18. A useful `README.md`.
19. Content templates and field documentation for future maintainers.
20. A GitHub Actions validation workflow that runs the project checks and production build on pull requests and pushes to `main`.

## Representative content only

Create exactly:

- five real software entries
- three categories
- two guides

Choose entries that exercise meaningfully different schema fields and directory filters.

Use official supplier pages as sources only when internet access is available. Do not fabricate current pricing, features, compliance claims, Gift Aid support, data-hosting details or integrations.

When a fact cannot be confirmed, leave it unknown and display `Not confirmed` or equivalent wording. Sample entries should demonstrate the editorial method, not pretend to be complete reviews.

## Quality expectations

The interface should feel calm, credible and useful to UK church administrators. It should not resemble an aggressive affiliate site or a generic SaaS dashboard.

Meet WCAG 2.2 AA principles as far as practical.

Keep client-side JavaScript minimal. Avoid unnecessary dependencies and hydration.

## Required commands

Provide and run:

```bash
npm run check
npm run check:stale
npm run build
git diff --check
```

Fix all errors caused by your work.

Inspect the generated routes and test:

- default directory state
- URL-loaded filter state
- empty results
- invalid query parameters
- valid comparison URLs
- invalid comparison product slugs
- keyboard operation
- responsive directory and comparison layouts

## Documentation and Git

Update `docs/IMPLEMENTATION_STATUS.md` with:

- what is complete
- important architectural decisions
- known limitations
- factual fields that remain unverified
- the next recommended phase

Review the complete diff for unrelated changes.

Commit the finished foundation using an appropriate Conventional Commit message only after required checks pass.

Do not push the branch.

## Final report

Report:

1. What was built
2. Main routes
3. Number of software entries, categories and guides
4. Important files and configuration locations
5. Checks run and results
6. Unverified content or limitations
7. Branch name and commit hash
8. The five highest-value next actions
