import { cn } from '@/lib/utils'
import { ArrowRight, Sparkles } from 'lucide-react'
import ChatSurface from './ChatSurface'
import { type DemoScene } from './demoScenes'

interface ResultsTableProps {
  readonly scene: DemoScene
}

export default function ResultsTable({ scene }: ResultsTableProps) {
  const [firstColumn, ...valueColumns] = scene.columns

  return (
    <ChatSurface
      variant='card'
      size='none'
      className='max-w-full overflow-hidden p-[var(--space-card)]'
    >
      <div className='space-y-2 sm:hidden'>
        {scene.rows.map(({ cells: [name, ...values] }) => (
          <div
            key={name}
            className='rounded-[var(--radius-control)] bg-spontaine-light p-3 font-body'
          >
            <p className='font-body text-[0.75rem] font-semibold leading-snug text-spontaine-gray-deep'>
              {name}
            </p>

            <div className='mt-3 grid grid-cols-3 gap-2 text-[0.64rem] text-spontaine-gray-muted'>
              {values.map((value, index) => (
                <div
                  key={valueColumns[index]}
                  className='min-w-0'
                >
                  <p className='font-body text-[0.52rem] font-medium uppercase text-[var(--spontaine-surface-data-muted)]'>
                    {valueColumns[index]}
                  </p>
                  <p
                    className={cn(
                      'mt-1 font-body',
                      index === 1
                        ? 'font-bold text-[var(--spontaine-surface-negative)]'
                        : 'text-spontaine-gray-muted'
                    )}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='hidden overflow-x-auto sm:block'>
        <div className='min-w-[520px]'>
          <div
            className={cn(
              'grid gap-[9px] border-b border-[var(--spontaine-surface-line)] pb-2.5 font-body text-[0.55rem] font-semibold uppercase text-[var(--spontaine-surface-data-muted)]',
              scene.gridClassName
            )}
          >
            <span>{firstColumn}</span>
            {valueColumns.map((column) => (
              <span key={column}>{column}</span>
            ))}
          </div>

          <div className='divide-y divide-[var(--spontaine-surface-line-soft)]'>
            {scene.rows.map(({ cells: [name, first, delta, last] }) => (
              <div
                key={name}
                className={cn(
                  'grid gap-[9px] py-[11px] font-body text-[0.72rem] text-spontaine-gray-muted',
                  scene.gridClassName
                )}
              >
                <span className='font-semibold text-spontaine-gray-deep'>{name}</span>
                <span>{first}</span>
                <span className='font-bold text-[var(--spontaine-surface-negative)]'>{delta}</span>
                <span>{last}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='grid gap-[22px] pt-[17px] md:grid-cols-[1fr_1.15fr]'>
        <div>
          <p className='font-body text-[0.59rem] font-medium uppercase text-[var(--spontaine-surface-data-muted)]'>
            {scene.metricLabel}
          </p>
          <p className='mt-1 font-display text-[1.3rem] font-bold leading-none tracking-[-0.06em] text-spontaine-gray-soft'>
            {scene.metricValue}
          </p>

          <div className='relative mt-[14px] h-[73px] overflow-hidden bg-[linear-gradient(180deg,transparent_48%,var(--spontaine-accent-soft)_49%,var(--spontaine-accent-soft)_51%,transparent_52%)]'>
            <svg
              aria-hidden='true'
              className='h-full w-full text-spontaine-accent'
              preserveAspectRatio='none'
              viewBox='0 0 250 70'
            >
              <path
                d={scene.sparkPath}
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
            {scene.whatChanged}
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
