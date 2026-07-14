# Hero Token Extraction

This audit treats the current `PrismHero` implementation as the approved design reference. It is documentation only and does not modify code, tokens, Tailwind config, PageBuilder data, or component exports.

## Sources

- `resources/js/HomePage/Hero/PrismHero.tsx`
- `resources/js/HomePage/Hero/HeroContent.tsx`
- `resources/js/HomePage/Hero/HeroActions.tsx`
- `resources/js/HomePage/Hero/HeroRouterStrip.tsx`
- `resources/js/HomePage/Hero/HeroVideo.tsx`

## Classification

- `global`: reusable outside the homepage hero.
- `homepage`: reusable across homepage-specific sections or future homepage hero variants.
- `local implementation detail`: structural or asset-specific implementation detail that should stay in the component.

## 1. Colors

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `PrismHero.tsx` | `bg-spontaine-surface-cream` | Hero canvas background | `--spontaine-color-surface-cream` | homepage |
| `PrismHero.tsx` | `from-transparent to-white` | Bottom clearance fade into the next white section | `--homepage-hero-clearance-gradient` | homepage |
| `HeroContent.tsx` | `bg-spontaine-bright-gray/30` | Eyebrow translucent surface | `--homepage-hero-eyebrow-surface` | homepage |
| `HeroContent.tsx` | `border-white/60` | Eyebrow translucent border | `--homepage-hero-eyebrow-border-color` | homepage |
| `HeroContent.tsx` | `text-spontaine-ink-soft` | Eyebrow, subline, and footnote color | `--spontaine-color-ink-soft` | global |
| `HeroContent.tsx` | `text-spontaine-ink-dark` | Heading color | `--spontaine-color-ink-dark` | global |
| `HeroContent.tsx` | `text-spontaine-ink-accent` | Heading emphasis color | `--homepage-hero-emphasis-color` | homepage |
| `HeroContent.tsx` | `text-spontaine-ink-normal` | Body copy color | `--spontaine-color-ink-normal` | global |
| `HeroActions.tsx` | `ring-spontaine-ink-accent` | CTA focus ring color | `--spontaine-focus-ring-color` | global |
| `HeroActions.tsx` | `bg-spontaine-accent` | Primary CTA fill | `--homepage-hero-cta-primary-bg` | homepage |
| `HeroActions.tsx` | `hover:bg-spontaine-ink-highlight` | Primary CTA hover fill | `--homepage-hero-cta-primary-hover-bg` | homepage |
| `HeroActions.tsx` | `border-spontaine-border-muted` | Secondary CTA border color | `--spontaine-color-border-muted` | global |
| `HeroActions.tsx` | `bg-white/20` | Secondary CTA translucent fill | `--homepage-hero-cta-secondary-bg` | homepage |
| `HeroActions.tsx` | `hover:bg-spontaine-accent-hover` | Secondary CTA hover fill | `--homepage-hero-cta-secondary-hover-bg` | homepage |
| `HeroRouterStrip.tsx` | `bg-spontaine-pale-gray/30` | Router strip translucent surface | `--homepage-hero-router-surface` | homepage |
| `HeroRouterStrip.tsx` | `border-white/70` | Router strip translucent borders | `--homepage-hero-router-border-color` | homepage |
| `HeroRouterStrip.tsx` | `text-spontaine-ink-highlight` | Router strip link color | `--homepage-hero-router-link-color` | homepage |
| `HeroVideo.tsx` | `bg-white/15` | Media veil overlay | `--homepage-hero-media-overlay` | homepage |
| `HeroVideo.tsx` | `from-spontaine-surface-cream/75 via-spontaine-surface-cream/35 to-transparent` | Left media wash gradient | `--homepage-hero-media-wash-gradient` | homepage |

## 2. Font Families

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `font-display` | Eyebrow, heading, body, subline, footnote font family | `font-display` / `--spontaine-font-family-display` | global |
| `HeroActions.tsx` | `font-display` | CTA label font family | `font-display` / `--spontaine-font-family-display` | global |
| `HeroRouterStrip.tsx` | `font-display` | Router strip copy and link font family | `font-display` / `--spontaine-font-family-display` | global |

