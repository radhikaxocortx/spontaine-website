import { useStackUp } from '@/hooks/useStackUp'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { StackArtwork, type StackArtworkKind } from './SectionCardStackArtworkV3'

gsap.registerPlugin(ScrollTrigger)

interface StackCardData {
  readonly label: string
  readonly title: string
  readonly description: readonly string[]
  readonly artwork: StackArtworkKind
  readonly titleTone?: 'default' | 'green'
  readonly compactRightPadding?: boolean
}

// Card copy stays under 30 words so the card never grows beside its artwork.
const stackCards: StackCardData[] = [
  {
    label: 'Connect',
    title: 'Plug into any stack, in place.',
    description: [
      'Connect legacy ERPs, shop-floor PLCs, time and billing tools, CRMs and spreadsheets with zero migration or operational downtime.',
    ],
    artwork: 'connectors',
  },
  {
    label: 'Reconcile',
    title: 'One shared definition of truth.',
    description: [
      'Codify how your business calculates true margin, OTIF and utilisation once, and end conflicting numbers across sites and offices.',
    ],
    artwork: 'meaning',
  },
  {
    label: 'Decide',
    title: 'Role-aware answers with full lineage.',
    description: [
      'Give plant directors, managing partners and CFOs live answers traced straight back to source records, with no analyst bottleneck.',
    ],
    artwork: 'answers',
    titleTone: 'green',
  },
  {
    label: 'Automate',
    title: 'Turn questions into daily workflows.',
    description: [
      'Save any verified logic as a live endpoint that triggers alerts, updates CRM records or flags margin drift automatically.',
    ],
    artwork: 'persistence',
    titleTone: 'green',
  },
  {
    label: 'Protect',
    title: 'Sovereign security by architecture.',
    description: [
      'Sensitive pricing, part tolerances and client records are pseudonymised before AI touches them, hosted strictly in your chosen region.',
    ],
    artwork: 'safety',
    compactRightPadding: true,
  },
  {
    label: 'Monetize',
    title: 'Turn internal data into customer IP.',
    description: [
      'Publish governed order tracking, quality certificates or client benchmarks through secure portals and APIs that lock in renewals.',
    ],
    artwork: 'new-ip',
    titleTone: 'green',
    compactRightPadding: true,
  },
]

const stackStep = 1 / (stackCards.length + 1)

/** Free space (px) the pinned section needs above and below before it is centred on screen. */
const PIN_MIN_ROOM = 32

/** The Navbar reads this attribute and slides out of view while it is set. */
const setNavHidden = (hidden: boolean) =>
  document.documentElement.toggleAttribute('data-nav-hidden', hidden)
const stackRevealWindow = stackStep * 1.75
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const figmaStackOffsets = [
  { x: 0, y: 0 },
  { x: 8, y: 32 },
  { x: 16, y: 64 },
  { x: 24, y: 96 },
  { x: 32, y: 128 },
  { x: 40, y: 160 },
] as const

