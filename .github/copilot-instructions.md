# AI Coding Agent Instructions

Purpose: Enable immediate productive contributions while preserving established architecture & conventions. Focus on actionable, project-specific guidance—do not add generic boilerplate.

## Core Architecture

- Full-stack: Laravel 11 (PHP 8.2) + Inertia.js + React 18 + TypeScript + Vite + Tailwind.
- Dual page system: Static home page (`HomePageController`, `resources/js/Layouts/StaticHomePage.tsx`) + dynamic database-driven pages (`Modules\PageBuilder` + `ViewBuilderController`). Never route dynamic slug `home` — it's redirected to static root.
- Modular feature areas live under `modules/` (e.g. `PageBuilder`, `OTP`); shared/business logic in `app/` (e.g. `Services/NavMenu`). PageBuilder stores structured block configs as JSON (`Page.blocks`).
- Global UI data (nav, footer, auth, Ziggy routes, lang) injected via `App\Http\Middleware\HandleInertiaRequests` and consumed in React with `usePage()`.

## Key Domain Concepts

- Page Builder: `Page` model fields include `published`, `featured`, `type`, `blocks` (shape: `{ lastUUID, blocks: [...] }`). New block types: define TS interface in `page_interfaces.ts`, add builder + renderer components under `resources/js/Modules/PageBuilder/Blocks`, ensure safe defaults.
- Static Home: Curated composition of purpose-built sections (Hero, Logos, AI, Videos, etc.). Only modify via `StaticHomePage.tsx`; do NOT couple it to generic block renderer.
- Navigation System: CRUD via `NavEditorController` + `ManageNavMenu` + `NavMenuRepository`; data stored in `nav_menu_items` (JSON columns: `items`, `link_info`). TS interfaces mirror PHP structure—keep them in sync when changing schema.
- Multilingual: English + Malayalam fields follow `{ english, malayalam }` shape; always preserve both keys even if one is null.

## Conventions & Patterns

- PHP: `declare(strict_types=1);`, feature subfolders inside default Laravel folders (e.g. `app/Http/Controllers/Customer/*`). Favor Form Requests (e.g. `NavMenuFormRequest`) for validation. Avoid raw queries; use repositories/services for non-trivial persistence.
- React: PascalCase components; business logic in hooks; prop types readonly; conditional UI with `&&`; avoid inline styles—prefer Tailwind utilities.
- Styling: Tailwind-first. Use px-based utilities; extend design tokens in `tailwind.config.js`. Add custom animation only if aligned with existing keyframes (e.g. `reveal`, `shimmer`).
- IDs in structured JSON (nav/page blocks) use incremental `lastUUID` patterns—always update `lastUUID` when appending.

## Copilot Project Rules - Spontaine UI System

### Architecture Rules

- CSS is limited to design tokens and base/global styles.
- Do not add feature-specific CSS files for sections, blocks, or page-level UI.
- Do not introduce proliferating feature class systems (`sp-*`, `hero-*`, `card-*`, similar naming schemes).
- Build feature UI as React components, not CSS-driven feature abstractions.

### Styling Rules

- Tailwind-first is mandatory for feature styling.
- Use Tailwind config tokens and existing design tokens.
- Do not hardcode raw hex colors in component markup.
- Avoid inline styles unless there is no practical Tailwind/class alternative.
- Keep spacing consistent with the existing Tailwind spacing scale.

### Component Rules

- Prefer component composition over class composition.
- Avoid stacking semantic-style classes to simulate components (example to avoid: `hero-card feature-card large-card`).
- Extract reusable primitives and shared UI to `resources/js/components/`.
- Keep PageBuilder block-specific UI inside the PageBuilder module unless broadly reusable.

### Page Builder Rules

- Every block must have:
  - A typed interface in `page_interfaces.ts` (or related typed module)
  - Safe default data
  - Correct `onFieldEdit` usage based on field type and context
- Persisted block fields must be driven by `blockData` and reducer actions.
- Do not directly mutate block JSON structures in component code.
- Do not keep shadow UI state for persisted fields outside reducer-backed block state.

