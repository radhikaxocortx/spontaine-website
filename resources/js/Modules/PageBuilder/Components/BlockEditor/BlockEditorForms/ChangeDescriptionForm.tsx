import Modal from '@/components/CustomUI/Modal/Modal'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import DescriptionInput from '@/Modules/PageBuilder/Components/Forms/DescriptionInput'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { Block, RequiredTextData, TextData } from '@/Modules/PageBuilder/page_interfaces'
import { Dispatch, useCallback } from 'react'

interface Properties {
  selectedField: BlocKFieldInfo | null
  setSelectedField: (field: BlocKFieldInfo | null) => void
  dispatch: Dispatch<PageBuilderAction>
  block: Block
}

const ChangeDescriptionForm = ({
  selectedField,
  dispatch,
  block,
  setSelectedField,
}: Properties) => {
  const onDescriptionChange = useCallback(
    (description: RequiredTextData | null) => {
      if (selectedField?.itemField != null && selectedField.itemIndex != null) {
        dispatch({
          action: 'UPDATE_LIST_ITEM_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: description,
          itemId: selectedField?.itemIndex,
          blockData: { [selectedField.itemField]: description },
        })
      } else if (description == null && selectedField?.itemIndex != null) {
        dispatch({
          action: 'REMOVE_LIST_ITEM',
          blockId: block.id,
          fieldName: selectedField?.field,
          itemId: selectedField?.itemIndex,
        })
      } else if (selectedField?.action === 'UPDATE' && selectedField?.itemIndex == null) {
        dispatch({
          action: 'UPDATE_BLOCK_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: description,
        })
      } else if (selectedField?.action === 'UPDATE') {
        dispatch({
          action: 'UPDATE_LIST_ITEM',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: description,
          itemId: selectedField?.itemIndex as number,
        })
      } else if (selectedField?.action === 'INSERT') {
        dispatch({
          action: 'INSERT_INTO_LIST',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: description,
        })
      }
      setSelectedField(null)
    },
    [block, dispatch, selectedField, setSelectedField]
  )

  return (
    <>
      {selectedField != null &&
        (selectedField.fieldType === 'textarea' || selectedField.fieldType === 'textItems') && (
          <Modal
            title={`Edit ${
              selectedField.itemField == null ? selectedField.field : selectedField.itemField
            }`}
            setShowModal={() => setSelectedField(null)}
          >
            <DescriptionInput
              onSubmit={onDescriptionChange}
              data={selectedField.oldValue as TextData}
              showRemove={selectedField.action === 'UPDATE'}
            />
          </Modal>
        )}
    </>
  )
}

export default ChangeDescriptionForm
