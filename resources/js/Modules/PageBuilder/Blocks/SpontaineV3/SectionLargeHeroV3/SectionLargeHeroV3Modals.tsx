import { CTAEditModal } from '../../../Components/CTAEditModal'
import { OverlayEditModal } from '../../../Components/OverlayEditModal'
import type { SectionLargeHeroV3Block } from './types'
import type { SectionLargeHeroV3Model } from './useSectionLargeHeroV3Model'
import { makeTextData } from './utils'

interface SectionLargeHeroV3ModalsProps {
  blockData?: SectionLargeHeroV3Block
  editMode: boolean
  model: SectionLargeHeroV3Model
  onCloseOverlayModal: () => void
  onClosePrimaryCTAModal: () => void
  onCloseSecondaryCTAModal: () => void
  showOverlayModal: boolean
  showPrimaryCTAModal: boolean
  showSecondaryCTAModal: boolean
}

const SectionLargeHeroV3Modals = ({
  blockData,
  editMode,
  model,
  onCloseOverlayModal,
  onClosePrimaryCTAModal,
  onCloseSecondaryCTAModal,
  showOverlayModal,
  showPrimaryCTAModal,
  showSecondaryCTAModal,
}: SectionLargeHeroV3ModalsProps) => (
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
      show={showPrimaryCTAModal && editMode}
      onClose={onClosePrimaryCTAModal}
      currentCTA={blockData?.primaryCta}
      currentCalendarUrl={model.primaryCalendarUrl}
      onSave={(data) =>
        model.updateBlockFields({
          primaryCta: data.cta ?? null,
          primaryCalendarUrl: makeTextData(data.calendarUrl ?? ''),
        })
      }
    />

    <CTAEditModal
      show={showSecondaryCTAModal && editMode}
      onClose={onCloseSecondaryCTAModal}
      currentCTA={blockData?.secondaryCta}
      currentCalendarUrl={model.secondaryCalendarUrl}
      onSave={(data) =>
        model.updateBlockFields({
          secondaryCta: data.cta ?? null,
          secondaryCalendarUrl: makeTextData(data.calendarUrl ?? ''),
        })
      }
    />
  </>
)

export default SectionLargeHeroV3Modals