### State & Editing Rules

- Follow PageBuilder reducer action patterns strictly:
  - `INSERT`
  - `UPDATE`
  - `INSERT_INTO_LIST`
  - `REMOVE_LIST_ITEM`
- Match top-level vs list-item edit semantics exactly as documented in this file.

### Animation Rules

- Use GSAP only where it adds clear interaction value.
- Do not mix GSAP transforms with native scroll behavior on the same axis/element.
- Prioritize smooth, mobile-safe performance over animation density.
- For components rendered in multiple contexts (full page + drawer/modal), gate animation behavior by render mode.
- Use ScrollTrigger only in page context; in drawer/modal context use mount-based GSAP timelines (no ScrollTrigger dependency).
- Never leave cross-context content in hidden initial states (`opacity: 0`, translated) when trigger conditions may not fire.

### Mobile-First Rules

- Implement responsive behavior by default.
- Explicitly define mobile behavior for layout, gestures, and interactions.
- Avoid desktop-first assumptions in block/component structure.

### Explicit Non-Goals

- Do not introduce Technopark V2 typography systems.
- Do not introduce `.tp-*` style systems.
- Do not add new CSS layers for feature styling.
- Do not break existing PageBuilder data shape or reducer flow.

## Workflows & Commands

- Full stack dev (parallel processes): `composer dev` (runs PHP server, queue worker, log stream, Vite). Frontend only: `npm run dev`. Build: `npm run build` (client + SSR).
- Queue-required features (mail, long ops): ensure queue worker from dev script is running (`php artisan queue:listen --tries=1`).
- Logs: `php artisan pail --timeout=0` (already in dev script).
- Tests: `php artisan test` (Pest). Feature tests auto-use `RefreshDatabase` via `tests/Pest.php`. Add new HTTP flow tests under `tests/Feature/`.
- DB changes: write migration + (if JSON shape changes) update casts + TS interfaces simultaneously.

## Safe Extension Recipes

1. Add Page Block: (a) TS interface + default constant; (b) UI Builder editor component; (c) Renderer in ViewBuilder; (d) Include in block registry switch; (e) Adjust validation (if server validates block payload later).
2. Add Nav Section: Use existing create/update flow; do not bypass `ManageNavMenu` (ensures idempotent create-or-update logic).
3. Add Shared Prop: Extend `HandleInertiaRequests::share`; update corresponding TS `PageProps` extension.
4. Add Footers/Nav fields: Mirror field in PHP model fillable + cast; update repository + TS interface; keep multilingual pattern.

## PageBuilder Field Edit Actions (Dec 2025)

**Critical Pattern:** PageBuilder uses different actions for different field types and contexts.

**Top-Level Block Fields:**

- **Images** (`backgroundImage`, etc.): Use `action: 'INSERT'`, pass current value as `oldValue: blockData.fieldName`
- **Text/Colors**: Use `action: 'UPDATE'`, pass current value as `oldValue: blockData.fieldName`
- **Links**: Use `action: 'UPDATE'`, pass current value or null as `oldValue`

**List Item Fields** (e.g., carousel slides):

- **Any field inside list**: Use `action: 'UPDATE'` with `itemField`, `itemIndex`, and `oldValue: null`
- **Add new item**: Use `action: 'INSERT_INTO_LIST'` via dispatch with `blockId`, `fieldName`, `fieldValue`
- **Remove item**: Use `action: 'REMOVE_LIST_ITEM'` via dispatch with `blockId`, `fieldName`, `itemId`

**Examples:**

```tsx
// Top-level image (SectionHeroImageSP)
onFieldEdit({
  action: 'INSERT',
  field: 'backgroundImage',
  fieldType: 'image',
  oldValue: blockData.backgroundImage,
})

// List item image (SectionFeatureCarouselSP)
onFieldEdit({
  field: 'slides',
  oldValue: null,
  itemField: 'icon',
  itemIndex: slide.id,
  fieldType: 'image',
  action: 'UPDATE',
})
```

