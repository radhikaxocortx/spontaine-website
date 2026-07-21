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
import { OverlayEditModal } from '../../Components/OverlayEditModal'
import V3ColorControls, { getV3ColorValue } from '../../Components/V3ColorControls'
import V3RoundedSectionBlockFrame from '../../Components/V3RoundedSectionBlockFrame'
import V3RoundedTopToggle, {
  isV3RoundedTopEnabled,
  isV3TopOverlapEnabled,
} from '../../Components/V3RoundedTopToggle'
import { usePageBuilderContext } from '../../contexts/PageBuilderContext'
import type { PageBuilderAction } from '../../hooks/pageBuilderService'
import type {
  Block,
  BlockConfiguration,
  BlockImage,
  LinkData,
  TextData,
} from '../../page_interfaces'

export const SPONTAINE_V3_HERO_BLOCK_NAME = 'Spontaine V3 - Hero'

gsap.registerPlugin(ScrollTrigger)

const emptyTextData: TextData = {
  english: '',
  malayalam: '',
}

const requiredTitleFallback: TextData = {
  english: 'Governed intelligence your firm owns.',
  malayalam: 'Governed intelligence your firm owns.',
}

const defaultOverlayColor: TextData = {
  english: '#000000',
  malayalam: '#000000',
}

const defaultOverlayOpacity: TextData = {
  english: '45',
  malayalam: '',
}

export interface SectionHeroV3Block extends Block, BlockConfiguration {
  backgroundColor?: TextData
  backgroundImage?: BlockImage | null
  calendarUrl?: TextData | null
  cta?: LinkData | null
  description?: TextData | null
  descriptionColor?: TextData
  eyebrow?: TextData | null
  eyebrowColor?: TextData
  overlayColor?: TextData
  overlayOpacity?: TextData
  overlapTop?: TextData
  roundedTop?: TextData
  textColor?: TextData
  titleOne: TextData
  titleOneColor?: TextData
  titleTwo?: TextData | null
  titleTwoColor?: TextData
}

export const sectionHeroV3Block: Omit<SectionHeroV3Block, keyof Block> = {
  titleOne: requiredTitleFallback,
  titleTwo: null,
  eyebrow: null,
  description: null,
  cta: null,
  calendarUrl: null,
  backgroundImage: null,
  overlayColor: defaultOverlayColor,
  overlayOpacity: defaultOverlayOpacity,
}

interface Properties {
  blockData?: SectionHeroV3Block
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

const getOverlayOpacity = (value?: TextData, language: Language = 'en') => {
  const parsedOpacity = Number(displayText(value, language))

  if (!Number.isFinite(parsedOpacity)) {
    return 45
  }

  return Math.min(100, Math.max(0, parsedOpacity))
}

const getBlockFieldValue = <T,>(
  blockData: SectionHeroV3Block | undefined,
  field: keyof SectionHeroV3Block
) => blockData?.[field as keyof SectionHeroV3Block] as T | undefined

const SectionHeroV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const { renderMode } = usePageBuilderContext()
  const sectionRef = React.useRef<HTMLElement>(null)
  const [showOverlayModal, setShowOverlayModal] = React.useState(false)
  const [showCTAModal, setShowCTAModal] = React.useState(false)

  const titleOne = blockData?.titleOne ?? requiredTitleFallback
  const titleTwo = blockData?.titleTwo
  const backgroundImage = blockData?.backgroundImage
  const hasImage = Boolean(backgroundImage?.url)
  const hasEyebrow = hasTextValue(blockData?.eyebrow, language)
  const hasTitleTwo = hasTextValue(titleTwo, language)
  const hasDescription = hasTextValue(blockData?.description, language)
  const calendarUrl = getV3ColorValue(blockData?.calendarUrl ?? undefined, language)
  const hasCTA = Boolean(calendarUrl || blockData?.cta?.link)
  const hasRoundedTop = isV3RoundedTopEnabled(blockData?.roundedTop, language)
  const hasTopOverlap = isV3TopOverlapEnabled(blockData?.overlapTop, language)
  const isFirstPublicPageHero = renderMode === 'page' && !editMode && blockData?.position === 1
  const heroHeightClassName = isFirstPublicPageHero
    ? 'min-h-[calc(55vh+4rem)] md:min-h-[calc(60vh+4rem)] lg:min-h-[calc(64vh+4rem)]'
    : 'min-h-[55vh] md:min-h-[60vh] lg:min-h-[64vh]'
  const heroPaddingClassName = isFirstPublicPageHero
    ? 'pb-16 pt-32 md:pb-20 md:pt-36'
    : 'py-16 md:py-20'

  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const textColor = getV3ColorValue(blockData?.textColor, language)
  const eyebrowColor = getV3ColorValue(blockData?.eyebrowColor, language) ?? textColor
  const titleOneColor = getV3ColorValue(blockData?.titleOneColor, language) ?? textColor
  const titleTwoColor = getV3ColorValue(blockData?.titleTwoColor, language) ?? textColor
  const descriptionColor = getV3ColorValue(blockData?.descriptionColor, language) ?? textColor
  const overlayColor =
    getV3ColorValue(blockData?.overlayColor ?? defaultOverlayColor, language) ??
    displayText(defaultOverlayColor, language)
  const overlayOpacity = getOverlayOpacity(blockData?.overlayOpacity, language)
  const sectionStyle = {
    background: backgroundColor,
  } as React.CSSProperties
  const contentStyle = {
    color: textColor,
  } as React.CSSProperties

  const openCTA = () => {
    if (blockData?.cta?.link == null) {
      return
    }

    if (blockData.cta.external) {
      window.open(blockData.cta.link, '_blank', 'noopener,noreferrer')
      return
    }

    window.location.href = blockData.cta.link
  }

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

