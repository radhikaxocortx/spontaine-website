# Design System Implementation Plan

This document is a docs-only implementation plan for the Spontaine design system. It does not modify code, schemas, routes, component exports, or runtime behavior.

## Sources

- `DESIGN.md`
- `docs/audit/component-inventory.md`
- `docs/audit/design-system-audit.md`
- `docs/audit/redesign-strategy.md`

## Migration Difficulty

- Small: isolated token/style cleanup or documentation-only follow-through.
- Medium: refactor across shared components or PageBuilder renderers.
- Large: cross-system redesign, new primitive layer, motion architecture, or navigation behavior.

## 1. Tokens

| Item | Existing implementation | Target implementation | Files affected | Migration difficulty | Dependencies |
| --- | --- | --- | --- | --- | --- |
| Design token source | Tokens are split across `tailwind.config.js`, `resources/css/app.css`, and hardcoded component values. | One Spontaine token layer matching `DESIGN.md` for color, type, radius, shadow, spacing, and motion. | `tailwind.config.js`, `resources/css/app.css`, future token module or CSS layer. | Large | `DESIGN.md` open decision to regenerate `spontaine-tokens.json`. |
| Legacy token isolation | 1stop, primary/secondary/tertiary, beige, graige, black, and alert palettes coexist with public tokens. | Preserve legacy/admin tokens, but keep them out of public marketing primitives. | `tailwind.config.js`, `resources/css/app.css`, admin/editor components. | Medium | Audit of admin/editor surfaces using legacy classes. |
| Shape, shadow, spacing tokens | Mixed `rounded-*`, `shadow-*`, arbitrary spacing, and PageBuilder spacing classes. | Named values for pill, card 24px, small control 12px, section padding 128/64, arc 64/32, hairline border, and soft floating shadow. | `tailwind.config.js`, `resources/css/app.css`, shared primitive files. | Medium | Primitive migration order. |

## 2. Typography

| Item | Existing implementation | Target implementation | Files affected | Migration difficulty | Dependencies |
| --- | --- | --- | --- | --- | --- |
| Font families | Urbanist, Roboto Mono, Space Grotesk, Font Awesome, and Figtree/Poppins/Lato legacy fonts coexist. | Urbanist for public UI, Roboto Mono for data, Inter Light for fine print; no Space Grotesk or serif in public marketing. | `resources/css/app.css`, `tailwind.config.js`, `resources/js/typography/*`, `resources/js/Modules/PageBuilder/Components/TinyMCE/TinyMce.tsx`. | Medium | Inter asset availability or explicit placeholder decision. |
| Type scale components/utilities | Typography is fragmented across typography components, CSS classes, TinyMCE formats, and local Tailwind classes. | `display-2xl`, `display-xl`, `display-lg`, `display-md`, `display-sm`, `body-lg`, `body-md`, `body-sm`, `label`, `mono-data`, and `fine-print`. | `resources/js/typography/*`, `resources/css/app.css`, Tailwind theme. | Large | Token foundation. |
| Rich text editor formats | TinyMCE exposes Space Grotesk body formats. | PageBuilder rich text exposes only approved public text styles. | `resources/js/Modules/PageBuilder/Components/TinyMCE/TinyMce.tsx`, rich text renderers. | Medium | PageBuilder backward compatibility. |

## 3. Colors

| Item | Existing implementation | Target implementation | Files affected | Migration difficulty | Dependencies |
| --- | --- | --- | --- | --- | --- |
| Core palette | Partial `spontaine` palette exists alongside many legacy palettes. | `accent/mint`, `accent/lime`, `accent/ink`, `accent/periwinkle`, `ink/900`, `ink/700`, `paper`, `gray/50`, `gray/100`, `cream`, and `border/hairline`. | `tailwind.config.js`, `resources/css/app.css`. | Medium | Token source alignment. |
| Color usage rules | Mint/lime and hardcoded greens are used as text, gradients, and CTA fills inconsistently. | Mint/lime as fills only, `accent/ink` for green text, lime reserved for nav CTA, white on charcoal. | Public components, PageBuilder blocks, navigation, footer. | Large | Contrast checks and primitive migration. |
| Hardcoded public colors | Hardcoded hex/rgba appears in homepage, CTA, bento, banner, section arc, calendar booking, footer/logo fills. | Hardcoded values only in central token definitions. | `resources/js/Layouts/StaticHomePage2.tsx`, `resources/js/components/CalendarBooking/CalendarBooking.tsx`, `SectionChat.tsx`, `SectionCTA.tsx`, `SectionCTASP.tsx`, `SectionBentoCardsSP.tsx`, `SectionBannerGradient.tsx`, `SectionArc.tsx`, `resources/js/Layouts/Footer/Footer.tsx`. | Large | Shared primitives and layout primitives. |

