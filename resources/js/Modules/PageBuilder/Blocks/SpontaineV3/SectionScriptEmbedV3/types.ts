import type { Language } from '@/components/ui/ui_interfaces'
import type React from 'react'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import type { PageBuilderAction } from '../../../hooks/pageBuilderService'
import type { Block, BlockConfiguration, TextData } from '../../../page_interfaces'

export const SPONTAINE_V3_SCRIPT_EMBED_BLOCK_NAME = 'Spontaine V3 - Script Embed'

export const emptyTextData: TextData = {
  english: '',
  malayalam: '',
}

export const defaultTitle: TextData = {
  english: 'Embed trusted interactive content.',
  malayalam: 'Embed trusted interactive content.',
}

export const defaultEmbedHtml: TextData = {
  english: '<div><p>Paste trusted HTML, iframe, style, or script embed code here.</p></div>',
  malayalam: '<div><p>Paste trusted HTML, iframe, style, or script embed code here.</p></div>',
}

export const defaultRightEmbedHtml: TextData = {
  english: '',
  malayalam: '',
}

export const defaultColumnLayout: TextData = {
  english: 'one',
  malayalam: '',
}

export interface SectionScriptEmbedV3Block extends Block, BlockConfiguration {
  backgroundColor?: TextData
  columnLayout?: TextData
  description?: TextData | null
  descriptionColor?: TextData
  embedHtml?: TextData | null
  embedHtmlRight?: TextData | null
  eyebrow?: TextData | null
  eyebrowColor?: TextData
  overlapTop?: TextData
  roundedTop?: TextData
  textColor?: TextData
  titleOne?: TextData | null
  titleOneColor?: TextData
  titleTwo?: TextData | null
  titleTwoColor?: TextData
}

export const sectionScriptEmbedV3Block: Omit<SectionScriptEmbedV3Block, keyof Block> = {
  eyebrow: {
    english: 'Trusted embed',
    malayalam: 'Trusted embed',
  },
  titleOne: defaultTitle,
  titleTwo: null,
  description: {
    english: 'Use this block only for provider code you trust. Scripts execute on public pages.',
    malayalam: 'Use this block only for provider code you trust. Scripts execute on public pages.',
  },
  embedHtml: defaultEmbedHtml,
  embedHtmlRight: null,
  columnLayout: defaultColumnLayout,
}

export interface SectionScriptEmbedV3Props {
  blockData?: SectionScriptEmbedV3Block
  dispatch?: React.Dispatch<PageBuilderAction>
  editMode?: boolean
  language?: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}
