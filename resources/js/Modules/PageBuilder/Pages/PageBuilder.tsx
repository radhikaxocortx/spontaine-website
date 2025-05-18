import BackButton from '@/components/CustomUI/Button/BackButton'
import DeleteButton from '@/components/CustomUI/Button/DeleteButton'
import EditButton from '@/components/CustomUI/Button/EditButton'
import ActionButton from '@/components/CustomUI/FormFields/ActionButton'
import SelectList from '@/components/CustomUI/FormFields/SelectList'
import DeleteModal from '@/components/CustomUI/Modal/DeleteModal'
import AddPageBlock from '@/Modules/PageBuilder/Components/AddPageBlock'
import BlockEditor from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import PageBuilderService from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { Page, PageDataDependencies } from '@/Modules/PageBuilder/page_interfaces'
import { router } from '@inertiajs/react'
import { Fragment, useReducer, useState } from 'react'

interface Properties {
  page: Page
  dependencies: PageDataDependencies
}

export type Language = 'en' | 'mal'

export const languages: {
  label: string
  value: string
}[] = [
  { label: 'English', value: 'en' },
  { label: 'Malayalam', value: 'mal' },
]

const PageBuilder = ({ page, dependencies }: Properties) => {
  const [pageBlock, managePage] = useReducer(PageBuilderService, page.blocks)
  const [language, setLanguage] = useState<Language>('en')

  const addComponent = (block: string) => {
    managePage({ action: 'ADD_BLOCK', blockName: block })
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const save = () => {
    router.post('/update-block/' + page.id, {
      blocks: pageBlock as any,
    })
  }
  return (
    <div className='min-h-screen bg-primary-50'>
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='hover:shadow-3xl overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300'>
          <div className='mb-6 flex items-center justify-between border-b border-white/10 pb-4'>
            <div className='flex items-center space-x-4'>
              <BackButton link='/pages' />
              <span className='text-lg font-medium text-white/90'>/{page.url}</span>
            </div>
            <div className='flex items-center space-x-3'>
              <ActionButton
                onClick={save}
                label='Save'
                className='bg-emerald-500 text-white transition-colors duration-200 hover:bg-emerald-600'
              />
              <EditButton
                link={`/pages/${page.id}/edit`}
                className='bg-blue-500 text-white transition-colors duration-200 hover:bg-blue-600'
              />
              <DeleteButton
                onClick={() => setShowDeleteModal((old) => !old)}
                className='bg-red-500 text-white transition-colors duration-200 hover:bg-red-600'
              />
            </div>
          </div>

          {showDeleteModal && (
            <DeleteModal
              url={`/pages/${page.id}`}
              setShowModal={setShowDeleteModal}
              title={`Delete ${page.id}`}
            >
              <p className='text-gray-900'>Confirm Deleting {page.title}?</p>
            </DeleteModal>
          )}

          <div className='mt-8 text-center'>
            <h3 className='text-2xl font-bold text-white'>Add/Edit Blocks</h3>
          </div>

          <div className='mt-6 flex flex-wrap items-end justify-end gap-6 p-4'>
            <div className='flex flex-col'>
              <SelectList
                label='Language'
                list={languages}
                displayKey='label'
                dataKey='value'
                value={language}
                setValue={(value: string) => setLanguage(value as Language)}
                style='dark'
                className='rounded-lg border border-white/20 bg-white/5 text-white backdrop-blur-sm'
              />
            </div>
            <AddPageBlock
              onBlockAdd={addComponent}
              page={page}
              className='rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white transition-colors duration-200 hover:bg-white/10'
            />
          </div>
        </div>

        <div className='mt-8 space-y-6 bg-white'>
          {pageBlock.blocks.map((block) => (
            <Fragment key={block.id.toString()}>
              <BlockEditor
                block={block}
                dispatch={managePage}
                language={language}
                dependencies={dependencies}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PageBuilder
