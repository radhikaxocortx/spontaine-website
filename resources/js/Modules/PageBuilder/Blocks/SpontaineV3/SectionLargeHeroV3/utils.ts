import type { Language } from '@/components/ui/ui_interfaces'
import { displayText } from '../../../Components/Localization'
import type { LinkData, TextData } from '../../../page_interfaces'
import type { SectionLargeHeroV3Block } from './types'

export const readTextValue = (value?: TextData | null, language: Language = 'en') =>
  displayText(value, language) ?? ''

export const hasTextValue = (value?: TextData | null, language: Language = 'en') =>
  readTextValue(value, language).trim() !== ''

export const makeTextData = (value: string | null): TextData => ({
  english: value,
  malayalam: '',
})

export const getOverlayOpacity = (value?: TextData, language: Language = 'en') => {
  const parsedOpacity = Number(readTextValue(value, language))

  if (!Number.isFinite(parsedOpacity)) {
    return 45
  }

  return Math.min(100, Math.max(0, parsedOpacity))
}

export const getBlockFieldValue = <T>(
  blockData: SectionLargeHeroV3Block | undefined,
  field: keyof SectionLargeHeroV3Block
) => blockData?.[field as keyof SectionLargeHeroV3Block] as T | undefined

export const openCtaLink = (cta?: LinkData | null) => {
  if (cta?.link == null) {
    return
  }

  if (cta.external) {
    window.open(cta.link, '_blank', 'noopener,noreferrer')
    return
  }

  window.location.href = cta.link
}
