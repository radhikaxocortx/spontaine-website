# Spontaine V3 Hero Design-System Audit

This audit reviews `resources/js/components/Home/SpontaineV3Hero.tsx` for reusable primitives, reusable tokens, and values that should remain local to the hero. It is documentation only; no production code changes are recommended as part of this audit.

The current hero is a concrete implementation. Future extraction should stay conservative and happen only after repeated V3 homepage patterns appear.

## 1. Reusable Primitives (Extract Soon)

No React primitive should be extracted immediately.

The hero has reusable-looking patterns, but each appears only inside this first V3 section. Extracting now would create abstractions before the next homepage section proves the shape, API, and variants.

### Pattern

Primary and secondary CTA links with icon.

### Current Usage

Two links in the hero copy area:

- Primary CTA: mint filled pill, `shadow-cta-glow`, `ArrowUpRight`.
- Secondary CTA: white outlined pill, `ArrowUpRight`.

### Extraction Recommendation

Do not extract now.

Potential future primitive:

```text
Suggested Primitive:
CTAButton

Variants:
primary
secondary
```

The future primitive should wait until the next V3 section repeats CTA sizing, icon placement, focus styling, and color variants.

## 2. Candidate Primitives (Watch For Reuse)

### CTA Button Pair

Why It Looks Reusable:

The pair uses consistent pill radius, minimum height, body font, icon sizing, focus outlines, and hover behavior.

Why Extraction Should Wait:

Only one section currently proves the variant requirements. Future sections may need different alignment, href handling, icon direction, or button/link rendering.

Future Trigger:

Extract after a second V3 section uses the same primary/secondary CTA pattern with the same sizing and focus behavior.

### Hero Shell Container

Why It Looks Reusable:

The section uses the same shell width and CSS variable gutters that future V3 homepage sections may share.

Why Extraction Should Wait:

The hero has unique left padding, overflow behavior, and full-viewport callout breakout. Those should not leak into a generic container.

Future Trigger:

Extract a simple `Container` only after at least two non-hero V3 sections use the same `max-w-[1180px]` and gutter pattern without hero-specific positioning.

### Glass Surface Card

Why It Looks Reusable:

The answer card combines translucent white, border, backdrop blur, and `shadow-surface`.

Why Extraction Should Wait:

The card is positioned inside the prism visual and has mockup-specific padding, width, and type sizes.

Future Trigger:

Extract after another section uses the same glass treatment for a content surface, independent of the prism composition.

### Full-Width Callout Strip

Why It Looks Reusable:

The portfolio callout is a full-viewport breakout strip with shell-aligned content, translucent surface, and compact three-column content.

Why Extraction Should Wait:

It appears once and is tied to hero flow and scroll-trigger animation.

Future Trigger:

Extract after another V3 section needs a full-width shell-aligned callout strip with matching surface treatment.

### Scroll-Triggered Prompt Reveal

Why It Looks Reusable:

The GSAP pattern uses scoped refs, reduced-motion handling, and replay behavior.

Why Extraction Should Wait:

The trigger relationship is specific: the prompt card animates when the portfolio callout enters view.

Future Trigger:

Extract only if another V3 section needs the same "decorative card reveals when sibling callout enters viewport" pattern.

## 3. Candidate Layout Tokens

| Current Value                  | Suggested Token                             | Confidence | Recommendation                                                                                   |
| ------------------------------ | ------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| `max-w-[1180px]`               | `--container-v3` or `--container-marketing` | Medium     | Watch for reuse. This may become the canonical V3 shell width after another section repeats it.  |
| `max-w-[760px]`                | `--measure-display-wide`                    | Medium     | Watch for reuse. It may describe display-copy measure, but currently only appears in the hero.   |
| `max-w-[570px]`                | `--measure-body-wide`                       | Medium     | Watch for reuse. It is a readable body measure in the hero.                                      |
| `max-w-[560px]`                | `--measure-label-wide`                      | Low        | Keep local until another long eyebrow or metadata line needs it.                                 |
| `pt-[132px]`                   | None                                        | Low        | Keep local. This is navbar/hero art-direction spacing.                                           |
| `md:pt-[168px]`                | None                                        | Low        | Keep local. It is breakpoint-specific hero alignment.                                            |
| `lg:pt-[120px]`                | `--space-section` if repeated               | Medium     | Watch. The value matches the existing section rhythm, but in this hero it is used as top offset. |
| `pb-[150px]` / `md:pb-[150px]` | `--space-section-lg`                        | Medium     | Watch. The value matches an existing token but may be compensating for hero mask and callout.    |
| `h-[180px]`                    | `--mask-curve-height`                       | Low        | Keep local unless curved paper masks repeat.                                                     |
| `min-h-[520px]`                | None                                        | Low        | Keep local. It is visual-stage art direction.                                                    |
| `lg:min-h-[480px]`             | None                                        | Low        | Keep local. It is visual-stage art direction.                                                    |
| `rounded-[18px]`               | `--radius-surface-sm`                       | Medium     | Watch. It matches the mockup answer card and may recur for compact glass cards.                  |
| `px-[17px]` / `py-[15px]`      | None                                        | Low        | Keep local. These are mockup-specific card interior measurements.                                |
| `min-h-[66px]`                 | None                                        | Low        | Keep local. The callout strip height is content-specific.                                        |
| `gap-[7px]`                    | `--space-cluster-xs`                        | Low        | Keep local until compact pill clusters repeat.                                                   |
| `md:gap-[18px]`                | None                                        | Low        | Keep local. This is callout-specific grid spacing.                                               |

