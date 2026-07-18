import { ArrowUpRight } from 'lucide-react'

const decisionStates = ['Governed answer', 'Reusable block', 'Secure endpoint', 'Workflow']

export default function SpontaineV3Hero() {
  return (
    <section
      id='hero'
      aria-labelledby='spontaine-v3-hero-title'
      className='relative isolate overflow-hidden bg-hero-wash px-shell-sm pb-[190px] pt-[132px] md:px-shell md:pb-[220px] md:pt-[168px] lg:pt-[190px]'
    >
      {/* Diagonal ambient band behind the prism */}
      <div
        aria-hidden='true'
        className='absolute inset-x-[-15%] bottom-[9%] z-0 h-[160px] rotate-[-13deg] bg-hero-band opacity-[0.76] blur-[4px]'
      />

      {/* Curved paper mask into the next section */}
      <div
        aria-hidden='true'
        className='absolute inset-x-[-4%] bottom-[-80px] z-0 h-[180px] rounded-t-[50%] bg-spontaine-light'
      />

      <div className='relative z-10 mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center'>
        {/* Hero message and primary actions */}
        <div className='max-w-[760px] pb-8 pt-12 md:pb-20 md:pt-16 lg:pb-[155px]'>
          <p className='eyebrow mb-6 max-w-[560px] text-spontaine-gray-cool'>
            The owned intelligence layer for professional services firms
          </p>

          <h1
            id='spontaine-v3-hero-title'
            className='display-hero text-spontaine-dark'
          >
            Any AI can answer a question.
            <br />
            <span className='text-spontaine-accent-dark'>
              The advantage is what your firm can keep.
            </span>
          </h1>

          <p className='body-lg mt-7 max-w-[570px] text-spontaine-gray-muted'>
            Your data and experience are already an advantage. Spontaine turns them into a governed
            intelligence layer your firm owns, so the answers your people create can be reused in
            dashboards, workflows, client products, and the next decision.
          </p>

          <div className='mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <a
              href='#product'
              className='inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill bg-spontaine-accent px-5 py-3 font-body text-sm font-semibold text-spontaine-dark shadow-cta-glow transition-colors hover:bg-spontaine-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark'
            >
              See it in your firm
              <ArrowUpRight
                aria-hidden='true'
                className='h-4 w-4'
                strokeWidth={2}
              />
            </a>

            <a
              href='#resources'
              className='inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill border border-spontaine-gray/30 bg-spontaine-white px-5 py-3 font-body text-sm font-semibold text-spontaine-dark transition-colors hover:border-spontaine-accent-dark hover:text-spontaine-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark'
            >
              Watch the 90-second overview
              <ArrowUpRight
                aria-hidden='true'
                className='h-4 w-4'
                strokeWidth={2}
              />
            </a>
          </div>

          <p className='mt-5 font-mono text-xs text-spontaine-gray-cool'>
            A 30-minute working session. No deck. No obligation.
          </p>
        </div>

        {/* Governed intelligence product visual */}
        <div
          className='relative mx-auto min-h-[390px] w-full max-w-[560px] lg:min-h-[480px] lg:max-w-none'
          aria-label='Conceptual governed intelligence visual'
        >
          {/* Organic glass prism */}
          <div className='absolute right-[8%] top-0 aspect-square w-[285px] rotate-[15deg] overflow-hidden rounded-[42%_58%_63%_37%/41%_44%_56%_59%] bg-prism-surface shadow-prism sm:w-[360px] lg:right-[2%] lg:top-[15px] lg:w-[382px]'>
            <div className='absolute inset-[12%] rotate-[38deg] skew-x-[-12deg] border border-spontaine-gray/20' />
            <div className='absolute inset-x-[3%] inset-y-[28%] rotate-[-22deg] border border-spontaine-gray/20 bg-gradient-to-r from-transparent via-spontaine-white/70 to-transparent' />
          </div>

          {/* Answer prompt card */}
          <div className='absolute bottom-5 left-0 w-full max-w-[470px] rounded-card border border-spontaine-white/90 bg-spontaine-white/85 p-card shadow-surface backdrop-blur-md lg:bottom-[15px]'>
            <p className='font-body text-sm font-semibold text-spontaine-gray-deep'>
              Which engagements are likely to miss target margin this quarter?
            </p>

            <div className='mt-4 flex flex-wrap gap-2'>
              {decisionStates.map((state) => (
                <span
                  key={state}
                  className='rounded-pill bg-spontaine-light-ice px-3 py-2 font-mono text-[11px] font-medium text-spontaine-accent-dark'
                >
                  {state}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio intelligence callout */}
      <div className='relative z-20 mx-[-19px] mt-8 border-y border-spontaine-white/70 bg-spontaine-white/35 backdrop-blur-md md:mx-[-28px] lg:absolute lg:bottom-[90px] lg:left-1/2 lg:mt-0 lg:w-screen lg:-translate-x-1/2'>
        <div className='mx-auto w-full max-w-[1180px] px-shell-sm py-5 md:px-shell'>
          <div className='grid gap-3 md:grid-cols-[1.1fr_2fr_0.8fr] md:items-center'>
            <p className='font-body text-sm font-semibold text-spontaine-dark'>
              For private equity operating teams
            </p>
            <p className='body-md text-spontaine-gray-muted'>
              Bring portfolio signals into one governed intelligence layer without replacing each
              company&apos;s systems.
            </p>
            <a
              href='#product'
              className='inline-flex items-center gap-2 font-body text-sm font-semibold text-spontaine-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark md:justify-self-end'
            >
              Explore portfolio intelligence
              <ArrowUpRight
                aria-hidden='true'
                className='h-4 w-4'
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
