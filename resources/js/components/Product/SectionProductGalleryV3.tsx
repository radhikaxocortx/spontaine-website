import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

type GalleryFilter = 'revenue' | 'profit' | 'knowledge' | 'client' | 'pe'

const filters: Array<{ key: GalleryFilter; label: string }> = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'profit', label: 'Profitability' },
  { key: 'knowledge', label: 'Knowledge' },
  { key: 'client', label: 'Client products' },
  { key: 'pe', label: 'Private equity' },
]

const capabilities: Array<{
  category: GalleryFilter
  title: string
  body: ReactNode
}> = [
  {
    category: 'revenue',
    title: 'Continuous CFO Briefing',
    body: 'Give clients an ongoing view of what matters next.',
  },
  {
    category: 'revenue',
    title: 'Pricing Advisor',
    body: "Apply your firm's commercial discipline consistently.",
  },
  {
    category: 'revenue',
    title: 'Working Capital Monitor',
    body: 'Turn cash pressure into a conversation before it becomes a crisis.',
  },
  {
    category: 'profit',
    title: 'Margin Guardian',
    body: 'Find work drifting from target margin while there is time to respond.',
  },
  {
    category: 'profit',
    title: 'Write-off Investigator',
    body: 'See what drove lost recovery, not just the final number.',
  },
  {
    category: 'profit',
    title: 'Partner Portfolio Briefing',
    body: 'Put evidence behind the next partner conversation.',
  },
  {
    category: 'knowledge',
    title: 'Audit Coach',
    body: 'Make methodology available at the moment it is needed.',
  },
  {
    category: 'knowledge',
    title: 'Tax Opportunity Finder',
    body: 'Surface opportunities for expert review across the client base.',
  },
  {
    category: 'knowledge',
    title: 'Policy Advisor',
    body: 'Help teams find the applicable rule and context.',
  },
  {
    category: 'client',
    title: 'Executive Intelligence Portal',
    body: 'Give each client a governed place to see, ask, and act.',
  },
  {
    category: 'client',
    title: 'Risk Radar',
    body: 'Offer continuous signals, not occasional reports.',
  },
  {
    category: 'client',
    title: 'Board Intelligence',
    body: 'Build decision-ready packs from consistent definitions.',
  },
  {
    category: 'pe',
    title: 'Portfolio Intelligence',
    body: (
      <>
        Make operating signals comparable across the portfolio &mdash; without centralising a thing.
      </>
    ),
  },
  {
    category: 'pe',
    title: 'Fourth Acquisition, Four Weeks',
    body: "Map a new portco to the fund's definitions without touching what they run.",
  },
  {
    category: 'pe',
    title: 'Exit Readiness View',
    body: 'See the operational proof behind the equity story.',
  },
]

export default function SectionProductGalleryV3() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const didMountRef = useRef(false)
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('revenue')

  const visibleCapabilities = useMemo(
    () => capabilities.filter((capability) => capability.category === activeFilter),
    [activeFilter]
  )

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const heading = section.querySelector<HTMLElement>('[data-gallery-heading]')
      const description = section.querySelector<HTMLElement>('[data-gallery-description]')
      const filterBar = section.querySelector<HTMLElement>('[data-gallery-filters]')
      const cards = gsap.utils.toArray<HTMLElement>('[data-gallery-card]')
      const revealTargets = [heading, description, filterBar, ...cards].filter(
        Boolean
      ) as HTMLElement[]

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
          duration: 0.5,
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

      if (filterBar) {
        timeline.to(
          filterBar,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: 'power2.out',
          },
          '>-0.1'
        )
      }

      timeline.to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.06,
          ease: 'power2.out',
        },
        '>-0.04'
      )
    }, section)

    return () => context.revert()
  }, [])

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    const grid = gridRef.current

    if (!grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-gallery-card]'))

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: 'power2.out',
        overwrite: true,
      }
    )
  }, [activeFilter])

  return (
    <section
      ref={sectionRef}
      id='gallery'
      className='relative isolate w-full overflow-hidden rounded-t-section-sm bg-spontaine-surface-cream pb-[112px] pt-[128px] md:rounded-t-section-md md:pb-[126px] md:pt-[150px] lg:rounded-t-section-lg lg:pb-[140px] lg:pt-[172px] xl:rounded-t-section-xl xl:pt-[188px]'
      aria-labelledby='product-gallery-title'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='items-end justify-between gap-[30px] md:flex'>
          <div data-gallery-heading>
            <p className='eyebrow text-spontaine-gray-cool'>What firms build</p>
            <h2
              id='product-gallery-title'
              className='display-xl mt-4 max-w-[650px] font-display text-spontaine-text-primary'
            >
              The next generation of professional-services products.
            </h2>
          </div>

          <p
            data-gallery-description
            className='body-lg mt-4 max-w-[420px] font-body text-spontaine-text-secondary md:mt-0'
          >
            Start with the work that matters now. Keep building until your firm offers capabilities
            competitors cannot reproduce with more headcount alone.
          </p>
        </div>

        <div
          data-gallery-filters
          className='mt-[34px] flex flex-wrap gap-[7px]'
          role='group'
          aria-label='Filter capabilities'
        >
          {filters.map((filter) => {
            const isActive = filter.key === activeFilter

            return (
              <button
                key={filter.key}
                type='button'
                className={[
                  'min-h-9 rounded-[var(--radius-pill)] px-[13px] py-[9px] font-mono text-[0.62rem] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spontaine-accent-dark',
                  isActive
                    ? 'bg-spontaine-surface-ink text-spontaine-text-on-dark'
                    : 'bg-spontaine-surface-paper text-spontaine-gray-deep hover:text-spontaine-text-primary',
                ].join(' ')}
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        <div
          ref={gridRef}
          className='mt-5 grid gap-[11px] lg:grid-cols-3'
        >
          {visibleCapabilities.map((capability) => (
            <article
              key={`${capability.category}-${capability.title}`}
              data-gallery-card
              className='min-h-[132px] rounded-2xl bg-spontaine-surface-paper p-4 transition-colors duration-200'
            >
              <p className='m-0 font-mono text-[0.52rem] font-medium uppercase tracking-[0.1em] text-spontaine-gray-cool'>
                {filters.find((filter) => filter.key === capability.category)?.label}
              </p>

              <h3 className='mt-[7px] font-display text-[0.94rem] font-bold leading-tight tracking-[-0.02em] text-spontaine-text-primary'>
                {capability.title}
              </h3>

              <p className='m-0 mt-[7px] font-body text-[0.76rem] leading-[1.5] text-spontaine-text-secondary'>
                {capability.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
