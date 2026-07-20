import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const routeCards = [
  {
    tag: 'Structured intelligence',
    title: 'Ingest where depth matters.',
    body: 'Bring critical firm knowledge, policies, and documents into governed Lenses where context and traceability matter most.',
    art: 'structured',
  },
  {
    tag: 'Live tool access',
    title: 'Reach out where currency matters.',
    body: 'Let governed Skills connect to live systems when freshness matters, without moving every source into another platform.',
    art: 'live',
  },
]

function RouteArt({ kind }: { readonly kind: string }) {
  if (kind === 'live') {
    return (
      <figure
        aria-hidden='true'
        className='relative mt-8 h-24'
      >
        <div className='absolute left-1/2 top-1/2 h-[88px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-dashed border-[var(--spontaine-orbit-stroke)]' />
        <div className='absolute left-[6%] top-1.5 rounded-[9px] border border-[var(--spontaine-surface-line)] bg-spontaine-surface-paper px-[9px] py-1.5 font-mono text-[0.58rem] font-medium text-spontaine-gray-deep shadow-[var(--shadow-tool-chip)]'>
          CRM
        </div>
        <div className='absolute right-[7%] top-[34px] rounded-[9px] border border-[var(--spontaine-surface-line)] bg-spontaine-surface-paper px-[9px] py-1.5 font-mono text-[0.58rem] font-medium text-spontaine-gray-deep shadow-[var(--shadow-tool-chip)]'>
          Secure tool
        </div>
        <div className='absolute bottom-0 left-[34%] rounded-[9px] border border-[var(--spontaine-surface-line)] bg-spontaine-surface-paper px-[9px] py-1.5 font-mono text-[0.58rem] font-medium text-spontaine-gray-deep shadow-[var(--shadow-tool-chip)]'>
          ERP
        </div>
      </figure>
    )
  }

  return (
    <figure
      aria-hidden='true'
      className='relative mt-8 h-24'
    >
      <div className='absolute left-[4%] right-[4%] top-1/2 h-0.5 -translate-y-1/2 bg-[linear-gradient(90deg,var(--spontaine-flow-muted),var(--spontaine-accent),var(--spontaine-flow-muted))]'>
        <i className='absolute left-[4%] top-[-6px] h-[14px] w-[14px] rounded-[var(--radius-pill)] bg-spontaine-accent shadow-[0_0_0_7px_var(--spontaine-accent-soft)]' />
        <i className='absolute left-[46%] top-[-6px] h-[14px] w-[14px] rounded-[var(--radius-pill)] bg-[var(--spontaine-flow-node-blue)] shadow-[0_0_0_7px_var(--spontaine-accent-soft)]' />
        <i className='absolute right-[3%] top-[-6px] h-[14px] w-[14px] rounded-[var(--radius-pill)] bg-[var(--spontaine-flow-node-dark)] shadow-[0_0_0_7px_var(--spontaine-accent-soft)]' />
      </div>
    </figure>
  )
}

export default function SectionProductReachV3() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>('[data-reach-eyebrow]')
      const title = section.querySelector<HTMLElement>('[data-reach-title]')
      const cards = gsap.utils.toArray<HTMLElement>('[data-reach-card]')
      const note = section.querySelector<HTMLElement>('[data-reach-note]')
      const revealTargets = [eyebrow, title, note, ...cards].filter(Boolean) as HTMLElement[]

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

      timeline.to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.54,
          stagger: 0.12,
          ease: 'power2.out',
        },
        '>-0.06'
      )

      if (note) {
        timeline.to(
          note,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
          },
          '>-0.08'
        )
      }
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative isolate w-full overflow-hidden rounded-t-section-sm bg-spontaine-surface-paper pb-[112px] pt-[128px] md:rounded-t-section-md md:pb-[126px] md:pt-[150px] lg:rounded-t-section-lg lg:pb-[140px] lg:pt-[172px] xl:rounded-t-section-xl xl:pt-[188px]'
      aria-labelledby='product-reach-title'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='mx-auto max-w-[760px] text-center'>
          <p
            data-reach-eyebrow
            className='eyebrow text-spontaine-gray-cool'
          >
            Reach without replacement
          </p>

          <h2
            id='product-reach-title'
            data-reach-title
            className='display-xl mx-auto mt-[15px] max-w-[760px] font-display text-spontaine-text-primary'
          >
            Bring intelligence together without ripping systems out.
          </h2>
        </div>

        <div className='mt-[48px] grid gap-[18px] lg:grid-cols-2'>
          {routeCards.map((card) => (
            <article
              key={card.tag}
              data-reach-card
              className='relative overflow-hidden rounded-[24px] border border-[var(--spontaine-surface-line)] bg-spontaine-surface-paper p-7 shadow-surface'
            >
              <p className='m-0 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-spontaine-gray-cool'>
                {card.tag}
              </p>

              <h3 className='mt-2.5 font-display text-[1.3rem] font-bold leading-tight tracking-[-0.03em] text-spontaine-text-primary'>
                {card.title}
              </h3>

              <p className='mt-2.5 max-w-[420px] font-body text-[0.88rem] leading-[1.5] text-spontaine-text-secondary'>
                {card.body}
              </p>

              <RouteArt kind={card.art} />
            </article>
          ))}
        </div>

        <p
          data-reach-note
          className='mt-[22px] text-center font-mono text-[0.66rem] font-medium uppercase tracking-[0.06em] text-spontaine-gray-cool'
        >
          SOME OF YOUR DATA NEVER MOVES AT ALL
        </p>
      </div>
    </section>
  )
}