## 4. Motion

| Item | Existing implementation | Target implementation | Files affected | Migration difficulty | Dependencies |
| --- | --- | --- | --- | --- | --- |
| Motion vocabulary | GSAP, Framer Motion, Tailwind animations, injected CSS, and custom keyframes coexist. | Shared `settle`, `stack`, `scrub`, `chip-pop`, and `crossfade` vocabulary. | New/future motion utility module, `resources/css/app.css`, homepage/PageBuilder blocks. | Large | Library decision to use existing `framer-motion` or migrate to motion.dev package naming. |
| Reduced motion | `prefers-reduced-motion` handling is scattered. | Central reduced-motion behavior: 200ms opacity fade, disabled arc-stack/scrolly, static demo mode. | Motion utilities, `SectionBand`, homepage sections, PageBuilder blocks. | Large | Layout primitive design. |
| Scroll behavior | `StaticHomePage2.tsx` injects smooth-scroll CSS and overrides keyboard paging; GSAP ScrollTrigger appears across blocks. | Homepage scroll choreography isolated to static homepage layout helpers; PageBuilder uses restrained reveal behavior. | `resources/js/Layouts/StaticHomePage2.tsx`, `resources/js/Layouts/AppLayout.tsx`, homepage blocks, PageBuilder blocks. | Large | Arc-stack implementation plan. |

## 5. Primitives

| Item | Existing implementation | Target implementation | Files affected | Migration difficulty | Dependencies |
| --- | --- | --- | --- | --- | --- |
| Button | `components/ui/button`, Laravel buttons, `CustomUI/Button/*`, and CTA-local buttons coexist. | Pill-only public `Button` with primary/dark/accent/outline/ghost variants and three sizes. | `resources/js/components/ui/button.tsx`, Laravel button wrappers, CTA/nav usages. | Large | Tokens, color rules, focus ring. |
| Badge/Eyebrow/Chip/FilterChip | Mixed badges, pills, and local labels. | Shared label and chip primitives; eyebrow uppercase only at 11-12px and chips using approved radius. | `resources/js/components/ui/badge.tsx`, `resources/js/components/CustomUI/Pills/*`, PageBuilder/homepage blocks. | Medium | Typography and color tokens. |
| Card and compound cards | shadcn cards, `CustomUI/Card`, PageBuilder cards, pricing/resource/blog cards, and bento cards coexist. | `Card`, `InfoCard`, `CardTriplet`, `StatCallout`, `PullQuote`, and `GlassPanel`. | `resources/js/components/ui/card.tsx`, `resources/js/components/CustomUI/Card/*`, PageBuilder card blocks, resource/blog cards. | Large | Radius/shadow tokens. |
| Forms | shadcn inputs, Laravel inputs, `CustomUI/FormFields`, and block-local form styling coexist. | Public `Input`, `Textarea`, `Select`, `ChatInput`; admin/editor forms isolated from marketing style. | `resources/js/components/ui/input.tsx`, `resources/js/components/ui/textarea.tsx`, `resources/js/components/ui/select.tsx`, `ContactUS.tsx`, `LeadCapture.tsx`. | Large | Focus ring, touch target, PageBuilder compatibility. |
| Logo/IconButton/ModalShell/Stamp/SkeletonLine | Multiple logo variants, custom modals, scattered mono text, and loading states. | Official `Logo`, 40x40 `IconButton`, Radix-based `ModalShell`, mono `Stamp`, and `SkeletonLine`. | `resources/js/components/CustomUI/ApplicationLogo*`, `resources/js/components/ui/dialog.tsx`, modal wrappers, timeline/demo components. | Medium | Official logo asset availability. |

## 6. Layout Primitives

