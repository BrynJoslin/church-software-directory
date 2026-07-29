# Doorway Design System

This document is the authoritative source for visual design across the UK
Church Software Directory. It records the **Doorway** direction adopted from
the Church Software UK Brand Book on 25 July 2026.

When a visual choice in existing code or another project document conflicts
with this document, use this document. Product, editorial, accessibility and
technical requirements in `AGENTS.md` still take precedence.

## Design intent

Doorway should make the directory feel like a calm, useful product rather than
a magazine, a church noticeboard or a supplier marketplace.

The visual character is:

- calm and practical
- independent and trustworthy
- warm without being sentimental
- product-like without becoming a dashboard
- easy for supplier brands and factual content to sit within

Do not add decorative religious imagery, aggressive affiliate styling, glass
effects, excessive gradients, heavy shadows, visual clutter or unnecessary
animation.

## Canonical palette

The OKLCH values are canonical. The hex values are equivalent fallbacks for
older browsers.

| Token | OKLCH | Hex fallback | Use |
| --- | --- | --- | --- |
| `--paper` | `oklch(98% 0.005 60)` | `#fbf8f5` | Page background and the only large neutral surface |
| `--surface` | `oklch(96.2% 0.008 60)` | `#f7f1ed` | Cards, wells and table stripes |
| `--ink` | `oklch(26% 0.015 300)` | `#25222a` | Headings and body copy |
| `--ink-muted` | `oklch(49% 0.015 300)` | `#615f68` | Secondary copy, captions and metadata |
| `--rule` | `oklch(90% 0.008 300)` | `#dfdde3` | Hairlines, card borders and dividers |
| `--ink-line` | `oklch(73% 0.012 300)` | `#a9a6ae` | Interactive borders and stronger rules |
| `--accent` | `oklch(46% 0.12 330)` | `#7c3b77` | Primary actions, focus and selected states |
| `--accent-ink` | `oklch(44% 0.12 330)` | `#763671` | Links and accent text on paper |
| `--accent-soft` | `oklch(94% 0.028 330)` | `#f7e5f4` | Badges, notices and selected-control fills |
| `--on-accent` | `oklch(98.5% 0.006 330)` | `#fdf9fc` | Text and marks on the accent |

Do not introduce new brand colours for routine interface states. A state must
always have a text label; colour never carries meaning alone.

## Typography

Use locally hosted **Plus Jakarta Sans** for every display, prose and interface
role. Weight and size provide hierarchy; do not introduce a second display
face.

| Role | Size / line height | Weight | Tracking |
| --- | --- | --- | --- |
| Display | `76px / 1.02` | 800 | `-0.03em` |
| Heading 1 | `44px / 1.1` | 800 | `-0.02em` |
| Heading 2 | `26px / 1.25` | 600 | `-0.015em` |
| Lead | `21px / 1.5` | 400 | normal |
| Body | `16px / 1.6` | 400 | normal |
| UI / label | `15px / 1.4` | 600 | normal |
| Caption | `13px / 1.45` | 400 | `0.01em` |

Use a system monospace stack only for code or literal design-token values.
Fluid sizes may scale these roles down on smaller screens while preserving
their hierarchy.

## Shape and spacing

- Cards use a `16px` radius.
- Controls use a `12px` radius.
- The brand mark uses a `9px` radius at normal size and `13px` when enlarged.
- Tags are pills; status badges are compact rounded rectangles.
- Prefer generous whitespace and one-pixel rules over shadows.
- Use flexible, fluid spacing and avoid fixed heights for variable content.

## Composition and page rhythm

The homepage prototype review on 29 July 2026 established a reusable
composition layer within Doorway. Apply these patterns according to content
hierarchy rather than copying one page layout everywhere:

- Give the primary promise one confident, tightly set display treatment. Use a
  saturated accent field only where it establishes a genuine page entry point,
  not as routine decoration.
- Alternate paper, surface, ink and occasional accent-soft sections to make
  long pages easier to scan. Ink sections are reserved for a small number of
  high-value routes or decisions.
- Pair major section headings with a short explanatory column. The explanation
  should help a reader choose a route, not repeat the heading.
- Use ruled editorial rows for curated guides, principles and compact
  navigational groups. Use bordered cards where entries need to stand as
  comparable records.
- Let search and filter entry points read as purposeful tools through clear
  labels, generous controls and a defined containing surface.
