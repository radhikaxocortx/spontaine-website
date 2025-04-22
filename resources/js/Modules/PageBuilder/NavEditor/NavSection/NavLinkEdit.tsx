import Modal from '@/Components/CustomUI/Modal/Modal'
import LinkForm from '@/Modules/PageBuilder/Components/Forms/LinkForm'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { BlockLink, LinkData } from '@/Modules/PageBuilder/page_interfaces'
import { PencilIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

interface Properties {
  link: BlockLink
  onUpdateLink: (linkId: number, link: LinkData) => void
  onRemoveLink: (linkId: number) => void
  language: string
}

const NavLinkEdit = ({ link, onUpdateLink, onRemoveLink, language }: Properties) => {
  const [showEditLink, setShowEditLink] = useState(false)

  const onLinkChange = useCallback(
    (newLink: LinkData | null) => {
      if (newLink == null) {
        onRemoveLink(link.id)
      } else {
        onUpdateLink(link.id, newLink)
      }
      setShowEditLink(false)
    },
    [link, onUpdateLink, onRemoveLink]
  )

  return (
    <>
      <div className=''>
        <span
          className='flex cursor-pointer items-center gap-1 underline hover:text-blue-600'
          onClick={() => setShowEditLink(true)}
        >
          <PencilIcon className='h-3 w-3' />
          <Localization
            text={link.name}
            language={language}
          />
        </span>
      </div>
      {showEditLink && (
        <Modal
          title='Edit Link'
          setShowModal={setShowEditLink}
        >
          <LinkForm
            data={link}
            showRemove
            onLink={onLinkChange}
          />
        </Modal>
      )}
    </>
  )
}

export default NavLinkEdit