**Why:** PageBuilder's reducer treats top-level fields differently from nested list items. `INSERT` replaces/adds values directly; `UPDATE` with `itemField` modifies specific items within arrays. Always match the pattern used in similar blocks.

## Integration Points

- Inertia shared props consumed in layout/components—avoid duplicate fetches.
- Ziggy route generation available client-side; use it instead of hardcoding paths.
- Media uploads use `SaveFile` trait; reuse rather than reimplementing storage logic.

## Testing Focus

- Feature tests assert HTTP status + JSON/props shape for new controllers. Use Pest fluent style.
- When modifying global shared props, add a minimal test hitting a route and asserting the prop exists.

## Quality Expectations

- Maintain strict types + casts symmetry (PHP model casts ↔ TS interfaces).
- Keep static home untouched by experimental block logic; prototype inside dynamic builder first.
- Never silently mutate JSON structures without bumping `lastUUID` where pattern requires.

## Continuous Instruction Updates

- Treat this file as a living contract for architecture and implementation patterns.
- When introducing a new pattern, update this file in the same change set.
- When fixing recurring bugs (for example swipe handling, reducer misuse, field-edit edge cases), document the fix pattern under a dedicated "Gotchas / Patterns" subsection.
- When adding reusable cross-feature UI, document it under "Reusable Components" with purpose, location, and usage notes.
- When PageBuilder field edit behavior changes, update "PageBuilder Field Edit Actions" immediately.
- Prefer incremental updates over large rewrites so instruction history remains traceable.

## Anti-Patterns to Avoid

- Feature-specific CSS files or block-specific class taxonomies.
- Inline style-heavy components when Tailwind utilities can express the same UI.
- Duplicating UI logic instead of reusing existing shared components.
- Direct JSON mutation inside PageBuilder components.
- Breaking multilingual structures (`english`/`malayalam` pairs).
- Hardcoding routes/URLs where Ziggy route helpers should be used.

## Expected Copilot Behavior

- Generate React component-based solutions first.
- Prefer Tailwind utilities and existing design tokens.
- Reuse established patterns from Navbar, CalendarBooking, and PageBuilder blocks before creating new abstractions.
- Avoid introducing new architecture unless there is a clear, project-backed need.
- Preserve consistency with existing block contracts, reducer actions, and multilingual data structures.

Provide PR descriptions summarizing domain impact (e.g., "Adds new gallery block: schema, builder UI, renderer"). Ask if uncertain about schema evolution before broad refactors.

## Navbar Revamp Notes (Dec 2025)

- **Collapsed Pill Behavior:** Navbar collapses into a compact pill on scroll; expands on hover. Shows `logo-icon` when collapsed, full `logo` when expanded. CTA remains visible in both states.
- **Desktop Mega Menu:**
  - Hover-delay on left link list to reduce flicker.
  - Accessibility: Escape-to-close, focus trap with Tab cycling; `role="dialog"`, `aria-modal`.
  - Visual tweaks: gap between navbar and dropdown (`mt-2`), muted dark baseline link color with hover to black, remove focus ring on submenu links.
  - Layout: Grid with header/links/footer on left; media spans full height on right; panel constrained to viewport (`max-h-[80vh] overflow-hidden`); portrait media `object-cover`.
  - Interaction: Arrow icon appears next to dropdown links on hover.
- **Mobile Navigation Sheet:** (Reference: sanas.ai mobile menu)
  - Full-screen overlay (`fixed inset-0`, `h-screen w-screen`, `max-w-none`, `rounded-none`) with fade + zoom transition (`fade-in-0 zoom-in-95`).
  - Background: `bg-spontaine-accent` aligned to navbar.
  - Header: Logo left; CTA + Close button right (seamless transition from hamburger position). Close button replaces hamburger icon when sheet opens; default Sheet close button hidden via `[&>button]:hidden`.
  - Main menu: All items `text-[28px]` with right arrows; horizontal borders (`border-b border-white/30`); `py-4` spacing; `hover:opacity-70`.
  - Submenu: Back button + logo left; CTA + close right. Links styled identically to main menu (`text-[28px]`, borders, arrows, spacing). View transitions via CSS `translate-x` (root ↔ submenu slide horizontally).
