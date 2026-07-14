import AppLayoutPadding from '@/Layouts/AppLayoutPadding'

export default function HeroRouterStrip() {
  return (
    <div className='bg-spontaine-pale-gray/30 relative z-10 border-y border-white/70 py-6 backdrop-blur-spontaine-md'>
      <AppLayoutPadding className='items-start'>
        <div className='mx-auto flex w-full max-w-[980px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex max-w-[779px] flex-col gap-3 sm:flex-row sm:items-start sm:gap-6'>
            <p className='font-display text-spontaine-ink-soft shrink-0 text-[13px] font-bold leading-[22px]'>
              Running a fund, not a firm?
            </p>
            <p className='font-display text-spontaine-ink-soft text-sm font-normal leading-[22px] sm:max-w-[560px]'>
              Consolidate your whole portfolio: always-on visibility, zero rip-and-replace, one
              governed AI environment across every company.
            </p>
          </div>
          <a
            href='/solutions/private-equity'
            className='font-display text-spontaine-ink-highlight hover:text-spontaine-ink-dark focus-visible:ring-spontaine-ink-accent inline-flex min-h-11 items-center text-sm font-semibold leading-[22px] transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-spontaine focus-visible:ring-offset-spontaine'
          >
            See the portfolio view &rarr;
          </a>
        </div>
      </AppLayoutPadding>
    </div>
  )
}
