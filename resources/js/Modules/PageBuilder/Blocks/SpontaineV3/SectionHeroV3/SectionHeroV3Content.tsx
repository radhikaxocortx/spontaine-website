import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import type { Language } from '@/components/ui/ui_interfaces'
import { ArrowUpRight } from 'lucide-react'
import type { Dispatch } from 'react'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../../Components/EditLabel'
import Localization from '../../../Components/Localization'
import type { PageBuilderAction } from '../../../hooks/pageBuilderService'
import { emptyTextData, requiredTitleFallback, type SectionHeroV3Block } from './types'
import type { SectionHeroV3Model } from './useSectionHeroV3Model'

interface SectionHeroV3ContentProps {
  blockData?: SectionHeroV3Block
  dispatch?: Dispatch<PageBuilderAction>
  editMode: boolean
  language: Language
  model: SectionHeroV3Model
  onFieldEdit?: (field: BlocKFieldInfo) => void
  onOpenCTAModal: () => void
}

const SectionHeroV3Content = ({
  blockData,
  dispatch,
  editMode,
  language,
  model,
  onFieldEdit,
  onOpenCTAModal,
}: SectionHeroV3ContentProps) => {
  if (!model.hasContent && !editMode) {
    return null
  }

  return (
    <div
      className='relative z-10 mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'
      style={model.contentStyle}
    >
      <div className='w-full max-w-[760px]'>
        {(model.hasEyebrow || editMode) && (
          <div
            data-v3-hero-reveal
            className={model.hasEyebrow ? 'mb-6' : 'mb-3'}
          >
            {model.hasEyebrow && (
              <p
                className={`m-0 font-mono text-[9px] font-semibold uppercase tracking-[0.075em] ${model.eyebrowColor ? 'text-[inherit]' : 'text-spontaine-gray-cool'}`}
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

        {(model.hasTitleOne || model.hasTitleTwo || editMode) && (
          <h1
            data-v3-hero-reveal
            className='m-0 font-display text-4xl font-bold leading-[0.91] tracking-[-0.068em] md:text-5xl lg:text-6xl'
          >
            {model.hasTitleOne && (
              <strong
                className={`block font-bold leading-[inherit] tracking-[inherit] ${model.titleOneColor ? 'text-[inherit]' : 'text-spontaine-text-primary'}`}
                style={{ color: model.titleOneColor }}
              >
                <Localization
                  text={model.titleOne ?? emptyTextData}
                  language={language}
                />
              </strong>
            )}
            {model.hasTitleTwo && (
              <strong
                className={`block font-bold leading-[inherit] tracking-[inherit] ${model.titleTwoColor ? 'text-[inherit]' : 'text-spontaine-text-accent-dark'}`}
                style={{ color: model.titleTwoColor }}
              >
                <Localization
                  text={model.titleTwo ?? emptyTextData}
                  language={language}
                />
              </strong>
            )}
          </h1>
        )}

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
            data-v3-hero-reveal
            className={model.hasDescription ? 'mt-7' : 'mt-3'}
          >
            {model.hasDescription && (
              <p
                className={`m-0 max-w-[570px] font-body text-base leading-[1.52] ${model.descriptionColor ? 'text-[inherit]' : 'text-spontaine-text-secondary'}`}
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
            data-v3-hero-reveal
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
                  <ArrowUpRight className='h-4 w-4' />
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
    </div>
  )
}

export default SectionHeroV3Content
