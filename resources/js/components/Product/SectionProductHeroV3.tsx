import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

export default function SectionProductHeroV3() {
  return (
    <section
      id='top'
      aria-labelledby='spontaine-product-hero-title'
      className='relative isolate overflow-hidden bg-hero-wash-soft px-[var(--space-shell-sm)] pb-[150px] pt-20 md:px-[var(--space-shell)] md:pb-[150px] md:pt-[168px] lg:pt-[120px]'
    >
      {/* Diagonal ambient band behind the product visual */}
      <div
        aria-hidden='true'
        className='animate-v3-ken-burns-slow absolute bottom-[22%] left-[-16%] right-[-14%] z-0 h-[150px] opacity-70 blur-[5px]'
      >
        <div className='h-full w-full rotate-[-13deg] bg-ambient-band-mint-amber' />
      </div>

      <div className='relative z-10 mx-auto grid w-full max-w-[1180px] pl-2 md:pl-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-10'>
        {/* Product message and primary actions */}
        <div className='relative z-10 max-w-[760px] pb-8 pt-12 md:pb-20 md:pt-16 lg:pb-[130px]'>
          <p className='eyebrow mb-6 max-w-[560px] text-spontaine-gray-cool'>
            A new intelligence layer for professional services
          </p>

          <h1
            id='spontaine-product-hero-title'
            className='display-hero text-spontaine-dark'
          >
            Build the{' '}
            <span className='display-hero text-spontaine-text-accent-dark'>AI-native</span> firm.
          </h1>

          <p className='body-lg mt-7 max-w-[570px] text-spontaine-gray-muted'>
            Spontaine is the operating system for AI-native professional services firms. Your
            questions become governed answers, your expertise becomes products, and your workflows
            become revenue - inside your own perimeter, on infrastructure you control.
          </p>

          <div className='mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <Button
              asChild
              variant='v3Primary'
              size='v3Hero'
            >
              <a href='/buyers-guide'>
                Compare Capability
                <ArrowUpRight
                  aria-hidden='true'
                  className='h-4 w-4'
                  strokeWidth={2}
                />
              </a>
            </Button>

            <Button
              asChild
              variant='v3Secondary'
              size='v3Hero'
            >
              <a href='/#architecure'>
                Explore the architecture
                <ArrowUpRight
                  aria-hidden='true'
                  className='h-4 w-4'
                  strokeWidth={2}
                />
              </a>
            </Button>
          </div>

          <p className='mt-5 font-mono text-xs text-spontaine-gray-deep'>
            KEEP YOUR SYSTEMS &middot; OWN WHAT YOU BUILD &middot; WEEK 4, NOT YEAR 2
          </p>
        </div>

        {/* Abstract product visual */}
        <div
          className='pointer-events-none absolute inset-x-0 top-12 z-0 h-full min-h-[380px] w-full lg:relative lg:top-auto lg:mx-auto lg:min-h-[440px] lg:max-w-none'
          aria-hidden='true'
        >
          <div className='animate-v3-ken-burns absolute right-[6%] top-0 aspect-square w-[280px] opacity-60 md:w-[340px] lg:right-[4%] lg:top-6 lg:w-[380px] lg:opacity-100'>
            <div className='relative h-full w-full rotate-[15deg]'>
              <div className='absolute inset-0 overflow-hidden rounded-[42%_58%_63%_37%/41%_44%_56%_59%] bg-prism-glass-mint shadow-prism-glass' />
              <div className='absolute inset-[12%] z-10 rotate-[30deg] skew-x-[-12deg] border border-spontaine-gray/20' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
