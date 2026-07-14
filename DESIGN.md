# DESIGN.md — Spontaine Website

**The single guiding document for anyone designing or building spontaine.com.**
Consolidates: brand foundations · messaging · information architecture · the arc-stack scroll system · motion · imagery · component inventory · quality floors · open decisions.

**Source-of-truth hierarchy** (when documents disagree, higher wins):

1. `spontaine-design` skill (`readme.md`, `tokens/`, `assets/`) — transcribed from the live site + Figma. **Brand facts live here.**
2. This document — structure, motion, IA, messaging for the rebuild.
3. `Spontaine_Homepage_Copy_v4_Production.md` — exact strings.
4. `Spontaine_Component_Specs.md`, `Spontaine_Design_System.md` — component anatomy. **Note: their color/type tokens are superseded by §1 below.**

---

## 0. What this site is trying to do

Spontaine sells **governed intelligence infrastructure a firm owns**, to CEOs, CFOs, CDOs and senior partners at top-of-mid-tier professional services firms and PE/VC operating teams across Europe. The site's single job is to convert warm, email-sourced traffic into a **30-minute working session** that leads to a **two-week paid proof**.

The current failure mode is measured: ~70% of visitors leave from the homepage. They are not under-informed — they arrived agreeing with the email. They leave because the page does not _show the machine_ and does not _offer a bounded next step_. Every design decision below serves those two fixes.

---

## 1. Brand foundations

### 1.1 Color

**Color palette:** Regenerate `spontaine-tokens.json` against the values below before any further Figma work. The approved PrismHero establishes the current homepage cream surface, green emphasis treatment, and translucent glass support; do not overwrite those approved decisions with earlier planning colors without design review.

| Token               | Hex                                     | Role                                                                                    | Hard rules                                                                                                                      |
| ------------------- | --------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `accent/mint`       | `#45EDA1`                               | Primary brand accent. In-page primary CTAs, active states, highlights, the logo circle. | **Never text on light.** Fill only. Text on it is always `ink/900`.                                                             |
| `accent/lime`       | `#C3FF6E`                               | The single highest-contrast CTA moment — **the nav pill CTA, and nowhere else.**        | Reserving it is what makes it work. One lime element per viewport, maximum.                                                     |
| `accent/ink`        | `#0A7A55` _(candidate — verify ≥4.5:1)_ | The **text-safe** green. Emphasis words in headlines, inline links, eyebrow text.       | Introduced by this document because `#45EDA1` on white is ~1.4:1 and fails at any size. Do not use mint for a letterform, ever. |
| `accent/periwinkle` | `#7776BC`                               | Secondary accent. Gradient bands, illustration.                                         | Never a CTA, never body text. Sparing.                                                                                          |
| `ink/900`           | `#242424`                               | Deepest charcoal. Text on light, scrollytelling backdrop base.                          |                                                                                                                                 |
| `ink/700`           | `#343434`                               | Dark section bands, nav pill, footer.                                                   |                                                                                                                                 |
| `paper`             | `#FFFFFF`                               | Cards, artifacts, light sections.                                                       |                                                                                                                                 |
| `gray/50`           | `#F7F7F7`                               | Very light warm-gray section background.                                                |                                                                                                                                 |
| `gray/100`          | `#F3F4F6`                               | Alternate light band.                                                                   |                                                                                                                                 |
| `cream`             | `#F0EEE4`                               | Warm cream — side panels, deck-style layouts, the hero band.                            |                                                                                                                                 |
| `border/hairline`   | `rgba(0,0,0,0.1)`                       | The default card edge.                                                                  | Prefer this over a shadow.                                                                                                      |

**Text on color, memorized:** dark text on mint. Dark text on lime. White text on charcoal. Nothing else.
**Banned:** blue-purple SaaS gradients. There are none in the source; resist reaching for one. Periwinkle→mint is the one sanctioned gradient band.

