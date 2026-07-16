import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useMemo, useRef, useState } from 'react'

interface StackCardData {
  readonly label: string
  readonly title: string
  readonly description: readonly string[]
  readonly artwork: StackArtworkKind
  readonly titleTone?: 'default' | 'green'
}

type StackArtworkKind = 'connectors' | 'meaning' | 'answers' | 'persistence' | 'safety' | 'new-ip'

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
              className='mt-4 max-w-5xl font-display text-4xl font-bold leading-tight text-spontaine-ink-soft sm:text-5xl lg:text-6xl'
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
        className='relative lg:h-[340vh]'
      >
        <div className='lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center'>
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
                  className='relative ml-auto flex h-[clamp(620px,calc(100vh_-_48px),720px)] w-full max-w-[860px] flex-col justify-center'
                  style={{ scale: stageScale, y: stageY }}
                >
                  <div className='absolute inset-x-0 bottom-20 top-8 rounded-[32px] bg-[#e9eef5]' />

                  <div className='relative z-10 mx-10 h-[min(560px,calc(100%_-_100px))] min-h-[520px] overflow-visible'>
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
                    className='relative z-40 mx-auto mt-5 flex flex-wrap justify-center gap-2 py-4'
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

              <div className='grid gap-5 lg:hidden'>
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
}: {
  readonly card: StackCardData
  readonly index: number
  readonly scrollYProgress: MotionValue<number>
  readonly isActive: boolean
}) {
  const layerProgress = useTransform(scrollYProgress, (value) => getCardProgress(value, index))
  const y = useTransform(layerProgress, [-1.15, -0.2, 0, 1, 2, 3], [120, 34, 0, 30, 58, 84])
  const x = useTransform(layerProgress, [-1.15, -0.2, 0, 1, 2, 3], [0, 0, 0, 22, 40, 56])
  const scale = useTransform(
    layerProgress,
    [-1.15, -0.2, 0, 1, 2, 3],
    [0.985, 0.995, 1, 0.96, 0.92, 0.9]
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
}: {
  readonly card: StackCardData
  readonly isActive: boolean
  readonly fitStage?: boolean
}) {
  return (
    <article
      className={[
        'shadow-spontaine-ink-dark/10 relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/70 px-6 pb-6 pt-5 shadow-2xl backdrop-blur sm:px-9 sm:pt-8',
        fitStage ? 'lg:h-full lg:min-h-0' : '',
        isActive ? 'bg-[rgba(229,236,246,0.94)]' : 'bg-[rgba(229,236,246,0.74)]',
      ].join(' ')}
    >
      <div className='relative z-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-start'>
        <div>
          <p className='text-spontaine-ink-normal/55 font-mono text-xs font-semibold uppercase tracking-[0.16em]'>
            {card.label}
          </p>
          <h3
            className={[
              'mt-4 max-w-lg font-display text-2xl font-bold leading-tight sm:text-3xl',
              card.titleTone === 'green' ? 'text-[#1e3a34]' : 'text-spontaine-ink-soft',
            ].join(' ')}
          >
            {card.title}
          </h3>
          <div className='mt-5 space-y-4 font-body text-sm leading-6 text-[#2b2e33] sm:text-base sm:leading-7'>
            {card.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <StackArtwork artwork={card.artwork} />
      </div>
    </article>
  )
}

function StackArtwork({ artwork }: { readonly artwork: StackArtworkKind }) {
  const config = useMemo(() => {
    const configs: Record<
      StackArtworkKind,
      {
        readonly accent: string
        readonly soft: string
        readonly label: string
      }
    > = {
      connectors: { accent: '#45EDA1', soft: '#5DAFE4', label: 'Sources' },
      meaning: { accent: '#42D6EC', soft: '#A526E4', label: 'Context' },
      answers: { accent: '#7DE4F4', soft: '#4C8EF9', label: 'Answers' },
      persistence: { accent: '#2ECA9E', soft: '#09C7A4', label: 'Blocks' },
      safety: { accent: '#F0DE50', soft: '#4C8EF9', label: 'Safe' },
      'new-ip': { accent: '#A526E4', soft: '#EE7007', label: 'IP' },
    }

    return configs[artwork]
  }, [artwork])

  return (
    <div
      className='relative mx-auto h-[210px] w-[220px] shrink-0 md:mx-0'
      aria-hidden='true'
    >
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className='absolute rounded-[26px] border border-white/60 shadow-xl shadow-black/5'
          style={{
            inset: `${42 - index * 14}px ${34 + index * 10}px ${28 + index * 12}px ${22 - index * 4}px`,
            rotate: `${-10 + index * 7}deg`,
            background: `linear-gradient(135deg, ${config.accent}${42 + index * 18}, ${config.soft}${28 + index * 16})`,
          }}
        />
      ))}
      <div className='absolute inset-x-8 bottom-12 top-8 rounded-[30px] border border-white/80 bg-white/45 shadow-2xl shadow-black/10 backdrop-blur'>
        <div className='absolute left-5 right-5 top-6 h-2 rounded-full bg-white/80' />
        <div
          className='absolute bottom-6 left-6 right-6 rounded-2xl px-4 py-3 font-mono text-xs font-semibold text-spontaine-ink-soft'
          style={{ backgroundColor: `${config.accent}42` }}
        >
          {config.label}
        </div>
        <div className='absolute left-6 top-14 grid gap-2'>
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className='block h-2 rounded-full bg-white/75'
              style={{ width: `${72 - index * 14}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
