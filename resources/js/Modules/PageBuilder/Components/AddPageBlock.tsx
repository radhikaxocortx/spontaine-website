import AddButton from '@/Components/CustomUI/Button/AddButton'
import ActionButton from '@/Components/CustomUI/FormFields/ActionButton'
import SelectList from '@/Components/CustomUI/FormFields/SelectList'
import Modal from '@/Components/CustomUI/Modal/Modal'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { useState } from 'react'
import ResolveComponent from './ResolveComponent'

const pageBlocks = [
  { name: 'Home - Hero Section' },
  { name: 'Home - Image Cards' },
  { name: 'Home - Grid With Video' },
  { name: 'Home - Full Width Image With Title' },
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
