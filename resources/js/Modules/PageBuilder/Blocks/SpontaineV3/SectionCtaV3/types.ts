import type { Block, BlockConfiguration, LinkData, TextData } from '../../../page_interfaces'

export const SPONTAINE_V3_CTA_BLOCK_NAME = 'Spontaine V3 - CTA'

export const emptyTextData: TextData = {
  english: '',
  malayalam: '',
}

export const requiredTitleFallback: TextData = {
  english: 'Bring the question your firm cannot answer with confidence.',
  malayalam: 'Bring the question your firm cannot answer with confidence.',
}

export const defaultDescription: TextData = {
  english:
    'Thirty minutes. No discovery-call script. Bring the decision, the spreadsheet, or the system that sits behind it.',
  malayalam:
    'Thirty minutes. No discovery-call script. Bring the decision, the spreadsheet, or the system that sits behind it.',
}

export const defaultMicrocopy: TextData = {
  english: 'Start with the decision. Build from there.',
  malayalam: 'Start with the decision. Build from there.',
}

const defaultPrimaryCta: LinkData = {
  name: {
    english: 'Book a working session',
    malayalam: 'Book a working session',
  },
  link: '#contact',
  external: false,
}

const defaultSecondaryCta: LinkData = {
  name: {
    english: 'Watch the 90-second overview',
    malayalam: 'Watch the 90-second overview',
  },
  link: '#overview',
  external: false,
}

export interface SectionCtaV3Block extends Block, BlockConfiguration {
  backgroundColor?: TextData
  description?: TextData | null
  descriptionColor?: TextData
  microcopy?: TextData | null
  microcopyColor?: TextData
  overlapTop?: TextData
  primaryCalendarUrl?: TextData | null
  primaryCta?: LinkData | null
  roundedTop?: TextData
  secondaryCalendarUrl?: TextData | null
  secondaryCta?: LinkData | null
  textColor?: TextData
  titleOne: TextData
  titleOneColor?: TextData
}

export const sectionCtaV3Block: Omit<SectionCtaV3Block, keyof Block> = {
  titleOne: requiredTitleFallback,
  description: defaultDescription,
  microcopy: defaultMicrocopy,
  primaryCta: defaultPrimaryCta,
  primaryCalendarUrl: null,
  secondaryCta: defaultSecondaryCta,
  secondaryCalendarUrl: null,
}
