import ChatSurface from './ChatSurface'

const rows = [
  {
    engagement: 'Kuiper Groep -- advisory',
    margin: '24.6%',
    target: '-13.4 pts',
    partner: 'A. de Vries',
  },
  {
    engagement: 'Verhoeven Logistics -- audit',
    margin: '31.2%',
    target: '-6.8 pts',
    partner: 'J. Smit',
  },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

export default function ResultsTable() {
  return (
    <ChatSurface
      variant='card'
      size='none'
      className='overflow-hidden !rounded-[40px] !bg-spontaine-paper px-5 py-6 !shadow-[0_4px_12px_rgba(46,46,46,0.08),0_12px_32px_-8px_rgba(46,46,46,0.12)] sm:px-7 lg:px-8'
    >
      <div className='overflow-x-auto'>
        <div className='min-w-[720px]'>
          <div className='grid grid-cols-[380px_100px_130px_1fr] border-b border-gray-200 pb-2 font-body text-[10px] font-medium uppercase leading-none text-slate-400'>
            <span>Engagement</span>
            <span>Margin</span>
            <span>Vs target</span>
            <span>Partner</span>
          </div>

          <div className='divide-y divide-gray-200'>
            {rows.map((row) => (
              <div
                key={row.engagement}
                className='grid grid-cols-[380px_100px_130px_1fr] py-2.5 font-display text-sm leading-normal text-spontaine-ink-dark'
              >
                <span className='font-medium'>{row.engagement}</span>
                <span>{row.margin}</span>
                <span className='font-semibold text-red-500'>{row.target}</span>
                <span>{row.partner}</span>
              </div>
            ))}
          </div>

          <p className='border-t border-gray-200 pt-2 font-body text-[10px] leading-normal text-slate-400'>
            Sources: ERP &middot; Practice mgmt &middot; scope associate view
          </p>
        </div>
      </div>

      <div className='mt-5 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8'>
        <div className='min-w-0'>
          <div className='flex items-center gap-3 font-display text-sm font-semibold text-spontaine-ink-soft'>
            <svg
              aria-hidden='true'
              className='h-4 w-4 text-spontaine-ink-accent'
              fill='none'
              viewBox='0 0 16 16'
            >
              <path
                d='M3 12V8.75M7 12V5.25M11 12V3.5'
                stroke='currentColor'
                strokeLinecap='round'
                strokeWidth='2'
              />
            </svg>
            <span>Group Statistics</span>
            <span
              aria-hidden='true'
              className='flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-300 text-[9px] text-slate-400'
            >
              i
            </span>
            <span className='ml-auto text-slate-400'>...</span>
          </div>

          <div className='mt-5 flex flex-wrap items-end gap-3'>
            <p className='font-display text-3xl font-bold leading-none text-slate-400 sm:text-4xl'>
              &euro;12,596.98
            </p>
            <span className='bg-spontaine-accent-approved/15 inline-flex items-center rounded-full px-3 py-1 font-display text-xs font-bold text-spontaine-ink-highlight'>
              &#8599; 12%
            </span>
            <span className='pb-1 font-body text-xs text-slate-400'>YoY</span>
          </div>

          <div className='relative mt-6 h-[150px] w-full overflow-hidden bg-gradient-to-b from-gray-50/80 to-transparent'>
            <svg
              aria-hidden='true'
              className='absolute inset-x-0 top-0 h-[110px] w-full'
              preserveAspectRatio='none'
              viewBox='0 0 460 110'
            >
              <path
                d='M0 70L14 70L25 55L36 82L48 48L60 58L72 52L86 56L100 45L114 36L128 25L142 47L157 64L172 78L187 92L202 84L216 88L232 82L247 88L262 100L276 62L288 82L302 50L316 40L330 15L344 28L358 20L372 36L386 26L400 56L414 38L428 46L442 32L460 56'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='text-spontaine-accent-approved'
              />
              <path
                d='M300 20h68a8 8 0 0 1 8 8v28a8 8 0 0 1-8 8h-68a8 8 0 0 1-8-8V28a8 8 0 0 1 8-8Z'
                className='fill-white drop-shadow-sm'
              />
              <text
                x='308'
                y='47'
                className='fill-spontaine-ink-dark font-display text-[12px] font-bold'
              >
                &euro;9,467.00
              </text>
              <path
                d='M72 76h44a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H72a4 4 0 0 1-4-4V80a4 4 0 0 1 4-4Z'
                fill='black'
              />
              <text
                x='75'
                y='90'
                className='fill-white font-display text-[10px] font-semibold'
              >
                Avg 6.8%
              </text>
            </svg>

            <div className='absolute inset-x-2 bottom-0 grid grid-cols-7 font-body text-xs text-slate-400'>
              {months.map((month) => (
                <span
                  key={month}
                  className='text-center'
                >
                  {month}
                </span>
              ))}
            </div>

            <span className='bg-spontaine-accent-approved/10 absolute bottom-0 left-[62%] rounded-full px-4 py-2 font-display text-xs font-bold text-spontaine-ink-highlight'>
              May
            </span>
          </div>
        </div>

        <div className='min-w-0 text-slate-400'>
          <h3 className='font-display text-lg font-semibold text-slate-400'>General Notes</h3>

          <ul className='mt-4 list-disc space-y-2 pl-5 font-body text-sm leading-6'>
            <li>
              T&amp;M group is producing the single worst margin failures. The bottom T&amp;M
              projects are far more extreme than the bottom Fixed Price ones, which points to a
              severe realization or billing-discipline problem rather than just expensive delivery.
            </li>
          </ul>

          <div className='mt-4 rounded-2xl border border-spontaine-border-muted bg-white p-4'>
            <span className='inline-flex rounded-md bg-sky-100 px-2 py-1 font-mono text-[10px] font-bold uppercase text-sky-600'>
              Arc
            </span>
            <p className='mt-3 font-display text-sm font-bold text-spontaine-ink-dark'>
              Firm-wide Margin Leakage by Service Line
            </p>
            <p className='mt-1 font-body text-[10px] leading-4 text-slate-400'>
              Monthly T&amp;M leakage amount tracked across service lines for the entire firm.
            </p>
          </div>

          <button
            type='button'
            className='focus-visible:ring-spontaine-ink-accent mt-3 flex min-h-11 w-full items-center justify-between rounded-lg bg-spontaine-accent-approved px-5 font-display text-sm font-bold text-spontaine-ink-dark transition-colors hover:bg-spontaine-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          >
            <span className='flex items-center gap-3'>
              <span aria-hidden='true'>+</span>
              <span>Create a persistent block</span>
            </span>
            <span aria-hidden='true'>&rarr;</span>
          </button>
        </div>
      </div>
    </ChatSurface>
  )
}
