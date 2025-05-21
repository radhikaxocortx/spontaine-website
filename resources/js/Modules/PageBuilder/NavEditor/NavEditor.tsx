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

  useEffect(() => {
    if (selectedNavMenuItem == '') {
      return
    }
    if (!menuItems.some((section) => section.title === selectedNavMenuItem)) {
      setSelectedNavMenuItem('')
    }
  }, [menuItems, selectedNavMenuItem])

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mx-auto max-w-7xl'>
        {/* Header Section */}
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-lg font-semibold text-gray-900'>Navigation Editor</h1>
          <Button
            variant='outline'
            onClick={changeLanguage}
            className='flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          >
            <span className='capitalize'>{selectedLanguage}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Button>
        </div>

        {/* Main Content */}
        <div className='rounded-lg bg-white p-6 shadow-sm'>
          {/* Selection Controls */}
          <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='flex flex-col'>
              <SelectList
                label='Select Navigation Section'
                list={menuItems}
                value={selectedNavMenuItem}
                setValue={setSelectedNavMenuItem}
                dataKey='title'
                displayKey='title'
              />
            </div>
            <div className='flex items-end'>
              <AddNavMenuItem />
            </div>
          </div>

          {/* Action Bar */}
          {selectedMenuItem != null && (
            <div className='mb-6 rounded-lg border border-yellow-100 bg-yellow-50 p-4'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-center gap-2 text-sm text-yellow-700'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span>Make sure to save changes before changing nav menu item</span>
                </div>
                <div className='flex flex-wrap items-center gap-3'>
                  <Button
                    onClick={saveChanges}
                    className='bg-blue-600 hover:bg-blue-700'
                  >
                    Save Changes
                  </Button>
                  <UpdateNavMenu menuItem={selectedMenuItem} />
                  <DeleteNavSection menuItem={selectedMenuItem} />
                </div>
              </div>
            </div>
          )}

          {/* Editor Form */}
          {selectedSection != null &&
            selectedMenuItem != null &&
            selectedMenuItem.is_link === 0 && (
              <div className='rounded-lg border border-gray-200 bg-white p-6'>
                <NavEditorForm
                  language={selectedLanguage}
                  actionDispatch={sectionDispatch}
                  loading={loading}
                  selectedSection={selectedSection}
                />
              </div>
            )}

          {/* Empty State */}
          {selectedNavMenuItem === '' && (
            <div className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-12 text-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              <h3 className='mt-4 text-lg font-medium text-gray-900'>
                No Navigation Section Selected
              </h3>
              <p className='mt-2 text-sm text-gray-500'>
                Select a navigation section from the dropdown above to begin editing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavEditor
