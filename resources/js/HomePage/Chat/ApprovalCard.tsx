import ChatSurface from './ChatSurface'

export default function ApprovalCard() {
  return (
    <ChatSurface
      variant='card'
      size='md'
      className='w-full max-w-[480px]'
    >
      <p className='mb-4 font-mono text-xs font-bold uppercase tracking-[0.04em] text-emerald-600'>
        ✦ Found overnight · 05:47
      </p>

      <p className='font-display text-lg font-semibold leading-7 text-slate-800'>
        Client H qualifies for a €3,000 energy-tax deduction, unclaimed. Approve a ticket to start
        work?
      </p>

      <p className='mt-5 font-mono text-sm text-gray-400'>Est. cost: €550</p>

      <div className='mt-5 flex flex-wrap gap-2'>
        <button
          type='button'
          className='font-display rounded-full bg-[#0FE5A8] px-5 text-sm font-bold text-slate-900 transition-colors hover:bg-[#2BEFB6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2'
        >
          Approve
        </button>
        <button
          type='button'
          className='font-display min-h-11 rounded-full border border-gray-200 px-5 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2'
        >
          Skip
        </button>
        <button
          type='button'
          className='font-display min-h-11 rounded-full border border-gray-200 px-5 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2'
        >
          Show working
        </button>
      </div>

      <p className='mt-4 inline-flex rounded-lg bg-emerald-50 px-3 py-2 font-mono text-xs font-bold text-emerald-700'>
        Assigned: your team
      </p>
    </ChatSurface>
  )
}
