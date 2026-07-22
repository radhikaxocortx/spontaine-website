import type { Language } from '@/components/ui/ui_interfaces'
import { cn } from '@/lib/utils'
import React from 'react'
import type { BlocKFieldInfo } from '../../Components/BlockEditor/BlockEditor'
import V3RoundedSectionBlockFrame from '../../Components/V3RoundedSectionBlockFrame'
import type { PageBuilderAction } from '../../hooks/pageBuilderService'
import SectionLargeHeroV3Background from './SectionLargeHeroV3/SectionLargeHeroV3Background'
import SectionLargeHeroV3Content from './SectionLargeHeroV3/SectionLargeHeroV3Content'
import SectionLargeHeroV3EditPanel from './SectionLargeHeroV3/SectionLargeHeroV3EditPanel'
import SectionLargeHeroV3Modals from './SectionLargeHeroV3/SectionLargeHeroV3Modals'
import {
  sectionLargeHeroV3Block,
  SPONTAINE_V3_LARGE_HERO_BLOCK_NAME,
  type SectionLargeHeroV3Block,
} from './SectionLargeHeroV3/types'
import { useSectionLargeHeroV3Model } from './SectionLargeHeroV3/useSectionLargeHeroV3Model'
import { useSectionLargeHeroV3Reveal } from './SectionLargeHeroV3/useSectionLargeHeroV3Reveal'

export { sectionLargeHeroV3Block, SPONTAINE_V3_LARGE_HERO_BLOCK_NAME }
export type { SectionLargeHeroV3Block }

interface Properties {
  blockData?: SectionLargeHeroV3Block
  dispatch?: React.Dispatch<PageBuilderAction>
  editMode?: boolean
  language?: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const SectionLargeHeroV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const sectionRef = React.useRef<HTMLElement>(null)
  const [showOverlayModal, setShowOverlayModal] = React.useState(false)
  const [showPrimaryCTAModal, setShowPrimaryCTAModal] = React.useState(false)
  const [showSecondaryCTAModal, setShowSecondaryCTAModal] = React.useState(false)
  const model = useSectionLargeHeroV3Model({
    blockData,
    dispatch,
    language,
    onFieldEdit,
  })

  useSectionLargeHeroV3Reveal(sectionRef, editMode)

  return (
    <V3RoundedSectionBlockFrame
      ref={sectionRef}
      roundedTop={model.hasRoundedTop}
      overlapTop={model.hasTopOverlap}
      className={cn(
        'relative left-1/2 right-1/2 isolate ml-[-50vw] mr-[-50vw] w-screen overflow-hidden pb-[150px] pt-20 md:pb-[150px] md:pt-[168px] lg:pt-[120px]',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={model.sectionStyle}
    >
      <SectionLargeHeroV3Background model={model} />

      <div className='relative z-10 mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <SectionLargeHeroV3Content
          blockData={blockData}
          dispatch={dispatch}
          editMode={editMode}
          language={language}
          model={model}
          onFieldEdit={onFieldEdit}
          onOpenPrimaryCTAModal={() => setShowPrimaryCTAModal(true)}
          onOpenSecondaryCTAModal={() => setShowSecondaryCTAModal(true)}
        />
      </div>

      {editMode && (
        <SectionLargeHeroV3EditPanel
          blockData={blockData}
          dispatch={dispatch}
          language={language}
          onFieldEdit={onFieldEdit}
          onOpenOverlayModal={() => setShowOverlayModal(true)}
        />
      )}

      <SectionLargeHeroV3Modals
        blockData={blockData}
        editMode={editMode}
        model={model}
        onCloseOverlayModal={() => setShowOverlayModal(false)}
        onClosePrimaryCTAModal={() => setShowPrimaryCTAModal(false)}
        onCloseSecondaryCTAModal={() => setShowSecondaryCTAModal(false)}
        showOverlayModal={showOverlayModal}
        showPrimaryCTAModal={showPrimaryCTAModal}
        showSecondaryCTAModal={showSecondaryCTAModal}
      />
    </V3RoundedSectionBlockFrame>
  )
}

export default SectionLargeHeroV3
