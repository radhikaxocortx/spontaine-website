import AddButton from '@/Components/CustomUI/Button/AddButton'
import FullSpinnerWrapper from '@/Components/CustomUI/FullSpinnerWrapper'
import Modal from '@/Components/CustomUI/Modal/Modal'
import useInertiaPost from '@/hooks/useInertiaPost'
import NavMenuItemForm, {
  NavMenuItemFormData,
} from '@/Modules/PageBuilder/NavEditor/Forms/NavMenuItemForm'
import { useCallback, useState } from 'react'

const AddNavMenuItem = () => {
  const [showModal, setShowModal] = useState(false)

  const onComplete = useCallback(() => {
    setShowModal(false)
  }, [])

  const { loading, post } = useInertiaPost('/nav-editor', {
    onComplete,
    showErrorToast: true,
  })

  const handleSubmit = useCallback(
    (data: NavMenuItemFormData | null) => {
      if (data == null) {
        return
      }
      post({
        title: data.title,
        title_malayalam: data.title_malayalam,
        position: data.position,
        is_link: data.is_link,
        link_info: data.is_link
          ? {
              link: data.link,
              name: {
                english: data.name,
                malayalam: null,
              },
              external: data.is_external,
            }
          : null,
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
          title='Add Nav Menu Item'
          setShowModal={setShowModal}
        >
          <NavMenuItemForm onSubmit={handleSubmit} />
        </Modal>
      )}
    </>
  )
}

export default AddNavMenuItem
