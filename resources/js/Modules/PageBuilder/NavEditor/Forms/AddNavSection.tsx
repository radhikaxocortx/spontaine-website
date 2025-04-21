import AddButton from '@/Components/CustomUI/Button/AddButton'
import FullSpinnerWrapper from '@/Components/CustomUI/FullSpinnerWrapper'
import Modal from '@/Components/CustomUI/Modal/Modal'
import useInertiaPost from '@/hooks/useInertiaPost'
import TitleInput from '@/Modules/PageBuilder/Components/Forms/TitleInput'
import { TextData } from '@/Modules/PageBuilder/page_interfaces'
import { useCallback, useState } from 'react'

const AddNavSection = () => {
  const [showModal, setShowModal] = useState(false)

  const onComplete = useCallback(() => {
    setShowModal(false)
  }, [])

  const { loading, post } = useInertiaPost('/nav-editor', {
    onComplete,
    showErrorToast: true,
  })

  const handleSubmit = useCallback(
    (data: TextData | null) => {
      post({
        section: data?.english ?? '',
        section_malayalam: data?.malayalam ?? '',
        data: {
          lastUUID: 0,
          items: [],
        },
      })
    },
    [post]
  )

  return (
    <>
      <FullSpinnerWrapper processing={loading}>
        <AddButton onClick={() => setShowModal(true)} />
      </FullSpinnerWrapper>
      {showModal && (
        <Modal
          title='Add Section'
          setShowModal={setShowModal}
        >
          <TitleInput onSubmit={handleSubmit} />
        </Modal>
      )}
    </>
  )
}

export default AddNavSection
