import Modal from '@/Components/CustomUI/Modal/Modal'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import ChooseVideo from '@/Modules/PageBuilder/Components/Forms/VideoUpload/ChooseVideo'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { Block, Video } from '@/Modules/PageBuilder/page_interfaces'
import React, { useCallback } from 'react'

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
