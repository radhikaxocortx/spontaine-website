import { solutionsEyebrow, solutionTabs } from '@/components/Solutions/solutionsContent'
import type { Block, BlockConfiguration, ItemListField, TextData } from '../../../page_interfaces'

export const SPONTAINE_V3_SOLUTIONS_TABS_BLOCK_NAME = 'Spontaine V3 - Solutions Tabs'

export interface SolutionPointData {
  title: TextData
  line: TextData
}

export interface SolutionTabData {
  label: TextData
  tag: TextData
  /** A line break in the text controls where the headline wraps. */
  headline: TextData
  points: ItemListField<SolutionPointData>
  linkLabel: TextData
  linkUrl: TextData
}

export interface SectionSolutionsTabsV3Block extends Block, BlockConfiguration {
  eyebrow?: TextData
  tabs?: ItemListField<SolutionTabData>
  backgroundColor?: TextData
  textColor?: TextData
  roundedTop?: TextData
  overlapTop?: TextData
}

export const sameText = (value: string): TextData => ({ english: value, malayalam: value })

export const createDefaultPoint = (): SolutionPointData => ({
  title: sameText('Outcome title'),
  line: sameText('One line on what changes for the reader.'),
})

export const createDefaultTab = (): SolutionTabData => ({
  label: sameText('New tab'),
  tag: sameText('Industry'),
  headline: sameText('A short headline for this tab.'),
  points: {
    lastUUID: 3,
    items: [1, 2, 3].map((id) => ({ id, item: createDefaultPoint() })),
  },
  linkLabel: sameText(''),
  linkUrl: sameText(''),
})

/** New blocks start with the homepage content. */
export const sectionSolutionsTabsV3Block: Omit<
  SectionSolutionsTabsV3Block,
  keyof Block | keyof BlockConfiguration
> = {
  eyebrow: sameText(solutionsEyebrow),
  roundedTop: sameText('true'),
  overlapTop: sameText('true'),
  tabs: {
    lastUUID: solutionTabs.length,
    items: solutionTabs.map((tab, index) => ({
      id: index + 1,
      item: {
        label: sameText(tab.label),
        tag: sameText(tab.tag),
        headline: sameText(tab.headline),
        points: {
          lastUUID: tab.points.length,
          items: tab.points.map((point, pointIndex) => ({
            id: pointIndex + 1,
            item: { title: sameText(point.title), line: sameText(point.line) },
          })),
        },
        linkLabel: sameText(tab.link?.label ?? ''),
        linkUrl: sameText(tab.link?.href ?? ''),
      },
    })),
  },
}
