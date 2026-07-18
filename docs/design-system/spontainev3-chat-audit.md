# Spontaine V3 Chat Section Primitive Audit

This audit covers `resources/js/components/Home/Chat/SectionChatV3.tsx` and its section-owned children. It is documentation only for future extraction decisions.

## Reusable Primitives

| Pattern | Locations found | Extract now? | Reasoning |
| --- | --- | --- | --- |
| Shared `Button` | Existing shared UI component, not used for compact answer controls | No | The query send control and tiny opportunity actions have specialized compact shapes; the shared button remains appropriate for larger CTAs. |
| Section heading composition | Chat heading, hero heading patterns | No | Typography primitives already provide the scale. A `SectionHeading` primitive should wait for another V3 section using the same centered heading/body structure. |

## Candidate Primitives

| Pattern | Why it looks reusable | Why extraction should wait | Future trigger |
| --- | --- | --- | --- |
| Query card | It combines an input-like surface, leading icon, text, send action, and chips. | It currently appears once and is tied to this answer narrative. | Extract after another section needs the same ask/action/chip composition. |
| Answer surface | White elevated analytical card with compact data table and metric module. | The internal data structure is bespoke to this mockup. | Extract if multiple V3 sections show the same elevated data surface shell. |
| Opportunity aside | Small elevated aside with tag, heading, body, and tiny actions. | It is a single narrative artifact in this section. | Extract after a second opportunity/alert card appears with the same density. |
| Compact pills | Pill colors and sizing repeat in the hero prompt card and chat query card. | Extracted as `Pill` in `resources/js/components/ui/pill.tsx`. | Extend only after another size or variant is needed. |

## Candidate Layout Tokens

| Current value | Suggested token | Confidence | Recommendation |
| --- | --- | --- | --- |
| `max-w-[1180px]` | `--container-shell` | Medium | Keep local until more V3 sections confirm the same shell width. |
| `max-w-[760px]` | `--container-copy-wide` | Low | Keep local; it may be section-specific heading measure. |
| `max-w-[690px]` | `--container-answer-stage` | Low | Keep local because it is tied to the mockup's answer composition. |
| `mt-[50px]` | `--space-section-content-gap` | Medium | Watch for reuse in following V3 sections. |
| `mt-[39px]` | none | Low | Keep local; it is art-directed mockup spacing. |
| `gap-[26px]` | none | Low | Keep local unless output-card grids repeat. |

## Candidate Typography Tokens

| Current value | Recommendation | Reasoning |
| --- | --- | --- |
| `text-[0.88rem]` | Keep local | Query text is a specialized compact product UI size. |
| `text-[0.64rem]` | Covered by `Pill` | Chat query pills now use the shared `Pill` primitive. |
| `text-[0.55rem]` | Keep local | Table header labels are specific to dense data display. |
| `text-[0.72rem]` | Watch | Repeated in table rows and notes; could become a compact data/body primitive if used again. |
| `text-[0.62rem]` | Keep local | Opportunity metadata is too specific for extraction now. |

## Candidate Surface Tokens

| Pattern | Current styling | Reusability assessment | Suggested primitive name |
| --- | --- | --- | --- |
| Query surface | White, accent border, card radius, subtle lift | Likely reusable as an input surface, but only one use today. | `InputSurface` later. |
| Analysis surface | White, subtle border, surface shadow, 23px radius | Good candidate if later data cards share it. | `SurfaceCard` later. |
| Opportunity aside | Same surface shell with smaller content | Candidate for a compact alert/opportunity card. | `InsightCard` later. |

## Keep Local To Chat

The output grid ratio, chart path, row data, text strings, exact table column ratios, and the stagger timing remain local. They describe this section's story and should not become design-system tokens yet.

## Tailwind Normalization Review

| Value | Recommendation | Reason |
| --- | --- | --- |
| `max-w-[1180px]` | Convert to token later | Existing shell value appears in multiple V3 sections but has not been formalized as a container token. |
| `max-w-[760px]`, `max-w-[690px]`, `max-w-[570px]` | Keep local | These are content measures from the mockup. |
| `mt-[50px]`, `mt-[39px]`, `gap-[26px]`, `gap-[22px]` | Keep local | Art-directed section spacing. |
| `h-[42px]`, `w-[42px]` | Keep local | Mockup-specific compact circular controls. |
| `py-[7px]`, `text-[0.64rem]`, `text-[0.88rem]` | Keep local | Compact product UI treatment. |
| `grid-cols-[1.65fr_0.82fr]`, `grid-cols-[2.5fr_0.8fr_0.8fr_0.9fr]` | Keep local | Data layout composition should stay with the concrete section. |

## Recommendations

Immediate: keep the implementation concrete, rely on V3 semantic/component tokens, and use the shared `Pill` primitive for repeated V3 pill treatments.

After next section: revisit `SectionHeading`, `SurfaceCard`, and compact `Pill` if the same patterns repeat.

Long term: consider data-display typography primitives if compact tables and analytical cards become a broader V3 product-visual language.
