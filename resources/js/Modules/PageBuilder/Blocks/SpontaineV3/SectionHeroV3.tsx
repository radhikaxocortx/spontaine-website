import type { Language } from '@/components/ui/ui_interfaces'
import { cn } from '@/lib/utils'
import React from 'react'
import type { BlocKFieldInfo } from '../../Components/BlockEditor/BlockEditor'
import V3RoundedSectionBlockFrame from '../../Components/V3RoundedSectionBlockFrame'
import { usePageBuilderContext } from '../../contexts/PageBuilderContext'
import type { PageBuilderAction } from '../../hooks/pageBuilderService'
import SectionHeroV3Background from './SectionHeroV3/SectionHeroV3Background'
import SectionHeroV3Content from './SectionHeroV3/SectionHeroV3Content'
import SectionHeroV3EditPanel from './SectionHeroV3/SectionHeroV3EditPanel'
import SectionHeroV3Modals from './SectionHeroV3/SectionHeroV3Modals'
import {
  SPONTAINE_V3_HERO_BLOCK_NAME,
  sectionHeroV3Block,
  type SectionHeroV3Block,
} from './SectionHeroV3/types'
import { useSectionHeroV3Model } from './SectionHeroV3/useSectionHeroV3Model'
import { useSectionHeroV3Reveal } from './SectionHeroV3/useSectionHeroV3Reveal'

export { SPONTAINE_V3_HERO_BLOCK_NAME, sectionHeroV3Block }
export type { SectionHeroV3Block }

interface Properties {
  blockData?: SectionHeroV3Block
  dispatch?: React.Dispatch<PageBuilderAction>
  editMode?: boolean
  language?: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const SectionHeroV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const { renderMode } = usePageBuilderContext()
  const sectionRef = React.useRef<HTMLElement>(null)
  const [showOverlayModal, setShowOverlayModal] = React.useState(false)
  const [showCTAModal, setShowCTAModal] = React.useState(false)
  const model = useSectionHeroV3Model({
    blockData,
    dispatch,
    editMode,
    language,
    onFieldEdit,
    renderMode,
  })

  useSectionHeroV3Reveal(sectionRef, editMode)

  return (
    <V3RoundedSectionBlockFrame
      ref={sectionRef}
      roundedTop={model.hasRoundedTop}
      overlapTop={model.hasTopOverlap}
      className={cn(
        'relative left-1/2 right-1/2 isolate ml-[-50vw] mr-[-50vw] flex w-screen flex-col items-center justify-center overflow-hidden',
        model.heroHeightClassName,
        model.heroPaddingClassName,
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={model.sectionStyle}
    >
      <SectionHeroV3Background model={model} />
      <SectionHeroV3Content
        blockData={blockData}
        dispatch={dispatch}
        editMode={editMode}
        language={language}
        model={model}
        onFieldEdit={onFieldEdit}
        onOpenCTAModal={() => setShowCTAModal(true)}
      />
      {editMode && (
        <SectionHeroV3EditPanel
          blockData={blockData}
          dispatch={dispatch}
          language={language}
          onFieldEdit={onFieldEdit}
          onOpenOverlayModal={() => setShowOverlayModal(true)}
        />
      )}
      <SectionHeroV3Modals
        blockData={blockData}
        editMode={editMode}
        model={model}
        onCloseCTAModal={() => setShowCTAModal(false)}
        onCloseOverlayModal={() => setShowOverlayModal(false)}
        showCTAModal={showCTAModal}
        showOverlayModal={showOverlayModal}
      />
    </V3RoundedSectionBlockFrame>
  )
}

export default SectionHeroV3
