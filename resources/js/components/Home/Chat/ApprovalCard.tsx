import { Sparkles } from 'lucide-react'
import ChatSurface from './ChatSurface'

export default function ApprovalCard() {
  return (
    <ChatSurface
      variant='card'
      size='none'
      className='w-full max-w-full overflow-hidden p-[var(--space-card)]'
    >
      <div className='flex items-start gap-2 text-spontaine-success'>
        <Sparkles
          aria-hidden='true'
          className='mt-0.5 h-3 w-3 flex-shrink-0'
        />
        <p className='m-0 min-w-0 break-words font-mono text-[0.62rem] font-bold uppercase leading-snug tracking-[0.07em]'>
          Opportunity found &middot; 05:47
        </p>
      </div>

      <h3 className='mt-3 font-display text-[0.94rem] font-semibold leading-[1.3] tracking-[-0.025em] text-spontaine-dark'>
        One client may qualify for an energy-tax deduction.
      </h3>

      <p className='mt-3 font-body text-[0.7rem] leading-relaxed text-spontaine-gray-muted'>
        Review the evidence and decide whether to open a work item.
      </p>

      <div className='mt-[18px] flex flex-wrap gap-[7px]'>
        <button
          type='button'
          className='w-full max-w-full rounded-[var(--radius-pill)] bg-spontaine-accent px-2.5 py-2 text-center font-mono text-[0.63rem] font-semibold leading-tight text-spontaine-accent-ink transition-colors hover:bg-spontaine-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spontaine-accent-dark focus-visible:ring-offset-2 sm:w-auto'
        >
          Review evidence
        </button>
        <button
          type='button'
          className='w-full max-w-full rounded-[var(--radius-pill)] bg-[var(--spontaine-pill-variant-neutral-bg)] px-2.5 py-2 text-center font-mono text-[0.63rem] font-semibold leading-tight text-[var(--spontaine-pill-variant-neutral-text)] transition-colors hover:bg-spontaine-gray-soft/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spontaine-accent-dark focus-visible:ring-offset-2 sm:w-auto'
        >
          Not now
        </button>
      </div>
    </ChatSurface>
  )
}