**Approved hero color decisions:** PrismHero is the current reference for the homepage cream surface and green emphasis treatment. `surface/cream` is the approved warm hero surface; legacy `cream` remains available for older deck-style layouts. `ink/accent` is approved for large flagship display emphasis after review, while `accent/ink` remains the conservative green choice for smaller text and links that must pass AA contrast. Do not document one-off hero artwork colors as system colors unless they recur in another approved section.

### 1.2 Typography

**Urbanist carries almost everything** — headlines, nav, buttons, body — Light through ExtraBold, with an _italic used to emphasize exactly one word_ inside a headline. Roboto Mono for literal data. Inter Light for fine print only (≤12px legal/cookie). **No serif anywhere in the system.**

| Style             | Face / weight       | Size (desktop → mobile) | Line-height | Tracking           |
| ----------------- | ------------------- | ----------------------- | ----------- | ------------------ |
| `display-2xl`     | Urbanist Bold       | 64 → 36                 | 104%        | −2%                |
| `display-xl`      | Urbanist Bold       | 48 → 32                 | 104%        | −2%                |
| `display-lg`      | Urbanist SemiBold   | 36 → 26                 | 116%        | −2%                |
| `display-md`      | Urbanist SemiBold   | 28 → 24                 | 116%        | 0                  |
| `display-sm`      | Urbanist SemiBold   | 22 → 20                 | 116%        | 0                  |
| `body-lg`         | Urbanist Regular    | 18                      | 160%        | 0                  |
| `body-md`         | Urbanist Regular    | 16                      | 150%        | 0                  |
| `body-sm`         | Urbanist Regular    | 14                      | 150%        | 0                  |
| `label` (eyebrow) | Urbanist SemiBold   | 11–12                   | 120%        | +8%, **uppercase** |
| `mono-data`       | Roboto Mono Regular | 14                      | 140%        | 0                  |
| `fine-print`      | Inter Light         | 12                      | 150%        | 0                  |

**Casing law:** sentence case everywhere — headlines, buttons, nav, card titles. **Never Title Case.** All-caps is permitted _only_ at 11–12px eyebrow scale, where letter-spacing (not size) carries the emphasis.
**Practical note for a designer:** Urbanist is geometric and runs wide. Long paragraphs (the hero subhead, demo artifacts) need 160% line-height and a ≤680px measure or they read airy and loose. Below 14px, switch to Inter Light — that's why the brand already does.

**`display-hero`:** a first-class typography primitive above `display-2xl`, reserved for flagship marketing surfaces that need the approved PrismHero scale and responsive behavior. It is not homepage-namespaced, and it must not be broken into hero-specific breakpoint tokens.

### 1.3 Shape, shadow, border

| Property                                             | Value                                                                                     | Note                                                                                                |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Buttons, nav, chips, badges                          | `border-radius: 9999px`                                                                   | **Always fully rounded pills.** Never a rectangle with a small radius.                              |
| Cards                                                | `24px`                                                                                    | Not 20. Not 8.                                                                                      |
| Small icon controls (chevron, close)                 | `12px`                                                                                    |                                                                                                     |
| Artifacts inside the demo box                        | `12px`                                                                                    | Reads as data, not navigation                                                                       |
| Default card edge                                    | 1px `rgba(0,0,0,0.1)` hairline, or a flat tint                                            | **Most cards carry no shadow at all.** This restraint is why the current site feels calm — keep it. |
| Floating elements (CTA pills, floating cards, modal) | `0 25px 50px -12px rgba(0,0,0,0.25)`                                                      | One soft shadow, used sparingly. No inner glows. No colored shadows.                                |
| Backdrop blur                                        | Only two places: the Windfall "found for you" ticket, and the scrollytelling glass cards. | Always over dark or photographic backdrops. **Never over a plain white section.**                   |
| Section padding                                      | 128px desktop / 64px mobile                                                               | Generous horizontal rhythm                                                                          |
| Nav                                                  | Floating pill with margin on all sides                                                    | The header is **never** a flush full-width bar                                                      |

