import type { Language } from '@/components/ui/ui_interfaces'
import type { Dispatch } from 'react'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../../Components/EditLabel'
import V3ColorControls from '../../../Components/V3ColorControls'
import V3RoundedTopToggle from '../../../Components/V3RoundedTopToggle'
import type { PageBuilderAction } from '../../../hooks/pageBuilderService'
import type { SectionHeroV3Block } from './types'

interface SectionHeroV3EditPanelProps {
  blockData?: SectionHeroV3Block
  dispatch?: Dispatch<PageBuilderAction>
  language: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
  onOpenOverlayModal: () => void
}

const SectionHeroV3EditPanel = ({
  blockData,
  dispatch,
  language,
  onFieldEdit,
  onOpenOverlayModal,
}: SectionHeroV3EditPanelProps) => (
  <div className='relative z-20 mx-auto mt-8 w-full max-w-[760px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
    <div className='rounded-lg bg-spontaine-surface-paper p-4 shadow-surface'>
      <div className='flex flex-wrap gap-4'>
        {onFieldEdit != null && (
          <div className='flex flex-wrap items-center gap-2'>
            <p className='m-0 text-sm font-medium text-spontaine-text-primary'>Media:</p>
            <EditLabel
              label='Edit Background Image'
              onClick={() =>
                onFieldEdit({
                  action: 'INSERT',
                  field: 'backgroundImage',
                  fieldType: 'image',
                  oldValue: blockData?.backgroundImage,
                })
              }
            />
            {dispatch != null && (
              <EditLabel
                label='Edit Overlay'
                onClick={onOpenOverlayModal}
              />
            )}
          </div>
        )}
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
          eyebrowColor={blockData?.eyebrowColor}
          onFieldEdit={onFieldEdit}
          textColor={blockData?.textColor}
          titleOneColor={blockData?.titleOneColor}
          titleTwoColor={blockData?.titleTwoColor}
        />
      </div>
      <p className='m-0 mt-3 max-w-[760px] font-body text-xs leading-relaxed text-spontaine-text-secondary'>
        Overlay opacity controls how strongly the image is dimmed so text remains readable. Use 0
        for no overlay, 35-55 for most image backgrounds, and 70+ for very busy images.
      </p>
    </div>
  </div>
)

export default SectionHeroV3EditPanel
