import AddButton from '@/components/CustomUI/Button/AddButton'
import ActionButton from '@/components/CustomUI/FormFields/ActionButton'
import SelectList from '@/components/CustomUI/FormFields/SelectList'
import Modal from '@/components/CustomUI/Modal/Modal'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { useState } from 'react'
import ResolveComponent from './ResolveComponent'

const pageBlocks = [
  { name: 'Home - Hero Section' },
  { name: 'Home - Company Marquee' },
  { name: 'Home - Image Cards' },
  { name: 'Home - Banner With Image' },
  { name: 'Home - Video Section' },
  { name: 'Home - Testimonial Section' },
  { name: 'Home - Call To Action' },
  { name: 'Home - Grid With Video' },
  { name: 'Home - Full Width Image With Title' },
  { name: 'Content Section - FAQ Style Accordion with Links' },
  { name: 'Content Section - Contact Us' },
  { name: 'Content Section - Price Plan' },
  { name: 'Sample - Left Image' },
  { name: 'Formatted Text' },
]

interface Properties {
  onBlockAdd: (block: string) => void
  page: Page
}

const AddPageBlock = ({ onBlockAdd }: Properties) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedBlock, setSelectedBlock] = useState('')

  const addComponent = () => {
    onBlockAdd(selectedBlock)
    setShowModal(false)
  }

  return (
    <>
      <>
        <AddButton onClick={() => setShowModal(true)} />
      </>
      {showModal && (
        <Modal
          title='Add Component'
          setShowModal={setShowModal}
          large
        >
          <div className='flex flex-col gap-5 p-2'>
            <div className='flex flex-wrap justify-end gap-4'>
              <div className='flex flex-grow flex-col'>
                <SelectList
                  label='Component'
                  displayKey='name'
                  dataKey='name'
                  list={pageBlocks}
                  value={selectedBlock}
                  setValue={setSelectedBlock}
                />
              </div>
              <div className='flex flex-col justify-end'>
                <ActionButton
                  label='ADD'
                  onClick={addComponent}
                />
              </div>
            </div>
            <div className='mt-4'>
              <ResolveComponent blockName={selectedBlock} />
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default AddPageBlock
