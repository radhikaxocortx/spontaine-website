import AccordionSection, { type AccordionVariant } from '@/components/Sections/AccordionSection'
import { useStackUp } from '@/hooks/useStackUp'
import { cn } from '@/lib/utils'
import type { Dispatch } from 'react'
import AddLabel from '../../Components/AddLabel'
import type { BlocKFieldInfo } from '../../Components/BlockEditor/BlockEditor'
import { getV3ColorValue } from '../../Components/V3ColorControls'
import V3RoundedSectionBlockFrame from '../../Components/V3RoundedSectionBlockFrame'
import { isV3RoundedTopEnabled, isV3TopOverlapEnabled } from '../../Components/V3RoundedTopToggle'
import type { PageBuilderAction } from '../../hooks/pageBuilderService'
import type { Block, BlockConfiguration, ItemListField, TextData } from '../../page_interfaces'
import type { Language } from '../../Pages/PageBuilder'
import {
  addListItem,
  EditPanelShell,
  emptyText,
  FieldGroup,
  ItemControls,
  moveListItem,
  removeListItem,
  sameText,
  SelectField,
  TextField,
  textOf,
  toItemList,
  updateBlockField,
  updateListItem,
  withLanguageValue,
} from './shared/blockEditing'

export const SPONTAINE_V3_ACCORDION_BLOCK_NAME = 'Spontaine V3 - Accordion'

interface EntryData {
  title: TextData
  line: TextData
  linkLabel: TextData
  linkUrl: TextData
}

interface RowData {
  title: TextData
  /** Optional in-page anchor (without #). A link to #anchor opens this row. */
  anchor: TextData
  /** FAQ answer, shown when the row has no entries. */
  body: TextData
  entries: ItemListField<EntryData>
}

export interface AccordionV3Block extends Block, BlockConfiguration {
  /** 'grouped' (first row opens) or 'faq' (all rows start closed). */
  variant?: TextData
  eyebrow?: TextData
  title?: TextData
  note?: TextData
  linkLabel?: TextData
  linkUrl?: TextData
  rows?: ItemListField<RowData>
  backgroundColor?: TextData
  roundedTop?: TextData
  overlapTop?: TextData
}

const newEntry = (): EntryData => ({
  title: sameText('Use case'),
  line: sameText('One line on what you get.'),
  linkLabel: emptyText,
  linkUrl: emptyText,
})

const newRow = (): RowData => ({
  title: sameText('Row title'),
  anchor: emptyText,
  body: sameText('Answer or summary for this row.'),
  entries: toItemList<EntryData>([]),
})

export const accordionV3Block: Omit<AccordionV3Block, keyof Block | keyof BlockConfiguration> = {
  variant: sameText('grouped'),
  eyebrow: sameText('In action'),
  title: sameText('What does this look like for you?'),
  note: emptyText,
  linkLabel: emptyText,
  linkUrl: emptyText,
  roundedTop: sameText('true'),
  overlapTop: sameText('true'),
  rows: toItemList([
    { ...newRow(), entries: toItemList([newEntry(), newEntry()]) },
    { ...newRow(), entries: toItemList([newEntry()]) },
  ]),
}

interface Properties {
  readonly blockData?: AccordionV3Block
  readonly dispatch?: Dispatch<PageBuilderAction>
  readonly editMode?: boolean
  readonly language?: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

const AccordionV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const bandRef = useStackUp<HTMLElement>({ moveBand: false, enabled: !editMode })
  const variant: AccordionVariant =
    textOf(blockData?.variant, language) === 'faq' ? 'faq' : 'grouped'
  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const linkLabel = textOf(blockData?.linkLabel, language).trim()
  const linkUrl = textOf(blockData?.linkUrl, language).trim()
  const items = (blockData?.rows?.items ?? []).map(({ item }) => ({
    title: textOf(item.title, language),
    anchor: textOf(item.anchor, language),
    body: textOf(item.body, language),
    entries: (item.entries?.items ?? []).map(({ item: entry }) => {
      const entryLinkLabel = textOf(entry.linkLabel, language).trim()
      const entryLinkUrl = textOf(entry.linkUrl, language).trim()

      return {
        title: textOf(entry.title, language),
        line: textOf(entry.line, language),
        link: entryLinkLabel && entryLinkUrl ? { label: entryLinkLabel, href: entryLinkUrl } : null,
      }
    }),
  }))