- **Tailwind Token:** Added `spontaine-accent: #44ECA0` in `tailwind.config.js` and `--spontaine-accent` in `resources/css/app.css`.
- **Rendering Fixes:** Ensured main menu links render (`NavbarLinks.tsx` wrapper uses `flex` and parent controls visibility). Fixed JSX structure and Tailwind class order issues across navbar components.

Implementation references:

- `resources/js/Layouts/Navbar/Navbar.tsx` — collapsed pill, hover expansion, desktop/mobile layout.
- `resources/js/Layouts/Navbar/NavMegaMenu.tsx` — accessibility, grid, media, hover-delay, visual tweaks.
- `resources/js/Layouts/Navbar/MobileNav/MobileNav.tsx` — full-screen sheet, views, transitions, typography.
- `resources/js/Layouts/Navbar/NavbarLinks.tsx` — link rendering wrapper.
- `resources/js/Layouts/Navbar/NavLinkItem.tsx` — muted dark link baseline + hover behavior.

## Reusable Components

### CalendarBooking Component (Dec 2025)

**Purpose:** Centralized Cal.com booking integration with automatic iOS detection.

**Location:** `resources/js/components/CalendarBooking/CalendarBooking.tsx`

**Key Features:**

- Auto-detects iOS devices (iPhone, iPad, including iPads masquerading as MacIntel)
- iOS: Opens Cal.com native modal via JavaScript SDK
- Desktop/Android: Shows iframe modal
- Render prop pattern for flexible integration
- Loads Cal.com embed script automatically
- Configurable: `calLink`, `layout`, `brandColor`

**Usage Pattern:**

```tsx
<CalendarBooking>
  {({ openCalendar, isLoading }) => <Button onClick={openCalendar}>Book Demo</Button>}
</CalendarBooking>
```

**Implementation Notes:**

- Used in: `Navbar.tsx`, `MobileNav.tsx`, `SectionCTA.tsx`, `SectionHeroImageSP.tsx`
- When inside closable containers (Sheet, Modal), render CalendarBooking outside to prevent unmounting issues
- MobileNav pattern: CalendarBooking rendered outside Sheet; state flag triggers opening after sheet closes
- Script loading: Checks for existing Cal.com script before adding to prevent custom element registration errors

**Do NOT:** Duplicate modal/iframe logic; use this component for all calendar bookings.

## PageBuilder Components (Dec 2025)

### ManageMediaPage (Apr 2026)

**Location:** `resources/js/Pages/PageBuilder/ManageMediaPage.tsx`

**Purpose:** Thin Inertia page wrapper for media management. This file should remain a pass-through layer and keep all UI logic inside the feature component.

**Imports:**

- `ManageMedia` from `resources/js/Modules/PageBuilder/Pages/ManageMedia.tsx`
- `Paginator` type from `resources/js/components/ui/ui_interfaces`

**Local Types:**

- `MediaRecord`
  - `id: number`
  - `name: string`
  - `url: string | null`
  - `file_key: string`
  - `mime: string`
  - `type: 'document' | 'image' | 'video'`
  - `created_at: string | null`
- `TypeOption`
  - `value: 'all' | 'document' | 'image' | 'video'`
  - `label: string`
- `Props`
  - `media: Paginator<MediaRecord>`
  - `filters: { type: 'all' | 'document' | 'image' | 'video'; search: string }`
  - `typeOptions: TypeOption[]`

**Component Contract:**

- Receives server props exactly as provided by `ManageMediaController@index`.
- Renders only:
  - `<ManageMedia media={media} filters={filters} typeOptions={typeOptions} />`
- Exports `ManageMediaPage` as default.

**Rules for this file:**

- Do not add local business logic, reducer state, upload/delete actions, or API calls here.
- Keep this file focused on type-safe prop forwarding.
- Implement all feature behavior in `resources/js/Modules/PageBuilder/Pages/ManageMedia.tsx`.

### ManageMedia (Apr 2026)

