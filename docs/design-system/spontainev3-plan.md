# Spontaine V3 Design Foundation Tokens

These tokens are a foundation layer for future Spontaine V3 work. Consume them through Tailwind utilities and existing Spontaine variables; do not place raw hex colors in React components.

Spontaine V3 CSS variable sources live in `resources/css/tokens/spontainev3.css`. The approved HTML mockup is the source of truth for V3 color, gradient, shadow, and typography values. Existing color, typography, gradient, and shadow utility names are preserved for backward compatibility; layout and radius values are consumed through CSS variable-backed arbitrary Tailwind utilities.

## Color Source Of Truth

Spontaine V3 color utilities such as `text-spontaine-dark`, `bg-spontaine-accent`, and `text-spontaine-gray-muted` resolve through CSS variables in `resources/css/tokens/spontainev3.css`.

| Token | Mockup value | Intended usage |
| --- | --- | --- |
| `--spontaine-accent` | `#18d6a1` | Primary CTA fills and mint interaction accents. |
| `--spontaine-accent-dark` | `#0a9271` | Green display emphasis, links, and stronger accent text. |
| `--spontaine-accent-ink` | `#103e32` | Text on primary mint CTA fills. |
| `--spontaine-dark` | `#202630` | Primary dark text on light V3 surfaces. |
| `--spontaine-dark-bg` | `#282a2a` | Dark navigation, footer, and high-contrast surfaces. |
| `--spontaine-light` | `#fbfbf7` | Paper surface, section masks, and page background transitions. |
| `--spontaine-light-blue` | `#d9f1fc` | Pale sky surfaces and calm blue washes. |
| `--spontaine-gray-cool` | `#71807d` | Eyebrows, labels, and cool secondary text. |
| `--spontaine-gray-muted` | `#647078` | Paragraph and supporting copy. |
| `--spontaine-gray-deep` | `#546165` | Mono subnotes and stronger muted labels. |

Example:

```tsx
<a className='bg-spontaine-accent text-spontaine-accent-ink shadow-cta-glow'>See it in your firm</a>
```

## Layout Tokens

| Token | Value | Intended usage | Example |
| --- | ---: | --- | --- |
| `--space-shell` | `28px` | Desktop shell gutters and constrained page padding. | `px-[var(--space-shell)]` |
| `--space-shell-sm` | `19px` | Mobile shell gutters. | `px-[var(--space-shell-sm)]` |
| `--space-section` | `120px` | Default Spontaine V3 section vertical rhythm. | `py-[var(--space-section)]` |
| `--space-section-lg` | `150px` | Expanded editorial or high-emphasis vertical rhythm. | `py-[var(--space-section-lg)]` |
| `--space-card-sm` | `16px` | Compact card and control group padding. | `p-[var(--space-card-sm)]` |
| `--space-card` | `22px` | Standard Spontaine V3 card padding. | `p-[var(--space-card)]` |
| `--space-card-lg` | `29px` | Large card or layer padding. | `p-[var(--space-card-lg)]` |
| `--space-stack` | `14px` | Architecture stack and repeated layer spacing. | `gap-[var(--space-stack)]` |

## Radius Tokens

| Token | Value | Intended usage | Example |
| --- | ---: | --- | --- |
| `--radius-card` | `20px` | Individual cards and repeated content surfaces. | `rounded-[var(--radius-card)]` |
| `--radius-panel` | `24px` | Larger panels, elevated surfaces, and feature containers. | `rounded-[var(--radius-panel)]` |
| `--radius-control` | `10px` | Inputs, compact controls, and small framed elements. | `rounded-[var(--radius-control)]` |
| `--radius-pill` | `999px` | Pills, chips, and rounded CTA controls. | `rounded-[var(--radius-pill)]` |

Spontaine V3 layout and radius tokens live in CSS variables. Components should consume them through Tailwind arbitrary values rather than custom Tailwind spacing or radius utilities.

## Shadow Tokens

| Token | Utility | Source | Intended usage |
| --- | --- | --- | --- |
| `boxShadow.surface` | `shadow-surface` | `--shadow-surface` | Soft elevated panels and glass-like Spontaine V3 surfaces. |
| `boxShadow.nav` | `shadow-nav` | `--shadow-nav` | Floating navigation and compact persistent controls. |
| `boxShadow.card-lift` | `shadow-card-lift` | `--shadow-card-lift` | Subtle card elevation without strong contrast. |
| `boxShadow.cta-glow` | `shadow-cta-glow` | `--shadow-cta-glow` | Mint CTA emphasis and primary action glow. |
| `boxShadow.prism` | `shadow-prism` | `--shadow-prism` | Inset dimensional depth and exterior glow for V3 prism visuals. |

