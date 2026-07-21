import Localization, { displayText } from '../../../Components/Localization'
import type { TextData } from '../../../page_interfaces'
import type { SectionRichTextV3Block } from './types'

export { Localization }

export const readTextValue = (value?: TextData | null, language = 'en') =>
  displayText(value, language) ?? ''

export const hasTextValue = (value?: TextData | null, language = 'en') =>
  readTextValue(value, language).trim() !== ''

export const makeTextData = (value: string | null): TextData => ({
  english: value,
  malayalam: '',
})

export const getBlockFieldValue = <T>(
  blockData: SectionRichTextV3Block | undefined,
  field: keyof SectionRichTextV3Block
) => blockData?.[field as keyof SectionRichTextV3Block] as T | undefined
