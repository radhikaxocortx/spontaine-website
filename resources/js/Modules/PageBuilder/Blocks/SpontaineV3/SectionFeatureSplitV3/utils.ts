import type { Language } from '@/components/ui/ui_interfaces'
import { displayText } from '../../../Components/Localization'
import type { LinkData, TextData } from '../../../page_interfaces'
import type { SectionFeatureSplitV3Block } from './types'

export const readTextValue = (value?: TextData | null, language: Language = 'en') =>
  displayText(value, language) ?? ''

export const hasTextValue = (value?: TextData | null, language: Language = 'en') =>
  readTextValue(value, language).trim() !== ''

export const makeTextData = (value: string | null): TextData => ({
  english: value,
  malayalam: '',
})

export const getBlockFieldValue = <T,>(
  blockData: SectionFeatureSplitV3Block | undefined,
  field: keyof SectionFeatureSplitV3Block
) => blockData?.[field as keyof SectionFeatureSplitV3Block] as T | undefined

export const openCtaLink = (linkData?: LinkData | null) => {
  if (linkData?.link == null || linkData.link.trim() === '') {
    return
  }

  if (linkData.external) {
    window.open(linkData.link, '_blank', 'noopener,noreferrer')
    return
  }

  window.location.href = linkData.link
}