## 4. Candidate Typography Tokens

| Current Value                                | Recommendation          | Reason                                                                                                               |
| -------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `display-hero`                               | Keep existing primitive | The primary hero headline already uses the shared display primitive.                                                 |
| `body-lg`                                    | Keep existing primitive | The supporting paragraph already maps to the shared body primitive.                                                  |
| `eyebrow`                                    | Keep existing primitive | The label already maps to the shared mono label primitive.                                                           |
| `font-mono text-xs text-spontaine-gray-deep` | Remain local for now    | This subnote is a single instance. It may become `metadata-sm` if repeated.                                          |
| `text-[0.63rem]`                             | Watch for tokenization  | This pill text size is smaller than `text-xs` and likely mockup-specific. It may become `metadata-pill` after reuse. |
| `text-[0.76rem]`                             | Watch for tokenization  | Used in the callout body and link. It may become `caption-md` or `callout-sm` if repeated outside the hero.          |
| `text-[0.78rem]`                             | Remain local for now    | Used for answer card prompt text. Close to `text-xs`, but exact mockup styling matters.                              |
| `text-[0.8rem]`                              | Remain local for now    | Used for callout heading only. Not enough repetition for a primitive.                                                |
| `tracking-[-0.035em]`                        | Watch for tokenization  | Used on pill text to match the mockup mono treatment. Extract only if compact mono pills repeat.                     |

No new typography primitive is recommended immediately. The existing `display-hero`, `body-lg`, and `eyebrow` primitives are doing the important shared work.

## 5. Candidate Surface Tokens

### Glass Card

Current Styling:

```text
rounded-[18px]
border border-spontaine-white/90
bg-spontaine-white/[0.84]
shadow-surface
backdrop-blur-lg
```

Reusability Assessment:

Medium. This is likely to recur in product-visual cards or floating proof points.

Suggested Primitive Name:

```text
SurfaceCard
Variant:
glass
```

Recommendation:

Do not extract now. Consider a component token first if the same surface appears again:

```text
--surface-glass-bg
--surface-glass-border
```

### Frosted Callout Strip

Current Styling:

```text
border border-spontaine-white/70
bg-spontaine-white/35
backdrop-blur-[6px]
```

Reusability Assessment:

Medium. It may become useful for cross-section announcements or audience strips.

Suggested Primitive Name:

```text
CalloutStrip
Variant:
frosted
```

Recommendation:

Wait for another strip. The current implementation also has viewport breakout behavior that should not automatically become part of a primitive.

### Pill Variant Chips

Current Styling:

```text
rounded-full
px-[9px]
py-0.5
font-mono
text-[0.63rem]
tracking-[-0.035em]
bg-[var(--spontaine-pill-variant-*-bg)]
text-[var(--spontaine-pill-variant-*-text)]
```

Reusability Assessment:

High for design tokens, medium for a React primitive.

Suggested Primitive Name:

```text
MetadataPill
```

Recommendation:

Keep tokenized colors. Wait before extracting a React primitive until more V3 sections use the pill pattern.

## 6. Keep Local To Hero

These values are art direction or composition-specific and should remain local unless the exact visual system is intentionally reused.

