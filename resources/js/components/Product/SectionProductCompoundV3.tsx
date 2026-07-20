import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const compoundSteps = [
  {
    number: '01',
    week: 'WK 4',
    title: 'Ask',
    description: 'Start with the decision that needs an answer.',
    surface: 'bg-spontaine-surface-paper',
    offset: 'lg:translate-y-0',
  },
  {
    number: '02',
    week: 'WK 4',
    title: 'Answer',
    description: 'Work from definitions and limits your firm set.',
    surface: 'bg-[var(--spontaine-surface-lavender-soft)]',
    offset: 'lg:-translate-y-[14px]',
  },
  {
    number: '03',
    week: 'WK 6',
    title: 'Block',
    description: 'Keep the view as a reusable analytical object.',
    surface: 'bg-[var(--spontaine-surface-blue-soft)]',
    offset: 'lg:-translate-y-[28px]',
  },
  {
    number: '04',
    week: 'WK 8',
    title: 'Endpoint',
    description: 'Publish the governed output securely.',
    surface: 'bg-[var(--spontaine-surface-amber-soft)]',
    offset: 'lg:-translate-y-[42px]',
  },
  {
    number: '05',
    week: 'WK 16',
    title: 'Workflow',
    description: 'Connect the insight to the next reliable action.',
    surface: 'bg-[var(--spontaine-surface-mint-soft)]',
    offset: 'lg:-translate-y-[56px]',
  },
  {
    number: '06',
    week: 'WK 28',
    title: 'Product',
    description: 'Use the capability in a service clients pay for.',
    surface: 'bg-[var(--spontaine-surface-mint-strong)]',
    offset: 'lg:translate-y-0',
  },
]

export default function SectionProductCompoundV3() {
  const sectionRef = useRef<HTMLElement>(null)
  const ladderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const ladder = ladderRef.current

    if (!section || !ladder) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmallerScreen = window.matchMedia('(max-width: 1023px)').matches

    const context = gsap.context(() => {
      const rungs = gsap.utils.toArray<HTMLElement>('[data-compound-rung]')
      const title = section.querySelector<HTMLElement>('[data-compound-title]')
      const description = section.querySelector<HTMLElement>('[data-compound-description]')
      const tagline = section.querySelector<HTMLElement>('[data-compound-tagline]')
      const revealTargets = [title, description, tagline].filter(Boolean) as HTMLElement[]

      if (prefersReducedMotion) {
        gsap.set([...rungs, ...revealTargets], { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set([...rungs, ...revealTargets], { autoAlpha: 0, y: 26 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ladder,
          start: 'top 82%',
          once: true,
        },
      })

      if (isSmallerScreen) {
        if (title) {
          timeline.to(title, {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
            ease: 'power2.out',
          })
        }

        if (description) {
          timeline.to(
            description,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.48,
              ease: 'power2.out',
            },
            '>-0.12'
          )
        }

        timeline.to(
          rungs,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: {
              amount: 0.55,
              grid: 'auto',
              from: 'start',
            },
            ease: 'power2.out',
          },
          '>-0.04'
        )

        if (tagline) {
          timeline.to(tagline, {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            ease: 'power2.out',
          })
        }

        return
      }

      timeline.to(rungs, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.11,
        ease: 'power2.out',
      })

      if (title) {
        timeline.to(
          title,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
            ease: 'power2.out',
          },
          '>-0.04'
        )
      }

      if (description) {
        timeline.to(
          description,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
            ease: 'power2.out',
          },
          '>-0.12'
        )
      }

      if (tagline) {
        timeline.to(
          tagline,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            ease: 'power2.out',
          },
          '+=0.32'
        )
      }
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative isolate w-full overflow-hidden rounded-t-section-sm bg-spontaine-surface-paper pb-[112px] pt-[128px] md:rounded-t-section-md md:pb-[126px] md:pt-[150px] lg:rounded-t-section-lg lg:pb-[140px] lg:pt-[172px] xl:rounded-t-section-xl xl:pt-[188px]'
      aria-labelledby='product-compound-title'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='gap-[30px] md:flex md:items-end md:justify-between'>
          <div data-compound-title>
            <p className='eyebrow text-spontaine-gray-cool'>Compounding capability</p>
            <h2
              id='product-compound-title'
              className='display-xl mt-4 max-w-[620px] font-display text-spontaine-text-primary'
            >
              Every answer can become a capability.
            </h2>
          </div>

          <p
            data-compound-description
            className='body-lg mt-4 max-w-[400px] font-body text-spontaine-text-secondary md:mt-0'
          >
            Most tools answer a question and move on. Spontaine lets your firm keep the useful work
            &mdash; and build on it again. The dates are the point.
          </p>
        </div>

        <div
          ref={ladderRef}
          className='grid grid-cols-2 items-end gap-2 pt-28 lg:grid-cols-6 lg:gap-0'
        >
          {compoundSteps.map((step, index) => {
            const firstCard = index === 0
            const lastCard = index === compoundSteps.length - 1

            return (
              <div
                key={step.number}
                data-compound-rung
              >
                <article
                  className={[
                    'flex min-h-[140px] flex-col justify-between border border-[var(--spontaine-surface-line)] p-[14px] md:min-h-[158px]',
                    'rounded-[14px] lg:min-h-[158px] lg:rounded-none',
                    firstCard ? 'lg:rounded-l-[17px]' : 'lg:border-l-0',
                    lastCard ? 'lg:rounded-r-[17px] lg:border-r' : 'lg:border-r-0',
                    step.surface,
                    step.offset,
                  ].join(' ')}
                >
                  <div className='flex items-center justify-between font-mono text-[0.56rem] uppercase tracking-[0.1em] text-spontaine-gray-cool'>
                    <p className='m-0'>{step.number}</p>
                    <p className='m-0 text-spontaine-text-accent-dark'>{step.week}</p>
                  </div>

                  <strong className='font-display text-[0.98rem] font-bold leading-tight tracking-[-0.03em] text-spontaine-text-primary'>
                    {step.title}
                  </strong>

                  <p className='m-0 font-body text-[0.72rem] leading-[1.3] text-spontaine-text-secondary'>
                    {step.description}
                  </p>
                </article>
              </div>
            )
          })}
        </div>

        <p
          data-compound-tagline
          className='mx-auto mt-[66px] max-w-[620px] text-center font-display text-[clamp(1.2rem,2.2vw,1.6rem)] font-semibold leading-tight tracking-[-0.03em] text-spontaine-text-primary'
        >
          Nothing useful has to disappear.
        </p>
      </div>
    </section>
  )
}
