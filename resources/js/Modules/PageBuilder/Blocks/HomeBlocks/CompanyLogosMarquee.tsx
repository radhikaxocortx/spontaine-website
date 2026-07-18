import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

/**
 * CompanyLogosMarquee Component
 *
 * An infinite horizontal marquee displaying company logos
 * - Shows 3 logos at any given time
 * - Smooth continuous scrolling animation
 * - Seamless loop with duplicated logos
 * - Clean, minimal design matching Figma specs
 */

interface LogoItem {
  id: number
  src: string
  alt: string
}

const LOGOS: LogoItem[] = [
  { id: 1, src: '/imge/logos/leap.svg', alt: 'LEAP' },
  { id: 2, src: '/imge/logos/psi.svg', alt: 'PSI Medical' },
  { id: 3, src: '/imge/logos/kseb.svg', alt: 'KSEB' },
  { id: 4, src: '/imge/logos/kadodo.svg', alt: 'Kadodo' },
  { id: 5, src: '/imge/logos/iccs.svg', alt: 'ICCS' },
]

export default function CompanyLogosMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const arcTopRef = useRef(null)

  useEffect(() => {
    if (!trackRef.current) return

    const track = trackRef.current
    const firstChild = track.children[0] as HTMLElement
    if (!firstChild) return

    // Calculate width of a single logo item (including gap)
    const computedStyle = window.getComputedStyle(track)
    const gap = parseFloat(computedStyle.gap) || 0
    const logoWidth = firstChild.offsetWidth
    const singleItemWidth = logoWidth + gap

    // Total width of one complete set
    const totalWidth = singleItemWidth * LOGOS.length

    // Continuous seamless scroll
    gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 25,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    })
  }, [])

  useEffect(() => {
    const topArc = arcTopRef.current

    // Top arc animation
    const normalTopArc =
      'M1920 128C1635.2 46.4 1308 0 960 0C612 0 284.8 46.4 0 128V183.067H1920V128Z'
    const inwardTopArc =
      'M1920 128C1635.2 70 1308 30 960 30C612 30 284.8 70 0 128V183.067H1920V128Z'

    const topTl = gsap.timeline({
      scrollTrigger: {
        trigger: arcTopRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    })

    topTl
      .to(topArc, {
        morphSVG: inwardTopArc,
        duration: 1.2,
        ease: 'power2.inOut',
      })
      .to(topArc, {
        morphSVG: normalTopArc,
        duration: 1.2,
        ease: 'power2.inOut',
      })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section className='relative -mt-32 w-full overflow-hidden'>
      {/* TOP ARC - overlaps with section above */}
      <div className='relative w-full'>
        <svg
          viewBox='0 0 1920 183'
          preserveAspectRatio='none'
          className='block w-full'
        >
          <path
            ref={arcTopRef}
            d='M1920 128C1635.2 46.4 1308 0 960 0C612 0 284.8 46.4 0 128V183.067H1920V128Z'
            fill='#ffffff'
          />
        </svg>
      </div>

      {/* MAIN CONTENT */}
      <div className='relative -mt-1 bg-white py-4 sm:py-10 lg:py-8'>
        {/* Section Label */}
        <div className='mb-12 flex justify-center'>
          <div className='rounded-md bg-black/5 px-6 py-2.5'>
            <p className='text-spontaine-dark-bg font-roboto-mono text-sm tracking-tight'>
              Our customers
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className='mx-auto mb-12 max-w-4xl px-6 text-center sm:mb-16 lg:mb-20'>
          <h2 className='font-display text-spontaine-dark text-5xl font-normal leading-tight sm:text-6xl lg:text-7xl xl:text-[88.9px] xl:leading-[90px]'>
            Trusted by
            <br />
            high-impact organizations
          </h2>
        </div>

        {/* Marquee Container */}
        <div className='relative mx-auto max-w-3xl overflow-hidden px-6'>
          {/* Fade Gradients on Edges */}
          <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent' />

          {/* Marquee Track */}
          <div
            ref={trackRef}
            className='flex gap-16 sm:gap-20 lg:gap-24'
          >
            {/* Render logos twice for seamless loop */}
            {[...LOGOS, ...LOGOS].map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className='flex flex-shrink-0 items-center justify-center'
                style={{ width: '100px' }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className='h-auto w-full max-w-[80px] object-contain transition-all duration-300 hover:opacity-100 hover:grayscale-0'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
