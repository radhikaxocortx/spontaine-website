import { Button } from '@/components/ui/button'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AppSectionPadding from '@/Layouts/AppSectionPadding'
import { cn } from '@/lib/utils'
import SectionTitle from '@/typography/SectionTitle'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

// Calendly integration function
const openCalendly = () => {
  // Check if Calendly is available
  if (typeof window !== 'undefined' && (window as any).Calendly) {
    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/clinicallynow' })
  } else {
    // Fallback to direct link if Calendly widget is not loaded
    window.open('https://calendly.com/clinicallynow', '_blank')
  }
}

interface SectionTalkProps {
  className?: string
}

const SectionTalk = ({ className }: SectionTalkProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, buttonRef.current], {
        opacity: 0,
        y: 40,
      })

      // Ken Burns effect on background
      gsap.set(backgroundRef.current, {
        scale: 1,
        x: 0,
        y: 0,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(titleRef.current, {
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

      // Ken Burns effect - slow zoom and pan
      gsap.to(backgroundRef.current, {
        scale: 1.2,
        x: -20,
        y: -10,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleScheduleCall = () => {
    openCalendly()
  }

  return (
    <section
      ref={sectionRef}
      className={cn('relative overflow-hidden bg-black text-white', className)}
    >
      {/* Ken Burns Background */}
      <div
        ref={backgroundRef}
        className='absolute inset-0 h-full w-full'
        style={{
          backgroundImage: "url('/imge/home/talk.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <AppSectionPadding>
        <AppLayoutPadding>
          <div className='relative z-10 flex min-h-[260px] flex-col items-center justify-center text-center'>
            {/* Title */}
            <div
              className='mb-8'
              ref={titleRef}
            >
              <SectionTitle
                theme='dark'
                alignment='center'
                className='hero-title'
              >
                Lets Talk.
              </SectionTitle>
            </div>

            {/* CTA Button */}
            <Button
              ref={buttonRef}
              onClick={handleScheduleCall}
              size='xl'
              className='rounded-full border-0 bg-lime-400 px-6 py-3 text-black shadow-lg transition-all duration-300 hover:bg-lime-300 hover:shadow-xl sm:px-8 sm:py-4'
            >
              Schedule a call →
            </Button>
          </div>
        </AppLayoutPadding>
      </AppSectionPadding>
    </section>
  )
}

export default SectionTalk
