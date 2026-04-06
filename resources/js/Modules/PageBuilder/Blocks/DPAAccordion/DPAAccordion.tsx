import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import {
  BlocKFieldInfo,
  BlockFieldValues,
} from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import useBlockStyling from '@/Modules/PageBuilder/hooks/useBlockStyling'
import { ItemListField } from '@/Modules/PageBuilder/page_interfaces'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import { Dispatch } from 'react'
import DPAAccordionSectionCard from './DPAAccordionSectionCard'
import { createDPAAccordionHandlers } from './DPAAccordionStateHelpers'
import { dpaAccordionBlock, DPAAccordionBlockData, DPASectionData } from './types'

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
  const blockStyling = useBlockStyling(blockData ?? {})

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
    <section className={` ${editMode ? 'py-6' : blockStyling}`}>
      <AppLayoutPadding>
        <div className='mx-auto w-full max-w-[750px] space-y-5'>
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
      </AppLayoutPadding>
    </section>
  )
}

export default DPAAccordion
