import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import HeroActions from './HeroActions'

export default function HeroContent() {
  return (
    <AppLayoutPadding className='relative z-10 items-start'>
      <div className='mx-auto flex w-full max-w-[900px] flex-col items-start pb-12 pt-32 sm:pt-36 lg:pb-16 lg:pt-[140px]'>
        <div className='mb-4 max-w-full rounded-[100px] border border-white/60 bg-[#ededf2]/30 px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[2px]'>
          <span className='font-urbanist text-[10px] font-semibold uppercase leading-4 tracking-[0.06em] text-[#2E2E2E] sm:text-[11px]'>
            AI data infrastructure for professional services & private equity firms - &nbsp;
          </span>
          <span className='font-urbanist text-[10px] uppercase leading-4 tracking-[0.06em] text-[#2E2E2E] sm:text-[11px]'>
            Owned, not rented.
          </span>
        </div>

        <h1 className='max-w-[882px] font-urbanist text-[42px] font-bold leading-[46px] tracking-[-0.02em] text-[#0f172a] sm:text-[52px] sm:leading-[58px] md:text-[60px] md:leading-[66px] xl:text-[64px] xl:leading-[70px]'>
          Power to run every <br /> engagement <br /> like it&apos;s your{' '}
          <em className='italic text-[#12d6a0]'>biggest.</em>
        </h1>

        <div className='mt-7 flex max-w-[730px] flex-col gap-4'>
          <p className='font-urbanist text-[16px] font-normal leading-[26px] text-[#374151] sm:text-[18px] sm:leading-[28px]'>
            Your data and knowledge are your firm&apos;s advantage and roadblock in the AI age.
            Spontaine helps generate new value and drive capacity using your data and collective
            experience: the rigor of your best people and new team capacity. Build on winning
            patterns, create agents to do previously impossible work, and deliver products clients
            pay for.
          </p>
          <p className='max-w-[882px] font-urbanist text-[14px] font-light italic leading-[22px] text-[#2E2E2E] sm:text-[15px]'>
            Built from the systems you already run, untouched, in your own cloud. Live in two weeks.
          </p>
        </div>

        <div className='mt-8'>
          <HeroActions />
        </div>

        <p className='mt-5 font-urbanist text-[13px] font-normal leading-[18px] text-[#2E2E2E]'>
          A 30-minute working session. No decks, nothing to sign.
        </p>
      </div>
    </AppLayoutPadding>
  )
}
