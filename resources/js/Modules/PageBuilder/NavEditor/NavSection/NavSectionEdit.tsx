import Modal from '@/Components/CustomUI/Modal/Modal'
import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import LinkForm from '@/Modules/PageBuilder/Components/Forms/LinkForm'
import TitleInput from '@/Modules/PageBuilder/Components/Forms/TitleInput'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { LinkData, NavSectionLinks, RequiredTextData } from '@/Modules/PageBuilder/page_interfaces'
import { PencilIcon } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { NavBuilderAction } from '../nav-builder'
import NavLinkEdit from './NavLinkEdit'

interface Properties {
  section: NavSectionLinks
  actionDispatch: React.Dispatch<NavBuilderAction>
  language?: string
}

const NavSectionEdit = ({ section, actionDispatch, language = 'English' }: Properties) => {
  const [showAddLink, setShowAddLink] = useState(false)
  const [showEditSection, setShowEditSection] = useState(false)

  const onTitleChange = useCallback(
    (data: RequiredTextData | null) => {
      setShowEditSection(false)
      if (data == null) {
        actionDispatch({
          action: 'REMOVE_SECTION',
          sectionId: section.id,
        })
      } else {
        actionDispatch({
          action: 'UPDATE_SECTION',
          sectionId: section.id,
          sectionName: data,
        })
      }
    },
    [section, actionDispatch]
  )

  const onLink = useCallback(
    (link: LinkData | null) => {
      if (link != null) {
        actionDispatch({
          action: 'ADD_LINK',
          sectionId: section.id,
          link,
        })
      }
      setShowAddLink(false)
    },
    [section, actionDispatch]
  )

  const onUpdateLink = useCallback(
    (linkId: number, link: LinkData) => {
      actionDispatch({
        action: 'UPDATE_LINK',
        sectionId: section.id,
        linkId,
        link,
      })
    },
    [section, actionDispatch]
  )

  const onRemoveLink = useCallback(
    (linkId: number) => {
      actionDispatch({
        action: 'REMOVE_LINK',
        sectionId: section.id,
        linkId,
      })
    },
    [section, actionDispatch]
  )

  return (
    <div className='flex flex-col gap-3'>
      <span
        className='flex cursor-pointer items-center gap-2 text-base font-bold underline hover:text-blue-600'
        onClick={() => setShowEditSection(true)}
      >
        <PencilIcon className='h-3 w-3' />
        <Localization
          text={section.section}
          language={language}
        />
      </span>
      <div className='flex flex-col gap-1'>
        {section.links.map((link) => {
          return (
            <NavLinkEdit
              link={link}
              key={link.id.toString()}
              onUpdateLink={onUpdateLink}
              onRemoveLink={onRemoveLink}
              language={language}
            />
          )
        })}
      </div>
      <div>
        <AddLabel
          label='Add Link'
          onClick={() => setShowAddLink(true)}
        />
      </div>
      {showEditSection && (
        <Modal
          title='Edit Section'
          setShowModal={setShowEditSection}
        >
          <TitleInput
            onSubmit={onTitleChange}
            data={section.section}
            showRemove
          />
        </Modal>
      )}
      {showAddLink && (
        <Modal
          title='Add Link'
          setShowModal={setShowAddLink}
        >
          <LinkForm onLink={onLink} />
        </Modal>
      )}
    </div>
  )
}

export default NavSectionEdit
