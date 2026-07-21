import type { Language } from '@/components/ui/ui_interfaces'
import { cn } from '@/lib/utils'
import React from 'react'
import type { BlocKFieldInfo } from '../../Components/BlockEditor/BlockEditor'
import V3RoundedSectionBlockFrame from '../../Components/V3RoundedSectionBlockFrame'
import type { PageBuilderAction } from '../../hooks/pageBuilderService'
import SectionCtaV3Content from './SectionCtaV3/SectionCtaV3Content'
import SectionCtaV3EditPanel from './SectionCtaV3/SectionCtaV3EditPanel'
import SectionCtaV3Modals from './SectionCtaV3/SectionCtaV3Modals'
import {
  SPONTAINE_V3_CTA_BLOCK_NAME,
  sectionCtaV3Block,
  type SectionCtaV3Block,
} from './SectionCtaV3/types'
import { useSectionCtaV3Model } from './SectionCtaV3/useSectionCtaV3Model'
import { useSectionCtaV3Reveal } from './SectionCtaV3/useSectionCtaV3Reveal'

export { SPONTAINE_V3_CTA_BLOCK_NAME, sectionCtaV3Block }
export type { SectionCtaV3Block }

interface Properties {
  blockData?: SectionCtaV3Block
  dispatch?: React.Dispatch<PageBuilderAction>
  editMode?: boolean
  language?: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const SectionCtaV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const sectionRef = React.useRef<HTMLElement>(null)
  const [showPrimaryCTAModal, setShowPrimaryCTAModal] = React.useState(false)
  const [showSecondaryCTAModal, setShowSecondaryCTAModal] = React.useState(false)
  const model = useSectionCtaV3Model({
    blockData,
    dispatch,
    language,
    onFieldEdit,
  })

  useSectionCtaV3Reveal(sectionRef, editMode)

  return (
    <V3RoundedSectionBlockFrame
      ref={sectionRef}
      roundedTop={model.hasRoundedTop}
      overlapTop={model.hasTopOverlap}
      className={cn(
        'relative isolate w-full overflow-hidden px-6 py-16 text-center md:px-10 md:py-20 lg:py-24',
        !model.backgroundColor && 'bg-pagebuilder-cta-wash',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={model.sectionStyle}
    >
      <SectionCtaV3Content
        blockData={blockData}
        dispatch={dispatch}
        editMode={editMode}
        language={language}
        model={model}
        onFieldEdit={onFieldEdit}
        onOpenPrimaryCTAModal={() => setShowPrimaryCTAModal(true)}
        onOpenSecondaryCTAModal={() => setShowSecondaryCTAModal(true)}
      />

      {editMode && (
        <SectionCtaV3EditPanel
          blockData={blockData}
          dispatch={dispatch}
          language={language}
          model={model}
          onFieldEdit={onFieldEdit}
        />
      )}

      <SectionCtaV3Modals
        blockData={blockData}
        editMode={editMode}
        model={model}
        onClosePrimaryCTAModal={() => setShowPrimaryCTAModal(false)}
        onCloseSecondaryCTAModal={() => setShowSecondaryCTAModal(false)}
        showPrimaryCTAModal={showPrimaryCTAModal}
        showSecondaryCTAModal={showSecondaryCTAModal}
      />
    </V3RoundedSectionBlockFrame>
  )
}

export default SectionCtaV3
