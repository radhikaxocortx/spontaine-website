import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'

export default function SectionCompanyHeroV3() {
  return (
    <section
      id='hero'
      aria-labelledby='company-v3-hero-title'
      className='bg-spontaine-surface-warm-wash relative isolate overflow-hidden pb-[84px] pt-[132px] md:pb-[104px] md:pt-[168px] lg:pt-[120px]'
    >
      <img
        src='/images/company-hero-v3.jpg'
        alt=''
        aria-hidden='true'
        className='animate-v3-ken-burns absolute inset-[-4%] z-0 h-[108%] w-[108%] object-cover opacity-70'
      />

      <div
        aria-hidden='true'
        className='bg-cream-fade-right absolute inset-0 z-10'
      />

      <div className='relative z-20 mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <p className='eyebrow mb-[18px] text-spontaine-gray-cool'>Company</p>

        <h1
          id='company-v3-hero-title'
          className='display-hero max-w-[900px] text-spontaine-text-primary'
        >
          We spent seven years
          <br />
          doing this the hard way.
        </h1>

        <p className='body-lg mt-[22px] max-w-[660px] font-body text-spontaine-text-secondary'>
          Spontaine is governed intelligence for professional-services firms. It runs inside their
          own infrastructure, turns their best thinking into software they own, and does it in weeks
          - not a rip-and-replace, not a pilot that never ships.
        </p>

        <div className='mt-[30px] flex flex-col gap-[14px] sm:flex-row sm:flex-wrap'>
          <CalendarBooking>
            {({ openCalendar }) => (
              <Button
                type='button'
                onClick={openCalendar}
                variant='v3Primary'
                size='v3Hero'
              >
                Meet the team
              </Button>
            )}
          </CalendarBooking>

          <Button
            asChild
            variant='v3Secondary'
            size='v3Hero'
            className='border-spontaine-dark bg-spontaine-dark text-spontaine-text-on-dark hover:border-spontaine-surface-ink hover:bg-spontaine-surface-ink hover:text-spontaine-text-on-dark'
          >
            <a
              href='https://spontaine.eu.trust.site/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Trust Center
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
