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

Provide PR descriptions summarizing domain impact (e.g., "Adds new gallery block: schema, builder UI, renderer"). Ask if uncertain about schema evolution before broad refactors.
