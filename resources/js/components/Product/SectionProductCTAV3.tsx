import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface SectionProductCTAV3Props {
  className?: string
}

export default function SectionProductCTAV3({ className }: SectionProductCTAV3Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const title = section.querySelector<HTMLElement>('[data-product-cta-title]')
      const description = section.querySelector<HTMLElement>('[data-product-cta-description]')
      const action = section.querySelector<HTMLElement>('[data-product-cta-action]')
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
        'relative w-full overflow-hidden rounded-t-section-sm bg-cta-wash pb-[96px] pt-[128px] text-center md:rounded-t-section-md md:pb-[104px] md:pt-[140px] lg:rounded-t-section-lg lg:pb-[110px] lg:pt-[150px] xl:rounded-t-section-xl',
        className
      )}
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <h2
          data-product-cta-title
          className='display-xl mx-auto max-w-[820px] font-display text-spontaine-text-primary'
        >
          Build the firm your competitors can&apos;t hire.
        </h2>

        <p
          data-product-cta-description
          className='body-lg mx-auto mb-[28px] mt-[23px] max-w-[600px] font-body text-spontaine-text-secondary'
        >
          Thirty minutes with the people who built it. No deck, nothing to buy. Tell us what
          you&apos;d build - we&apos;ll tell you what&apos;s four weeks away, what&apos;s
          twenty-eight, and what we can&apos;t do.Thirty minutes, no deck- about the lowest-risk way
          to evaluate software there is. Walk through the architecture, the safety model, and the
          real economics with the people who built it, then decide.
        </p>

        <div
          data-product-cta-action
          className='flex justify-center'
        >
          <CalendarBooking>
            {({ openCalendar }) => (
              <Button
                type='button'
                onClick={openCalendar}
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
      </div>
    </section>
  )
}
