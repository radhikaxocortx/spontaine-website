import FullSpinnerWrapper from '@/Components/CustomUI/FullSpinnerWrapper'
import React, { useCallback } from 'react'
import { NavMenuSection, RequiredTextData } from '../page_interfaces'
import AddNavSubSection from './Forms/AddNavSubSection'
import { NavBuilderAction } from './nav-builder'
import NavSectionEdit from './NavSection/NavSectionEdit'

interface Properties {
  actionDispatch: React.Dispatch<NavBuilderAction>
  selectedSection: NavMenuSection
  loading: boolean
  language: string
}

const NavEditorForm = ({ actionDispatch, loading, selectedSection, language }: Properties) => {
  const addNavSection = useCallback(
    (sectionName: RequiredTextData) => {
      actionDispatch({ action: 'ADD_SECTION', sectionName })
    },
    [actionDispatch]
  )

  return (
    <FullSpinnerWrapper processing={loading}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {selectedSection.items.map((navSubSection) => {
          return (
            <NavSectionEdit
              key={navSubSection.id.toString()}
              section={navSubSection}
              actionDispatch={actionDispatch}
              language={language}
            />
          )
        })}
        <div className='flex'>
          <AddNavSubSection onSubmit={addNavSection} />
        </div>
      </div>
    </FullSpinnerWrapper>
  )
}

export default NavEditorForm