| Item | Existing implementation | Target implementation | Files affected | Migration difficulty | Dependencies |
| --- | --- | --- | --- | --- | --- |
| SectionBand | Sections use per-section wrappers and `StaticHomePage2` layout composition. | Shared section primitive with surface, arc, and `stackRole: sticky | exempt | merged`. | Future layout component, homepage sections, PageBuilder renderers. | Large | Token and motion foundation. |
| SectionDivider/arc | `SectionArc` and block-local arc treatments duplicate the arc motif. | One arc divider primitive with 64px/32px geometry and controlled shadow. | `SectionArc.tsx`, `SpontaineBlocks/*`, future `SectionDivider`. | Medium | Layout token decisions. |
| Content wrappers | `AppLayoutPadding`, `AppSectionPadding`, and local max-width/padding utilities coexist. | Shared page/section/content wrappers aligned to `DESIGN.md` measure and spacing. | `resources/js/Layouts/AppLayoutPadding.tsx`, `resources/js/Layouts/AppSectionPadding.tsx`, PageBuilder blocks, homepage sections. | Medium | Spacing tokens. |
| PageBuilder layout compatibility | `BlockConfiguration` permits arbitrary Tailwind spacing/width classes. | Preserve stored data while moving defaults and new blocks to approved layout primitives. | `resources/js/Modules/PageBuilder/page_interfaces.ts`, `resources/js/Modules/PageBuilder/hooks/useBlockStyling.tsx`, registered PageBuilder blocks. | Large | No schema-breaking changes. |

## 7. Navigation Primitives

| Item | Existing implementation | Target implementation | Files affected | Migration difficulty | Dependencies |
| --- | --- | --- | --- | --- | --- |
| PillNav | `Navbar.tsx` already renders a floating pill, but has old copy and custom collapse behavior. | `PillNav` with charcoal pill, official logo, lime CTA, live-link filtering, and `Book the working session`. | `resources/js/Layouts/Navbar/Navbar.tsx`, `NavbarLinks.tsx`, `NavLinkItem.tsx`, logo components. | Medium | Navigation data flow and official logo. |
| MegaMenu | `NavMegaMenu.tsx` custom-builds dropdown behavior with media preview and focus trap. | Radix `NavigationMenu`-based `MegaMenu` with hover/click intent, crossfade, animated height, Escape/outside/route/scroll close. | `resources/js/Layouts/Navbar/NavMegaMenu.tsx`, `resources/js/components/ui/navigation-menu.tsx`, nav data types. | Large | Radix, motion vocabulary, route/link availability. |
| Mobile navigation | `MobileNav.tsx` uses a full-screen overlay with custom view state. | Charcoal overlay below 1024px, accordion columns, bottom sheet below 768px, featured panels dropped on mobile. | `resources/js/Layouts/Navbar/MobileNav/MobileNav.tsx`, `MobileNavHeader.tsx`, `MobileNavLinks.tsx`, `resources/js/components/ui/sheet.tsx`. | Large | Possible `vaul` install or explicit use of existing Radix sheet if avoiding new dependency. |
| Navigation governance | Navigation is managed through PageBuilder/NavEditor/Inertia shared data. | Preserve `NavMenuRepository`, `ManageNavMenu`, `NavEditorController`, and Inertia shared props; hide menu items without live hrefs. | Nav frontend components, backend nav sharing/types if needed. | Medium | Current menu data completeness. |

## Public APIs, Interfaces, And Types

- This implementation plan changes no APIs or types.
- Future implementation should avoid breaking existing PageBuilder data shapes: `PageBlock`, `Block`, `BlockConfiguration`, multilingual `TextData`, and reducer actions.
- New primitives should be additive exports. Legacy components should not be removed until dependent public, PageBuilder, admin, and editor surfaces are migrated.

## Validation Plan For Future Implementation

- Run `npm run build`.
- Run `npm run lint`.
- Run `php artisan test`.
- Verify contrast, especially green text usage against `accent/ink`.
- Verify reduced-motion behavior for homepage and PageBuilder pages.
- Verify responsive navigation across desktop, tablet, and mobile.
- Verify PageBuilder pages preserve existing multilingual content and stored block data.
- Verify no unresolved business decision from `DESIGN.md` is hardcoded.

## Assumptions And Open Dependencies

- `spontaine-tokens.json` regeneration is still an open `DESIGN.md` dependency.
- Inter fine-print font availability must be confirmed or explicitly deferred.
- The motion library path must be decided: continue with existing `framer-motion` package compatibility or migrate to the motion.dev package naming.
- `vaul` is not currently listed in `package.json`; mobile bottom sheet implementation needs either that dependency or an explicit Radix Sheet alternative.
- Official logo assets must be used; do not redraw the mark.
- Open business decisions from `DESIGN.md` remain unresolved and must not be invented during design-system implementation.

