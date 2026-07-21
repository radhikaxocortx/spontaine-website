import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { Language } from '@/components/ui/ui_interfaces'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import type { BlocKFieldInfo, BlockFieldValues } from '../../Components/BlockEditor/BlockEditor'
import { CTAEditModal } from '../../Components/CTAEditModal'
import EditLabel from '../../Components/EditLabel'
import Localization, { displayText } from '../../Components/Localization'
import V3ColorControls, { getV3ColorValue } from '../../Components/V3ColorControls'
import V3RoundedSectionBlockFrame from '../../Components/V3RoundedSectionBlockFrame'
import V3RoundedTopToggle, {
  isV3RoundedTopEnabled,
  isV3TopOverlapEnabled,
} from '../../Components/V3RoundedTopToggle'
import type { PageBuilderAction } from '../../hooks/pageBuilderService'
import type { Block, BlockConfiguration, LinkData, TextData } from '../../page_interfaces'

export const SPONTAINE_V3_CTA_BLOCK_NAME = 'Spontaine V3 - CTA'

gsap.registerPlugin(ScrollTrigger)

const emptyTextData: TextData = {
  english: '',
  malayalam: '',
}

const requiredTitleFallback: TextData = {
  english: 'Bring the question your firm cannot answer with confidence.',
  malayalam: 'Bring the question your firm cannot answer with confidence.',
}

const defaultDescription: TextData = {
  english:
    'Thirty minutes. No discovery-call script. Bring the decision, the spreadsheet, or the system that sits behind it.',
  malayalam:
    'Thirty minutes. No discovery-call script. Bring the decision, the spreadsheet, or the system that sits behind it.',
}

const defaultMicrocopy: TextData = {
  english: 'Start with the decision. Build from there.',
  malayalam: 'Start with the decision. Build from there.',
}

const defaultPrimaryCta: LinkData = {
  name: {
    english: 'Book a working session',
    malayalam: 'Book a working session',
  },
  link: '#contact',
  external: false,
}

const defaultSecondaryCta: LinkData = {
  name: {
    english: 'Watch the 90-second overview',
    malayalam: 'Watch the 90-second overview',
  },
  link: '#overview',
  external: false,
}

export interface SectionCtaV3Block extends Block, BlockConfiguration {
  backgroundColor?: TextData
  description?: TextData | null
  descriptionColor?: TextData
  microcopy?: TextData | null
  microcopyColor?: TextData
  overlapTop?: TextData
  primaryCalendarUrl?: TextData | null
  primaryCta?: LinkData | null
  roundedTop?: TextData
  secondaryCalendarUrl?: TextData | null
  secondaryCta?: LinkData | null
  textColor?: TextData
  titleOne: TextData
  titleOneColor?: TextData
}

export const sectionCtaV3Block: Omit<SectionCtaV3Block, keyof Block> = {
  titleOne: requiredTitleFallback,
  description: defaultDescription,
  microcopy: defaultMicrocopy,
  primaryCta: defaultPrimaryCta,
  primaryCalendarUrl: null,
  secondaryCta: defaultSecondaryCta,
  secondaryCalendarUrl: null,
}

interface Properties {
  blockData?: SectionCtaV3Block
  dispatch?: React.Dispatch<PageBuilderAction>
  editMode?: boolean
  language?: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const hasTextValue = (value?: TextData | null, language: Language = 'en') =>
  displayText(value, language).trim() !== ''

const makeTextData = (value: string | null): TextData => ({
  english: value,
  malayalam: '',
})

const getBlockFieldValue = <T,>(
  blockData: SectionCtaV3Block | undefined,
  field: keyof SectionCtaV3Block
) => blockData?.[field as keyof SectionCtaV3Block] as T | undefined

const openLink = (linkData?: LinkData | null) => {
  if (linkData?.link == null || linkData.link.trim() === '') {
    return
  }

  if (linkData.external) {
    window.open(linkData.link, '_blank', 'noopener,noreferrer')
    return
  }

  window.location.href = linkData.link
}

const SectionCtaV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const sectionRef = React.useRef<HTMLElement>(null)
  const [showPrimaryCTAModal, setShowPrimaryCTAModal] = React.useState(false)
  const [showSecondaryCTAModal, setShowSecondaryCTAModal] = React.useState(false)

