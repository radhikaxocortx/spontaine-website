import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import SectionCardStackCardV3 from './SectionCardStackCardV3'
import SectionCardStackLayerV3 from './SectionCardStackLayerV3'
import { STACK_CARD_COUNT, stackCards } from './sectionCardStackV3Content'

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

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.min(
      STACK_CARD_COUNT - 1,
      Math.max(0, Math.round(latest * (STACK_CARD_COUNT - 1)))
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
      <div className='pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pb-20 lg:pt-24'>
        <AppLayoutPadding>
          <div className='mx-auto max-w-3xl text-center'>
            <p className='font-mono text-xs font-semibold uppercase tracking-[0.18em] text-spontaine-accent'>
              Governed AI inference
            </p>
            <h2
              id='stack-legora-title'
              className='mt-4 max-w-5xl font-display text-2xl font-bold leading-[1.12] text-[#303033] sm:text-3xl lg:text-[32px]'
            >
              Governed data and safe AI inference from what you already own.
            </h2>
            {/* <p className='text-spontaine-ink-normal/75 mt-5 max-w-3xl font-display leading-8'>
              Connect your sources, preserve your context, and turn governed data into safe AI
              workflows without replacing the systems you already use.
            </p> */}
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
                      const targetProgress = index / (STACK_CARD_COUNT - 1)

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
                  <div className='absolute inset-x-0 bottom-20 top-8 rounded-[32px]' />

                  <div className='relative z-10 mx-10 h-[min(240px,calc(100%_-_92px))] min-h-[400px] overflow-visible'>
                    {stackCards.map((card, index) => (
                      <SectionCardStackLayerV3
                        key={card.label}
                        card={card}
                        index={index}
                        scrollYProgress={scrollYProgress}
                        isActive={index === activeIndex}
                      />
                    ))}
                  </div>

                  {/* <motion.div
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
                  </motion.div> */}

                  {/* <motion.div
                    className='relative z-40 mx-auto mt-4 h-1.5 w-[320px] overflow-hidden rounded-full bg-spontaine-bright-gray'
                    aria-hidden='true'
                  >
                    <motion.div
                      className='h-full origin-left rounded-full bg-spontaine-accent'
                      style={{ scaleX: progressScale }}
                    />
                  </motion.div> */}
                </motion.div>
              </div>

              <div className='lg:hidden'>
                <motion.div
                  className='relative mx-auto h-[clamp(380px,calc(100vh_-_150px),500px)] w-full max-w-[560px]'
                  style={{ scale: stageScale, y: stageY }}
                >
                  <div className='absolute inset-0 rounded-[28px] bg-[#e9eef5]' />

                  <div className='absolute inset-x-3 bottom-9 top-3 overflow-visible sm:inset-x-5 sm:bottom-10 sm:top-5'>
                    {stackCards.map((card, index) => (
                      <SectionCardStackLayerV3
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
              <SectionCardStackCardV3
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
