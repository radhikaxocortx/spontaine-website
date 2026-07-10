# Component Migration Map

This document maps every currently rendered homepage component in `resources/js/Layouts/StaticHomePage2.tsx` to its redesign migration path. It is a docs-only audit artifact and does not modify application code.

## Sources

- `DESIGN.md`
- `docs/audit/component-inventory.md`
- `docs/audit/homepage-gap-analysis.md`
- `docs/audit/redesign-strategy.md`
- Current homepage composition in `resources/js/Layouts/StaticHomePage2.tsx`

## Decision Definitions

- Reuse unchanged: keep as-is for the redesign.
- Refactor: keep the concept or component, but update styling, behavior, tokens, copy, or ownership.
- Replace: remove the current implementation from the redesigned homepage and build or use the target `DESIGN.md` component.
- Remove: no redesigned homepage equivalent; move to another context only if needed.

## Effort Definitions

- Small: mostly copy, token, import, or styling cleanup.
- Medium: meaningful component refactor or extraction, but limited new interaction model.
- Large: new section/component architecture, motion, assets, or complex behavior.

## Migration Table

| Current component | Current location | Decision | Target from `DESIGN.md` | Effort | Notes |
| --- | --- | --- | --- | --- | --- |
| `StaticHomePage2` | `resources/js/Layouts/StaticHomePage2.tsx` | Replace | Homepage composition using `SectionBand`, arc-stack sequence, and the `DESIGN.md` homepage sections | Large | Keep the custom homepage route, but replace the current section order and injected scroll/cookie styling patterns. |
| `Navbar` | `resources/js/Layouts/Navbar/Navbar.tsx` | Refactor | `PillNav` + `MegaMenu` | Medium | Preserve navigation data flow; fix `Book Demo`, behavior, motion, Radix alignment, and mobile overlay/sheet rules. |
| `MetaTags` | `resources/js/components/MetaTags.tsx` | Reuse unchanged | SEO metadata support; no visual `DESIGN.md` target | Small | Keep as infrastructure; update homepage metadata separately when copy is finalized. |
| `HeroArcInteractive` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/HeroArcInteractive.tsx` | Replace | `PrismHero` + `RouterStrip` | Large | Current hero does not match prism media, CTA ladder, copy, router strip merge, or arc-stack role. |
| `SectionChat` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionChat.tsx` | Replace | `LiveDemoBox` | Large | Extract ideas only if useful for `ChatInput`, chips, or artifact primitives. |
| `VideoFeatureCarousel` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/VideoFeatureCarousel.tsx` | Remove | None on homepage; possible future PageBuilder `MediaCarousel` | Medium | Not part of `DESIGN.md` homepage anatomy. |
| `SectionAlignedAction` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionAlignedAction.tsx` | Replace | `Alternatives` or future shared `Bento/cards` block, depending on content | Medium | Current bento/action concept does not map cleanly to the required homepage story. |
| `CompanyLogosMarquee` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/CompanyLogosMarquee.tsx` | Refactor | `ProofStrip` or `RecognitionBand` | Medium | Reuse only as proof/recognition input; current marquee is not the target section. |
| `SectionTestimonial` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionTestimonial.tsx` | Refactor | `ProofStrip` | Medium | Mine verified proof/quote content only; no count-up or generic testimonial treatment. |
| `SectionBlogsCarousel` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionBlogsCarousel.tsx` | Remove | None on homepage; resources/blog page component | Small | Move out of homepage scope. |
| `SectionCTA` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionCTA.tsx` | Replace | `OfferBlock` + `PricingModal` + `TrustBar` | Large | Current CTA does not match offer, trust, modal, or CTA ladder. |
| `Footer` | `resources/js/Layouts/Footer/Footer.tsx` | Refactor | `Footer` | Medium | Preserve global footer data flow; redesign visual styling and founder-close merge behavior. |

## Missing Target Components

These required `DESIGN.md` sections have no direct currently rendered homepage component.

| Target component | Recommended ownership | Effort | Notes |
| --- | --- | --- | --- |
| `RecognitionBand` | New shared PageBuilder block | Medium | Simple reusable recognition/trust band that can be editor-managed. |
| `TimelineCase` | New shared PageBuilder block | Medium | Editor-managed milestone timeline for homepage and future solution/case pages. |
| `StackScrolly` | New homepage-only component | Large | Requires seven data-sculpture renders, scroll choreography, and reduced-motion fallback. |
| `FounderClose` | New homepage-only component | Medium | Depends on founder photograph and homepage-specific closing story. |
| `SectionBand` / `SectionDivider` | New shared layout components | Medium | Needed by both homepage and redesigned PageBuilder blocks for surface, arc, and stack-role behavior. |

## Notes And Guardrails

- The homepage remains custom-built and must not be converted to PageBuilder.
- PageBuilder-compatible targets are only for reusable, editor-managed sections: `ProofStrip`, `RecognitionBand`, `TimelineCase`, non-home hero, CTA, media carousel, and bento/cards.
- Homepage-specific storytelling components such as `PrismHero`, `LiveDemoBox`, `StackScrolly`, `OfferBlock`, and `FounderClose` should remain homepage-only unless a future requirement proves broader reuse.
- Do not introduce business decisions while migrating components. Open dependencies from `DESIGN.md` include the prism loop, seven data-sculpture renders, founder photograph, proof price, week number, ISO status, model-training claim, and Newtone proof consent.
- Commented-out components in `StaticHomePage2.tsx`, including `CompanyLogosSection`, `SectionVideos`, `SectionLargeText`, and `SectionTalk`, are not current rendered homepage components. Treat them as retired or non-current references, not as migration targets.
- This document is an audit map only. It does not authorize code changes by itself.

## Verification Checklist

- Every rendered component in `StaticHomePage2.tsx` appears in the migration table.
- Every `Replace` row names a `DESIGN.md` target component or explicitly states no homepage target.
- Effort values use only Small, Medium, or Large.
- The document preserves the custom homepage and PageBuilder architecture boundary.
- The document does not invent unresolved business values.