  return (
    <V3RoundedSectionBlockFrame
      ref={bandRef}
      roundedTop={isV3RoundedTopEnabled(blockData?.roundedTop, language)}
      overlapTop={isV3TopOverlapEnabled(blockData?.overlapTop, language)}
      className={cn(
        'relative w-full py-[104px] lg:py-[128px]',
        !backgroundColor && 'bg-spontaine-surface-paper',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={backgroundColor ? { background: backgroundColor } : undefined}
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <AccordionSection
          idPrefix={`accordion-${blockData?.id ?? 0}`}
          variant={variant}
          eyebrow={textOf(blockData?.eyebrow, language)}
          title={textOf(blockData?.title, language)}
          note={textOf(blockData?.note, language)}
          link={linkLabel && linkUrl ? { label: linkLabel, href: linkUrl } : null}
          items={items}
        />

        {editMode && dispatch != null && blockData != null && (
          <AccordionEditPanel
            blockData={blockData}
            dispatch={dispatch}
            language={language}
            onFieldEdit={onFieldEdit}
          />
        )}
      </div>
    </V3RoundedSectionBlockFrame>
  )
}

interface EditPanelProps {
  readonly blockData: AccordionV3Block
  readonly dispatch: Dispatch<PageBuilderAction>
  readonly language: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

type HeaderField = 'variant' | 'eyebrow' | 'title' | 'note' | 'linkLabel' | 'linkUrl'

const AccordionEditPanel = ({ blockData, dispatch, language, onFieldEdit }: EditPanelProps) => {
  const rows = blockData.rows ?? toItemList<RowData>([])
  const setHeader = (field: HeaderField, value: string) =>
    updateBlockField(
      dispatch,
      blockData.id,
      field,
      withLanguageValue(blockData[field], language, value)
    )
  const setRows = (next: ItemListField<RowData>) =>
    updateBlockField(dispatch, blockData.id, 'rows', next)
  const setRowField = (rowId: number, field: 'title' | 'anchor' | 'body', value: string) =>
    setRows(
      updateListItem(rows, rowId, (row) => ({
        ...row,
        [field]: withLanguageValue(row[field], language, value),
      }))
    )
  const setEntries = (
    rowId: number,
    update: (entries: ItemListField<EntryData>) => ItemListField<EntryData>
  ) => setRows(updateListItem(rows, rowId, (row) => ({ ...row, entries: update(row.entries) })))
  const setEntryField = (rowId: number, entryId: number, field: keyof EntryData, value: string) =>
    setEntries(rowId, (entries) =>
      updateListItem(entries, entryId, (entry) => ({
        ...entry,
        [field]: withLanguageValue(entry[field], language, value),
      }))
    )

  return (
    <EditPanelShell
      blockId={blockData.id}
      dispatch={dispatch}
      language={language}
      roundedTop={blockData.roundedTop}
      overlapTop={blockData.overlapTop}
      backgroundColor={blockData.backgroundColor}
      onFieldEdit={onFieldEdit}
      note='Grouped: rows hold named items and the first row opens. FAQ: rows hold an answer and start closed.'
    >
      <div className='grid gap-3 md:grid-cols-3'>
        <SelectField
          label='Mode'
          value={textOf(blockData.variant, language) || 'grouped'}
          options={[
            { value: 'grouped', label: 'Grouped' },
            { value: 'faq', label: 'FAQ' },
          ]}
          onChange={(value) => setHeader('variant', value)}
        />
        <TextField
          label='Eyebrow'
          value={textOf(blockData.eyebrow, language)}
          onChange={(value) => setHeader('eyebrow', value)}
        />
        <TextField
          label='Title'
          value={textOf(blockData.title, language)}
          onChange={(value) => setHeader('title', value)}
        />
        <TextField
          label='Note under title (optional)'
          value={textOf(blockData.note, language)}
          onChange={(value) => setHeader('note', value)}
        />
        <TextField
          label='Link text (optional)'
          value={textOf(blockData.linkLabel, language)}
          onChange={(value) => setHeader('linkLabel', value)}
        />
        <TextField
          label='Link URL (optional)'
          value={textOf(blockData.linkUrl, language)}
          onChange={(value) => setHeader('linkUrl', value)}
        />
      </div>

      {rows.items.map(({ id: rowId, item: row }, index) => (
        <FieldGroup
          key={rowId}
          title={`Row ${index + 1}`}
        >
          <div className='grid gap-3 md:grid-cols-2'>
            <TextField
              label='Title'
              value={textOf(row.title, language)}
              onChange={(value) => setRowField(rowId, 'title', value)}
            />
            <TextField
              label='Anchor (optional, e.g. protect-margin)'
              value={textOf(row.anchor, language)}
              onChange={(value) => setRowField(rowId, 'anchor', value)}
            />
            <TextField
              className='md:col-span-2'
              multiline
              label='Answer (used when the row has no items)'
              value={textOf(row.body, language)}
              onChange={(value) => setRowField(rowId, 'body', value)}
            />
          </div>

          {row.entries.items.map(({ id: entryId, item: entry }, entryIndex) => (
            <div
              key={entryId}
              className='space-y-3 rounded-lg bg-spontaine-light p-3'
            >
              <div className='grid gap-3 md:grid-cols-2'>
                <TextField
                  label={`Item ${entryIndex + 1} title`}
                  value={textOf(entry.title, language)}
                  onChange={(value) => setEntryField(rowId, entryId, 'title', value)}
                />
                <TextField
                  label='Line'
                  value={textOf(entry.line, language)}
                  onChange={(value) => setEntryField(rowId, entryId, 'line', value)}
                />
                <TextField
                  label='Link text (optional)'
                  value={textOf(entry.linkLabel, language)}
                  onChange={(value) => setEntryField(rowId, entryId, 'linkLabel', value)}
                />
                <TextField
                  label='Link URL (optional)'
                  value={textOf(entry.linkUrl, language)}
                  onChange={(value) => setEntryField(rowId, entryId, 'linkUrl', value)}
                />
              </div>
              <ItemControls
                index={entryIndex}
                count={row.entries.items.length}
                noun='Item'
                onMove={(step) =>
                  setEntries(rowId, (entries) => moveListItem(entries, entryId, step))
                }
                onRemove={() => setEntries(rowId, (entries) => removeListItem(entries, entryId))}
              />
            </div>
          ))}

          <AddLabel
            label='ADD ITEM'
            onClick={() => setEntries(rowId, (entries) => addListItem(entries, newEntry()))}
          />
          <ItemControls
            index={index}
            count={rows.items.length}
            noun='Row'
            onMove={(step) => setRows(moveListItem(rows, rowId, step))}
            onRemove={() => setRows(removeListItem(rows, rowId))}
          />
        </FieldGroup>
      ))}

      <AddLabel
        label='ADD ROW'
        onClick={() => setRows(addListItem(rows, newRow()))}
      />
    </EditPanelShell>
  )
}

export default AccordionV3
