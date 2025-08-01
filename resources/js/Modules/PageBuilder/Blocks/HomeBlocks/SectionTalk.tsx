import { Button } from '@/components/ui/button'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AppSectionPadding from '@/Layouts/AppSectionPadding'
import { cn } from '@/lib/utils'
import SectionTitle from '@/typography/SectionTitle'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface SectionTalkProps {
  className?: string
}

const SectionTalk = ({ className }: SectionTalkProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, buttonRef.current], {
        opacity: 0,
        y: 40,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleScheduleCall = () => {
    // Add your scheduling logic here
    console.log('Schedule a call clicked')
  }

  return (
    <section
      ref={sectionRef}
      className={cn('relative bg-black text-white', className)}
      style={{
        backgroundImage: "url('/imge/home/talk.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <AppSectionPadding>
        <AppLayoutPadding>
          <div className='flex min-h-[260px] flex-col items-center justify-center text-center'>
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