**Approved glass primitives:** the approved hero promotes subtle glass blur and a restrained inset glass shadow as reusable visual primitives. Use them for translucent bars, glass panels, demo artifacts, and future approved overlays where the background has enough texture to justify glass. Do not use glass as default card styling, and do not add colored glows.

**Hero CTA shape exception:** global buttons remain pills. The approved PrismHero CTA pair uses a compact small-radius shape as an art-directed homepage hero exception. Do not generalize that shape into the global button system unless another approved marketing surface proves the same need.

### 1.4 Motion

The brand's documented motion is deliberately minimal: CSS-transition fades, short vertical transforms, `cubic-bezier` easing at 400–600ms, **no springs, no bounces**. Hover states brighten or dim a fill and lift ~1px.

**How the rebuild extends this without breaking it:** the current site's _absence_ of motion is a limitation, not a value — but its _restraint_ is a value. So the rebuild adds a scroll-choreography layer while obeying the no-bounce law. Overshoot is retuned down from the earlier spec.

| Name        | Definition                                         | Duration | Easing                                             | Used for                                     |
| ----------- | -------------------------------------------------- | -------- | -------------------------------------------------- | -------------------------------------------- |
| `settle`    | `translateY(24px→0)` + opacity                     | 600ms    | `cubic-bezier(.22,1,.36,1)`                        | Every scroll-into-view reveal                |
| `stack`     | `translateY(48px→0)` + `scale(.985→1)` + opacity   | 700ms    | `cubic-bezier(.16,1,.3,1)` — **overshoot removed** | Stack-build layers, demo answer artifacts    |
| `scrub`     | Property mapped 1:1 to scroll progress; reversible | —        | linear against scroll                              | Stack build, arc-stack burial, timeline rail |
| `chip-pop`  | `scale(.9→1)` + opacity                            | 240ms    | `cubic-bezier(.2,.9,.3,1)` — **overshoot capped**  | Chips, toasts, badges                        |
| `crossfade` | Opacity swap, 200ms out / 300ms in, 80ms overlap   | 300ms    | ease-out                                           | Scene changes, tabs, menu panels             |

**Laws:** sibling stagger = 70ms, max 5 items. Reveals fire once (`IntersectionObserver`, threshold .25) — **never re-animate on scroll-up**, that reads as a gimmick. Hover = fill brighten/dim + 1px lift, never a scale. No count-up number animations, anywhere. `prefers-reduced-motion` collapses all five to a 200ms opacity fade and disables the arc-stack and scrolly entirely.

### 1.5 Logo and iconography

**Only white vector available** \* The only clean vector is `spontaine-wordmark-white.svg` (for the dark nav pill). **Never redraw the mark** — not as a diamond, not as a generic glyph. (The interim HTML mockup did exactly this; it is a placeholder, not a licence.)

**There is no icon set.** The site uses certification badge bitmaps, a few plain geometric glyphs, and the dot-matrix mark as a bullet. If more icons are genuinely required, **Lucide (thin stroke, 1.5px)** is the flagged substitute — but the default answer is _no icon_. Trust marks render as **text**, not badges. The one sanctioned decorative glyph is the sparkle **✦**, meaning "AI found this."

### 1.6 Photography and imagery

**Direction:** flat color dominates section backgrounds. Photography appears _only_ for human proof — real, warm, natural-light, never stock-stiff. One abstract macro/refraction image (the prism) is the brand's signature atmosphere.

| Asset                         | Where                                            | Spec                                                                                                                                                              |
| ----------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prism refraction loop**     | Hero                                             | 2560×1440 master; WebM/AV1 ≤1.2MB, 8–10s ambient light-drift; AVIF poster ≤120KB. Motion inside the frame must be _slower_ than scroll. LCP-critical.             |
| **Data-sculpture renders ×7** | Stack build, one per layer                       | 1200×900, transparent bg, ≤80KB each. Consistent ¾-high camera, soft studio light, tokens-only palette. Extends the existing bar-chart/block-stack render family. |
| **Gradient bands**            | Demo section, offer block                        | CSS radial/linear gradients (periwinkle→mint, ice→mint). Never a PNG. Never animated.                                                                             |
| **Founder photograph**        | Founder close **and** the Company megamenu panel | Real: the three founders at a screen, the product visible. Warm, natural light. This is the "no account reps" claim as an image.                                  |

