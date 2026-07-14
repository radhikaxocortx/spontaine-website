# Color Token Audit

This is a documentation-only audit of the current Spontaine color token system. It does not modify code, CSS variables, Tailwind configuration, tokens, or components.

## Sources Reviewed

- `DESIGN.md`
- `resources/css/spontaine-tokens.css`
- `tailwind.config.js`
- `resources/js/HomePage/**`
- `resources/js/Layouts/**`
- `resources/js/components/**`
- `resources/js/Modules/PageBuilder/**`

## Scope And Method

Usage counts are static source occurrences across the reviewed React/TypeScript paths. Counts include Tailwind class aliases and direct hardcoded color values where noted; they are not runtime-rendered counts.

Near matches are not counted as usage of a canonical token. For example, hardcoded `#44ECA0` is tracked separately from `--spontaine-color-accent`, even though it is visually close.

## Token Inventory

| Token | Value | Tailwind Alias | Usage Count | Used In | Usage Category | Migration Risk |
| --- | --- | --- | ---: | --- | --- | --- |
| `--spontaine-color-surface-cream` | `#f7f1e7` | `bg-spontaine-surface-cream` | 3 | Approved hero | Redesign canonical | Safe to keep |
| `--spontaine-color-pale-gray` | `#f5f5f5` | `bg-spontaine-pale-gray` | 1 | Approved hero router strip | Redesign canonical | Safe to keep |
| `--spontaine-color-bright-gray` | `#ededf2` | `bg-spontaine-bright-gray` | 1 | Approved hero eyebrow | Redesign canonical | Safe to keep |
| `--spontaine-color-border-muted` | `#d1d5db` | `border-spontaine-border-muted` | 1 | Approved hero secondary CTA | Redesign canonical | Safe to keep |
| `--spontaine-color-accent` | `#0fe5a8` | `bg-spontaine-accent-approved` | 1 | Approved hero primary CTA | Redesign canonical | Safe to keep |
| `--spontaine-color-accent-hover` | `#2befb6` | `hover:bg-spontaine-accent-hover` | 1 | Approved hero primary CTA hover | Redesign canonical | Safe to keep |
| `--spontaine-color-ink-soft` | `#2e2e2e` | `text-spontaine-ink-soft` | 6 | Approved hero content and router strip | Redesign canonical | Safe to keep |
| `--spontaine-color-ink-dark` | `#0f172a` | `text-spontaine-ink-dark` | 4 | Approved hero heading, CTA, router hover | Redesign canonical | Safe to keep |
| `--spontaine-color-ink-normal` | `#374151` | `text-spontaine-ink-normal` | 1 | Approved hero body copy | Redesign canonical | Safe to keep |
| `--spontaine-color-ink-accent` | `#12d6a0` | `text-spontaine-ink-accent`, `ring-spontaine-ink-accent` | 3 | Approved hero emphasis and focus rings | Redesign canonical | Safe to keep |
| `--spontaine-color-ink-highlight` | `#0cce97` | `text-spontaine-ink-highlight`, `hover:bg-spontaine-ink-highlight` | 2 | Approved hero router link and CTA hover | Redesign canonical | Safe to keep |
| `--spontaine-color-accent-mint` | `#45eda1` | `spontaine-accent-mint` | 0 | Not observed in reviewed JS paths | DESIGN token / near duplicate | Candidate for alias |
| `--spontaine-color-accent-lime` | `#c3ff6e` | `spontaine-accent-lime` | 0 | Not observed in reviewed JS paths | DESIGN token | Safe to keep |
| `--spontaine-color-accent-ink` | `#0a7a55` | `spontaine-accent-ink` | 0 | Not observed in reviewed JS paths | DESIGN token | Safe to keep |
| `--spontaine-color-accent-periwinkle` | `#7776bc` | `spontaine-accent-periwinkle` | 0 | Not observed in reviewed JS paths | DESIGN token | Safe to keep |
| `--spontaine-color-ink-900` | `#242424` | `spontaine-ink-900` | 0 | Not observed in reviewed JS paths | DESIGN token / legacy overlap | Candidate for alias |
| `--spontaine-color-ink-700` | `#343434` | `spontaine-ink-700` | 0 | Not observed in reviewed JS paths | DESIGN token / legacy overlap | Candidate for alias |
| `--spontaine-color-paper` | `#ffffff` | `spontaine-paper` | 0 | Not observed in reviewed JS paths | DESIGN token | Safe to keep |
| `--spontaine-color-gray-50` | `#f7f7f7` | `spontaine-gray-50` | 0 | Not observed in reviewed JS paths | DESIGN token / legacy overlap | Candidate for alias |
| `--spontaine-color-gray-100` | `#f3f4f6` | `spontaine-gray-100` | 0 | Not observed in reviewed JS paths | DESIGN token | Safe to keep |
| `--spontaine-color-cream` | `#f0eee4` | `spontaine-cream` | 0 | Not observed in reviewed JS paths | Legacy/deck surface | Safe to keep |
| `--spontaine-color-border-hairline` | `rgba(0, 0, 0, 0.1)` | `spontaine-border-hairline` | 0 | Not observed in reviewed JS paths | Redesign structural token | Safe to keep |
| `spontaine-accent` | `#45EDA1` | `bg/text/border-spontaine-accent` | 29 | Chat V3, PageBuilder, shared components | Legacy accent alias | Candidate for alias |
| `spontaine-accent-dark` | `#00B563` | `spontaine-accent-dark` | 8 | Chat V3, shared components, PageBuilder | Legacy accent state | Candidate for alias |
| `spontaine-accent-ring` | `#44ECA0` | `spontaine-accent-ring` | 8 | Chat V3, older homepage/PageBuilder | Legacy ring/accent | Candidate for alias |
| `spontaine-accent-soft` | `#90F4C7` | `spontaine-accent-soft` | 4 | PageBuilder carousel/card blocks | Legacy accent tint | Unknown usage |
| `spontaine-accent-bright` | `#C3FF6E` | `spontaine-accent-bright` | 9 | Navbar, footer, PageBuilder | Legacy lime/nav emphasis | Safe to keep |
| `spontaine-accent-footer` | `#2FD47D` | `spontaine-accent-footer` | 5 | Footer | Legacy footer accent | Candidate for deprecation after footer redesign |
| `spontaine-highlight` | `#7776BC` | `spontaine-highlight` | 8 | PageBuilder/homepage legacy blocks | Legacy secondary accent | Candidate for alias |
| `spontaine-dark` | `#343434` | `spontaine-dark` | 34 | Navbar, footer, Chat V3, PageBuilder | Legacy ink/background | Candidate for alias |
| `spontaine-dark-bg` | `#242424` | `spontaine-dark-bg` | 7 | PageBuilder/homepage legacy blocks | Legacy charcoal background | Candidate for alias |
| `spontaine-gray` | `#A7A7A7` | `spontaine-gray` | 22 | PageBuilder/homepage legacy blocks | Legacy neutral text/surface | Unknown usage |
| `spontaine-gray-soft` | `#A9BBB8` | `spontaine-gray-soft` | 1 | Legacy blocks | Legacy neutral | Unknown usage |
| `spontaine-gray-muted` | `#565555` | `spontaine-gray-muted` | 4 | Legacy blocks | Legacy neutral | Unknown usage |
| `spontaine-gray-cool` | `#767676` | `spontaine-gray-cool` | 2 | Legacy blocks | Legacy neutral | Unknown usage |
| `spontaine-gray-deep` | `#454545` | `spontaine-gray-deep` | 0 | Not observed in reviewed JS paths | Legacy neutral | Candidate for deprecation |
| `spontaine-light` | `#F7F7F7` | `spontaine-light` | 15 | Layouts, PageBuilder, shared components | Legacy light surface | Candidate for alias |
| `spontaine-light-ice` | `#BFFCEC` | `spontaine-light-ice` | 0 | Not observed in reviewed JS paths | Legacy accent tint | Unknown usage |
| `spontaine-light-blue` | `#D0D9FB` | `spontaine-light-blue` | 0 | Not observed as alias; hardcoded value appears | Legacy blue/periwinkle tint | Unknown usage |
| `spontaine-white` | `#FFFFFF` | `spontaine-white` | 0 | Not observed as exact alias | Legacy paper | Candidate for alias |
| `spontaine-white-soft` | `#FFFFFFA6` | `spontaine-white-soft` | 9 | Footer/navigation/PageBuilder dark surfaces | Legacy translucent paper | Safe to keep until dark surfaces migrate |
| `spontaine-white-faint` | `#FFFFFF8F` | `spontaine-white-faint` | 1 | Footer | Legacy translucent paper | Safe to keep until footer redesign |
| `spontaine-dpa-card` | `#F7F7F7` | `spontaine-dpa-card` | 1 | DPA PageBuilder blocks | DPA-specific | Safe to keep |
| `spontaine-dpa-header` | `#D1DAF0` | `spontaine-dpa-header` | 1 | DPA PageBuilder blocks | DPA-specific | Safe to keep |
| `spontaine-dpa-title` | `#34495E` | `spontaine-dpa-title` | 2 | DPA PageBuilder blocks | DPA-specific | Safe to keep |
| `spontaine-dpa-accent` | `#47A88E` | `spontaine-dpa-accent` | 2 | DPA PageBuilder blocks | DPA-specific | Safe to keep |
| `spontaine-dpa-summary` | `#333333` | `spontaine-dpa-summary` | 1 | DPA PageBuilder blocks | DPA-specific | Safe to keep |
| `spontaine-dpa-muted` | `#666666` | `spontaine-dpa-muted` | 1 | DPA PageBuilder blocks | DPA-specific | Safe to keep |
| `spontaine-dpa-divider` | `#DDDDDD` | `spontaine-dpa-divider` | 1 | DPA PageBuilder blocks | DPA-specific | Safe to keep |

