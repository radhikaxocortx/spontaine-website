# Component Roadmap

This is a docs-only ordered roadmap for the Spontaine design-system and component migration. It does not modify code, schemas, routes, component exports, or runtime behavior.

## Sources

- `DESIGN.md`
- `docs/implementation/design-system-plan.md`
- `docs/audit/component-migration-map.md`
- `docs/audit/homepage-gap-analysis.md`
- `docs/audit/pagebuilder-audit.md`

## Roadmap Guardrails

- The homepage remains custom-built and must not be converted to PageBuilder.
- PageBuilder data structures, reducer actions, and multilingual content remain compatible.
- Business open decisions from `DESIGN.md` must not be invented or hardcoded.
- Legacy/admin components are not removed until dependent surfaces are migrated.
- New shared primitives should be additive until public, PageBuilder, admin, and editor usages are safely moved.

## Phase 1: Design Tokens

### Components created

- Central Spontaine token layer or CSS token module.
- Token aliases for color, radius, shadow, spacing, border, and motion values.

### Components modified

- `tailwind.config.js`
- `resources/css/app.css`
- Future shared primitives that consume tokens.

### Components removed

- None in this phase.
- Mark legacy token families for later isolation only.

### Risks

- Breaking admin/editor surfaces that still use legacy tokens.
- Hardcoded public values remaining after token foundation.
- Token naming drift from `DESIGN.md`.

### Dependencies

- `DESIGN.md` open decision to regenerate `spontaine-tokens.json`.
- Audit of legacy/admin token usage.
- Agreement that legacy tokens remain temporarily available for non-public surfaces.

## Phase 2: Typography

### Components created

- Public typography utilities/components for `display-2xl`, `display-xl`, `display-lg`, `display-md`, `display-sm`, `body-lg`, `body-md`, `body-sm`, `label`, `mono-data`, and `fine-print`.

### Components modified

- `resources/js/typography/*`
- `resources/css/app.css`
- `tailwind.config.js`
- `resources/js/Modules/PageBuilder/Components/TinyMCE/TinyMce.tsx`
- Rich text renderers.

### Components removed

- Public use of Space Grotesk formats.
- Public uppercase/title-case typography defaults except label/eyebrow scale.

### Risks

- Rich text content may depend on old TinyMCE formats.
- Font loading changes can affect layout and LCP.
- Existing typography components may still be used by admin/customer surfaces.

### Dependencies

- Phase 1 token foundation.
- Inter fine-print font availability or explicit deferral.
- PageBuilder backward compatibility for existing rich text.

## Phase 3: Shared Primitives

### Components created

- `Button`
- `Badge` / `Eyebrow`
- `Chip` / `FilterChip`
- `IconButton`
- `Card`
- `InfoCard`
- `CardTriplet`
- `StatCallout`
- `PullQuote`
- `GlassPanel`
- `Input`, `Textarea`, `Select`
- `ModalShell`
- `ChatInput`
- `Stamp`
- `SkeletonLine`
- `Logo`

### Components modified

- `resources/js/components/ui/button.tsx`
- `resources/js/components/ui/card.tsx`
- `resources/js/components/ui/input.tsx`
- `resources/js/components/ui/textarea.tsx`
- `resources/js/components/ui/select.tsx`
- `resources/js/components/ui/dialog.tsx`
- `resources/js/components/ui/badge.tsx`
- `resources/js/components/CustomUI/ApplicationLogo*`
- PageBuilder public form/card blocks after primitive adoption.

### Components removed

- No immediate hard removals.
- Deprecate duplicate public marketing uses of Laravel buttons, `CustomUI/Button/*`, `CustomUI/Card/*`, and block-local CTA/card/form implementations.

### Risks

- Too-broad primitive migration could destabilize admin/editor UI.
- Focus, touch target, and contrast regressions.
- Duplicate primitives may remain during migration.

### Dependencies

- Phases 1 and 2.
- Official logo asset availability.
- Public/admin/editor ownership boundaries.

## Phase 4: Navigation

### Components created

- `PillNav`
- `MegaMenu`
- Mobile navigation overlay/sheet behavior.

### Components modified

