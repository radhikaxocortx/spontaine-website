import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import type {
  BlocKFieldInfo,
  BlockFieldValues,
} from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import { displayText } from '@/Modules/PageBuilder/Components/Localization'
import V3RoundedTopToggle from '@/Modules/PageBuilder/Components/V3RoundedTopToggle'
import type { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import type { ItemListField, TextData } from '@/Modules/PageBuilder/page_interfaces'
import type { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import type { Dispatch } from 'react'
import type { SectionSolutionsTabsV3Block, SolutionTabData } from './types'
import {
  addPoint,
  addTab,
  moveTab,
  type PointTextField,
  removePoint,
  removeTab,
  setPointField,
  setTabField,
  type TabTextField,
  withLanguageValue,
} from './utils'

interface Properties {
  readonly blockData: SectionSolutionsTabsV3Block
  readonly dispatch: Dispatch<PageBuilderAction>
  readonly language: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

const labelClassName =
  'mb-1 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-spontaine-gray-cool'
const inputClassName =
  'w-full rounded-lg border border-spontaine-border-medium bg-spontaine-light px-3 py-2 font-body text-sm text-spontaine-text-primary focus:border-spontaine-gray-soft focus:outline-none focus:ring-0'

const emptyTabs: ItemListField<SolutionTabData> = { lastUUID: 0, items: [] }

const tabFields: ReadonlyArray<{ field: TabTextField; label: string; multiline?: boolean }> = [
  { field: 'label', label: 'Tab label' },
  { field: 'tag', label: 'Tag (e.g. Platform, Industry)' },
  { field: 'headline', label: 'Headline (a new line controls the wrap)', multiline: true },
  { field: 'linkLabel', label: 'Link text (optional)' },
  { field: 'linkUrl', label: 'Link URL (optional)' },
]

const SectionSolutionsTabsV3EditPanel = ({
  blockData,
  dispatch,
  language,
  onFieldEdit,
}: Properties) => {
  const tabs = blockData.tabs ?? emptyTabs
  const value = (text?: TextData) => (displayText(text, language) ?? '').toString()

  const updateField = (fieldName: string, fieldValue: BlockFieldValues) =>
    dispatch({ action: 'UPDATE_BLOCK_FIELD', blockId: blockData.id, fieldName, fieldValue })

  const updateTabs = (next: ItemListField<SolutionTabData>) =>
    updateField('tabs', next as unknown as BlockFieldValues)

  const onTabField = (tabId: number, field: TabTextField, next: string) =>
    updateTabs(setTabField(tabs, tabId, field, language, next))

  const onPointField = (tabId: number, pointId: number, field: PointTextField, next: string) =>
    updateTabs(setPointField(tabs, tabId, pointId, field, language, next))

  return (
    <div className='mt-12 space-y-6 rounded-lg bg-spontaine-surface-paper p-5 shadow-surface'>
      <div className='flex flex-wrap items-center gap-x-6 gap-y-3'>
        <V3RoundedTopToggle
          blockId={blockData.id}
          dispatch={dispatch}
          language={language}
          overlapTop={blockData.overlapTop}
          roundedTop={blockData.roundedTop}
        />
        {onFieldEdit != null && (
          <EditLabel
            label='Edit Background Color'
            onClick={() =>
              onFieldEdit({
                action: 'UPDATE',
                field: 'backgroundColor',
                fieldType: 'text',
                oldValue: blockData.backgroundColor ?? { english: '', malayalam: '' },
              })
            }
          />
        )}
        <p className='m-0 font-body text-xs text-spontaine-text-secondary'>
          Autoplay is off while editing. On the live page tabs rotate every 12 seconds on desktop.
        </p>
      </div>

      <div className='max-w-[420px]'>
        <label className={labelClassName}>Eyebrow</label>
        <input
          className={inputClassName}
          value={value(blockData.eyebrow)}
          onChange={(event) =>
            updateField(
              'eyebrow',
              withLanguageValue(
                blockData.eyebrow ?? { english: '', malayalam: '' },
                language,
                event.target.value
              )
            )
          }
        />
      </div>

      {tabs.items.map(({ id: tabId, item: tab }, index) => (
        <fieldset
          key={tabId}
          className='space-y-4 rounded-lg border border-spontaine-border-medium p-4'
        >
          <legend className='px-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-spontaine-text-primary'>
            Tab {index + 1}
          </legend>

          <div className='grid gap-3 md:grid-cols-2'>
            {tabFields.map(({ field, label, multiline }) => (
              <div
                key={field}
                className={multiline ? 'md:col-span-2' : undefined}
              >
                <label className={labelClassName}>{label}</label>
                {multiline ? (
                  <textarea
                    rows={2}
                    className={inputClassName}
                    value={value(tab[field])}
                    onChange={(event) => onTabField(tabId, field, event.target.value)}
                  />
                ) : (
                  <input
                    className={inputClassName}
                    value={value(tab[field])}
                    onChange={(event) => onTabField(tabId, field, event.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className='space-y-3'>
            <p className={labelClassName}>Outcomes</p>
            {tab.points.items.map(({ id: pointId, item: point }) => (
              <div
                key={pointId}
                className='grid gap-2 md:grid-cols-[1fr_2fr_auto] md:items-center'
              >
                <input
                  aria-label='Outcome title'
                  className={inputClassName}
                  value={value(point.title)}
                  onChange={(event) => onPointField(tabId, pointId, 'title', event.target.value)}
                />
                <input
                  aria-label='Outcome line'
                  className={inputClassName}
                  value={value(point.line)}
                  onChange={(event) => onPointField(tabId, pointId, 'line', event.target.value)}
                />
                <EditLabel
                  label='Remove'
                  onClick={() => updateTabs(removePoint(tabs, tabId, pointId))}
                />
              </div>
            ))}
            <AddLabel
              label='ADD OUTCOME'
              onClick={() => updateTabs(addPoint(tabs, tabId))}
            />
          </div>

          <div className='flex flex-wrap justify-end gap-3'>
            {index > 0 && (
              <EditLabel
                label='Move Up'
                onClick={() => updateTabs(moveTab(tabs, tabId, -1))}
              />
            )}
            {index < tabs.items.length - 1 && (
              <EditLabel
                label='Move Down'
                onClick={() => updateTabs(moveTab(tabs, tabId, 1))}
              />
            )}
            <EditLabel
              label='Remove Tab'
              onClick={() => updateTabs(removeTab(tabs, tabId))}
            />
          </div>
        </fieldset>
      ))}

      <AddLabel
        label='ADD TAB'
        onClick={() => updateTabs(addTab(tabs))}
      />
    </div>
  )
}

export default SectionSolutionsTabsV3EditPanel