| Value / Pattern                                                                                                                     | Reason                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `inset-x-[-15%]`, `bottom-[20%]`, `rotate-[-13deg]` on the ambient band                                                             | Controls the hero's diagonal background composition. Not a general layout rule.                   |
| `inset-x-[-4%]`, `-bottom-20`, `h-[180px]`, `rounded-t-[50%]` paper mask                                                            | Specific transition shape for this hero. Tokenize only if V3 adopts curved section masks broadly. |
| `lg:grid-cols-[1.08fr_0.92fr]`                                                                                                      | Hero-specific copy/visual balance.                                                                |
| Visual stage `min-h-[520px]`, `lg:min-h-[480px]`                                                                                    | Supports the prism and prompt card, not general section layout.                                   |
| Prism offsets and sizes: `right-[-10%]`, `top-[70px]`, `w-[330px]`, `sm:w-[410px]`, `md:top-[54px]`, `md:w-[460px]`, `lg:w-[382px]` | Art-directed prism placement.                                                                     |
| Prism organic radius `rounded-[42%_58%_63%_37%/41%_44%_56%_59%]`                                                                    | Hero-specific organic blob silhouette.                                                            |
| Prism facet line transforms: `rotate-[38deg]`, `skew-x-[-12deg]`, `rotate-[-22deg]`                                                 | Internal illustration geometry.                                                                   |
| Prompt animation trigger relationship                                                                                               | Specific to prompt card reveal when the callout enters view.                                      |
| `w-[min(470px,100%)]` prompt width                                                                                                  | Matches mockup card width and should remain local until cards repeat.                             |

## 7. Tailwind Normalization Review

| Arbitrary Value                                             | Recommendation                       | Reason                                                                                             |
| ----------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `bg-[var(--spontaine-pill-variant-*-bg)]`                   | Keep local/token-backed              | Component consumes design-system component tokens.                                                 |
| `text-[var(--spontaine-pill-variant-*-text)]`               | Keep local/token-backed              | Component consumes design-system component tokens.                                                 |
| `px-[var(--space-shell-sm)]` / `md:px-[var(--space-shell)]` | Keep token-backed                    | Layout tokens intentionally live in CSS variables.                                                 |
| `pb-[150px]` / `md:pb-[150px]`                              | Convert to token if repeated         | Equivalent to `--space-section-lg`, but current usage may include hero-specific mask compensation. |
| `pt-[132px]`                                                | Keep local                           | No exact Tailwind scale match; hero-specific top spacing.                                          |
| `md:pt-[168px]`                                             | Keep local                           | No exact Tailwind scale match; hero-specific top spacing.                                          |
| `lg:pt-[120px]`                                             | Convert to token if repeated         | Same value as `--space-section`, but current context is hero top offset.                           |
| `inset-x-[-15%]`                                            | Keep local                           | Decorative band art direction.                                                                     |
| `bottom-[20%]`                                              | Keep local                           | Decorative band art direction.                                                                     |
| `opacity-[0.76]`                                            | Keep local                           | Mockup-tuned band opacity.                                                                         |
| `inset-x-[-4%]`                                             | Keep local                           | Curved mask art direction.                                                                         |
| `h-[180px]`                                                 | Keep local                           | Curved mask art direction.                                                                         |
| `rounded-t-[50%]`                                           | Keep local                           | Curved mask shape.                                                                                 |
| `max-w-[1180px]`                                            | Convert to token after reuse         | Likely V3 container width, but needs confirmation in the next section.                             |
| `lg:grid-cols-[1.08fr_0.92fr]`                              | Keep local                           | Hero-specific content/visual ratio.                                                                |
| `max-w-[760px]`                                             | Convert to token after reuse         | Potential display-copy measure.                                                                    |
| `max-w-[560px]`                                             | Keep local                           | Eyebrow line-length tuning.                                                                        |
| `max-w-[570px]`                                             | Convert to token after reuse         | Potential body-copy measure.                                                                       |
| `min-h-[520px]`                                             | Keep local                           | Visual stage art direction.                                                                        |
| `lg:min-h-[480px]`                                          | Keep local                           | Visual stage art direction.                                                                        |
| `top-[70px]`                                                | Keep local                           | Prism positioning.                                                                                 |
| `w-[330px]`                                                 | Keep local                           | Prism sizing.                                                                                      |
| `rotate-[15deg]`                                            | Keep local                           | Prism art direction.                                                                               |
| `rounded-[42%_58%_63%_37%/41%_44%_56%_59%]`                 | Keep local                           | Organic prism silhouette.                                                                          |
| `sm:right-[-2%]`                                            | Keep local                           | Prism positioning.                                                                                 |
| `sm:w-[410px]`                                              | Keep local                           | Prism sizing.                                                                                      |
| `md:right-[4%]`                                             | Keep local                           | Prism positioning.                                                                                 |
| `md:top-[54px]`                                             | Keep local                           | Prism positioning.                                                                                 |
| `md:w-[460px]`                                              | Keep local                           | Prism sizing.                                                                                      |
| `lg:right-[2%]`                                             | Keep local                           | Prism positioning.                                                                                 |
| `lg:w-[382px]`                                              | Keep local                           | Prism sizing.                                                                                      |
| `inset-[12%]`                                               | Keep local                           | Facet line art direction.                                                                          |
| `rotate-[38deg]`                                            | Keep local                           | Facet line art direction.                                                                          |
| `skew-x-[-12deg]`                                           | Keep local                           | Facet line art direction.                                                                          |
| `inset-x-[3%]`                                              | Keep local                           | Facet line art direction.                                                                          |
| `inset-y-[28%]`                                             | Keep local                           | Facet line art direction.                                                                          |
| `rotate-[-22deg]`                                           | Keep local                           | Facet line art direction.                                                                          |
| `w-[min(470px,100%)]`                                       | Keep local                           | Exact prompt card width from mockup.                                                               |
| `rounded-[18px]`                                            | Convert to token after reuse         | Potential compact surface radius.                                                                  |
| `bg-spontaine-white/[0.84]`                                 | Consider component token after reuse | Mockup-specific glass opacity.                                                                     |
| `px-[17px]` / `py-[15px]`                                   | Keep local                           | Exact prompt card padding.                                                                         |
| `lg:bottom-[15px]`                                          | Keep local                           | Prompt card placement.                                                                             |
| `text-[0.78rem]`                                            | Watch for typography primitive       | Prompt text size.                                                                                  |
| `gap-[7px]`                                                 | Watch for spacing token              | Compact chip gap.                                                                                  |
| `px-[9px]`                                                  | Watch for spacing token              | Compact chip padding.                                                                              |
| `text-[0.63rem]`                                            | Watch for typography primitive       | Compact chip text size.                                                                            |
| `tracking-[-0.035em]`                                       | Watch for typography primitive       | Compact mono pill tracking.                                                                        |
| `backdrop-blur-[6px]`                                       | Keep local                           | Frosted callout strip blur does not match default Tailwind blur scale.                             |
| `min-h-[66px]`                                              | Keep local                           | Callout strip content height.                                                                      |
| `py-[17px]`                                                 | Keep local                           | Callout strip padding.                                                                             |
| `md:grid-cols-[1.15fr_2fr_0.75fr]`                          | Keep local                           | Callout content layout.                                                                            |
| `md:gap-[18px]`                                             | Keep local                           | Callout grid spacing.                                                                              |
| `text-[0.76rem]`                                            | Watch for typography primitive       | Callout text and link size.                                                                        |
| `text-[0.8rem]`                                             | Watch for typography primitive       | Callout heading size.                                                                              |

