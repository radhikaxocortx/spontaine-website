import type { Language } from '@/components/ui/ui_interfaces'
import { displayText } from '../../../Components/Localization'
import type { TextData } from '../../../page_interfaces'
import type { SectionHeroV3Block } from './types'

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

export const getBlockFieldValue = <T,>(
  blockData: SectionHeroV3Block | undefined,
  field: keyof SectionHeroV3Block
) => blockData?.[field as keyof SectionHeroV3Block] as T | undefined

export const openHeroCtaLink = (blockData?: SectionHeroV3Block) => {
  if (blockData?.cta?.link == null) {
    return
  }

  if (blockData.cta.external) {
    window.open(blockData.cta.link, '_blank', 'noopener,noreferrer')
    return
  }

  window.location.href = blockData.cta.link
}
