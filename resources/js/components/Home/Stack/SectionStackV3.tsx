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

const stackCards: StackCardData[] = [
  {
    label: 'Connectors',
    title: 'Connect any source, from anywhere.',
    description: [
      'Spontaine plugs into your data systems in-place, and runs automatically so your processes are untouched. Nothing to replace, nothing to reconfigure.',
      'And unlike enterprise vendors, you are not locked in to any one stack or limited by a set of supported connectors.',
    ],
    artwork: 'connectors',
  },
  {
    label: 'Meaning',
    title: 'Knows your business, not just your data',
    description: [
      "Spontaine doesn't just know what a number means. It knows what it means for you - your org structure, how you operate, what you're actually trying to achieve. That context shapes the answer, not just the definition behind it.",
      "Ask a nuanced question, get an answer built to be acted on, with the logical next question already suggested. Insight doesn't dead-end at the first answer.",
    ],
    artwork: 'meaning',
  },
  {
    label: 'Answers',
    title: "Answers built for who's asking",
    description: [
      'A partner and an associate ask "what\'s our margin on this account," and each gets exactly what they are looking for.',
      "Context isn't just what's being asked. It's also who's asking.",
      'Every answer carries its own reasoning and traces straight back to the source data behind it.',
    ],
    artwork: 'answers',
    titleTone: 'green',
  },
  {
    label: 'Persistence',
    title: 'Generated once and staying alive.',
    description: [
      "A Persistent Block isn't a frozen snapshot - generated once, pulls data and stays interactive forever. Filter it, drill into it, explore it independently, without asking the AI again.",
      'AI inference runs down toward the minimum as use expands.',
    ],
    artwork: 'persistence',
    titleTone: 'green',
  },
  {
    label: 'Safety',
    title: 'Safe by architecture, not by policy.',
    description: [
      'AI never sees your raw data. Only its shape. Anything sensitive - names, IDs - gets pseudonymised before the model sees it, and the AI has no ability to submit queries to your database directly.',
      'Every answer traces back to what produced it. Safe to run at scale, not just safe in a demo.',
    ],
    artwork: 'safety',
    compactRightPadding: true,
  },
  {
    label: 'New IP',
    title: 'Your platform. Your IP. Your revenue.',
    description: [
      'Codified skills and persistent endpoints remove the real barrier to productising a service line: the build cost.',
      "Connected workflows and automated actions get easier to assemble, and each one keeps uncovering value long after it's built.",
      "Spontaine's core runs inside your perimeter. Everything built on top of it is yours - new IP, not a vendor's feature you're renting.",
    ],
    artwork: 'new-ip',
    titleTone: 'green',
    compactRightPadding: true,
  },
]

const stackStep = 1 / (stackCards.length + 1)
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
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
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
    const setProgress = gsap.quickSetter(progressBar, 'scaleX') as (value: number) => void
    const getStackOffset = (index: number) => {
      const offset = figmaStackOffsets[index] ?? figmaStackOffsets[figmaStackOffsets.length - 1]
      const isNarrow = window.matchMedia('(max-width: 767px)').matches

      return {
        x: isNarrow ? 0 : offset.x,
        y: offset.y,
      }
    }

    const setters = cards.map((card, index) => {
      gsap.set(card, {
        transformOrigin: '50% 50%',
        zIndex: index + 1,
      })

      return {
        opacity: gsap.quickSetter(card, 'autoAlpha') as (value: number) => void,
        scale: gsap.quickSetter(card, 'scale') as (value: number) => void,
        x: gsap.quickSetter(card, 'x', 'px') as (value: number) => void,
        y: gsap.quickSetter(card, 'y', 'px') as (value: number) => void,
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
          setter.x(stackOffset.x)
          setter.y(stackOffset.y)
          setter.scale(1)
          setter.setPointerEvents(index === nextCurrentCard ? 'auto' : 'none')
          return
        }

        setter.opacity(0)
        setter.x(0)
        setter.y(hiddenCardOffset)
        setter.scale(0.98)
        setter.setPointerEvents('none')
      })

      setProgress(progress)

      if (nextCurrentCard !== currentCardRef.current) {
        currentCardRef.current = nextCurrentCard
        setCurrentCard(nextCurrentCard)
      }
    }

    updateStack(0)

    const trigger = ScrollTrigger.create({
      trigger: stackStage,
      start: 'bottom bottom',
      end: '+=450%',
      pin: section,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => updateStack(self.progress),
    })
    scrollTriggerRef.current = trigger

    return () => {
      trigger.kill()
      scrollTriggerRef.current = null
      gsap.killTweensOf([progressBar, ...cards])
    }
  }, [prefersReducedMotion])

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
      ref={sectionRef}
      className='bg-spontaine-surface-paper relative overflow-hidden py-[110px] lg:py-[142px]'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='mx-auto flex w-full max-w-[1060px] flex-col items-center'>
          <div className='mx-auto max-w-[820px] text-center'>
            <p className='eyebrow mb-5 text-spontaine-gray-cool'>THE SHAPE OF GOVERNANCE</p>

            <h2 className='display-xl text-spontaine-dark'>
              Governance is not a policy.
              <br />
              <span className='display-xl text-spontaine-text-accent-dark'>
                It is the shape of the system.
              </span>
            </h2>

            <p className='body-lg mx-auto mt-5 max-w-[690px] font-body text-spontaine-gray-muted'>
              A Lens defines a business concept once: the data it can use, the measures it exposes,
              the context it needs, and the limits that protect it. Every dashboard, Block,
              endpoint, workflow, and AI interaction works from that same contract.
            </p>
          </div>

          <div className='mt-[58px] grid w-full grid-cols-1 gap-8 lg:grid-cols-[104px_minmax(0,1fr)] lg:items-start lg:gap-3 xl:gap-4'>
            <div className='flex flex-wrap justify-center gap-3 lg:flex-col lg:justify-start lg:gap-7 lg:pt-1'>
              {stackCards.map((card, index) => (
                <button
                  type='button'
                  key={card.label}
                  aria-current={index === currentCard ? 'step' : undefined}
                  aria-label={`Show ${card.label}`}
                  onClick={() => goToCard(index)}
                  className={[
                    'hover:bg-spontaine-surface-ice/55 group -mx-2 flex items-center gap-3 rounded-[var(--radius-pill)] border-0 bg-transparent px-2 py-1 text-left font-mono text-xs transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spontaine-accent-dark',
                    index === currentCard
                      ? 'text-spontaine-text-primary font-semibold'
                      : 'hover:text-spontaine-text-primary font-normal text-spontaine-gray-muted',
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
                  className='relative min-h-[500px] w-full max-w-[730px] overflow-hidden sm:min-h-[560px] md:-ml-6 md:-mr-12 md:w-[calc(100%+4.5rem)] md:max-w-[calc(730px+4.5rem)] md:pl-6 md:pr-12 lg:-ml-8 lg:-mr-14 lg:w-[calc(100%+5.5rem)] lg:max-w-[calc(730px+5.5rem)] lg:pl-8 lg:pr-14 xl:-mr-16 xl:w-[calc(100%+6rem)] xl:max-w-[calc(730px+6rem)] xl:pr-16'
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
        'border-spontaine-border-glass-edge relative flex flex-row gap-7 overflow-hidden rounded-[var(--radius-panel)] border px-6 py-5 shadow-surface sm:px-8 md:flex-row md:items-center md:gap-8',
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
            'text-spontaine-text-primary mt-4 space-y-4 font-body text-[0.82rem] leading-[1.58] transition-opacity duration-300',
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