## Hardcoded Color Inventory Highlights

| Value | Static Count | Used In | Notes |
| --- | ---: | --- | --- |
| `#44ECA0` | 15 | Chat surfaces, old homepage/PageBuilder, calendar booking | Near duplicate of approved accent family; should be migrated only after surface ownership is clear. |
| `#D0D9FB` | 10 | Chat surface gradient, PageBuilder gradients | Near periwinkle/light-blue tint; semantic role is not yet canonical. |
| `#C3FF6E` | 5 | PageBuilder/homepage hardcoded contexts | Matches lime/accent-bright family; DESIGN reserves lime for nav CTA emphasis. |
| `#374151` | 4 | Rich text/PageBuilder and older components | Matches `ink-normal`, but direct hardcoded use should be migrated carefully. |
| `#343434` | 2 | Static homepage/cookie styling | Matches legacy `spontaine-dark` and DESIGN `ink-700`. |
| `#0FE5A8` | 1 | Chat V3 approval card | Matches approved `accent`. |
| `#2BEFB6` | 1 | Chat V3 approval card | Matches approved `accent-hover`. |
| `#AFC1BD` | 1 | Chat V3 heading | Local exploratory muted green-gray. |
| `#4A4A4A` | 1 | Chat V3 heading | Local exploratory dark gray. |

