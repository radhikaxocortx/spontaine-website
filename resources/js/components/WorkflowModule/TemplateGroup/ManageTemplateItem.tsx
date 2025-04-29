import CardGridView from '@/components/ListingPage/CardGridView'
import { ListItemKeys } from '@/components/ListingPage/ListResourcePage'

import DeleteModal from '@/components/CustomUI/Modal/DeleteModal'
import Modal from '@/components/CustomUI/Modal/Modal'
import { WorkflowModule, WorkflowModuleItem } from '@/components/Interface/data_interface'
import useInertiaPost from '@/hooks/useInertiaPost'
import { useCallback, useMemo, useState } from 'react'
import TemplateItemForm from './TemplateItemForm'
import TemplateItemUpdateForm from './TemplateItemUpdateForm'

interface Props {
  workflowModule: WorkflowModule
}

export default function ManageTemplateItems({ workflowModule }: Props) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<WorkflowModuleItem | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const onComplete = useCallback(() => {
    setShowAddModal(false)
  }, [])

  const { post, errors, loading } = useInertiaPost(route('entity-template-item.store'), {
    onComplete,
  })

  // keys(table col titles) for the table
  const keys = useMemo(() => {
    return [
      {
        key: 'field_name',
        label: 'Name',
        isCardHeader: true,
        isShownInCard: true,
      },
      {
        key: 'external_field_name',
        label: 'External Field Name',
        isShownInCard: true,
      },
      {
        key: 'type',
        label: 'Type',
        isShownInCard: true,
        hideLabel: true,
      },
      {
        key: 'default_value',
        label: 'Default Value',
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
      },
    ] as ListItemKeys<Partial<WorkflowModuleItem>>[]
  }, [])

  //table data
  const data = useMemo(() => {
    return workflowModule.workflow_items
      .sort((a, b) => a.field_number - b.field_number)
      .map((record) => {
        return {
          id: record.id,
          field_name: `${record.field_number}) ${record.field_name}`,
          type: record.type,
          external_field_name: record.external_field_name,
          default_value: record.default_value,
          placeholder: record.placeholder,
          actions: [
            {
              action: () => {
                setSelectedItem(record)
                setShowUpdateModal(true)
              },
              title: 'EDIT',
            },
            {
              action: () => {
                setSelectedItem(record)
                setShowDeleteModal(true)
              },
              title: 'DELETE',
            },
          ],
        }
      })
  }, [workflowModule])

  const handleSubmit = useCallback(
    (data: Record<string, string | boolean | number>) => {
      post({
        ...data,
        workflow_module_id: workflowModule.id,
      })
    },
    [post, workflowModule]
  )

  return (
    <>
      <CardGridView
        keys={keys}
        primaryKey='id'
        rows={data}
        onAddClick={() => setShowAddModal(true)}
        isChecklist={true}
      />
      {showAddModal && (
        <Modal
          setShowModal={setShowAddModal}
          title='Add Field'
        >
          <TemplateItemForm
            errors={errors}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
      {showDeleteModal && selectedItem != null && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          title={`Delete ${selectedItem.field_name}`}
          url={route('entity-template-item.destroy', selectedItem.id)}
        >
          <p>Are you sure you want to delete {selectedItem.field_name}?</p>
        </DeleteModal>
      )}
      {showUpdateModal && selectedItem != null && (
        <Modal
          setShowModal={setShowUpdateModal}
          title='Update Field'
        >
          <TemplateItemUpdateForm
            templateItem={selectedItem}
            setShowModal={setShowUpdateModal}
          />
        </Modal>
      )}
    </>
  )
}
