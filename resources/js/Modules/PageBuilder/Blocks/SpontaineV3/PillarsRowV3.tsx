import PillarsRow from '@/components/Sections/PillarsRow'
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

export const SPONTAINE_V3_PILLARS_ROW_BLOCK_NAME = 'Spontaine V3 - Pillars Row'

interface PillarData {
  title: TextData
  line: TextData
  /** "#anchor" jumps down the page, a path links out. Leave empty for no link. */
  link: TextData
}

export interface PillarsRowV3Block extends Block, BlockConfiguration {
  eyebrow?: TextData
  title?: TextData
  /** 'plain' (default) or 'glass': a frosted panel on the glass wash, for use under a faded hero. */
  surface?: TextData
  pillars?: ItemListField<PillarData>
  backgroundColor?: TextData
  roundedTop?: TextData
  overlapTop?: TextData
}

const newPillar = (): PillarData => ({
  title: sameText('Outcome'),
  line: sameText('One line on what changes for the reader.'),
  link: sameText(''),
})

export const pillarsRowV3Block: Omit<PillarsRowV3Block, keyof Block | keyof BlockConfiguration> = {
  eyebrow: sameText('What changes'),
  title: sameText('Three outcomes, on one set of numbers.'),
  surface: sameText('plain'),
  pillars: toItemList([newPillar(), newPillar(), newPillar()]),
}

interface Properties {
  readonly blockData?: PillarsRowV3Block
  readonly dispatch?: Dispatch<PageBuilderAction>
  readonly editMode?: boolean
  readonly language?: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

const PillarsRowV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const bandRef = useStackUp<HTMLElement>({ moveBand: false, enabled: !editMode })
  const isGlass = textOf(blockData?.surface, language) === 'glass'
  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const pillars = (blockData?.pillars?.items ?? []).map(({ item }) => ({
    title: textOf(item.title, language),
    line: textOf(item.line, language),
    href: textOf(item.link, language).trim() || undefined,
  }))

  return (
    <V3RoundedSectionBlockFrame
      ref={bandRef}
      roundedTop={isV3RoundedTopEnabled(blockData?.roundedTop, language)}
      overlapTop={isV3TopOverlapEnabled(blockData?.overlapTop, language)}
      className={cn(
        'relative w-full overflow-hidden',
        isGlass ? 'pb-[120px] pt-2 md:pb-[150px]' : 'py-[104px] lg:py-[128px]',
        !backgroundColor && (isGlass ? 'bg-glass-wash' : 'bg-spontaine-surface-paper'),
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={backgroundColor ? { background: backgroundColor } : undefined}
    >
      <div className='relative mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <PillarsRow
          eyebrow={textOf(blockData?.eyebrow, language)}
          title={textOf(blockData?.title, language)}
          pillars={pillars}
          glass={isGlass}
        />

        {editMode && dispatch != null && blockData != null && (
          <PillarsRowEditPanel
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
  readonly blockData: PillarsRowV3Block
  readonly dispatch: Dispatch<PageBuilderAction>
  readonly language: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

const PillarsRowEditPanel = ({ blockData, dispatch, language, onFieldEdit }: EditPanelProps) => {
  const pillars = blockData.pillars ?? toItemList<PillarData>([])
  const setField = (field: 'eyebrow' | 'title' | 'surface', value: string) =>
    updateBlockField(
      dispatch,
      blockData.id,
      field,
      withLanguageValue(blockData[field], language, value)
    )
  const setPillars = (next: ItemListField<PillarData>) =>
    updateBlockField(dispatch, blockData.id, 'pillars', next)
  const setPillarField = (id: number, field: keyof PillarData, value: string) =>
    setPillars(
      updateListItem(pillars, id, (item) => ({
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
      note='Glass puts the pillars on a frosted panel over the glass wash: use it straight after a Hero Large set to "Fade Into Next Section".'
    >
      <div className='grid gap-3 md:grid-cols-3'>
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
        <SelectField
          label='Surface'
          value={textOf(blockData.surface, language) || 'plain'}
          options={[
            { value: 'plain', label: 'Plain' },
            { value: 'glass', label: 'Glass over wash' },
          ]}
          onChange={(value) => setField('surface', value)}
        />
      </div>

      {pillars.items.map(({ id, item }, index) => (
        <FieldGroup
          key={id}
          title={`Pillar ${index + 1}`}
        >
          <div className='grid gap-3 md:grid-cols-2'>
            <TextField
              label='Title'
              value={textOf(item.title, language)}
              onChange={(value) => setPillarField(id, 'title', value)}
            />
            <TextField
              label='Link (#anchor or /path, optional)'
              value={textOf(item.link, language)}
              onChange={(value) => setPillarField(id, 'link', value)}
            />
            <TextField
              className='md:col-span-2'
              label='Line'
              value={textOf(item.line, language)}
              onChange={(value) => setPillarField(id, 'line', value)}
            />
          </div>
          <ItemControls
            index={index}
            count={pillars.items.length}
            noun='Pillar'
            onMove={(step) => setPillars(moveListItem(pillars, id, step))}
            onRemove={() => setPillars(removeListItem(pillars, id))}
          />
        </FieldGroup>
      ))}

      <AddLabel
        label='ADD PILLAR'
        onClick={() => setPillars(addListItem(pillars, newPillar()))}
      />
    </EditPanelShell>
  )
}

export default PillarsRowV3
