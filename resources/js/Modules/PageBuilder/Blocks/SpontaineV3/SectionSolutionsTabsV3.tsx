import SolutionsTabs from '@/components/Solutions/SolutionsTabs'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import type { Dispatch } from 'react'
import type { BlocKFieldInfo } from '../../Components/BlockEditor/BlockEditor'
import { displayText } from '../../Components/Localization'
import { getV3ColorValue } from '../../Components/V3ColorControls'
import V3RoundedSectionBlockFrame from '../../Components/V3RoundedSectionBlockFrame'
import { isV3RoundedTopEnabled, isV3TopOverlapEnabled } from '../../Components/V3RoundedTopToggle'
import type { PageBuilderAction } from '../../hooks/pageBuilderService'
import type { Language } from '../../Pages/PageBuilder'
import SectionSolutionsTabsV3EditPanel from './SectionSolutionsTabsV3/SectionSolutionsTabsV3EditPanel'
import {
  SPONTAINE_V3_SOLUTIONS_TABS_BLOCK_NAME,
  sectionSolutionsTabsV3Block,
  type SectionSolutionsTabsV3Block,
} from './SectionSolutionsTabsV3/types'
import { toSolutionTabs } from './SectionSolutionsTabsV3/utils'

export { SPONTAINE_V3_SOLUTIONS_TABS_BLOCK_NAME, sectionSolutionsTabsV3Block }
export type { SectionSolutionsTabsV3Block }

interface Properties {
  readonly blockData?: SectionSolutionsTabsV3Block
  readonly dispatch?: Dispatch<PageBuilderAction>
  readonly editMode?: boolean
  readonly language?: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

const SectionSolutionsTabsV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const tabs = toSolutionTabs(blockData?.tabs, language)
  const eyebrow = (displayText(blockData?.eyebrow, language) ?? '').toString()
  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const roundedTop = isV3RoundedTopEnabled(blockData?.roundedTop, language)
  const overlapTop = isV3TopOverlapEnabled(blockData?.overlapTop, language)

  return (
    <V3RoundedSectionBlockFrame
      roundedTop={roundedTop}
      overlapTop={overlapTop}
      aria-label={eyebrow || undefined}
      className={cn(
        'relative w-full overflow-hidden py-[96px] md:py-[112px] lg:pb-[150px] lg:pt-[128px]',
        !backgroundColor && 'bg-spontaine-surface-cream',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={backgroundColor ? { background: backgroundColor } : undefined}
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        {tabs.length > 0 && (
          <SolutionsTabs
            eyebrow={eyebrow}
            tabs={tabs}
            idPrefix={`solutions-block-${blockData?.id ?? 0}`}
            autoplay={!editMode}
            onSelect={(tab, source) =>
              trackEvent('solution_tab_selected', { tab: tab.label, source })
            }
            onLinkClick={(tab) =>
              trackEvent('solution_link_clicked', { tab: tab.label, href: tab.link?.href ?? '' })
            }
          />
        )}

        {editMode && dispatch != null && blockData != null && (
          <SectionSolutionsTabsV3EditPanel
            blockData={blockData}
            dispatch={dispatch}
            language={language}
            onFieldEdit={onFieldEdit}
          />
        )}
      </div>
    </V3RoundedSectionBlockFrame>
  )
}

export default SectionSolutionsTabsV3