## 3. Font Sizes

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `text-[10px] sm:text-[11px]` | Eyebrow text size | `--homepage-hero-eyebrow-font-size-*` | homepage |
| `HeroContent.tsx` | `text-[42px] sm:text-[52px] md:text-[60px] xl:text-[64px]` | Art-directed hero heading scale | `--homepage-hero-heading-font-size-*` | homepage |
| `HeroContent.tsx` | `text-[16px] sm:text-[18px]` | Hero body copy scale | `--spontaine-font-size-body-lg-*` | global |
| `HeroContent.tsx` | `text-[14px] sm:text-[15px]` | Hero italic subline scale | `--homepage-hero-subline-font-size-*` | homepage |
| `HeroContent.tsx` | `text-[13px]` | Hero footnote size | `--spontaine-font-size-fine-print` | global |
| `HeroActions.tsx` | `text-[14px]` | CTA label size | `--spontaine-font-size-button-md` | global |
| `HeroRouterStrip.tsx` | `text-[13px]` | Router strip label size | `--homepage-hero-router-label-font-size` | homepage |
| `HeroRouterStrip.tsx` | `text-[14px]` | Router strip body/link size | `--homepage-hero-router-body-font-size` | homepage |

## 4. Line Heights

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `leading-4` | Eyebrow line height | `--homepage-hero-eyebrow-line-height` | homepage |
| `HeroContent.tsx` | `leading-[46px] sm:leading-[58px] md:leading-[66px] xl:leading-[70px]` | Hero heading line-height scale | `--homepage-hero-heading-line-height-*` | homepage |
| `HeroContent.tsx` | `leading-[26px] sm:leading-[28px]` | Hero body copy line-height | `--spontaine-line-height-body-lg-*` | global |
| `HeroContent.tsx` | `leading-[22px]` | Hero subline line height | `--homepage-hero-subline-line-height` | homepage |
| `HeroContent.tsx` | `leading-[18px]` | Hero footnote line height | `--spontaine-line-height-fine-print` | global |
| `HeroActions.tsx` | `leading-5` | CTA label line height | `--spontaine-line-height-button-md` | global |
| `HeroRouterStrip.tsx` | `leading-[22px]` | Router label, body, and link line height | `--homepage-hero-router-line-height` | homepage |

## 5. Font Weights

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `font-semibold` | Eyebrow lead weight | `--spontaine-font-weight-semibold` | global |
| `HeroContent.tsx` | `font-bold` | Hero heading weight | `--spontaine-font-weight-bold` | global |
| `HeroContent.tsx` | `font-normal` | Body and footnote weight | `--spontaine-font-weight-regular` | global |
| `HeroContent.tsx` | `font-light` | Italic subline weight | `--spontaine-font-weight-light` | global |
| `HeroActions.tsx` | `font-bold` | CTA label weight | `--spontaine-font-weight-bold` | global |
| `HeroRouterStrip.tsx` | `font-bold` | Router strip label weight | `--spontaine-font-weight-bold` | global |
| `HeroRouterStrip.tsx` | `font-normal` | Router strip body weight | `--spontaine-font-weight-regular` | global |
| `HeroRouterStrip.tsx` | `font-semibold` | Router strip link weight | `--spontaine-font-weight-semibold` | global |

## 6. Letter Spacing

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `tracking-[0.06em]` | Eyebrow uppercase tracking | `--spontaine-letter-spacing-eyebrow` | global |
| `HeroContent.tsx` | `tracking-[-0.02em]` | Hero heading tracking | `--homepage-hero-heading-letter-spacing` | homepage |

## 7. Layout

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `PrismHero.tsx` | `relative isolate flex w-full flex-col overflow-hidden` | Hero shell stacking, layout, and clipping | none | local implementation detail |
| `PrismHero.tsx` | `flex w-full items-start` | Content row layout | none | local implementation detail |
| `HeroContent.tsx` | `mx-auto flex w-full flex-col items-start` | Content stack layout | none | local implementation detail |
| `HeroActions.tsx` | `inline-flex items-center justify-center` | CTA internal alignment | none | local implementation detail |
| `HeroActions.tsx` | `flex w-full flex-col sm:w-auto sm:flex-row sm:items-center` | CTA group responsive layout | none | local implementation detail |
| `HeroRouterStrip.tsx` | `mx-auto flex w-full flex-col lg:flex-row lg:items-center lg:justify-between` | Router strip responsive layout | none | local implementation detail |
| `HeroVideo.tsx` | `object-cover object-center max-w-none` | Decorative media rendering behavior | none | local implementation detail |

