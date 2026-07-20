import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const companyFacts = [
  {
    label: 'Legal entity',
    value: 'Intuon Analytics Private Limited',
    detail: 'India jurisdiction, EU data residency',
  },
  {
    label: 'What we build',
    value: 'Governed intelligence for professional services',
    detail: "deployed inside the client's own VPC",
  },
  {
    label: 'Compliance',
    value: 'ISO 27001 certified',
    detail: 'GDPR Article 28 DPA in place',
  },
  {
    label: 'European channel',
    value: 'NovaTecto',
    detail: 'exclusive Spontaine sales partner in Europe',
  },
]

export default function SectionCompanyFactsV3() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const heading = section.querySelector<HTMLElement>('[data-company-facts-heading]')
      const strip = section.querySelector<HTMLElement>('[data-company-facts-strip]')
      const facts = gsap.utils.toArray<HTMLElement>('[data-company-facts-item]')
      const revealTargets = [heading, strip, ...facts].filter(Boolean) as HTMLElement[]

      if (prefersReducedMotion) {
        gsap.set(revealTargets, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set([heading, strip], { autoAlpha: 0, y: 16 })
      gsap.set(facts, { autoAlpha: 0, y: 10 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      })

      if (heading) {
        timeline.to(heading, {
          autoAlpha: 1,
          y: 0,
          duration: 0.52,
          ease: 'power2.out',
        })
      }

      if (strip) {
        timeline.to(
          strip,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '>-0.1'
        )
      }

      timeline.to(
        facts,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '>-0.22'
      )
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby='company-facts-title'
      className='bg-spontaine-surface-sky-soft relative isolate w-full overflow-hidden rounded-t-section-sm pb-[104px] pt-[128px] md:rounded-t-section-md md:pb-[118px] md:pt-[150px] lg:rounded-t-section-lg lg:pb-[132px] lg:pt-[172px] xl:rounded-t-section-xl xl:pt-[188px]'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div
          data-company-facts-heading
          className='mx-auto max-w-[760px] text-center'
        >
          <p className='eyebrow text-spontaine-gray-cool'>The company</p>

          <h2
            id='company-facts-title'
            className='display-xl mx-auto mt-3 max-w-[620px] font-display text-spontaine-text-primary'
          >
            Live in the field, quietly.
          </h2>
        </div>

        <div
          data-company-facts-strip
          className='bg-spontaine-surface-paper-soft mt-11 grid overflow-hidden rounded-[var(--radius-card)] shadow-surface md:grid-cols-2'
        >
          {companyFacts.map((fact, index) => (
            <div
              key={fact.label}
              data-company-facts-item
              className={[
                'p-[22px] md:p-[26px]',
                index % 2 === 0 ? 'md:border-r md:border-[var(--spontaine-surface-line)]' : '',
                index < companyFacts.length - 1
                  ? 'border-b border-[var(--spontaine-surface-line)]'
                  : '',
                index === 2 ? 'md:border-b-0' : '',
              ].join(' ')}
            >
              <p className='m-0 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em] text-spontaine-gray-cool'>
                {fact.label}
              </p>

              <p className='m-0 mt-1.5 font-body text-base font-semibold leading-[1.45] text-spontaine-text-primary'>
                {fact.value}{' '}
                <small className='font-body text-[0.74rem] font-normal text-spontaine-gray-cool'>
                  {fact.detail}
                </small>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
