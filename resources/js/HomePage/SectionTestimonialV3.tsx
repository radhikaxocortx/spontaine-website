import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { useState } from 'react'

interface TestimonialV3 {
  readonly quote: string
  readonly author: string
}

const testimonials: TestimonialV3[] = [
  {
    quote: 'No BI product offers this scale of Q&A exploration.',
    author: 'Senior Stakeholder',
  },
]

export default function SectionTestimonialV3() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTestimonial = testimonials[activeIndex]
  const canGoPrevious = activeIndex > 0
  const canGoNext = activeIndex < testimonials.length - 1

  return (
    <section
      aria-label='Customer testimonial'
      className='bg-[#efecdc] py-16 sm:py-20 lg:py-24'
    >
      <AppLayoutPadding>
        <div className='mx-auto flex min-h-[232px] max-w-lg flex-col items-center justify-center text-center'>
          <blockquote className='font-display text-2xl font-bold leading-[1.12] text-[#303033] sm:text-3xl lg:text-[32px]'>
            &ldquo;{activeTestimonial.quote}&rdquo;
          </blockquote>

          <p className='mt-9 font-body text-[11px] leading-none text-[#303033]/80'>
            -{activeTestimonial.author}
          </p>

          <div
            className='mt-11 flex items-center justify-center gap-3'
            aria-label='Testimonial navigation'
          >
            <button
              type='button'
              onClick={() => setActiveIndex((index) => Math.max(index - 1, 0))}
              disabled={!canGoPrevious}
              className='flex h-7 w-7 items-center justify-center rounded-md bg-white/40 text-[#303033]/35 transition-colors hover:bg-white/60 hover:text-[#303033]/70 disabled:cursor-not-allowed disabled:opacity-50'
              aria-label='Previous testimonial'
            >
              <svg
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='none'
                aria-hidden='true'
              >
                <path
                  d='M12 5L7 10L12 15'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>

            <div className='flex items-center gap-2'>
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.quote}
                  type='button'
                  onClick={() => setActiveIndex(index)}
                  className={[
                    'h-1.5 w-1.5 rounded-full transition-colors',
                    index === activeIndex ? 'bg-spontaine-accent' : 'bg-white/70',
                  ].join(' ')}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>

            <button
              type='button'
              onClick={() =>
                setActiveIndex((index) => Math.min(index + 1, testimonials.length - 1))
              }
              disabled={!canGoNext}
              className='flex h-7 w-7 items-center justify-center rounded-md bg-white/40 text-[#303033]/35 transition-colors hover:bg-white/60 hover:text-[#303033]/70 disabled:cursor-not-allowed disabled:opacity-50'
              aria-label='Next testimonial'
            >
              <svg
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='none'
                aria-hidden='true'
              >
                <path
                  d='M8 5L13 10L8 15'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
      </AppLayoutPadding>
    </section>
  )
}