### 1.7 Approved Hero Decisions

- PrismHero is the approved homepage reference implementation and the first production-quality section of the redesign.
- `display-hero` is now part of the typography system, above `display-2xl`, for flagship marketing surfaces.
- Glass blur and the restrained glass inset shadow are approved reusable visual primitives.
- Hero-specific art direction remains local until reuse is demonstrated elsewhere.
- Design-system primitives should be extracted from approved implementations, not invented in advance.

---

## 2. Messaging

### 2.1 Positioning

> **AI capability is commoditized. Every firm has the same tools. The only remaining edge is what only your firm has — its data and its partners' judgment — turned into governed intelligence it owns.**

This is the market insight, and it belongs at the top of every pitch, every email, and the page's architecture. It is _not_ automatically the headline (see §2.3).

**The ladder** (the page walks it; the hero names its destination):
`Governed data (foundation)` → `safe, affordable, scalable AI (lever)` → `always-on insight` → `people elevated to senior-grade work` → `agents automating workflows` → `new revenue`.
Compressed to three load-bearing nouns for the stack build: **Foundation → Insight → Automation.**

**Two audiences, one page.** Professional services is addressed in the hero. PE is named in the eyebrow and routed, one strip below, to `/solutions/private-equity`. Do not average them into one voice.

### 2.2 Voice rules

- Second person, always. The reader owns the problem; Spontaine is the tool, never the hero of the sentence.
- Short, declarative. Rhetorical fragments for punch. **Contrast pairs** are the brand's signature rhythm: _"Not a dashboard problem. It's a trust problem."_
- **Specificity replaces adjectives.** "€3,000 deduction," "3.7M users," "live in two weeks" — never "significant savings," never "blazing fast."
- Microcopy disarms: _"No deck, nothing to sign."_
- **Banned:** exclamation marks. Emoji. Hype verbs (unlock/supercharge/revolutionize). Title Case. Invented numbers. Count-up animations.
- **Every claim must be demonstrable in the working session.** If a future editor can't point to the evidence, the line doesn't ship.

### 2.3 The ownership arc

"Own" appears on the homepage **four times**, each doing different work. Adding a fifth requires removing one.

| #   | Where                                                                                                    | Function             |
| --- | -------------------------------------------------------------------------------------------------------- | -------------------- |
| 1   | Eyebrow — `AI data infrastructure for professional services & private equity firms · Owned, not rented.` | The claim            |
| 2   | Demo caption — _"the smallest unit of owned intelligence"_                                               | The mechanism, shown |
| 3   | Alternatives header — _"…what none of them leaves you owning"_                                           | The contrast         |
| 4   | Offer close — _"That's what owning it means."_                                                           | The cash-out         |

### 2.4 CTA ladder — one verb per funnel stage. Never flatten.

| Verb                                                      | Stage              | Location                  |
| --------------------------------------------------------- | ------------------ | ------------------------- |
| **See** — `See it on your own numbers`                    | Explore            | Hero, demo bridge         |
| **Read** — `Read the architecture brief`                  | Smaller yes        | Hero secondary            |
| **Scope** — `Scope your proof — book the working session` | Commit to defining | Offer block               |
| **Book** — `Book the working session`                     | Close              | Founder close, nav, modal |

**`Book Demo` is retired.** It re-frames the visit as a sales process and contradicts "no deck, nothing to sign" three inches below it. It is also Title Case, which the brand's own casing law forbids.

---

## 3. Information architecture

**Governing rule:** every menu item is a promise of a page. Items render from a config array — **no live `href`, no rendered item.** The menu grows as pages ship. A dead nav link on a site selling governance and precision is disconfirming evidence of the core claim.

