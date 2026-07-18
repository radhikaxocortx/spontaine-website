import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

interface SectionCTAV3Props {
  className?: string
}

export default function SectionCTAV3({ className }: SectionCTAV3Props) {
  return (
    <section
      id='contact'
      className={cn(
        'bg-cta-wash py-[96px] text-center md:py-[120px] lg:pb-[120px] lg:pt-[135px]',
        className
      )}
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <h2 className='display-xl text-spontaine-text-primary mx-auto max-w-[880px] font-display'>
          Bring the question your firm cannot answer with confidence.
        </h2>

        <p className='body-lg text-spontaine-text-secondary mx-auto mt-[23px] max-w-[650px] font-body'>
          Thirty minutes. No discovery-call script. Bring the decision, the spreadsheet, or the
          system that sits behind it. We will show you what a governed answer - and the capability
          it can become - could look like in your firm.
        </p>

        <div className='mt-[23px] flex justify-center'>
          <CalendarBooking>
            {({ openCalendar }) => (
              <Button
                type='button'
                onClick={openCalendar}
                variant='v3Primary'
                size='v3Hero'
              >
                Book a working session
                <ArrowUpRight
                  aria-hidden='true'
                  className='h-4 w-4'
                />
              </Button>
            )}
          </CalendarBooking>
        </div>

        <p className='mt-[19px] font-mono text-[0.72rem] text-spontaine-gray-deep'>
          Start with the decision. Build from there.
        </p>
      </div>
    </section>
  )
}
