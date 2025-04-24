import Modal from '@/components/CustomUI/Modal/Modal'
import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import TitleInput from '@/Modules/PageBuilder/Components/Forms/TitleInput'
import { RequiredTextData } from '@/Modules/PageBuilder/page_interfaces'
import { useCallback, useState } from 'react'

interface Properties {
  onSubmit: (data: RequiredTextData) => void
}

const AddNavSubSection = ({ onSubmit }: Properties) => {
  const [showModal, setShowModal] = useState(false)

  const onAdd = useCallback(
    (data: RequiredTextData | null) => {
      if (data == null) return
      onSubmit(data)
      setShowModal(false)
    },
    [onSubmit]
  )

  return (
    <>
      <div className='flex'>
        <AddLabel
          label='Add Section'
          onClick={() => setShowModal(true)}
        />
      </div>
      {showModal && (
        <Modal
          title='Add Section'
          setShowModal={setShowModal}
        >
          <TitleInput onSubmit={onAdd} />
        </Modal>
      )}
    </>
  )
}

export default AddNavSubSection