- `resources/js/Layouts/Navbar/Navbar.tsx`
- `NavbarLinks.tsx`
- `NavLinkItem.tsx`
- `NavMegaMenu.tsx`
- `MobileNav.tsx`
- `MobileNavHeader.tsx`
- `MobileNavLinks.tsx`
- `resources/js/components/ui/navigation-menu.tsx`
- `resources/js/components/ui/sheet.tsx`

### Components removed

- Retire `DropdownMenuComponent` if no longer used.
- Remove public `Book Demo` navigation copy.
- Remove rendered dead nav items with no live href.

### Risks

- Breaking existing CMS-managed navigation data flow.
- Keyboard/focus regressions in menus.
- Mobile bottom sheet dependency uncertainty.

### Dependencies

- Shared primitives from Phase 3.
- Existing navigation data through Inertia/NavEditor flows.
- Decision to use `vaul` or existing Radix Sheet for the mobile bottom sheet.
- Route/link availability for live-link filtering.

## Phase 5: Homepage Sections

### Components created

- `SectionBand`
- `SectionDivider`
- `PrismHero`
- `RouterStrip`
- `LiveDemoBox`
- `StackScrolly`
- `Alternatives`
- `OfferBlock`
- `PricingModal`
- `TrustBar`
- `FounderClose`

### Components modified

- `resources/js/Layouts/StaticHomePage2.tsx`
- `resources/js/Pages/HomePage.tsx` only if props or composition boundaries need adjustment.
- `resources/js/Layouts/Footer/Footer.tsx`
- Existing proof-related inputs such as `CompanyLogosMarquee` and `SectionTestimonial` only if mining reusable content.

### Components removed

- Remove from redesigned homepage composition:
  - `HeroArcInteractive`
  - `SectionChat`
  - `VideoFeatureCarousel`
  - `SectionAlignedAction`
  - `SectionBlogsCarousel`
  - `SectionCTA`
- Treat commented-out `CompanyLogosSection`, `SectionVideos`, `SectionLargeText`, and `SectionTalk` as retired/non-current unless separately reused.

### Risks

- Missing prism loop, seven sculpture renders, or founder photograph.
- Scroll performance and reduced-motion complexity.
- Business decision blockers for proof price, week number, ISO status, model-training claim, and Newtone proof consent.
- Accidentally forcing homepage-only storytelling into PageBuilder.

### Dependencies

- Phases 1-4.
- Homepage assets.
- Resolved or placeholder-safe handling for `DESIGN.md` open business decisions.
- Arc-stack layout and motion helpers.

## Phase 6: PageBuilder Modernization

### Components created

- Shared PageBuilder `ProofStrip`
- `RecognitionBand`
- `TimelineCase`
- Non-home `Hero`
- Redesigned CTA block
- Redesigned rich text block formats
- Media carousel block
- Bento/cards block after primitive consolidation

### Components modified

- `ResolveComponent.tsx`
- `AddPageBlock.tsx`
- `pageBuilderService.tsx`
- `useBlockStyling.tsx`
- Registered block renderers including legacy `Home - ...`, `Content Section - ...`, and newer `Spontaine - ...` blocks.
- `TinyMCE.tsx`

### Components removed

- Do not delete stored-page block names immediately.
- Retire or hide old block picker entries only after compatibility aliases and migrations are confirmed.
- Replace `SectionArc` usage with shared `SectionDivider`.

### Risks

- Breaking existing stored PageBuilder pages.
- Losing multilingual fields or reducer-driven update behavior.
- Duplicating another generation of one-off blocks instead of reusing primitives.

### Dependencies

- Phases 1-3 and layout primitives from Phase 5.
- Existing PageBuilder data shape compatibility.
- Backward-compatible block name strategy.
- Editor UX review for block picker/default content.

## Verification Checklist

- `docs/implementation/component-roadmap.md` exists.
- The roadmap contains exactly six phases with the requested names.
- Each phase includes Components created, Components modified, Components removed, Risks, and Dependencies.
- The document states it is docs-only and does not modify code.
- No phase invents unresolved business decisions from `DESIGN.md`.
- PageBuilder compatibility guardrails are explicit.

