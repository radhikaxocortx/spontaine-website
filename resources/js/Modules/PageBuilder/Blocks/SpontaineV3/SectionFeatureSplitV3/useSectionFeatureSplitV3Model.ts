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
import {
  defaultMediaSide,
  emptyTextData,
  requiredTitleFallback,
  type SectionFeatureSplitV3Block,
} from './types'
import { getBlockFieldValue, hasTextValue, makeTextData, openCtaLink, readTextValue } from './utils'

interface UseSectionFeatureSplitV3ModelProps {
  blockData?: SectionFeatureSplitV3Block
  dispatch?: Dispatch<PageBuilderAction>
  editMode: boolean
  language: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

export const useSectionFeatureSplitV3Model = ({
  blockData,
  dispatch,
  editMode,
  language,
  onFieldEdit,
}: UseSectionFeatureSplitV3ModelProps) => {
  const titleOne = blockData?.titleOne ?? requiredTitleFallback
  const hasEyebrow = hasTextValue(blockData?.eyebrow, language)
  const hasTitleTwo = hasTextValue(blockData?.titleTwo, language)
  const hasDescription = hasTextValue(blockData?.description, language)
  const calendarUrl = getV3ColorValue(blockData?.calendarUrl ?? undefined, language)
  const hasCTA = Boolean(calendarUrl || blockData?.cta?.link)
  const hasImage = Boolean(blockData?.image?.url)
  const shouldRenderMedia = hasImage || editMode
  const mediaSide = readTextValue(blockData?.mediaSide ?? defaultMediaSide, language)
  const isMediaLeft = mediaSide === 'left'
  const hasRoundedTop = isV3RoundedTopEnabled(blockData?.roundedTop, language)
  const hasTopOverlap = isV3TopOverlapEnabled(blockData?.overlapTop, language)

  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const textColor = getV3ColorValue(blockData?.textColor, language)
  const eyebrowColor = getV3ColorValue(blockData?.eyebrowColor, language) ?? textColor
  const titleOneColor = getV3ColorValue(blockData?.titleOneColor, language) ?? textColor
  const titleTwoColor = getV3ColorValue(blockData?.titleTwoColor, language) ?? textColor
  const descriptionColor = getV3ColorValue(blockData?.descriptionColor, language) ?? textColor

  const sectionStyle = {
    background: backgroundColor,
  } as CSSProperties

  const textColumnStyle = {
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
    field: keyof SectionFeatureSplitV3Block,
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

  const toggleMediaSide = () => {
    updateBlockFields({
      mediaSide: makeTextData(isMediaLeft ? 'right' : 'left'),
    })
  }

  return {
    backgroundColor,
    calendarUrl,
    descriptionColor,
    editTextField,
    eyebrowColor,
    hasCTA,
    hasDescription,
    hasEyebrow,
    hasImage,
    hasRoundedTop,
    hasTitleTwo,
    hasTopOverlap,
    isMediaLeft,
    openCTA: () => openCtaLink(blockData?.cta),
    sectionStyle,
    shouldRenderMedia,
    textColumnStyle,
    textColor,
    titleOne,
    titleOneColor,
    titleTwoColor,
    toggleMediaSide,
    updateBlockFields,
  }
}

export type SectionFeatureSplitV3Model = ReturnType<typeof useSectionFeatureSplitV3Model>
