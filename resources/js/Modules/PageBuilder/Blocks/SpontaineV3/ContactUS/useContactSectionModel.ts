import type { Language } from '@/components/ui/ui_interfaces'
import type { CSSProperties } from 'react'
import { getV3ColorValue } from '../../../Components/V3ColorControls'
import {
  isV3RoundedTopEnabled,
  isV3TopOverlapEnabled,
} from '../../../Components/V3RoundedTopToggle'
import { v3RoundedSectionTopPaddingClassName } from '../../../Components/V3RoundedSectionBlockFrame'
import type { ContactUsBlockInterface } from './types'

export const useContactSectionModel = (
  blockData: ContactUsBlockInterface | undefined,
  language: Language
) => {
  const hasRoundedTop = isV3RoundedTopEnabled(blockData?.roundedTop, language)
  const hasTopOverlap = isV3TopOverlapEnabled(blockData?.overlapTop, language)
  const sectionPaddingClass = hasRoundedTop
    ? `${v3RoundedSectionTopPaddingClassName} pb-16 md:pb-20 lg:pb-24`
    : 'py-16 md:py-20 lg:py-24'
  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const textColor = getV3ColorValue(blockData?.textColor, language)
  const eyebrowColor = getV3ColorValue(blockData?.eyebrowColor, language) ?? textColor
  const titleOneColor = getV3ColorValue(blockData?.titleOneColor, language) ?? textColor
  const titleTwoColor = getV3ColorValue(blockData?.titleTwoColor, language) ?? textColor
  const descriptionColor = getV3ColorValue(blockData?.descriptionColor, language) ?? textColor

  const sectionStyle = {
    '--PhoneInputCountryFlag-display': 'none',
    '--PhoneInputCountryIcon-display': 'none',
    background: backgroundColor,
  } as CSSProperties

  return {
    contentTextStyle: { color: textColor } as CSSProperties,
    descriptionStyle: { color: descriptionColor } as CSSProperties,
    descriptionColor,
    eyebrowStyle: { color: eyebrowColor } as CSSProperties,
    eyebrowColor,
    hasRoundedTop,
    hasTopOverlap,
    sectionPaddingClass,
    sectionStyle,
    textColor,
    titleOneStyle: { color: titleOneColor } as CSSProperties,
    titleOneColor,
    titleTwoStyle: { color: titleTwoColor } as CSSProperties,
    titleTwoColor,
  }
}

export type ContactSectionModel = ReturnType<typeof useContactSectionModel>
