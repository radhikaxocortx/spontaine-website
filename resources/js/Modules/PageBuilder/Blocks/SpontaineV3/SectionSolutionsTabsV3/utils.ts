import type { SolutionTab } from '@/components/Solutions/SolutionsTabs'
import { displayText } from '@/Modules/PageBuilder/Components/Localization'
import type { ItemListField, TextData } from '@/Modules/PageBuilder/page_interfaces'
import type { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import { createDefaultPoint, createDefaultTab, type SolutionTabData } from './types'

export type TabTextField = 'label' | 'tag' | 'headline' | 'linkLabel' | 'linkUrl'
export type PointTextField = 'title' | 'line'

const text = (value: TextData | undefined, language: Language) =>
  (displayText(value, language) ?? '').toString()

/** Block data (per-language text) to the plain tabs the component renders. */
export const toSolutionTabs = (
  tabs: ItemListField<SolutionTabData> | undefined,
  language: Language
): SolutionTab[] =>
  (tabs?.items ?? []).map(({ id, item }) => {
    const linkLabel = text(item.linkLabel, language).trim()
    const linkUrl = text(item.linkUrl, language).trim()

    return {
      id: `tab-${id}`,
      label: text(item.label, language),
      tag: text(item.tag, language),
      headline: text(item.headline, language),
      points: (item.points?.items ?? []).map((point) => ({
        title: text(point.item.title, language),
        line: text(point.item.line, language),
      })),
      link: linkLabel && linkUrl ? { label: linkLabel, href: linkUrl } : null,
    }
  })

export const withLanguageValue = (value: TextData, language: Language, next: string): TextData => ({
  english: language === 'en' ? next : value.english,
  malayalam: language === 'mal' ? next : value.malayalam,
})

const mapTab = (
  tabs: ItemListField<SolutionTabData>,
  tabId: number,
  update: (tab: SolutionTabData) => SolutionTabData
): ItemListField<SolutionTabData> => ({
  ...tabs,
  items: tabs.items.map((entry) =>
    entry.id === tabId ? { ...entry, item: update(entry.item) } : entry
  ),
})

export const setTabField = (
  tabs: ItemListField<SolutionTabData>,
  tabId: number,
  field: TabTextField,
  language: Language,
  value: string
) =>
  mapTab(tabs, tabId, (tab) => ({
    ...tab,
    [field]: withLanguageValue(tab[field], language, value),
  }))

export const setPointField = (
  tabs: ItemListField<SolutionTabData>,
  tabId: number,
  pointId: number,
  field: PointTextField,
  language: Language,
  value: string
) =>
  mapTab(tabs, tabId, (tab) => ({
    ...tab,
    points: {
      ...tab.points,
      items: tab.points.items.map((point) =>
        point.id === pointId
          ? {
              ...point,
              item: {
                ...point.item,
                [field]: withLanguageValue(point.item[field], language, value),
              },
            }
          : point
      ),
    },
  }))

export const addTab = (tabs: ItemListField<SolutionTabData>): ItemListField<SolutionTabData> => ({
  lastUUID: tabs.lastUUID + 1,
  items: [...tabs.items, { id: tabs.lastUUID + 1, item: createDefaultTab() }],
})

export const removeTab = (tabs: ItemListField<SolutionTabData>, tabId: number) => ({
  ...tabs,
  items: tabs.items.filter((entry) => entry.id !== tabId),
})

export const moveTab = (tabs: ItemListField<SolutionTabData>, tabId: number, step: -1 | 1) => {
  const index = tabs.items.findIndex((entry) => entry.id === tabId)
  const target = index + step

  if (index < 0 || target < 0 || target >= tabs.items.length) {
    return tabs
  }

  const items = [...tabs.items]
  ;[items[index], items[target]] = [items[target], items[index]]

  return { ...tabs, items }
}

export const addPoint = (tabs: ItemListField<SolutionTabData>, tabId: number) =>
  mapTab(tabs, tabId, (tab) => ({
    ...tab,
    points: {
      lastUUID: tab.points.lastUUID + 1,
      items: [...tab.points.items, { id: tab.points.lastUUID + 1, item: createDefaultPoint() }],
    },
  }))

export const removePoint = (tabs: ItemListField<SolutionTabData>, tabId: number, pointId: number) =>
  mapTab(tabs, tabId, (tab) => ({
    ...tab,
    points: { ...tab.points, items: tab.points.items.filter((point) => point.id !== pointId) },
  }))