```
/                                     Homepage
├── PRODUCT ▾            [2 columns + featured demo loop]
│   ├── PLATFORM:  /product/foundation · /product/intelligence · /product/automation
│   │              ─────  /architecture
│   └── WHO IT'S FOR:  /solutions/professional-services · /solutions/private-equity · /windfall
│                      ─────  /proof
├── RESOURCES ▾         [2 columns + featured latest insight]
│   ├── READ:  /resources/insights · /resources/breakaway-firm · /resources/architecture-brief (PDF)
│   └── WATCH & PROVE:  /resources/film · /resources/pilot-brief (PDF)
│                       ─────  /proof
├── /pricing            [direct link, no panel]
├── COMPANY ▾           [1 column + founder photo & CTA]
│   └── /company/about · /company/contact · /company/trust-centre
└── [CTA] Book the working session → /proof#book
```

**Panels exist only where an item has >1 destination.** Maximum depth is 2.
**Megamenu behavior:** hover with 120ms intent delay (desktop) or click; `settle` @350ms, items stagger 40ms; `crossfade` when switching between panels with animated height; close on Escape / outside click / route change / scroll >120px. Build on **Radix `NavigationMenu`**. <1024px collapses to a full-screen charcoal overlay with accordion columns; <768px becomes a drag-to-dismiss bottom sheet with featured panels dropped entirely.

**Ship order (P0 first):** `/architecture` · `/solutions/private-equity` · `/company/trust-centre` · `/proof` → then `/pricing` (**currently a dead link**), `/resources/*`, `/company/*` → then the three platform pages and `/windfall`.

---

## 4. The page system

### 4.1 The arc motif

The shallow single-arc SVG divider is the brand's most recognizable structural device. In the rebuild it is **promoted from a divider to the page's scroll behavior.**

Every section is a physical sheet whose top edge is a concave arc. Height **64px desktop / 32px mobile**, full-bleed, filled with **its own** surface color, rendered as the section's first child with `margin-top: -64px` so it overlaps the sheet beneath. Under-arc shadow `0 -16px 40px rgba(0,0,0,0.10)` (`0.35` on dark) provides the paper-over-paper depth cue. Section backgrounds must be fully opaque.

### 4.2 Arc-stack scroll behavior

On scroll, the incoming sheet slides up and **buries** the previous one, which pins in place and recedes.

- Standard sections: `position: sticky; top: 0`, `z-index` incrementing down the page.
- **Two exemptions:** the stack-build section (it runs its own 350vh internal sticky stage — a sticky-within-sticky pins forever) and the footer (nothing buries it). Both behave as normal incoming sheets.
- **Burial treatment**, driven by the _incoming_ section's scroll progress and applied to the outgoing section's inner wrapper (never the sticky element itself — transforms on sticky elements break pinning):
  `scale 1 → 0.985` · `brightness 1 → 0.92` · `translateY 0 → 24px`
  Hero's brightness floor is capped at `0.94` so the prism's highlights don't crush.
- **Budget:** only the currently-burying pair carries live transforms. Sections ≥2 deep freeze at their final buried values via a one-time class swap. Two animated compositing layers, maximum.
- **Guards:** reduced motion → normal document flow, arcs survive as geometry, theater does not. Mobile → keep the stack, halve the drift, drop the brightness ramp (OLED banding). Anchor links must target the sticky container, not inner content, or they land half-buried. DOM order is unchanged, so tab order and crawlers are unaffected. CLS must be 0 — reserve the arc's space in the parent.

### 4.3 Scroll choreography, by section

