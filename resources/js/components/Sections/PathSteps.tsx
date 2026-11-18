import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'
import { prefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export interface PathStep {
  readonly label: string
  readonly text: string
  /** Optional supporting sentence under the step text. */
  readonly detail?: string
}

interface PathStepsProps {
  readonly titleId: string
  readonly eyebrow?: string
  readonly titleOne: string
  readonly titleTwo?: string
  readonly steps: readonly PathStep[]
  readonly note?: string
  readonly body?: string
  /** Bold centred line under the steps, used when there is no button box. */
  readonly closingLine?: string
  /** Without a cta the box is replaced by the closing line, with the body as small print under it. */
  readonly cta?: {
    readonly label: string
    /** cal.com link, e.g. "intuonfx/30min". Defaults to the site booking calendar. */
    readonly calendarUrl?: string
    /** Section name sent with the cta_clicked event. */
    readonly trackingSection: string
  }
  readonly secondaryLink?: { readonly label: string; readonly href: string } | null
}

// Literal class names so Tailwind generates them (supports two to four steps).
const columnClasses: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}
const connectorEndClasses: Record<number, string> = {
  2: 'right-[calc(50%-20px)]',
  3: 'right-[calc(33.333%-20px)]',
  4: 'right-[calc(25%-20px)]',
}
const nodeDelayClasses = [
  'delay-0',
  '[transition-delay:350ms]',
  'delay-700',
  '[transition-delay:1050ms]',
] as const

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

/** Steps on a connector that fills as it comes into view, then the terms panel and CTA. */
export default function PathSteps({
  titleId,
  eyebrow,
  titleOne,
  titleTwo,
  steps,
  note,
  body,
  closingLine,
  cta,
  secondaryLink,
}: PathStepsProps) {
  const { stepsRef, isActive } = useConnectorActive()
  const count = Math.min(Math.max(steps.length, 2), 4)

  return (
    <>
      <div className='mx-auto max-w-[820px] text-center'>
        {eyebrow && (
          <p
            data-stack-item
            className='eyebrow mb-5 text-spontaine-gray-cool'
          >
            {eyebrow}
          </p>
        )}
        <h2
          id={titleId}
          data-stack-item
          className='display-xl text-balance text-spontaine-dark'
        >
          {titleOne}
          {titleTwo && (
            <>
              <br />
              <span className='display-xl text-spontaine-text-accent-dark'>{titleTwo}</span>
            </>
          )}
        </h2>
      </div>

      <ol
        ref={stepsRef}
        data-active={isActive}
        className={cn(
          'group relative mx-auto mt-16 grid max-w-[1000px] gap-9 md:gap-10',
          columnClasses[count]
        )}
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
          className={cn(
            'absolute left-[6px] top-[6px] hidden h-0.5 rounded-[var(--radius-pill)] bg-[var(--spontaine-surface-line-soft)] md:block',
            connectorEndClasses[count]
          )}
        >
          <span className='absolute inset-0 origin-left scale-x-0 rounded-[inherit] bg-spontaine-accent transition-transform delay-150 [transition-duration:1400ms] [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] group-data-[active=true]:scale-x-100 motion-reduce:transition-none' />
        </span>

        {steps.slice(0, 4).map((step, index) => {
          const isLast = index === Math.min(steps.length, 4) - 1

          return (
            <li
              key={`${step.label}-${index}`}
              className='relative pl-9 md:pl-0 md:pt-10'
            >
              <span
                aria-hidden='true'
                className={cn(
                  'absolute left-0 top-0 h-3.5 w-3.5 rounded-[var(--radius-pill)] border-2 border-[var(--spontaine-border-medium)] bg-spontaine-surface-paper transition-[border-color,background-color,box-shadow] duration-500 group-data-[active=true]:border-spontaine-accent motion-reduce:transition-none',
                  nodeDelayClasses[index],
                  isLast &&
                    'group-data-[active=true]:bg-spontaine-accent group-data-[active=true]:shadow-[0_0_0_6px_var(--spontaine-accent-soft)]'
                )}
              />
              <p className='eyebrow text-spontaine-text-accent-dark'>{step.label}</p>
              <p className='mt-2.5 text-pretty font-display text-[1.15rem] font-semibold leading-[1.3] tracking-[-0.02em] text-spontaine-text-primary'>
                {step.text}
              </p>
              {step.detail && (
                <p className='mt-2 max-w-[340px] text-pretty font-body text-[0.95rem] leading-[1.55] text-spontaine-text-secondary'>
                  {step.detail}
                </p>
              )}
            </li>
          )
        })}
      </ol>

      {note && (
        <p className='mx-auto mt-7 max-w-[1000px] font-body text-[0.82rem] text-spontaine-text-tertiary'>
          {note}
        </p>
      )}

      {cta ? (
        <div
          data-stack-item
          className={cn(
            'mx-auto mt-12 grid max-w-[1000px] items-center gap-6 rounded-[var(--radius-panel)] bg-spontaine-surface-paper-soft p-[var(--space-card-lg)] shadow-[inset_0_0_0_1px_var(--spontaine-border-subtle)] md:gap-10 md:px-9 md:py-8',
            body ? 'md:grid-cols-[1fr_auto]' : 'justify-items-center'
          )}
        >
          {body && <p className='body-lg max-w-[560px] text-spontaine-text-secondary'>{body}</p>}

          <div className='flex flex-col items-start gap-3'>
            <CalendarBooking calLink={cta.calendarUrl || undefined}>
              {({ openCalendar }) => (
                <Button
                  type='button'
                  onClick={() => {
                    trackEvent('cta_clicked', { label: cta.label, section: cta.trackingSection })
                    openCalendar()
                  }}
                  variant='v3Primary'
                  size='v3Hero'
                >
                  {cta.label}
                  <ArrowUpRight
                    aria-hidden='true'
                    className='h-4 w-4'
                  />
                </Button>
              )}
            </CalendarBooking>

            {secondaryLink && (
              <a
                href={secondaryLink.href}
                className='inline-flex items-center gap-2 font-body text-[0.84rem] font-semibold text-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark'
              >
                {secondaryLink.label}
                <ArrowRight
                  aria-hidden='true'
                  className='h-4 w-4'
                />
              </a>
            )}
          </div>
        </div>
      ) : (
        (closingLine || body || secondaryLink) && (
          <div
            data-stack-item
            className='mx-auto mt-14 max-w-[720px] text-center'
          >
            {closingLine && (
              <p className='text-balance font-display text-[clamp(1.15rem,1.8vw,1.4rem)] font-semibold leading-[1.35] tracking-[-0.02em] text-spontaine-text-primary'>
                {closingLine}
              </p>
            )}
            {body && (
              <p className='mt-4 font-body text-[0.9rem] leading-[1.6] text-spontaine-text-tertiary'>
                {body}
              </p>
            )}
            {secondaryLink && (
              <a
                href={secondaryLink.href}
                className='mt-5 inline-flex items-center gap-2 font-body text-[0.84rem] font-semibold text-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark'
              >
                {secondaryLink.label}
                <ArrowRight
                  aria-hidden='true'
                  className='h-4 w-4'
                />
              </a>
            )}
          </div>
        )
      )}
    </>
  )
}
