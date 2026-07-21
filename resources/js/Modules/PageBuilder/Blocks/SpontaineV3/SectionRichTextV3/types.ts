import type { Language } from '@/components/ui/ui_interfaces'
import type React from 'react'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import type { PageBuilderAction } from '../../../hooks/pageBuilderService'
import type { Block, BlockConfiguration, TextData } from '../../../page_interfaces'

export const SPONTAINE_V3_RICH_TEXT_BLOCK_NAME = 'Spontaine V3 - Rich Text'

export const emptyTextData: TextData = {
  english: '',
  malayalam: '',
}

export const defaultTitle: TextData = {
  english: 'The AI-native firm is built, not bought.',
  malayalam: 'The AI-native firm is built, not bought.',
}

export const defaultText: TextData = {
  english:
    '<h2>Replacing junior workers with AI is not the point</h2><p>Every firm using AI to touch client work is making a choice: automate fragments, or build reusable judgment the firm can govern.</p><h3>The real fork</h3><p>The firms that win this decade will be the ones whose least experienced hire can use senior judgment safely from day one.</p>',
  malayalam:
    '<h2>Replacing junior workers with AI is not the point</h2><p>Every firm using AI to touch client work is making a choice: automate fragments, or build reusable judgment the firm can govern.</p><h3>The real fork</h3><p>The firms that win this decade will be the ones whose least experienced hire can use senior judgment safely from day one.</p>',
}

export const defaultColumnLayout: TextData = {
  english: 'one',
  malayalam: '',
}

export const defaultRightText: TextData = {
  english: '',
  malayalam: '',
}

export interface SectionRichTextV3Block extends Block, BlockConfiguration {
  backgroundColor?: TextData
  columnLayout?: TextData
  description?: TextData | null
  descriptionColor?: TextData
  eyebrow?: TextData | null
  eyebrowColor?: TextData
  overlapTop?: TextData
  roundedTop?: TextData
  text: TextData
  textColor?: TextData
  textRight?: TextData | null
  titleOne?: TextData | null
  titleOneColor?: TextData
  titleTwo?: TextData | null
  titleTwoColor?: TextData
}

export const sectionRichTextV3Block: Omit<SectionRichTextV3Block, keyof Block> = {
  eyebrow: {
    english: 'From the field',
    malayalam: 'From the field',
  },
  titleOne: defaultTitle,
  titleTwo: null,
  description: {
    english: 'Editorial content below is authored in TinyMCE and rendered with V3 typography.',
    malayalam: 'Editorial content below is authored in TinyMCE and rendered with V3 typography.',
  },
  text: defaultText,
  textRight: null,
  columnLayout: defaultColumnLayout,
}

export interface SectionRichTextV3Props {
  blockData?: SectionRichTextV3Block
  dispatch?: React.Dispatch<PageBuilderAction>
  editMode?: boolean
  language?: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}
