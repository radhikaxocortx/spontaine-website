import React, { useCallback } from 'react'
import { Block } from '../../../DataStructures/ui_builder_interfaces'
import Modal from '../../../ui/modal/Modal'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'
import { PageBuilderAction } from '../PageBuilder/pageBuilderService'
import ChooseVideo from '../../Common/VideoUpload/ChooseVideo'
import { Video } from '../../../DataStructures/data_interfaces'

interface Properties {
  selectedField: BlocKFieldInfo | null
  setSelectedField: (field: BlocKFieldInfo | null) => void
  dispatch: React.Dispatch<PageBuilderAction>
  block: Block
}

const ChangeVideoForm = ({ selectedField, dispatch, block, setSelectedField }: Properties) => {
  const onVideo = useCallback(
    (video: Video) => {
      if (video == null) {
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
              url: video.url ?? '',
              mime: video.mime ?? '',
            },
          },
        })
      } else if (selectedField?.action === 'INSERT') {
        dispatch({
          action: 'UPDATE_BLOCK_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: {
            url: video.url ?? '',
            mime: video.mime ?? '',
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
        (selectedField.fieldType === 'video' || selectedField.fieldType === 'videos') && (
          <Modal
            title={`Edit ${
              selectedField.itemField == null ? selectedField.field : selectedField.itemField
            }`}
            setShowModal={() => setSelectedField(null)}
            large
          >
            <>
              <ChooseVideo onVideo={onVideo} />
            </>
          </Modal>
        )}
    </>
  )
}

export default ChangeVideoForm