**Location:** `resources/js/Modules/PageBuilder/Pages/ManageMedia.tsx`

**Purpose:** Feature-level admin UI for unified media management. Handles listing, filtering, upload modal flow, view/download links, and delete confirmations.

**Primary Dependencies:**

- `ListResourceTablePage` from `resources/js/components/ListingPage/ListResourceTablePage.tsx`
- `UploadMediaForm` from `resources/js/Modules/PageBuilder/Pages/components/UploadMediaForm.tsx`
- `DeleteModal` from `resources/js/components/CustomUI/Modal/DeleteModal.tsx`
- `useCustomForm` from `resources/js/hooks/useCustomForm`
- Inertia router + `usePage()` for request flow and server validation errors

**Data Contract (from backend):**

- `media: Paginator<MediaRecord>` where each record includes:
  - `id`, `name`, `url`, `file_key`, `mime`, `type`, `created_at`
- `filters` object:
  - `type: 'all' | 'document' | 'image' | 'video'`
  - `search: string`
- `typeOptions: Array<{ value: 'all' | 'document' | 'image' | 'video'; label: string }>`

**Local State:**

- `activeType` for tab state
- `name`, `uploadType`, `file` for uploader form
- `showUploadModal` and `deleteItem` for modal control
- `processing` for upload submit state
- `errors` from `usePage().props.errors` for Laravel validation feedback

**UI Responsibilities:**

- Renders table list using `ListResourceTablePage` (not tile cards)
- Adds type filter pills above the table
- Provides "Upload Media" action button that opens unified modal
- Maps media rows into table fields and actions:
  - `VIEW` (inline open)
  - `DOWNLOAD` (download response)
  - `DELETE` (opens `DeleteModal`)
- Preserves query params (`type`, `search`) in delete flow and type switch flow

**Routing Behavior:**

- Search/list route: `manage-media.index`
- Upload route: `media-upload`
- Delete route: `manage-media.destroy`
- View/download route: `manage-media.file`
  - Uses key-based path (`type + file_key`), not DB id
  - Uses relative URL output in table (public storage path for copy/link use)

**Implementation Boundaries:**

- Keep this component as orchestration + view model mapping layer.
- Do not move server-side validation, authorization, or storage logic into this file.
- Keep upload field rendering and validation message markup in `UploadMediaForm`.
- Keep backend query/storage concerns in repository/service/controller layers.

### Manage Media Gotchas / Patterns (Apr 2026)

**Security + URL Pattern:**

- Do not expose numeric DB ids in public file URLs for media access.
- File access route must use `type + file_key` (derived from stored path key), not `type + id`.
- New uploads must use secure random keys (unguessable) via `SaveFile::saveSecure`.
- Keep list table URL values relative (non-absolute) to avoid leaking host/domain context.

**View vs Download Behavior:**

- `VIEW` should open inline media response (`Content-Disposition: inline`).
- `DOWNLOAD` should force attachment response with extension-aware filename.
- Download response should preserve the original media `name` where possible (sanitize only invalid filename characters; do not slugify).
- New uploads should store with UUID-based filenames and proper file extensions.

**Backward Compatibility:**

- Existing records with extensionful paths must continue to work.
- Key lookup should tolerate both extensionless and extensionful stored values during transition.

**Do NOT regress:**

- Do not switch file route back to `/manage-media/file/{type}/{id}`.
- Do not reintroduce timestamp/id-based filename generation for uploads.
- Do not hardcode absolute URLs in ManageMedia table mapping.

**Upload Security Baseline (Mandatory):**

- Enforce strict MIME whitelist by selected type:
  - image: `image/jpeg`, `image/png`, `image/webp`
  - document: `application/pdf`
  - video: `video/mp4`
- Block high-risk types in upload flows:
  - `image/svg+xml`
  - `text/html`
  - Any executable/script-capable content type
- Validate by server-side MIME detection from file content (not extension only).
- Apply same whitelist policy to unified media upload and legacy upload endpoints.

### Public Media Storage + Naming (Apr 2026)

