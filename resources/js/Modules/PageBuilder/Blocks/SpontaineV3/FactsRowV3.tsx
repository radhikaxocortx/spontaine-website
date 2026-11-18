import FactsRow from '@/components/Sections/FactsRow'
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
  TextField,
  textOf,
  toItemList,
  updateBlockField,
  updateListItem,
  withLanguageValue,
} from './shared/blockEditing'

export const SPONTAINE_V3_FACTS_ROW_BLOCK_NAME = 'Spontaine V3 - Facts Row'

interface FactData {
  value: TextData
  label: TextData
  linkLabel: TextData
  linkUrl: TextData
}

export interface FactsRowV3Block extends Block, BlockConfiguration {
  eyebrow?: TextData
  facts?: ItemListField<FactData>
  backgroundColor?: TextData
  roundedTop?: TextData
  overlapTop?: TextData
}

const newFact = (): FactData => ({
  value: sameText('Value'),
  label: sameText('What the value means for the reader.'),
  linkLabel: emptyText,
  linkUrl: emptyText,
})

export const factsRowV3Block: Omit<FactsRowV3Block, keyof Block | keyof BlockConfiguration> = {
  eyebrow: sameText('What you can count on'),
  roundedTop: sameText('true'),
  overlapTop: sameText('true'),
  facts: toItemList([newFact(), newFact(), newFact(), newFact()]),
}

interface Properties {
  readonly blockData?: FactsRowV3Block
  readonly dispatch?: Dispatch<PageBuilderAction>
  readonly editMode?: boolean
  readonly language?: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

const FactsRowV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const bandRef = useStackUp<HTMLElement>({ moveBand: false, enabled: !editMode })
  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const facts = (blockData?.facts?.items ?? []).map(({ item }) => {
    const linkLabel = textOf(item.linkLabel, language).trim()
    const linkUrl = textOf(item.linkUrl, language).trim()

    return {
      value: textOf(item.value, language),
      label: textOf(item.label, language),
      link: linkLabel && linkUrl ? { label: linkLabel, href: linkUrl } : null,
    }
  })

  return (
    <V3RoundedSectionBlockFrame
      ref={bandRef}
      roundedTop={isV3RoundedTopEnabled(blockData?.roundedTop, language)}
      overlapTop={isV3TopOverlapEnabled(blockData?.overlapTop, language)}
      className={cn(
        'relative w-full overflow-hidden py-[104px] lg:py-[128px]',
        !backgroundColor && 'bg-spontaine-surface-ice',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={backgroundColor ? { background: backgroundColor } : undefined}
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <FactsRow
          eyebrow={textOf(blockData?.eyebrow, language)}
          facts={facts}
        />

        {editMode && dispatch != null && blockData != null && (
          <FactsRowEditPanel
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
  readonly blockData: FactsRowV3Block
  readonly dispatch: Dispatch<PageBuilderAction>
  readonly language: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

const FactsRowEditPanel = ({ blockData, dispatch, language, onFieldEdit }: EditPanelProps) => {
  const facts = blockData.facts ?? toItemList<FactData>([])
  const setFacts = (next: ItemListField<FactData>) =>
    updateBlockField(dispatch, blockData.id, 'facts', next)
  const setFactField = (id: number, field: keyof FactData, value: string) =>
    setFacts(
      updateListItem(facts, id, (item) => ({
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
      note='Only state facts that are approved claims.'
    >
      <TextField
        className='max-w-[420px]'
        label='Eyebrow'
        value={textOf(blockData.eyebrow, language)}
        onChange={(value) =>
          updateBlockField(
            dispatch,
            blockData.id,
            'eyebrow',
            withLanguageValue(blockData.eyebrow, language, value)
          )
        }
      />

      {facts.items.map(({ id, item }, index) => (
        <FieldGroup
          key={id}
          title={`Fact ${index + 1}`}
        >
          <div className='grid gap-3 md:grid-cols-2'>
            <TextField
              label='Value'
              value={textOf(item.value, language)}
              onChange={(value) => setFactField(id, 'value', value)}
            />
            <TextField
              label='Label'
              value={textOf(item.label, language)}
              onChange={(value) => setFactField(id, 'label', value)}
            />
            <TextField
              label='Link text (optional)'
              value={textOf(item.linkLabel, language)}
              onChange={(value) => setFactField(id, 'linkLabel', value)}
            />
            <TextField
              label='Link URL (optional)'
              value={textOf(item.linkUrl, language)}
              onChange={(value) => setFactField(id, 'linkUrl', value)}
            />
          </div>
          <ItemControls
            index={index}
            count={facts.items.length}
            noun='Fact'
            onMove={(step) => setFacts(moveListItem(facts, id, step))}
            onRemove={() => setFacts(removeListItem(facts, id))}
          />
        </FieldGroup>
      ))}

      <AddLabel
        label='ADD FACT'
        onClick={() => setFacts(addListItem(facts, newFact()))}
      />
    </EditPanelShell>
  )
}

export default FactsRowV3
