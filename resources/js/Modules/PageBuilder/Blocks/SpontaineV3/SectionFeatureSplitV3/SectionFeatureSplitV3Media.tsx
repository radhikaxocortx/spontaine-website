import type { Language } from '@/components/ui/ui_interfaces'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../../Components/EditLabel'
import type { SectionFeatureSplitV3Block } from './types'
import type { SectionFeatureSplitV3Model } from './useSectionFeatureSplitV3Model'
import { readTextValue } from './utils'

interface SectionFeatureSplitV3MediaProps {
  blockData?: SectionFeatureSplitV3Block
  editMode: boolean
  language: Language
  model: SectionFeatureSplitV3Model
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const SectionFeatureSplitV3Media = ({
  blockData,
  editMode,
  language,
  model,
  onFieldEdit,
}: SectionFeatureSplitV3MediaProps) => (
  <div
    data-v3-feature-split-reveal
    className='w-full'
  >
    {model.hasImage ? (
      <img
        src={blockData?.image?.url}
        alt={readTextValue(blockData?.imageAlt, language)}
        className='h-auto w-full rounded-3xl object-cover shadow-card-lift'
      />
    ) : (
      <div className='flex min-h-[260px] w-full items-center justify-center rounded-3xl bg-spontaine-surface-paper shadow-card-lift'>
        <p className='m-0 font-body text-sm text-spontaine-text-secondary'>
          Add an image to complete this split section.
        </p>
      </div>
    )}
    {editMode && onFieldEdit != null && (
      <div className='mt-3 flex flex-wrap gap-2'>
        <EditLabel
          label='Edit Image'
          onClick={() =>
            onFieldEdit({
              action: 'INSERT',
              field: 'image',
              fieldType: 'image',
              oldValue: blockData?.image,
            })
          }
        />
        <EditLabel
          label='Edit Image Alt'
          onClick={() => model.editTextField('imageAlt')}
        />
      </div>
    )}
  </div>
)

export default SectionFeatureSplitV3Media
