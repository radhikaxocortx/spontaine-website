import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface SectionCTAV3Props {
  className?: string
}

export default function SectionCTAV3({ className }: SectionCTAV3Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const title = section.querySelector<HTMLElement>('[data-home-cta-title]')
      const description = section.querySelector<HTMLElement>('[data-home-cta-description]')
      const action = section.querySelector<HTMLElement>('[data-home-cta-action]')
      const note = section.querySelector<HTMLElement>('[data-home-cta-note]')
      const revealTargets = [title, description, action, note].filter(Boolean) as HTMLElement[]

      if (prefersReducedMotion) {
        revealTargets.forEach((target) => {
          target.style.visibility = 'visible'
        })
        gsap.set(revealTargets, { opacity: 1, y: 0 })
        return
      }

      gsap.set(revealTargets, { opacity: 0, y: 16 })
      revealTargets.forEach((target) => {
        target.style.visibility = 'hidden'
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      })

      if (title) {
        timeline.to(title, {
          duration: 0.52,
          ease: 'power2.out',
          onStart: () => {
            title.style.visibility = 'visible'
          },
          opacity: 1,
          y: 0,
        })
      }

      if (description) {
        timeline.to(
          description,
          {
            duration: 0.5,
            ease: 'power2.out',
            onStart: () => {
              description.style.visibility = 'visible'
            },
            opacity: 1,
            y: 0,
          },
          '>-0.12'
        )
      }

      if (action) {
        timeline.to(
          action,
          {
            duration: 0.45,
            ease: 'power2.out',
            onStart: () => {
              action.style.visibility = 'visible'
            },
            opacity: 1,
            y: 0,
          },
          '>-0.1'
        )
      }

      if (note) {
        timeline.to(
          note,
          {
            duration: 0.4,
            ease: 'power2.out',
            onStart: () => {
              note.style.visibility = 'visible'
            },
            opacity: 1,
            y: 0,
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
      id='book'
      className={cn(
        'relative w-full overflow-hidden rounded-t-section-sm bg-cta-wash py-[96px] text-center md:rounded-t-section-md md:py-[120px] lg:rounded-t-section-lg lg:pb-[120px] lg:pt-[135px] xl:rounded-t-section-xl',
        className
      )}
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <h2
          data-home-cta-title
          className='display-xl mx-auto max-w-[880px] font-display text-spontaine-text-primary'
        >
          Thirty minutes with the people who built it.
        </h2>

        <p
          data-home-cta-description
          className='body-lg mx-auto mt-[23px] max-w-[650px] font-body text-spontaine-text-secondary'
        >
          Bring the question your leadership keeps asking.
        </p>

        <div
          data-home-cta-action
          className='mt-[23px] flex justify-center'
        >
          <CalendarBooking>
            {({ openCalendar }) => (
              <Button
                type='button'
                onClick={() => {
                  trackEvent('cta_clicked', { label: 'Book the working session', section: 'book' })
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
        </div>

        <p
          data-home-cta-note
          className='mt-[19px] font-mono text-[0.72rem] text-spontaine-gray-deep'
        >
          A 30-minute working session. No deck. No obligation.
        </p>
      </div>
    </section>
  )
}
