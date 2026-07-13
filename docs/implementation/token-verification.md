# Token Verification

This is a docs-only audit of the PR-02 Spontaine design token foundation. It verifies the current token implementation without changing code, schemas, routes, component exports, runtime behavior, or PageBuilder data structures.

## Sources

- `DESIGN.md`
- `docs/ARCHITECTURE.md`
- `docs/implementation/design-system-plan.md`
- `docs/implementation/file-migration-plan.md`
- `resources/css/spontaine-tokens.css`
- `resources/css/app.css`
- `tailwind.config.js`

## Verification Summary

| Check | Result | Notes |
| --- | --- | --- |
| No legacy tokens were removed | Pass | Existing CSS variables and Tailwind palettes remain present. |
| No component behavior changed | Pass | The token foundation defines variables and aliases only; no component markup, props, effects, selectors, or classes were migrated. |
| No component imports changed | Pass | The only stylesheet import added is `resources/css/spontaine-tokens.css` from `resources/css/app.css`. |
| No public UI regressions were introduced | Pass, static verification | Tokens are defined but not consumed by public components yet, so no visual output should change from this foundation alone. |
| Tailwind token mappings are consistent | Pass | Tailwind aliases point to the new CSS custom properties and remain additive. |
| Token names align with `DESIGN.md` | Pass | CSS-safe names preserve the `DESIGN.md` concepts, such as `accent/mint` to `--spontaine-color-accent-mint`. |
| Aliases are future-proof for planned primitives | Pass | Radius, border, focus, shadow, spacing, and motion aliases support Button, Card, Navigation, and Homepage migration work. |
| Build still succeeds | Not verified in this shell | `npm` is unavailable on PATH in the current environment. Run `npm run build` in a Node-enabled shell before marking PR-02 fully verified. |

## Legacy Token Preservation

Legacy and admin/editor-facing token families remain intact.

Confirmed CSS variable families in `resources/css/app.css`:

- `--colour-1stop-*`
- `--color-*`
- Existing `--spontaine-*`
- `--font-heading`
- `--font-body`
- `--font-mono`

Confirmed Tailwind palette families in `tailwind.config.js`:

- `spontaine`
- `primary`
- `secondary`
- `tertiary`
- `neutral`
- `beige`
- `primary-dark`
- `primary-graige`
- `neutral-graige`
- `black-secondary`
- `black-tertiary`
- `highlight`
- `alert`

The new design-token layer does not replace or rename these values. It adds a separate foundation for future public marketing primitives while preserving compatibility for current public, admin, editor, and PageBuilder surfaces.

## Component Behavior And Imports

No React component files are part of the token foundation. No Button, Card, Navbar, homepage section, or PageBuilder block imports were changed.

The only import-level behavior change is stylesheet-level:

```css
@import './scrollbar-hide.css';
@import './spontaine-tokens.css';
```

Because `spontaine-tokens.css` only defines custom properties under `:root`, it does not alter component props, render paths, event handlers, layout logic, PageBuilder reducers, or navigation data flow.

## Public UI Regression Risk

No public UI regression is expected from PR-02 alone.

Reasoning:

- Existing Tailwind classes still resolve through the existing palettes and scales.
- Existing CSS variables in `app.css` remain available.
- New `--spontaine-*` token names do not collide with legacy `--spontaine-accent`, `--spontaine-dark`, or related variables.
- New Tailwind aliases are additive and unused until later migration PRs.
- No component class names were rewritten to consume the new aliases.

The remaining risk is build-tool verification, not visual behavior. The token values should still be validated through `npm run build` in an environment with Node/npm available.

## Tailwind Mapping Consistency

The new Tailwind namespace is `spontaineDesign`, which avoids collision with the existing `spontaine` palette.

Color mappings:

| `DESIGN.md` token | CSS token | Tailwind alias |
| --- | --- | --- |
| `accent/mint` | `--spontaine-color-accent-mint` | `spontaineDesign.accent.mint` |
| `accent/lime` | `--spontaine-color-accent-lime` | `spontaineDesign.accent.lime` |
| `accent/ink` | `--spontaine-color-accent-ink` | `spontaineDesign.accent.ink` |
| `accent/periwinkle` | `--spontaine-color-accent-periwinkle` | `spontaineDesign.accent.periwinkle` |
| `ink/900` | `--spontaine-color-ink-900` | `spontaineDesign.ink.900` |
| `ink/700` | `--spontaine-color-ink-700` | `spontaineDesign.ink.700` |
| `paper` | `--spontaine-color-paper` | `spontaineDesign.paper` |
| `gray/50` | `--spontaine-color-gray-50` | `spontaineDesign.gray.50` |
| `gray/100` | `--spontaine-color-gray-100` | `spontaineDesign.gray.100` |
| `cream` | `--spontaine-color-cream` | `spontaineDesign.cream` |
| `border/hairline` | `--spontaine-color-border-hairline` | `spontaineDesign.border.hairline` |

Non-color mappings:

- Radius aliases cover pill, card, control, and artifact shapes.
- Border aliases cover hairline width.
- Ring aliases cover focus width, offset, and color.
- Shadow aliases cover floating, arc, and dark arc shadows.
- Spacing aliases cover section rhythm, arc height, and copy measure.
- Motion aliases cover duration, delay, and easing values for the documented motion vocabulary.

## `DESIGN.md` Alignment

The token layer aligns with the current `DESIGN.md` direction:

- Mint and lime are represented as fill colors, not hardcoded text colors.
- `accent/ink` is available for future text-safe green usage.
- Charcoal, paper, gray, cream, and hairline border tokens are named for their design roles.
- Pill, card, control, and artifact radius values match the documented shape system.
- Floating and arc shadows match the documented shadow system.
- Section and arc spacing tokens support the future arc-stack layout work.
- Motion tokens cover `settle`, `stack`, `scrub`, `chip-pop`, `crossfade`, stagger, and reduced-motion duration.

The implementation uses CSS-safe token names instead of slash-separated names, while preserving the same semantic hierarchy.

## Future Primitive Readiness

| Future surface | Token readiness | Notes |
| --- | --- | --- |
| Button | Ready | Pill radius, focus ring, mint/lime/ink color roles, and motion aliases are available. |
| Card | Ready | Card radius, hairline border, floating shadow, paper/cream/gray surfaces, and copy measure are available. |
| Navigation | Ready | Pill radius, lime CTA fill, charcoal ink values, focus ring, crossfade, settle, and spacing aliases are available. |
| Homepage sections | Ready | Section spacing, arc height, arc shadows, cream/paper/ink surfaces, and scroll/motion vocabulary aliases are available. |
| PageBuilder modernization | Ready as a foundation | Aliases can be consumed by redesigned block renderers without changing stored PageBuilder data shapes. |

## Build Verification

Build verification is blocked in the current shell because `npm` is not available on PATH.

Required follow-up command in a Node-enabled environment:

```bash
npm run build
```

Expected result:

- Vite client build succeeds.
- Vite SSR build succeeds.
- Tailwind accepts the additive aliases and CSS custom-property-backed values.
- No component or PageBuilder behavior changes are required for the build to pass.

## Open Verification Notes

- `spontaine-tokens.json` regeneration remains an unresolved `DESIGN.md` dependency and is outside PR-02.
- `accent/ink` should still receive contrast verification during future component usage migration.
- The long-term code-facing namespace may later move from additive `spontaineDesign` aliases to a canonical namespace after legacy usage is migrated.
- This verification is static for public UI behavior; visual regression testing should occur when components begin consuming the new aliases.
