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
        'relative flex min-h-[277px] w-full flex-col overflow-hidden rounded-[var(--radius-card)] p-[var(--space-card)] shadow-surface',
        surface,
        text,
        className,
      ].join(' ')}
    >
      <div
        className={['relative z-10 flex flex-1 flex-col', contentClassName]
          .filter(Boolean)
          .join(' ')}
      >
        {header}
        <h3
          className={[
            'font-display text-[1.25rem] font-bold leading-[1.16] tracking-[-0.02em]',
            titleClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {title}
        </h3>
        <div
          className={['mt-[18px] font-body text-[0.79rem] leading-[1.55]', bodyClassName]
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
    <section className='bg-spontaine-surface-ice relative w-full overflow-hidden rounded-t-[50%_6%] py-[105px] md:py-[130px] lg:pb-[155px]'>
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='mx-auto max-w-[790px] text-center'>
          <p className='eyebrow mb-5 text-spontaine-gray-cool'>THE OLD CHOICES</p>

          <h2 className='display-xl text-spontaine-dark'>
            You do not need another dashboard.
            <br />
            <span className='display-xl text-spontaine-text-accent-dark'>
              Or another build that never becomes yours.
            </span>
          </h2>

          <p className='body-lg mx-auto mt-5 max-w-[580px] font-body text-spontaine-gray-muted'>
            The models are ready. The missing layer is the governed business knowledge that lets
            them work safely, consistently, and repeatedly for your firm.
          </p>
        </div>

        <div className='mx-auto mt-[60px] grid w-full max-w-[790px] grid-cols-1 gap-[14px] md:grid-cols-2'>
          {bentoColumns.flat().map((card) => {
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
      </div>
    </section>
  )
}
