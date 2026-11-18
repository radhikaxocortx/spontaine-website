import { homeTrustItems, TRUST_CENTRE_URL } from '@/components/Home/Trust/SectionTrustV3'
import TrustBand, { type TrustIconName, trustIcons } from '@/components/Sections/TrustBand'
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

export const SPONTAINE_V3_TRUST_BAND_BLOCK_NAME = 'Spontaine V3 - Trust Band'

interface TrustItemData {
  icon: TextData
  title: TextData
  text: TextData
}

export interface TrustBandV3Block extends Block, BlockConfiguration {
  eyebrow?: TextData
  title?: TextData
  items?: ItemListField<TrustItemData>
  extraLine?: TextData
  linkLabel?: TextData
  linkUrl?: TextData
  backgroundColor?: TextData
  roundedTop?: TextData
  overlapTop?: TextData
}

/** New blocks start with the approved homepage claims. */
export const trustBandV3Block: Omit<TrustBandV3Block, keyof Block | keyof BlockConfiguration> = {
  eyebrow: sameText('Where your data lives'),
  title: sameText('Yours alone, and it stays in your region.'),
  items: toItemList(
    homeTrustItems.map((item) => ({
      icon: sameText(item.icon),
      title: sameText(item.title),
      text: sameText(item.text),
    }))
  ),
  extraLine: emptyText,
  linkLabel: sameText('Visit the Trust Centre'),
  linkUrl: sameText(TRUST_CENTRE_URL),
  roundedTop: sameText('true'),
  overlapTop: sameText('true'),
}

const iconOptions = (Object.keys(trustIcons) as TrustIconName[]).map((name) => ({
  value: name,
  label: name,
}))

const isIconName = (value: string): value is TrustIconName => value in trustIcons

interface Properties {
  readonly blockData?: TrustBandV3Block
  readonly dispatch?: Dispatch<PageBuilderAction>
  readonly editMode?: boolean
  readonly language?: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

type TextFieldName = 'eyebrow' | 'title' | 'extraLine' | 'linkLabel' | 'linkUrl'

const TrustBandV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const bandRef = useStackUp<HTMLElement>({ moveBand: false, enabled: !editMode })
  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const linkLabel = textOf(blockData?.linkLabel, language).trim()
  const linkUrl = textOf(blockData?.linkUrl, language).trim()
  const items = (blockData?.items?.items ?? []).map(({ item }) => {
    const icon = textOf(item.icon, language)

    return {
      icon: isIconName(icon) ? icon : ('shield-check' as const),
      title: textOf(item.title, language),
      text: textOf(item.text, language),
    }
  })

  return (
    <V3RoundedSectionBlockFrame
      ref={bandRef}
      roundedTop={isV3RoundedTopEnabled(blockData?.roundedTop, language)}
      overlapTop={isV3TopOverlapEnabled(blockData?.overlapTop, language)}
      className={cn(
        'relative w-full overflow-hidden pb-[120px] pt-[105px] md:pt-[130px] lg:pb-[150px]',
        !backgroundColor && 'bg-spontaine-surface-ink-deep',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={backgroundColor ? { background: backgroundColor } : undefined}
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <TrustBand
          titleId={`trust-band-${blockData?.id ?? 0}-title`}
          eyebrow={textOf(blockData?.eyebrow, language)}
          title={textOf(blockData?.title, language)}
          items={items}
          extraLine={textOf(blockData?.extraLine, language)}
          link={linkLabel && linkUrl ? { label: linkLabel, href: linkUrl } : null}
        />

        {editMode && dispatch != null && blockData != null && (
          <TrustBandEditPanel
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
  readonly blockData: TrustBandV3Block
  readonly dispatch: Dispatch<PageBuilderAction>
  readonly language: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

const TrustBandEditPanel = ({ blockData, dispatch, language, onFieldEdit }: EditPanelProps) => {
  const items = blockData.items ?? toItemList<TrustItemData>([])
  const setField = (field: TextFieldName, value: string) =>
    updateBlockField(
      dispatch,
      blockData.id,
      field,
      withLanguageValue(blockData[field], language, value)
    )
  const setItems = (next: ItemListField<TrustItemData>) =>
    updateBlockField(dispatch, blockData.id, 'items', next)
  const setItemField = (id: number, field: keyof TrustItemData, value: string) =>
    setItems(
      updateListItem(items, id, (item) => ({
        ...item,
        [field]: withLanguageValue(item[field], language, value),
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
      note='Security wording needs sign-off. Never shorten a claim so its qualifier disappears.'
    >
      <div className='grid gap-3 md:grid-cols-2'>
        <TextField
          label='Eyebrow'
          value={textOf(blockData.eyebrow, language)}
          onChange={(value) => setField('eyebrow', value)}
        />
        <TextField
          label='Title'
          value={textOf(blockData.title, language)}
          onChange={(value) => setField('title', value)}
        />
        <TextField
          className='md:col-span-2'
          multiline
          label='Extra line under the items (optional)'
          value={textOf(blockData.extraLine, language)}
          onChange={(value) => setField('extraLine', value)}
        />
        <TextField
          label='Link text'
          value={textOf(blockData.linkLabel, language)}
          onChange={(value) => setField('linkLabel', value)}
        />
        <TextField
          label='Link URL'
          value={textOf(blockData.linkUrl, language)}
          onChange={(value) => setField('linkUrl', value)}
        />
      </div>

      {items.items.map(({ id, item }, index) => (
        <FieldGroup
          key={id}
          title={`Item ${index + 1}`}
        >
          <div className='grid gap-3 md:grid-cols-[1fr_2fr]'>
            <SelectField
              label='Icon'
              value={textOf(item.icon, language) || 'shield-check'}
              options={iconOptions}
              onChange={(value) => setItemField(id, 'icon', value)}
            />
            <TextField
              label='Title'
              value={textOf(item.title, language)}
              onChange={(value) => setItemField(id, 'title', value)}
            />
            <TextField
              className='md:col-span-2'
              multiline
              label='Text'
              value={textOf(item.text, language)}
              onChange={(value) => setItemField(id, 'text', value)}
            />
          </div>
          <ItemControls
            index={index}
            count={items.items.length}
            noun='Item'
            onMove={(step) => setItems(moveListItem(items, id, step))}
            onRemove={() => setItems(removeListItem(items, id))}
          />
        </FieldGroup>
      ))}

      <AddLabel
        label='ADD ITEM'
        onClick={() =>
          setItems(
            addListItem(items, {
              icon: sameText('shield-check'),
              title: sameText('Title'),
              text: sameText('Approved claim wording.'),
            })
          )
        }
      />
    </EditPanelShell>
  )
}

export default TrustBandV3
