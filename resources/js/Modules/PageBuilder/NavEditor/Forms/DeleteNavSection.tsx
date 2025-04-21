import DeleteButton from '@/Components/CustomUI/Button/DeleteButton'
import DeleteModal from '@/Components/CustomUI/Modal/DeleteModal'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import React from 'react'

interface Props {
  menuItem: Pick<NavMenu, 'id' | 'title' | 'title_malayalam' | 'is_link' | 'link_info' | 'position'>
}

const DeleteNavSection = ({ menuItem }: Readonly<Props>) => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)

  return (
    <div className=''>
      <DeleteButton onClick={() => setShowDeleteModal(true)} />
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          title={`Delete  ${menuItem.title}`}
          url={`/nav-editor/${menuItem.id}`}
        >
          <p>Are you sure you want to delete this section?</p>
        </DeleteModal>
      )}
    </div>
  )
}

export default DeleteNavSection
