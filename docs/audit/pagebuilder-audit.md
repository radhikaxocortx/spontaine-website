# PageBuilder Audit

This audit documents the PageBuilder system as it exists today and recommends how it should absorb the redesign without being replaced. `DESIGN.md` governs user experience; `docs/ARCHITECTURE.md` governs the PageBuilder implementation model.

## Architecture

PageBuilder is a database-driven, multilingual content system. Pages store structured JSON with this shape:

- `PageBlock`: `{ lastUUID, blocks }`
- `Block`: `{ id, position, blockName, ...configuration, ...data }`
- `BlockConfiguration`: optional spacing and width class fields such as `paddingTop`, `paddingBottom`, `mobileWidth`, `desktopWidth`
- `TextData`: `{ english, malayalam }`

Primary implementation points:

- Public rendering: `resources/js/Modules/PageBuilder/Pages/ViewBuilder.tsx`
- Block renderer registry: `resources/js/Modules/PageBuilder/Components/ResolveComponent.tsx`
- Defaults and reducer actions: `resources/js/Modules/PageBuilder/hooks/pageBuilderService.tsx`
- Editor block picker: `resources/js/Modules/PageBuilder/Components/AddPageBlock.tsx`
- Shared editor support: `BlockEditor`, `CTAEditModal`, `TinyMCE`, media upload forms, `Localization`, `InertiaLink`

The architecture is worth preserving. The redesign should update block renderers and shared primitives while keeping block data, multilingual fields, reducer-driven updates, and editor workflows compatible.

## Registered Blocks

| Block name | Renderer | Current role | Recommendation |
| --- | --- | --- | --- |
| `Sample - Left Image` | `LeftImageBlock` | Generic image/text content block. | Requires redesign |
| `Formatted Text` | `RichTextBlock` | Generic rich text content. | Requires redesign |
| `Home - Hero Section` | `SectionHero` | Legacy PageBuilder hero. | Should be replaced |
| `Home - Hero Video Section` | `SectionHeroImageSP` | Legacy alias mapped to image overlay hero. | Should be retired |
| `Spontaine - Hero Image With Overlay` | `SectionHeroImageSP` | Newer image-overlay hero. | Requires redesign |
| `Home - Company Marquee` | `SectionMarquee` | Legacy company/logo marquee. | Should be replaced |
| `Home - Image Cards` | `ImageCards` | Legacy image card grid. | Requires redesign |
| `Home - Video Section` | `SectionVideo` | Legacy video block. | Requires redesign |
| `Home - Testimonial Section` | `SectionTestimonial` | Legacy testimonial block. | Requires redesign |
| `Home - Banner With Image` | `SectionBanner` | Legacy image banner. | Should be replaced |
| `Home - Grid With Video` | `GridWithVideo` | Legacy text/video grid. | Requires redesign |
| `Home - Full Width Image With Title` | `FullWidthImageWithTItle` | Legacy full-bleed image/title block. | Requires redesign |
| `Content Section - FAQ Style Accordion with Links` | `FAQ` | FAQ accordion with links. | Requires redesign |
| `Content Section - Contact Us` | `ContactUS` | Contact form/content section. | Requires redesign |
| `Content Section - Lead Capture` | `LeadCapture` | Lead capture/download form. | Requires redesign |
| `Content Section - DPA Accordion` | `DPAAccordion` | Nested legal/policy accordion. | Reuse as-is for legal pages, restyle carefully |
| `Home - Call To Action` | `SectionCallToAction` | Legacy CTA section. | Should be replaced |
| `Footer` | `Footer` | Shared footer renderer. | Requires redesign |
| `Content Section - Price Plan` | `PricePlanCards` | Pricing card block. | Requires redesign |
| `Spontaine - Banner Section` | `SectionBannerSP` | Newer banner with image/Ken Burns style. | Requires redesign |
| `Spontaine - Clean Banner` | `SectionBannerClean` | Clean centered page banner. | Requires redesign |
| `Spontaine - Dark Banner` | `SectionBannerDark` | Dark page banner. | Requires redesign |
| `Spontaine - Gradient Banner` | `SectionBannerGradient` | Gradient page banner. | Should be replaced |
| `Spontaine - Breadcrumbs` | `SectionBreadcrumbs` | Breadcrumb block. | Requires redesign |
| `Spontaine - Carousel` | `SectionCarousel` | Image carousel. | Requires redesign |
| `Spontaine - Hero Video` | `SectionHeroVideoSP` | Video hero. | Requires redesign |
| `Spontaine - Full Width Video` | `SectionFullWidthVideoSP` | Full-width video section. | Requires redesign |
| `Spontaine - Arc` | `SectionArc` | Animated arc divider. | Should be replaced by shared layout primitive |
| `Spontaine - Rich Text` | `RichTextSP` | Newer rich text block. | Requires redesign |
| `Spontaine - Company Marquee` | `SectionMarqueeSP` | Newer logo marquee. | Requires redesign |
| `Spontaine - Feature Carousel` | `SectionFeatureCarouselSP` | Feature carousel. | Requires redesign |
| `Spontaine - Call To Action` | `SectionCTASP` | Newer CTA block. | Should be replaced |
| `Spontaine - Image Carousel` | `SectionImageCarouselSP` | Image carousel with peeking slide. | Requires redesign |
| `Spontaine - Bento Cards` | `SectionBentoCardsSP` | Bento card grid. | Requires redesign |

