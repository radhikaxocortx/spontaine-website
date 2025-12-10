import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

interface Testimonial {
  id: number
  logo: string
  quote: string
  author: string
  position: string
  company: string
}

interface SectionTestimonialProps {
  className?: string
}

const SectionTestimonial = ({ className }: SectionTestimonialProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)

  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      logo: '/imge/home/testimonials/des.png',
      quote:
        "In two years, this platform has powered our primary web portal, helped us digitally serve 70 years of Kerala's statistical history and to 3.7 million users. We went from publishing annual reports to providing real-time, interactive insights that citizens, researchers, and policymakers use to make informed decisions.",
      author: 'Director',
      position: 'Director',
      company: 'Department of Economics & Statistics',
    },
  ]

  const currentTestimonial = testimonials[currentIndex]
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < testimonials.length - 1

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  // Animate content fade when testimonial changes
  useEffect(() => {
    if (!quoteRef.current || !authorRef.current || !logoRef.current) return

    const tl = gsap.timeline()

    // Fade out
    tl.to([logoRef.current, quoteRef.current, authorRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
    })
      // Update content happens here (React handles this)
      .set({}, {}, '+=0.1')
      // Fade in
      .to([logoRef.current, quoteRef.current, authorRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
  }, [currentIndex])

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative w-full overflow-hidden border-t border-[#f1f1f1] bg-white',
        className
      )}
    >
      <div className='py-16 sm:py-20 lg:py-24'>
        <div className='mx-auto max-w-4xl px-6'>
          {/* Logo */}
          <div
            ref={logoRef}
            className='mb-2 flex justify-center rounded-full'
          >
            <div className='flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-full bg-white shadow-sm'>
              <img
                src={currentTestimonial.logo}
                alt={`${currentTestimonial.company} logo`}
                className='h-full w-full rounded-full object-contain p-2'
              />
            </div>
          </div>

          {/* Author Info */}
          <div
            ref={authorRef}
            className='mb-12 text-center'
          >
            <p className='font-body text-spontaine-gray-cool mb-1 text-xl font-bold leading-relaxed'>
              {currentTestimonial.author}
            </p>
            <p className='font-body text-spontaine-gray-cool text-xl leading-relaxed'>
              {currentTestimonial.company}
            </p>
          </div>

          {/* Quote */}
          <div
            ref={quoteRef}
            className='mb-16 flex justify-center'
          >
            <p className='font-body text-spontaine-dark text-center text-2xl font-normal leading-relaxed tracking-wide'>
              {currentTestimonial.quote}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className='flex items-center justify-center gap-4'>
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className='bg-spontaine-light flex h-10 w-10 items-center justify-center rounded-xl text-spontaine-gray transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30'
              aria-label='Previous testimonial'
            >
              <svg
                className='h-4 w-4'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className='flex items-center gap-2'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2.5 rounded-md transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-spontaine-accent-soft w-2.5'
                      : 'w-2.5 bg-spontaine-gray hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className='bg-spontaine-light flex h-10 w-10 items-center justify-center rounded-xl text-spontaine-gray transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30'
              aria-label='Next testimonial'
            >
              <svg
                className='h-4 w-4'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionTestimonial
