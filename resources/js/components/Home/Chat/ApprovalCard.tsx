import { Sparkles } from 'lucide-react'
import ChatSurface from './ChatSurface'

export default function ApprovalCard() {
  return (
    <ChatSurface
      variant='card'
      size='none'
      className='w-full p-[var(--space-card)]'
    >
      <p className='text-spontaine-success flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.07em]'>
        <Sparkles
          aria-hidden='true'
          className='h-3 w-3'
        />
        <span>Opportunity found &middot; 05:47</span>
      </p>

      <h3 className='mt-3 font-display text-[0.94rem] font-semibold leading-[1.3] tracking-[-0.025em] text-spontaine-dark'>
        One client may qualify for an energy-tax deduction.
      </h3>

      <p className='mt-3 font-body text-[0.7rem] leading-relaxed text-spontaine-gray-muted'>
        Review the evidence and decide whether to open a work item.
      </p>

      <div className='mt-[18px] flex flex-wrap gap-[7px]'>
        <button
          type='button'
          className='hover:bg-spontaine-accent-hover rounded-[var(--radius-pill)] bg-spontaine-accent px-2.5 py-2 font-mono text-[0.63rem] font-semibold text-spontaine-accent-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spontaine-accent-dark focus-visible:ring-offset-2'
        >
          Review evidence
        </button>
        <button
          type='button'
          className='rounded-[var(--radius-pill)] bg-[var(--spontaine-pill-variant-neutral-bg)] px-2.5 py-2 font-mono text-[0.63rem] font-semibold text-[var(--spontaine-pill-variant-neutral-text)] transition-colors hover:bg-spontaine-gray-soft/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spontaine-accent-dark focus-visible:ring-offset-2'
        >
          Not now
        </button>
      </div>
    </ChatSurface>
  )
}
