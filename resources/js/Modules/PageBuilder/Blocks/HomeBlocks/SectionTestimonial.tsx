import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AppSectionPadding from '@/Layouts/AppSectionPadding'
import { cn } from '@/lib/utils'
import SectionBody from '@/typography/SectionBody'
import SectionDescription from '@/typography/SectionDescription'
import SectionSubheading from '@/typography/SectionSubheading'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

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
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

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
    // {
    //   id: 2,
    //   logo: '/imge/testimonials/des-logo.png',
    //   quote:
    //     "Spontaine transformed how we handle complex data workflows. The platform's AI Semantic Layer makes sense of our fragmented business systems, providing trustworthy insights that drive million-dollar decisions with confidence.",
    //   author: 'Chief Executive Officer',
    //   position: 'CEO',
    //   company: 'Enterprise Solutions Inc.',
    // },
    // {
    //   id: 3,
    //   logo: '/imge/testimonials/des-logo.png',
    //   quote:
    //     'From chaos to clarity in weeks, not years. Spontaine delivered exactly what we needed - a unified view of our data that actually works. The 80/20 principle in action.',
    //   author: 'Chief Operating Officer',
    //   position: 'COO',
    //   company: 'Global Manufacturing Corp',
    // },
  ]

  const currentTestimonial = testimonials[currentIndex]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, quoteRef.current, authorRef.current, dotsRef.current], {
        opacity: 0,
        y: 30,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to(
          quoteRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          authorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          dotsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.2'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section
      ref={sectionRef}
      className={cn('text-gray-900', className)}
      style={{ backgroundColor: '#EEF1F0' }} // Light gray background
    >
      <AppSectionPadding>
        <AppLayoutPadding>
          <div className='mx-auto max-w-4xl text-center'>
            {/* Logo */}
            <div
              ref={logoRef}
              className='mb-8'
            >
              <div className='mx-auto flex h-24 w-24 items-center justify-center rounded-lg'>
                <img
                  src={currentTestimonial.logo}
                  alt={`${currentTestimonial.company} logo`}
                  className='h-full w-full object-contain'
                />
              </div>
            </div>

            {/* Quote */}
            <div
              className='mb-6 flex min-h-[120px] items-center justify-center'
              ref={quoteRef}
            >
              <SectionDescription
                theme='light'
                size='medium'
                maxWidth='2xl'
              >
                {currentTestimonial.quote}
              </SectionDescription>
            </div>

            {/* Author */}
            <div
              ref={authorRef}
              className='mb-6 flex min-h-[50px] flex-col items-center justify-center'
            >
              <SectionSubheading
                theme='light'
                size='small'
                weight='semibold'
                centered
                className='mb-1'
              >
                {currentTestimonial.author}
              </SectionSubheading>
              <SectionBody
                theme='gray'
                size='xs'
                centered
              >
                {currentTestimonial.company}
              </SectionBody>
            </div>

            {/* Pagination Dots */}
            {/* <div
              ref={dotsRef}
              className='flex justify-center gap-3'
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    'h-3 w-3 rounded-full transition-all duration-300',
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div> */}
          </div>
        </AppLayoutPadding>
      </AppSectionPadding>
    </section>
  )
}

export default SectionTestimonial
