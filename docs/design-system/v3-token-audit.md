# V3 Token Audit

Audit scope:

- `resources/css/tokens/spontainev3.css`
- `tailwind.config.js`
- `resources/css/typography.css`

This audit is classification only. It does not remove, rename, or modify tokens, utilities, CSS, or React code.

Search method:

- Each CSS variable and Tailwind utility family was checked with static `rg` searches across `resources/js`, `resources/css`, `tailwind.config.js`, and `docs`.
- Direct usage means the token or utility name appears in React, CSS, Tailwind config, or docs.
- Indirect usage means a primitive is consumed by a semantic alias, component token, gradient token, Tailwind utility, or typography class.
- Candidate removal means no static references, no alias dependencies, no Tailwind dependencies, and no documentation dependencies were found. Because PageBuilder content can be persisted or dynamic, every removal candidate should be verified against stored page data before deletion.

## 1. Active Tokens

### Active CSS Variables

| Token(s) | Referenced by | Classification | Rationale |
| --- | --- | --- | --- |
| `--font-display`, `--font-body`, `--font-mono` | CSS, Tailwind config, React through `font-display`, `font-body`, `font-mono` | Active | These are the current V3 font foundations and are used by typography primitives and Tailwind font families. |
| `--space-shell`, `--space-shell-sm` | React | Active | Shared page gutters appear across Home, Product, Company, Navbar-adjacent layouts, and section shells. |
| `--space-card` | React | Active | Used by repeated card surfaces in V3 sections. |
| `--radius-card`, `--radius-panel`, `--radius-control`, `--radius-pill` | React | Active | Used directly in card, panel, control, and pill surfaces. |
| `--radius-section-sm`, `--radius-section-md`, `--radius-section-lg`, `--radius-section-xl` | Tailwind config, React through `rounded-t-section-*` | Active | The variables are consumed by Tailwind radius utilities used across multiple rounded V3 sections. |
| `--spontaine-accent`, `--spontaine-accent-hover`, `--spontaine-accent-soft`, `--spontaine-accent-dark`, `--spontaine-accent-ink`, `--spontaine-accent-bright` | Tailwind config, React | Active | These support V3 CTA, button, pill, and highlighted text treatments. |
| `--spontaine-surface-cream`, `--spontaine-surface-ice`, `--spontaine-surface-sky-soft`, `--spontaine-surface-paper`, `--spontaine-surface-paper-soft`, `--spontaine-surface-ink`, `--spontaine-surface-ink-deep`, `--spontaine-surface-warm-wash` | Tailwind config, React | Active | These are used as section and card backgrounds across Home, Product, Company, and CTA sections. |
| `--spontaine-surface-lavender-soft`, `--spontaine-surface-blue-soft`, `--spontaine-surface-amber-soft`, `--spontaine-surface-mint-soft`, `--spontaine-surface-mint-strong` | React direct CSS variable usage | Active | Product compound cards consume these directly. They are active, but still single-family values. |
| `--spontaine-text-primary`, `--spontaine-text-accent-dark`, `--spontaine-text-accent-grey`, `--spontaine-text-secondary`, `--spontaine-text-tertiary`, `--spontaine-text-on-dark`, `--spontaine-text-on-dark-secondary` | Tailwind config, React | Active | These are the current canonical semantic text utilities. |
| `--spontaine-border-subtle`, `--spontaine-border-medium`, `--spontaine-border-glass-edge` | Tailwind config, React | Active | Used by cards, filters, glass surfaces, navbar, and section UI. |
| `--spontaine-success`, `--spontaine-error` | Tailwind config, React | Active | Used by status, positive/negative, and feedback UI. |
| `--spontaine-teal-mid`, `--spontaine-teal-dark` | Tailwind config, CSS utilities, React | Active | Teal utilities are now explicit because direct Tailwind color parsing was unreliable. |
| `--spontaine-dark`, `--spontaine-gray`, `--spontaine-gray-cool`, `--spontaine-gray-soft`, `--spontaine-gray-muted`, `--spontaine-gray-deep`, `--spontaine-light`, `--spontaine-light-blue`, `--spontaine-white` | Tailwind config, React | Active | Compatibility aliases are still widely used in V3 and shared components. |
| `--spontaine-resources-bg`, `--spontaine-icon-bg`, `--spontaine-icon-text` | Tailwind config, React | Active | Used by resource and icon treatments. |
| `--spontaine-pill-variant-1-bg`, `--spontaine-pill-variant-1-text`, `--spontaine-pill-variant-2-bg`, `--spontaine-pill-variant-2-text`, `--spontaine-pill-variant-3-bg`, `--spontaine-pill-variant-3-text`, `--spontaine-pill-variant-4-bg`, `--spontaine-pill-variant-4-text`, `--spontaine-pill-variant-neutral-bg`, `--spontaine-pill-variant-neutral-text` | React through `Pill` | Active | The shared V3 pill primitive depends on these component tokens. |
| `--spontaine-surface-line`, `--spontaine-surface-line-soft`, `--spontaine-surface-data-muted`, `--spontaine-surface-negative` | React direct CSS variable usage | Active | Home chat/table visuals use these values directly. |
| `--gradient-hero-wash`, `--gradient-hero-wash-soft`, `--gradient-cream-fade-right`, `--gradient-hero-band`, `--gradient-ambient-band-mint-amber`, `--gradient-cta-wash`, `--gradient-mint-blue`, `--gradient-prism-surface`, `--gradient-prism-glass-mint` | Tailwind config, React | Active | These are exposed as `bg-*` utilities and used by Home, Product, or Company hero/CTA visuals. |
| `--shadow-surface`, `--shadow-card-lift`, `--shadow-cta-glow`, `--shadow-prism`, `--shadow-prism-glass` | Tailwind config, React | Active | Used by V3 cards, panels, CTAs, and prism visuals. |

