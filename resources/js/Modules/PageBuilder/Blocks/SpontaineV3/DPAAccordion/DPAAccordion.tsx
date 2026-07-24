import { cn } from '@/lib/utils'
import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import {
  BlocKFieldInfo,
  BlockFieldValues,
} from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import V3ColorControls, { getV3ColorValue } from '@/Modules/PageBuilder/Components/V3ColorControls'
import V3RoundedSectionBlockFrame from '@/Modules/PageBuilder/Components/V3RoundedSectionBlockFrame'
import V3RoundedTopToggle, {
  isV3RoundedTopEnabled,
  isV3TopOverlapEnabled,
} from '@/Modules/PageBuilder/Components/V3RoundedTopToggle'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { ItemListField } from '@/Modules/PageBuilder/page_interfaces'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import React, { Dispatch } from 'react'
import useSectionRichTextV3Reveal from '../SectionRichTextV3/useSectionRichTextV3Reveal'
import DPAAccordionSectionCard from './DPAAccordionSectionCard'
import { createDPAAccordionHandlers } from './DPAAccordionStateHelpers'
import { dpaAccordionBlock, DPAAccordionBlockData, DPASectionData } from './types'

export const SPONTAINE_V3_DPA_ACCORDION_BLOCK_NAME = 'Spontaine V3 - DPA Accordion'
export { dpaAccordionBlock }
export type { DPAAccordionBlockData }

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: DPAAccordionBlockData
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}

const DPAAccordion = ({
  editMode = false,
  onFieldEdit,
  blockData,
  language = 'en',
  dispatch,
}: Properties) => {
  const sectionRef = React.useRef<HTMLElement>(null)
  useSectionRichTextV3Reveal(sectionRef, editMode)
  const hasRoundedTop = isV3RoundedTopEnabled(blockData?.roundedTop, language)
  const hasTopOverlap = isV3TopOverlapEnabled(blockData?.overlapTop, language)
  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const textColor = getV3ColorValue(blockData?.textColor, language)

  const updateSections = (sections: ItemListField<DPASectionData>) => {
    if (dispatch == null || blockData == null) {
      return
    }
    dispatch({
      action: 'UPDATE_BLOCK_FIELD',
      blockId: blockData.id,
      fieldName: 'sections',
      fieldValue: sections as unknown as BlockFieldValues,
    })
  }

  const {
    onSectionFieldChange,
    onClauseFieldChange,
    onAccordionFieldChange,
    addSection,
    removeSection,
    addClause,
    removeClause,
    addAccordion,
    removeAccordion,
  } = createDPAAccordionHandlers({
    sections: blockData?.sections,
    language,
    onSectionsChange: updateSections,
  })

  return (
    <V3RoundedSectionBlockFrame
      ref={sectionRef}
      roundedTop={hasRoundedTop}
      overlapTop={hasTopOverlap}
      className={cn(
        'relative w-full overflow-hidden py-16 md:py-20 lg:py-24',
        !backgroundColor && 'bg-pagebuilder-hero-wash',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={{ background: backgroundColor, color: textColor }}
    >
      <div className='relative z-10 mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div
          data-v3-rich-text-reveal
          className='mx-auto w-full max-w-[820px] space-y-5'
        >
          {blockData?.sections?.items?.map((section) => (
            <DPAAccordionSectionCard
              key={section.id}
              section={section}
              editMode={editMode}
              language={language}
              onFieldEdit={onFieldEdit}
              onSectionFieldChange={onSectionFieldChange}
              onRemoveSection={removeSection}
              onAddClause={addClause}
              onClauseFieldChange={onClauseFieldChange}
              onRemoveClause={removeClause}
              onAddAccordion={addAccordion}
              onAccordionFieldChange={onAccordionFieldChange}
              onRemoveAccordion={removeAccordion}
            />
          ))}

          {editMode && (
            <div className='pt-1'>
              <AddLabel
                label='ADD SECTION'
                onClick={addSection}
              />
            </div>
          )}
        </div>

        {editMode && (
          <div className='mx-auto mt-8 w-full max-w-[820px] rounded-lg bg-spontaine-surface-paper p-4 shadow-surface'>
            <div className='flex flex-wrap gap-4'>
              {dispatch != null && blockData?.id != null && (
                <div className='flex flex-wrap items-center gap-2'>
                  <p className='m-0 text-sm font-medium text-spontaine-text-primary'>
                    Section Shape:
                  </p>
                  <V3RoundedTopToggle
                    blockId={blockData.id}
                    dispatch={dispatch}
                    language={language}
                    overlapTop={blockData.overlapTop}
                    roundedTop={blockData.roundedTop}
                  />
                </div>
              )}
              <V3ColorControls
                backgroundColor={blockData?.backgroundColor}
                onFieldEdit={onFieldEdit}
                textColor={blockData?.textColor}
              />
            </div>
          </div>
        )}
      </div>
    </V3RoundedSectionBlockFrame>
  )
}

export default DPAAccordion