## 8. Design-System Recommendations

### Immediate

- Do not extract React primitives yet.
- Keep existing V3 color, radius, shadow, gradient, layout, and typography token usage.
- Consider documenting `--spontaine-pill-variant-*` as the preferred token family for compact pill variants, which is already in place.
- Keep the current Tailwind normalization rule: use standard utilities only when there is an exact match.

### After Next Section

- Revisit `max-w-[1180px]` as a possible `--container-v3` or `--container-marketing` token after another V3 section repeats it.
- Revisit CTA extraction if the same pill CTA variants recur.
- Revisit the glass surface treatment if another section uses the same translucent white, border, blur, and shadow stack.
- Revisit `text-[0.76rem]`, `text-[0.63rem]`, and `tracking-[-0.035em]` if compact metadata or pill typography repeats.
- Revisit a full-width frosted callout strip primitive if another section uses viewport breakout with shell-aligned content.

### Long-Term

- Potential `Container` primitive for V3 section shells once width and gutter behavior repeat.
- Potential `CTAButton` primitive with `primary`, `secondary`, and icon-placement variants.
- Potential `SurfaceCard` primitive with `glass` and `solid` variants.
- Potential `MetadataPill` primitive if pill labels appear across multiple V3 sections.
- Potential `CalloutStrip` primitive if V3 uses repeated full-width audience or conversion strips.

## Conclusion

The hero is healthy as a concrete first implementation. The strongest immediate design-system outcome is documentation and observation, not extraction. The likely first future abstractions are container width, CTA buttons, compact pill typography, and glass surfaces, but each should wait for a second V3 section to confirm reuse. Design-System Debt To Revisit After Section 2