### Active Typography Utilities

| Utility | Referenced by | Classification | Rationale |
| --- | --- | --- | --- |
| `display-hero` | React, CSS, Tailwind config, docs | Active | Used by V3 hero-scale headings. |
| `display-xl` | React, CSS, Tailwind config, docs | Active | Used across Home, Product, and Company section headings. |
| `body-lg` | React, CSS, Tailwind config, docs | Active | Used for repeated section body copy. |
| `eyebrow` | React, CSS, Tailwind config, docs | Active | Used across V3 Home, Product, and Company sections. |

### Active Tailwind Config Entries

| Token or utility family | Referenced by | Classification | Rationale |
| --- | --- | --- | --- |
| `colors.spontaine.*` currently used in JSX | React | Active | Canonical and compatibility color utilities are widely used. |
| `fontFamily.sans`, `fontFamily.id-font`, `fontFamily.display`, `fontFamily.body`, `fontFamily.mono` | React, CSS | Active | These cover current application and V3 typography. |
| `borderRadius.section-sm`, `section-md`, `section-lg`, `section-xl` | React | Active | Used by shared rounded section tops. |
| `boxShadow.surface`, `card-lift`, `cta-glow`, `prism`, `prism-glass`, `spontaine-dpa` | React | Active | Used by V3 surfaces and DPA/PageBuilder components. |
| `backgroundImage.hero-wash`, `hero-wash-soft`, `cream-fade-right`, `hero-band`, `ambient-band-mint-amber`, `cta-wash`, `mint-blue`, `prism-surface`, `prism-glass-mint` | React | Active | Used by current V3 hero, CTA, and product/company visuals. |
| `keyframes.accordion-*`, `animation.accordion-*` | React via accordion component | Active | Used by shared accordion UI. |
| `keyframes.reveal`, `animation.reveal` | React | Active | Used by legacy/PageBuilder sections. |
| `keyframes.ken-burns`, `animation.ken-burns` | React | Active | Used by existing image/hero motion utilities. |
| `borderWidth.3` | React | Active | Used by existing verification/customer UI. |

## 2. Indirectly Active Tokens

### Primitive Color Dependencies

