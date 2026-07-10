# Homepage Gap Analysis

This audit compares the current homepage implementation against the homepage specification in `DESIGN.md`.

## Current Implementation

The homepage route renders:

- `resources/js/Pages/HomePage.tsx`
- `resources/js/Layouts/StaticHomePage2.tsx`

`StaticHomePage2.tsx` composes the current homepage from:

1. `Navbar`
2. `HeroArcInteractive`
3. `SectionChat`
4. `VideoFeatureCarousel`
5. `SectionAlignedAction`
6. `CompanyLogosMarquee`
7. `SectionTestimonial`
8. `SectionBlogsCarousel`
9. `SectionCTA`
10. `Footer`

Although the homepage is a custom static marketing page, most current homepage sections are imported from `resources/js/Modules/PageBuilder/Blocks/HomeBlocks`. These are not registered PageBuilder blocks and should be treated as static homepage components or retired.

## Required DESIGN.md Homepage Anatomy

| # | Required section | Current match | Gap | Reusable code | New code required | Risk |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Hero + router strip | `HeroArcInteractive` partially overlaps hero concept. | Complete replacement or major redesign. Current hero does not match prism loop, copy ladder, router strip merge, CTA wording, or arc-stack behavior. | Navigation shell, CTA button primitive after refactor, some arc learnings. | `PrismHero`, hero media handling, router strip, load choreography, corrected copy. | High |
| 2 | Live demo box | `SectionChat` loosely overlaps demo/chat concept. | Missing required honest latency, artifact stack, governance chips, pause behavior, scene summaries, and demo caption. | Typewriter idea and chat UI fragments may inform primitives. | `LiveDemoBox` scene engine, `ChatInput`, artifact cards, reduced-motion static mode. | High |
| 3 | Proof strip | `CompanyLogosMarquee` and `SectionTestimonial` provide generic proof, not the specified strip. | Missing charcoal proof strip with staggered proof slots and quote. | Logo/proof content patterns after redesign. | Shared `ProofStrip` section/block. | Medium |
| 4 | Recognition band | No direct match. | Missing section. | None significant. | Shared `RecognitionBand` section/block. | Low |
| 5 | Case timeline | No direct match. | Missing timeline rail, stamps, and case narrative. | None significant. | Shared `TimelineCase` section/block. | Medium |
| 6 | Stack build | No direct match. | Missing 7-layer, 3-act scrolly section and data-sculpture renders. | Some GSAP/scroll experience exists, but implementation should follow new motion vocabulary. | Homepage-only `StackScrolly`, assets, reduced-motion fallback. | High |
| 7 | Alternatives | No direct match. | Missing alternatives comparison and ownership contrast. | Existing card primitives only after refactor. | Homepage-only alternatives section, possibly generalized comparison cards later. | Medium |
| 8 | Offer + pricing modal + trust bar | `SectionCTA` partially overlaps CTA. | Current CTA does not match offer structure, pricing modal, trust bar, CTA ladder, or open business decisions. | `CalendarBooking`, modal primitives after refactor. | `OfferBlock`, `PricingModal`, `TrustBar`; placeholders for unresolved price/security decisions. | High |
| 9 | Founder close | No direct match. | Missing founder photograph and closing proof section. | Footer/nav image handling only. | Homepage-only `FounderClose`, image asset dependency. | Medium |
| 10 | Footer | `Footer` exists. | Requires visual/token redesign and founder-close merge behavior. | Existing footer data/rendering and global placement. | Refactor styling and motion; preserve footer data contract. | Medium |

## Current Sections

| Current section | Keep on redesigned homepage? | Recommendation |
| --- | --- | --- |
| `Navbar` | Yes | Refactor to `DESIGN.md` pill nav, copy, Radix behavior, and mobile rules. |
| `HeroArcInteractive` | No | Replace with `PrismHero`; preserve only lessons from arc/media work. |
| `SectionChat` | No, not as-is | Replace with `LiveDemoBox`; extract reusable chat/input/artifact primitives if useful. |
| `VideoFeatureCarousel` | No | Move concept to resources/product/PageBuilder contexts if needed. |
| `SectionAlignedAction` | No | Retire or rework as a generic PageBuilder bento block after primitives exist. |
| `CompanyLogosMarquee` | Not in current position | Recast as proof/recognition support if needed; not a direct homepage anatomy section. |
| `SectionTestimonial` | Not in current form | Mine for proof content only if verified. |
| `SectionBlogsCarousel` | No | Move to resources/blog pages; not part of `DESIGN.md` homepage. |
| `SectionCTA` | No | Replace with `OfferBlock` and CTA ladder. |
| `Footer` | Yes | Refactor, preserve global footer data flow. |

## Missing Sections

- Live demo box
- Proof strip
- Recognition band
- Case timeline
- Stack build
- Alternatives
- Offer with pricing modal and trust bar
- Founder close
- Footer merge behavior with founder close

## Partial Redesign Required

- Navigation: current floating pill is close structurally but copy, behavior, and design-system details conflict with `DESIGN.md`.
- Footer: current footer is shared and useful, but styling, motion, shadows, and token usage need redesign.
- Proof-related content: current logos/testimonials are not the specified proof strip or recognition band, but may provide content inventory.

## Complete Replacement Required

- Hero
- Current chat/demo section
- Current generic feature carousel placement
- Current homepage CTA
- Current homepage story order

## Key Risks

- Asset risk: prism loop, seven data-sculpture renders, and founder photograph are required but may not exist yet.
- Business decision risk: proof price, week number, ISO status, model-training claim, and Newtone consent are open decisions in `DESIGN.md`.
- Motion risk: arc-stack and stack-build choreography require careful performance and reduced-motion implementation.
- Architecture risk: current homepage imports from PageBuilder folders; implementation should preserve PageBuilder while separating homepage-only storytelling.

## Acceptance Criteria For Rebuild Planning

- The homepage remains a custom static marketing page, not a PageBuilder page.
- Reusable proof/timeline/CTA concepts can become PageBuilder blocks only when they are editor-manageable and not homepage-specific.
- No homepage copy should invent unresolved business claims.
- Blog/resource carousel content should not remain in the homepage unless `DESIGN.md` changes.

