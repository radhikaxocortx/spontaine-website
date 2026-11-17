import { useStackUp } from '@/hooks/useStackUp'
import { ArrowUpRight, EyeOff, type LucideIcon, MapPin, Server, ShieldCheck } from 'lucide-react'

interface TrustItem {
  readonly title: string
  /** Approved claim wording. Never shorten so a qualifier disappears. */
  readonly text: string
  readonly icon: LucideIcon
}

const trustItems: readonly TrustItem[] = [
  {
    title: 'Single tenant',
    text: 'Hosted by us in your region, or installed in your own cloud.',
    icon: Server,
  },
  {
    title: 'Stays in your region',
    text: 'Your data is stored and processed in your region and never leaves it, so your own privacy laws apply. Support access only through a privileged access gateway, with protected fields encrypted.',
    icon: MapPin,
  },
  {
    title: 'Pseudonymised',
    text: 'Personal data pseudonymised before any model sees it. AI providers contracted for zero data retention.',
    icon: EyeOff,
  },
  {
    title: 'Certified',
    text: 'ISO 27001 certified. IT owns the perimeter.',
    icon: ShieldCheck,
  },
]

const TRUST_CENTRE_URL = 'https://spontaine.eu.trust.site'

export default function SectionTrustV3() {
  const sectionRef = useStackUp<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id='security'
      aria-labelledby='security-title'
      className='relative w-full scroll-mt-16 overflow-hidden rounded-t-section-sm bg-spontaine-surface-ink-deep pb-[120px] pt-[105px] md:rounded-t-section-md md:pt-[130px] lg:rounded-t-section-lg lg:pb-[150px] xl:rounded-t-section-xl'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='mx-auto max-w-[820px] text-center'>
          <p
            data-stack-item
            className='eyebrow mb-5 text-spontaine-white-faint'
          >
            Where your data lives
          </p>
          <h2
            id='security-title'
            data-stack-item
            className='display-xl text-balance text-spontaine-text-on-dark'
          >
            Yours alone, and it stays in your region.
          </h2>
        </div>

        <ul className='mx-auto mt-16 grid max-w-[1080px] md:grid-cols-2 md:gap-y-9 xl:grid-cols-4'>
          {trustItems.map(({ title, text, icon: Icon }) => (
            <li
              key={title}
              data-stack-item
              className='border-t border-[var(--spontaine-border-on-dark)] py-6 md:border-l md:border-t-0 md:py-1 md:pl-6 md:pr-7'
            >
              <Icon
                aria-hidden='true'
                className='h-[22px] w-[22px] text-spontaine-accent'
                strokeWidth={1.5}
              />
              <h3 className='mt-[18px] font-display text-[1.02rem] font-semibold leading-[1.25] tracking-[-0.015em] text-spontaine-text-on-dark'>
                {title}
              </h3>
              <p className='mt-1.5 font-body text-[0.92rem] leading-[1.55] text-spontaine-text-on-dark-secondary'>
                {text}
              </p>
            </li>
          ))}
        </ul>

        <div className='mt-14 text-center'>
          <a
            href={TRUST_CENTRE_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='group inline-flex items-center gap-2 border-b border-[var(--spontaine-border-on-dark)] pb-[3px] font-body text-[15px] font-medium text-spontaine-text-on-dark transition-colors duration-200 hover:border-spontaine-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent'
          >
            Visit the Trust Centre
            <ArrowUpRight
              aria-hidden='true'
              className='h-4 w-4 text-spontaine-accent transition-transform duration-300 [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
            />
          </a>
        </div>
      </div>
    </section>
  )
}
