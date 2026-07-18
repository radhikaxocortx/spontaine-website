import { type ReactNode } from 'react'

export interface BentoCardData {
  readonly title: string
  readonly body: ReactNode
  readonly surface: string
  readonly text: string
  readonly className: string
  readonly contentClassName?: string
  readonly titleClassName?: string
  readonly bodyClassName?: string
  readonly header?: ReactNode
  readonly media?: ReactNode
}

export const bentoCards: BentoCardData[] = [
  {
    title: 'Traditional business analytics',
    surface: 'bg-spontaine-surface-cream',
    text: 'text-spontaine-text-primary',
    className: '',
    body: (
      <>
        <p>
          Shows the report you designed. It does not create a shared, governed definition that every
          person, product, and model can use.
        </p>
        <p className='mt-[13px] text-[0.76rem] font-bold leading-[1.48]'>
          Keep your BI tools. Point them at intelligence your firm can trust.
        </p>
      </>
    ),
  },
  {
    title: 'Commission a foundation',
    surface: 'bg-spontaine-surface-ink',
    text: 'text-spontaine-text-on-dark',
    className: '',
    bodyClassName: 'text-spontaine-text-on-dark-secondary',
    body: (
      <>
        <p>
          Start a long data programme before the firm can answer its first important question. The
          implementation absorbs the knowledge; the capability remains difficult to change.
        </p>
        <p className='mt-[13px] text-[0.76rem] font-bold leading-[1.48]'>
          Start with a decision. Keep extending what works.
        </p>
      </>
    ),
  },
  {
    title: 'Add a co-pilot',
    surface: 'bg-spontaine-gray',
    text: 'text-spontaine-text-on-dark',
    className: '',
    bodyClassName: 'text-spontaine-text-on-dark-secondary',
    body: (
      <>
        <p>
          Get fast answers from a model that does not inherently know your measures, your
          exceptions, or the boundaries of the question.
        </p>
        <p className='mt-[13px] text-[0.76rem] font-bold leading-[1.48]'>
          Give AI a governed contract, not just access.
        </p>
      </>
    ),
  },
  {
    title: 'Build the intelligence once. Let it work everywhere.',
    surface: 'bg-spontaine-surface-paper/70',
    text: 'text-spontaine-text-primary',
    className: '',
    contentClassName: 'justify-between',
    titleClassName: 'max-w-[240px] text-[1.42rem] leading-[1.04] tracking-[-0.055em]',
    bodyClassName: 'mt-6',
    header: (
      <div className='font-display text-[1.35rem] font-extrabold tracking-[0.16em] text-spontaine-gray-deep'>
        SPONTAINE
      </div>
    ),
    body: (
      <p>
        Define a Lens. Create a governed answer. Save it as a Block. Publish it to the tools and
        workflows that need it.
      </p>
    ),
  },
]

export const bentoColumns: readonly BentoCardData[][] = [
  [bentoCards[0], bentoCards[1]],
  [bentoCards[2], bentoCards[3]],
]
