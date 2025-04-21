import DeleteButton from '@/Components/CustomUI/Button/DeleteButton'
import DeleteModal from '@/Components/CustomUI/Modal/DeleteModal'
import React from 'react'

const DeleteNavSection = ({ section }: { section: string }) => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)

  return (
    <div className=''>
      <DeleteButton onClick={() => setShowDeleteModal(true)} />
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          title={`Delete  ${section}`}
          url={`/nav-editor/${section}`}
        >
          <p>Are you sure you want to delete this section?</p>
        </DeleteModal>
      )}
    </div>
  )
}

export default DeleteNavSection