| Primitive token(s) | Used through | Classification | Rationale |
| --- | --- | --- | --- |
| `--mint-50`, `--mint-600` | Pill tokens and compatibility surface aliases | Indirectly Active | These do not need direct JSX usage because component aliases consume them. |
| `--neutral-100`, `--neutral-300`, `--neutral-400`, `--neutral-500`, `--neutral-900` | Semantic and compatibility aliases | Indirectly Active | Used through V3 neutral surfaces, gray aliases, and dark backgrounds. |
| `--teal-dark`, `--teal-mid` | `--spontaine-teal-*` aliases and Tailwind utilities | Indirectly Active | Primitive source for teal utility classes. |
| `--white` | Paper, text-on-dark, borders, and compatibility white aliases | Indirectly Active | White is the primitive behind multiple semantic roles. |
| `--brand-accent`, `--brand-accent-hover`, `--brand-accent-pressed` | Brand semantic aliases | Indirectly Active | These preserve the three-layer model: primitive to semantic to utility/component. |
| `--surface-cream`, `--surface-ice`, `--surface-sky-soft`, `--surface-paper-soft`, `--surface-lavender-soft`, `--surface-blue-soft`, `--surface-amber-soft`, `--surface-mint-soft`, `--surface-mint-strong` | Surface semantic aliases | Indirectly Active | These are primitive sources for V3 section/card surfaces. |
| `--cream-soft`, `--warm-hero-wash`, `--wash-soft-blue`, `--wash-soft-paper`, `--wash-soft-cream`, `--wash-soft-slate`, `--wash-blue`, `--wash-cream` | Gradient and company hero visual tokens | Indirectly Active | These are not meant to appear in JSX except where legacy direct usage remains. |
| `--ink`, `--ink-deep`, `--mint-ink`, `--grey-ink` | Text, overlay, CTA, and compatibility aliases | Indirectly Active | These are active because semantic text and compatibility tokens depend on them. |
| `--feedback-success`, `--feedback-warning`, `--feedback-error` | Feedback semantic aliases and component tokens | Indirectly Active | Feedback roles should remain primitive-backed. |

### Semantic And Component Tokens With Indirect React Usage

| Token(s) | Used through | Classification | Rationale |
| --- | --- | --- | --- |
| `--spontaine-accent-pressed` | Tailwind utility exposure | Indirectly Active | Exposed for interactive states, even if direct current usage is limited. |
| `--spontaine-text-on-accent` | Tailwind utility exposure | Indirectly Active | Public semantic role for accent surfaces. |
| `--spontaine-border-on-dark`, `--spontaine-border-glass-edge-top` | Tailwind utility exposure | Indirectly Active | These support dark/glass surfaces and remain part of the semantic border API. |
| `--spontaine-warning`, `--spontaine-error-soft`, `--spontaine-overlay-scrim` | Tailwind utility exposure | Indirectly Active | Feedback and overlay roles are exposed as public semantic utilities. |
| `--spontaine-surface-muted` | React utility-looking class usage | Indirectly Active | JSX uses `bg-spontaine-surface-muted`; verify generated utility coverage because this token is not mapped in `tailwind.config.js`. |

## 3. Candidate Removal Tokens

These are candidates only. Do not remove them without checking persisted PageBuilder data, CMS content, generated pages, and downstream consumers.

| Token or utility | Location | Classification | Rationale | Recommendation | Follow-up priority |
| --- | --- | --- | --- | --- | --- |
| `--spontaine-gradient-lavender-teal`, `--spontaine-gradient-lime` | `spontainev3.css` | Candidate Removal | No static React, CSS, Tailwind, docs, or alias dependencies were found. | Verify no persisted content uses these custom properties, then remove in a cleanup PR if still unused. | Later |
| Legacy Tailwind font families: `h1-stop`, `h2-1stop`, `h3-1stop`, `subheader-1stop`, `body-1stop`, `small-1stop`, `small-1stop-header`, `xlmetric-1stop`, `axial-label-1stop`, `data-xs-1stop`, `data-sm-1stop`, `data-md-1stop`, `data-lg-1stop`, `font-awesome` | `tailwind.config.js` | Candidate Removal | No static class usage was found in source. | Audit old pages and stored PageBuilder HTML before removing, because typography classes may be persisted. | Later |
| Tailwind color families `tertiary`, `black-secondary` | `tailwind.config.js` | Candidate Removal | No static source usage was found. | Verify against legacy pages and persisted content before removal. | Later |
| `borderWidth.5`, `borderWidth.10` | `tailwind.config.js` | Candidate Removal | No static `border-5` or `border-10` usage was found. | Remove only after checking dynamic class generation and stored content. | Later |
| `animation.shimmer`, `keyframes.shimmer` | `tailwind.config.js` | Candidate Removal | No static `animate-shimmer` usage was found. | Keep if planned for skeleton/loading UI; otherwise remove in cleanup. | Later |

## 4. Reserved Tokens

Reserved tokens are currently unused or lightly used but intentionally useful as public API, future ramp coverage, or documented design-system surface area.

