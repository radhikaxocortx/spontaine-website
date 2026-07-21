import type {
  Block,
  BlockConfiguration,
  BlockImage,
  LinkData,
  TextData,
} from '../../../page_interfaces'

export const SPONTAINE_V3_HERO_BLOCK_NAME = 'Spontaine V3 - Hero'

export const emptyTextData: TextData = {
  english: '',
  malayalam: '',
}

export const requiredTitleFallback: TextData = {
  english: 'Governed intelligence your firm owns.',
  malayalam: 'Governed intelligence your firm owns.',
}

export const defaultOverlayColor: TextData = {
  english: '#000000',
  malayalam: '#000000',
}

export const defaultOverlayOpacity: TextData = {
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
