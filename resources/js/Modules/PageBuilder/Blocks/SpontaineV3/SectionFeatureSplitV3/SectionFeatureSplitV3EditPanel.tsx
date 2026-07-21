import type { Language } from '@/components/ui/ui_interfaces'
import type { Dispatch } from 'react'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../../Components/EditLabel'
import V3ColorControls from '../../../Components/V3ColorControls'
import V3RoundedTopToggle from '../../../Components/V3RoundedTopToggle'
import type { PageBuilderAction } from '../../../hooks/pageBuilderService'
import type { SectionFeatureSplitV3Block } from './types'
import type { SectionFeatureSplitV3Model } from './useSectionFeatureSplitV3Model'

interface SectionFeatureSplitV3EditPanelProps {
  blockData?: SectionFeatureSplitV3Block
  dispatch?: Dispatch<PageBuilderAction>
  language: Language
  model: SectionFeatureSplitV3Model
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const SectionFeatureSplitV3EditPanel = ({
  blockData,
  dispatch,
  language,
  model,
  onFieldEdit,
}: SectionFeatureSplitV3EditPanelProps) => (
  <div className='lg:col-span-2'>
    <div className='rounded-lg bg-spontaine-surface-paper p-4 shadow-surface'>
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
        {dispatch != null && (
          <div className='flex flex-wrap items-center gap-2'>
            <p className='m-0 text-sm font-medium text-spontaine-text-primary'>Media Position:</p>
            <EditLabel
              label={model.isMediaLeft ? 'Move Image Right' : 'Move Image Left'}
              onClick={model.toggleMediaSide}
            />
          </div>
        )}
        <V3ColorControls
          backgroundColor={blockData?.backgroundColor}
          descriptionColor={blockData?.descriptionColor}
          eyebrowColor={blockData?.eyebrowColor}
          onFieldEdit={onFieldEdit}
          textColor={blockData?.textColor}
          titleOneColor={blockData?.titleOneColor}
          titleTwoColor={blockData?.titleTwoColor}
        />
      </div>
    </div>
  </div>
)

export default SectionFeatureSplitV3EditPanel