| Token(s) | Location | Classification | Rationale | Recommendation | Follow-up priority |
| --- | --- | --- | --- | --- | --- |
| `--mint-100`, `--mint-200`, `--mint-300`, `--mint-400`, `--mint-500` | `spontainev3.css` | Reserved | The mint ramp is documented as a primitive ramp. Some steps are not currently referenced by semantic aliases. | Keep as future brand ramp coverage unless the design system intentionally narrows primitive ramps. | No Follow-up |
| `--neutral-50`, `--neutral-200`, `--neutral-600`, `--neutral-700`, `--neutral-800` | `spontainev3.css` | Reserved | Neutral ramp completeness is useful even when not every step is consumed today. | Keep as future neutral ramp coverage. | No Follow-up |
| `--space-section`, `--space-section-lg`, `--space-card-sm`, `--space-card-lg`, `--space-stack` | `spontainev3.css` | Reserved | These are documented layout rhythm tokens but are not broadly adopted yet. | Keep while V3 section system settles; revisit after more pages are complete. | Later |
| `--spontaine-highlight`, `--spontaine-accent-ring`, `--spontaine-accent-footer`, `--spontaine-gray-warm`, `--spontaine-light-ice`, `--spontaine-white-soft`, `--spontaine-white-faint`, `--spontaine-text-slate` | `spontainev3.css`, Tailwind config | Reserved | Compatibility aliases may support legacy V2/PageBuilder content or near-future V3 cleanup. | Keep until compatibility aliases are intentionally deprecated. | Later |
| `--spontaine-surface-positive` | `spontainev3.css` | Reserved | Positive data surface exists alongside active negative/data muted surfaces but has no direct static usage. | Keep as paired component token for future status/data UI. | Later |
| `--gradient-mint-lime`, `--gradient-text-highlight` | `spontainev3.css`, Tailwind config | Reserved | Exposed in Tailwind/docs, but no current React usage found. | Keep if planned for marketing text/background treatments; otherwise revisit later. | Later |
| `--shadow-nav` | `spontainev3.css`, Tailwind config | Reserved | Nav currently uses a simpler surface, but the shadow token is exposed. | Keep if navbar elevation variants are planned; otherwise revisit with nav cleanup. | Later |
| Typography utilities `display-lg`, `heading-xl`, `heading-lg`, `body-md` | `typography.css`, Tailwind config | Reserved | These are documented typography primitives even though current V3 sections mainly use `display-xl`, `body-lg`, and `eyebrow`. | Keep as public typography scale unless intentionally shrinking the type system. | No Follow-up |
| Public semantic utilities `accent-pressed`, `border-on-dark`, `border-glass-edge-top`, `warning`, `error-soft`, `overlay-scrim`, `text-on-accent`, `teal-dark` | Tailwind config / CSS variables | Reserved | These roles are meaningful semantic API even with little current JSX usage. | Keep unless a future semantic API cleanup removes unused roles as a group. | No Follow-up |

## 5. Duplicate Token Candidates

These are not removal recommendations. They are places where names overlap and can be rationalized later if usage consolidates.

| Candidate | Classification | Location examples | Rationale | Recommendation | Follow-up priority |
| --- | --- | --- | --- | --- | --- |
| Text aliases: `--spontaine-text-primary` vs `--spontaine-dark`; `--spontaine-text-secondary` vs `--spontaine-gray-deep` / `--spontaine-gray-muted` | Candidate Token | Home/Product/Company sections, Tailwind config | Canonical semantic text tokens now coexist with older compatibility aliases. Both are still used. | Prefer canonical `text-spontaine-text-*` for new V3 work, but keep compatibility aliases until legacy usage declines. | Later |
| Paper/white aliases: `--spontaine-surface-paper`, `--spontaine-white`, `--spontaine-light` | Candidate Token | Sections, cards, navbar, resources | Several aliases point to very similar light surfaces, but they carry different compatibility meaning. | Do not merge now. Track whether new V3 components can consistently use `surface-paper` for product surfaces and reserve `white/light` for compatibility. | Later |
| Gray aliases: `--spontaine-gray`, `--spontaine-gray-cool`, `--spontaine-gray-soft`, `--spontaine-gray-muted`, `--spontaine-gray-deep` | Candidate Token | Chat, stack, product/company sections | The gray compatibility set is broad and partly overlaps semantic text roles. | Keep local compatibility aliases now; consolidate only after source usage moves to semantic text/border roles. | Later |
| Gradient families: hero wash, soft hero wash, CTA wash, cream fade, hero band, product ambient band | Keep Local | Home/Product/Company hero and CTA visuals | These are art-direction gradients with page-specific visual intent. | Do not collapse into one generic gradient. Keep named visual tokens only where already reused or public. | No Follow-up |

