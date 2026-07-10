# Component Inventory

This audit covers the React surface in `resources/js/Layouts`, `resources/js/components`, `resources/js/Modules/PageBuilder`, `resources/js/Pages`, and `resources/js/typography`. It uses `DESIGN.md` as the design authority and `docs/ARCHITECTURE.md` as the architecture authority.

Status definitions:

- Keep: compatible with the architecture and close enough to the redesign to preserve.
- Refactor: useful, but needs token, accessibility, naming, or reuse cleanup.
- Replace: the concept remains needed, but the implementation conflicts with `DESIGN.md`.
- Remove: unused, obsolete, duplicated, or superseded.

## Navigation

| Component | Location | Purpose | Homepage | PageBuilder | Reusable across both | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `Navbar` | `resources/js/Layouts/Navbar/Navbar.tsx` | Floating marketing navigation shell with desktop and mobile variants. | Yes | Yes, via layouts | Yes | Refactor |
| `NavbarLinks` | `resources/js/Layouts/Navbar/NavbarLinks.tsx` | Renders navigation menus from shared Inertia navigation data. | Yes | Yes | Yes | Keep |
| `NavMegaMenu` | `resources/js/Layouts/Navbar/NavMegaMenu.tsx` | Desktop dropdown/megamenu with media preview. | Yes | Yes | Yes | Refactor |
| `NavLinkItem` | `resources/js/Layouts/Navbar/NavLinkItem.tsx` | Renders direct nav link or menu trigger. | Yes | Yes | Yes | Refactor |
| `MobileNav` | `resources/js/Layouts/Navbar/MobileNav/MobileNav.tsx` | Mobile navigation overlay. | Yes | Yes | Yes | Refactor |
| `MobileNavHeader` | `resources/js/Layouts/Navbar/MobileNav/MobileNavHeader.tsx` | Header for mobile nav views. | Yes | Yes | Yes | Refactor |
| `MobileNavLinks` | `resources/js/Layouts/Navbar/MobileNav/MobileNavLinks.tsx` | Mobile menu link list. | Yes | Yes | Yes | Refactor |
| `LangSwitch` | `resources/js/Layouts/Navbar/LangSwitch.tsx` | Language toggle. | Maybe | Yes | Yes | Keep |
| `DropdownMenuComponent` | `resources/js/Layouts/Navbar/DropdownMenu.tsx` | Legacy dropdown menu. | No | Possible | No | Replace |
| `NavEditor` and forms | `resources/js/Modules/PageBuilder/NavEditor/*` | CMS navigation management UI. | No | Editor only | No | Keep |

Notes:

- `Navbar` already uses the database/shared navigation path described in `docs/ARCHITECTURE.md`; do not bypass `NavMenuRepository`, `ManageNavMenu`, or `NavEditorController`.
- `Navbar.tsx` and `MobileNav.tsx` still render `Book Demo`, which `DESIGN.md` retires in favor of `Book the working session`.
- `NavMegaMenu.tsx` implements some required behavior, such as hover intent and Escape handling, but should move toward Radix `NavigationMenu`, `settle`/`crossfade` timing, and the desktop/mobile behavior specified in `DESIGN.md`.

## Layout

| Component | Location | Purpose | Homepage | PageBuilder | Reusable across both | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `AppLayout` | `resources/js/Layouts/AppLayout.tsx` | Public layout with navigation, footer, and scroll behavior. | No, homepage uses `StaticHomePage2` | Yes | Yes | Refactor |
| `StaticHomePage2` | `resources/js/Layouts/StaticHomePage2.tsx` | Current custom homepage composition. | Yes | No | No | Replace |
| `StaticHomePage` | `resources/js/Layouts/StaticHomePage.tsx` | Older homepage composition. | Legacy | No | No | Remove |
| `AppLayoutPadding` | `resources/js/Layouts/AppLayoutPadding.tsx` | Global horizontal page padding wrapper. | Yes | Yes | Yes | Refactor |
| `AppSectionPadding` | `resources/js/Layouts/AppSectionPadding.tsx` | Section vertical padding helper. | No | Possible | Yes | Refactor |
| `Footer` | `resources/js/Layouts/Footer/Footer.tsx` | Shared footer renderer, also registered as a PageBuilder block. | Yes | Yes | Yes | Refactor |
| `GuestLayout` | `resources/js/Layouts/GuestLayout.tsx` | Auth guest layout. | No | No | No | Keep |
| `AuthenticatedLayout`, `DashboardLayout`, `Sidebar`, `CustomerSidebar` | `resources/js/Layouts/*` | Admin/customer app layouts. | No | Editor/admin only | No | Keep |

Notes:

- The redesign needs a shared `SectionBand` and `SectionDivider`/arc layout primitive instead of page-specific arc and scroll code.
- `StaticHomePage2.tsx` directly imports `HomeBlocks` from PageBuilder folders while remaining a custom homepage. Keep the custom homepage route, but move homepage-only sections out of PageBuilder ownership during implementation.

## Shared UI

