# Prism Hero Gap Analysis

This is a docs-only review of the implemented `PrismHero` against the Figma desktop hero design. No code, routes, schemas, PageBuilder data structures, component exports, or runtime behavior were modified for this analysis.

## Sources

- `DESIGN.md`
- `docs/ARCHITECTURE.md`
- Figma file `rwQ35TVkX5cOb0C0UibF7m`, node `29:701`
- `resources/js/HomePage/Hero/*`
- `resources/js/Layouts/StaticHomePage2.tsx`

## Figma Measurements

Exact metadata gathered from Figma MCP:

| Figma node | Measurement |
| --- | --- |
| Hero frame `29:703` | `x=0`, `y=0`, `1920 x 1293.41` |
| Background media `29:704` | `x=0`, `y=0`, `1920 x 1293.41` |
| Content wrapper `32:275` | `x=0`, `y=0`, `1920 x 1200.41` |
| Left content `32:276` | `x=478`, `y=140`, `900 x 656` |
| Eyebrow pill `36:501` | `x=9`, `y=0`, `637 x 28` |
| Eyebrow text `32:277` | `x=16`, `y=6`, `605 x 16` |
| Heading block `32:278` | `x=9`, `y=60`, `882 x 264` |
| Heading text `32:279` | `x=0`, `y=0`, `882 x 264` |
| Hero body `32:280` | `x=9`, `y=356`, `882 x 112` |
| Italic subline `32:281` | `x=9`, `y=500`, `882 x 22` |
| CTA group `32:282` | `x=9`, `y=554`, `394 x 52` |
| Primary CTA `32:283` | `x=0`, `y=0`, `229 x 52` |
| Secondary CTA `32:285` | `x=245`, `y=0`, `149 x 52` |
| Footnote `32:287` | `x=9`, `y=638`, `311 x 18` |
| Bottom bar `32:289` | `x=0`, `y=954`, `1920 x 92` |
| Bottom bar content `32:290` | `x=478`, `y=24`, `779 x 44` |
| Bottom bar link `32:293` | `x=1273`, `y=35`, `185 x 22` |

## 1. Layout

| Area | Analysis |
| --- | --- |
| Current implementation | `PrismHero` renders a `min-h-screen` section with a centered `max-w-7xl` content container and desktop padding `lg:px-12 xl:px-16`. On a `1920px` viewport, `max-w-7xl` is `1280px`, which places the container around `x=320`; with `xl:px-16`, content starts around `x=384`. |
| Figma implementation | The hero frame is `1920 x 1293.41`. The left content frame starts at `x=478`, `y=140` and measures `900 x 656`. The bottom router bar sits at `y=954` within the hero, not at the final bottom edge. |
| Gap | The current hero starts desktop content roughly `94px` left of Figma on a `1920px` viewport and uses viewport-height behavior instead of the taller Figma canvas. The router strip is placed by flex layout at the bottom of the section, while Figma positions it at `y=954`, leaving additional hero/media area below. |
| Recommended change | Move the desktop content offset closer to Figma’s `x=478` within the homepage hero only. If the tall Figma canvas is the target, reserve more vertical hero space while preserving responsive behavior. Position the router strip as a merged lower band at the Figma rhythm rather than simply the flex bottom edge. |

## 2. Typography Hierarchy

| Area | Analysis |
| --- | --- |
| Current implementation | `HeroContent` uses PR-03 typography primitives: `Label`, `Display size="2xl"`, `Body size="lg"`, `Body size="sm"`, and `FinePrint`. `display-2xl` currently maxes at `64px` from the token foundation. The emphasis word `biggest` correctly uses `accent/ink`. |
| Figma implementation | Figma code context shows the heading at `80px` with `88px` line height. The heading text node is `882 x 264`. The body is `18px` with `28px` line height, and the italic subline is `15px` with `22px` line height. |
| Gap | The current typography follows `DESIGN.md` and PR-03 tokens, but it is smaller than the inspected Figma hero. This is a deliberate design-system conflict: Figma uses a hero-specific display scale larger than `display-2xl`. |
| Recommended change | Do not hardcode an `80px` hero heading. Decide whether the Figma hero requires a tokenized hero-specific display variant or whether the PR-03 `display-2xl` scale remains authoritative. Keep green text on `accent/ink`, not mint. |

## 3. Content Width

| Area | Analysis |
| --- | --- |
| Current implementation | The main content wrapper uses `max-w-[var(--spontaine-measure-copy)]`, which is `680px`. The body copy also uses that same measure. |
| Figma implementation | The left content frame is `900px` wide. The heading block, hero body, and italic subline are each `882px` wide. |
| Gap | The current implementation constrains the whole content stack to the paragraph measure. This is readable and aligns with `DESIGN.md`, but it makes the heading and CTA composition narrower than Figma. |
| Recommended change | Separate the hero content frame width from the paragraph measure. Allow the heading and CTA group to occupy a wider frame near Figma’s `882px`, while keeping long body copy constrained for readability. |

