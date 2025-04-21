import SelectList from '@/Components/CustomUI/FormFields/SelectList'
import { Button } from '@/Components/ui/button'
import { Switch } from '@/Components/ui/switch'
import use419Error from '@/hooks/use419Error'
import { router } from '@inertiajs/react'
import { useEffect, useReducer, useState } from 'react'
import useFetchNavSection from './fetch-nav-section'
import AddNavSection from './Forms/AddNavSection'
import DeleteNavSection from './Forms/DeleteNavSection'
import RenameNavSection from './Forms/RenameNavSection'
import navBuilder from './nav-builder'
import NavEditorForm from './NavEditorForm'

interface Properties {
  sections: Array<{ section: string }>
}

const NavEditor = ({ sections }: Properties) => {
  const [selectedNavSection, setSelectedNavSection] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const { menuItem, loading } = useFetchNavSection(selectedNavSection)
  const [selectedSection, sectionDispatch] = useReducer(navBuilder, null)
  const [isButton, setIsButton] = useState(false)

  useEffect(() => {
    sectionDispatch({ action: 'CHANGE_SECTION', sections: menuItem })
  }, [menuItem])

  use419Error()

  const saveChanges = () => {
    router.post(`/nav-editor`, {
      data: { ...selectedSection, isButton },
      section: selectedNavSection,
    } as unknown as FormData)
  }

  const changeLanguage = () => {
    if (selectedLanguage === 'en') {
      setSelectedLanguage('mal')
    } else {
      setSelectedLanguage('en')
    }
  }

  //if sections changes and selected section is not in the new sections, set selected section to ''
  useEffect(() => {
    if (selectedNavSection == '') {
      return
    }
    if (!sections.some((section) => section.section === selectedNavSection)) {
      setSelectedNavSection('')
    }
  }, [sections, selectedNavSection])

  return (
    <div className='flex flex-col gap-5 p-5'>
      <div className='flex justify-end'>
        <Button
          variant='secondary'
          onClick={changeLanguage}
        >
          {selectedLanguage}
        </Button>
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4 xl:gap-5'>
        <div className='flex flex-col'>
          <SelectList<'section', 'section', { section: string }>
            label='Nav section'
            list={sections}
            value={selectedNavSection}
            setValue={setSelectedNavSection}
            dataKey='section'
            displayKey='section'
          />
        </div>
        <div className='self-end'>
          <AddNavSection />
        </div>
      </div>
      {selectedNavSection != '' && (
        <>
          <span className='text-sm text-red-500'>
            Make sure to save changes before changing nav section.
          </span>
          <div className='flex items-center gap-5'>
            <div className='flex items-center gap-2'>
              <Switch
                id='is-button'
                checked={isButton}
                onCheckedChange={setIsButton}
              />
              <label htmlFor='is-button'>Display as Button</label>
            </div>
            <div className=''>
              <Button onClick={saveChanges}>SAVE CHANGES</Button>
            </div>
            <RenameNavSection section={selectedNavSection} />
            <DeleteNavSection section={selectedNavSection} />
          </div>
        </>
      )}
      {selectedSection != null && selectedNavSection != '' && (
        <NavEditorForm
          language={selectedLanguage}
          actionDispatch={sectionDispatch}
          loading={loading}
          selectedSection={selectedSection}
        />
      )}
      {selectedNavSection == '' && (
        <div className='flex justify-center'>
          <span>Select a nav section to edit</span>
        </div>
      )}
    </div>
  )
}

export default NavEditor
