# Church Software UK

## Vision

Build the UK's most useful independent resource for finding and comparing software used by churches.

The directory should help church leaders make better decisions about administration, membership, pastoral care, safeguarding, giving, finance, worship, communications, websites, bookings, events, volunteers, children's ministry and related operations.

The product should become more than a list of suppliers. Its long-term value should come from helping a church understand:

- what kind of software it needs
- what it does not need
- which products fit its size and context
- what UK-specific issues need checking
- what trade-offs exist
- how to migrate or implement software responsibly

The directory is not intended to be a thin affiliate website.

## Proof-of-concept goal

The first public version should test whether:

1. UK churches search for this information.
2. Useful editorial pages and structured listings can attract organic traffic.
3. Visitors use search, filtering and comparison tools.
4. The site can be maintained by one person.
5. There is enough demand to justify expanding the catalogue and later exploring commercial relationships.

## Audience

### Primary users

- church administrators
- operations managers
- pastors and church leaders
- finance officers and treasurers
- safeguarding leads
- communications teams
- worship and production teams
- volunteers asked to research software

### Secondary users

- denominations and networks
- church consultants
- charities and community organisations
- software suppliers
- implementation partners

## Product principles

The site should be:

- independent
- trustworthy
- useful before it is monetised
- specific to UK church contexts
- fast
- accessible
- statically generated
- straightforward for one maintainer
- transparent about uncertainty
- deployable through GitHub and Cloudflare Pages

## Technology constraints

Use:

- Astro
- TypeScript
- semantic HTML
- modern CSS
- vanilla JavaScript or small framework-free TypeScript modules
- Astro Content Collections
- npm
- static site generation

Do not initially use:

- a database
- a CMS
- server-side rendering
- React, Vue or Svelte
- Tailwind or Bootstrap
- a large component framework

## Core content types

### Software

One structured entry for each product, containing factual metadata and independent editorial content.

### Categories

Pages that explain a class of software, the problem it solves, who normally manages it, UK-specific buying considerations and the relevant products.

### Guides

Long-form decision support, comparisons, migration guidance, requirements templates and practical explainers.

### Static trust pages

Pages explaining the project, methodology, disclosures, privacy and how suppliers or users can submit corrections.

## Initial category taxonomy

The initial model should support at least:

1. Church management systems
2. Membership databases and CRM
3. Pastoral care
4. Safeguarding
5. Online giving
6. Gift Aid
7. Accounting and finance
8. Worship planning
9. Service presentation
10. Church websites
11. Email and communications
12. Volunteer scheduling
13. Children's ministry and check-in
14. Events and ticketing
15. Room and venue bookings
16. Livestreaming
17. Sermon hosting and podcasting
18. Small-group management
19. Church apps
20. Data protection and administration
21. Bible study and research

A product may belong to multiple categories.

## Required routes

The architecture should support:

```text
/
 /software/
 /software/[slug]/
 /categories/
 /categories/[slug]/
 /compare/
 /guides/
 /guides/[slug]/
 /about/
 /methodology/
 /suggest-software/
 /update-a-listing/
 /privacy/
 /affiliate-disclosure/
 /404.html
```

Additional high-value editorial landing pages may be created later, but they must not be thin or duplicative.

## Homepage

The homepage should quickly answer:

- what this site is
- who it is for
- what tasks can be solved
- how to browse or compare products
- why the UK-specific focus matters
- how information is researched and corrected

Suggested positioning:

> Find church software that works in the UK

Suggested supporting message:

> Compare church management, giving, safeguarding, worship, finance and communication tools, with UK-specific information on Gift Aid, GDPR, pricing and support.

## Software directory

The directory should support:

- keyword search
- category filters
- UK-focus filter
- free plan filter
- free trial filter
- Gift Aid filter
- church-size filter
- pricing-model filter
- open-source filter where relevant
- sorting by name
- sorting by last checked
- visible result count
- clear-all control
- useful empty state

The complete directory should be present in static HTML. JavaScript may enhance filtering.

Filter state must use shareable query parameters, for example:

```text
/software/?category=church-management&size=small&free-trial=true
```

## Product comparison

Users should be able to compare two to four products.

A comparison must be shareable through the URL:

```text
/compare/?products=churchsuite,planning-center,breeze
```

The comparison should use structured factual fields, not arbitrary marketing claims. Unknown information should be shown as `Not confirmed`.

## Software listing pages

Each listing should be able to show:

