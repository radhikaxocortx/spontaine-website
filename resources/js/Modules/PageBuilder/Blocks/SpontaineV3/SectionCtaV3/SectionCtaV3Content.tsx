import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import type { Language } from '@/components/ui/ui_interfaces'
import { ArrowUpRight } from 'lucide-react'
import type { Dispatch } from 'react'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../../Components/EditLabel'
import Localization from '../../../Components/Localization'
import type { PageBuilderAction } from '../../../hooks/pageBuilderService'
import { emptyTextData, requiredTitleFallback, type SectionCtaV3Block } from './types'
import type { SectionCtaV3Model } from './useSectionCtaV3Model'

interface SectionCtaV3ContentProps {
  blockData?: SectionCtaV3Block
  dispatch?: Dispatch<PageBuilderAction>
  editMode: boolean
  language: Language
  model: SectionCtaV3Model
  onFieldEdit?: (field: BlocKFieldInfo) => void
  onOpenPrimaryCTAModal: () => void
  onOpenSecondaryCTAModal: () => void
}

const SectionCtaV3Content = ({
  blockData,
  dispatch,
  editMode,
  language,
  model,
  onFieldEdit,
  onOpenPrimaryCTAModal,
  onOpenSecondaryCTAModal,
}: SectionCtaV3ContentProps) => (
  <div className='relative z-10 mx-auto w-full max-w-[880px]'>
    <h2
      data-v3-cta-reveal
      className={`m-0 font-display text-3xl font-bold leading-[0.95] tracking-[-0.06em] md:text-4xl lg:text-5xl ${model.titleOneColor ? 'text-[inherit]' : 'text-spontaine-text-primary'}`}
      style={{ color: model.titleOneColor }}
    >
      <Localization
        text={model.titleOne}
        language={language}
      />
    </h2>

    {editMode && onFieldEdit != null && (
      <div className='mt-3 flex justify-center'>
        <EditLabel
          label='Edit Title'
          onClick={() => model.editTextField('titleOne', requiredTitleFallback)}
        />
      </div>
    )}

    {(model.hasDescription || editMode) && (
      <div
        data-v3-cta-reveal
        className={model.hasDescription ? 'mt-6' : 'mt-3'}
      >
        {model.hasDescription && (
          <p
            className={`m-0 mx-auto max-w-[650px] font-body text-base leading-[1.52] ${model.descriptionColor ? 'text-[inherit]' : 'text-spontaine-text-secondary'}`}
            style={{ color: model.descriptionColor }}
          >
            <Localization
              text={blockData?.description ?? emptyTextData}
              language={language}
            />
          </p>
        )}
        {editMode && onFieldEdit != null && (
          <div className='mt-2 flex justify-center'>
            <EditLabel
              label='Edit Description'
              onClick={() => model.editTextField('description')}
            />
          </div>
        )}
      </div>
    )}

    {(model.hasCTAGroup || editMode) && (
      <div
        data-v3-cta-reveal
        className={model.hasCTAGroup ? 'mt-6' : 'mt-3'}
      >
        {model.hasCTAGroup && (
          <div className='flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap'>
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
                        blockData?.primaryCta?.name ?? {
                          english: 'Book Demo',
                          malayalam: null,
                        }
                      }
                      language={language}
                    />
                    <ArrowUpRight className='h-4 w-4' />
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
                  <ArrowUpRight className='h-4 w-4' />
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
                </Button>
              )
            )}
          </div>
        )}
        {editMode && dispatch != null && (
          <div className='mt-2 flex flex-wrap justify-center gap-2'>
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
        data-v3-cta-reveal
        className={model.hasMicrocopy ? 'mt-5' : 'mt-3'}
      >
        {model.hasMicrocopy && (
          <p
            className={`m-0 font-mono text-[11.5px] leading-relaxed ${model.microcopyColor ? 'text-[inherit]' : 'text-spontaine-gray-deep'}`}
            style={{ color: model.microcopyColor }}
          >
            <Localization
              text={blockData?.microcopy ?? emptyTextData}
              language={language}
            />
          </p>
        )}
        {editMode && onFieldEdit != null && (
          <div className='mt-2 flex justify-center'>
            <EditLabel
              label='Edit Microcopy'
              onClick={() => model.editTextField('microcopy')}
            />
          </div>
        )}
      </div>
    )}
  </div>
)

export default SectionCtaV3Content
