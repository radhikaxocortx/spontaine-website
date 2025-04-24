import EditButton from '@/components/CustomUI/Button/EditButton'
import FullSpinnerWrapper from '@/components/CustomUI/FullSpinnerWrapper'
import Modal from '@/components/CustomUI/Modal/Modal'
import useInertiaPost from '@/hooks/useInertiaPost'
import NavMenuItemForm, {
  NavMenuItemFormData,
} from '@/Modules/PageBuilder/NavEditor/Forms/NavMenuItemForm'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { useCallback, useState } from 'react'

interface Properties {
  menuItem: Pick<NavMenu, 'id' | 'title' | 'title_malayalam' | 'is_link' | 'link_info' | 'position'>
}

const UpdateNavMenu = ({ menuItem }: Properties) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const onClose = useCallback(() => {
    setShowUpdateModal(false)
  }, [])

  const { loading, post } = useInertiaPost(`/nav-editor/${menuItem?.id}`, {
    onComplete: onClose,
    showErrorToast: true,
  })

  const handleUpdate = useCallback(
    (data: NavMenuItemFormData | null) => {
      if (data == null || !menuItem?.id) {
        return
      }
      post({
        title: data.title,
        title_malayalam: data.title_malayalam,
        position: data.position,
        is_link: data.is_link,
        link_info: {
          link: data.link ?? '',
          name: {
            english: data.name ?? '',
            malayalam: null,
          },
          external: data.is_external ?? false,
        },
        _method: 'PUT',
      })
    },
    [post, menuItem?.id]
  )

  return (
    <div className=''>
      <EditButton onClick={() => setShowUpdateModal(true)} />
      {showUpdateModal && (
        <Modal
          setShowModal={setShowUpdateModal}
          title={`Rename ${menuItem.title}`}
        >
          <FullSpinnerWrapper processing={loading}>
            <span className='p-2 text-red-500'>
              Make sure to save current changes before renaming.
            </span>
            <div className='space-y-4'>
              <NavMenuItemForm
                menuItem={menuItem}
                onSubmit={handleUpdate}
              />
            </div>
          </FullSpinnerWrapper>
        </Modal>
      )}
    </div>
  )
}

export default UpdateNavMenu