Example:

```tsx
<div className='rounded-[var(--radius-panel)] bg-spontaine-white p-[var(--space-card)] shadow-surface' />
```

Shadow utilities remain semantic Tailwind classes, but their values are sourced from CSS variables in `resources/css/tokens/spontainev3.css`.

## Gradient Tokens

| Token | Utility | Source | Intended usage |
| --- | --- | --- | --- |
| `backgroundImage.hero-wash` | `bg-hero-wash` | `--gradient-hero-wash` | Approved mockup hero wash: soft blue, paper, warm paper, and blue-gray stops. |
| `backgroundImage.hero-band` | `bg-hero-band` | `--gradient-hero-band` | Approved mockup diagonal ambient band with periwinkle, white, yellow, and sky-blue stops. |
| `backgroundImage.cta-wash` | `bg-cta-wash` | `--gradient-cta-wash` | Calm CTA background wash. |
| `backgroundImage.mint-lime` | `bg-mint-lime` | `--gradient-mint-lime` | Existing mint-to-lime Spontaine gradient. |
| `backgroundImage.mint-blue` | `bg-mint-blue` | `--gradient-mint-blue` | Existing mint-to-light-blue Spontaine gradient. |
| `backgroundImage.prism-surface` | `bg-prism-surface` | `--gradient-prism-surface` | Approved mockup pale glass prism treatment. |
| `backgroundImage.text-highlight` | `bg-text-highlight` | `--gradient-text-highlight` | Text highlight gradient for clipped heading treatments. |

Example:

```tsx
<section className='bg-hero-wash px-[var(--space-shell-sm)] py-[var(--space-section)] md:px-[var(--space-shell)]' />
```

For gradient text, pair the token with Tailwind clipping utilities:

```tsx
<span className='bg-text-highlight bg-clip-text text-transparent'>Decision clarity</span>
```

## Font System

Spontaine V3 uses three canonical font roles:

| Role | Font | Usage |
| --- | --- | --- |
| Display / headings | Urbanist | High-impact display text, page headings, and confident marketing statements. |
| Body / UI copy | Geist | Paragraphs, product copy, interface copy, and readable supporting text. |
| Metadata / labels | Geist Mono | Eyebrows, metadata, labels, and precise small-format text. |

Font loading is centralized in `resources/css/tokens/fonts.css`. Spontaine V3 font variables remain in `resources/css/tokens/spontainev3.css` for backward compatibility:

```css
--font-display: 'Urbanist', sans-serif;
--font-body: 'Geist', sans-serif;
--font-mono: 'Geist Mono', monospace;
```

## Canonical Font Utilities

Use only these Tailwind font utilities for Spontaine V3 work:

| Utility | Source variable | Usage |
| --- | --- | --- |
| `font-display` | `--font-display` | Display and heading text. |
| `font-body` | `--font-body` | Body and UI copy. |
| `font-mono` | `--font-mono` | Eyebrows, metadata, and labels. |

Legacy Tailwind aliases `font-urbanist`, `font-space-grotesk`, and `font-roboto-mono` are no longer canonical and should be migrated in a future cleanup PR.

## Typography Primitives

Use these shared primitives when a complete text style is preferred over composing individual font, size, weight, and line-height utilities:

Typography primitives live in `resources/css/typography.css`.

Display typography primitives use fluid `clamp()` sizing so they scale smoothly from mobile to desktop without breakpoint-only font-size jumps. Non-display primitives generally use fixed sizes for reading and interface stability.

Use only loaded font weights for V3 typography: `400`, `500`, `600`, and `700`. Avoid interpolated weights because they can render differently across operating systems and browsers.

| Primitive | Font role | Intended usage |
| --- | --- | --- |
| `display-hero` | Heading | Primary marketing hero headline. |
| `display-xl` | Heading | Large editorial display heading. |
| `display-lg` | Heading | Standard display heading. |
| `heading-xl` | Heading | Large section or panel heading. |
| `heading-lg` | Heading | Smaller section, card, or panel heading. |
| `body-lg` | Body | Large supporting copy. |
| `body-md` | Body | Default supporting copy. |
| `eyebrow` | Mono | Uppercase labels, metadata, and section eyebrows. |

Examples:

