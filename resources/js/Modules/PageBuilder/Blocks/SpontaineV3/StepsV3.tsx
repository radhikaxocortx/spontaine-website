import PathSteps from '@/components/Sections/PathSteps'
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

export const SPONTAINE_V3_STEPS_BLOCK_NAME = 'Spontaine V3 - Steps'

interface StepData {
  label: TextData
  text: TextData
  detail?: TextData
}

export interface StepsV3Block extends Block, BlockConfiguration {
  eyebrow?: TextData
  titleOne?: TextData
  titleTwo?: TextData
  steps?: ItemListField<StepData>
  note?: TextData
  body?: TextData
  ctaLabel?: TextData
  calendarUrl?: TextData
  linkLabel?: TextData
  linkUrl?: TextData
  backgroundColor?: TextData
  roundedTop?: TextData
  overlapTop?: TextData
}

export const stepsV3Block: Omit<StepsV3Block, keyof Block | keyof BlockConfiguration> = {
  eyebrow: sameText('How it starts'),
  titleOne: sameText('Start with one question.'),
  titleTwo: sameText('The results are yours either way.'),
  steps: toItemList([
    {
      label: sameText('Week 1'),
      text: sameText('Agree the question and connect the systems that hold the answer.'),
    },
    {
      label: sameText('Weeks 2 and 3'),
      text: sameText('Agree what the numbers mean and build it with your team.'),
    },
    {
      label: sameText('Week 4'),
      text: sameText(
        'The answer refreshes on its own. Your team can change it and ask the next one.'
      ),
    },
  ]),
  note: sameText('Across several companies or sites, allow four to eight weeks.'),
  body: sameText(
    'Fixed scope and fixed fee, agreed before we start. If you stop, the data and results stay yours. To keep using what we built, a smaller annual licence keeps it running.'
  ),
  ctaLabel: sameText('Book the working session'),
  calendarUrl: emptyText,
  linkLabel: emptyText,
  linkUrl: emptyText,
  roundedTop: sameText('true'),
  overlapTop: sameText('true'),
}

