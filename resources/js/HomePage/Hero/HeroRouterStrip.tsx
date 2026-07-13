import AppLayoutPadding from '@/Layouts/AppLayoutPadding'

export default function HeroRouterStrip() {
  return (
    <div className='relative z-10 border-y border-white/70 bg-[#f5f5f5]/30 py-6 backdrop-blur-[3px]'>
      <AppLayoutPadding className='items-start'>
        <div className='mx-auto flex w-full max-w-[980px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex max-w-[779px] flex-col gap-3 sm:flex-row sm:items-start sm:gap-6'>
            <p className='shrink-0 font-urbanist text-[13px] font-bold leading-[22px] text-[#2E2E2E]'>
              Running a fund, not a firm?
            </p>
            <p className='font-urbanist text-[14px] font-normal leading-[22px] text-[#2E2E2E] sm:max-w-[560px]'>
              Consolidate your whole portfolio: always-on visibility, zero rip-and-replace, one
              governed AI environment across every company.
            </p>
          </div>
          <a
            href='/solutions/private-equity'
            className='inline-flex min-h-11 items-center font-urbanist text-[14px] font-semibold leading-[22px] text-[#0CCE97] transition-colors duration-200 ease-out hover:text-[#0f172a] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#12d6a0] focus-visible:ring-offset-[3px]'
          >
            See the portfolio view &rarr;
          </a>
        </div>
      </AppLayoutPadding>
    </div>
  )
}
