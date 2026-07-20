import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface SectionCompanyCTAV3Props {
  className?: string
}

export default function SectionCompanyCTAV3({ className }: SectionCompanyCTAV3Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>('[data-company-cta-eyebrow]')
      const title = section.querySelector<HTMLElement>('[data-company-cta-title]')
      const action = section.querySelector<HTMLElement>('[data-company-cta-action]')
      const contact = section.querySelector<HTMLElement>('[data-company-cta-contact]')
      const revealTargets = [eyebrow, title, action, contact].filter(Boolean) as HTMLElement[]

      if (prefersReducedMotion) {
        gsap.set(revealTargets, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set(revealTargets, { autoAlpha: 0, y: 16 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      })

      if (eyebrow) {
        timeline.to(eyebrow, {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          ease: 'power2.out',
        })
      }

      if (title) {
        timeline.to(
          title,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            ease: 'power2.out',
          },
          '>-0.14'
        )
      }

      if (action) {
        timeline.to(
          action,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
          },
          '>-0.1'
        )
      }

      if (contact) {
        timeline.to(
          contact,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          '>-0.08'
        )
      }
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id='contact'
      className={cn(
        'relative w-full overflow-hidden rounded-t-section-sm bg-[var(--cream-soft)] pb-[96px] pt-[128px] text-center md:rounded-t-section-md md:pb-[104px] md:pt-[140px] lg:rounded-t-section-lg lg:pb-[110px] lg:pt-[150px] xl:rounded-t-section-xl',
        className
      )}
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <p
          data-company-cta-eyebrow
          className='eyebrow text-spontaine-gray-cool'
        >
          The whole idea, in four words
        </p>

        <h2
          data-company-cta-title
          className='display-xl mx-auto mt-[14px] max-w-[720px] font-display text-spontaine-text-primary'
        >
          Don't adopt AI. <em className='not-italic text-spontaine-accent-dark'>Own it.</em>
        </h2>

        <div
          data-company-cta-action
          className='mt-[26px] flex flex-col justify-center gap-[14px] sm:flex-row sm:flex-wrap'
        >
          <CalendarBooking>
            {({ openCalendar }) => (
              <Button
                type='button'
                onClick={openCalendar}
                variant='v3Primary'
                size='v3Hero'
              >
                Book a working session
              </Button>
            )}
          </CalendarBooking>

          <Button
            asChild
            variant='v3Secondary'
            size='v3Hero'
            className='border-spontaine-dark bg-spontaine-dark text-spontaine-text-on-dark hover:border-spontaine-surface-ink hover:bg-spontaine-surface-ink hover:text-spontaine-text-on-dark'
          >
            <a href='/architecture'>Provably Safer</a>
          </Button>
        </div>

        <p
          data-company-cta-contact
          className='mt-[14px] font-mono text-sm tracking-[0.04em] text-spontaine-gray-cool'
        >
          <a
            href='https://spontaine.com'
            className='text-spontaine-accent-dark no-underline'
          >
            spontaine.com
          </a>{' '}
          &middot;{' '}
          <a
            href='mailto:desk@spontaine.com'
            className='text-spontaine-accent-dark no-underline'
          >
            desk@spontaine.com
          </a>
        </p>
      </div>
    </section>
  )
}
