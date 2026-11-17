import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { useStackUp } from '@/hooks/useStackUp'
import { trackEvent } from '@/lib/analytics'
import { prefersReducedMotion } from '@/lib/motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface PathStep {
  readonly label: string
  readonly text: string
}

const steps: readonly PathStep[] = [
  { label: 'Week 1', text: 'Agree the question and connect the systems that hold the answer.' },
  { label: 'Weeks 2 and 3', text: 'Agree what the numbers mean and build it with your team.' },
  {
    label: 'Week 4',
    text: 'The answer refreshes on its own. Your team can change it and ask the next one.',
  },
]

// Flip to true when /first-question goes live (28 Nov).
const FIRST_QUESTION_PAGE_LIVE = false

const nodeDelayClasses = ['delay-0', '[transition-delay:350ms]', 'delay-700'] as const

/** Lights the connector once, when the steps are well into view. */
const useConnectorActive = () => {
  const stepsRef = useRef<HTMLOListElement | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const steps = stepsRef.current

    if (!steps) {
      return
    }

    if (prefersReducedMotion()) {
      setIsActive(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )

    observer.observe(steps)

    return () => observer.disconnect()
  }, [])

  return { stepsRef, isActive }
}

export default function SectionStartV3() {
  const sectionRef = useStackUp<HTMLElement>()
  const { stepsRef, isActive } = useConnectorActive()

  return (
    <section
      ref={sectionRef}
      id='first-question'
      aria-labelledby='first-question-title'
      className='relative w-full scroll-mt-16 overflow-hidden rounded-t-section-sm bg-spontaine-surface-paper pb-[120px] pt-[105px] md:rounded-t-section-md md:pt-[130px] lg:rounded-t-section-lg lg:pb-[150px] xl:rounded-t-section-xl'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='mx-auto max-w-[820px] text-center'>
          <p
            data-stack-item
            className='eyebrow mb-5 text-spontaine-gray-cool'
          >
            How it starts
          </p>
          <h2
            id='first-question-title'
            data-stack-item
            className='display-xl text-spontaine-dark'
          >
            Start with one question.
            <br />
            <span className='display-xl text-spontaine-text-accent-dark'>
              The results are yours either way.
            </span>
          </h2>
        </div>

        <ol
          ref={stepsRef}
          data-active={isActive}
          className='group relative mx-auto mt-16 grid max-w-[1000px] gap-9 md:grid-cols-3 md:gap-10'
        >
          {/* Connector: vertical on mobile, horizontal from md */}
          <span
            aria-hidden='true'
            className='absolute bottom-[6px] left-[6px] top-[6px] w-0.5 rounded-[var(--radius-pill)] bg-[var(--spontaine-surface-line-soft)] md:hidden'
          >
            <span className='absolute inset-0 origin-top scale-y-0 rounded-[inherit] bg-spontaine-accent transition-transform delay-150 [transition-duration:1400ms] [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] group-data-[active=true]:scale-y-100 motion-reduce:transition-none' />
          </span>
          <span
            aria-hidden='true'
            className='absolute left-[6px] right-[calc(33.333%-20px)] top-[6px] hidden h-0.5 rounded-[var(--radius-pill)] bg-[var(--spontaine-surface-line-soft)] md:block'
          >
            <span className='absolute inset-0 origin-left scale-x-0 rounded-[inherit] bg-spontaine-accent transition-transform delay-150 [transition-duration:1400ms] [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] group-data-[active=true]:scale-x-100 motion-reduce:transition-none' />
          </span>

          {steps.map((step, index) => {
            const isLast = index === steps.length - 1

            return (
              <li
                key={step.label}
                className='relative pl-9 md:pl-0 md:pt-10'
              >
                <span
                  aria-hidden='true'
                  className={[
                    'absolute left-0 top-0 h-3.5 w-3.5 rounded-[var(--radius-pill)] border-2 border-[var(--spontaine-border-medium)] bg-spontaine-surface-paper transition-[border-color,background-color,box-shadow] duration-500 group-data-[active=true]:border-spontaine-accent motion-reduce:transition-none',
                    nodeDelayClasses[index],
                    isLast
                      ? 'group-data-[active=true]:bg-spontaine-accent group-data-[active=true]:shadow-[0_0_0_6px_var(--spontaine-accent-soft)]'
                      : '',
                  ].join(' ')}
                />
                <p className='eyebrow text-spontaine-text-accent-dark'>{step.label}</p>
                <p className='mt-2.5 text-pretty font-display text-[1.15rem] font-semibold leading-[1.3] tracking-[-0.02em] text-spontaine-text-primary'>
                  {step.text}
                </p>
              </li>
            )
          })}
        </ol>

        <p className='mx-auto mt-7 max-w-[1000px] font-body text-[0.82rem] text-spontaine-text-tertiary'>
          Across several companies or sites, allow four to eight weeks.
        </p>

        <div
          data-stack-item
          className='mx-auto mt-12 grid max-w-[1000px] items-center gap-6 rounded-[var(--radius-panel)] bg-spontaine-surface-paper-soft p-[var(--space-card-lg)] shadow-[inset_0_0_0_1px_var(--spontaine-border-subtle)] md:grid-cols-[1fr_auto] md:gap-10 md:px-9 md:py-8'
        >
          <p className='body-lg max-w-[560px] text-spontaine-text-secondary'>
            Fixed scope and fixed fee, agreed before we start. If you stop, the data and results
            stay yours. To keep using what we built, a smaller annual licence keeps it running.
          </p>

          <div className='flex flex-col items-start gap-3'>
            <CalendarBooking>
              {({ openCalendar }) => (
                <Button
                  type='button'
                  onClick={() => {
                    trackEvent('cta_clicked', {
                      label: 'Book the working session',
                      section: 'first-question',
                    })
                    openCalendar()
                  }}
                  variant='v3Primary'
                  size='v3Hero'
                >
                  Book the working session
                  <ArrowUpRight
                    aria-hidden='true'
                    className='h-4 w-4'
                  />
                </Button>
              )}
            </CalendarBooking>

            {FIRST_QUESTION_PAGE_LIVE && (
              <a
                href='/first-question'
                className='inline-flex items-center gap-2 font-body text-[0.84rem] font-semibold text-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark'
              >
                How the first four weeks work
                <ArrowRight
                  aria-hidden='true'
                  className='h-4 w-4'
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