- All website-facing uploads are public files and must be stored on the `public` disk.
- Folder contract is fixed: documents -> `documents`, images -> `images`, videos -> `videos`.
- Use `SaveFile::saveSecure` for public media uploads; filenames must be UUID-based and non-guessable.
- Preserve file extension on secure filenames (example: `<uuid>.jpg`, `<uuid>.mp4`, `<uuid>.pdf`).
- Page metadata uploads (`preview_image`, `cover_image`, `preview_video`) should write into shared `images`/`videos` folders.
- Nav media uploads should also write into shared `images`/`videos` folders.
- When page uploads create media files, also create corresponding `Image`/`Video` records so assets appear in Manage Media and picker flows.
- In Manage Media table mapping, display relative public URLs (`/storage/...`) for copy/paste usage in PageBuilder fields.

### SectionHeroImageSP

**Location:** `resources/js/Modules/PageBuilder/Blocks/SpontaineBlocks/SectionHeroImageSP.tsx`

**Key Features:**

- Editable hero section with background image, overlay, titles, description, and CTA
- **Consolidated CTA Modal:** Single edit modal handles both regular links and Cal.com calendar links
  - Checkbox to mark link as Cal.com calendar link
  - When calendar checkbox enabled: disables button text fields, auto-fills "Book Demo", hides external link option
  - When unchecked: enables custom button text (English + Malayalam), external link checkbox
  - Saves to `calendarUrl` when calendar mode; saves to `cta` object when regular link mode
- **Background image editing:** Use `action: 'INSERT'` with `oldValue: blockData.backgroundImage`
- **Overlay editor:** Modal with color picker and opacity slider; persist changes through reducer-compliant `onFieldEdit` flows (no direct block mutation)
- **GSAP arc animation:** Optional SVG arc at bottom with morphSVG animation on scroll
- **CalendarBooking integration:** Renders CalendarBooking component when `calendarUrl` is set

**CTA Modal Pattern:** Single unified interface for both link types; toggling calendar checkbox switches between modes without losing data.

## Home Page Components (Dec 2025)

### VideoFeatureCarousel

**Location:** `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/VideoFeatureCarousel.tsx`

**Key Implementation Details:**

- GSAP transforms for slides (no native `overflow-x-auto` to avoid transform conflicts)
- Directional swipe detection: determines horizontal vs vertical intent before blocking scroll
- Vertical swipes allow page scrolling; horizontal swipes navigate carousel
- Mobile: Calculates actual card width from DOM (`firstCard.offsetWidth`) for precise sliding
- Cards per view: 2 on desktop (`lg`), 1 on mobile
- Gap: 24px between cards (Tailwind `gap-6`)

**Critical Patterns:**

- Never mix native scroll + GSAP transforms on same element
- Track `swipeDirectionRef` to distinguish gestures; only `preventDefault()` for horizontal swipes
- `slideTo` must use actual rendered dimensions, not calculated fractions
- Parent container uses `overflow-hidden`; track has no overflow classes

**Mobile Scroll Fix:** Swipe direction detection + conditional `preventDefault()` ensures vertical page scrolling works while preserving horizontal carousel navigation.

## Server-rendered SEO Metadata (Apr 2026)

- For public pages, set SEO payload via Inertia `withViewData(['seo' => ...])` in controllers.
- Current coverage includes: `HomePageController`, `ViewBuilderController`, `BlogsListController`, `ResourcesListController`.
- Keep SEO payload keys consistent: `title`, `description`, `image`, `url`, `type`, `noIndex`.
- List pages (`/resources`, `/blogs-list`) should define dedicated controller-level SEO constants for title/description/image and pass them through `withViewData`.
- Resolve SEO image to an absolute URL in controllers; use app URL fallback (`/storage/images/16.png`) when missing.
- Blade root view (`resources/views/app.blade.php`) is the source of truth for bot-visible tags.
- Render canonical + robots + OG + Twitter tags server-side in Blade from `$seo` defaults.
- Meta attribute conventions: OG uses `property="og:*"`; Twitter uses `name="twitter:*"`.

## Resources Experience (Apr 2026)

