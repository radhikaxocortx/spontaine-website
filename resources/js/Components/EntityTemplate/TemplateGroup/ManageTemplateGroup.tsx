import { EntityTemplateGroup } from '@/Components/Interface/data_interface'

import DeleteButton from '@/Components/CustomUI/Button/DeleteButton'
import EditButton from '@/Components/CustomUI/Button/EditButton'
import DeleteModal from '@/Components/CustomUI/Modal/DeleteModal'
import Modal from '@/Components/CustomUI/Modal/Modal'
import { useState } from 'react'
import ManageTemplateItems from './ManageTemplateItem'
import TemplateGroupUpdateForm from './TemplateGroupUpdateForm'

interface Props {
  group: EntityTemplateGroup
}

export default function ManageTemplateGroup({ group }: Readonly<Props>) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <div
      className='flex flex-col gap-2'
      key={group.id}
    >
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1>
            # {group.group_number}) {group.name}
          </h1>
          <p className='text-xs'>{group.description}</p>
        </div>
        <div className='flex justify-end gap-5'>
          <EditButton onClick={() => setShowEditModal(true)} />
          <DeleteButton onClick={() => setShowDeleteModal(true)} />
        </div>
      </div>
      <ManageTemplateItems group={group} />
      {showEditModal && (
        <Modal
          setShowModal={setShowEditModal}
          title='Update Group'
        >
          <TemplateGroupUpdateForm
            group={group}
            setShowForm={setShowEditModal}
          />
        </Modal>
      )}
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          title={`Delete ${group.name}`}
          url={route('entity-template-group.destroy', group.id)}
        >
          <p>
            Are you sure you want to delete this group, all associated items will also will be
            deleted?
          </p>
        </DeleteModal>
      )}
    </div>
  )
}