## Existing Systems

### Reusable Sections

- Legacy home/content sections: hero, marquee, image cards, video, testimonial, banner, grid with video, full-width image, CTA, FAQ, contact, lead capture, price plan.
- Newer Spontaine sections: banner variants, breadcrumbs, carousel, video, arc, rich text, marquee, feature carousel, CTA, image carousel, bento cards.
- Current homepage sections in `HomeBlocks` are not registered as PageBuilder blocks, even though they live under the PageBuilder module.

Recommendation: separate registered PageBuilder sections from homepage-only static marketing sections. Keep editor-managed sections in PageBuilder; move or retire static homepage-only sections during implementation.

### Layout Primitives

- `BlockConfiguration` supports Tailwind spacing and width classes.
- `useBlockStyling` maps block configuration to rendered styling.
- `SectionArc` and several Spontaine blocks render their own arc/transition treatments.

Recommendation: create shared layout primitives for `SectionBand`, `SectionDivider`, and arc rendering. PageBuilder block renderers should consume these primitives rather than each block drawing arcs or gradients independently.

### Card Systems

- Legacy cards: `ImageCards`, `PricePlanCard`, FAQ cards, resource/blog cards.
- Newer cards: `SectionBentoCardsSP`, feature carousel cards, homepage bento cards.
- Shared card primitives also exist in `resources/js/components/ui/card.tsx` and `resources/js/components/CustomUI/Card/*`.

Recommendation: define one marketing `Card` primitive aligned with `DESIGN.md` radius, border, and shadow rules, then refactor block renderers around it.

### Form Systems

- PageBuilder public forms: `ContactUS`, `LeadCapture`, booking CTAs through `CalendarBooking`.
- Editor forms: `BlockEditor`, `CTAEditModal`, media/file upload forms, TinyMCE.
- App/admin forms: `FormBuilder` and `CustomUI/FormFields`.

Recommendation: keep editor/admin forms operational, but introduce token-aligned public marketing form primitives. Public forms should use the shared focus-ring, pill/button, and input states required by `DESIGN.md`.

### Typography Systems

- `resources/js/typography/*` defines reusable typography components.
- `resources/css/app.css` defines legacy `.hero-*` and `1stop` classes.
- `TinyMCE.tsx` exposes Urbanist and Space Grotesk formats.
- Blocks use local Tailwind classes and font utilities.

Recommendation: replace the fragmented system with `DESIGN.md` text styles. TinyMCE should expose only allowed public text formats for PageBuilder content.

## DESIGN.md Concept Mapping

| DESIGN.md concept | PageBuilder mapping | Notes |
| --- | --- | --- |
| Hero | Shared PageBuilder hero for non-home pages; homepage gets custom `PrismHero`. | Do not force prism media/story choreography into PageBuilder. |
| Router strip | Homepage-only initially. | Could later become a shared link strip if used by solution pages. |
| Live demo box | Homepage-only scene engine. | Small primitives such as `ChatInput`, chips, and artifact cards can be shared. |
| Proof strip | Shared PageBuilder block. | Useful for editor-managed proof points on solution/resource pages. |
| Recognition band | Shared PageBuilder block. | Simple enough to reuse broadly. |
| Case timeline | Shared PageBuilder block. | Use static editor-managed milestones; homepage can compose the same renderer. |
| Stack build | Homepage-only. | Asset-specific scroll choreography and 7-layer narrative should stay custom. |
| Alternatives | Homepage-only initially. | Generalize only if comparison cards are needed elsewhere. |
| Offer block | Homepage-only composition using shared CTA, modal, card, trust primitives. | Avoid making pricing/business open decisions in PageBuilder defaults. |
| Pricing modal | Shared primitive only if pricing pages reuse it. | Business values are open decisions in `DESIGN.md`. |
| Trust bar | Shared PageBuilder block if claims are verified. | Must not invent ISO/security claims. |
| Founder section | Homepage-only by default. | Reuse later for company pages only if the same story is required. |
| Footer | Shared layout/navigation component. | Should remain globally managed. |
| Arc divider / section band | Shared layout primitive. | Used by homepage and PageBuilder renderers. |

## Recommendations

- Preserve PageBuilder data structures and multilingual fields.
- Centralize block metadata so block names, defaults, renderer mapping, and editor descriptions do not diverge.
- Retire `Home - ...` block naming for new work; keep old names as compatibility aliases where existing pages depend on them.
- Redesign newer `Spontaine - ...` blocks around shared primitives rather than adding another generation of one-off blocks.
- Do not make homepage-only storytelling sections PageBuilder blocks unless editors truly need to rearrange or reuse them.
- Add PageBuilder blocks for reusable concepts only: proof strip, recognition band, timeline, CTA, rich text, non-home hero, media carousel, and bento/cards after primitive consolidation.

