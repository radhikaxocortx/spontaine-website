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
import { Fragment, useEffect, useReducer, useRef, useState } from 'react'

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
  { label: 'Alternate Language', value: 'mal' },
]

const PageBuilder = ({ page, dependencies }: Properties) => {
  const [pageBlock, managePage] = useReducer(PageBuilderService, page.blocks)
  const [language, setLanguage] = useState<Language>('en')
  const lastBlockRef = useRef<HTMLDivElement>(null)
  const blockGridRef = useRef<HTMLDivElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowScrollTop(scrollPosition > 300)
    }

    // Create intersection observer for the block grid
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        // Hide scroll button when block grid is visible
        if (entry.isIntersecting) {
          setShowScrollTop(false)
        } else {
          // Only show button if we've scrolled down enough
          handleScroll()
        }
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the grid is visible
      }
    )

    if (blockGridRef.current) {
      observer.observe(blockGridRef.current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollToTop = () => {
    blockGridRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const addComponent = (block: string, position: 'top' | 'end') => {
    managePage({
      action: 'ADD_BLOCK',
      blockName: block,
      position,
    })

    // Scroll to the newly added block
    setTimeout(() => {
      if (position === 'top') {
        // Find the first block editor element
        const firstBlock = document.querySelector('.block-editor')
        if (firstBlock) {
          firstBlock.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      } else {
        // Scroll to the last block
        lastBlockRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }, 100)
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
          </div>
        </div>

        <div className='mt-8 space-y-6'>
          <div ref={blockGridRef}>
            <AddPageBlock onBlockAdd={addComponent} />
          </div>

          <div className='space-y-6 bg-white'>
            {pageBlock.blocks.map((block, index) => (
              <Fragment key={block.id.toString()}>
                <div
                  ref={index === pageBlock.blocks.length - 1 ? lastBlockRef : null}
                  className='block-editor'
                >
                  <BlockEditor
                    block={block}
                    dispatch={managePage}
                    language={language}
                    dependencies={dependencies}
                  />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 rounded-full bg-primary-800 p-3 text-white shadow-lg transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          aria-label='Scroll to top'
        >
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 10l7-7m0 0l7 7m-7-7v18'
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default PageBuilder