## Duplicate And Overlap Analysis

### Accent Family

| Group | Values | Classification | Recommendation |
| --- | --- | --- | --- |
| Approved action pair | `accent` `#0fe5a8`, `accent-hover` `#2befb6` | Distinct semantic role | Keep as the approved CTA/action pair. |
| Mint/legacy accent | `accent-mint` `#45eda1`, legacy `spontaine-accent` `#45EDA1`, legacy `spontaine-accent-ring` `#44ECA0`, hardcoded `#44ECA0` | Near duplicate | Candidate for aliasing into one mint/ring family after PageBuilder and Chat V3 usage is mapped. |
| Lime emphasis | `accent-lime` `#c3ff6e`, legacy `accent-bright` `#C3FF6E`, hardcoded `#C3FF6E` | Exact duplicate / distinct semantic role | Keep distinct from mint. DESIGN reserves lime for navigation CTA emphasis and bright accents. |
| Periwinkle support | `accent-periwinkle` `#7776bc`, legacy `highlight` `#7776BC` | Exact duplicate | Candidate for alias, not deprecation, because legacy blocks still use `highlight`. |
| Local tints | `#D0D9FB`, `spontaine-light-blue` | Near duplicate to periwinkle tint | Uncertain; should be named by role before promotion. |

### Ink Family

| Group | Values | Classification | Recommendation |
| --- | --- | --- | --- |
| Approved hero ink | `ink-soft` `#2e2e2e`, `ink-dark` `#0f172a`, `ink-normal` `#374151` | Distinct semantic roles | Keep as approved redesign text hierarchy. |
| Legacy charcoal | `ink-700` `#343434`, legacy `spontaine-dark` `#343434` | Exact duplicate | Candidate for alias; do not deprecate while navigation/footer/PageBuilder use `spontaine-dark`. |
| Legacy dark background | `ink-900` `#242424`, legacy `spontaine-dark-bg` `#242424` | Exact duplicate | Candidate for alias after dark surface audit. |
| Local Chat heading grays | `#AFC1BD`, `#4A4A4A` | Uncertain | Keep local until Chat V3 is approved or mapped to a typography/color role. |

