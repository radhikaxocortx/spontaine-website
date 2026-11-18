import { CalendarBooking } from '@/components/CalendarBooking'
import { type TrustItem } from '@/components/Sections/TrustBand'
import { Button } from '@/components/ui/button'
import { useStackUp } from '@/hooks/useStackUp'
import { trackEvent } from '@/lib/analytics'
import { ArrowUpRight, Lock, MapPin, ShieldCheck } from 'lucide-react'

/** Default items for the "Trust Band" page builder block (no longer shown on the homepage). */
export const homeTrustItems: readonly TrustItem[] = [
  {
    icon: 'server',
    title: 'Single tenant',
    text: 'Hosted by us in your region, or installed in your own cloud.',
  },
  {
    icon: 'map-pin',
    title: 'Stays in your region',
    text: 'Your data is stored and processed in your region and never leaves it, so your own privacy laws apply. Support access only through a privileged access gateway, with protected fields encrypted.',
  },
  {
    icon: 'eye-off',
    title: 'Pseudonymised',
    text: 'Personal data pseudonymised before any model sees it. AI providers contracted for zero data retention.',
  },
  {
    icon: 'shield-check',
    title: 'Certified',
    text: 'ISO 27001 certified. IT owns the perimeter.',
  },
]

export const TRUST_CENTRE_URL = 'https://spontaine.eu.trust.site'

const trustBadges = [
  { icon: ShieldCheck, label: 'ISO 27001 certified' },
  { icon: MapPin, label: 'EU and North American sovereign hosting' },
  { icon: Lock, label: 'Zero model training on your data' },
] as const

const CTA_LABEL = 'Book a 30-minute working session'

/** Governance and next step: the security promise, one booking button and a trust strip. */
export default function SectionTrustV3() {
  const sectionRef = useStackUp<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id='security'
      aria-labelledby='security-title'
      className='relative w-full scroll-mt-16 overflow-hidden rounded-t-section-sm bg-spontaine-surface-ink-deep pb-[120px] pt-[105px] md:rounded-t-section-md md:pt-[130px] lg:rounded-t-section-lg lg:pb-[150px] xl:rounded-t-section-xl'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] text-center md:px-[var(--space-shell)]'>
        <p
          data-stack-item
          className='eyebrow mb-5 text-spontaine-white-faint'
        >
          Governance and next step
        </p>
        <h2
          id='security-title'
          data-stack-item
          className='display-xl mx-auto max-w-[900px] text-balance text-spontaine-text-on-dark'
        >
          Yours alone, stays in your region, and goes live in weeks.
        </h2>
        <p
          data-stack-item
          className='body-lg mx-auto mt-6 max-w-[620px] text-spontaine-text-on-dark-secondary'
        >
          Bring the cross-system question your teams still answer with spreadsheets. In one
          30-minute working session, we will map how Spontaine connects your existing stack to solve
          it in four weeks.
        </p>

        <div
          data-stack-item
          className='mt-9 flex justify-center'
        >
          <CalendarBooking>
            {({ openCalendar }) => (
              <Button
                type='button'
                onClick={() => {
                  trackEvent('cta_clicked', { label: CTA_LABEL, section: 'security' })
                  openCalendar()
                }}
                variant='v3Primary'
                size='v3Hero'
              >
                {CTA_LABEL}
                <ArrowUpRight
                  aria-hidden='true'
                  className='h-4 w-4'
                />
              </Button>
            )}
          </CalendarBooking>
        </div>

        <ul
          data-stack-item
          aria-label='Security and trust'
          className='mx-auto mt-14 flex max-w-[900px] flex-wrap justify-center gap-2.5 border-t border-[var(--spontaine-border-on-dark)] pt-8'
        >
          {trustBadges.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className='inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--spontaine-border-on-dark)] px-3.5 py-2 font-mono text-xs text-spontaine-text-on-dark-secondary'
            >
              <Icon
                aria-hidden='true'
                className='h-3.5 w-3.5 text-spontaine-accent'
                strokeWidth={1.75}
              />
              {label}
            </li>
          ))}
        </ul>

        <a
          href={TRUST_CENTRE_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='group mt-6 inline-flex items-center gap-2 border-b border-[var(--spontaine-border-on-dark)] pb-[3px] font-body text-[15px] font-medium text-spontaine-text-on-dark transition-colors duration-200 hover:border-spontaine-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent'
        >
          Visit the Trust Centre
          <ArrowUpRight
            aria-hidden='true'
            className='h-4 w-4 text-spontaine-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
          />
        </a>
      </div>
    </section>
  )
}
