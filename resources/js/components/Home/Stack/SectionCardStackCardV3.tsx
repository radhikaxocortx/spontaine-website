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
        'relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[var(--radius-panel)] border border-spontaine-border-glass-edge px-6 py-5 shadow-surface backdrop-blur sm:px-8 md:min-h-[390px]',
        fitStage ? 'h-full min-h-0' : '',
        compact ? 'px-5 pb-10 pt-5 sm:px-7 sm:pt-7' : '',
        isActive ? 'bg-spontaine-surface-ice/90' : 'bg-spontaine-surface-ice/35 shadow-none',
      ].join(' ')}
    >
      <div
        className={[
          'relative z-10 grid gap-7 md:grid-cols-[minmax(0,1fr)_206px] md:items-center',
          compact ? 'gap-5 md:grid-cols-[minmax(0,1fr)_190px]' : '',
        ].join(' ')}
      >
        <div>
          {/* <p className='text-spontaine-ink-normal/55 font-mono text-xs font-semibold uppercase tracking-[0.16em]'>
            {card.label}
          </p> */}
          <h3
            className={[
              'max-w-lg font-display text-[1.03rem] font-semibold leading-[1.18] tracking-[-0.025em]',
              compact ? 'text-[1.03rem]' : '',
              card.titleTone === 'green'
                ? 'text-spontaine-text-accent-dark'
                : 'text-spontaine-text-primary',
            ].join(' ')}
          >
            {card.title}
          </h3>
          <div
            className={[
              'mt-4 space-y-4 font-body text-[0.82rem] leading-[1.58] text-spontaine-text-primary',
              compact ? 'mt-4 space-y-3 text-[0.8rem] leading-[1.5]' : '',
            ].join(' ')}
          >
            {card.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div
          className={[
            'flex h-[180px] w-[190px] shrink-0 items-center justify-center self-center md:h-[205px] md:w-[206px]',
            compact ? 'hidden md:flex' : '',
          ].join(' ')}
        >
          <StackArtwork artwork={card.artwork} />
        </div>
      </div>
    </article>
  )
}