### Surface And Paper Family

| Group | Values | Classification | Recommendation |
| --- | --- | --- | --- |
| Approved hero surfaces | `surface-cream` `#f7f1e7`, `pale-gray` `#f5f5f5`, `bright-gray` `#ededf2` | Distinct semantic roles | Keep as the redesign surface foundation. |
| Paper | `paper` `#ffffff`, legacy `spontaine-white` `#FFFFFF` | Exact duplicate | Candidate for alias, but current exact alias usage is low. |
| Legacy light | `gray-50` `#f7f7f7`, legacy `spontaine-light` `#F7F7F7`, DPA card `#F7F7F7` | Exact duplicate / different owners | Candidate for alias for public surfaces; keep DPA-specific aliases for DPA ownership. |
| Legacy cream | `cream` `#f0eee4` | Distinct semantic role | Keep separate until older deck-style layouts are redesigned. |

### Border Family

| Group | Values | Classification | Recommendation |
| --- | --- | --- | --- |
| Approved muted border | `border-muted` `#d1d5db` | Distinct semantic role | Keep for visible controls and secondary CTAs. |
| Structural hairline | `border-hairline` `rgba(0, 0, 0, 0.1)` | Distinct semantic role | Keep for subtle dividers and glass surfaces. |
| DPA divider | `dpa-divider` `#DDDDDD` | DPA-specific | Keep until DPA blocks are redesigned. |

### Legacy PageBuilder And DPA Colors

DPA colors, old PageBuilder neutrals, and older homepage accent variants should remain available. They are not part of the future canonical public palette, but deleting or collapsing them before stored PageBuilder content is audited would be risky.

## Usage Analysis

### Approved Hero

The approved PrismHero is the strongest evidence for the future canonical palette. It uses the new color aliases directly:

- `bg-spontaine-surface-cream`
- `text-spontaine-ink-soft`
- `text-spontaine-ink-dark`
- `text-spontaine-ink-normal`
- `text-spontaine-ink-accent`
- `text-spontaine-ink-highlight`
- `bg-spontaine-accent-approved`
- `hover:bg-spontaine-accent-hover`
- `border-spontaine-border-muted`

Recommendation: continue future redesign work from this palette unless a later approved section proves a missing role.

### Chat V3

Chat V3 is exploratory. It mixes approved tokens, legacy aliases, and hardcoded local values:

- Tokenized or legacy aliases: `bg-spontaine-accent`, `bg-spontaine-accent-dark`, `border-spontaine-accent/30`, `border-spontaine-accent-ring/30`, `text-spontaine-dark`.
- Hardcoded colors: `#AFC1BD`, `#4A4A4A`, `#44ECA0`, `#D0D9FB`, `#0FE5A8`, `#2BEFB6`, plus local shadow RGBA values.

Recommendation: do not let Chat V3 force global decisions until it is approved. When approved, first replace exact matches with existing approved tokens, then decide whether muted green-gray and blue tints deserve local Chat primitives or global tokens.

### Other Homepage Sections

Older homepage sections still use legacy aliases and hardcoded values, especially `#44ECA0`, `#C3FF6E`, `#343434`, and historical `spontaine-*` aliases. These sections should migrate after their redesign scope is defined.

Recommendation: treat legacy homepage color usage as migration debt, not evidence against the approved hero palette.

### Layouts, Navigation, And Footer

Navigation and footer still rely on legacy `spontaine-dark`, `spontaine-accent-bright`, `spontaine-white-soft`, and `spontaine-white-faint`. This is expected because navigation/footer redesign is a later phase.

Recommendation: preserve these aliases until the navigation and footer redesigns define their final dark surface and CTA roles.

### Shared Components

Shared UI contains a mix of shadcn-style neutral values, hardcoded RGBA values, and older Spontaine colors. Some values are component-library defaults rather than public marketing decisions.

Recommendation: do not globally replace these colors during color foundation cleanup. Migrate shared components only when Button, Card, Form, and Modal primitives are redesigned.

### PageBuilder

PageBuilder is the largest legacy color surface. It uses historical aliases, DPA-specific tokens, direct hex values, and block-local gradients. This includes legacy `Home - ...`, `Content Section - ...`, and newer `Spontaine - ...` blocks.

