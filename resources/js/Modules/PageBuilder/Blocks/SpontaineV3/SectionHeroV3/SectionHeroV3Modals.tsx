import { CTAEditModal } from '../../../Components/CTAEditModal'
import { OverlayEditModal } from '../../../Components/OverlayEditModal'
import type { SectionHeroV3Block } from './types'
import type { SectionHeroV3Model } from './useSectionHeroV3Model'
import { makeTextData } from './utils'

interface SectionHeroV3ModalsProps {
  blockData?: SectionHeroV3Block
  editMode: boolean
  model: SectionHeroV3Model
  onCloseCTAModal: () => void
  onCloseOverlayModal: () => void
  showCTAModal: boolean
  showOverlayModal: boolean
}

const SectionHeroV3Modals = ({
  blockData,
  editMode,
  model,
  onCloseCTAModal,
  onCloseOverlayModal,
  showCTAModal,
  showOverlayModal,
}: SectionHeroV3ModalsProps) => (
  <>
    <OverlayEditModal
      show={showOverlayModal && editMode}
      onClose={onCloseOverlayModal}
      currentColor={model.overlayColor}
      currentOpacity={model.overlayOpacity}
      onSave={(data) =>
        model.updateBlockFields({
          overlayColor: makeTextData(data.overlayColor),
          overlayOpacity: makeTextData(data.overlayOpacity.toString()),
        })
      }
    />

    <CTAEditModal
      show={showCTAModal && editMode}
      onClose={onCloseCTAModal}
      currentCTA={blockData?.cta}
      currentCalendarUrl={model.calendarUrl}
      onSave={(data) =>
        model.updateBlockFields({
          cta: data.cta ?? null,
          calendarUrl: makeTextData(data.calendarUrl ?? ''),
        })
      }
    />
  </>
)

export default SectionHeroV3Modals
