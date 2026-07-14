# SectionChatV3 Hardcoded Value Audit

This is an audit-only document for the current `SectionChatV3` exploration and local chat components. It does not move files, create tokens, rewrite components, or modify runtime behavior.

## Sources

- `resources/js/Modules/PageBuilder/Blocks/HomeBlocks/SectionChatV3.tsx`
- `resources/js/HomePage/Chat/useChatStory.ts`
- `resources/js/HomePage/Chat/ResultsTable.tsx`
- `resources/js/HomePage/Chat/ApprovalCard.tsx`
- `resources/js/HomePage/Chat/ChatSurface.tsx`

## Move Note

The request also mentioned moving `SectionChatV3.tsx` into `resources/js/HomePage/Chat/`. That was not performed in this pass because the same request specified: "Do not modify code" and "This is an audit only." If approved later, the move should be a separate code-only change that updates the homepage import path and keeps behavior unchanged.

## 1. Typography

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | `font-display` | V3 title and chat UI typography. | Replace with existing design-system token only if this remains the approved public marketing typeface. | Replace with existing design-system token |
| `SectionChatV3.tsx` | `text-3xl`, `sm:text-4xl` | Responsive V3 title size. | Keep Tailwind utilities; values are already standard and readable. | Replace with existing Tailwind utility |
| `SectionChatV3.tsx` | `lg:text-[42px]` | Desktop title art direction. | Replace with a named display style if reused by more sections; otherwise keep local. | Keep local implementation detail |
| `SectionChatV3.tsx` | `font-semibold`, `font-bold` | Title hierarchy and emphasis. | Keep standard Tailwind utilities. | Replace with existing Tailwind utility |
| `SectionChatV3.tsx` | `leading-[1.08]` | Tight title line-height. | Keep local unless a repeated display rhythm emerges. | Keep local implementation detail |
| `SectionChatV3.tsx` | `font-body`, `text-base`, `sm:text-lg`, `lg:text-xl` | Typewriter prompt styling. | Keep existing typography aliases/utilities. | Replace with existing design-system token |
| `SectionChatV3.tsx` | `text-sm`, `sm:text-base`, `font-medium` | Filter pill typography. | Keep Tailwind utilities. | Replace with existing Tailwind utility |
| `SectionChatV3.tsx` | `text-left`, `text-center` | Dropdown and section alignment. | Keep local structural utilities. | Keep local implementation detail |
| `ResultsTable.tsx` | `font-mono`, `text-[10px]`, `uppercase`, `leading-none` | Table headers and source note. | Extract a local metadata style only if repeated across chat artifacts. | Extract into local ChatSurface primitive |
| `ResultsTable.tsx` | `font-display`, `text-xs`, `sm:text-sm`, `leading-5` | Table row content. | Keep Tailwind utilities; consider a local table-row text helper if more tables appear. | Replace with existing Tailwind utility |
| `ResultsTable.tsx` | `font-semibold` | Red delta emphasis. | Keep Tailwind utility. | Replace with existing Tailwind utility |
| `ApprovalCard.tsx` | `font-mono`, `text-xs`, `font-bold`, `uppercase`, `tracking-[0.04em]` | Approval status stamp. | Extract into a local chat status/stamp primitive if reused. | Extract into local ChatSurface primitive |
| `ApprovalCard.tsx` | `font-display`, `text-lg`, `font-semibold`, `leading-7` | Approval copy. | Keep Tailwind utilities. | Replace with existing Tailwind utility |
| `ApprovalCard.tsx` | `text-sm`, `font-bold` | Button and estimate text. | Keep Tailwind utilities. | Replace with existing Tailwind utility |

