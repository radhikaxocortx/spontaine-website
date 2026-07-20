import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const expertSteps = [
  {
    time: '00:00',
    label: 'Define the commercial question',
  },
  {
    time: '08:00',
    label: "Add the firm's pricing principles",
  },
  {
    time: '17:00',
    label: 'Set the evidence and guardrails',
  },
  {
    time: '30:00',
    label: 'Publish for review — done before lunch',
  },
]

const expertExamples = ['Audit Coach', 'Tax Opportunity Finder', 'Margin Investigator', 'Portfolio Analyst']

export default function SectionProductExpertV3() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current

    if (!section || !card) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>('[data-expert-eyebrow]')
      const title = section.querySelector<HTMLElement>('[data-expert-title]')
      const description = section.querySelector<HTMLElement>('[data-expert-description]')
      const cardStage = section.querySelector<HTMLElement>('[data-expert-card]')
      const steps = gsap.utils.toArray<HTMLElement>('[data-expert-step]')
      const revealTargets = [eyebrow, title, description, cardStage].filter(Boolean) as HTMLElement[]

      if (prefersReducedMotion) {
        gsap.set([...revealTargets, ...steps], { autoAlpha: 1, x: 0, y: 0 })
        return
      }

      gsap.set(revealTargets, { autoAlpha: 0, y: 16 })
      gsap.set(steps, { autoAlpha: 0, x: -14 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      })

      if (eyebrow) {
        timeline.to(eyebrow, {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          ease: 'power2.out',
        })
      }

      if (title) {
        timeline.to(
          title,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            ease: 'power2.out',
          },
          '>-0.14'
        )
      }

      if (description) {
        timeline.to(
          description,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '>-0.12'
        )
      }

      if (cardStage) {
        timeline.to(
          cardStage,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.54,
            ease: 'power2.out',
          },
          '>-0.04'
        )
      }

      timeline.to(
        steps,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.16,
          ease: 'power2.out',
        },
        '>-0.2'
      )
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative isolate w-full overflow-hidden rounded-t-section-sm bg-spontaine-surface-ice pb-[112px] pt-[128px] md:rounded-t-section-md md:pb-[126px] md:pt-[150px] lg:rounded-t-section-lg lg:pb-[150px] lg:pt-[172px] xl:rounded-t-section-xl xl:pt-[188px]'
      aria-labelledby='product-expert-title'
    >
      <div className='mx-auto grid w-full max-w-[1180px] gap-10 px-[var(--space-shell-sm)] md:px-[var(--space-shell)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-[72px]'>
        <div>
          <p
            data-expert-eyebrow
            className='eyebrow text-spontaine-gray-cool'
          >
            The people who know the work
          </p>

          <h2
            id='product-expert-title'
            data-expert-title
            className='display-xl mt-[15px] max-w-[620px] font-display text-spontaine-text-primary'
          >
            Every expert can build another expert.
          </h2>

          <p
            data-expert-description
            className='body-lg mt-5 max-w-[460px] font-body text-spontaine-text-secondary'
          >
            Your pricing partner should not need a backlog, an engineer, or a six-month project to
            capture a proven approach. Experts define the knowledge, rules, and boundaries of a
            Skill &mdash; inside the application, in the time it takes to have a coffee. The firm
            reuses it, with oversight built in.
          </p>
        </div>

        <div
          ref={cardRef}
          data-expert-card
        >
          <div className='rounded-[24px] border border-spontaine-white/90 bg-spontaine-surface-paper p-5 shadow-surface'>
            <div className='flex flex-col gap-4 border-b border-[var(--spontaine-surface-line)] pb-[18px] sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-2.5'>
                <div
                  aria-hidden='true'
                  className='h-8 w-8 rounded-full bg-mint-blue'
                />
                <div>
                  <strong className='block font-display text-[0.92rem] font-bold leading-tight text-spontaine-text-primary'>
                    Pricing Partner
                  </strong>
                  <p className='m-0 mt-0.5 font-body text-[0.66rem] leading-tight text-spontaine-gray-cool'>
                    Commercial excellence
                  </p>
                </div>
              </div>

              <div className='w-fit rounded-[var(--radius-pill)] bg-spontaine-accent-soft px-2.5 py-1.5 font-mono text-[0.6rem] font-medium text-spontaine-text-accent-dark'>
                Pricing Advisor
              </div>
            </div>

            <div>
              {expertSteps.map((step, index) => (
                <div
                  key={step.time}
                  data-expert-step
                  className={[
                    'grid grid-cols-[62px_1fr] gap-2.5 py-[14px] font-body text-[0.84rem] leading-snug text-spontaine-gray-muted',
                    index === expertSteps.length - 1
                      ? ''
                      : 'border-b border-[var(--spontaine-surface-line)]',
                  ].join(' ')}
                >
                  <p className='m-0 font-mono text-[0.76rem] font-medium text-spontaine-text-accent-dark'>
                    {step.time}
                  </p>
                  <p className='m-0'>{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-[18px] flex flex-wrap gap-[7px]'>
            {expertExamples.map((example) => (
              <div
                key={example}
                className='rounded-[var(--radius-pill)] border border-[var(--spontaine-surface-line)] bg-spontaine-surface-paper px-2.5 py-[7px] font-mono text-[0.62rem] font-medium text-spontaine-gray-deep'
              >
                {example}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
