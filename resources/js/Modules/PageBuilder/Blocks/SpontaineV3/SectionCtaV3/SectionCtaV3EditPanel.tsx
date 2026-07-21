import type { Language } from '@/components/ui/ui_interfaces'
import type { Dispatch } from 'react'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../../Components/EditLabel'
import V3ColorControls from '../../../Components/V3ColorControls'
import V3RoundedTopToggle from '../../../Components/V3RoundedTopToggle'
import type { PageBuilderAction } from '../../../hooks/pageBuilderService'
import type { SectionCtaV3Block } from './types'
import type { SectionCtaV3Model } from './useSectionCtaV3Model'

interface SectionCtaV3EditPanelProps {
  blockData?: SectionCtaV3Block
  dispatch?: Dispatch<PageBuilderAction>
  language: Language
  model: SectionCtaV3Model
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const SectionCtaV3EditPanel = ({
  blockData,
  dispatch,
  language,
  model,
  onFieldEdit,
}: SectionCtaV3EditPanelProps) => (
  <div className='mx-auto mt-8 max-w-[760px] rounded-lg bg-spontaine-surface-paper p-4 text-left shadow-surface'>
    <div className='flex flex-wrap gap-4'>
      {dispatch != null && blockData?.id != null && (
        <div className='flex flex-wrap items-center gap-2'>
          <p className='m-0 text-sm font-medium text-spontaine-text-primary'>Section Shape:</p>
          <V3RoundedTopToggle
            blockId={blockData.id}
            dispatch={dispatch}
            language={language}
            overlapTop={blockData.overlapTop}
            roundedTop={blockData.roundedTop}
          />
        </div>
      )}
      <V3ColorControls
        backgroundColor={blockData?.backgroundColor}
        descriptionColor={blockData?.descriptionColor}
        onFieldEdit={onFieldEdit}
        showEyebrowColor={false}
        showTitleTwoColor={false}
        textColor={blockData?.textColor}
        titleOneColor={blockData?.titleOneColor}
      />
      {onFieldEdit != null && (
        <div className='flex flex-wrap items-center gap-2'>
          <p className='m-0 text-sm font-medium text-spontaine-text-primary'>Microcopy Color:</p>
          <EditLabel
            label='Edit Microcopy Color'
            onClick={() => model.editTextField('microcopyColor')}
          />
        </div>
      )}
    </div>
  </div>
)

export default SectionCtaV3EditPanel