| Section              | Motion                                                                                                                                                                                                                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero                 | Load sequence: eyebrow → headline → subhead → CTA row → micro, `settle` at 90ms steps, <1.1s total. Media fades in 200ms _after_ headline paint. Parallax 0.85× — if the viewer notices it, it's too strong.                                                                                          |
| Demo box             | Autoplay at ≥50% in viewport; pause on hover/focus (a paused demo invites inspection). Typing 34ms/char ±jitter. Honest 1.2–1.8s "reconciling" latency — instant answers read as fiction to a CDO. Artifact `stack`; rows stagger 70ms; governance chips `chip-pop` _after_ the artifact settles.     |
| Proof strip          | Slots `settle` stagger 70ms; quote +200ms. **No count-ups.**                                                                                                                                                                                                                                          |
| Recognition band     | One `settle`, slowed to 800ms. The line should _arrive_, not appear.                                                                                                                                                                                                                                  |
| Case timeline        | Rail draws left→right via `scaleX` scrub; stamps `settle` as the line reaches each.                                                                                                                                                                                                                   |
| Stack build          | `scrub` across 3.5 viewport-heights, **mapped to** scroll, never capturing it — flick velocity passes through unresisted. Layers `stack`; previous cards recede (−6px, 94% brightness). Act headers `crossfade` at act boundaries. Final frame pulls back to 0.82 scale; four trust chips `chip-pop`. |
| Alternatives / Offer | `settle` stagger 70ms. No hover lift (cards aren't links).                                                                                                                                                                                                                                            |
| Founder close        | `settle` at 90ms steps — the same rhythm as the hero load. A deliberate bookend.                                                                                                                                                                                                                      |

---

## 5. Homepage anatomy

| #   | Section                                     | Surface                          | Arc-stack role                          | Imagery                      |
| --- | ------------------------------------------- | -------------------------------- | --------------------------------------- | ---------------------------- |
| 1   | Hero (+ router strip merged into its sheet) | cream                            | Sticky, first buried                    | Prism loop                   |
| 2   | Live demo box                               | cream → mint gradient            | Sticky                                  | Coded UI, no imagery         |
| 3   | Proof strip                                 | charcoal `ink/700`               | Sticky                                  | —                            |
| 4   | Recognition band                            | cream                            | Sticky                                  | —                            |
| 5   | Case timeline                               | white                            | Sticky                                  | Optional faint arc watermark |
| 6   | Stack build (7 layers, 3 acts)              | `ink/900` → teal-tinted gradient | **Exempt**                              | 7 sculpture renders          |
| 7   | Alternatives                                | cream                            | Sticky                                  | —                            |
| 8   | Offer + pricing modal + trust bar           | ice → mint gradient              | Sticky                                  | —                            |
| 9   | Founder close                               | charcoal                         | Sticky                                  | Founder photograph           |
| 10  | Footer                                      | charcoal                         | **Exempt** — no arc, continuous with §9 | —                            |

Band rhythm: no two dark sheets adjacent, except the intentional founder-close→footer merge.

---

## 6. Component inventory

**Typography and effect primitives established by the approved hero:** `display-hero` · glass blur treatment · restrained glass inset shadow.

**Primitives:** `Button` (primary/dark/accent/outline/ghost × 3 sizes, all pills) · `Badge`/`Eyebrow` · `Chip` (governance, 12px radius) · `FilterChip` · `IconButton` (40×40 circle) · `Card` (24px) · `Input`/`Textarea`/`Select` · `Stamp` (mono) · `SkeletonLine` · `SectionDivider` (the arc) · `Logo`.

**Compounds:** `InfoCard` (+`CardTriplet`) · `StatCallout` · `PullQuote` · `TimeStamp` + rail · `PathStep` · `GlassPanel` (the _only_ glass implementation — scrolly cards, pricing modal, Windfall ticket) · `ModalShell` (Radix Dialog + animated exit) · `ChatInput`.

**Sections:** `SectionBand` (surface + arc + `stackRole: sticky | exempt | merged`) · `PillNav` + `MegaMenu` · `PrismHero` · `RouterStrip` · `LiveDemoBox` (scene engine) · `ProofStrip` · `RecognitionBand` · `TimelineCase` · `StackScrolly` · `OfferBlock` + `PricingModal` + `TrustBar` · `FounderClose` · `Footer`.

**The system's test:** the PE page assembles from **zero net-new components.** Every future page must pass the same test or justify the exception in review.

**Library stack:** `motion` (motion.dev) · Radix UI (headless a11y) · `sonner` (toasts) · `vaul` (mobile sheets) · `cva` + `tailwind-merge` · self-hosted fonts (**not** the Google Fonts CDN — the EU data-transfer optics matter to this exact audience).

---

## 7. Quality floors

- **Contrast:** mint and lime are fills, never letterforms. Verify every green text instance against `accent/ink`. Dark text on both greens. White on charcoal.
- **Touch targets** ≥44px. **Focus ring**: 3px `accent/mint`, 3px offset, never removed.
- **Reduced motion** is specified at the motion-vocabulary level so no component can forget it. The demo box degrades to a static frame + explicit "Play demo"; its `aria-live` scene summaries are the _complete_ experience for those users — write them as standalone sentences.
- **Performance:** hero LCP ≤2.5s (poster-backed media, fonts preloaded, demo box lazy below fold). Above-fold imagery ≤300KB. Scrolly at 60fps under 6× CPU throttle — only the top 3 glass cards carry live `backdrop-filter`; lower cards use pre-flattened rgba. Scroll-linked values use MotionValues, never React state.
- **Governance:** hardcoded hex or px in a component = PR blocker. Animation values outside the motion vocabulary = PR blocker. Menu items without live hrefs are unrendered.

---

## 8. Open decisions

| #   | Decision                                                                                                                                                         | Blocking?                           |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 1   | Week number — **two** vs four. Appears in hero, case block ×3, offer header.                                                                                     | **Yes — one number, five places**   |
| 2   | Proof price €X (recommended: €10,000, visible on the page) and license anchor €Y                                                                                 | **Yes**                             |
| 3   | ISO 27001 — certified, or "certification underway"? Binary; must be true.                                                                                        | **Yes**                             |
| 4   | "Your data never trains anyone's models" — verify contractually across model providers, or cut the clause                                                        | **Yes**                             |
| 5   | Newtone consent bundle (Julia/Elmar): proof-strip wording, timeline facts, usage stat, one-pager                                                                 | **Yes**                             |
| 6   | "Semantic layer" vs "Wisdom layer" — recommend semantic externally, wisdom in product UI                                                                         | Yes, once, globally                 |
| 7   | Headline A/B: `Run every engagement like it's your biggest` vs `Own your intelligence` — test in email (volume), not on-site (too few visitors for significance) | No — A ships, slot is config-driven |
| 8   | Regenerate `spontaine-tokens.json` against §1 (mint, Urbanist, 24px, retuned easings)                                                                            | **Yes — before further Figma work** |
| 9   | Prism hero loop asset — does not exist yet, LCP-critical path                                                                                                    | **Yes**                             |
| 10  | Windfall "show working" detail — needs a real, defensible example; it will be quoted back on sales calls                                                         | Yes                                 |

---

## 9. Approved Hero Decisions

PrismHero is the approved homepage hero and the first production-quality reference section for the redesign. It supersedes the earlier hero critique in this document.

### Approved decisions

- The hero remains a custom homepage component, not a PageBuilder block.
- The prism media, left-led content, CTA pair, microcopy, and router strip form the approved hero composition.
- `display-hero` is a reusable typography primitive above `display-2xl`, intended for flagship marketing surfaces.
- Glass blur and the restrained inset glass shadow are reusable visual primitives.
- Hero-specific art direction stays local until reuse is proven by another approved section.

### Token extraction philosophy

- Prefer existing Tailwind utilities first when they preserve the approved design.
- Promote reusable design decisions into the design system.
- Keep art-directed values local until reuse is proven.
- Do not create tokens solely because a value exists.

### Guardrails

- Do not copy hero-specific widths, heights, media offsets, or CTA dimensions into global tokens.
- Do not rewrite future homepage sections from this hero alone.
- Do not use implementation measurements in this document as a substitute for approved design decisions.