Recommendation: preserve PageBuilder compatibility. New PageBuilder blocks should use the canonical foundation, while old block names and stored content remain supported through aliases.

## Proposed Canonical Foundation v2

This is a proposal only. Do not implement without a dedicated migration plan.

### Surfaces

- Keep `surface-cream` as the approved warm hero/homepage surface.
- Keep `pale-gray` and `bright-gray` as soft supporting surfaces.
- Keep `cream` as a legacy/deck surface until older layouts are migrated.

### Ink

- Keep `ink-dark`, `ink-normal`, and `ink-soft` for the approved redesign text hierarchy.
- Keep `ink-accent` and `ink-highlight` for green text/link emphasis where contrast is verified.
- Consider aliasing `ink-700` to legacy `spontaine-dark`.
- Consider aliasing `ink-900` to legacy `spontaine-dark-bg`.

### Accent

- Keep `accent` and `accent-hover` as the approved action pair.
- Treat `accent-mint`, legacy `spontaine-accent`, and legacy `spontaine-accent-ring` as near-duplicate consolidation candidates.
- Keep `accent-lime` / `accent-bright` distinct because DESIGN reserves lime for navigation CTA emphasis.
- Keep `accent-periwinkle` / `highlight` distinct as a secondary accent/gradient family.

### Borders

- Keep `border-muted` for visible controls and cards.
- Keep `border-hairline` for subtle structural dividers and glass effects.

### Paper And Background

- Keep `paper` as canonical white.
- Treat `spontaine-white`, `white-soft`, and `white-faint` as legacy/dark-surface aliases until navigation/footer/PageBuilder dark surfaces are migrated.

## Migration Risk Summary

| Token/Group | Classification | Rationale |
| --- | --- | --- |
| `surface-cream`, `pale-gray`, `bright-gray` | Safe to keep | Approved hero foundation. |
| `border-muted`, `border-hairline` | Safe to keep | Different border roles; low overlap. |
| `accent`, `accent-hover` | Safe to keep | Approved CTA/action pair. |
| `ink-soft`, `ink-dark`, `ink-normal`, `ink-accent`, `ink-highlight` | Safe to keep | Approved hero hierarchy. |
| `accent-mint`, legacy `spontaine-accent`, legacy `spontaine-accent-ring` | Candidate for alias | Near duplicates; high legacy usage requires careful migration. |
| `accent-lime`, legacy `accent-bright` | Safe to keep | Distinct lime role in DESIGN and navigation. |
| `accent-periwinkle`, legacy `highlight` | Candidate for alias | Exact duplicate with active legacy usage. |
| `ink-700`, legacy `spontaine-dark` | Candidate for alias | Exact duplicate; heavily used in navigation/footer/PageBuilder. |
| `ink-900`, legacy `spontaine-dark-bg` | Candidate for alias | Exact duplicate; still used by legacy surfaces. |
| `gray-50`, legacy `spontaine-light`, DPA card | Candidate for alias / safe to keep | Exact duplicate, but DPA ownership should stay isolated. |
| `cream` | Safe to keep | Distinct legacy deck surface. |
| `gray-soft`, `gray-muted`, `gray-cool`, `gray-deep` | Unknown usage | Legacy neutral roles need owner review. |
| `white-soft`, `white-faint` | Safe to keep | Still needed for dark footer/navigation surfaces. |
| DPA colors | Safe to keep | Domain-specific PageBuilder block colors; not part of public redesign foundation. |
| Hardcoded `#44ECA0`, `#D0D9FB`, `#C3FF6E` | Candidate for migration | Common historical values; migrate per owning surface. |
| Chat V3 local `#AFC1BD`, `#4A4A4A` | Unknown usage | Exploratory section values; do not globalize yet. |

## Recommended Next Steps

1. Keep the approved hero palette as the basis for Color Foundation v2.
2. Do not remove legacy aliases until PageBuilder stored content and navigation/footer surfaces are migrated.
3. Create a future alias plan for exact duplicates: `ink-700`/`spontaine-dark`, `ink-900`/`spontaine-dark-bg`, `accent-periwinkle`/`highlight`, and `accent-lime`/`accent-bright`.
4. Audit hardcoded `#44ECA0` and `#D0D9FB` by component owner before promoting either to a canonical role.
5. Use approved redesign surfaces, not historical inventory breadth, as the source of future canonical color decisions.

