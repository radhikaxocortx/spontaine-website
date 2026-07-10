# Redesign Strategy

This strategy preserves the current two-system architecture: custom static marketing pages for core conversion experiences and PageBuilder for CMS-managed pages. The goal is to implement the `DESIGN.md` system once, then let both systems consume it appropriately.

## Classification Model

Every new design element should be classified before implementation:

1. Shared design-system primitive
2. Shared PageBuilder block
3. Homepage-only component
4. Shared layout component
5. Navigation component

This prevents homepage-specific storytelling from being forced into PageBuilder while still maximizing reuse.

## Element Classification

| Element | Classification | Rationale |
| --- | --- | --- |
| `Button` | Shared design-system primitive | Used across homepage, PageBuilder, forms, nav, and CTAs. |
| `Badge` / `Eyebrow` | Shared design-system primitive | Needed for labels, proof points, and section headers. |
| `Chip` / `FilterChip` | Shared design-system primitive | Needed for governance chips, filters, and small status UI. |
| `IconButton` | Shared design-system primitive | Needed for carousel, modal, and mobile controls. |
| `Card` | Shared design-system primitive | Foundation for repeated items and PageBuilder cards. |
| `Input`, `Textarea`, `Select` | Shared design-system primitive | Needed for public lead/contact forms and modal forms. |
| `Stamp` | Shared design-system primitive | Mono data/time marker for timeline and demo artifacts. |
| `SkeletonLine` | Shared design-system primitive | Loading state for demo/resource surfaces. |
| `Logo` | Shared design-system primitive | Must use official assets and avoid redrawing the mark. |
| `GlassPanel` | Shared design-system primitive | Only approved glass implementation for scrolly cards, modal, and Windfall ticket. |
| `ModalShell` | Shared design-system primitive | Radix Dialog wrapper with approved motion. |
| `ChatInput` | Shared design-system primitive | Used by live demo and possibly future product demos. |
| `SectionBand` | Shared layout component | Encapsulates surface, arc, stack role, and section padding. |
| `SectionDivider` / arc | Shared layout component | Brand structural motif used by homepage and PageBuilder. |
| Content width wrappers | Shared layout component | Keeps measure and responsive spacing consistent. |
| Stack motion helpers | Shared layout component | Enables homepage arc-stack without duplicating scroll code. |
| `PillNav` | Navigation component | Shared public navigation shell. |
| `MegaMenu` | Navigation component | Shared menu behavior on existing nav data. |
| Mobile nav overlay/sheet | Navigation component | Shared responsive navigation behavior. |
| `PrismHero` | Homepage-only component | LCP-critical media and homepage-specific conversion copy. |
| `RouterStrip` | Homepage-only component initially | Tied to homepage routing story; can generalize later. |
| `LiveDemoBox` | Homepage-only component | Scene engine and proof mechanism are homepage-specific. |
| `StackScrolly` | Homepage-only component | Seven-layer, three-act narrative with bespoke assets. |
| `OfferBlock` | Homepage-only component | Depends on homepage CTA ladder and open business decisions. |
| `FounderClose` | Homepage-only component initially | Bookend proof section tied to homepage story. |
| `ProofStrip` | Shared PageBuilder block | Editor-manageable proof points can recur across pages. |
| `RecognitionBand` | Shared PageBuilder block | Simple reusable trust/recognition section. |
| `TimelineCase` | Shared PageBuilder block | Editor-managed milestones suit solution/case pages. |
| Non-home `Hero` | Shared PageBuilder block | Useful for PageBuilder pages without homepage prism choreography. |
| CTA section | Shared PageBuilder block | Needed across editor-managed pages. |
| Rich text | Shared PageBuilder block | Core CMS need. |
| Media carousel | Shared PageBuilder block | Reusable for resources/company pages after redesign. |
| Bento/cards | Shared PageBuilder block | Reusable only after card primitive consolidation. |

## Homepage Section Recommendations

