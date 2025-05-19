import SelectList from '@/components/CustomUI/FormFields/SelectList'
import { Button } from '@/components/ui/button'
import use419Error from '@/hooks/use419Error'
import { router } from '@inertiajs/react'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { NavMenu } from '../page_interfaces'
import useFetchNavSection from './fetch-nav-section'
import AddNavMenuItem from './Forms/AddNavMenuItem'
import DeleteNavSection from './Forms/DeleteNavSection'
import UpdateNavMenu from './Forms/UpdateNavMenu'
import navBuilder from './nav-builder'
import NavEditorForm from './NavEditorForm'

interface Props {
  menuItems: Pick<
    NavMenu,
    'id' | 'title' | 'title_malayalam' | 'is_link' | 'link_info' | 'position'
  >[]
}

const NavEditor = ({ menuItems }: Readonly<Props>) => {
  const [selectedNavMenuItem, setSelectedNavMenuItem] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const { menuItem, loading } = useFetchNavSection(selectedNavMenuItem)
  const [selectedSection, sectionDispatch] = useReducer(navBuilder, null)

  const selectedMenuItem = useMemo(() => {
    return menuItems.find((item) => item.title === selectedNavMenuItem)
  }, [menuItems, selectedNavMenuItem])

  useEffect(() => {
    sectionDispatch({ action: 'CHANGE_SECTION', sections: menuItem })
  }, [menuItem])

  use419Error()

  const saveChanges = () => {
    if (!selectedMenuItem?.id) {
      return
    }

    router.post(`/nav-editor/${selectedMenuItem.id}/sections`, {
      data: { ...selectedSection },
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
    if (selectedNavMenuItem == '') {
      return
    }
    if (!menuItems.some((section) => section.title === selectedNavMenuItem)) {
      setSelectedNavMenuItem('')
    }
  }, [menuItems, selectedNavMenuItem])

  return (
    <div className='flex flex-col gap-5 p-5'>
      <div className='flex justify-end'>
        <Button
          variant='secondary'
          onClick={changeLanguage}
        >
          {selectedLanguage === 'en' ? 'English' : 'Alt Lang'}
        </Button>
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4 xl:gap-5'>
        <div className='flex flex-col'>
          <SelectList
            label='Nav section'
            list={menuItems}
            value={selectedNavMenuItem}
            setValue={setSelectedNavMenuItem}
            dataKey='title'
            displayKey='title'
          />
        </div>
        <div className='self-end'>
          <AddNavMenuItem />
        </div>
      </div>
      {selectedMenuItem != null && (
        <>
          <span className='text-sm text-red-500'>
            Make sure to save changes before changing nav menu item.
          </span>
          <div className='flex items-center gap-5'>
            <div className=''>
              <Button onClick={saveChanges}>SAVE CHANGES</Button>
            </div>
            <UpdateNavMenu menuItem={selectedMenuItem} />
            <DeleteNavSection menuItem={selectedMenuItem} />
          </div>
        </>
      )}
      {selectedSection != null && selectedMenuItem != null && selectedMenuItem.is_link === 0 && (
        <NavEditorForm
          language={selectedLanguage}
          actionDispatch={sectionDispatch}
          loading={loading}
          selectedSection={selectedSection}
        />
      )}
      {selectedNavMenuItem == '' && (
        <div className='flex justify-center'>
          <span>Select a nav section to edit</span>
        </div>
      )}
    </div>
  )
}

export default NavEditor
