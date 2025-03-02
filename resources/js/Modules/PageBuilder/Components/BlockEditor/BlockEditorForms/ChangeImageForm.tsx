import Modal from '@/Components/CustomUI/Modal/Modal'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import ChooseImage from '@/Modules/PageBuilder/Components/Forms/ImageUpload/ChooseImage'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { Block, Image } from '@/Modules/PageBuilder/page_interfaces'
import React, { useCallback } from 'react'

interface Properties {
  selectedField: BlocKFieldInfo | null
  setSelectedField: (field: BlocKFieldInfo | null) => void
  dispatch: React.Dispatch<PageBuilderAction>
  block: Block
}

const ChangeImageForm = ({ selectedField, dispatch, block, setSelectedField }: Properties) => {
  const onImage = useCallback(
    (image: Image) => {
      if (image == null) {
        return
      }
      if (selectedField?.itemField != null && selectedField.itemIndex != null) {
        dispatch({
          action: 'UPDATE_LIST_ITEM_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          itemId: selectedField?.itemIndex,
          blockData: {
            [selectedField.itemField]: {
              url: image.url ?? '',
              caption: image.name ?? '',
            },
          },
        })
      } else if (selectedField?.action === 'INSERT') {
        dispatch({
          action: 'UPDATE_BLOCK_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: {
            url: image.url ?? '',
            caption: image.name,
          },
        })
      }
      setSelectedField(null)
    },
    [block, dispatch, selectedField, setSelectedField]
  )

  return (
    <>
      {selectedField != null &&
        (selectedField.fieldType === 'image' || selectedField.fieldType === 'images') && (
          <Modal
            title={`Edit ${
              selectedField.itemField == null ? selectedField.field : selectedField.itemField
            }`}
            setShowModal={() => setSelectedField(null)}
            large
          >
            <>
              <ChooseImage onImage={onImage} />
            </>
          </Modal>
        )}
    </>
  )
}

export default ChangeImageForm
