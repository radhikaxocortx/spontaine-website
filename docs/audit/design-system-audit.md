# Design System Audit

This audit compares current implementation patterns against `DESIGN.md`. The main issue is not a lack of tokens; it is that several token systems and component-era styles coexist.

## Typography

Expected by `DESIGN.md`:

- Urbanist for headlines, body, nav, and buttons.
- Roboto Mono for literal data.
- Inter Light only for fine print at 12px or below.
- No serif.
- Sentence case except small uppercase eyebrow labels.
- No Space Grotesk in the public system.

Findings:

- `resources/css/app.css` defines and imports Space Grotesk, then uses it in `.hero-description`.
- `tailwind.config.js` maps `font-space-grotesk` to `var(--font-body)` for compatibility, while also naming Space Grotesk explicitly.
- `resources/js/Modules/PageBuilder/Components/TinyMCE/TinyMce.tsx` exposes `Body Text (Space Grotesk)` and Space Grotesk menu options.
- `resources/js/typography/SectionDescription.tsx`, `SectionBody.tsx`, and `SectionSubtitle.tsx` use `font-['Space_Grotesk']`.
- `resources/js/typography/Heading.tsx` forces uppercase.
- `resources/js/Pages/Customer/VerificationDetails.tsx` uses `font-serif`; this is outside the marketing site but should not leak into public marketing primitives.

Recommendation:

- Define `DESIGN.md` typography styles as reusable utilities/components.
- Remove Space Grotesk from public PageBuilder formats after migration.
- Keep uppercase only for 11-12px eyebrow labels with controlled tracking.

## Colors

Expected by `DESIGN.md`:

- `accent/mint #45EDA1`, fill only.
- `accent/lime #C3FF6E`, nav pill CTA only.
- `accent/ink #0A7A55`, text-safe green.
- `accent/periwinkle #7776BC`, sparing secondary accent.
- `ink/900 #242424`, `ink/700 #343434`, `paper #FFFFFF`, `gray/50 #F7F7F7`, `gray/100 #F3F4F6`, `cream #F0EEE4`, `border/hairline rgba(0,0,0,0.1)`.

Findings:

- `tailwind.config.js` includes many legacy palettes: `primary`, `secondary`, `tertiary`, `beige`, `primary-dark`, `primary-graige`, `neutral-graige`, `black-secondary`, `black-tertiary`, `highlight`, `alert`.
- `tailwind.config.js` has partial Spontaine tokens, but misses the exact `DESIGN.md` token naming and includes extra values such as `accent-dark`, `accent-soft`, `accent-ring`, and `accent-footer`.
- `resources/css/app.css` defines old `1stop` colors and many non-Spontaine CSS variables.
- `resources/js/Layouts/StaticHomePage2.tsx` hardcodes cookie consent colors `#343434` and `#44ECA0`.
- `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionAlignedAction.tsx`, `SectionChat.tsx`, `SectionCTA.tsx`, `SpontaineBlocks/SectionCTASP.tsx`, `SectionBentoCardsSP.tsx`, and `SectionBannerGradient.tsx` hardcode gradients and hex colors.
- `resources/js/components/CalendarBooking/CalendarBooking.tsx` defaults `brandColor` to `#44ECA0`, which is close to mint but not the canonical `#45EDA1`.

Recommendation:

- Regenerate or realign Spontaine tokens before visual implementation.
- Keep legacy palettes for admin/editor compatibility only until migrated.
- Treat hardcoded hex in public components as blockers unless they are centralized token definitions.

## Spacing

Expected by `DESIGN.md`:

- Section padding: 128px desktop / 64px mobile.
- Arc height: 64px desktop / 32px mobile.
- Stable dimensions for fixed-format UI.

Findings:

- `BlockConfiguration` permits arbitrary Tailwind spacing class selection through PageBuilder.
- `resources/js/Layouts/AppLayoutPadding.tsx` uses global max-width and padding values that predate the redesign.
- Many blocks use local `px-*`, `py-*`, `gap-*`, `mt-*`, and `mb-*` utilities directly.

Recommendation:

- Introduce shared section spacing primitives and constrain PageBuilder spacing choices to design-approved values.
- Preserve existing stored spacing values for compatibility, but migrate public block defaults to design tokens.

## Motion

Expected by `DESIGN.md`:

- Motion vocabulary: `settle`, `stack`, `scrub`, `chip-pop`, `crossfade`.
- 400-600ms restraint, no springs, no bounces.
- Reduced motion support at the vocabulary level.
- Prefer `motion` values for scroll-linked homepage choreography; GSAP only where justified.

Findings:

- `Navbar.tsx` and `NavMegaMenu.tsx` use `framer-motion`, while `DESIGN.md` names motion.dev as the preferred library.
- `AppLayout.tsx`, `Footer.tsx`, many resource/blog components, and multiple PageBuilder blocks use GSAP/ScrollTrigger.
- `StaticHomePage2.tsx` injects custom smooth-scroll CSS and overrides PageUp/PageDown behavior.
- Tailwind animation utilities and custom keyframes in `resources/css/app.css` add additional motion vocabularies.
- Reduced-motion handling is present in some layout CSS, but not centralized for blocks.

