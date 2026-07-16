import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SectionCTAV3Props {
  readonly className?: string
}

export default function SectionCTAV3({ className }: SectionCTAV3Props) {
  return (
    <section
      data-section-cta
      className={cn(
        'relative overflow-hidden bg-[linear-gradient(180deg,#dff5ff_0%,#eef0e8_100%)] px-6 py-24 text-center sm:py-28 lg:py-32',
        className
      )}
    >
      <div className='mx-auto flex min-h-[260px] max-w-6xl flex-col items-center justify-start sm:min-h-[320px] lg:min-h-[420px]'>
        <h2 className='max-w-5xl font-display text-4xl font-bold leading-tight text-[#303033] sm:text-5xl lg:text-[48px]'>
          A working session run by the people behind the platform
        </h2>

        <div className='mt-8 max-w-6xl space-y-1 font-body text-base leading-7 text-[#111315] sm:text-lg'>
          <p>Thirty minutes, no discovery-call script.</p>
          <p>
            Bring the three questions your firm can&apos;t answer with confidence - ideally, bring
            your worst spreadsheet and hardest problems.
          </p>
          <p>We&apos;ll show you exactly what two weeks on your data will look like.</p>
        </div>

        <CalendarBooking>
          {({ openCalendar }) => (
            <Button
              type='button'
              onClick={openCalendar}
              size='lg'
              className='mt-20 rounded-full bg-spontaine-accent px-8 font-display text-sm font-bold text-[#06120d] shadow-2xl shadow-spontaine-accent/20 hover:bg-spontaine-accent/90 sm:mt-24'
            >
              Book session
            </Button>
          )}
        </CalendarBooking>
      </div>
    </section>
  )
}