## 6. Utility Exposure Candidates

| Candidate | Classification | Location examples | Rationale | Recommendation | Follow-up priority |
| --- | --- | --- | --- | --- | --- |
| `--spontaine-surface-line`, `--spontaine-surface-line-soft`, `--spontaine-surface-data-muted`, `--spontaine-surface-negative`, `--spontaine-surface-positive` | Candidate Utility | Home chat/table components | React uses direct `var(...)` for repeated surface/data colors. A Tailwind utility would improve readability if the pattern spreads beyond chat/table. | Add utilities only after a second section family uses these same data-surface roles. `surface-line` is the strongest candidate because it already repeats internally. | Later |
| `--spontaine-surface-muted` | Candidate Utility | Stack section class usage | JSX uses `bg-spontaine-surface-muted`, but the token is not clearly exposed in Tailwind config. | Verify generated CSS. If the class is missing, expose it or replace with an existing mapped utility. | Immediate |
| Product compound soft surfaces: lavender, blue, amber, mint, mint strong | No Action | Product compound cards | These are active but confined to one product section family. | Keep direct usage for now; do not add utilities unless reused in another section family. | No Follow-up |
| `--spontaine-text-slate` | No Action | Single direct CSS variable use | Single usage does not meet the threshold for utility exposure. | Keep local or migrate opportunistically when touching that component. | No Follow-up |

## 7. Cleanup Recommendations

| Recommendation | Classification | Rationale | Follow-up priority |
| --- | --- | --- | --- |
| Keep the current token layers intact: primitives to semantic aliases to component/utility consumption. | No Action | The architecture is readable and avoids raw values in React. | No Follow-up |
| Do not remove primitive ramps yet. | Reserved | Partial ramp usage is normal while a design system is maturing; deleting unused ramp steps can create churn. | No Follow-up |
| Review `bg-spontaine-surface-muted` specifically. | Candidate Utility | It appears in JSX but does not appear as a mapped Tailwind color entry in the audited config. This may be a real rendering gap similar to the teal utility issue. | Immediate |
| Create a compatibility-alias deprecation list only after V3 source usage stabilizes. | Candidate Token | `spontaine-dark`, gray aliases, white/light aliases, and canonical semantic tokens currently coexist. Premature removal would be high risk. | Later |
| Verify candidate removals against persisted PageBuilder content before deleting anything. | Candidate Removal | Static source search cannot see database-backed block content or CMS-authored HTML. | Later |
| Keep one-off art-direction geometry local. | Keep Local | Prism facet geometry, ladder offsets, stack animation offsets, hero band placement, and mockup-specific section art do not meet reuse thresholds. | No Follow-up |

## Do Not Tokenize Yet

- Product hero prism placement, facet geometry, and ambient band sizing.
- Product compound ladder card offsets.
- Home stack card x/y offsets and scroll animation distances.
- Carousel navigation micro-sizing.
- Single-section card heights and mobile-only layout fixes.
- Mockup-specific gradients that are only used by one visual section.
- Product gallery category data and per-card text hierarchy.
- Company hero image overlay composition beyond the existing reusable background tokens.

These values are either one-off art direction, animation tuning, or single-family layout choices. They should remain local until repeated in at least two V3 section families.

## Conservative Follow-up Backlog

Immediate:

- Verify and fix `bg-spontaine-surface-muted` utility availability if it is not generated.

Later:

- Audit candidate removal tokens against persisted PageBuilder/database content.
- Consolidate V3 text usage toward canonical `text-spontaine-text-*` utilities after legacy compatibility requirements are clearer.
- Consider Tailwind utilities for repeated data-surface tokens if another section family adopts the same chart/table styling.
- Revisit old Tailwind font families once legacy 1Stop pages and PageBuilder content are confirmed not to depend on them.

No follow-up:

- Keep primitive ramps, reserved typography scale utilities, public semantic roles, and local art-direction values as-is for now.
