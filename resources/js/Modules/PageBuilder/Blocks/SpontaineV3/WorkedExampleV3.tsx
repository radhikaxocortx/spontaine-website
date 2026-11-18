import { DEMO_TAB_IDS, type DemoSceneId } from '@/components/Home/Chat/demoTabState'
import WorkedExample from '@/components/Home/Chat/WorkedExample'
import { useStackUp } from '@/hooks/useStackUp'
import { cn } from '@/lib/utils'
import type { Dispatch } from 'react'
import type { BlocKFieldInfo } from '../../Components/BlockEditor/BlockEditor'
import { getV3ColorValue } from '../../Components/V3ColorControls'
import V3RoundedSectionBlockFrame from '../../Components/V3RoundedSectionBlockFrame'
import { isV3RoundedTopEnabled, isV3TopOverlapEnabled } from '../../Components/V3RoundedTopToggle'
import type { PageBuilderAction } from '../../hooks/pageBuilderService'
import type { Block, BlockConfiguration, TextData } from '../../page_interfaces'
import type { Language } from '../../Pages/PageBuilder'
import {
  EditPanelShell,
  sameText,
  SelectField,
  TextField,
  textOf,
  updateBlockField,
  withLanguageValue,
} from './shared/blockEditing'

export const SPONTAINE_V3_WORKED_EXAMPLE_BLOCK_NAME = 'Spontaine V3 - Worked Example'

export interface WorkedExampleV3Block extends Block, BlockConfiguration {
  eyebrow?: TextData
  titleOne?: TextData
  titleTwo?: TextData
  description?: TextData
  /** 'industrial', 'professional-services' or 'both' (tabs). */
  scenes?: TextData
  /** Optional section id (without #) so links like #see-it-work can jump here. */
  anchor?: TextData
  backgroundColor?: TextData
  roundedTop?: TextData
  overlapTop?: TextData
}

export const workedExampleV3Block: Omit<
  WorkedExampleV3Block,
  keyof Block | keyof BlockConfiguration
> = {
  eyebrow: sameText('See it work'),
  titleOne: sameText('An answer is useful once.'),
  titleTwo: sameText('A capability works every day.'),
  description: sameText(
    'Ask a question your business cares about. Spontaine gives you a governed answer with the right context, then lets you keep the useful work as a reusable Block.'
  ),
  scenes: sameText('both'),
  roundedTop: sameText('true'),
  overlapTop: sameText('true'),
}

const toScenes = (value: string): readonly DemoSceneId[] =>
  value === 'industrial' || value === 'industrial-otif' || value === 'professional-services'
    ? [value]
    : DEMO_TAB_IDS

interface Properties {
  readonly blockData?: WorkedExampleV3Block
  readonly dispatch?: Dispatch<PageBuilderAction>
  readonly editMode?: boolean
  readonly language?: Language
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
}

type TextFieldName = 'eyebrow' | 'titleOne' | 'titleTwo' | 'description' | 'scenes' | 'anchor'

const WorkedExampleV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: Properties) => {
  const bandRef = useStackUp<HTMLElement>({ moveBand: false, enabled: !editMode })
  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const sceneValue = textOf(blockData?.scenes, language) || 'both'
  const setField = (field: TextFieldName, value: string) => {
    if (dispatch == null || blockData == null) {
      return
    }

    updateBlockField(
      dispatch,
      blockData.id,
      field,
      withLanguageValue(blockData[field], language, value)
    )
  }

  return (
    <V3RoundedSectionBlockFrame
      ref={bandRef}
      id={textOf(blockData?.anchor, language).trim().replace(/^#/, '') || undefined}
      roundedTop={isV3RoundedTopEnabled(blockData?.roundedTop, language)}
      overlapTop={isV3TopOverlapEnabled(blockData?.overlapTop, language)}
      className={cn(
        'relative w-full scroll-mt-16 overflow-hidden pb-[110px] pt-[104px] md:pb-[130px] md:pt-[130px] lg:pb-[150px] lg:pt-[136px]',
        !backgroundColor && 'bg-spontaine-surface-paper',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={backgroundColor ? { background: backgroundColor } : undefined}
    >
      <WorkedExample
        scenes={toScenes(sceneValue)}
        idPrefix={`worked-example-${blockData?.id ?? 0}`}
        eyebrow={textOf(blockData?.eyebrow, language)}
        titleOne={textOf(blockData?.titleOne, language)}
        titleTwo={textOf(blockData?.titleTwo, language)}
        description={textOf(blockData?.description, language)}
      />

      {editMode && dispatch != null && blockData != null && (
        <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
          <EditPanelShell
            blockId={blockData.id}
            dispatch={dispatch}
            language={language}
            roundedTop={blockData.roundedTop}
            overlapTop={blockData.overlapTop}
            backgroundColor={blockData.backgroundColor}
            onFieldEdit={onFieldEdit}
            note='The demo data is illustrative and always labelled as such.'
          >
            <div className='grid gap-3 md:grid-cols-2'>
              <SelectField
                label='Scenes'
                value={sceneValue}
                options={[
                  { value: 'both', label: 'Both (tabs)' },
                  { value: 'industrial', label: 'Industrial only: OTIF, Plant A and B' },
                  { value: 'industrial-otif', label: 'Industrial only: OTIF, Ohio and Brno' },
                  { value: 'professional-services', label: 'Professional services only' },
                ]}
                onChange={(value) => setField('scenes', value)}
              />
              <TextField
                label='Eyebrow'
                value={textOf(blockData.eyebrow, language)}
                onChange={(value) => setField('eyebrow', value)}
              />
              <TextField
                label='Anchor (optional, e.g. see-it-work)'
                value={textOf(blockData.anchor, language)}
                onChange={(value) => setField('anchor', value)}
              />
              <TextField
                label='Title line 1 (grey)'
                value={textOf(blockData.titleOne, language)}
                onChange={(value) => setField('titleOne', value)}
              />
              <TextField
                label='Title line 2'
                value={textOf(blockData.titleTwo, language)}
                onChange={(value) => setField('titleTwo', value)}
              />
              <TextField
                className='md:col-span-2'
                multiline
                label='Description'
                value={textOf(blockData.description, language)}
                onChange={(value) => setField('description', value)}
              />
            </div>
          </EditPanelShell>
        </div>
      )}
    </V3RoundedSectionBlockFrame>
  )
}

export default WorkedExampleV3