  const editTextField = (field: keyof SectionHeroV3Block, fallback: TextData = emptyTextData) => {
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
      const revealTargets = gsap.utils.toArray<HTMLElement>('[data-v3-hero-reveal]')

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
        'relative left-1/2 right-1/2 isolate ml-[-50vw] mr-[-50vw] flex w-screen flex-col items-center justify-center overflow-hidden',
        heroHeightClassName,
        heroPaddingClassName,
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={sectionStyle}
    >
      <div className='absolute inset-0 z-0'>
        {hasImage ? (
          <>
            <img
              src={backgroundImage?.url}
              alt={backgroundImage?.caption || 'Hero background'}
              className='animate-v3-ken-burns absolute inset-0 h-full w-full object-cover'
            />
            <div
              className='pointer-events-none absolute inset-0'
              style={{
                backgroundColor: overlayColor,
                opacity: overlayOpacity / 100,
              }}
            />
          </>
        ) : (
          !backgroundColor && (
            <div
              className='animate-v3-ken-burns-slow bg-pagebuilder-hero-wash absolute inset-0'
              aria-hidden='true'
            />
          )
        )}
      </div>

      <div
        className='relative z-10 mx-auto w-full max-w-[760px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'
        style={contentStyle}
      >
        {(hasEyebrow || editMode) && (
          <div
            data-v3-hero-reveal
            className={hasEyebrow ? 'mb-6' : 'mb-3'}
          >
            {hasEyebrow && (
              <p
                className={`m-0 font-mono text-[9px] font-semibold uppercase tracking-[0.075em] ${eyebrowColor ? 'text-[inherit]' : 'text-spontaine-gray-cool'}`}
                style={{ color: eyebrowColor }}
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
                onClick={() => editTextField('eyebrow')}
              />
            )}
          </div>
        )}

        <h1
          data-v3-hero-reveal
          className='m-0 font-display text-4xl font-bold leading-[0.91] tracking-[-0.068em] md:text-5xl lg:text-6xl'
        >
          <strong
            className={`block font-bold leading-[inherit] tracking-[inherit] ${titleOneColor ? 'text-[inherit]' : 'text-spontaine-text-primary'}`}
            style={{ color: titleOneColor }}
          >
            <Localization
              text={titleOne}
              language={language}
            />
          </strong>
          {hasTitleTwo && (
            <strong
              className={`block font-bold leading-[inherit] tracking-[inherit] ${titleTwoColor ? 'text-[inherit]' : 'text-spontaine-text-accent-dark'}`}
              style={{ color: titleTwoColor }}
            >
              <Localization
                text={titleTwo ?? emptyTextData}
                language={language}
              />
            </strong>
          )}
        </h1>

        {editMode && onFieldEdit != null && (
          <div className='mt-3 flex flex-wrap gap-2'>
            <EditLabel
              label='Edit Title Line 1'
              onClick={() => editTextField('titleOne', requiredTitleFallback)}
            />
            <EditLabel
              label='Edit Title Line 2'
              onClick={() => editTextField('titleTwo')}
            />
          </div>
        )}

        {(hasDescription || editMode) && (
          <div
            data-v3-hero-reveal
            className={hasDescription ? 'mt-7' : 'mt-3'}
          >
            {hasDescription && (
              <p
                className={`m-0 max-w-[570px] font-body text-base leading-[1.52] ${descriptionColor ? 'text-[inherit]' : 'text-spontaine-text-secondary'}`}
                style={{ color: descriptionColor }}
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
                onClick={() => editTextField('description')}
              />
            )}
          </div>
        )}

        {(hasCTA || editMode) && (
          <div
            data-v3-hero-reveal
            className={hasCTA ? 'mt-7' : 'mt-3'}
          >
            {calendarUrl ? (
              <CalendarBooking calLink={calendarUrl}>
                {({ openCalendar }) => (
                  <Button
                    type='button'
                    variant='v3Primary'
                    size='v3Hero'
                    onClick={openCalendar}
                  >
                    Book Demo
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
                  onClick={openCTA}
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
                  onClick={() => setShowCTAModal(true)}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {editMode && (
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
                      onClick={() => setShowOverlayModal(true)}
                    />
                  )}
                </div>
              )}
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
                eyebrowColor={blockData?.eyebrowColor}
                onFieldEdit={onFieldEdit}
                textColor={blockData?.textColor}
                titleOneColor={blockData?.titleOneColor}
                titleTwoColor={blockData?.titleTwoColor}
              />
            </div>
            <p className='m-0 mt-3 max-w-[760px] font-body text-xs leading-relaxed text-spontaine-text-secondary'>
              Overlay opacity controls how strongly the image is dimmed so text remains readable.
              Use 0 for no overlay, 35-55 for most image backgrounds, and 70+ for very busy images.
            </p>
          </div>
        </div>
      )}

      <OverlayEditModal
        show={showOverlayModal && editMode}
        onClose={() => setShowOverlayModal(false)}
        currentColor={overlayColor}
        currentOpacity={overlayOpacity}
        onSave={(data) =>
          updateBlockFields({
            overlayColor: makeTextData(data.overlayColor),
            overlayOpacity: makeTextData(data.overlayOpacity.toString()),
          })
        }
      />

      <CTAEditModal
        show={showCTAModal && editMode}
        onClose={() => setShowCTAModal(false)}
        currentCTA={blockData?.cta}
        currentCalendarUrl={calendarUrl}
        onSave={(data) =>
          updateBlockFields({
            cta: data.cta ?? null,
            calendarUrl: makeTextData(data.calendarUrl ?? ''),
          })
        }
      />
    </V3RoundedSectionBlockFrame>
  )
}

export default SectionHeroV3
