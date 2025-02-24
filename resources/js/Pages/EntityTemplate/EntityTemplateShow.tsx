import ManageTemplateGroup from '@/Components/EntityTemplate/TemplateGroup/ManageTemplateGroup'
import TemplateGroupForm from '@/Components/EntityTemplate/TemplateGroup/TemplateGroupForm'
import { EntityTemplate, EntityTemplateGroup } from '@/Components/Interface/data_interface'
import ShowResourcePage, { ShowPageItem } from '@/Components/ShowPage/ShowResourcePage'
import Button from '@/Components/ui/FormFieldLaravel/Button'
import DeleteModal from '@/Components/ui/Modal/DeleteModal'
import Modal from '@/Components/ui/Modal/Modal'
import { useMemo, useState } from 'react'

interface Props {
  entityTemplate: EntityTemplate
  groups: EntityTemplateGroup[]
}

export default function MetaGroupShow({ entityTemplate, groups }: Readonly<Props>) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const displayedValues = useMemo(() => {
    return [
      {
        id: 1,
        label: 'Step',
        content: entityTemplate.step,
        type: 'text',
      },
      {
        id: 2,
        label: 'Name',
        content: entityTemplate.name,
        type: 'text',
      },
      {
        id: 3,
        label: 'Description',
        content: entityTemplate.description,
        type: 'text',
      },
    ] as ShowPageItem[]
  }, [entityTemplate])

  const [showAddGroupModal, setShowAddGroupModal] = useState(false)

  return (
    <ShowResourcePage
      title={entityTemplate.name}
      items={displayedValues}
      backUrl={route('entity-templates.index')}
      editUrl={route('entity-templates.edit', entityTemplate.id)}
      onDeleteClick={() => {
        setShowDeleteModal(true)
      }}
      type='settings'
      subtype='entity-templates'
      selectedHeading='configurations'
    >
      <div className='my-5 flex justify-end gap-5'>
        <Button
          label='Add Info Group'
          onClick={() => setShowAddGroupModal(true)}
        />
      </div>
      <div className='flex flex-col gap-5'>
        {groups.map((group) => (
          <ManageTemplateGroup
            key={group.id}
            group={group}
          />
        ))}
      </div>
      {showAddGroupModal && (
        <Modal
          setShowModal={setShowAddGroupModal}
          title={`Add New Form Group To ${entityTemplate.name}`}
        >
          <TemplateGroupForm
            entityTemplate={entityTemplate}
            setShowForm={setShowAddGroupModal}
          />
        </Modal>
      )}
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          title={`Delete Record`}
          url={route('entity-templates.destroy', entityTemplate.id)}
        >
          <p>Are you sure you want to delete record?</p>
        </DeleteModal>
      )}
    </ShowResourcePage>
  )
}
