import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const SectionLargeText = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states - hide elements
      gsap.set([line1Ref.current, line2Ref.current], {
        opacity: 0,
        y: 60,
      })

      gsap.set(underlineRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
      })

      // Create main timeline for animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
          onEnter: () => tl.restart(),
          onEnterBack: () => tl.restart(),
        },
      })

      // Animate first line
      tl.to(line1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power3.out',
      })

      // Animate second line
      tl.to(
        line2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power3.out',
        },
        '-=1'
      )

      // Animate underline with left-to-right draw effect
      tl.to(
        underlineRef.current,
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.out',
        },
        '-=0.5'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className='relative z-10 overflow-hidden pb-16 pt-24 sm:pb-32 sm:pt-48 md:pb-40 md:pt-56 lg:pb-48 lg:pt-64'
    >
      <AppLayoutPadding>
        <div className='mx-auto max-w-4xl text-center'>
          {/* First line */}
          <div
            ref={line1Ref}
            className='mb-4 sm:mb-6'
          >
            <h2 className='font-urbanist text-3xl font-light leading-tight text-black sm:text-4xl md:text-5xl lg:text-[64px] xl:text-[80px] 2xl:text-[96px]'>
              Clarity Can Be
            </h2>
          </div>

          {/* Second line with underline */}
          <div
            ref={line2Ref}
            className='relative inline-block'
          >
            <h2 className='font-urbanist text-3xl font-semibold leading-tight text-black sm:text-4xl md:text-5xl lg:text-[64px] xl:text-[80px] 2xl:text-[96px]'>
              Clairvoyance.
            </h2>
            {/* Green underline */}
            <div
              ref={underlineRef}
              className='absolute bottom-2 left-0 h-[3px] w-full bg-lime-400 sm:bottom-3 sm:h-[4px] lg:bottom-4 lg:h-[5px]'
            />
          </div>
        </div>
      </AppLayoutPadding>
    </div>
  )
}

export default SectionLargeText
