import AppLayoutPadding from '@/Layouts/AppLayoutPadding'

import { bentoColumns, type BentoCardData } from './data/bentoContent'
import { useBentoReveal } from './hooks/useBentoReveal'

interface BentoCardProps extends BentoCardData {
  readonly cardRef: (node: HTMLDivElement | null) => void
}

function BentoCard({
  title,
  body,
  surface,
  text,
  className,
  contentClassName,
  titleClassName,
  bodyClassName,
  header,
  media,
  cardRef,
}: BentoCardProps) {
  return (
    <article
      ref={cardRef}
      className={[
        'relative flex min-h-[320px] w-full max-w-[380px] flex-col justify-self-center overflow-hidden rounded-[40px]',
        surface,
        text,
        className,
      ].join(' ')}
    >
      <div
        className={['relative z-10 flex flex-1 flex-col p-5 sm:p-7', contentClassName]
          .filter(Boolean)
          .join(' ')}
      >
        {header}
        <h3
          className={[
            'text-center font-display text-xl font-bold leading-[1.16] tracking-[-0.02em] sm:text-2xl',
            titleClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {title}
        </h3>
        <div
          className={['mt-5 font-body text-sm leading-[1.55] sm:text-sm', bodyClassName]
            .filter(Boolean)
            .join(' ')}
        >
          {body}
        </div>
        {media}
      </div>
    </article>
  )
}

export default function SectionBentoV3() {
  const setCardRef = useBentoReveal<HTMLDivElement>()
  let cardIndex = 0

  return (
    <section className='relative w-full overflow-hidden bg-white pb-10 md:pb-4'>
      <div className='relative -mb-1 w-full'>
        <svg
          viewBox='0 0 1920 183'
          preserveAspectRatio='none'
          className='block w-full'
          aria-hidden='true'
        >
          <path
            d='M1920 128C1635.2 46.4 1308 0 960 0C612 0 284.8 46.4 0 128V183.067H1920V128Z'
            fill='#d4eeff'
          />
        </svg>
      </div>

      <div className='bg-gradient-to-b from-[#d4eeff] to-spontaine-surface-cream'>
        <AppLayoutPadding className='pb-24 pt-10 sm:pb-32 lg:pb-44 lg:pt-16'>
          <div className='mx-auto w-full max-w-[860px]'>
            <div className='mx-auto mb-14 flex h-10 w-48 items-center justify-center rounded-lg bg-black/5 font-mono text-sm tracking-[-0.025em] text-spontaine-gray'>
              Options
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8'>
              {bentoColumns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className='flex flex-col items-center gap-6 lg:gap-8'
                >
                  {column.map((card) => {
                    const currentCardIndex = cardIndex
                    cardIndex += 1

                    return (
                      <BentoCard
                        key={card.title}
                        {...card}
                        cardRef={setCardRef(currentCardIndex)}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </AppLayoutPadding>
      </div>
    </section>
  )
}