## 2. Spacing

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | `-mt-32` | Pulls the chat section under the previous hero arc. | Keep local until the homepage arc-stack system is formalized. | Keep local implementation detail |
| `SectionChatV3.tsx` | `py-4`, `sm:py-10`, `lg:py-8` | Section vertical padding. | Keep local exploration spacing for now. | Keep local implementation detail |
| `SectionChatV3.tsx` | `px-6`, `sm:px-8`, `lg:px-12` | Section content gutters. | Replace with global layout wrapper later if the section graduates from exploration. | Replace with existing design-system token |
| `SectionChatV3.tsx` | `mb-12`, `sm:mb-16`, `lg:mb-20` | Title-to-chat vertical rhythm. | Keep local until adjacent homepage sections are settled. | Keep local implementation detail |
| `SectionChatV3.tsx` | `p-4`, `sm:p-5`, `lg:p-6` | Chat input shell padding. | Extract into a local chat input surface if reused. | Extract into local ChatSurface primitive |
| `SectionChatV3.tsx` | `gap-3`, `sm:gap-4`, `gap-2`, `sm:gap-3` | Chat row and pill spacing. | Keep Tailwind utilities. | Replace with existing Tailwind utility |
| `SectionChatV3.tsx` | `py-2`, `mt-4`, `mt-2`, `px-4`, `py-3`, `px-5`, `py-2.5` | Prompt, pill, and dropdown spacing. | Keep Tailwind utilities; extract only if a shared chat control primitive emerges. | Replace with existing Tailwind utility |
| `SectionChatV3.tsx` | `mt-14` | Chat input-to-story stage spacing. | Keep local art-directed value. | Keep local implementation detail |
| `SectionChatV3.tsx` | `px-2`, `sm:px-6` | Stage internal gutters. | Keep local; tied to card overlap. | Keep local implementation detail |
| `ResultsTable.tsx` | `p-5`, `sm:p-7`, `lg:p-8` | Table card padding. | Move to `ChatSurface` size variants if table/card surfaces need consistency. | Extract into local ChatSurface primitive |
| `ResultsTable.tsx` | `gap-3`, `sm:gap-5`, `pb-3`, `py-3`, `pt-2` | Table grid rhythm. | Keep Tailwind utilities. | Replace with existing Tailwind utility |
| `ApprovalCard.tsx` | `p-7`, `sm:p-9` | Approval card padding. | Move to `ChatSurface` size variants if reused. | Extract into local ChatSurface primitive |
| `ApprovalCard.tsx` | `mb-4`, `mt-5`, `gap-2`, `mt-4`, `px-5`, `px-3`, `py-2` | Approval card internal rhythm. | Keep Tailwind utilities. | Replace with existing Tailwind utility |

## 3. Widths

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | `w-full` | Full-width section and arc. | Keep structural utility. | Keep local implementation detail |
| `SectionChatV3.tsx` | `viewBox='0 0 1920 183'` | SVG arc coordinate system. | Keep local arc implementation detail until an arc primitive exists. | Keep local implementation detail |
| `SectionChatV3.tsx` | `max-w-7xl` | Overall content rail. | Replace with global layout primitive if V3 becomes production. | Replace with existing design-system token |
| `SectionChatV3.tsx` | `max-w-4xl` | Chat box and table alignment rail. | Keep local for this exploration; promote only after reuse. | Keep local implementation detail |
| `SectionChatV3.tsx` | `w-10`, `sm:w-11`, `w-12`, `sm:w-14` | Chat icon/send button sizes. | Extract into a local chat control primitive if reused. | Extract into local ChatSurface primitive |
| `SectionChatV3.tsx` | `w-0.5`, `w-4`, `w-5`, `sm:w-6` | Caret and icon sizing. | Keep Tailwind utilities. | Replace with existing Tailwind utility |
| `SectionChatV3.tsx` | `w-56`, `w-48` | Dropdown menu widths. | Keep local unless shared dropdown primitive is introduced. | Keep local implementation detail |
| `SectionChatV3.tsx` | `max-w-6xl` | Wider story stage for approval-card overlap. | Keep local art-direction measurement. | Keep local implementation detail |
| `ResultsTable.tsx` | `grid-cols-[1.8fr_0.45fr_0.65fr_1fr]` | Table column widths. | Keep local; tightly coupled to table content. | Keep local implementation detail |
| `ApprovalCard.tsx` | `w-full`, `max-w-[480px]` | Approval card width. | Keep local unless approval cards repeat elsewhere. | Keep local implementation detail |

## 4. Heights

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | `viewBox` height `183` | Arc height. | Keep local or replace with future arc primitive. | Keep local implementation detail |
| `SectionChatV3.tsx` | SVG path `V183.067` | Arc shape height. | Keep local arc geometry. | Keep local implementation detail |
| `SectionChatV3.tsx` | `h-10`, `sm:h-11`, `h-12`, `sm:h-14` | Chat icon/send button heights. | Extract into local chat control primitive if reused. | Extract into local ChatSurface primitive |
| `SectionChatV3.tsx` | `h-5`, `sm:h-6`, `h-4` | Icon sizes. | Keep Tailwind utilities. | Replace with existing Tailwind utility |
| `SectionChatV3.tsx` | `min-h-[520px]` | Story stage vertical canvas. | Keep local art-direction measurement. | Keep local implementation detail |
| `ResultsTable.tsx` | `min-h-[260px]`, `sm:min-h-[300px]`, `lg:min-h-[330px]` | Results table card height. | Keep local unless table surface variants repeat. | Keep local implementation detail |
| `ApprovalCard.tsx` | `min-h-11` | Secondary button touch target. | Keep Tailwind utility; ensure primary approve button also has the same touch target. | Replace with existing Tailwind utility |

