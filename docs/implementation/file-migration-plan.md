# File Migration Plan

This is a docs-only file migration plan for the Spontaine redesign. It does not modify code, schemas, routes, component exports, or runtime behavior.

## Sources

- `DESIGN.md`
- `docs/ARCHITECTURE.md`
- `docs/implementation/component-roadmap.md`
- `docs/implementation/design-system-plan.md`

## Effort Definitions

- Small: isolated file addition or targeted docs/config-level change.
- Medium: multiple related files or localized component migration.
- Large: cross-system migration, new component family, or broad replacement.

## Guardrails

- The homepage remains static/custom and must not be converted to PageBuilder.
- PageBuilder data shape, reducer behavior, and multilingual fields remain compatible.
- Legacy/admin files are deprecated before removal.
- Open business and design decisions are documented as blockers or dependencies, not resolved silently.
- File moves should be avoided until imports are stable and compatibility aliases are proven.

## Phase 1: Design Tokens

### Files to create

- Future token file such as `resources/css/spontaine-tokens.css` or `resources/js/lib/design-tokens.ts`, depending on implementation choice.

### Files to modify

- `tailwind.config.js`
- `resources/css/app.css`

### Files to move

- None.

### Files to deprecate

- Legacy public use of 1stop and non-Spontaine token groups in `resources/css/app.css` and `tailwind.config.js`; keep available for admin/editor.

### Effort

Large.

### Blockers

- `spontaine-tokens.json` regeneration is an open `DESIGN.md` dependency.

### Asset dependencies

- None.

### Unresolved design dependencies

- Final token naming convention for code-facing aliases.

## Phase 2: Typography

### Files to create

- Future typography primitive or utility file, for example `resources/js/typography/Text.tsx` or equivalent style utilities.

### Files to modify

- `resources/js/typography/*`
- `resources/css/app.css`
- `tailwind.config.js`
- `resources/js/Modules/PageBuilder/Components/TinyMCE/TinyMce.tsx`
- `resources/js/Modules/PageBuilder/Blocks/RichText/RichTextDisplay.tsx`
- `resources/js/Modules/PageBuilder/Blocks/SpontaineBlocks/RichTextSP.tsx`

### Files to move

- None initially.

### Files to deprecate

- Public Space Grotesk formats.
- Public uppercase/title-case typography defaults except label/eyebrow scale.

### Effort

Large.

### Blockers

- Need compatibility approach for existing rich text content.

### Asset dependencies

- Inter Light font file or explicit decision to defer fine-print font.

### Unresolved design dependencies

- Whether to keep existing typography component names as wrappers or introduce a new single primitive API.

## Phase 3: Shared Primitives

### Files to create

- Primitive files for `Button`, `Badge`/`Eyebrow`, `Chip`, `FilterChip`, `IconButton`, `Card`, `InfoCard`, `CardTriplet`, `StatCallout`, `PullQuote`, `GlassPanel`, `ModalShell`, `ChatInput`, `Stamp`, `SkeletonLine`, and `Logo`.
- Prefer colocating in `resources/js/components/ui` or a new public design-system folder under `resources/js/components`.

### Files to modify

- `resources/js/components/ui/button.tsx`
- `resources/js/components/ui/card.tsx`
- `resources/js/components/ui/input.tsx`
- `resources/js/components/ui/textarea.tsx`
- `resources/js/components/ui/select.tsx`
- `resources/js/components/ui/dialog.tsx`
- `resources/js/components/ui/badge.tsx`
- `resources/js/components/CustomUI/ApplicationLogo*`
- PageBuilder public form/card blocks after adoption.

### Files to move

- None initially; avoid moving shared primitives until imports are stable.

### Files to deprecate

- Public marketing use of Laravel buttons.
- `resources/js/components/CustomUI/Button/*`
- `resources/js/components/CustomUI/Card/*`
- Block-local CTA/card/form styling.

### Effort

Large.

### Blockers

- Token foundation.
- Typography foundation.

### Asset dependencies

- Official logo assets, especially white wordmark for the dark nav pill.

### Unresolved design dependencies

- Exact primitive export surface.
- Compatibility wrapper strategy for legacy public/admin/editor consumers.

## Phase 4: Navigation

### Files to create

- Future `PillNav` and `MegaMenu` files, unless implemented by refactoring existing `Navbar` and `NavMegaMenu` in place.
- Optional mobile sheet abstraction if using `vaul` or a wrapper over Radix Sheet.

### Files to modify

- `resources/js/Layouts/Navbar/Navbar.tsx`
- `resources/js/Layouts/Navbar/NavbarLinks.tsx`
- `resources/js/Layouts/Navbar/NavLinkItem.tsx`
- `resources/js/Layouts/Navbar/NavMegaMenu.tsx`
- `resources/js/Layouts/Navbar/MobileNav/MobileNav.tsx`
- `resources/js/Layouts/Navbar/MobileNav/MobileNavHeader.tsx`
- `resources/js/Layouts/Navbar/MobileNav/MobileNavLinks.tsx`
- `resources/js/components/ui/navigation-menu.tsx`
- `resources/js/components/ui/sheet.tsx`

