import type {
  Block,
  BlockConfiguration,
  BlockImage,
  LinkData,
  TextData,
} from '../../../page_interfaces'

export const SPONTAINE_V3_LARGE_HERO_BLOCK_NAME = 'Spontaine V3 - Hero Large'

export const emptyTextData: TextData = {
  english: '',
  malayalam: '',
}

export const defaultTitleOne: TextData = {
  english: 'Any AI can answer a question.',
  malayalam: 'Any AI can answer a question.',
}

export const defaultTitleTwo: TextData = {
  english: 'The advantage is what your firm can keep.',
  malayalam: 'The advantage is what your firm can keep.',
}

export const defaultEyebrow: TextData = {
  english: 'The owned intelligence layer for professional services firms',
  malayalam: 'The owned intelligence layer for professional services firms',
}

export const defaultDescription: TextData = {
  english:
    'Your data and experience are already an advantage. Spontaine turns them into a governed intelligence layer your firm owns, so the answers your people create can be reused in dashboards, workflows, client products, and the next decision.',
  malayalam:
    'Your data and experience are already an advantage. Spontaine turns them into a governed intelligence layer your firm owns, so the answers your people create can be reused in dashboards, workflows, client products, and the next decision.',
}

export const defaultMicrocopy: TextData = {
  english: 'A 30-minute working session. No deck. No obligation.',
  malayalam: 'A 30-minute working session. No deck. No obligation.',
}

export const defaultOverlayColor: TextData = {
  english: 'var(--spontaine-dark)',
  malayalam: 'var(--spontaine-dark)',
}

export const defaultOverlayOpacity: TextData = {
  english: '45',
  malayalam: '',
}

const defaultPrimaryCta: LinkData = {
  name: {
    english: 'The Product',
    malayalam: 'The Product',
  },
  link: '/product',
  external: false,
}

const defaultSecondaryCta: LinkData = {
  name: {
    english: 'View video',
    malayalam: 'View video',
  },
  link: '/spontaine-video',
  external: false,
}

export interface SectionLargeHeroV3Block extends Block, BlockConfiguration {
  backgroundColor?: TextData
  backgroundImage?: BlockImage | null
  description?: TextData | null
  descriptionColor?: TextData
  eyebrow?: TextData | null
  eyebrowColor?: TextData
  microcopy?: TextData | null
  microcopyColor?: TextData
  overlayColor?: TextData
  overlayOpacity?: TextData
  overlapTop?: TextData
  primaryCalendarUrl?: TextData | null
  primaryCta?: LinkData | null
  roundedTop?: TextData
  secondaryCalendarUrl?: TextData | null
  secondaryCta?: LinkData | null
  textColor?: TextData
  titleOne?: TextData | null
  titleOneColor?: TextData
  titleTwo?: TextData | null
  titleTwoColor?: TextData
}

export const sectionLargeHeroV3Block: Omit<SectionLargeHeroV3Block, keyof Block> = {
  backgroundImage: null,
  description: defaultDescription,
  eyebrow: defaultEyebrow,
  microcopy: defaultMicrocopy,
  overlayColor: defaultOverlayColor,
  overlayOpacity: defaultOverlayOpacity,
  primaryCalendarUrl: null,
  primaryCta: defaultPrimaryCta,
  secondaryCalendarUrl: null,
  secondaryCta: defaultSecondaryCta,
  titleOne: defaultTitleOne,
  titleTwo: defaultTitleTwo,
}