```tsx
<h1 className='display-hero text-spontaine-dark'>Decision clarity</h1>
<p className='body-lg text-spontaine-gray-muted'>Governed intelligence your firm owns.</p>
<p className='eyebrow text-spontaine-gray-cool'>Spontaine V3</p>
```

## Typography Migration Audit

Existing React usage of legacy font utilities was audited but not migrated in PR-02.

| Legacy utility | Current usages |
| --- | --- |
| `font-urbanist` | `resources/js/components/BlogDetailDrawer.tsx`, `resources/js/Modules/PageBuilder/Blocks/RichText/RichTextDisplay.tsx`, `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/HeroSection2.tsx`, `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionLargeText.tsx`, `resources/js/Modules/PageBuilder/Blocks/SpontaineBlocks/SectionCTASP.tsx`, `resources/js/Modules/PageBuilder/Blocks/SpontaineBlocks/SectionImageCarouselSP.tsx` |
| `font-space-grotesk` | `resources/js/Pages/Blogs/components/Breadcrumbs.tsx`, `resources/js/Pages/BlogPage.tsx`, `resources/js/Pages/ResourcePage.tsx`, `resources/js/Pages/Resources/components/BreadcrumbsResources.tsx`, `resources/js/components/CustomUI/Breadcrumb/BreadCrumb.tsx`, `resources/js/Modules/PageBuilder/Blocks/ContactUS.tsx`, `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/HeroSection2.tsx`, `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionBlogsCarousel.tsx`, `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionChat.tsx` |
| `font-roboto-mono` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/CompanyLogosMarquee.tsx`, `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionBlogsCarousel.tsx`, `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/VideoFeatureCarousel.tsx`, `resources/js/Modules/PageBuilder/Blocks/SpontaineBlocks/SectionFeatureCarouselSP.tsx`, `resources/js/Modules/PageBuilder/Blocks/SpontaineBlocks/SectionImageCarouselSP.tsx`, `resources/js/Modules/PageBuilder/Blocks/SpontaineBlocks/SectionMarqueeSP.tsx` |

Future migration should replace those usages with `font-display`, `font-body`, `font-mono`, or the shared typography primitives, depending on the surrounding text role.

## PR-03 Hero

The active V3 homepage layout is `resources/js/Layouts/StaticHomePageV3.tsx`.

The V3 hero is implemented as a concrete component at `resources/js/components/Home/SpontaineV3Hero.tsx`. It uses the existing V3 token and typography foundation, `ArrowUpRight` from `lucide-react`, and avoids hero-specific CSS, raw hex colors, viewport-height sizing, video, and animation libraries.

The hero visual follows the approved HTML mockup's background and prism system: `bg-hero-wash` for the page wash, `bg-hero-band` for the diagonal ambient band, `bg-prism-surface` for the organic glass prism, and `shadow-prism` for dimensional inset depth. These values are shared V3 tokens, not hero-specific overrides.

## Smooth Scroll Audit

Existing smooth-scroll behavior is duplicated in `resources/js/Layouts/StaticHomePage.tsx`, `resources/js/Layouts/StaticHomePage2.tsx`, and `resources/js/Layouts/AppLayout.tsx`.

`StaticHomePageV3` uses `resources/js/hooks/useSmoothPageScroll.ts` instead of copying those inline effects. The hook centralizes anchor scrolling, initial hash scrolling, PageUp/PageDown behavior, scroll direction state, reduced-motion handling, and cleanup. The older duplicated layouts are left unchanged for this PR.

## Primitive Audit

| Pattern | Locations found | Extract now? | Reasoning |
| --- | --- | --- | --- |
| Page shell / content width | `SpontaineV3Hero`, existing `AppLayoutPadding` usage | No | The V3 hero uses a concrete layout once; a shared container should wait until more V3 sections confirm the same width and gutter pattern. |
| Display heading composition | `SpontaineV3Hero`, typography primitives | No | The shared typography primitives already cover the text scale; no React heading primitive is needed for one section. |
| Pill CTA with `ArrowUpRight` | Primary and secondary hero CTAs | No | The two CTAs are similar but local to one hero; extract only if V3 CTA styling repeats in later sections. |
| Elevated surface card | Hero answer card and metric card | No | The cards share V3 tokens but have different content structures; a generic surface card would be premature. |
| Metadata labels / chips | Hero eyebrow, state chips, opportunity label | No | `eyebrow` and `font-mono` already cover the typography role; no new metadata component is justified yet. |