Recommendation:

- Create a shared motion vocabulary and reduce one-off GSAP use.
- Homepage scroll choreography should be implemented once in the static homepage system, not duplicated across PageBuilder blocks.
- Public block motion should degrade consistently under `prefers-reduced-motion`.

## Radius

Expected by `DESIGN.md`:

- Buttons, nav, chips, badges: fully rounded pills.
- Cards: 24px.
- Small icon controls and demo artifacts: 12px.

Findings:

- `resources/js/components/ui/button.tsx`, Laravel buttons, and many PageBuilder/editor buttons use `rounded-md`, `rounded-lg`, or other non-pill radii.
- PageBuilder cards use mixed `rounded-lg`, `rounded-xl`, `rounded-2xl`, and arbitrary radii.
- `SectionArc` and several hero/banner blocks use custom shape treatments.

Recommendation:

- Define radius tokens and variants at primitive level.
- Public marketing buttons should be pill-only.
- Card renderers should normalize to 24px unless they are data/demo artifacts.

## Shadows

Expected by `DESIGN.md`:

- Most cards should use a 1px hairline or flat tint.
- Floating elements may use one soft shadow: `0 25px 50px -12px rgba(0,0,0,0.25)`.
- No colored shadows or inner glows.

Findings:

- Many components use `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, and hover shadow escalation.
- `tailwind.config.js` defines `boxShadow.spontaine-dpa`.
- `BlogDetailDrawer.tsx`, resource cards, PageBuilder editor cards, and homepage sections frequently use stronger shadows than the redesign allows.

Recommendation:

- Restrict public card shadows through a shared `Card` primitive.
- Reserve the soft floating shadow for CTA pills, floating cards, and modals.

## Navigation

Expected by `DESIGN.md`:

- Floating charcoal pill nav with lime CTA.
- CTA copy: `Book the working session`.
- Megamenu built on Radix `NavigationMenu`.
- No live `href`, no rendered item.
- Desktop hover/click behavior, mobile charcoal overlay and bottom sheet behavior.

Findings:

- `Navbar.tsx` is already a floating pill and uses the lime-like CTA color.
- `Navbar.tsx`, `MobileNav.tsx`, `SectionCTA.tsx`, `SectionCTASP.tsx`, `SectionHeroImageSP.tsx`, and `SectionHeroVideoSP.tsx` still use `Book Demo`.
- `NavMegaMenu.tsx` custom-builds dropdown behavior rather than using the shared Radix navigation primitive.
- `NavMegaMenu.tsx` uses `role='dialog'` and focus trapping for hover navigation; this may be heavy for desktop menu behavior.
- Navigation still depends on existing CMS/shared Inertia data, which is correct and should be preserved.

Recommendation:

- Preserve navigation data flow.
- Rebuild behavior and copy to match `DESIGN.md`.
- Hide items without live links before rendering.

## Forms

Expected by `DESIGN.md`:

- Shared `Input`, `Textarea`, `Select`.
- Clear focus rings: 3px mint with 3px offset.
- Touch targets at least 44px.
- Public forms should use the brand typography, radius, and color rules.

Findings:

- Public form blocks `ContactUS.tsx` and `LeadCapture.tsx` use block-local styling.
- Admin/editor forms use `CustomUI/FormFields`, Laravel starter inputs, and shadcn inputs.
- Focus rings vary across indigo, blue, neutral, and no-ring states.

Recommendation:

- Create public marketing form primitives and refactor `ContactUS`/`LeadCapture` around them.
- Leave admin/editor form density intact where appropriate, but prevent those styles from defining the public marketing system.

## Cards

Expected by `DESIGN.md`:

- 24px card radius.
- Hairline border preferred over shadow.
- No nested cards unless required by repeated items or modals.

Findings:

- Card functionality is duplicated across shadcn cards, `CustomUI/Card`, PageBuilder card blocks, resource/blog cards, homepage bento cards, and pricing cards.
- `SectionBentoCardsSP.tsx` allows card colors and gradients directly in block data, including hardcoded hex values.
- Pricing, resource, and carousel cards use varied radius, shadow, and hover scale behavior.

Recommendation:

- Define `Card`, `InfoCard`, `CardTriplet`, `StatCallout`, and `GlassPanel` primitives.
- Refactor PageBuilder card-like blocks around those primitives after token foundation is complete.

## Token Violations Summary

- Hardcoded public hex colors appear in `StaticHomePage2.tsx`, `CalendarBooking.tsx`, `SectionAlignedAction.tsx`, `SectionChat.tsx`, `SectionCTA.tsx`, `SectionCTASP.tsx`, `SectionBentoCardsSP.tsx`, `SectionBannerGradient.tsx`, `SectionArc.tsx`, and footer/logo SVG fills.
- Typography conflicts appear in `resources/css/app.css`, `TinyMCE.tsx`, `resources/js/typography/*`, and resource/blog breadcrumb components.
- Motion conflicts appear in GSAP-heavy homepage/resource/PageBuilder blocks and injected smooth-scroll code.
- Radius/shadow conflicts appear throughout button, card, modal, and PageBuilder editor/public components.

