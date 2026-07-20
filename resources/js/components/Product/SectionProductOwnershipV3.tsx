import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const principles = [
  {
    id: 'perimeter',
    title: 'Inside your perimeter',
    body: (
      <>
        Your VPC, your identity provider, your audit log. No vendor access to production &mdash;
        your data doesn&apos;t come to us, the platform goes to it.
      </>
    ),
    featured: true,
  },
  {
    id: 'client-owned',
    title: 'Client-owned intelligence',
    body: (
      <>
        Your Lenses, Skills, Blocks, endpoints, and workflows are your firm&apos;s assets. Not
        rented expertise trapped in a vendor workflow.
      </>
    ),
  },
  {
    id: 'governance',
    title: 'Governance by architecture',
    body: (
      <>
        AI works with what a Lens exposes. Pseudonymisation is enforced in the code path &mdash; not
        a setting someone forgets.
      </>
    ),
  },
  {
    id: 'compliance',
    title: <>ISO 27001 &middot; GDPR</>,
    body: 'ISO 27001 certified. GDPR Article 28 DPA in place and audited. DPIA on request. VAPT supported, results shared.',
  },
  {
    id: 'replacement',
    title: 'No rip and replace',
    body: 'Keep the ERP, CRM, BI tools, and systems already doing their jobs. Point them at governed endpoints instead of contested extracts.',
  },
  {
    id: 'knowledge',
    title: 'Models change. Knowledge stays.',
    body: (
      <>
        Your definitions and operating logic are the enduring asset &mdash; whichever model runs
        beneath them next year.
      </>
    ),
  },
]

export default function SectionProductOwnershipV3() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>('[data-ownership-eyebrow]')
      const title = section.querySelector<HTMLElement>('[data-ownership-title]')
      const description = section.querySelector<HTMLElement>('[data-ownership-description]')
      const cards = gsap.utils.toArray<HTMLElement>('[data-ownership-card]')
      const revealTargets = [eyebrow, title, description, ...cards].filter(Boolean) as HTMLElement[]

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

      timeline.to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.52,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '>-0.04'
      )
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative isolate w-full overflow-hidden rounded-t-section-sm bg-spontaine-surface-ink-deep pb-[112px] pt-[128px] md:rounded-t-section-md md:pb-[126px] md:pt-[150px] lg:rounded-t-section-lg lg:pb-[140px] lg:pt-[172px] xl:rounded-t-section-xl xl:pt-[188px]'
      aria-labelledby='product-ownership-title'
    >
      <div className='mx-auto grid w-full max-w-[1180px] gap-10 px-[var(--space-shell-sm)] md:px-[var(--space-shell)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-[70px]'>
        <div>
          <p
            data-ownership-eyebrow
            className='eyebrow text-spontaine-gray-soft'
          >
            Built for enterprise ownership
          </p>

          <h2
            id='product-ownership-title'
            data-ownership-title
            className='display-xl mt-[15px] max-w-[620px] font-display text-spontaine-text-on-dark'
          >
            Not rented. <em className='not-italic text-spontaine-accent'>Owned.</em>
          </h2>

          <p
            data-ownership-description
            className='body-lg mt-5 max-w-[420px] font-body text-spontaine-text-on-dark-secondary'
          >
            Spontaine sits inside your perimeter and works with the systems you already rely on. We
            own the core engine. The knowledge and capability your firm creates &mdash; every Lens,
            Skill, Block, and workflow &mdash; is yours. If this ends, you keep all of it.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2'>
          {principles.map((principle) => (
            <article
              key={principle.id}
              data-ownership-card
              className={[
                'rounded-2xl p-4',
                principle.featured ? 'bg-spontaine-teal-mid' : 'bg-spontaine-surface-ink',
              ].join(' ')}
            >
              <strong className='block font-display text-[0.9rem] font-bold leading-tight tracking-[-0.02em] text-spontaine-text-on-dark'>
                {principle.title}
              </strong>

              <p className='m-0 mt-[7px] font-body text-[0.74rem] leading-[1.45] text-spontaine-text-on-dark-secondary'>
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
