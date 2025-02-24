import {
  EntityTemplate,
  EntityTemplateGroup,
  EntityTemplateItem,
} from '@/Components/Interface/data_interface'
import CardGridView from '@/Components/ListingPage/CardGridView'
import { ListItemKeys } from '@/Components/ListingPage/ListResourcePage'
import DeleteModal from '@/Components/ui/Modal/DeleteModal'
import Modal from '@/Components/ui/Modal/Modal'
import useInertiaPost from '@/hooks/useInertiaPost'
import { useCallback, useMemo, useState } from 'react'
import TemplateItemForm from './TemplateItemForm'
import TemplateItemUpdateForm from './TemplateItemUpdateForm'

interface Props {
  group: EntityTemplateGroup
}

export default function ManageTemplateItems({ group }: Props) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<EntityTemplateItem | null>(null)
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
        key: 'type',
        label: 'Type',
        isShownInCard: true,
        hideLabel: true,
      },
      {
        key: 'default_value',
        label: 'Default Value',
      },
    ] as ListItemKeys<Partial<EntityTemplate>>[]
  }, [])

  //table data
  const data = useMemo(() => {
    return group.items.map((record) => {
      return {
        id: record.id,
        field_name: `${record.field_number}) ${record.field_name}`,
        type: record.type,
        default_value: record.default_value,
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
  }, [group])

  const handleSubmit = useCallback(
    (data: Record<string, string | boolean | number>) => {
      post({
        ...data,
        entity_template_group_id: group.id,
      })
    },
    [post, group]
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
