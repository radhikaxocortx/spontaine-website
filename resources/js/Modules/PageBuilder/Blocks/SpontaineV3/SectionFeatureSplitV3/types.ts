import type {
  Block,
  BlockConfiguration,
  BlockImage,
  LinkData,
  TextData,
} from '../../../page_interfaces'

export const SPONTAINE_V3_FEATURE_SPLIT_BLOCK_NAME = 'Spontaine V3 - Feature Split'

export const emptyTextData: TextData = {
  english: '',
  malayalam: '',
}

export const requiredTitleFallback: TextData = {
  english: 'Every expert can build another expert.',
  malayalam: 'Every expert can build another expert.',
}

const defaultEyebrow: TextData = {
  english: 'The people who know the work',
  malayalam: 'The people who know the work',
}

const defaultDescription: TextData = {
  english:
    'Your team can capture a proven approach, govern it, and reuse it without waiting on a six-month build cycle.',
  malayalam:
    'Your team can capture a proven approach, govern it, and reuse it without waiting on a six-month build cycle.',
}

export const defaultMediaSide: TextData = {
  english: 'right',
  malayalam: '',
}

const defaultBackgroundColor: TextData = {
  english: 'var(--spontaine-surface-ice)',
  malayalam: '',
}

const defaultCta: LinkData = {
  name: {
    english: 'Explore the capability',
    malayalam: 'Explore the capability',
  },
  link: '#contact',
  external: false,
}

export interface SectionFeatureSplitV3Block extends Block, BlockConfiguration {
  backgroundColor?: TextData
  calendarUrl?: TextData | null
  cta?: LinkData | null
  description?: TextData | null
  descriptionColor?: TextData
  eyebrow?: TextData | null
  eyebrowColor?: TextData
  image?: BlockImage | null
  imageAlt?: TextData
  mediaSide?: TextData
  overlapTop?: TextData
  roundedTop?: TextData
  textColor?: TextData
  titleOne: TextData
  titleOneColor?: TextData
  titleTwo?: TextData | null
  titleTwoColor?: TextData
}

export const sectionFeatureSplitV3Block: Omit<SectionFeatureSplitV3Block, keyof Block> = {
  eyebrow: defaultEyebrow,
  titleOne: requiredTitleFallback,
  titleTwo: null,
  description: defaultDescription,
  cta: defaultCta,
  calendarUrl: null,
  image: null,
  imageAlt: emptyTextData,
  mediaSide: defaultMediaSide,
  backgroundColor: defaultBackgroundColor,
}
