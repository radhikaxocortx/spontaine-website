import type { Language } from '@/components/ui/ui_interfaces'
import type { CSSProperties, Dispatch } from 'react'
import type { BlocKFieldInfo, BlockFieldValues } from '../../../Components/BlockEditor/BlockEditor'
import { getV3ColorValue } from '../../../Components/V3ColorControls'
import {
  isV3RoundedTopEnabled,
  isV3TopOverlapEnabled,
} from '../../../Components/V3RoundedTopToggle'
import type { PageBuilderAction } from '../../../hooks/pageBuilderService'
import type { TextData } from '../../../page_interfaces'
import { defaultOverlayColor, emptyTextData, type SectionHeroV3Block } from './types'
import {
  getBlockFieldValue,
  getOverlayOpacity,
  hasTextValue,
  openHeroCtaLink,
  readTextValue,
} from './utils'

interface UseSectionHeroV3ModelProps {
  blockData?: SectionHeroV3Block
  dispatch?: Dispatch<PageBuilderAction>
  editMode: boolean
  language: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
  renderMode?: string
}

export const useSectionHeroV3Model = ({
  blockData,
  dispatch,
  editMode,
  language,
  onFieldEdit,
  renderMode,
}: UseSectionHeroV3ModelProps) => {
  const titleOne = blockData?.titleOne
  const titleTwo = blockData?.titleTwo
  const backgroundImage = blockData?.backgroundImage
  const hasImage = Boolean(backgroundImage?.url)
  const hasEyebrow = hasTextValue(blockData?.eyebrow, language)
  const hasTitleOne = hasTextValue(titleOne, language)
  const hasTitleTwo = hasTextValue(titleTwo, language)
  const hasDescription = hasTextValue(blockData?.description, language)
  const calendarUrl = getV3ColorValue(blockData?.calendarUrl ?? undefined, language)
  const hasCTA = Boolean(calendarUrl || blockData?.cta?.link)
  const hasContent = hasEyebrow || hasTitleOne || hasTitleTwo || hasDescription || hasCTA
  const hasRoundedTop = isV3RoundedTopEnabled(blockData?.roundedTop, language)
  const hasTopOverlap = isV3TopOverlapEnabled(blockData?.overlapTop, language)
  const isFirstPublicPageHero = renderMode === 'page' && !editMode && blockData?.position === 1

  const heroHeightClassName = isFirstPublicPageHero
    ? 'min-h-[calc(55vh+4rem)] md:min-h-[calc(60vh+4rem)] lg:min-h-[calc(64vh+4rem)]'
    : 'min-h-[55vh] md:min-h-[60vh] lg:min-h-[64vh]'
  const heroMinHeightStyle = isFirstPublicPageHero ? 'calc(55vh + 4rem)' : '55vh'
  const heroPaddingClassName = isFirstPublicPageHero
    ? 'pb-20 pt-32 md:pb-20 md:pt-36'
    : 'py-16 md:py-20'

  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const textColor = getV3ColorValue(blockData?.textColor, language)
  const eyebrowColor = getV3ColorValue(blockData?.eyebrowColor, language) ?? textColor
  const titleOneColor = getV3ColorValue(blockData?.titleOneColor, language) ?? textColor
  const titleTwoColor = getV3ColorValue(blockData?.titleTwoColor, language) ?? textColor
  const descriptionColor = getV3ColorValue(blockData?.descriptionColor, language) ?? textColor
  const overlayColor =
    getV3ColorValue(blockData?.overlayColor ?? defaultOverlayColor, language) ??
    readTextValue(defaultOverlayColor, language)
  const overlayOpacity = getOverlayOpacity(blockData?.overlayOpacity, language)

  const sectionStyle = {
    background: backgroundColor,
    minHeight: heroMinHeightStyle,
  } as CSSProperties
  const contentStyle = {
    color: textColor,
  } as CSSProperties

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

  return {
    backgroundColor,
    backgroundImage,
    calendarUrl,
    contentStyle,
    descriptionColor,
    editTextField,
    eyebrowColor,
    hasCTA,
    hasDescription,
    hasEyebrow,
    hasImage,
    hasContent,
    hasRoundedTop,
    hasTitleOne,
    hasTitleTwo,
    hasTopOverlap,
    heroHeightClassName,
    heroMinHeightStyle,
    heroPaddingClassName,
    openCTA: () => openHeroCtaLink(blockData),
    overlayColor,
    overlayOpacity,
    sectionStyle,
    textColor,
    titleOne,
    titleOneColor,
    titleTwo,
    titleTwoColor,
    updateBlockFields,
  }
}

export type SectionHeroV3Model = ReturnType<typeof useSectionHeroV3Model>
