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
import type { Dispatch, ReactNode } from 'react'

/* ---------- Text helpers ---------- */

export const sameText = (value: string): TextData => ({ english: value, malayalam: value })

export const emptyText: TextData = { english: '', malayalam: '' }

export const textOf = (value: TextData | null | undefined, language: Language) =>
  (displayText(value ?? undefined, language) ?? '').toString()

export const withLanguageValue = (
  value: TextData | null | undefined,
  language: Language,
  next: string
): TextData => ({
  english: language === 'en' ? next : (value?.english ?? ''),
  malayalam: language === 'mal' ? next : (value?.malayalam ?? ''),
})

/* ---------- Item list helpers (immutable) ---------- */

export const updateListItem = <T,>(
  list: ItemListField<T>,
  id: number,
  update: (item: T) => T
): ItemListField<T> => ({
  ...list,
  items: list.items.map((entry) =>
    entry.id === id ? { ...entry, item: update(entry.item) } : entry
  ),
})

export const addListItem = <T,>(list: ItemListField<T>, item: T): ItemListField<T> => ({
  lastUUID: list.lastUUID + 1,
  items: [...list.items, { id: list.lastUUID + 1, item }],
})

export const removeListItem = <T,>(list: ItemListField<T>, id: number): ItemListField<T> => ({
  ...list,
  items: list.items.filter((entry) => entry.id !== id),
})

export const moveListItem = <T,>(list: ItemListField<T>, id: number, step: -1 | 1) => {
  const index = list.items.findIndex((entry) => entry.id === id)
  const target = index + step

  if (index < 0 || target < 0 || target >= list.items.length) {
    return list
  }

  const items = [...list.items]
  ;[items[index], items[target]] = [items[target], items[index]]

  return { ...list, items }
}

export const toItemList = <T,>(items: readonly T[]): ItemListField<T> => ({
  lastUUID: items.length,
  items: items.map((item, index) => ({ id: index + 1, item })),
})

/* ---------- Dispatch helper ---------- */

export const updateBlockField = (
  dispatch: Dispatch<PageBuilderAction>,
  blockId: number,
  fieldName: string,
  fieldValue: unknown
) =>
  dispatch({
    action: 'UPDATE_BLOCK_FIELD',
    blockId,
    fieldName,
    fieldValue: fieldValue as BlockFieldValues,
  })

/* ---------- Form fields ---------- */

const labelClassName =
  'mb-1 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-spontaine-gray-cool'
const inputClassName =
  'w-full rounded-lg border border-spontaine-border-medium bg-spontaine-light px-3 py-2 font-body text-sm text-spontaine-text-primary focus:border-spontaine-gray-soft focus:outline-none focus:ring-0'

interface TextFieldProps {
  readonly label: string
  readonly value: string
  readonly onChange: (next: string) => void
  readonly multiline?: boolean
  readonly className?: string
}

export const TextField = ({
  label,
  value,
  onChange,
  multiline = false,
  className,
}: TextFieldProps) => (
  <label className={['block', className].filter(Boolean).join(' ')}>
    <span className={labelClassName}>{label}</span>
    {multiline ? (
      <textarea
        rows={3}
        className={inputClassName}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    ) : (
      <input
        className={inputClassName}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    )}
  </label>
)

interface SelectFieldProps {
  readonly label: string
  readonly value: string
  readonly options: ReadonlyArray<{ value: string; label: string }>
  readonly onChange: (next: string) => void
}

export const SelectField = ({ label, value, options, onChange }: SelectFieldProps) => (
  <label className='block'>
    <span className={labelClassName}>{label}</span>
    <select
      className={inputClassName}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  </label>
)

export const FieldGroup = ({
  title,
  children,
}: {
  readonly title: string
  readonly children: ReactNode
}) => (
  <fieldset className='space-y-3 rounded-lg border border-spontaine-border-medium p-4'>
    <legend className='px-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-spontaine-text-primary'>
      {title}
    </legend>
    {children}
  </fieldset>
)

interface ItemControlsProps {
  readonly index: number
  readonly count: number
  readonly noun: string
  readonly onMove: (step: -1 | 1) => void
  readonly onRemove: () => void
}

export const ItemControls = ({ index, count, noun, onMove, onRemove }: ItemControlsProps) => (
  <div className='flex flex-wrap justify-end gap-3'>
    {index > 0 && (
      <EditLabel
        label='Move Up'
        onClick={() => onMove(-1)}
      />
    )}
    {index < count - 1 && (
      <EditLabel
        label='Move Down'
        onClick={() => onMove(1)}
      />
    )}
    <EditLabel
      label={`Remove ${noun}`}
      onClick={onRemove}
    />
  </div>
)

/* ---------- Edit panel shell: section shape + background colour ---------- */

interface EditPanelShellProps {
  readonly blockId: number
  readonly dispatch: Dispatch<PageBuilderAction>
  readonly language: Language
  readonly roundedTop?: TextData
  readonly overlapTop?: TextData
  readonly backgroundColor?: TextData
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
  readonly note?: string
  readonly children: ReactNode
}

export const EditPanelShell = ({
  blockId,
  dispatch,
  language,
  roundedTop,
  overlapTop,
  backgroundColor,
  onFieldEdit,
  note,
  children,
}: EditPanelShellProps) => (
  <div className='mt-12 space-y-6 rounded-lg bg-spontaine-surface-paper p-5 text-spontaine-text-primary shadow-surface'>
    <div className='flex flex-wrap items-center gap-x-6 gap-y-3'>
      <V3RoundedTopToggle
        blockId={blockId}
        dispatch={dispatch}
        language={language}
        overlapTop={overlapTop}
        roundedTop={roundedTop}
      />
      {onFieldEdit != null && (
        <EditLabel
          label='Edit Background Color'
          onClick={() =>
            onFieldEdit({
              action: 'UPDATE',
              field: 'backgroundColor',
              fieldType: 'text',
              oldValue: backgroundColor ?? emptyText,
            })
          }
        />
      )}
      {note && <p className='m-0 font-body text-xs text-spontaine-text-secondary'>{note}</p>}
    </div>
    {children}
  </div>
)