## 4. Image Positioning

| Area | Analysis |
| --- | --- |
| Current implementation | `HeroVideo` uses a full-bleed image and video with `object-cover object-center`, plus a cream overlay and left-to-right cream gradient. Media uses local temporary assets: `/imge/home/hero-video2.mp4` and `/imge/home/hero-poster.png`. |
| Figma implementation | Background media node `29:704` fills the full hero frame at `1920 x 1293.41`. Figma-generated code context indicates the image is overscanned with `left=-5.99%` and `width=111.98%`. |
| Gap | Current media is centered cover; Figma’s prism placement is intentionally overscanned and shifted. The current local media is also a temporary substitute for the final LCP-critical prism loop/poster. |
| Recommended change | After the final prism asset is available, match Figma’s overscan and horizontal offset with explicit media positioning. Use object-position or local wrapper transform classes rather than generic centered cover. Keep media decorative for accessibility. |

## 5. CTA Hierarchy

| Area | Analysis |
| --- | --- |
| Current implementation | `HeroActions` renders a primary mint pill CTA linking to `/proof#book` and a secondary outlined/paper CTA linking to `/architecture`. Copy follows `DESIGN.md`: `See it on your own numbers` and `Read the architecture brief`. |
| Figma implementation | CTA group `32:282` is `394 x 52` with a `16px` gap. Primary CTA is `229 x 52`; secondary CTA is `149 x 52`. Figma’s generated button radius is `8px` and copy is off-spec: `See it at your Company →` and `Play the video`. |
| Gap | Current copy and pill shape intentionally diverge from Figma because `DESIGN.md` supersedes Figma for CTA ladder and shape rules. Current CTA height is `min-h-11` (`44px`), while Figma CTA height is `52px`. |
| Recommended change | Preserve `DESIGN.md` copy and pill shape. Tune local CTA sizing to the Figma row rhythm by moving closer to `52px` height and maintaining the `16px` desktop gap. Do not restore the off-spec Figma copy. |

## 6. Vertical Rhythm

| Area | Analysis |
| --- | --- |
| Current implementation | Desktop content uses `lg:pt-48`, which is `192px`. Stack gap is `gap-6`, or `24px`. Router strip is placed after the flex content at the section bottom. |
| Figma implementation | Left content starts at `y=140`. Heading block starts at `y=60` inside the content frame. Body starts at `y=356`, subline at `y=500`, CTA group at `y=554`, and footnote at `y=638`. Bottom bar starts at `y=954`. |
| Gap | The current desktop hero content begins `52px` lower than the Figma content start. Current vertical gaps are generalized by flex spacing, while Figma uses specific offsets: eyebrow to heading `32px`, heading to body `32px`, body to italic subline `32px`, subline to CTA `32px`, and CTA to footnote `32px`. |
| Recommended change | Align desktop content start closer to `140px` and tune internal hero gaps toward the repeated `32px` Figma rhythm where it does not conflict with responsive constraints. Place the router strip according to hero rhythm rather than only flex distribution. |

## 7. Responsive Behavior

| Area | Analysis |
| --- | --- |
| Current implementation | The hero includes responsive padding, stacked CTAs on mobile, one-row CTAs from `sm`, and a stacked router strip that becomes horizontal at `lg`. Media remains full bleed across breakpoints. |
| Figma implementation | The inspected Figma node provides desktop measurements only. No mobile or tablet node metadata was supplied for exact responsive positions or dimensions. |
| Gap | Current mobile and tablet behavior is implementation-driven rather than Figma-verified. This is acceptable as a first pass, but it cannot be claimed as exact Figma parity without additional nodes. |
| Recommended change | Keep the current responsive behavior as the baseline until mobile/tablet Figma frames are supplied. When available, repeat this MCP measurement process for those nodes and tune breakpoints with exact values. |

## Overall Recommendations

- Treat the current `PrismHero` as structurally correct but not yet Figma-accurate in desktop positioning, content width, media overscan, CTA height, and vertical rhythm.
- Preserve `DESIGN.md` decisions where Figma conflicts: CTA copy, pill shape, `your own cloud`, text-safe green, and no PageBuilder implementation.
- Resolve the typography scale conflict before changing heading size: Figma uses `80px / 88px`, while PR-03 `display-2xl` maxes at `64px`.
- Wait for the final prism loop/poster before investing heavily in exact media positioning.

## Verification Notes

- This file is documentation only.
- No code was modified for this gap analysis.
- Exact Figma measurements are included only where MCP metadata returned them.
- Mobile and tablet recommendations are limited because the supplied Figma node appears desktop-focused.