| Component | Location | Purpose | Homepage | PageBuilder | Reusable across both | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `Button` | `resources/js/components/ui/button.tsx` | Shared shadcn-style button primitive. | Yes | Yes | Yes | Refactor |
| `badge`, `card`, `dialog`, `sheet`, `accordion`, `navigation-menu`, `input`, `textarea`, `select`, `tabs`, `checkbox`, `radio-group`, `switch`, `popover` | `resources/js/components/ui/*` | Headless/shared UI primitives. | Mixed | Yes | Yes | Refactor |
| `CalendarBooking` | `resources/js/components/CalendarBooking/CalendarBooking.tsx` | Booking modal wrapper. | Yes | CTA blocks | Yes | Refactor |
| `MetaTags` | `resources/js/components/MetaTags.tsx` | SEO metadata component. | Yes | Yes | Yes | Keep |
| `ApplicationLogo`, `ApplicationLogo2`, `ApplicationLogoWhite` | `resources/js/components/CustomUI/*` | Logo variants. | Yes | Yes | Yes | Replace |
| `Spinner`, `FullSpinner`, `FullSpinnerWrapper` | `resources/js/components/CustomUI/*` | Loading indicators. | No | Admin/editor | No | Keep |
| `Modal`, `DeleteModal`, `LaravelModal` | `resources/js/components/CustomUI/Modal/*`, `resources/js/components/LaravelModal.tsx` | Modal implementations. | Mixed | Editor/admin | Yes | Refactor |
| `Image` | `resources/js/components/CustomUI/Image.tsx` | Image wrapper. | Possible | Possible | Yes | Keep |
| `alerts` | `resources/js/components/ui/alerts.tsx` | Toast/alert helper. | Possible | Editor | Yes | Keep |

Notes:

- `DESIGN.md` calls for a consolidated primitive set: `Button`, `Badge`/`Eyebrow`, `Chip`, `Card`, `Input`/`Textarea`/`Select`, `Stamp`, `SkeletonLine`, `SectionDivider`, and `Logo`.
- Current shared UI is a mixture of shadcn/Radix primitives, Laravel starter components, and `CustomUI` components. Consolidation should preserve editor/admin needs but define a separate marketing-safe primitive layer.

## Marketing

| Component | Location | Purpose | Homepage | PageBuilder | Reusable across both | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `HeroArcInteractive` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/HeroArcInteractive.tsx` | Current animated homepage hero. | Yes | No registered block | No | Replace |
| `SectionChat` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionChat.tsx` | Current chat/demo-like section. | Yes | No registered block | Partial | Replace |
| `VideoFeatureCarousel` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/VideoFeatureCarousel.tsx` | Current homepage feature carousel. | Yes | No registered block | Maybe | Refactor |
| `SectionAlignedAction` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionAlignedAction.tsx` | Current bento/action section. | Yes | No registered block | Maybe | Replace |
| `CompanyLogosMarquee` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/CompanyLogosMarquee.tsx` | Current trust/logo marquee. | Yes | No registered block | Yes | Refactor |
| `SectionTestimonial` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionTestimonial.tsx` | Current homepage testimonial section. | Yes | No registered block | Yes | Refactor |
| `SectionBlogsCarousel` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionBlogsCarousel.tsx` | Current blog carousel on homepage. | Yes | No registered block | Resources only | Remove from homepage |
| `SectionCTA` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionCTA.tsx` | Current homepage CTA. | Yes | No registered block | Partial | Replace |
| `SectionAI`, `SectionAIIntegration`, `SectionTrustedPartners`, `SectionVideos`, `SectionTalk`, `SectionLargeText`, `HeroSection`, `HeroSection2`, `CompanyLogosSection`, `SectionBlogsList` | `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/*` | Older or unused homepage marketing sections. | Not currently rendered | No registered block | No | Remove or retire |

Notes:

- The current homepage section list does not match the `DESIGN.md` homepage anatomy.
- Several homepage-only components live under `Modules/PageBuilder/Blocks/HomeBlocks`, which blurs ownership. They should be treated as static marketing components or retired.

## PageBuilder

| Component | Location | Purpose | Homepage | PageBuilder | Reusable across both | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `ViewBuilder` | `resources/js/Modules/PageBuilder/Pages/ViewBuilder.tsx` | Public PageBuilder renderer. | No | Yes | No | Keep |
| `PageBuilder`, `PageCreate`, `PageEdit`, `PageIndex` | `resources/js/Modules/PageBuilder/Pages/*` | CMS page management UI. | No | Editor | No | Keep |
| `ResolveComponent` | `resources/js/Modules/PageBuilder/Components/ResolveComponent.tsx` | String-based block renderer registry. | No | Yes | No | Refactor |
| `AddPageBlock` | `resources/js/Modules/PageBuilder/Components/AddPageBlock.tsx` | Editor block picker. | No | Editor | No | Refactor |
| `BlockEditor` and block editor forms | `resources/js/Modules/PageBuilder/Components/BlockEditor/*` | Generic block editing UI. | No | Editor | No | Keep |
| `CTAEditModal` | `resources/js/Modules/PageBuilder/Components/CTAEditModal.tsx` | CTA editing modal. | No | Editor | Yes | Refactor |
| `TinyMce` | `resources/js/Modules/PageBuilder/Components/TinyMCE/TinyMce.tsx` | Rich text editor. | No | Editor | No | Refactor |
| `Localization`, `InertiaLink`, media/file upload forms | `resources/js/Modules/PageBuilder/Components/*` | Shared PageBuilder utilities. | No | Yes | No | Keep |
| Registered PageBuilder block renderers | `resources/js/Modules/PageBuilder/Blocks/*` | Public block renderers and editor affordances. | Some legacy naming | Yes | Some | Refactor |

