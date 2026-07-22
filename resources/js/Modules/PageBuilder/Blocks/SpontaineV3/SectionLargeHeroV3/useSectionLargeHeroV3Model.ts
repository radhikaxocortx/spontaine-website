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
import { defaultOverlayColor, emptyTextData, type SectionLargeHeroV3Block } from './types'
import { getBlockFieldValue, getOverlayOpacity, hasTextValue, openCtaLink } from './utils'

interface UseSectionLargeHeroV3ModelProps {
  blockData?: SectionLargeHeroV3Block
  dispatch?: Dispatch<PageBuilderAction>
  language: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

export const useSectionLargeHeroV3Model = ({
  blockData,
  dispatch,
  language,
  onFieldEdit,
}: UseSectionLargeHeroV3ModelProps) => {
  const backgroundImage = blockData?.backgroundImage
  const hasImage = Boolean(backgroundImage?.url)
  const hasEyebrow = hasTextValue(blockData?.eyebrow, language)
  const hasTitleOne = hasTextValue(blockData?.titleOne, language)
  const hasTitleTwo = hasTextValue(blockData?.titleTwo, language)
  const hasDescription = hasTextValue(blockData?.description, language)
  const hasMicrocopy = hasTextValue(blockData?.microcopy, language)
  const primaryCalendarUrl = getV3ColorValue(blockData?.primaryCalendarUrl ?? undefined, language)
  const secondaryCalendarUrl = getV3ColorValue(
    blockData?.secondaryCalendarUrl ?? undefined,
    language
  )
  const hasPrimaryCTA = Boolean(primaryCalendarUrl || blockData?.primaryCta?.link)
  const hasSecondaryCTA = Boolean(secondaryCalendarUrl || blockData?.secondaryCta?.link)
  const hasCTAGroup = hasPrimaryCTA || hasSecondaryCTA
  const hasContent =
    hasEyebrow || hasTitleOne || hasTitleTwo || hasDescription || hasCTAGroup || hasMicrocopy
  const hasRoundedTop = isV3RoundedTopEnabled(blockData?.roundedTop, language)
  const hasTopOverlap = isV3TopOverlapEnabled(blockData?.overlapTop, language)

  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const textColor = getV3ColorValue(blockData?.textColor, language)
  const eyebrowColor = getV3ColorValue(blockData?.eyebrowColor, language) ?? textColor
  const titleOneColor = getV3ColorValue(blockData?.titleOneColor, language) ?? textColor
  const titleTwoColor = getV3ColorValue(blockData?.titleTwoColor, language) ?? textColor
  const descriptionColor = getV3ColorValue(blockData?.descriptionColor, language) ?? textColor
  const microcopyColor = getV3ColorValue(blockData?.microcopyColor, language) ?? textColor
  const overlayColor =
    getV3ColorValue(blockData?.overlayColor ?? defaultOverlayColor, language) ??
    'var(--spontaine-dark)'
  const overlayOpacity = getOverlayOpacity(blockData?.overlayOpacity, language)

  const sectionStyle = {
    background: backgroundColor,
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

  const editTextField = (
    field: keyof SectionLargeHeroV3Block,
    fallback: TextData = emptyTextData
  ) => {
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
    contentStyle,
    descriptionColor,
    editTextField,
    eyebrowColor,
    hasCTAGroup,
    hasContent,
    hasDescription,
    hasEyebrow,
    hasImage,
    hasMicrocopy,
    hasPrimaryCTA,
    hasRoundedTop,
    hasSecondaryCTA,
    hasTitleOne,
    hasTitleTwo,
    hasTopOverlap,
    microcopyColor,
    openPrimaryCTA: () => openCtaLink(blockData?.primaryCta),
    openSecondaryCTA: () => openCtaLink(blockData?.secondaryCta),
    overlayColor,
    overlayOpacity,
    primaryCalendarUrl,
    secondaryCalendarUrl,
    sectionStyle,
    textColor,
    titleOneColor,
    titleTwoColor,
    updateBlockFields,
  }
}

export type SectionLargeHeroV3Model = ReturnType<typeof useSectionLargeHeroV3Model>