### Resources Routes + Slug Handling

- Public resources listing route: `/resources` (`resources.list`).
- Resource detail route aliases are both supported and should remain compatible:
  - `/resources/{slug}` (`resources.show`)
  - `/resource/{slug}` (`resource.show`)
- `ResourcesListController@showResource` resolves slugs across normalized variants (`slug`, `/slug`, `/resources/slug`, `/resource/slug`).

### Resources UI Architecture

- Listing page entry: `resources/js/Pages/ResourcesList.tsx` (re-export) -> `resources/js/Pages/Resources/ResourcesList.tsx`.
- Main sections are split into dedicated components:
  - `ResourcesBanner`
  - `BreadcrumbsResources`
  - `FeaturedResources`
  - `AllResources`
- Keep this split; do not collapse everything into one page component.
- Resources banner background asset path should use `/imge/resourcesbanner.png` (avoid misspelled legacy path variants).
- Shared drawer component is reused (`BlogDetailDrawer`) with configurable props:
  - `sharePathBase='/resource'`
  - `downloadCaptureBasePath='/resource-download'`

### Resources Drawer + Download Flow Rules

- Drawer deep-link behavior uses history state via `useResourceDrawer`.
- Keep URL normalization logic for both `/resources/*` and `/resource/*` paths.
- Blocks rendered inside `BlogDetailDrawer` run in `PageBuilderProvider` drawer mode; block animations must support this context.
- For CTA-like sections (example: `SectionCTASP`), keep scroll-triggered animation for page mode and mount animation fallback for drawer mode.
- If a resource has `download_url`, CTA should route users to lead capture:
  - `/resource-download?download=<normalized_target>&resource=<title>`
- Normalize file targets from old manage-media paths to public paths:
  - `/manage-media/file/...` -> `/media/file/...`

### Resources Content Rules

- Prefer `cover_image` over `preview_image` when rendering detail hero/preview.
- Resource and blog banners should show read-more toggles only when description actually overflows.
- `BlogDetailDrawer` description should use overflow-aware `...more`/`...less` toggle behavior (no toggle when content fits).
- Keep share utilities simple and web-safe (copy link, WhatsApp, LinkedIn).

## Lead Capture Flow (Apr 2026)

### Endpoint + Mail Pipeline

- Lead capture must submit to dedicated route/controller:
  - `POST /send-lead-capture-mail` -> `LeadsCaptureController@sendMail`
- Do not reuse `ContactController` for lead capture submissions.
- Dedicated mailable + template are required:
  - `app/Mail/LeadCaptureMail.php`
  - `resources/views/emails/lead-capture.blade.php`

### Lead Capture Payload Contract

- Accepted fields are limited to lead form data:
  - `name`
  - `email`
  - `organization`
  - `country`
  - `country_name` (derived friendly label)
  - `download_file_name`
  - `privacy_policy`
  - Optional email overrides: `receiver_mail`, `subject`
- `receiver_mail` supports single or multiple recipients. Accept comma/semicolon/newline-separated values and validate each address server-side.
- Do not reintroduce phone as a required lead-capture field.

### Lead Capture UI Block Rules

- Block file: `resources/js/Modules/PageBuilder/Blocks/LeadCapture.tsx`.
- Maintain reducer-safe edits in builder mode:
  - Top-level image edits use `action: 'INSERT'`.
  - Text/link edits use `action: 'UPDATE'`.
- Country input must use shared searchable component:
  - `resources/js/components/ui/country-select.tsx`
- Download/open behavior after successful lead submit:
  - Normalize to public media path when needed.
  - For media links, force download mode by setting `download=1` on `/media/file/...` URLs.
  - Treat same-origin `/storage/documents/...` links as downloadable report targets as well (not only `/media/file/...`).
  - Inertia submit should preserve component state so post-submit UI can render (`preserveState: true`).
  - Show a styled download-complete modal after the browser download is triggered, with a `Back to Resources` link.
  - For in-app blob downloads, derive filename from `Content-Disposition` first; use resource title as fallback base name.
  - Keep non-media links using normal navigation behavior.
