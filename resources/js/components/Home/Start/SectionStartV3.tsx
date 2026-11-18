import PathSteps, { type PathStep } from '@/components/Sections/PathSteps'
import { useStackUp } from '@/hooks/useStackUp'

const steps: readonly PathStep[] = [
  {
    label: '01 · Pick one bottleneck',
    text: 'Start where margin or delivery leaks.',
    detail:
      'Choose one high-friction blind spot, from quote-to-actual cost to engagement realisation.',
  },
  {
    label: '02 · Connect in place',
    text: 'No rip and replace, in four weeks.',
    detail:
      'Our domain specialists wire your existing ERPs, floor systems and CRMs without disrupting daily work.',
  },
  {
    label: '03 · Own the capability',
    text: 'Scale across sites on your terms.',
    detail:
      'Every workflow, alert and customer portal becomes permanent IP your organisation owns outright.',
  },
]

// Flip to true when /first-question goes live (28 Nov).
const FIRST_QUESTION_PAGE_LIVE = false

export default function SectionStartV3() {
  const sectionRef = useStackUp<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id='first-question'
      aria-labelledby='first-question-title'
      className='relative w-full scroll-mt-16 overflow-hidden rounded-t-section-sm bg-spontaine-surface-paper pb-[120px] pt-[105px] md:rounded-t-section-md md:pt-[130px] lg:rounded-t-section-lg lg:pb-[150px] xl:rounded-t-section-xl'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <PathSteps
          titleId='first-question-title'
          eyebrow='How it starts'
          titleOne='Start with one question.'
          titleTwo='The results are yours either way.'
          steps={steps}
          note='Across several companies or sites, allow four to eight weeks.'
          closingLine='Tailored to your exact tooling and operational reality, without turning your organisation into a software company.'
          body='Fixed scope and fixed fee, agreed before we start. If you stop, the data and results stay yours.'
          secondaryLink={
            FIRST_QUESTION_PAGE_LIVE
              ? { label: 'How the first four weeks work', href: '/first-question' }
              : null
          }
        />
      </div>
    </section>
  )
}
