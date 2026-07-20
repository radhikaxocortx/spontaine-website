import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const beliefCards = [
  {
    number: '01',
    title: "Own it, don't rent it.",
    body: "A firm's best thinking shouldn't live inside a vendor's tool it pays for forever. Everything Spontaine encodes - the logic, the skills, the endpoints - is the firm's own infrastructure, and stays theirs.",
  },
  {
    number: '02',
    title: 'Governance by architecture, not policy.',
    body: "Client data rules out public models. So the controls are built into the system: data is masked before any inference, every answer traces to a governed definition, and compute never leaves the firm's perimeter.",
  },
  {
    number: '03',
    title: 'Weeks, not years.',
    body: 'Owned AI has meant billion-dollar builds only the largest firms could afford. We made it something a mid-market firm turns on in weeks - inside their own environment, with their systems left in place.',
  },
]

export default function SectionCompanyBeliefsV3() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const heading = section.querySelector<HTMLElement>('[data-beliefs-heading]')
      const cards = gsap.utils.toArray<HTMLElement>('[data-beliefs-card]')
      const revealTargets = [heading, ...cards].filter(Boolean) as HTMLElement[]

      if (prefersReducedMotion) {
        gsap.set(revealTargets, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set(revealTargets, { autoAlpha: 0, y: 16 })

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

      timeline.to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
        },
        '>-0.08'
      )
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby='company-beliefs-title'
      className='relative isolate w-full overflow-hidden rounded-t-section-sm bg-spontaine-surface-cream pb-[104px] pt-[128px] md:rounded-t-section-md md:pb-[118px] md:pt-[150px] lg:rounded-t-section-lg lg:pb-[132px] lg:pt-[172px] xl:rounded-t-section-xl xl:pt-[188px]'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div
          data-beliefs-heading
          className='max-w-[760px]'
        >
          <p className='eyebrow text-spontaine-gray-cool'>What we believe</p>

          <h2
            id='company-beliefs-title'
            className='display-xl mt-3 max-w-[660px] font-display text-spontaine-text-primary'
          >
            Three things we won't
            <br />
            build around.
          </h2>
        </div>

        <div className='mt-11 grid gap-5 md:grid-cols-3'>
          {beliefCards.map((card) => (
            <article
              key={card.number}
              data-beliefs-card
              className='rounded-[var(--radius-card)] border border-[var(--spontaine-surface-line)] bg-spontaine-surface-paper p-[26px] shadow-surface'
            >
              <p className='m-0 font-mono text-[0.72rem] font-medium uppercase tracking-[0.1em] text-spontaine-gray-cool'>
                {card.number}
              </p>

              <h3 className='mt-3 font-display text-[1.2rem] font-bold leading-[1.15] tracking-[-0.02em] text-spontaine-text-primary'>
                {card.title}
              </h3>

              <p className='mt-2 font-body text-[0.94rem] leading-[1.5] text-spontaine-text-secondary'>
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
