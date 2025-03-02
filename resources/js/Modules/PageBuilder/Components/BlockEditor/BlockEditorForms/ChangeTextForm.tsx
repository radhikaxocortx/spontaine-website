import Modal from '@/Components/CustomUI/Modal/Modal'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import TitleInput from '@/Modules/PageBuilder/Components/Forms/TitleInput'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { Block, RequiredTextData } from '@/Modules/PageBuilder/page_interfaces'
import { Dispatch, useCallback } from 'react'

interface Properties {
  selectedField: BlocKFieldInfo | null
  setSelectedField: (field: BlocKFieldInfo | null) => void
  dispatch: Dispatch<PageBuilderAction>
  block: Block
}

const ChangeTextForm = ({ selectedField, dispatch, block, setSelectedField }: Properties) => {
  const onTitleInputChange = useCallback(
    (title: RequiredTextData | null) => {
      if (title == null) {
        return
      }
      if (selectedField?.itemField != null && selectedField.itemIndex != null) {
        dispatch({
          action: 'UPDATE_LIST_ITEM_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: title,
          itemId: selectedField?.itemIndex,
          blockData: { [selectedField.itemField]: title },
        })
      } else {
        dispatch({
          action: 'UPDATE_BLOCK_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: title,
        })
      }
      setSelectedField(null)
    },
    [selectedField, dispatch, block, setSelectedField]
  )

  return (
    <>
      {selectedField != null && selectedField.fieldType === 'text' && (
        <Modal
          title={`Edit ${
            selectedField.itemField == null ? selectedField.field : selectedField.itemField
          }`}
          setShowModal={() => setSelectedField(null)}
        >
          <>
            <TitleInput
              onSubmit={onTitleInputChange}
              data={selectedField.oldValue as RequiredTextData}
            />
          </>
        </Modal>
      )}
    </>
  )
}

export default ChangeTextForm