Notes:

- PageBuilder should remain intact. The redesign should update block renderers and add reusable blocks only where concepts are editor-managed.
- The string registry is workable but duplicated across `ResolveComponent.tsx`, `AddPageBlock.tsx`, and `pageBuilderService.tsx`; future work should centralize metadata without changing block data shape.

## Resources

| Component | Location | Purpose | Homepage | PageBuilder | Reusable across both | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `ResourcesList` | `resources/js/Pages/Resources/ResourcesList.tsx`, `resources/js/Pages/ResourcesList.tsx` | Resource listing page variants. | No | Static page | Maybe | Refactor |
| `ResourcesBanner` | `resources/js/Pages/Resources/components/ResourcesBanner.tsx` | Resources page hero/banner. | No | No | Yes | Refactor |
| `FeaturedResources` | `resources/js/Pages/Resources/components/FeaturedResources.tsx` | Featured resources list. | No | No | Yes | Refactor |
| `AllResources` | `resources/js/Pages/Resources/components/AllResources.tsx` | Filtered resource listing. | No | No | Yes | Refactor |
| `ResourceCard` | `resources/js/Pages/Resources/components/ResourceCard.tsx` | Resource card. | No | No | Yes | Refactor |
| `BreadcrumbsResources` | `resources/js/Pages/Resources/components/BreadcrumbsResources.tsx` | Resource breadcrumbs. | No | No | Yes | Refactor |
| `BlogsList`, `BlogPage`, blog components | `resources/js/Pages/Blogs/*`, `resources/js/Pages/BlogPage.tsx` | Blog list/detail experiences. | Linked through current homepage carousel | Static pages | Yes | Refactor |
| `BlogDetailDrawer`, `BlogContentRenderer` | `resources/js/components/*` | Blog drawer/content rendering. | Current homepage/resource flows | No | Yes | Refactor |

Notes:

- `SectionBlogsCarousel` should not remain a homepage section under the `DESIGN.md` homepage anatomy. Blog/resource components should move to resource pages or PageBuilder content contexts.

## Forms

| Component | Location | Purpose | Homepage | PageBuilder | Reusable across both | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `LeadCapture` block | `resources/js/Modules/PageBuilder/Blocks/LeadCapture.tsx` | Lead capture/download form block. | No | Yes | Yes | Refactor |
| `ContactUS` block | `resources/js/Modules/PageBuilder/Blocks/ContactUS.tsx` | Contact form/content section. | No | Yes | Yes | Refactor |
| `FormBuilder`, `FormPage`, `StepperFormPage` | `resources/js/FormBuilder/*` | Dynamic form system. | No | Admin/customer flows | Maybe | Keep |
| `CustomUI/FormFields/*` | `resources/js/components/CustomUI/FormFields/*` | Admin/customer form fields. | No | Editor/admin | Partial | Refactor |
| Laravel form primitives | `resources/js/components/Laravel*.tsx` | Starter-kit form controls/buttons. | No | Admin/auth | No | Refactor |
| `WorkflowModule` forms | `resources/js/components/WorkflowModule/*` | Workflow/admin forms. | No | Admin | No | Keep |

Notes:

- Marketing forms need a token-aligned `Input`, `Textarea`, `Select`, and focus system. Admin/editor forms can keep denser patterns but should not leak into public marketing components.

## Duplicate Functionality

- Buttons: `components/ui/button.tsx`, Laravel buttons, `CustomUI/Button/*`, CTA block-specific buttons, and direct `button` markup in navigation and PageBuilder editor overlays.
- Cards: `components/ui/card.tsx`, `CustomUI/Card/*`, `PricePlanCard`, `ImageCards`, `SectionBentoCardsSP`, resource/blog cards, and homepage bento cards.
- Typography: `resources/js/typography/*`, Tailwind font utilities, TinyMCE formats, `.hero-*` classes in `resources/css/app.css`, and block-local font classes.
- Hero/banner systems: `HeroArcInteractive`, `SectionHero`, `SectionHeroImageSP`, `SectionHeroVideoSP`, `SectionBanner`, `SectionBannerSP`, `SectionBannerClean`, `SectionBannerDark`, and `SectionBannerGradient`.
- Carousel/marquee systems: `VideoFeatureCarousel`, `SectionCarousel`, `SectionFeatureCarouselSP`, `SectionImageCarouselSP`, `SectionMarquee`, `SectionMarqueeSP`, and `CompanyLogosMarquee`.
- Motion systems: GSAP/ScrollTrigger, Framer Motion, Tailwind animate utilities, custom CSS keyframes, and injected scroll CSS.

