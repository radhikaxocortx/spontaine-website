import { StackArtwork } from './SectionCardStackArtworkV3'
import type { StackCardData } from './sectionCardStackV3Content'

interface SectionCardStackCardV3Props {
  readonly card: StackCardData
  readonly isActive: boolean
  readonly fitStage?: boolean
  readonly compact?: boolean
}

export default function SectionCardStackCardV3({
  card,
  isActive,
  fitStage = false,
  compact = false,
}: SectionCardStackCardV3Props) {
  return (
    <article
      className={[
        'shadow-spontaine-ink-dark/10 relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/70 px-6 pb-6 pt-5 shadow-2xl backdrop-blur sm:px-9 sm:pt-8',
        fitStage ? 'h-full min-h-0' : '',
        compact ? 'px-5 pb-10 pt-5 sm:px-7 sm:pt-7' : '',
        isActive ? 'bg-[rgba(229,236,246,0.94)]' : 'bg-[rgba(229,236,246,0.74)]',
      ].join(' ')}
    >
      <div
        className={[
          'relative z-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-start',
          compact ? 'gap-5 md:grid-cols-[minmax(0,1fr)_170px]' : '',
        ].join(' ')}
      >
        <div>
          {/* <p className='text-spontaine-ink-normal/55 font-mono text-xs font-semibold uppercase tracking-[0.16em]'>
            {card.label}
          </p> */}
          <h3
            className={[
              'mt-4 max-w-lg font-display text-lg font-bold leading-tight sm:text-2xl',
              compact ? 'text-xl sm:text-2xl' : '',
              card.titleTone === 'green' ? 'text-[#1e3a34]' : 'text-spontaine-ink-soft',
            ].join(' ')}
          >
            {card.title}
          </h3>
          <div
            className={[
              'mt-5 space-y-4 font-body text-sm leading-6 text-[#2b2e33] sm:text-sm sm:leading-5',
              compact ? 'mt-4 space-y-3 text-[13px] leading-5 sm:text-sm sm:leading-6' : '',
            ].join(' ')}
          >
            {card.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div
          className={[
            'flex h-full items-center justify-center self-center',
            compact ? 'hidden md:flex' : '',
          ].join(' ')}
        >
          <StackArtwork artwork={card.artwork} />
        </div>
      </div>
    </article>
  )
}
