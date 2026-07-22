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
      className='relative bg-spontaine-surface-paper py-[110px] lg:py-[142px]'
    >
      <div>
        <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
          <div className='mx-auto max-w-[820px] text-center'>
            <p className='eyebrow mb-5 text-spontaine-gray-cool'>THE SHAPE OF GOVERNANCE</p>
            <h2
              id='stack-legora-title'
              className='display-xl text-spontaine-dark'
            >
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
        </div>
      </div>

      <div
        ref={sceneRef}
        className='relative h-[320vh] lg:h-[340vh]'
      >
        <div className='sticky top-[92px] flex min-h-[calc(100vh-92px)] items-center sm:top-[104px] sm:min-h-[calc(100vh-104px)] lg:top-[112px] lg:min-h-[calc(100vh-112px)]'>
          <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
            <div className='mx-auto grid w-full max-w-[1060px] gap-10 pb-20 sm:pb-24 lg:grid-cols-[150px_minmax(0,1fr)] lg:items-center lg:gap-10 lg:pb-0'>
              <nav
                className='hidden gap-7 lg:flex lg:flex-col'
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
                      'group flex min-h-7 items-center gap-3 rounded-md text-left font-mono text-xs transition-colors',
                      index === activeIndex
                        ? 'font-semibold text-spontaine-text-primary'
                        : 'font-normal text-spontaine-gray-muted hover:text-spontaine-text-primary',
                    ].join(' ')}
                    aria-current={index === activeIndex ? 'step' : undefined}
                  >
                    <span
                      aria-hidden='true'
                      className={[
                        'h-2.5 w-2.5 rounded-full transition-colors',
                        index === activeIndex
                          ? 'bg-spontaine-accent'
                          : 'bg-spontaine-surface-muted',
                      ].join(' ')}
                    />
                    <span>{card.label}</span>
                  </button>
                ))}
              </nav>

              <div className='hidden lg:block'>
                <motion.div
                  className='relative ml-auto flex h-[clamp(540px,calc(100vh_-_176px),650px)] w-full max-w-[730px] flex-col justify-center'
                  style={{ scale: stageScale, y: stageY }}
                >
                  <div className='absolute inset-x-0 bottom-20 top-8 rounded-[32px]' />

                  <div className='relative z-10 mx-4 h-[min(250px,calc(100%_-_92px))] min-h-[420px] overflow-visible sm:mx-8'>
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
                  <div className='absolute inset-0 rounded-[var(--radius-panel)] bg-spontaine-surface-ice/40' />

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
                    className='bg-spontaine-surface-muted absolute bottom-4 left-1/2 z-50 h-[5px] w-[min(310px,calc(100%_-_48px))] -translate-x-1/2 overflow-hidden rounded-[var(--radius-pill)] shadow-sm backdrop-blur sm:bottom-5 sm:w-[min(360px,calc(100%_-_64px))]'
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
          </div>
        </div>
      </div>
    </section>
  )
}

function ReducedMotionStack() {
  return (
    <section
      aria-labelledby='stack-legora-title'
      className='bg-spontaine-surface-paper py-[110px] lg:py-[142px]'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='mx-auto w-full max-w-[1060px]'>
          <div className='mx-auto max-w-[820px] text-center'>
            <p className='eyebrow mb-5 text-spontaine-gray-cool'>THE SHAPE OF GOVERNANCE</p>
            <h2
              id='stack-legora-title'
              className='display-xl text-spontaine-dark'
            >
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
      </div>
    </section>
  )
}