### Files to move

- None initially.

### Files to deprecate

- `resources/js/Layouts/Navbar/DropdownMenu.tsx` if no active usage remains.
- Public `Book Demo` copy.

### Effort

Large.

### Blockers

- Route/link availability for live-link filtering.
- Confirm mobile bottom sheet dependency choice.

### Asset dependencies

- Official logo asset.
- Founder photo for Company megamenu panel if implemented in this phase.

### Unresolved design dependencies

- `vaul` vs Radix Sheet for mobile bottom sheet.
- Final menu item availability from route ship order.

## Phase 5: Homepage Sections

### Files to create

- Homepage-only section files for `PrismHero`, `RouterStrip`, `LiveDemoBox`, `StackScrolly`, `Alternatives`, `OfferBlock`, `PricingModal`, `TrustBar`, and `FounderClose`.
- Shared layout files for `SectionBand` and `SectionDivider`.
- Optional homepage motion/layout helper files for arc-stack behavior.

### Files to modify

- `resources/js/Layouts/StaticHomePage2.tsx`
- `resources/js/Pages/HomePage.tsx` only if props/composition boundaries change.
- `resources/js/Layouts/Footer/Footer.tsx`
- Existing proof inputs such as `CompanyLogosMarquee` and `SectionTestimonial` only if mining verified content.

### Files to move

- Move or recreate homepage-only concepts out of `resources/js/Modules/PageBuilder/Blocks/HomeBlocks` into a static marketing/homepage area if implementation chooses physical separation.

### Files to deprecate

- `HeroArcInteractive`
- `SectionChat`
- `VideoFeatureCarousel`
- `SectionAlignedAction`
- `SectionBlogsCarousel`
- `SectionCTA`
- Non-current commented sections: `CompanyLogosSection`, `SectionVideos`, `SectionLargeText`, `SectionTalk`.

### Effort

Large.

### Blockers

- Open `DESIGN.md` business decisions for proof price, week number, ISO status, model-training claim, and Newtone consent.

### Asset dependencies

- Prism loop/poster.
- Seven data-sculpture renders.
- Founder photograph.

### Unresolved design dependencies

- Final proof/offer copy and verified claims.
- Final scroll choreography implementation details after motion primitive choice.

## Phase 6: PageBuilder Modernization

### Files to create

- New PageBuilder block renderers/defaults for `ProofStrip`, `RecognitionBand`, `TimelineCase`, non-home `Hero`, redesigned CTA, media carousel, and bento/cards.
- Optional centralized block metadata registry if implementation chooses to reduce duplication across renderer/defaults/picker.

### Files to modify

- `resources/js/Modules/PageBuilder/Components/ResolveComponent.tsx`
- `resources/js/Modules/PageBuilder/Components/AddPageBlock.tsx`
- `resources/js/Modules/PageBuilder/hooks/pageBuilderService.tsx`
- `resources/js/Modules/PageBuilder/hooks/useBlockStyling.tsx`
- Registered block renderers under `resources/js/Modules/PageBuilder/Blocks`
- `resources/js/Modules/PageBuilder/Components/TinyMCE/TinyMce.tsx`
- `resources/js/Modules/PageBuilder/page_interfaces.ts` only for additive interfaces/default typing.

### Files to move

- Do not move stored-page block files until compatibility aliases are proven.
- Later, move static homepage-only `HomeBlocks` out of PageBuilder ownership if no registered PageBuilder dependency remains.

### Files to deprecate

- Old block picker entries only after aliases/migrations are confirmed.
- `SectionArc` usage in favor of shared `SectionDivider`.
- Legacy `Home - ...` naming for new work.

### Effort

Large.

### Blockers

- Backward-compatible block name strategy.
- Existing stored PageBuilder content inventory.

### Asset dependencies

- Only block-specific media defaults; do not invent final proof/security assets.

### Unresolved design dependencies

- Which reusable sections are editor-managed vs homepage-only.
- Final copy/claim policy for trust and proof blocks.

## Conflict-Minimizing Implementation Sequence

1. Create additive token and typography files first; avoid deleting legacy tokens or components.
2. Add shared primitives as additive exports and migrate only one public surface at a time.
3. Refactor navigation after primitives exist, preserving current data flow and route behavior.
4. Add shared layout primitives before replacing homepage composition.
5. Build homepage sections behind the static homepage composition boundary, then swap `StaticHomePage2` composition in one focused change.
6. Modernize PageBuilder last, using compatibility aliases and additive block registrations before hiding old block picker entries.
7. Deprecate and remove only after build, lint, PageBuilder smoke checks, and route/navigation checks pass.

## Verification Checklist

- `docs/implementation/file-migration-plan.md` exists.
- Every roadmap phase has files to create, modify, move, and deprecate.
- Each phase includes effort, blockers, asset dependencies, and unresolved design dependencies.
- Implementation sequence is ordered to reduce merge conflicts and rework.
- The document states no code is modified.
- The document does not invent unresolved business decisions from `DESIGN.md`.