## 8. Spacing

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `pb-12 lg:pb-16` | Hero content bottom padding | `--homepage-hero-content-padding-bottom-*` | homepage |
| `HeroContent.tsx` | `pt-32 sm:pt-36 lg:pt-[140px]` | Hero content top padding | `--homepage-hero-content-padding-top-*` | homepage |
| `HeroContent.tsx` | `mb-4` | Eyebrow-to-heading gap | `--homepage-hero-eyebrow-margin-bottom` | homepage |
| `HeroContent.tsx` | `px-4 py-1.5` | Eyebrow pill padding | `--homepage-hero-eyebrow-padding-*` | homepage |
| `HeroContent.tsx` | `mt-7` | Heading-to-body gap | `--homepage-hero-heading-body-gap` | homepage |
| `HeroContent.tsx` | `gap-4` | Body stack gap | `--homepage-hero-body-stack-gap` | homepage |
| `HeroContent.tsx` | `mt-8` | Body-to-CTA gap | `--homepage-hero-cta-margin-top` | homepage |
| `HeroContent.tsx` | `mt-5` | CTA-to-footnote gap | `--homepage-hero-footnote-margin-top` | homepage |
| `HeroActions.tsx` | `px-7` | CTA horizontal padding | `--spontaine-control-padding-x-lg` | global |
| `HeroActions.tsx` | `gap-4` | CTA group gap | `--homepage-hero-cta-group-gap` | homepage |
| `HeroRouterStrip.tsx` | `py-6` | Router strip vertical padding | `--homepage-hero-router-padding-y` | homepage |
| `HeroRouterStrip.tsx` | `gap-4 gap-3 sm:gap-6` | Router strip internal spacing | `--homepage-hero-router-gap-*` | homepage |

## 9. Widths

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `max-w-[900px]` | Main hero content rail | `--homepage-hero-content-width` | homepage |
| `HeroContent.tsx` | `max-w-[882px]` | Heading and subline measure | `--homepage-hero-heading-width` | homepage |
| `HeroContent.tsx` | `max-w-[730px]` | Body copy measure | `--homepage-hero-body-width` | homepage |
| `HeroActions.tsx` | `sm:w-[229px]` | Primary CTA width | `--homepage-hero-cta-primary-width` | homepage |
| `HeroActions.tsx` | `sm:w-[149px]` | Secondary CTA width | `--homepage-hero-cta-secondary-width` | homepage |
| `HeroRouterStrip.tsx` | `max-w-[980px]` | Router strip rail width | `--homepage-hero-router-width` | homepage |
| `HeroRouterStrip.tsx` | `max-w-[779px]` | Router copy group width | `--homepage-hero-router-copy-width` | homepage |
| `HeroRouterStrip.tsx` | `sm:max-w-[560px]` | Router body width | `--homepage-hero-router-body-width` | homepage |
| `HeroVideo.tsx` | `w-[112%]` | Media overscan width | `--homepage-hero-media-overscan-width` | homepage |
| `HeroVideo.tsx` | `lg:w-[58%]` | Left wash gradient width | `--homepage-hero-media-wash-width-lg` | homepage |

## 10. Heights

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `PrismHero.tsx` | `min-h-[760px]` | Base hero canvas height | `--homepage-hero-min-height-sm` | homepage |
| `PrismHero.tsx` | `lg:min-h-[1046px]` | Large hero canvas height | `--homepage-hero-min-height-lg` | homepage |
| `PrismHero.tsx` | `2xl:min-h-[1293px]` | Figma desktop canvas height | `--homepage-hero-min-height-2xl` | homepage |
| `PrismHero.tsx` | `h-40 md:h-44 lg:h-[140px] 2xl:h-[247px]` | Post-router arc clearance | `--homepage-hero-arc-clearance-*` | homepage |
| `HeroActions.tsx` | `h-[52px]` | CTA height | `--spontaine-control-height-lg` | global |
| `HeroRouterStrip.tsx` | `min-h-11` | Router link touch target | `--spontaine-control-height-md` | global |
| `HeroVideo.tsx` | `h-full` | Media fills hero height | none | local implementation detail |

## 11. Radius

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `rounded-[100px]` | Eyebrow pill shape | `--spontaine-radius-pill` | global |
| `HeroActions.tsx` | `rounded-[8px]` | Approved Figma CTA radius | `--homepage-hero-cta-radius` | homepage |

## 12. Borders

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `border` | Eyebrow border width | `--spontaine-border-width-hairline` | global |
| `HeroActions.tsx` | `border-[1.5px]` | Secondary CTA border width | `--homepage-hero-cta-border-width` | homepage |
| `HeroActions.tsx` | `focus-visible:ring-[3px]` | CTA focus ring width | `--spontaine-focus-ring-width` | global |
| `HeroActions.tsx` | `focus-visible:ring-offset-[3px]` | CTA focus ring offset | `--spontaine-focus-ring-offset` | global |
| `HeroRouterStrip.tsx` | `border-y` | Router top/bottom border width | `--spontaine-border-width-hairline` | global |
| `HeroRouterStrip.tsx` | `focus-visible:ring-[3px]` | Router link focus ring width | `--spontaine-focus-ring-width` | global |
| `HeroRouterStrip.tsx` | `focus-visible:ring-offset-[3px]` | Router link focus ring offset | `--spontaine-focus-ring-offset` | global |