export default function SectionStackV3() {
  const sectionRef = useRef<HTMLElement | null>(null)
  // This band is pinned by ScrollTrigger, so only its intro stacks up.
  const introRef = useStackUp<HTMLDivElement>({ moveBand: false })
  const stackStageRef = useRef<HTMLDivElement | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const currentCardRef = useRef(0)
  const [currentCard, setCurrentCard] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePreference)
    } else {
      mediaQuery.addListener(updatePreference)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updatePreference)
      } else {
        mediaQuery.removeListener(updatePreference)
      }
    }
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) {
      return
    }

    const section = sectionRef.current
    const stackStage = stackStageRef.current
    const progressBar = progressBarRef.current
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    if (!section || !stackStage || !progressBar || cards.length !== stackCards.length) {
      return
    }

    const hiddenCardOffset = Math.max(stackStage.offsetHeight + 120, window.innerHeight * 0.72)
    const setProgress = (value: number) => {
      progressBar.style.transform = `scaleX(${value})`
    }
    const getStackOffset = (index: number) => {
      const offset = figmaStackOffsets[index] ?? figmaStackOffsets[figmaStackOffsets.length - 1]
      const isNarrow = window.matchMedia('(max-width: 767px)').matches

      return {
        x: isNarrow ? 0 : offset.x,
        y: offset.y,
      }
    }

    const setters = cards.map((card, index) => {
      const transformState = {
        scale: 1,
        x: 0,
        y: 0,
      }

      const applyTransform = () => {
        card.style.transform = `translate3d(${transformState.x}px, ${transformState.y}px, 0) scale(${transformState.scale})`
      }

      card.style.transformOrigin = '50% 50%'
      card.style.zIndex = String(index + 1)

      return {
        opacity: gsap.quickSetter(card, 'opacity') as (value: number) => void,
        setTransform: (x: number, y: number, scale: number) => {
          transformState.x = x
          transformState.y = y
          transformState.scale = scale
          applyTransform()
        },
        setVisibility: (value: 'visible' | 'hidden') => {
          card.style.visibility = value
        },
        setPointerEvents: (value: 'auto' | 'none') => {
          card.style.pointerEvents = value
        },
      }
    })

    const updateStack = (progress: number) => {
      let nextCurrentCard = 0
      stackCards.forEach((_, index) => {
        const start = index * stackStep
        const layerProgress = clamp((progress - start) / stackRevealWindow, 0, 1)

        if (layerProgress > 0.5) {
          nextCurrentCard = index
        }

        return layerProgress
      })

      setters.forEach((setter, index) => {
        if (index <= nextCurrentCard) {
          const depth = nextCurrentCard - index
          const stackOffset = getStackOffset(index)

          setter.opacity(index === nextCurrentCard ? 1 : clamp(0.78 - depth * 0.04, 0.65, 0.78))
          setter.setTransform(stackOffset.x, stackOffset.y, 1)
          setter.setVisibility('visible')
          setter.setPointerEvents(index === nextCurrentCard ? 'auto' : 'none')
          return
        }

        setter.opacity(0)
        setter.setTransform(0, hiddenCardOffset, 0.98)
        setter.setVisibility('hidden')
        setter.setPointerEvents('none')
      })

      setProgress(progress)

      if (nextCurrentCard !== currentCardRef.current) {
        currentCardRef.current = nextCurrentCard
        setCurrentCard(nextCurrentCard)
      }
    }

    updateStack(0)

    // Where the pin starts, re-measured on every refresh. When the intro and cards fit on
    // screen (the menu bar is hidden while pinned), centre them so the title is never cut
    // off; otherwise keep the cards fully in view, as before.
    const getPinStart = () => {
      const intro = introRef.current
      const sectionTop = section.getBoundingClientRect().top
      const stageBottom = stackStage.getBoundingClientRect().bottom - sectionTop

      if (intro) {
        const introTop = intro.getBoundingClientRect().top - sectionTop
        const room = window.innerHeight - (stageBottom - introTop)

        if (room >= PIN_MIN_ROOM) {
          return `top+=${Math.round(introTop - room / 2)} top`
        }
      }

      return `top+=${Math.round(stageBottom - window.innerHeight)} top`
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: getPinStart,
      // Phones get a shorter pin (about half a screen per card) so it never feels like a scroll trap.
      // A function, so ScrollTrigger re-reads it on every refresh (e.g. after rotation).
      end: () => (window.matchMedia('(max-width: 767px)').matches ? '+=300%' : '+=450%'),
      pin: section,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => updateStack(self.progress),
      // Slide the fixed menu bar away while the section is pinned, so it never covers the title.
      onToggle: (self) => setNavHidden(self.isActive),
    })
    scrollTriggerRef.current = trigger

    return () => {
      setNavHidden(false)
      trigger.kill()
      scrollTriggerRef.current = null
      gsap.killTweensOf([progressBar, ...cards])
    }
  }, [prefersReducedMotion, introRef])

  const goToCard = (index: number) => {
    const boundedIndex = clamp(index, 0, stackCards.length - 1)
    const targetProgress = clamp(boundedIndex * stackStep + stackRevealWindow * 0.55, 0, 1)
    const trigger = scrollTriggerRef.current

    if (!trigger) {
      currentCardRef.current = boundedIndex
      setCurrentCard(boundedIndex)
      return
    }

    const targetScroll = trigger.start + (trigger.end - trigger.start) * targetProgress

    window.scrollTo({
      top: targetScroll,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section
      id='architecture'
      ref={sectionRef}
      className='relative z-20 overflow-hidden rounded-t-section-sm bg-spontaine-surface-paper pb-[110px] pt-[142px] md:rounded-t-section-md md:pt-[150px] lg:rounded-t-section-lg lg:pb-[142px] lg:pt-[178px] xl:rounded-t-section-xl xl:pt-[190px]'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='mx-auto flex w-full max-w-[1060px] flex-col items-center'>
          <div
            ref={introRef}
            className='mx-auto max-w-[820px] text-center'
          >
            <p
              data-stack-item
              className='eyebrow mb-5 text-spontaine-gray-cool'
            >
              How it works in place
            </p>

            <h2
              data-stack-item
              className='display-xl text-balance text-spontaine-dark'
            >
              One governed layer
              <br />
              <span className='display-xl text-spontaine-text-accent-dark'>
                across every system you run.
              </span>
            </h2>
          </div>

          <div className='mt-[58px] grid w-full grid-cols-1 gap-8 lg:grid-cols-[104px_minmax(0,1fr)] lg:items-start lg:gap-3 xl:gap-4 [@media(max-height:780px)]:mt-10'>
            <div className='flex flex-wrap justify-center gap-3 lg:flex-col lg:justify-start lg:gap-7 lg:pt-1'>
              {stackCards.map((card, index) => (
                <button
                  type='button'
                  key={card.label}
                  aria-current={index === currentCard ? 'step' : undefined}
                  aria-label={`Show ${card.label}`}
                  onClick={() => goToCard(index)}
                  className={[
                    'group -mx-2 flex items-center gap-3 rounded-[var(--radius-pill)] border-0 bg-transparent px-2 py-1 text-left font-mono text-xs transition-colors duration-200 hover:bg-spontaine-surface-ice/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spontaine-accent-dark',
                    index === currentCard
                      ? 'font-semibold text-spontaine-text-primary'
                      : 'font-normal text-spontaine-gray-muted hover:text-spontaine-text-primary',
                  ].join(' ')}
                >
                  <span
                    aria-hidden='true'
                    className={[
                      'h-2 w-2 shrink-0 rounded-full transition-all duration-200 group-hover:scale-125',
                      index === currentCard
                        ? 'bg-spontaine-accent'
                        : 'bg-spontaine-surface-muted group-hover:bg-spontaine-accent/60',
                    ].join(' ')}
                  />
                  <span className='leading-[inherit] text-[inherit]'>{card.label}</span>
                </button>
              ))}
            </div>

            <div className='flex min-w-0 flex-col items-center'>
              {prefersReducedMotion ? (
                <div className='flex w-full max-w-[750px] flex-col items-center'>
                  <div className='grid w-full gap-5'>
                    {stackCards.map((card) => (
                      <StackCard
                        key={card.label}
                        card={card}
                        isActive
                      />
                    ))}
                  </div>

                  <div className='bg-spontaine-surface-muted mt-14 h-1 w-full max-w-[310px] overflow-hidden rounded-full'>
                    <div
                      ref={progressBarRef}
                      className='h-full origin-left scale-x-100 rounded-full bg-spontaine-accent'
                    />
                  </div>
                </div>
              ) : (
                <div
                  ref={stackStageRef}
                  className='relative min-h-[500px] w-full max-w-[730px] overflow-hidden sm:min-h-[560px] md:-ml-6 md:-mr-12 md:w-[calc(100%+4.5rem)] md:max-w-[calc(730px+4.5rem)] md:pl-6 md:pr-12 lg:-ml-8 lg:-mr-14 lg:w-[calc(100%+5.5rem)] lg:max-w-[calc(730px+5.5rem)] lg:pl-8 lg:pr-14 xl:-mr-16 xl:w-[calc(100%+6rem)] xl:max-w-[calc(730px+6rem)] xl:pr-16 sm:[@media(max-height:780px)]:min-h-[500px]'
                >
                  <div className='absolute inset-x-0 bottom-14 top-0 overflow-visible md:left-6 md:right-12 lg:left-8 lg:right-14 xl:right-16'>
                    {stackCards.map((card, index) => (
                      <div
                        key={card.label}
                        ref={(node) => {
                          cardRefs.current[index] = node
                        }}
                        className='absolute inset-0'
                      >
                        <StackCard
                          card={card}
                          isActive={index === currentCard}
                        />
                      </div>
                    ))}
                  </div>

                  <div className='bg-spontaine-surface-muted absolute bottom-6 left-1/2 z-20 h-[5px] w-full max-w-[310px] -translate-x-1/2 overflow-hidden rounded-[var(--radius-pill)]'>
                    <div
                      ref={progressBarRef}
                      className='h-full origin-left scale-x-0 rounded-full bg-spontaine-accent'
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StackCard({
  card,
  isActive,
}: {
  readonly card: StackCardData
  readonly isActive: boolean
}) {
  return (
    <article
      className={[
        'relative flex flex-row gap-7 overflow-hidden rounded-[var(--radius-panel)] border border-spontaine-border-glass-edge px-6 py-5 shadow-surface sm:px-8 md:flex-row md:items-center md:gap-8',
        isActive ? 'bg-spontaine-surface-ice/90' : 'bg-spontaine-surface-ice/35 shadow-none',
        card.compactRightPadding ? 'md:pr-8' : 'md:pr-12',
      ].join(' ')}
    >
      <div className='relative z-10 min-w-0 flex-1'>
        <h3
          className={[
            'font-display text-[1.03rem] font-semibold leading-[1.18] tracking-[-0.025em] transition-colors duration-300',
            isActive
              ? card.titleTone === 'green'
                ? 'text-spontaine-text-accent-dark'
                : 'text-spontaine-text-primary'
              : 'text-spontaine-text-primary/70',
          ].join(' ')}
        >
          {card.title}
        </h3>
        <div
          className={[
            'mt-4 space-y-4 font-body text-[0.82rem] leading-[1.58] text-spontaine-text-primary transition-opacity duration-300',
            isActive ? 'opacity-100' : 'hidden',
          ].join(' ')}
        >
          {card.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div
        className={[
          'hidden h-[180px] w-[190px] shrink-0 items-center justify-center self-center transition-all duration-300 md:flex md:h-[205px] md:w-[206px]',
          isActive ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-25 blur-lg',
        ].join(' ')}
      >
        <StackArtwork artwork={card.artwork} />
      </div>
    </article>
  )
}