## 5. Radius

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | `rounded-[32px]` | Chat input shell radius. | Extract into local chat input surface or use an existing large-radius token if approved. | Extract into local ChatSurface primitive |
| `SectionChatV3.tsx` | `rounded-full` | Circular buttons and pills. | Replace with existing pill radius token if available; Tailwind utility is acceptable. | Replace with existing Tailwind utility |
| `SectionChatV3.tsx` | `rounded-2xl` | Dropdown menus. | Keep Tailwind utility. | Replace with existing Tailwind utility |
| `ResultsTable.tsx` | inherited from `ChatSurface` | Table card radius. | See `ChatSurface` radius row. | Extract into local ChatSurface primitive |
| `ApprovalCard.tsx` | `rounded-full`, `rounded-lg` | Buttons and assignment tag. | Keep Tailwind utilities. | Replace with existing Tailwind utility |
| `ChatSurface.tsx` | `rounded-[28px]` | Shared local chat card radius. | Keep in `ChatSurface`; consider a local `size`/`tone` variant if more surfaces appear. | Extract into local ChatSurface primitive |

## 6. Borders

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | inline `border: '2px solid transparent'` | Gradient border shell for chat input. | Extract into a local chat input surface; avoid inline style when productionized. | Extract into local ChatSurface primitive |
| `SectionChatV3.tsx` | `border`, `border-spontaine-accent/30`, `hover:border-spontaine-accent/50` | Generate pill border. | Use existing color tokens; keep Tailwind utility structure. | Replace with existing design-system token |
| `SectionChatV3.tsx` | `border-spontaine-accent-ring/30`, `hover:border-spontaine-accent-ring/50` | Source pill border. | Use existing color tokens; keep local pill styling until controls are standardized. | Replace with existing design-system token |
| `SectionChatV3.tsx` | `border-gray-200`, `hover:border-gray-300` | Time pill and dropdown borders. | Keep Tailwind utilities unless public control tokens are required. | Replace with existing Tailwind utility |
| `ResultsTable.tsx` | `border-b border-gray-100`, `divide-y divide-gray-100` | Table row separators. | Keep Tailwind utilities. | Replace with existing Tailwind utility |
| `ApprovalCard.tsx` | `border border-gray-200` | Secondary action buttons. | Keep Tailwind utilities or use future button primitive. | Replace with existing Tailwind utility |
| `ChatSurface.tsx` | `border border-white/70` | Local glass/card edge. | Keep in `ChatSurface`; candidate for local surface primitive. | Extract into local ChatSurface primitive |

## 7. Shadows

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | `shadow-[0_8px_30px_rgba(0,0,0,0.08)]` | Chat input depth. | Extract into local chat input surface if retained. | Extract into local ChatSurface primitive |
| `SectionChatV3.tsx` | `hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]` | Chat input hover depth. | Extract with chat input surface; avoid one-off arbitrary shadow later. | Extract into local ChatSurface primitive |
| `SectionChatV3.tsx` | `shadow-md`, `shadow-lg` | Send button/dropdown shadows. | Keep Tailwind utilities. | Replace with existing Tailwind utility |
| `ChatSurface.tsx` | `shadow-[0_18px_45px_rgba(15,23,42,0.14)]` | Results/approval card depth. | Keep in `ChatSurface`; candidate local chat surface token/variant. | Extract into local ChatSurface primitive |

## 8. Blur

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| All audited files | No explicit blur class/value found. | No blur treatment currently used in V3 chat surfaces. | No action. | Keep local implementation detail |

## 9. Motion

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | `typingSpeed = 80`, `deletingSpeed = 30` | Typewriter character timing. | Keep local; tied to story pacing. | Keep local implementation detail |
| `SectionChatV3.tsx` | `setTimeout(..., 2000)` | Pause before deleting typed prompt. | Keep local until chat story timing is formalized. | Keep local implementation detail |
| `SectionChatV3.tsx` | `duration: 1.2`, `ease: 'power2.inOut'` | Arc morph animation. | Keep local or move to future arc primitive. | Keep local implementation detail |
| `SectionChatV3.tsx` | `transition-all duration-300`, `duration-200`, `transition-colors`, `transition-transform` | Hover/dropdown/control motion. | Keep Tailwind utilities. | Replace with existing Tailwind utility |
| `useChatStory.ts` | `duration: 0.35`, `0.65`, `0.9`, `0.8`, `0.6` | Table/card hide, repeat show, and first reveal durations. | Keep local story choreography for now. | Keep local implementation detail |
| `useChatStory.ts` | `ease: 'power2.out'`, `'power3.out'`, `'back.out(1)'` | Table/card reveal feel. | Keep local until homepage motion vocabulary is promoted. | Keep local implementation detail |
| `useChatStory.ts` | `setTimeout(..., 1000)` | Idle reveal delay after typing completion. | Keep local story behavior. | Keep local implementation detail |

