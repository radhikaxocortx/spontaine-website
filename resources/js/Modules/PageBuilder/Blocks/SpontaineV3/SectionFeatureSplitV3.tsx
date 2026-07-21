import type { Language } from '@/components/ui/ui_interfaces'
import { cn } from '@/lib/utils'
import React from 'react'
import type { BlocKFieldInfo } from '../../Components/BlockEditor/BlockEditor'
import V3RoundedSectionBlockFrame from '../../Components/V3RoundedSectionBlockFrame'
import type { PageBuilderAction } from '../../hooks/pageBuilderService'
import SectionFeatureSplitV3Content from './SectionFeatureSplitV3/SectionFeatureSplitV3Content'
import SectionFeatureSplitV3EditPanel from './SectionFeatureSplitV3/SectionFeatureSplitV3EditPanel'
import SectionFeatureSplitV3Media from './SectionFeatureSplitV3/SectionFeatureSplitV3Media'
import SectionFeatureSplitV3Modals from './SectionFeatureSplitV3/SectionFeatureSplitV3Modals'
import {
  SPONTAINE_V3_FEATURE_SPLIT_BLOCK_NAME,
  sectionFeatureSplitV3Block,
  type SectionFeatureSplitV3Block,
} from './SectionFeatureSplitV3/types'
import { useSectionFeatureSplitV3Model } from './SectionFeatureSplitV3/useSectionFeatureSplitV3Model'
import { useSectionFeatureSplitV3Reveal } from './SectionFeatureSplitV3/useSectionFeatureSplitV3Reveal'

export { SPONTAINE_V3_FEATURE_SPLIT_BLOCK_NAME, sectionFeatureSplitV3Block }
export type { SectionFeatureSplitV3Block }

interface Properties {
  blockData?: SectionFeatureSplitV3Block
  dispatch?: React.Dispatch<PageBuilderAction>
  editMode?: boolean
  language?: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const SectionFeatureSplitV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const sectionRef = React.useRef<HTMLElement>(null)
  const [showCTAModal, setShowCTAModal] = React.useState(false)
  const model = useSectionFeatureSplitV3Model({
    blockData,
    dispatch,
    editMode,
    language,
    onFieldEdit,
  })

  useSectionFeatureSplitV3Reveal(sectionRef, editMode)

  return (
    <V3RoundedSectionBlockFrame
      ref={sectionRef}
      roundedTop={model.hasRoundedTop}
      overlapTop={model.hasTopOverlap}
      className={cn(
        'relative w-full overflow-hidden px-6 py-16 md:px-10 md:py-20 lg:py-24',
        !model.backgroundColor && 'bg-pagebuilder-hero-wash',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={model.sectionStyle}
    >
      <div
        className={cn(
          'relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-10 lg:gap-16',
          model.shouldRenderMedia ? 'lg:grid-cols-2' : 'lg:max-w-[760px]'
        )}
      >
        <div className={cn(model.shouldRenderMedia && model.isMediaLeft && 'lg:order-2')}>
          <SectionFeatureSplitV3Content
            blockData={blockData}
            dispatch={dispatch}
            editMode={editMode}
            language={language}
            model={model}
            onFieldEdit={onFieldEdit}
            onOpenCTAModal={() => setShowCTAModal(true)}
          />
        </div>

        {model.shouldRenderMedia && (
          <div className={cn(model.isMediaLeft && 'lg:order-1')}>
            <SectionFeatureSplitV3Media
              blockData={blockData}
              editMode={editMode}
              language={language}
              model={model}
              onFieldEdit={onFieldEdit}
            />
          </div>
        )}

        {editMode && (
          <SectionFeatureSplitV3EditPanel
            blockData={blockData}
            dispatch={dispatch}
            language={language}
            model={model}
            onFieldEdit={onFieldEdit}
          />
        )}
      </div>

      <SectionFeatureSplitV3Modals
        blockData={blockData}
        editMode={editMode}
        model={model}
        onCloseCTAModal={() => setShowCTAModal(false)}
        showCTAModal={showCTAModal}
      />
    </V3RoundedSectionBlockFrame>
  )
}

export default SectionFeatureSplitV3
