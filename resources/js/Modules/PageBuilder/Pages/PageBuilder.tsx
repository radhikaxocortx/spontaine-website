import BackButton from '@/Components/CustomUI/Button/BackButton'
import DeleteButton from '@/Components/CustomUI/Button/DeleteButton'
import EditButton from '@/Components/CustomUI/Button/EditButton'
import ActionButton from '@/Components/CustomUI/FormFields/ActionButton'
import SelectList from '@/Components/CustomUI/FormFields/SelectList'
import DeleteModal from '@/Components/CustomUI/Modal/DeleteModal'
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
    <>
      <div className='h-64 bg-slate-900 px-2 pt-10 shadow-2xl'>
        <div className='mb-2 mt-5 flex w-full flex-wrap items-start justify-start'>
          <span className='text-sm text-white'>/{page.url}</span>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='flex flex-wrap gap-4'>
            <BackButton link={`/pages`} />
            <ActionButton
              onClick={save}
              label='Save'
            />
            <EditButton link={`/pages/${page.id}/edit`} />
            <DeleteButton onClick={() => setShowDeleteModal((old) => !old)} />
          </div>
        </div>
        {showDeleteModal && (
          <DeleteModal
            url={`/pages/${page.id}`}
            setShowModal={setShowDeleteModal}
            title={`Delete ${page.id}`}
          >
            <p>Confirm Deleting {page.title}?</p>
          </DeleteModal>
        )}
        <div className='mt-1 flex justify-center'>
          <h3 className='text-white'>Add/Edit Blocks</h3>
        </div>
        <div className='mb-32 flex flex-wrap items-end justify-end gap-5 p-4'>
          <div className='flex flex-col'>
            <SelectList
              label='Language'
              list={languages}
              displayKey='label'
              dataKey='value'
              value={language}
              setValue={(value: string) => setLanguage(value as Language)}
            />
          </div>
          <AddPageBlock
            onBlockAdd={addComponent}
            page={page}
          />
        </div>
      </div>
      <div className='mt-56 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {pageBlock.blocks.map((block) => {
          return (
            <Fragment key={block.id.toString()}>
              <BlockEditor
                block={block}
                dispatch={managePage}
                language={language}
                dependencies={dependencies}
              />
            </Fragment>
          )
        })}
      </div>
    </>
  )
}

export default PageBuilder
