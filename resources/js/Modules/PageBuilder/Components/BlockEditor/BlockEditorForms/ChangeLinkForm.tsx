import Modal from '@/Components/CustomUI/Modal/Modal'
import LinkForm from '@/Modules/PageBuilder/Components/Forms/LinkForm'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { Block, LinkData } from '@/Modules/PageBuilder/page_interfaces'
import { Dispatch, useCallback } from 'react'
import { BlocKFieldInfo } from '../BlockEditor'

interface Properties {
  selectedField: BlocKFieldInfo | null
  setSelectedField: (field: BlocKFieldInfo | null) => void
  dispatch: Dispatch<PageBuilderAction>
  block: Block
}

const ChangeLinkForm = ({ selectedField, dispatch, block, setSelectedField }: Properties) => {
  const onLink = useCallback(
    (link: LinkData | null) => {
      if (selectedField?.itemField != null && selectedField.itemIndex != null) {
        dispatch({
          action: 'UPDATE_LIST_ITEM_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: link,
          itemId: selectedField?.itemIndex,
          blockData: { [selectedField.itemField]: link },
        })
        setSelectedField(null)
        return
      }

      if (selectedField?.fieldType === 'link') {
        dispatch({
          action: 'UPDATE_BLOCK_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: link,
        })
        setSelectedField(null)
        return
      }

      if (selectedField?.action === 'UPDATE' && link != null) {
        dispatch({
          action: 'UPDATE_LIST_ITEM',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: link,
          itemId: selectedField?.itemIndex as number,
        })
      }

      if (selectedField?.action === 'INSERT') {
        dispatch({
          action: 'INSERT_INTO_LIST',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: link,
        })
      }

      if (link == null) {
        dispatch({
          action: 'REMOVE_LIST_ITEM',
          blockId: block.id,
          fieldName: selectedField?.field,
          itemId: selectedField?.itemIndex as number,
        })
      }

      setSelectedField(null)
    },
    [block, dispatch, selectedField, setSelectedField]
  )

  return (
    <>
      {selectedField != null &&
        (selectedField.fieldType === 'links' || selectedField.fieldType === 'link') && (
          <Modal
            title={`Edit ${
              selectedField.itemField == null ? selectedField.field : selectedField.itemField
            }`}
            setShowModal={() => setSelectedField(null)}
          >
            <>
              <LinkForm
                onLink={onLink}
                data={selectedField.oldValue as LinkData}
                showRemove={selectedField.action === 'UPDATE'}
              />
            </>
          </Modal>
        )}
    </>
  )
}

export default ChangeLinkForm