## 13. Shadows

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]` | Eyebrow inner highlight | `--homepage-hero-eyebrow-highlight-shadow` | homepage |

## 14. Blur

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `backdrop-blur-[2px]` | Eyebrow glass effect | `--homepage-glass-blur-sm` | homepage |
| `HeroActions.tsx` | `backdrop-blur-[2px]` | Secondary CTA glass effect | `--homepage-glass-blur-sm` | homepage |
| `HeroRouterStrip.tsx` | `backdrop-blur-[3px]` | Router strip glass effect | `--homepage-glass-blur-md` | homepage |

## 15. Opacity

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroContent.tsx` | `/30` | Eyebrow background alpha | `--homepage-hero-eyebrow-surface-alpha` | homepage |
| `HeroActions.tsx` | `/20` | Secondary CTA background alpha | `--homepage-hero-cta-secondary-alpha` | homepage |
| `HeroRouterStrip.tsx` | `/30` | Router strip background alpha | `--homepage-hero-router-surface-alpha` | homepage |
| `HeroVideo.tsx` | `opacity-100` | Full media opacity | none | local implementation detail |
| `HeroVideo.tsx` | `bg-white/15` | Media veil alpha | `--homepage-hero-media-overlay-alpha` | homepage |
| `HeroVideo.tsx` | `/75`, `/35` | Media wash gradient alpha stops | `--homepage-hero-media-wash-alpha-*` | homepage |

## 16. Motion

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroActions.tsx` | `transition-colors duration-200 ease-out` | CTA hover/focus color transition | `--spontaine-motion-color-duration`, `--spontaine-motion-ease-out` | global |
| `HeroRouterStrip.tsx` | `transition-colors duration-200 ease-out` | Router link hover/focus color transition | `--spontaine-motion-color-duration`, `--spontaine-motion-ease-out` | global |
| `HeroVideo.tsx` | `autoPlay muted loop playsInline` | Decorative background video playback behavior | none | local implementation detail |
| `HeroVideo.tsx` | `motion-safe:block motion-reduce:hidden` | Reduced-motion video policy | none | local implementation detail |

## 17. Positioning

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `PrismHero.tsx` | `relative` | Hero positioning context | none | local implementation detail |
| `HeroContent.tsx` | `relative` | Content layer positioning context | none | local implementation detail |
| `HeroRouterStrip.tsx` | `relative` | Router strip positioning context | none | local implementation detail |
| `HeroVideo.tsx` | `absolute inset-0` | Full-bleed decorative media layer | none | local implementation detail |
| `HeroVideo.tsx` | `left-0 top-0` | Media anchor point | none | local implementation detail |
| `HeroVideo.tsx` | `absolute inset-y-0 left-0` | Left media wash placement | none | local implementation detail |

## 18. Z-Index

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `PrismHero.tsx` | `z-10` | Content layer above media | `--homepage-hero-layer-content` | homepage |
| `HeroContent.tsx` | `z-10` | Content layer above media | `--homepage-hero-layer-content` | homepage |
| `HeroRouterStrip.tsx` | `z-10` | Router strip above media | `--homepage-hero-layer-content` | homepage |

## 19. Transforms

| Source file | Value | Purpose | Candidate token | Classification |
| --- | --- | --- | --- | --- |
| `HeroVideo.tsx` | `-translate-x-[6%]` | Media overscan left offset | `--homepage-hero-media-offset-x` | homepage |

## Local Values To Keep Local

| Source file | Value | Purpose |
| --- | --- | --- |
| `HeroVideo.tsx` | `/imge/home/hero-poster.png` | Current approved hero poster asset |
| `HeroVideo.tsx` | `/imge/home/hero-video2.mp4` | Current approved hero video asset |
| `HeroContent.tsx` | Manual `<br />` line breaks | Approved hero headline composition |
| `HeroVideo.tsx` | `aria-hidden='true'`, `alt=''` | Decorative media semantics |

## Recommendations

- Promote global tokens for shared focus rings, common control heights, reusable font utilities, reusable ink colors, and generic color-transition motion.
- Promote homepage tokens for the hero canvas, art-directed heading scale, rail widths, media overscan, glass blur, router strip geometry, and arc clearance.
- Keep implementation mechanics local: structural flex/absolute positioning classes, media asset paths, decorative media semantics, reduced-motion class policy, and manual headline line breaks.