| DESIGN.md homepage section | Recommended implementation | Reuse boundary |
| --- | --- | --- |
| Hero + router strip | Homepage-only | Use shared nav, button, typography, section, and logo primitives. |
| Live demo box | Homepage-only | Share `ChatInput`, chips, artifact card, and stamp primitives. |
| Proof strip | Shared PageBuilder block | Homepage can consume the same renderer if proof content is editor-managed. |
| Recognition band | Shared PageBuilder block | General trust section for multiple pages. |
| Case timeline | Shared PageBuilder block | General milestone/timeline section. |
| Stack build | Homepage-only | Scroll choreography and sculpture assets are too specific for PageBuilder. |
| Alternatives | Homepage-only initially | Generalize later only if comparison cards are needed elsewhere. |
| Offer + pricing modal + trust bar | Homepage-only composition | Use shared CTA, modal, glass/card, and form primitives. |
| Founder close | Homepage-only initially | Promote to shared/company component only if reused. |
| Footer | Shared layout/navigation component | Keep global footer data/rendering path. |

## Migration Strategy

### Phase 1: Audit stabilization

- Land the five audit documents under `docs/audit`.
- Treat current PageBuilder and homepage sections as factual inventory.
- Do not modify runtime code during this phase.

### Phase 2: Token foundation

- Align Tailwind and CSS variables to `DESIGN.md`: color, typography, radius, shadow, spacing, and motion vocabulary.
- Preserve legacy/admin palettes during transition, but isolate them from public marketing components.
- Document unresolved token gaps instead of inventing values.

### Phase 3: Shared primitives

- Build or refactor public primitives: `Button`, `Badge`/`Eyebrow`, `Chip`, `Card`, forms, `Logo`, `GlassPanel`, `ModalShell`, `ChatInput`, `Stamp`, and `SkeletonLine`.
- Normalize focus rings, touch targets, radii, shadows, and text casing.
- Keep admin/editor components working while public components move to the new system.

### Phase 4: Shared layout and navigation

- Introduce `SectionBand` and arc divider primitives.
- Implement arc-stack behavior for the homepage through shared layout helpers, with reduced-motion and mobile guards.
- Refactor navigation to preserve existing data flows while matching the `DESIGN.md` pill nav, CTA copy, megamenu, and mobile behaviors.

### Phase 5: PageBuilder redesign

- Refactor registered block renderers around shared primitives.
- Add only reusable editor-managed blocks: proof strip, recognition band, timeline, CTA, non-home hero, rich text, media carousel, and bento/cards.
- Keep legacy block names as compatibility aliases where existing stored pages require them.
- Do not change the `PageBlock`, `Block`, multilingual `TextData`, or reducer data contracts.

### Phase 6: Homepage rebuild

- Replace `StaticHomePage2` composition with the `DESIGN.md` homepage sequence.
- Keep the homepage custom-routed through `HomePage.tsx`; do not serve it through PageBuilder.
- Build homepage-only sections for `PrismHero`, `LiveDemoBox`, `StackScrolly`, `OfferBlock`, and `FounderClose`.
- Use shared PageBuilder-compatible sections only where natural: proof strip, recognition band, and timeline.

### Phase 7: Validation

- Run `npm run build` and `php artisan test`.
- Verify responsive behavior, keyboard navigation, focus visibility, contrast, reduced motion, and scroll performance.
- Verify no open business decision is silently hardcoded.

## Implementation Guardrails

- Do not replace PageBuilder.
- Do not bypass navigation management flows.
- Do not hardcode public colors, spacing systems, typography scales, or motion values inside components.
- Do not add homepage-specific sections to PageBuilder unless they are genuinely reusable and editor-manageable.
- Do not invent values for the open decisions in `DESIGN.md`.
- Keep multilingual content structures intact.
- Prefer extending existing components and data contracts over introducing parallel systems.

## Risk Register

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Missing prism, sculpture, or founder assets | Blocks homepage completion | Use documented placeholders only until assets exist; do not invent final imagery. |
| Open business decisions | Blocks final offer/proof/security copy | Keep configurable placeholders and call out dependencies. |
| PageBuilder compatibility | Could break stored pages | Preserve block names, data shapes, and reducer actions. |
| Motion performance | Could create scroll jank | Limit live transforms, centralize motion, and test under reduced motion and mobile. |
| Token migration breadth | Could destabilize admin/editor UI | Isolate public marketing primitives before migrating admin surfaces. |

