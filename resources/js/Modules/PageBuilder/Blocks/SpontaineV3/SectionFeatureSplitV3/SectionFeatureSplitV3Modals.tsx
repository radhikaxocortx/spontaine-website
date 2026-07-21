import { CTAEditModal } from '../../../Components/CTAEditModal'
import type { SectionFeatureSplitV3Block } from './types'
import type { SectionFeatureSplitV3Model } from './useSectionFeatureSplitV3Model'
import { makeTextData } from './utils'

interface SectionFeatureSplitV3ModalsProps {
  blockData?: SectionFeatureSplitV3Block
  editMode: boolean
  model: SectionFeatureSplitV3Model
  onCloseCTAModal: () => void
  showCTAModal: boolean
}

const SectionFeatureSplitV3Modals = ({
  blockData,
  editMode,
  model,
  onCloseCTAModal,
  showCTAModal,
}: SectionFeatureSplitV3ModalsProps) => (
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
)

export default SectionFeatureSplitV3Modals
