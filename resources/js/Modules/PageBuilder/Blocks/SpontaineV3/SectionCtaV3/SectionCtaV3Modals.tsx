import { CTAEditModal } from '../../../Components/CTAEditModal'
import type { SectionCtaV3Block } from './types'
import type { SectionCtaV3Model } from './useSectionCtaV3Model'
import { makeTextData } from './utils'

interface SectionCtaV3ModalsProps {
  blockData?: SectionCtaV3Block
  editMode: boolean
  model: SectionCtaV3Model
  onClosePrimaryCTAModal: () => void
  onCloseSecondaryCTAModal: () => void
  showPrimaryCTAModal: boolean
  showSecondaryCTAModal: boolean
}

const SectionCtaV3Modals = ({
  blockData,
  editMode,
  model,
  onClosePrimaryCTAModal,
  onCloseSecondaryCTAModal,
  showPrimaryCTAModal,
  showSecondaryCTAModal,
}: SectionCtaV3ModalsProps) => (
  <>
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

export default SectionCtaV3Modals