- Use small uppercase eyebrows, numbered routes and factual statistics to
  create orientation. These elements must remain meaningful, current and
  derived from the underlying content where applicable.
- End substantial landing pages with a restrained next-step panel containing a
  small number of useful routes.
- Use decorative dots, circles or similar CSS geometry only on a high-impact
  brand field, at low contrast and with no semantic meaning.

Site-wide engagement should come from hierarchy, contrast, spacing and useful
content grouping. It should not depend on large shadows, excessive card
containers, animation or decorative imagery.

### Page-type variants

Use the shared composition language differently according to what the reader is
trying to do:

- **Discovery pages** such as the software directory, category index and guide
  hub use a clear introductory band, a contained search or route surface and a
  visibly separate browsing workspace.
- **Decision tools** such as comparison and shortlist pages use an
  accent-soft introduction, dark principle panel and bordered working surface.
  The interface should explain its method before asking for input.
- **Records** such as software and category profiles use a contained identity
  area followed by progressively deeper evidence. Product branding remains
  subordinate to the directory's hierarchy.
- **Editorial pages** such as guides, methodology and privacy use a restrained
  introduction and a narrower reading column. Accent fields orient the reader
  but do not run behind long-form prose.
- **Registers and contribution pages** use a strong lead, explicit boundary
  copy and a clearly separated form or searchable record area.

Do not apply a saturated hero, dark band or decorative geometry to every page.
Contrast should mark a change in task or information level.

## Brand mark

The mark is a plum rounded square with one circular paper-coloured aperture in
its centre. It may appear in the accent colour or reversed on an accent field.

Never:

- recolour it with supplier brand colours
- stretch it
- change the circular aperture
- add a cross, dove, fish, steeple or other symbol
- crowd it; keep at least one aperture-width of clear space

## Components

### Buttons and controls

Primary buttons use `--accent` with `--on-accent`. Secondary buttons use paper,
an `--ink-line` border and ink text. All controls have at least a 44px touch
target and a two-pixel accent focus ring with a two-pixel offset.

### Cards

Cards use paper or surface, a one-pixel `--rule` border and no routine drop
shadow. Headings remain ink-coloured; interactive accents appear through links,
badges and selected states. Linked cards may use a two-pixel upward hover shift
and a stronger border, provided reduced-motion preferences are respected.

### Badges and tags

Use `--accent-soft` sparingly for sourced or selected states. Ordinary tags
are outlined pills. Labels must make the state understandable without colour.

### Tables

Editorial and comparison tables use clear column and row headers, generous cell
padding, hairline rules, surface striping and the accent-soft fill for the
header row. Tables sit within a bordered, rounded scrolling region. Preserve
horizontal scrolling on narrow screens instead of squeezing columns or
collapsing facts into ambiguous cards.

### Notices and asides

Use accent-soft for compact notices and surface for substantial side panels.
Avoid large saturated backgrounds.

## Imagery and icons

Use line icons on a 24px grid, with a 1.75px stroke and rounded caps. Icons are
ink-coloured by default and accent-coloured only when the whole element is
interactive. Never use an icon without a text label.

Photography, when added, should show real UK church spaces, real administration
work and natural light. Avoid generic corporate teamwork imagery. Do not add
imagery when strong typography, factual content and layout already solve the
communication problem.

## Accessibility and motion

- Body and UI text must meet a minimum 4.5:1 contrast ratio.
- Large display text and interactive borders must meet a minimum 3:1 ratio.
- Focus is always visible and never removed.
- Touch targets are at least 44px.
- Meaning never depends on colour alone.
- Respect `prefers-reduced-motion`.
- Keep animation brief, purposeful and non-essential.
- Dark ink sections use `--on-accent` for primary text and
  `--on-accent-muted` for supporting text; do not reuse ordinary muted ink on a
  dark field.

The canonical Doorway combinations have been checked as follows:

- ink on paper: `14.80:1`
- muted ink on paper: `5.93:1`
- on-accent text on accent: `7.32:1`
- accent ink on paper: `7.82:1`

## Implementation

The live implementation tokens and shared component rules are in
`src/styles/global.css`. The local font asset is
`public/fonts/plus-jakarta-sans-latin.woff2`. The favicon, header mark and
default social image use the same aperture motif.

New components and pages must use the existing tokens before adding local
values. If the system needs a new reusable token or pattern, update this
document and the shared stylesheet in the same change.
