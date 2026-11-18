import Modal from '@/components/CustomUI/Modal/Modal'
import { Language } from '@/components/ui/ui_interfaces'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { BlockLink, LinkData } from '@/Modules/PageBuilder/page_interfaces'
import { PencilIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import NavLinkForm from './NavLinkForm'

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
        {/* The one-line description shown under this link in the live menu */}
        {(link.description?.english || link.description?.malayalam) && (
          <p className='ml-4 mt-0.5 max-w-[260px] text-xs leading-snug text-gray-500'>
            <Localization
              text={link.description}
              language={language as Language}
            />
          </p>
        )}
      </div>
      {showEditLink && (
        <Modal
          title='Edit Link'
          setShowModal={setShowEditLink}
        >
          <NavLinkForm
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
