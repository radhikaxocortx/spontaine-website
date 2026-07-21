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
import { emptyTextData, requiredTitleFallback, type SectionCtaV3Block } from './types'
import { getBlockFieldValue, hasTextValue, openCtaLink } from './utils'

interface UseSectionCtaV3ModelProps {
  blockData?: SectionCtaV3Block
  dispatch?: Dispatch<PageBuilderAction>
  language: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

export const useSectionCtaV3Model = ({
  blockData,
  dispatch,
  language,
  onFieldEdit,
}: UseSectionCtaV3ModelProps) => {
  const titleOne = blockData?.titleOne ?? requiredTitleFallback
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
  const hasRoundedTop = isV3RoundedTopEnabled(blockData?.roundedTop, language)
  const hasTopOverlap = isV3TopOverlapEnabled(blockData?.overlapTop, language)

  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const textColor = getV3ColorValue(blockData?.textColor, language)
  const titleOneColor = getV3ColorValue(blockData?.titleOneColor, language) ?? textColor
  const descriptionColor = getV3ColorValue(blockData?.descriptionColor, language) ?? textColor
  const microcopyColor = getV3ColorValue(blockData?.microcopyColor, language) ?? textColor

  const sectionStyle = {
    background: backgroundColor,
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

  return {
    backgroundColor,
    descriptionColor,
    editTextField,
    hasCTAGroup,
    hasDescription,
    hasMicrocopy,
    hasPrimaryCTA,
    hasRoundedTop,
    hasSecondaryCTA,
    hasTopOverlap,
    microcopyColor,
    openPrimaryCTA: () => openCtaLink(blockData?.primaryCta),
    openSecondaryCTA: () => openCtaLink(blockData?.secondaryCta),
    primaryCalendarUrl,
    secondaryCalendarUrl,
    sectionStyle,
    textColor,
    titleOne,
    titleOneColor,
    updateBlockFields,
  }
}

export type SectionCtaV3Model = ReturnType<typeof useSectionCtaV3Model>
