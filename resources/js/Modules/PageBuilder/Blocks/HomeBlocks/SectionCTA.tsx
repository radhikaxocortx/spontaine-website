import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

interface SectionCTAProps {
  className?: string
}

const SectionCTA = ({ className }: SectionCTAProps) => {
  const arcRef = useRef(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const arc = arcRef.current

    const normalArc = 'M0,80 C300,20 900,20 1200,80 L1200,200 L0,200 Z'
    const inwardArc = 'M0,80 C300,5 900,5 1200,80 L1200,200 L0,200 Z'

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(arc, { morphSVG: inwardArc, duration: 1.2, ease: 'power2.inOut' }).to(arc, {
      morphSVG: normalArc,
      duration: 1.2,
      ease: 'power2.inOut',
    })

    // heading + button fade-in
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, buttonRef.current], { opacity: 0, y: 40 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }).to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      )
    }, sectionRef)

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <>
      {/* CTA SECTION */}
      <section
        ref={sectionRef}
        data-section-cta
        className={cn('relative w-full overflow-hidden', className)}
        style={{
          background: 'linear-gradient(0deg, #44ECA0 0%, #C3FF6E 100%)',
        }}
      >
        <div className='relative flex min-h-[600px] items-center justify-center'>
          <div className='relative z-10 mx-auto mb-16 flex max-w-4xl flex-col items-center justify-center px-6 text-center'>
            <h2
              ref={headingRef}
              className='mb-8 font-display text-5xl font-normal leading-tight text-spontaine-dark-bg sm:mb-12 sm:text-6xl lg:text-7xl xl:text-[88.9px] xl:leading-[120px]'
            >
              Ready for your PoC?
            </h2>

            <CalendarBooking>
              {({ openCalendar }) => (
                <Button
                  ref={buttonRef}
                  onClick={openCalendar}
                  size='lg'
                  className='relative overflow-hidden rounded-full bg-spontaine-highlight py-6 text-white shadow-2xl'
                >
                  <span className='nav-cta-text'>Book Demo</span>
                </Button>
              )}
            </CalendarBooking>
          </div>

          {/* Bottom Arc */}
          {/* <div className='absolute bottom-0 left-0 w-full'>
            <svg
              viewBox='0 0 1200 200'
              preserveAspectRatio='none'
              className='h-[120px] w-full sm:h-[160px] lg:h-[200px]'
            >
              <path
                ref={arcRef}
                fill='#2FD47D'
                className='fill-spontaine-accent-footer'
                d='M0,80 C300,20 900,20 1200,80 L1200,200 L0,200 Z'
              />
            </svg>
          </div> */}
        </div>
      </section>
    </>
  )
}

export default SectionCTA
