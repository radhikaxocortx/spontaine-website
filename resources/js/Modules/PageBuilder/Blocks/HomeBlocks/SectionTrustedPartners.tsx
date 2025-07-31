import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AppSectionPadding from '@/Layouts/AppSectionPadding'
import { cn } from '@/lib/utils'
import SectionSubtitle from '@/typography/SectionSubtitle'
import SectionTitle from '@/typography/SectionTitle'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

interface SectionTrustedPartnersProps {
  className?: string
}

const SectionTrustedPartners = ({ className }: SectionTrustedPartnersProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const collageRef = useRef<HTMLDivElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const ctaButtonRef = useRef<HTMLButtonElement>(null)
  const checkbox1Ref = useRef<HTMLDivElement>(null)
  const checkbox2Ref = useRef<HTMLDivElement>(null)
  const image1Ref = useRef<HTMLDivElement>(null)
  const image2Ref = useRef<HTMLDivElement>(null)
  const image3Ref = useRef<HTMLDivElement>(null)
  const image4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states - hide left content
      gsap.set(leftContentRef.current, {
        opacity: 0,
        y: 50,
      })

      // Initial state for CTA button
      gsap.set(ctaButtonRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
      })

      // Initial states for checkboxes - hide them
      gsap.set([checkbox1Ref.current, checkbox2Ref.current], {
        opacity: 0,
        scale: 0,
      })

      // Initial states for images - coming together from different directions
      gsap.set(image1Ref.current, {
        opacity: 0,
        x: -40,
        y: -20,
        scale: 0.92,
      })

      gsap.set(image2Ref.current, {
        opacity: 0,
        x: 50,
        y: -15,
        scale: 0.92,
      })

      gsap.set(image3Ref.current, {
        opacity: 0,
        x: 60,
        y: 35,
        scale: 0.88,
      })

      gsap.set(image4Ref.current, {
        opacity: 0,
        x: -30,
        y: 30,
        scale: 0.92,
      })

      // Create timeline for scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      // Animate left content first
      tl.to(leftContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })

      // Animate images coming together toward their positions
      tl.to(
        image1Ref.current,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
        },
        '-=0.2'
      )
        .to(
          image4Ref.current,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
          },
          '-=0.7'
        )
        .to(
          image2Ref.current,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        .to(
          image3Ref.current,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        // Animate CTA button with attention-grabbing effect
        .to(
          ctaButtonRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )

      // Add continuous subtle pulse animation to CTA
      gsap.to(ctaButtonRef.current, {
        scale: 1.05,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2, // Start after main animation completes
      })

      // Add subtle glow animation
      gsap.to(ctaButtonRef.current, {
        boxShadow: '0 0 30px 8px rgba(163, 230, 53, 0.4)',
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.5,
      })

      // Animate checkboxes appearing at the very end with stagger
      gsap.to([checkbox1Ref.current, checkbox2Ref.current], {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        delay: 2.5, // After all other animations complete
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn('bg-black text-white', className)}
    >
      <AppSectionPadding>
        <AppLayoutPadding>
          <div className='grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16'>
            {/* Left Column */}
            <div
              ref={leftContentRef}
              className='space-y-8'
            >
              {/* Main Heading */}
              <SectionTitle
                theme='dark'
                alignment='left'
              >
                Spontaine Is Also For Trusted Partners.
              </SectionTitle>

              {/* Subtitle with Left Border */}
              <div className='relative pl-6'>
                <div className='absolute left-0 top-0 h-full w-1 bg-lime-400' />
                <SectionSubtitle
                  theme='dark'
                  size='small'
                  weight='bold'
                  centered={false}
                  className='max-w-none'
                >
                  Spontaine delivers all the value. Fast, and without the complexity. Your clients
                  will thank you even more.
                </SectionSubtitle>
              </div>

              {/* Paragraph */}
              <p className="font-['Space_Grotesk'] text-base font-normal leading-normal text-white">
                With fast deployments, no-code interfaces, and extensible APIs, you can deliver
                brand-new transformative value to your customers while expanding your own service
                offerings.
              </p>

              {/* Checklist Features */}
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                {/* Data Integration */}
                <div className='flex items-start gap-4'>
                  <div className='mt-1 flex-shrink-0'>
                    <div
                      ref={checkbox1Ref}
                      className='flex h-5 w-5 items-center justify-center rounded border-2 border-lime-400 bg-lime-400'
                    >
                      <svg
                        className='h-3 w-3 text-black'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-['Urbanist'] text-lg font-semibold text-white">
                      Data Integration
                    </h3>
                    <p className="font-['Space_Grotesk'] text-base font-normal leading-normal text-white">
                      Seamlessly unify your data without the complexity, cost, or chaos.
                    </p>
                  </div>
                </div>

                {/* AI Adoption */}
                <div className='flex items-start gap-4'>
                  <div className='mt-1 flex-shrink-0'>
                    <div
                      ref={checkbox2Ref}
                      className='flex h-5 w-5 items-center justify-center rounded border-2 border-lime-400 bg-lime-400'
                    >
                      <svg
                        className='h-3 w-3 text-black'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-['Urbanist'] text-lg font-semibold text-white">
                      AI Adoption
                    </h3>
                    <p className="font-['Space_Grotesk'] text-base font-normal leading-normal text-white">
                      AI adoption across your organization with tools built for real business users.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className=''>
                <button
                  ref={ctaButtonRef}
                  className='transform rounded-full bg-lime-400 px-4 py-2 font-["Urbanist"] text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_5px_#a3e635] sm:px-6 sm:py-3 sm:text-base'
                >
                  Partner With Us →
                </button>
              </div>
            </div>

            {/* Right Column - Image Layout */}
            <div
              ref={collageRef}
              className='relative'
            >
              <div className='relative'>
                {/* Background Images Layout */}
                <div className='grid grid-cols-2 gap-6'>
                  {/* Left Column */}
                  <div className='space-y-6'>
                    {/* Top Left Image */}
                    <div
                      ref={image1Ref}
                      className='aspect-square overflow-hidden rounded-2xl'
                    >
                      <img
                        src='/imge/home/partner/1.png'
                        alt='Business professionals collaborating'
                        className='h-full w-full object-cover'
                      />
                    </div>

                    {/* Bottom Left Image with Background Pattern */}
                    <div
                      ref={image4Ref}
                      className='relative aspect-[4/3] overflow-hidden rounded-2xl'
                    >
                      {/* Background SVG Pattern */}
                      <div
                        className='absolute inset-0 z-0'
                        style={{
                          backgroundImage: "url('/imge/home/partner/bg.svg')",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      {/* Centered Image Container */}
                      <div className='relative z-10 flex h-full items-center justify-center'>
                        <img
                          src='/imge/home/partner/4.png'
                          alt='Team member working'
                          className='h-3/4 w-auto object-cover'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className='space-y-6'>
                    {/* Top Right Image */}
                    <div
                      ref={image2Ref}
                      className='aspect-[4/3] overflow-hidden rounded-2xl'
                    >
                      <img
                        src='/imge/home/partner/2.png'
                        alt='Professional working on laptop'
                        className='h-full w-full object-cover'
                      />
                    </div>

                    {/* Spacer for bottom right image (will be overlapped) */}
                    <div className='aspect-square'></div>
                  </div>
                </div>

                {/* Overlapping Bottom Right Image */}
                <div
                  ref={image3Ref}
                  className='absolute bottom-0 right-0 z-20 aspect-square w-1/2 -translate-x-6 translate-y-6 overflow-hidden rounded-2xl'
                >
                  <img
                    src='/imge/home/partner/3.png'
                    alt='Collaborative workspace'
                    className='h-full w-full object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
        </AppLayoutPadding>
      </AppSectionPadding>
    </section>
  )
}

export default SectionTrustedPartners
