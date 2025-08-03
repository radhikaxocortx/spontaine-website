import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

interface LogoItem {
  id: number
  src: string
  alt: string
  link?: string
}

interface CompanyLogosSectionProps {
  className?: string
}

// Static logo data - hardcoded within component
const COMPANY_LOGOS: LogoItem[] = [
  { id: 1, src: '/imge/logos/1.png', alt: 'Company 1' },
  { id: 2, src: '/imge/logos/2.png', alt: 'Company 2' },
  { id: 3, src: '/imge/logos/3.png', alt: 'Company 3' },
  { id: 4, src: '/imge/logos/4.png', alt: 'Company 4' },
  { id: 5, src: '/imge/logos/5.png', alt: 'Company 5' },
  { id: 6, src: '/imge/logos/6.png', alt: 'Company 6' },
]

const CompanyLogosSection = ({ className }: CompanyLogosSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state - logos hidden and positioned left
      gsap.set('.company-logo-item', {
        opacity: 0,
        x: -50,
      })

      // Create scroll-triggered stagger animation
      gsap.to('.company-logo-item', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.3, // Left-to-right stagger with 0.1s delay between each
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none', // Play once only
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn('bg-black py-12', className)}
    >
      <AppLayoutPadding>
        {/* Logos Grid */}
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-6 md:gap-8'>
          {COMPANY_LOGOS.map((logo) => (
            <div
              key={logo.id}
              className='company-logo-item flex items-center justify-center'
            >
              {logo.link ? (
                <a
                  href={logo.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group block'
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={cn(
                      'object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100',
                      logo.id === 2 || logo.id === 5
                        ? 'h-20 w-32 sm:h-16 sm:w-28'
                        : 'h-16 w-24 sm:h-12 sm:w-20'
                    )}
                    loading='lazy'
                  />
                </a>
              ) : (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={cn(
                    'object-contain opacity-90 transition-opacity duration-300 hover:opacity-100',
                    logo.id === 2 || logo.id === 5
                      ? 'md:h-16 md:w-28 lg:h-20 lg:w-32'
                      : 'md:h-12 md:w-20 lg:h-16 lg:w-24'
                  )}
                  loading='lazy'
                />
              )}
            </div>
          ))}
        </div>
      </AppLayoutPadding>
    </section>
  )
}

export default CompanyLogosSection
