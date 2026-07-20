import { ArrowRight, Sparkles } from 'lucide-react'
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

export default function ResultsTable() {
  return (
    <ChatSurface
      variant='card'
      size='none'
      className='max-w-full overflow-hidden p-[var(--space-card)]'
    >
      <div className='space-y-2 sm:hidden'>
        {rows.map((row) => (
          <div
            key={row.engagement}
            className='rounded-[var(--radius-control)] bg-spontaine-light p-3 font-body'
          >
            <p className='font-body text-[0.75rem] font-semibold leading-snug text-spontaine-gray-deep'>
              {row.engagement}
            </p>

            <div className='mt-3 grid grid-cols-3 gap-2 text-[0.64rem] text-spontaine-gray-muted'>
              <div className='min-w-0'>
                <p className='font-body text-[0.52rem] font-medium uppercase text-[var(--spontaine-surface-data-muted)]'>
                  Margin
                </p>
                <p className='mt-1 font-body text-spontaine-gray-muted'>{row.margin}</p>
              </div>

              <div className='min-w-0'>
                <p className='font-body text-[0.52rem] font-medium uppercase text-[var(--spontaine-surface-data-muted)]'>
                  vs target
                </p>
                <p className='mt-1 font-body font-bold text-[var(--spontaine-surface-negative)]'>
                  {row.target}
                </p>
              </div>

              <div className='min-w-0'>
                <p className='font-body text-[0.52rem] font-medium uppercase text-[var(--spontaine-surface-data-muted)]'>
                  Partner
                </p>
                <p className='mt-1 font-body text-spontaine-gray-muted'>{row.partner}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='hidden overflow-x-auto sm:block'>
        <div className='min-w-[520px]'>
          <div className='grid grid-cols-[2.5fr_0.8fr_0.8fr_0.9fr] gap-[9px] border-b border-[var(--spontaine-surface-line)] pb-2.5 font-body text-[0.55rem] font-semibold uppercase text-[var(--spontaine-surface-data-muted)]'>
            <span>Engagement</span>
            <span>Margin</span>
            <span>vs target</span>
            <span>Partner</span>
          </div>

          <div className='divide-y divide-[var(--spontaine-surface-line-soft)]'>
            {rows.map((row) => (
              <div
                key={row.engagement}
                className='grid grid-cols-[2.5fr_0.8fr_0.8fr_0.9fr] gap-[9px] py-[11px] font-body text-[0.72rem] text-spontaine-gray-muted'
              >
                <span className='font-semibold text-spontaine-gray-deep'>{row.engagement}</span>
                <span>{row.margin}</span>
                <span className='font-bold text-[var(--spontaine-surface-negative)]'>
                  {row.target}
                </span>
                <span>{row.partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='grid gap-[22px] pt-[17px] md:grid-cols-[1fr_1.15fr]'>
        <div>
          <p className='font-body text-[0.59rem] font-medium uppercase text-[var(--spontaine-surface-data-muted)]'>
            Margin at risk
          </p>
          <p className='mt-1 font-display text-[1.3rem] font-bold leading-none tracking-[-0.06em] text-spontaine-gray-soft'>
            €12,596.98
          </p>

          <div className='relative mt-[14px] h-[73px] overflow-hidden bg-[linear-gradient(180deg,transparent_48%,var(--spontaine-accent-soft)_49%,var(--spontaine-accent-soft)_51%,transparent_52%)]'>
            <svg
              aria-hidden='true'
              className='h-full w-full text-spontaine-accent'
              preserveAspectRatio='none'
              viewBox='0 0 250 70'
            >
              <path
                d='M0 52 L13 44 L24 52 L37 36 L50 40 L63 19 L78 40 L93 26 L106 52 L120 48 L133 59 L148 47 L160 60 L177 40 L188 30 L202 46 L215 19 L229 36 L250 28'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              />
            </svg>
          </div>
        </div>

        <div>
          <p className='font-body text-[0.59rem] font-medium uppercase text-[var(--spontaine-surface-data-muted)]'>
            What changed
          </p>
          <p className='mt-3 font-body text-[0.72rem] leading-[1.38] text-spontaine-gray-muted'>
            The bottom T&amp;M projects have fallen below target margin. The pattern points to
            delayed billing and senior time used below its value.
          </p>
          <button
            type='button'
            className='mt-[13px] flex w-full items-center justify-between gap-3 rounded-[var(--radius-control)] bg-spontaine-accent px-3 py-2 font-body text-xs font-semibold text-spontaine-accent-ink transition-colors hover:bg-spontaine-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spontaine-accent-dark focus-visible:ring-offset-2'
          >
            <span className='flex min-w-0 items-center gap-2'>
              <Sparkles
                aria-hidden='true'
                className='h-3.5 w-3.5 flex-shrink-0'
              />
              <span className='min-w-0 text-left leading-tight'>Save as a reusable Block</span>
            </span>
            <ArrowRight
              aria-hidden='true'
              className='h-3.5 w-3.5 flex-shrink-0'
            />
          </button>
        </div>
      </div>
    </ChatSurface>
  )
}
