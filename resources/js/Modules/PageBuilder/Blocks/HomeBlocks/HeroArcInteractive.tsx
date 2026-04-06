import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

export default function HeroArcInteractive() {
  const arcRef = useRef(null)

  useEffect(() => {
    const arc = arcRef.current

    const normalArc = 'M0,80 C300,20 900,20 1200,80 L1200,200 L0,200 Z'
    const inwardArc = 'M0,80 C300,5 900,5 1200,80 L1200,200 L0,200 Z'

    // Subtle fluid animation when arc enters viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#arc-wrapper',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(arc, {
      morphSVG: inwardArc,
      duration: 1.2,
      ease: 'power2.inOut',
    }).to(arc, {
      morphSVG: normalArc,
      duration: 1.2,
      ease: 'power2.inOut',
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <>
      {/* HERO WITH VIDEO BACKGROUND */}
      <section
        id='hero'
        className='relative min-h-screen w-full overflow-x-hidden'
      >
        {/* VIDEO BACKGROUND */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className='absolute inset-0 h-full w-full object-cover'
          poster='/imge/home/hero.png'
        >
          <source
            src='/imge/home/hero-video2.mp4'
            type='video/mp4'
          />
        </video>

        {/* WHITE OVERLAY */}
        <div className='pointer-events-none absolute inset-0 bg-white/20'></div>

        {/* HERO CONTENT */}

        <AppLayoutPadding>
          <div className='relative z-10 flex min-h-screen flex-col items-center justify-center pb-28 pt-32 text-center sm:pb-36 sm:pt-48'>
            {/* Main Title */}
            <div className='mb-8'>
              <h1 className='mb-2 font-heading text-[48px] font-medium leading-[1] text-black sm:text-[64px] lg:text-[80px] xl:text-[96px]'>
                One Source of Truth.
              </h1>
              <h2 className='font-heading text-[48px] font-medium leading-[1.1] text-black sm:text-[64px] lg:text-[80px] xl:text-[96px]'>
                <em className='font-light italic'>Infinite</em> Automation.
              </h2>
            </div>

            {/* Description */}
            <div className='mb-12'>
              <p className='mx-auto max-w-[560px] font-body text-[16px] font-normal leading-[1.8] text-gray-800 sm:text-[20px]'>
                Spontaine unifies all your data into one insights machine, empowering your internal
                experts to execute strategically, and launch AI-driven automation 100x faster and
                with perfect accuracy.
              </p>
            </div>
          </div>
        </AppLayoutPadding>

        {/* ARC AT THE END OF HERO */}
        {/* <div
          id='arc-wrapper'
          className='absolute bottom-0 left-0 w-full'
        >
          <svg
            viewBox='0 0 1200 200'
            preserveAspectRatio='none'
            className='h-[200px] w-full'
          >
            <path
              ref={arcRef}
              fill='#ffffff'
              d='M0,80 C300,20 900,20 1200,80 L1200,200 L0,200 Z'
            />
          </svg>
        </div> */}
      </section>
    </>
  )
}