## 10. Animation Timings

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | `80ms` | Typewriter typing speed. | Keep local. | Keep local implementation detail |
| `SectionChatV3.tsx` | `30ms` | Typewriter deleting speed. | Keep local. | Keep local implementation detail |
| `SectionChatV3.tsx` | `2000ms` | Typewriter pause before deletion. | Keep local. | Keep local implementation detail |
| `SectionChatV3.tsx` | `1.2s` | Arc morph in/out duration. | Keep local or extract into arc primitive later. | Keep local implementation detail |
| `useChatStory.ts` | `350ms` | Hide animation duration. | Keep local; tied to V3 story. | Keep local implementation detail |
| `useChatStory.ts` | `650ms` | Repeat table reveal. | Keep local; tied to V3 story. | Keep local implementation detail |
| `useChatStory.ts` | `900ms` | Initial table reveal. | Keep local; tied to V3 story. | Keep local implementation detail |
| `useChatStory.ts` | `800ms` | Initial approval reveal. | Keep local; tied to V3 story. | Keep local implementation detail |
| `useChatStory.ts` | `600ms` | Repeat approval reveal. | Keep local; tied to V3 story. | Keep local implementation detail |
| `useChatStory.ts` | `1000ms` | Idle reveal delay. | Keep local behavior. | Keep local implementation detail |

## 11. Trigger Offsets

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | `start: 'top 80%'`, `end: 'top 20%'` | Arc morph scroll range. | Keep local until arc primitive exists. | Keep local implementation detail |
| `useChatStory.ts` | `start: 'top bottom'`, `end: 'bottom top'` | Stage viewport presence boundary. | Keep local; this is orchestration logic. | Keep local implementation detail |
| `useChatStory.ts` | `start: 'top 75%'`, `end: 'bottom top'` | Stage readiness and approval reveal threshold. | Keep local story trigger. | Keep local implementation detail |
| `useChatStory.ts` | `start: 'top 75%'` | Current table reveal threshold. | Keep local story trigger. | Keep local implementation detail |

## 12. Transforms

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | `rotate-180` | Dropdown chevron state. | Keep Tailwind utility. | Replace with existing Tailwind utility |
| `useChatStory.ts` | `y: 80` | Table hide offset. | Keep local story motion. | Keep local implementation detail |
| `useChatStory.ts` | `x: 120` | Approval hide offset. | Keep local story motion. | Keep local implementation detail |
| `useChatStory.ts` | `y: 360` | Initial table reveal offset. | Keep local story motion. | Keep local implementation detail |
| `useChatStory.ts` | `x: 360` | Initial approval reveal offset. | Keep local story motion. | Keep local implementation detail |
| `useChatStory.ts` | `x: 0`, `y: 0` | Final revealed states. | Keep local animation implementation. | Keep local implementation detail |

## 13. Layout Measurements

| Source file | Value | Purpose | Recommendation | Classification |
| --- | --- | --- | --- | --- |
| `SectionChatV3.tsx` | `relative`, `absolute`, `overflow-visible`, `overflow-hidden` | Layering and clipping for chat, stage, dropdowns. | Keep structural utilities. | Keep local implementation detail |
| `SectionChatV3.tsx` | `right-0`, `top-28`, `sm:top-32`, `lg:right-10`, `z-10` | Approval card placement over the story stage. | Keep local art direction. | Keep local implementation detail |
| `SectionChatV3.tsx` | `left-0`, `top-full`, `z-50` | Dropdown positioning. | Keep local; replace only if dropdown primitive is introduced. | Keep local implementation detail |
| `SectionChatV3.tsx` | `flex`, `flex-wrap`, `items-center`, `flex-1`, `flex-shrink-0`, `hidden md:block` | Chat input and pill layout. | Keep structural Tailwind utilities. | Keep local implementation detail |
| `ResultsTable.tsx` | `grid`, `grid-cols-[1.8fr_0.45fr_0.65fr_1fr]` | Table layout. | Keep local table implementation. | Keep local implementation detail |
| `ApprovalCard.tsx` | `flex flex-wrap` | Approval button wrapping. | Keep structural Tailwind utility. | Keep local implementation detail |
| `ChatSurface.tsx` | `className` composition via `cn` | Allows local surfaces to customize spacing/size. | Keep as local primitive pattern. | Extract into local ChatSurface primitive |

## Summary Recommendations

- Keep most scroll triggers, transforms, SVG geometry, story timing, and overlap placement local. They are specific to the V3 storytelling experiment.
- Promote repeated card styling into `ChatSurface` variants before creating global tokens. The clearest candidates are card radius, border, shadow, and padding sizes.
- Continue using standard Tailwind utilities for common spacing, typography, focus, radius, and layout values where they already match.
- Replace inline gradient-border styling in `SectionChatV3` with a local chat input surface only if V3 moves toward production.
- Do not create new global tokens from this audit yet. The current evidence supports local chat primitives, not design-system-wide abstractions.
