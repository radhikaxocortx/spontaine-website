import SolutionsTabs, { type SolutionTab } from '@/components/Solutions/SolutionsTabs'
import {
  solutionsEyebrow,
  solutionsHeadline,
  solutionTabs,
} from '@/components/Solutions/solutionsContent'
import { useStackUp } from '@/hooks/useStackUp'
import { trackEvent } from '@/lib/analytics'
import { useEffect, useState } from 'react'

/** Reads ?solution=<tab id> so outbound links can open a specific tab. */
const useRequestedSolution = () => {
  const [requested, setRequested] = useState<string | null>(null)

  useEffect(() => {
    setRequested(new URLSearchParams(window.location.search).get('solution'))
  }, [])

  return requested
}

const handleLinkClick = (tab: SolutionTab) =>
  trackEvent('solution_link_clicked', { tab: tab.id, href: tab.link?.href ?? '' })

export default function SectionSolutionsV3() {
  const sectionRef = useStackUp<HTMLElement>()
  const requestedTabId = useRequestedSolution()

  return (
    <section
      ref={sectionRef}
      id='solutions'
      aria-label={solutionsEyebrow}
      className='relative w-full scroll-mt-16 pb-[120px] pt-2 md:pb-[150px] lg:pb-[170px]'
    >
      {/* Light behind the glass, continuing the hero's ambient band and prism */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-[-15%] top-[16%] h-44 rotate-[-9deg] bg-ambient-band-mint-amber opacity-60 blur-2xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-16 bottom-[18%] hidden aspect-square w-[420px] rotate-[15deg] rounded-[42%_58%_63%_37%/41%_44%_56%_59%] bg-prism-surface opacity-80 shadow-prism lg:block'
      />

      <div className='relative mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='overflow-hidden rounded-[var(--radius-panel)] border border-spontaine-white/70 bg-spontaine-white/40 px-[var(--space-shell-sm)] py-10 shadow-surface backdrop-blur-xl md:px-[var(--space-shell)] md:py-12 lg:p-14'>
          <SolutionsTabs
            eyebrow={solutionsEyebrow}
            tabs={solutionTabs}
            fixedHeadline={solutionsHeadline}
            idPrefix='home-solutions'
            requestedTabId={requestedTabId}
            onSelect={(tab, source) => trackEvent('solution_tab_selected', { tab: tab.id, source })}
            onLinkClick={handleLinkClick}
          />
        </div>
      </div>
    </section>
  )
}
