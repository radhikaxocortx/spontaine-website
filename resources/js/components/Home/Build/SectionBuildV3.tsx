import { useStackUp } from '@/hooks/useStackUp'
import {
  AppWindow,
  BellRing,
  LayoutDashboard,
  type LucideIcon,
  MessageSquareText,
} from 'lucide-react'
import { useBentoReveal } from '../Bento/hooks/useBentoReveal'

interface BuildCard {
  readonly title: string
  readonly line: string
  readonly icon: LucideIcon
}

const buildCards: readonly BuildCard[] = [
  {
    title: 'Answers',
    line: 'Plain-language questions, with the working shown and the sources named.',
    icon: MessageSquareText,
  },
  {
    title: 'Dashboards and Excel',
    line: 'The tools your teams already use, fed numbers they agree on.',
    icon: LayoutDashboard,
  },
  {
    title: 'Alerts and workflows',
    line: 'The answer runs every morning without anyone asking.',
    icon: BellRing,
  },
  {
    title: 'Customer apps and portals',
    line: 'Share governed data with customers and partners, on your terms.',
    icon: AppWindow,
  },
]

export default function SectionBuildV3() {
  const sectionRef = useStackUp<HTMLElement>()
  const setCardRef = useBentoReveal<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id='build'
      aria-labelledby='build-title'
      className='relative w-full scroll-mt-16 overflow-hidden rounded-t-section-sm bg-spontaine-surface-cream pb-[120px] pt-[105px] md:rounded-t-section-md md:pt-[130px] lg:rounded-t-section-lg lg:pb-[150px] xl:rounded-t-section-xl'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='mx-auto max-w-[790px] text-center'>
          <p
            data-stack-item
            className='eyebrow mb-5 text-spontaine-gray-cool'
          >
            What you can build
          </p>
          <h2
            id='build-title'
            data-stack-item
            className='display-xl text-spontaine-dark'
          >
            One governed source.
            <br />
            <span className='display-xl text-spontaine-text-accent-dark'>Four ways to use it.</span>
          </h2>
        </div>

        <ul className='mx-auto mt-[60px] grid w-full max-w-[790px] grid-cols-1 gap-[14px] md:grid-cols-2'>
          {buildCards.map(({ title, line, icon: Icon }, index) => (
            <li
              key={title}
              ref={setCardRef(index)}
              className='flex min-h-[188px] flex-col rounded-[var(--radius-card)] bg-spontaine-surface-paper p-[var(--space-card-lg)] shadow-card-lift'
            >
              <span className='grid h-10 w-10 place-items-center rounded-[12px] bg-[var(--spontaine-surface-mint-soft)] text-spontaine-text-accent-dark'>
                <Icon
                  aria-hidden='true'
                  className='h-5 w-5'
                  strokeWidth={1.6}
                />
              </span>
              <h3 className='heading-lg mt-auto pt-7 text-spontaine-text-primary'>{title}</h3>
              <p className='mt-2 font-body text-[0.86rem] leading-[1.55] text-spontaine-text-secondary'>
                {line}
              </p>
            </li>
          ))}
        </ul>

        <div className='mx-auto mt-14 max-w-[640px] text-center'>
          <p
            data-stack-item
            className='text-balance font-display text-[clamp(1.25rem,2.2vw,1.6rem)] font-semibold leading-[1.25] tracking-[-0.025em] text-spontaine-text-primary'
          >
            Every governed dataset is already a secure API. Your next product starts there.
          </p>
          <p
            data-stack-item
            className='mt-3 font-body text-[0.88rem] text-spontaine-text-tertiary'
          >
            Keep your planning and BI tools. Give them numbers the whole group agrees on.
          </p>
        </div>
      </div>
    </section>
  )
}
