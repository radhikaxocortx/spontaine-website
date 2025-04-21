import EditButton from '@/Components/CustomUI/Button/EditButton'
import FullSpinnerWrapper from '@/Components/CustomUI/FullSpinnerWrapper'
import Modal from '@/Components/CustomUI/Modal/Modal'
import useInertiaPost from '@/hooks/useInertiaPost'
import TitleInput from '@/Modules/PageBuilder/Components/Forms/TitleInput'
import { TextData } from '@/Modules/PageBuilder/page_interfaces'
import { useCallback, useState } from 'react'

interface Properties {
  section: string
}

const RenameNavSection = ({ section }: Properties) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const onComplete = useCallback(() => {
    setShowUpdateModal(false)
  }, [])

  const { post, loading } = useInertiaPost(`/nav-editor/${section}`, onComplete, {
    showErrorToast: true,
  })

  const onSubmit = useCallback(
    (title: TextData | null) => {
      post({
        section: title?.english,
        section_malayalam: title?.malayalam,
        _method: 'PUT',
      })
    },
    [post]
  )

  return (
    <div className=''>
      <EditButton onClick={() => setShowUpdateModal(true)} />
      {showUpdateModal && (
        <Modal
          setShowModal={setShowUpdateModal}
          title={`Rename ${section}`}
        >
          <FullSpinnerWrapper processing={loading}>
            <span className='p-2 text-red-500'>
              Make sure to save current changes before renaming.
            </span>
            <TitleInput onSubmit={onSubmit} />
          </FullSpinnerWrapper>
        </Modal>
      )}
    </div>
  )
}

export default RenameNavSection
