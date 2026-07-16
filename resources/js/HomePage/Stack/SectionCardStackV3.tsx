import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import { StackArtwork, type StackArtworkKind } from './SectionStackV3'

interface StackCardData {
  readonly label: string
  readonly title: string
  readonly description: readonly string[]
  readonly artwork: StackArtworkKind
  readonly titleTone?: 'default' | 'green'
}

const stackCards: StackCardData[] = [
  {
    label: 'Connectors',
    title: 'Connect any source, from anywhere.',
    description: [
      'Spontaine plugs into your data systems in-place, and runs automatically so your processes are untouched. Nothing to replace, nothing to reconfigure.',
      "And unlike enterprise vendors, you're not locked in to any one stack or limited by a set of supported connectors.",
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
    label: "Answers built for who's asking",
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
  },
]

const trustChips = ['Pseudonymised', 'Traceable', 'In-place', 'Yours']

const getCardProgress = (progress: number, index: number) => {
  const current = progress * (stackCards.length - 1)

  return current - index
}

export default function SectionCardStackV3() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })

  const progressScale = useTransform(scrollYProgress, [0, 1], [0.04, 1])
  const stageScale = useTransform(scrollYProgress, [0, 0.82, 1], [1, 1, 0.82])
  const stageY = useTransform(scrollYProgress, [0.82, 1], [0, -16])
  const chipOpacity = useTransform(scrollYProgress, [0.84, 0.92], [0, 1])
  const chipY = useTransform(scrollYProgress, [0.84, 0.92], [14, 0])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.min(
      stackCards.length - 1,
      Math.max(0, Math.round(latest * (stackCards.length - 1)))
    )

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex))
  })

  if (prefersReducedMotion) {
    return <ReducedMotionStack />
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby='stack-legora-title'
      className='relative bg-white pb-10'
    >
      <div className='py-20 sm:py-24 lg:pb-2 lg:pt-28'>
        <AppLayoutPadding>
          <div className='mx-auto w-full max-w-[1224px]'>
            <p className='font-mono text-xs font-semibold uppercase tracking-[0.18em] text-spontaine-accent'>
              Governed AI inference
            </p>
            <h2
              id='stack-legora-title'
              className='mt-4 max-w-5xl font-display text-2xl font-bold leading-tight text-spontaine-ink-soft sm:text-3xl lg:text-4xl'
            >
              Governed data and safe AI inference from what you already own.
            </h2>
            <p className='text-spontaine-ink-normal/75 mt-5 max-w-3xl font-body text-lg leading-8'>
              Connect your sources, preserve your context, and turn governed data into safe AI
              workflows without replacing the systems you already use.
            </p>
          </div>
        </AppLayoutPadding>
      </div>

      <div
        ref={sceneRef}
        className='relative h-[320vh] pb-10 lg:h-[340vh]'
      >
        <div className='sticky top-[92px] flex min-h-[calc(100vh-92px)] items-center sm:top-[104px] sm:min-h-[calc(100vh-104px)] lg:top-[112px] lg:min-h-[calc(100vh-112px)]'>
          <AppLayoutPadding>
            <div className='mx-auto grid w-full max-w-[1224px] gap-10 pb-20 sm:pb-24 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center lg:gap-12 lg:pb-0'>
              <nav
                className='hidden gap-3 lg:flex lg:flex-col'
                aria-label='Governed AI stack'
              >
                {stackCards.map((card, index) => (
                  <button
                    key={card.label}
                    type='button'
                    onClick={() => {
                      const scene = sceneRef.current

                      if (!scene) {
                        return
                      }

                      const rect = scene.getBoundingClientRect()
                      const maxScroll = scene.offsetHeight - window.innerHeight
                      const targetProgress = index / (stackCards.length - 1)

                      window.scrollTo({
                        top: window.scrollY + rect.top + maxScroll * targetProgress,
                        behavior: 'smooth',
                      })
                    }}
                    className={[
                      'group flex min-h-11 items-center gap-3 rounded-md text-left font-mono text-xs transition-colors',
                      index === activeIndex
                        ? 'text-spontaine-ink-soft'
                        : 'text-spontaine-ink-normal/45 hover:text-spontaine-ink-normal',
                    ].join(' ')}
                    aria-current={index === activeIndex ? 'step' : undefined}
                  >
                    <span
                      aria-hidden='true'
                      className={[
                        'h-2.5 w-2.5 rounded-full transition-colors',
                        index === activeIndex ? 'bg-spontaine-accent' : 'bg-spontaine-bright-gray',
                      ].join(' ')}
                    />
                    <span>{card.label}</span>
                  </button>
                ))}
              </nav>

              <div className='hidden lg:block'>
                <motion.div
                  className='relative ml-auto flex h-[clamp(560px,calc(100vh_-_176px),680px)] w-full max-w-[860px] flex-col justify-center'
                  style={{ scale: stageScale, y: stageY }}
                >
                  <div className='absolute inset-x-0 bottom-20 top-8 rounded-[32px] bg-[#e9eef5]' />

                  <div className='relative z-10 mx-10 h-[min(520px,calc(100%_-_92px))] min-h-[460px] overflow-visible'>
                    {stackCards.map((card, index) => (
                      <StackLayer
                        key={card.label}
                        card={card}
                        index={index}
                        scrollYProgress={scrollYProgress}
                        isActive={index === activeIndex}
                      />
                    ))}
                  </div>

                  <motion.div
                    className='relative z-40 mx-auto mt-5 flex flex-wrap justify-center gap-2 py-2'
                    style={{ opacity: chipOpacity, y: chipY }}
                  >
                    {trustChips.map((chip) => (
                      <span
                        key={chip}
                        className='rounded-full border border-white/70 bg-white/80 px-3 py-1 font-mono text-[11px] font-semibold text-spontaine-ink-soft shadow-sm backdrop-blur'
                      >
                        {chip}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    className='relative z-40 mx-auto mt-4 h-1.5 w-[320px] overflow-hidden rounded-full bg-spontaine-bright-gray'
                    aria-hidden='true'
                  >
                    <motion.div
                      className='h-full origin-left rounded-full bg-spontaine-accent'
                      style={{ scaleX: progressScale }}
                    />
                  </motion.div>
                </motion.div>
              </div>

              <div className='lg:hidden'>
                <motion.div
                  className='relative mx-auto h-[clamp(420px,calc(100vh_-_150px),560px)] w-full max-w-[560px]'
                  style={{ scale: stageScale, y: stageY }}
                >
                  <div className='absolute inset-0 rounded-[28px] bg-[#e9eef5]' />

                  <div className='absolute inset-x-3 bottom-9 top-3 overflow-visible sm:inset-x-5 sm:bottom-10 sm:top-5'>
                    {stackCards.map((card, index) => (
                      <StackLayer
                        key={card.label}
                        card={card}
                        index={index}
                        scrollYProgress={scrollYProgress}
                        isActive={index === activeIndex}
                        compact
                      />
                    ))}
                  </div>

                  <motion.div
                    className='absolute bottom-4 left-1/2 z-50 h-1.5 w-[min(320px,calc(100%_-_48px))] -translate-x-1/2 overflow-hidden rounded-full bg-white/80 shadow-sm backdrop-blur sm:bottom-5 sm:w-[min(360px,calc(100%_-_64px))]'
                    aria-hidden='true'
                  >
                    <motion.div
                      className='h-full origin-left rounded-full bg-spontaine-accent'
                      style={{ scaleX: progressScale }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </AppLayoutPadding>
        </div>
      </div>
    </section>
  )
}

function StackLayer({
  card,
  index,
  scrollYProgress,
  isActive,
  compact = false,
}: {
  readonly card: StackCardData
  readonly index: number
  readonly scrollYProgress: MotionValue<number>
  readonly isActive: boolean
  readonly compact?: boolean
}) {
  const layerProgress = useTransform(scrollYProgress, (value) => getCardProgress(value, index))
  const y = useTransform(
    layerProgress,
    [-1.15, -0.2, 0, 1, 2, 3],
    compact ? [82, 24, 0, 18, 34, 48] : [120, 34, 0, 30, 58, 84]
  )
  const x = useTransform(
    layerProgress,
    [-1.15, -0.2, 0, 1, 2, 3],
    compact ? [0, 0, 0, 10, 18, 24] : [0, 0, 0, 22, 40, 56]
  )
  const scale = useTransform(
    layerProgress,
    [-1.15, -0.2, 0, 1, 2, 3],
    compact ? [0.985, 0.995, 1, 0.972, 0.946, 0.925] : [0.985, 0.995, 1, 0.96, 0.92, 0.9]
  )
  const opacity = useTransform(
    layerProgress,
    [-1.2, -0.35, 0, 1, 2, 3],
    [0, 0.42, 1, 0.78, 0.58, 0.36]
  )
  const rotate = useTransform(layerProgress, [-1, 0, 1, 2, 3], [0.6, 0, -0.8, -1.4, -2])
  const brightness = useTransform(layerProgress, [-1, 0, 1, 2, 3], [1, 1, 0.94, 0.9, 0.88])
  const filter = useTransform(brightness, (value) => `brightness(${value})`)

  return (
    <motion.div
      className='absolute inset-0 origin-top-left will-change-transform'
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        filter,
        zIndex: isActive ? stackCards.length + 1 : stackCards.length - index,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <StackCard
        card={card}
        isActive={isActive}
        fitStage
        compact={compact}
      />
    </motion.div>
  )
}

function ReducedMotionStack() {
  return (
    <section
      aria-labelledby='stack-legora-title'
      className='bg-white py-20 sm:py-24 lg:py-28'
    >
      <AppLayoutPadding>
        <div className='mx-auto w-full max-w-[1224px]'>
          <div className='text-center'>
            <p className='font-mono text-xs font-semibold uppercase tracking-[0.18em] text-spontaine-accent'>
              Governed AI inference
            </p>
            <h2
              id='stack-legora-title'
              className='mx-auto mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-spontaine-ink-soft sm:text-4xl'
            >
              Governed data and safe AI inference from what you already own.
            </h2>
          </div>
          <div className='mt-12 grid gap-5 lg:grid-cols-2'>
            {stackCards.map((card) => (
              <StackCard
                key={card.label}
                card={card}
                isActive
              />
            ))}
          </div>
        </div>
      </AppLayoutPadding>
    </section>
  )
}

function StackCard({
  card,
  isActive,
  fitStage = false,
  compact = false,
}: {
  readonly card: StackCardData
  readonly isActive: boolean
  readonly fitStage?: boolean
  readonly compact?: boolean
}) {
  return (
    <article
      className={[
        'shadow-spontaine-ink-dark/10 relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/70 px-6 pb-6 pt-5 shadow-2xl backdrop-blur sm:px-9 sm:pt-8',
        fitStage ? 'h-full min-h-0' : '',
        compact ? 'px-5 pb-10 pt-5 sm:px-7 sm:pt-7' : '',
        isActive ? 'bg-[rgba(229,236,246,0.94)]' : 'bg-[rgba(229,236,246,0.74)]',
      ].join(' ')}
    >
      <div
        className={[
          'relative z-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-start',
          compact ? 'gap-5 md:grid-cols-[minmax(0,1fr)_170px]' : '',
        ].join(' ')}
      >
        <div>
          <p className='text-spontaine-ink-normal/55 font-mono text-xs font-semibold uppercase tracking-[0.16em]'>
            {card.label}
          </p>
          <h3
            className={[
              'mt-4 max-w-lg font-display text-lg font-bold leading-tight sm:text-xl',
              compact ? 'text-xl sm:text-2xl' : '',
              card.titleTone === 'green' ? 'text-[#1e3a34]' : 'text-spontaine-ink-soft',
            ].join(' ')}
          >
            {card.title}
          </h3>
          <div
            className={[
              'mt-5 space-y-4 font-body text-sm leading-6 text-[#2b2e33] sm:text-base sm:leading-7',
              compact ? 'mt-4 space-y-3 text-[13px] leading-5 sm:text-sm sm:leading-6' : '',
            ].join(' ')}
          >
            {card.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className={compact ? 'hidden md:block' : ''}>
          <StackArtwork artwork={card.artwork} />
        </div>
      </div>
    </article>
  )
}
