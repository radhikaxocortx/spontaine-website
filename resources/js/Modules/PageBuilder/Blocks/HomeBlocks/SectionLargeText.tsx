import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import SectionTitle from '@/typography/SectionTitle'
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

      // Animate second line with delay
      tl.to(
        line2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power3.out',
        },
        '+=0.5'
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
      className='relative z-10 flex min-h-screen items-center justify-center overflow-hidden py-16'
    >
      <AppLayoutPadding>
        <div className='mx-auto max-w-4xl text-center'>
          {/* First line */}
          <div
            ref={line1Ref}
            className='mb-4 sm:mb-6'
          >
            <SectionTitle theme='light'>Clarity.</SectionTitle>
          </div>

          {/* Second line with underline */}
          <div
            ref={line2Ref}
            className='relative inline-block'
          >
            <h1 className='text-6xl'>
              {/* <h2 className='font-urbanist text-3xl font-semibold leading-tight text-black sm:text-4xl md:text-5xl lg:text-[64px] xl:text-[80px] 2xl:text-[96px]'> */}
              Clairvoyance.
              {/* </h2> */}
            </h1>
            {/* Green underline */}
            <div
              ref={underlineRef}
              className='absolute bottom-2 left-0 h-[3px] w-full bg-lime-400 sm:bottom-3 sm:h-[4px] lg:-bottom-1 lg:h-[5px]'
            />
          </div>
        </div>
      </AppLayoutPadding>
    </div>
  )
}

export default SectionLargeText
