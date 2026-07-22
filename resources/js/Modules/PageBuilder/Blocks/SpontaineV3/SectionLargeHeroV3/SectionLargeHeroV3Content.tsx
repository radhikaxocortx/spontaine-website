import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import type { Language } from '@/components/ui/ui_interfaces'
import { ArrowUpRight } from 'lucide-react'
import type { Dispatch } from 'react'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../../Components/EditLabel'
import Localization from '../../../Components/Localization'
import type { PageBuilderAction } from '../../../hooks/pageBuilderService'
import {
  defaultDescription,
  defaultEyebrow,
  defaultMicrocopy,
  defaultTitleOne,
  defaultTitleTwo,
  emptyTextData,
  type SectionLargeHeroV3Block,
} from './types'
import type { SectionLargeHeroV3Model } from './useSectionLargeHeroV3Model'

interface SectionLargeHeroV3ContentProps {
  blockData?: SectionLargeHeroV3Block
  dispatch?: Dispatch<PageBuilderAction>
  editMode: boolean
  language: Language
  model: SectionLargeHeroV3Model
  onFieldEdit?: (field: BlocKFieldInfo) => void
  onOpenPrimaryCTAModal: () => void
  onOpenSecondaryCTAModal: () => void
}

const SectionLargeHeroV3Content = ({
  blockData,
  dispatch,
  editMode,
  language,
  model,
  onFieldEdit,
  onOpenPrimaryCTAModal,
  onOpenSecondaryCTAModal,
}: SectionLargeHeroV3ContentProps) => {
  if (!model.hasContent && !editMode) {
    return null
  }

  return (
    <div
      className='relative z-10 max-w-[760px] pb-8 pt-12 md:pb-20 md:pt-16 lg:pb-0'
      style={model.contentStyle}
    >
      {(model.hasEyebrow || editMode) && (
        <div
          data-v3-large-hero-reveal
          className={model.hasEyebrow ? 'mb-6' : 'mb-3'}
        >
          {model.hasEyebrow && (
            <p
              className={`eyebrow max-w-[560px] ${model.eyebrowColor ? 'text-[inherit]' : 'text-spontaine-gray-cool'}`}
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
              onClick={() => model.editTextField('eyebrow', defaultEyebrow)}
            />
          )}
        </div>
      )}

      {(model.hasTitleOne || model.hasTitleTwo || editMode) && (
        <h1
          data-v3-large-hero-reveal
          className='display-hero'
        >
          {model.hasTitleOne && (
            <strong
              className={`block font-bold leading-[inherit] tracking-[inherit] ${model.titleOneColor ? 'text-[inherit]' : 'text-spontaine-dark'}`}
              style={{ color: model.titleOneColor }}
            >
              <Localization
                text={blockData?.titleOne ?? emptyTextData}
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
                text={blockData?.titleTwo ?? emptyTextData}
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
            onClick={() => model.editTextField('titleOne', defaultTitleOne)}
          />
          <EditLabel
            label='Edit Title Line 2'
            onClick={() => model.editTextField('titleTwo', defaultTitleTwo)}
          />
        </div>
      )}

      {(model.hasDescription || editMode) && (
        <div
          data-v3-large-hero-reveal
          className={model.hasDescription ? 'mt-7' : 'mt-3'}
        >
          {model.hasDescription && (
            <p
              className={`body-lg max-w-[570px] ${model.descriptionColor ? 'text-[inherit]' : 'text-spontaine-gray-muted'}`}
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
              onClick={() => model.editTextField('description', defaultDescription)}
            />
          )}
        </div>
      )}

      {(model.hasCTAGroup || editMode) && (
        <div
          data-v3-large-hero-reveal
          className={model.hasCTAGroup ? 'mt-7' : 'mt-3'}
        >
          {model.hasCTAGroup && (
            <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
              {model.primaryCalendarUrl ? (
                <CalendarBooking calLink={model.primaryCalendarUrl}>
                  {({ openCalendar }) => (
                    <Button
                      type='button'
                      variant='v3Primary'
                      size='v3Hero'
                      onClick={openCalendar}
                    >
                      <Localization
                        text={
                          blockData?.primaryCta?.name ?? { english: 'Book Demo', malayalam: null }
                        }
                        language={language}
                      />
                      <ArrowUpRight
                        aria-hidden='true'
                        className='h-4 w-4'
                        strokeWidth={2}
                      />
                    </Button>
                  )}
                </CalendarBooking>
              ) : (
                blockData?.primaryCta?.link && (
                  <Button
                    type='button'
                    variant='v3Primary'
                    size='v3Hero'
                    onClick={model.openPrimaryCTA}
                  >
                    <Localization
                      text={blockData.primaryCta.name}
                      language={language}
                    />
                    <ArrowUpRight
                      aria-hidden='true'
                      className='h-4 w-4'
                      strokeWidth={2}
                    />
                  </Button>
                )
              )}

              {model.secondaryCalendarUrl ? (
                <CalendarBooking calLink={model.secondaryCalendarUrl}>
                  {({ openCalendar }) => (
                    <Button
                      type='button'
                      variant='v3Secondary'
                      size='v3Hero'
                      onClick={openCalendar}
                    >
                      <Localization
                        text={
                          blockData?.secondaryCta?.name ?? {
                            english: 'Book Demo',
                            malayalam: null,
                          }
                        }
                        language={language}
                      />
                      <ArrowUpRight
                        aria-hidden='true'
                        className='h-4 w-4'
                        strokeWidth={2}
                      />
                    </Button>
                  )}
                </CalendarBooking>
              ) : (
                blockData?.secondaryCta?.link && (
                  <Button
                    type='button'
                    variant='v3Secondary'
                    size='v3Hero'
                    onClick={model.openSecondaryCTA}
                  >
                    <Localization
                      text={blockData.secondaryCta.name}
                      language={language}
                    />
                    <ArrowUpRight
                      aria-hidden='true'
                      className='h-4 w-4'
                      strokeWidth={2}
                    />
                  </Button>
                )
              )}
            </div>
          )}
          {editMode && dispatch != null && (
            <div className='mt-2 flex flex-wrap gap-2'>
              <EditLabel
                label='Edit Primary CTA'
                onClick={onOpenPrimaryCTAModal}
              />
              <EditLabel
                label='Edit Secondary CTA'
                onClick={onOpenSecondaryCTAModal}
              />
            </div>
          )}
        </div>
      )}

      {(model.hasMicrocopy || editMode) && (
        <div
          data-v3-large-hero-reveal
          className={model.hasMicrocopy ? 'mt-5' : 'mt-3'}
        >
          {model.hasMicrocopy && (
            <p
              className={`m-0 font-mono text-xs ${model.microcopyColor ? 'text-[inherit]' : 'text-spontaine-gray-deep'}`}
              style={{ color: model.microcopyColor }}
            >
              <Localization
                text={blockData?.microcopy ?? emptyTextData}
                language={language}
              />
            </p>
          )}
          {editMode && onFieldEdit != null && (
            <EditLabel
              label='Edit Microcopy'
              onClick={() => model.editTextField('microcopy', defaultMicrocopy)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default SectionLargeHeroV3Content