interface Properties {
  readonly blockData?: StepsV3Block
  readonly dispatch?: Dispatch<PageBuilderAction>
  readonly editMode?: boolean
  readonly language?: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

type TextFieldName =
  | 'eyebrow'
  | 'titleOne'
  | 'titleTwo'
  | 'note'
  | 'body'
  | 'ctaLabel'
  | 'calendarUrl'
  | 'linkLabel'
  | 'linkUrl'

const StepsV3 = ({
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
  const steps = (blockData?.steps?.items ?? []).map(({ item }) => ({
    label: textOf(item.label, language),
    text: textOf(item.text, language),
    detail: textOf(item.detail, language).trim() || undefined,
  }))

  return (
    <V3RoundedSectionBlockFrame
      ref={bandRef}
      roundedTop={isV3RoundedTopEnabled(blockData?.roundedTop, language)}
      overlapTop={isV3TopOverlapEnabled(blockData?.overlapTop, language)}
      className={cn(
        'relative w-full overflow-hidden pb-[120px] pt-[105px] md:pt-[130px] lg:pb-[150px]',
        !backgroundColor && 'bg-spontaine-surface-paper',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={backgroundColor ? { background: backgroundColor } : undefined}
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <PathSteps
          titleId={`steps-${blockData?.id ?? 0}-title`}
          eyebrow={textOf(blockData?.eyebrow, language)}
          titleOne={textOf(blockData?.titleOne, language)}
          titleTwo={textOf(blockData?.titleTwo, language)}
          steps={steps}
          note={textOf(blockData?.note, language)}
          body={textOf(blockData?.body, language)}
          cta={{
            label: textOf(blockData?.ctaLabel, language) || 'Book the working session',
            calendarUrl: textOf(blockData?.calendarUrl, language).trim(),
            trackingSection: 'steps',
          }}
          secondaryLink={linkLabel && linkUrl ? { label: linkLabel, href: linkUrl } : null}
        />

        {editMode && dispatch != null && blockData != null && (
          <StepsEditPanel
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
  readonly blockData: StepsV3Block
  readonly dispatch: Dispatch<PageBuilderAction>
  readonly language: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

const StepsEditPanel = ({ blockData, dispatch, language, onFieldEdit }: EditPanelProps) => {
  const steps = blockData.steps ?? toItemList<StepData>([])
  const setField = (field: TextFieldName, value: string) =>
    updateBlockField(
      dispatch,
      blockData.id,
      field,
      withLanguageValue(blockData[field], language, value)
    )
  const setSteps = (next: ItemListField<StepData>) =>
    updateBlockField(dispatch, blockData.id, 'steps', next)

  const fields: ReadonlyArray<{ field: TextFieldName; label: string; multiline?: boolean }> = [
    { field: 'eyebrow', label: 'Eyebrow' },
    { field: 'titleOne', label: 'Title line 1' },
    { field: 'titleTwo', label: 'Title line 2 (mint)' },
    { field: 'note', label: 'Note under the steps' },
    { field: 'body', label: 'Terms text', multiline: true },
    { field: 'ctaLabel', label: 'Button label' },
    { field: 'calendarUrl', label: 'Calendar link (blank = site calendar)' },
    { field: 'linkLabel', label: 'Second link text (optional)' },
    { field: 'linkUrl', label: 'Second link URL (optional)' },
  ]

  return (
    <EditPanelShell
      blockId={blockData.id}
      dispatch={dispatch}
      language={language}
      roundedTop={blockData.roundedTop}
      overlapTop={blockData.overlapTop}
      backgroundColor={blockData.backgroundColor}
      onFieldEdit={onFieldEdit}
      note='Two to four steps. Never promise a shorter time than four weeks.'
    >
      <div className='grid gap-3 md:grid-cols-3'>
        {fields.map(({ field, label, multiline }) => (
          <TextField
            key={field}
            className={multiline ? 'md:col-span-3' : undefined}
            multiline={multiline}
            label={label}
            value={textOf(blockData[field], language)}
            onChange={(value) => setField(field, value)}
          />
        ))}
      </div>

      {steps.items.map(({ id, item }, index) => (
        <FieldGroup
          key={id}
          title={`Step ${index + 1}`}
        >
          <div className='grid gap-3 md:grid-cols-[1fr_3fr]'>
            <TextField
              label='Label'
              value={textOf(item.label, language)}
              onChange={(value) =>
                setSteps(
                  updateListItem(steps, id, (step) => ({
                    ...step,
                    label: withLanguageValue(step.label, language, value),
                  }))
                )
              }
            />
            <TextField
              label='Text'
              value={textOf(item.text, language)}
              onChange={(value) =>
                setSteps(
                  updateListItem(steps, id, (step) => ({
                    ...step,
                    text: withLanguageValue(step.text, language, value),
                  }))
                )
              }
            />
            <TextField
              className='md:col-span-2'
              multiline
              label='Detail (optional)'
              value={textOf(item.detail, language)}
              onChange={(value) =>
                setSteps(
                  updateListItem(steps, id, (step) => ({
                    ...step,
                    detail: withLanguageValue(step.detail, language, value),
                  }))
                )
              }
            />
          </div>
          <ItemControls
            index={index}
            count={steps.items.length}
            noun='Step'
            onMove={(step) => setSteps(moveListItem(steps, id, step))}
            onRemove={() => setSteps(removeListItem(steps, id))}
          />
        </FieldGroup>
      ))}

      {steps.items.length < 4 && (
        <AddLabel
          label='ADD STEP'
          onClick={() =>
            setSteps(
              addListItem(steps, { label: sameText('Step'), text: sameText('What happens.') })
            )
          }
        />
      )}
    </EditPanelShell>
  )
}

export default StepsV3