  const titleOne = blockData?.titleOne ?? requiredTitleFallback
  const hasDescription = hasTextValue(blockData?.description, language)
  const hasMicrocopy = hasTextValue(blockData?.microcopy, language)
  const primaryCalendarUrl = getV3ColorValue(blockData?.primaryCalendarUrl ?? undefined, language)
  const secondaryCalendarUrl = getV3ColorValue(blockData?.secondaryCalendarUrl ?? undefined, language)
  const hasPrimaryCTA = Boolean(primaryCalendarUrl || blockData?.primaryCta?.link)
  const hasSecondaryCTA = Boolean(secondaryCalendarUrl || blockData?.secondaryCta?.link)
  const hasCTAGroup = hasPrimaryCTA || hasSecondaryCTA
  const hasRoundedTop = isV3RoundedTopEnabled(blockData?.roundedTop, language)
  const hasTopOverlap = isV3TopOverlapEnabled(blockData?.overlapTop, language)

  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const textColor = getV3ColorValue(blockData?.textColor, language)
  const titleOneColor = getV3ColorValue(blockData?.titleOneColor, language) ?? textColor
  const descriptionColor = getV3ColorValue(blockData?.descriptionColor, language) ?? textColor
  const microcopyColor = getV3ColorValue(blockData?.microcopyColor, language) ?? textColor

  const sectionStyle = {
    background: backgroundColor,
  } as React.CSSProperties

  const updateBlockFields = (fields: Record<string, BlockFieldValues>) => {
    if (dispatch == null || blockData?.id == null) {
      return
    }

    dispatch({
      action: 'UPDATE_BLOCK_FIELDS',
      blockId: blockData.id,
      blockData: fields,
    })
  }

  const editTextField = (field: keyof SectionCtaV3Block, fallback: TextData = emptyTextData) => {
    if (onFieldEdit == null) {
      return
    }

    onFieldEdit({
      action: 'UPDATE',
      field: field.toString(),
      fieldType: 'text',
      oldValue: getBlockFieldValue<TextData>(blockData, field) ?? fallback,
    })
  }

  React.useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const revealTargets = gsap.utils.toArray<HTMLElement>('[data-v3-cta-reveal]')

