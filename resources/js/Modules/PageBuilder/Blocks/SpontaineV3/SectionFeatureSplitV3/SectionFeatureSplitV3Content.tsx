import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import type { Language } from '@/components/ui/ui_interfaces'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Dispatch } from 'react'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../../Components/EditLabel'
import Localization from '../../../Components/Localization'
import type { PageBuilderAction } from '../../../hooks/pageBuilderService'
import { emptyTextData, requiredTitleFallback, type SectionFeatureSplitV3Block } from './types'
import type { SectionFeatureSplitV3Model } from './useSectionFeatureSplitV3Model'

interface SectionFeatureSplitV3ContentProps {
  blockData?: SectionFeatureSplitV3Block
  dispatch?: Dispatch<PageBuilderAction>
  editMode: boolean
  language: Language
  model: SectionFeatureSplitV3Model
  onFieldEdit?: (field: BlocKFieldInfo) => void
  onOpenCTAModal: () => void
}

const SectionFeatureSplitV3Content = ({
  blockData,
  dispatch,
  editMode,
  language,
  model,
  onFieldEdit,
  onOpenCTAModal,
}: SectionFeatureSplitV3ContentProps) => (
  <div
    className={model.hasEyebrow ? 'flex flex-col items-start' : 'flex flex-col items-start'}
    style={model.textColumnStyle}
  >
    {(model.hasEyebrow || editMode) && (
      <div
        data-v3-feature-split-reveal
        className={model.hasEyebrow ? 'mb-5' : 'mb-3'}
      >
        {model.hasEyebrow && (
          <p
            className={`m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] ${model.eyebrowColor ? 'text-[inherit]' : 'text-spontaine-gray-cool'}`}
            style={{ color: model.eyebrowColor }}
          >
            <Localization
              text={blockData?.eyebrow ?? emptyTextData}
              language={language}
            />
          </p>
        )}
        {editMode && onFieldEdit != null && (
          <EditLabel
            label='Edit Eyebrow'
            onClick={() => model.editTextField('eyebrow')}
          />
        )}
      </div>
    )}

    <h2
      data-v3-feature-split-reveal
      className='m-0 font-display text-4xl font-bold leading-[0.95] tracking-[-0.06em] md:text-5xl'
    >
      <strong
        className={`block font-bold leading-[inherit] tracking-[inherit] ${model.titleOneColor ? 'text-[inherit]' : 'text-spontaine-text-primary'}`}
        style={{ color: model.titleOneColor }}
      >
        <Localization
          text={model.titleOne}
          language={language}
        />
      </strong>
      {model.hasTitleTwo && (
        <strong
          className={`block font-bold leading-[inherit] tracking-[inherit] ${model.titleTwoColor ? 'text-[inherit]' : 'text-spontaine-text-accent-dark'}`}
          style={{ color: model.titleTwoColor }}
        >
          <Localization
            text={blockData?.titleTwo ?? emptyTextData}
            language={language}
          />
        </strong>
      )}
    </h2>

    {editMode && onFieldEdit != null && (
      <div className='mt-3 flex flex-wrap gap-2'>
        <EditLabel
          label='Edit Title Line 1'
          onClick={() => model.editTextField('titleOne', requiredTitleFallback)}
        />
        <EditLabel
          label='Edit Title Line 2'
          onClick={() => model.editTextField('titleTwo')}
        />
      </div>
    )}

    {(model.hasDescription || editMode) && (
      <div
        data-v3-feature-split-reveal
        className={model.hasDescription ? 'mt-6' : 'mt-3'}
      >
        {model.hasDescription && (
          <p
            className={`m-0 max-w-[480px] font-body text-base leading-[1.52] ${model.descriptionColor ? 'text-[inherit]' : 'text-spontaine-text-secondary'}`}
            style={{ color: model.descriptionColor }}
          >
            <Localization
              text={blockData?.description ?? emptyTextData}
              language={language}
            />
          </p>
        )}
        {editMode && onFieldEdit != null && (
          <EditLabel
            label='Edit Description'
            onClick={() => model.editTextField('description')}
          />
        )}
      </div>
    )}

    {(model.hasCTA || editMode) && (
      <div
        data-v3-feature-split-reveal
        className={model.hasCTA ? 'mt-7' : 'mt-3'}
      >
        {model.calendarUrl ? (
          <CalendarBooking calLink={model.calendarUrl}>
            {({ openCalendar }) => (
              <Button
                type='button'
                variant='v3Primary'
                size='v3Hero'
                onClick={openCalendar}
              >
                <Localization
                  text={blockData?.cta?.name ?? { english: 'Book Demo', malayalam: null }}
                  language={language}
                />
                <ArrowUpRight className='h-4 w-4' />
              </Button>
            )}
          </CalendarBooking>
        ) : (
          blockData?.cta?.link && (
            <Button
              type='button'
              variant='v3Primary'
              size='v3Hero'
              onClick={model.openCTA}
            >
              <Localization
                text={blockData.cta.name}
                language={language}
              />
              <ArrowRight className='h-4 w-4' />
            </Button>
          )
        )}
        {editMode && dispatch != null && (
          <div className='mt-2'>
            <EditLabel
              label='Edit CTA'
              onClick={onOpenCTAModal}
            />
          </div>
        )}
      </div>
    )}
  </div>
)

export default SectionFeatureSplitV3Content
