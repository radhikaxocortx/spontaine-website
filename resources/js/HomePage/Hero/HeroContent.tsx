import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import HeroActions from './HeroActions'

export default function HeroContent() {
  return (
    <AppLayoutPadding className='relative z-10 items-start'>
      <div className='mx-auto flex w-full max-w-[900px] flex-col items-start pb-12 pt-32 sm:pt-36 lg:pb-16 lg:pt-[140px]'>
        <div className='bg-spontaine-bright-gray/30 shadow-spontaine-glass backdrop-blur-spontaine-sm mb-4 max-w-full rounded-spontaine-pill border border-white/60 px-4 py-1.5'>
          <span className='font-display text-spontaine-ink-soft text-[10px] font-semibold uppercase leading-4 tracking-[0.06em] sm:text-[11px]'>
            AI data infrastructure for professional services & private equity firms - &nbsp;
          </span>
          <span className='font-display text-spontaine-ink-soft text-[10px] uppercase leading-4 tracking-[0.06em] sm:text-[11px]'>
            Owned, not rented.
          </span>
        </div>

        <h1 className='font-display text-display-hero text-spontaine-ink-dark max-w-[882px]'>
          Power to run every <br /> engagement <br /> like it&apos;s your{' '}
          <em className='text-spontaine-ink-accent italic'>biggest.</em>
        </h1>

        <div className='mt-7 flex max-w-[730px] flex-col gap-4'>
          <p className='font-display text-spontaine-ink-normal text-base font-normal leading-relaxed sm:text-lg sm:leading-7'>
            Your data and knowledge are your firm&apos;s advantage and roadblock in the AI age.
            Spontaine helps generate new value and drive capacity using your data and collective
            experience: the rigor of your best people and new team capacity. Build on winning
            patterns, create agents to do previously impossible work, and deliver products clients
            pay for.
          </p>
          <p className='font-display text-spontaine-ink-soft max-w-[882px] text-sm font-light italic leading-[22px] sm:text-[15px]'>
            Built from the systems you already run, untouched, in your own cloud. Live in two weeks.
          </p>
        </div>

        <div className='mt-8'>
          <HeroActions />
        </div>

        <p className='font-display text-spontaine-ink-soft mt-5 text-[13px] font-normal leading-[18px]'>
          A 30-minute working session. No decks, nothing to sign.
        </p>
      </div>
    </AppLayoutPadding>
  )
}