      if (editMode || prefersReducedMotion) {
        gsap.set(revealTargets, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set(revealTargets, { autoAlpha: 0, y: 16 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        })
        .to(revealTargets, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        })
    }, section)

    return () => context.revert()
  }, [editMode])

  return (
    <V3RoundedSectionBlockFrame
      ref={sectionRef}
      roundedTop={hasRoundedTop}
      overlapTop={hasTopOverlap}
      className={cn(
        'relative isolate w-full overflow-hidden px-6 py-16 text-center md:px-10 md:py-20 lg:py-24',
        !backgroundColor && 'bg-pagebuilder-cta-wash',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={sectionStyle}
    >
      <div className='relative z-10 mx-auto w-full max-w-[880px]'>
        <h2
          data-v3-cta-reveal
          className={`m-0 font-display text-3xl font-bold leading-[0.95] tracking-[-0.06em] md:text-4xl lg:text-5xl ${titleOneColor ? 'text-[inherit]' : 'text-spontaine-text-primary'}`}
          style={{ color: titleOneColor }}
        >
          <Localization
            text={titleOne}
            language={language}
          />
        </h2>

        {editMode && onFieldEdit != null && (
          <div className='mt-3 flex justify-center'>
            <EditLabel
              label='Edit Title'
              onClick={() => editTextField('titleOne', requiredTitleFallback)}
            />
          </div>
        )}

        {(hasDescription || editMode) && (
          <div
            data-v3-cta-reveal
            className={hasDescription ? 'mt-6' : 'mt-3'}
          >
            {hasDescription && (
              <p
                className={`m-0 mx-auto max-w-[650px] font-body text-base leading-[1.52] ${descriptionColor ? 'text-[inherit]' : 'text-spontaine-text-secondary'}`}
                style={{ color: descriptionColor }}
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
                  onClick={() => editTextField('description')}
                />
              </div>
            )}
          </div>
        )}

        {(hasCTAGroup || editMode) && (
          <div
            data-v3-cta-reveal
            className={hasCTAGroup ? 'mt-6' : 'mt-3'}
          >
            {hasCTAGroup && (
              <div className='flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap'>
                {primaryCalendarUrl ? (
                  <CalendarBooking calLink={primaryCalendarUrl}>
                    {({ openCalendar }) => (
                      <Button
                        type='button'
                        variant='v3Primary'
                        size='v3Hero'
                        onClick={openCalendar}
                      >
                        <Localization
                          text={blockData?.primaryCta?.name ?? { english: 'Book Demo', malayalam: null }}
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
                      onClick={() => openLink(blockData.primaryCta)}
                    >
                      <Localization
                        text={blockData.primaryCta.name}
                        language={language}
                      />
                      <ArrowUpRight className='h-4 w-4' />
                    </Button>
                  )
                )}
                {secondaryCalendarUrl ? (
                  <CalendarBooking calLink={secondaryCalendarUrl}>
                    {({ openCalendar }) => (
                      <Button
                        type='button'
                        variant='v3Secondary'
                        size='v3Hero'
                        onClick={openCalendar}
                      >
                        <Localization
                          text={blockData?.secondaryCta?.name ?? { english: 'Book Demo', malayalam: null }}
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
                      onClick={() => openLink(blockData.secondaryCta)}
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
                  onClick={() => setShowPrimaryCTAModal(true)}
                />
                <EditLabel
                  label='Edit Secondary CTA'
                  onClick={() => setShowSecondaryCTAModal(true)}
                />
              </div>
            )}
          </div>
        )}

        {(hasMicrocopy || editMode) && (
          <div
            data-v3-cta-reveal
            className={hasMicrocopy ? 'mt-5' : 'mt-3'}
          >
            {hasMicrocopy && (
              <p
                className={`m-0 font-mono text-[11.5px] leading-relaxed ${microcopyColor ? 'text-[inherit]' : 'text-spontaine-gray-deep'}`}
                style={{ color: microcopyColor }}
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
                  onClick={() => editTextField('microcopy')}
                />
              </div>
            )}
          </div>
        )}

        {editMode && (
          <div className='mx-auto mt-8 max-w-[760px] rounded-lg bg-spontaine-surface-paper p-4 text-left shadow-surface'>
            <div className='flex flex-wrap gap-4'>
              {dispatch != null && blockData?.id != null && (
                <div className='flex flex-wrap items-center gap-2'>
                  <p className='m-0 text-sm font-medium text-spontaine-text-primary'>
                    Section Shape:
                  </p>
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
                  <p className='m-0 text-sm font-medium text-spontaine-text-primary'>
                    Microcopy Color:
                  </p>
                  <EditLabel
                    label='Edit Microcopy Color'
                    onClick={() => editTextField('microcopyColor')}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <CTAEditModal
        show={showPrimaryCTAModal && editMode}
        onClose={() => setShowPrimaryCTAModal(false)}
        currentCTA={blockData?.primaryCta}
        currentCalendarUrl={primaryCalendarUrl}
        onSave={(data) =>
          updateBlockFields({
            primaryCta: data.cta ?? null,
            primaryCalendarUrl: makeTextData(data.calendarUrl ?? ''),
          })
        }
      />

      <CTAEditModal
        show={showSecondaryCTAModal && editMode}
        onClose={() => setShowSecondaryCTAModal(false)}
        currentCTA={blockData?.secondaryCta}
        currentCalendarUrl={secondaryCalendarUrl}
        onSave={(data) =>
          updateBlockFields({
            secondaryCta: data.cta ?? null,
            secondaryCalendarUrl: makeTextData(data.calendarUrl ?? ''),
          })
        }
      />
    </V3RoundedSectionBlockFrame>
  )
}

export default SectionCtaV3
