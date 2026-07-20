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
      const title = section.querySelector<HTMLElement>('[data-company-cta-title]')
      const description = section.querySelector<HTMLElement>('[data-company-cta-description]')
      const action = section.querySelector<HTMLElement>('[data-company-cta-action]')
      const revealTargets = [title, description, action].filter(Boolean) as HTMLElement[]

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

      if (title) {
        timeline.to(title, {
          autoAlpha: 1,
          y: 0,
          duration: 0.52,
          ease: 'power2.out',
        })
      }

      if (description) {
        timeline.to(
          description,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '>-0.12'
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
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id='contact'
      className={cn(
        'relative w-full overflow-hidden rounded-t-section-sm bg-spontaine-surface-cream pb-[96px] pt-[128px] text-center md:rounded-t-section-md md:pb-[104px] md:pt-[140px] lg:rounded-t-section-lg lg:pb-[110px] lg:pt-[150px] xl:rounded-t-section-xl',
        className
      )}
    >
      <div className='mx-auto w-full max-w-[1180px] space-y-[28px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <p className='eyebrow text-spontaine-gray-cool'>The whole idea, in four words</p>
        <h2
          data-company-cta-title
          className='display-xl mx-auto max-w-[820px] font-display text-spontaine-text-primary'
        >
          Don't adopt AI.
          <span className='text-spontaine-accent-dark'>Own it.</span>
        </h2>

        <div
          data-company-cta-action
          className='flex justify-center gap-[14px]'
        >
          <Button
            asChild
            variant='v3Primary'
            size='v3Hero'
          >
            <a
              href='https://spontaine.eu.trust.site/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Workout your number
            </a>
          </Button>

          <CalendarBooking>
            {({ openCalendar }) => (
              <Button
                type='button'
                onClick={openCalendar}
                variant='v3Secondary'
                size='v3Hero'
                className='border-spontaine-dark bg-spontaine-dark text-spontaine-text-on-dark hover:border-spontaine-surface-ink hover:bg-spontaine-surface-ink hover:text-spontaine-text-on-dark'
              >
                Talk to the team
              </Button>
            )}
          </CalendarBooking>
        </div>
        <p className='font-mono text-sm text-spontaine-accent-dark'>
          spontaine.com · desk@spontaine.com
        </p>
      </div>
    </section>
  )
}