- product name
- logo or neutral fallback
- independent summary
- relevant categories
- best-suited contexts
- typical church size
- UK suitability
- key features
- strengths
- limitations and caveats
- pricing overview
- free plan or trial
- Gift Aid support where relevant
- GDPR and hosting information where available
- integrations
- import and export options
- support information
- verification status
- last checked date
- official sources
- official website link
- commercial disclosure if applicable
- related products
- relevant guides

Do not use fake ratings or unsupported scores.

## Category pages

Each category page should explain:

- what the software category is
- which operational problem it addresses
- who normally selects or manages it
- when a church may not need specialist software
- UK-specific considerations
- important selection criteria
- relevant products
- useful guides
- common questions

## Guides

Starter guide topics may include:

- How to choose church management software
- ChurchSuite vs Planning Center
- Best church management software for small UK churches
- What UK churches should ask about GDPR
- Moving from spreadsheets to a church database
- Choosing online giving software
- What church software needs to support Gift Aid
- Understanding church software pricing
- What safeguarding software can and cannot solve
- Creating a church software requirements list

Guides should be practical, independent and willing to say when simpler tools
are sufficient. Every guide must include a clearly labelled section linking to
relevant software listings already published on the site. These links must
explain their relevance without creating an implied ranking, endorsement or
requirement to click a supplier.

## Content model

The software schema should be capable of representing fields such as:

- name
- slug
- short description
- official website
- company
- country of origin
- UK office or UK focus
- categories
- suitable church sizes
- suitable contexts or traditions
- pricing model
- pricing summary
- starting price and currency where verified
- free plan
- free trial
- demo availability
- contract requirement
- charity discount
- Gift Aid support
- UK banking and payment support
- GDPR information
- hosting information
- data processing agreement
- safeguarding features
- core features
- strengths
- limitations
- integrations
- import and export options
- support channels and time zone
- mobile apps
- accessibility information
- onboarding information
- affiliate relationship
- sponsorship status
- verification status
- last checked
- official sources
- SEO title and description

Not every field should be mandatory. Unknown fields must remain unknown rather than being guessed.

## Trust and methodology

The site must explain:

- which products are included
- how facts are researched
- what verification statuses mean
- how often entries are reviewed
- how corrections are handled
- how commercial relationships are disclosed
- that inclusion is not endorsement
- that product details can change
- that churches should verify legal, security, safeguarding, tax and contractual matters directly

Suggested verification states:

- Verified
- Partially verified
- Needs review

A product must not be labelled `Verified` merely because its website exists.

## Design direction

The design should feel:

- calm
- trustworthy
- modern
- practical
- accessible
- editorially independent

Avoid cliché religious imagery, aggressive affiliate styling, excessive animation, clutter and generic SaaS dashboard aesthetics.

## SEO

Every indexable page should have:

- a unique title
- a unique meta description
- a canonical URL
- Open Graph metadata
- appropriate structured data
- useful internal links
- descriptive URLs
- correct heading hierarchy

The site should include a sitemap, robots file, breadcrumbs and a useful 404 page.

Do not create thin keyword pages or unsupported review schema.

## Forms

The proof of concept should include accessible static forms for:

- suggesting software
- reporting an error
- requesting an update

Form endpoints should be centrally configurable and may initially be placeholders. Do not pretend that a backend exists.

## Analytics

Prepare for privacy-conscious analytics, but do not enable tracking by default.

Future measurement should be able to cover:

- searches
- filter usage
- comparison creation
- outbound product clicks
- correction and suggestion actions

## Deployment

The production site should:

- build with `npm run build`
- output to `dist`
- deploy through GitHub-connected Cloudflare Pages
- use a configurable production URL
- support preview deployments from branches or pull requests

## Proof-of-concept launch scope

A credible launch should aim for:

- robust architecture
- reusable components
- approximately 20 to 30 carefully researched product listings
- all major categories
- approximately 8 to 10 useful guides
- working filters
- working comparisons
- methodology and disclosure pages
- strong performance, accessibility and SEO foundations

The first engineering phase should use only a small representative content set. Catalogue expansion comes after the architecture has been tested.

## Future monetisation

Possible future revenue may include:

- affiliate links
- clearly labelled sponsored listings
- featured placements that do not override editorial integrity
- newsletter sponsorship
- qualified implementation referrals
- consultancy
- advertising
- procurement resources

No commercial relationship should guarantee a positive assessment or ranking.

## Success measures

The proof of concept should eventually be evaluated using:

- organic impressions
- search clicks
- indexed pages
- search terms
- directory searches
- filter use
- comparisons created
- product outbound clicks
- correction submissions
- returning visitors
- maintenance effort per listing

The first goal is evidence of useful demand, not immediate passive income.
