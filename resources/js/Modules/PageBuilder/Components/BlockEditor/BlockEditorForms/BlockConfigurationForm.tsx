import ActionButton from '@/Components/CustomUI/FormFields/ActionButton'
import SelectList from '@/Components/CustomUI/FormFields/SelectList'
import Modal from '@/Components/CustomUI/Modal/Modal'
import useCustomForm from '@/hooks/useCustomForm'
import { Block, BlockConfiguration } from '@/Modules/PageBuilder/page_interfaces'
import React, { FormEvent, useCallback, useEffect } from 'react'

interface Properties {
  showForm: boolean
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  onConfigUpdate: (block: BlockConfiguration) => void
  block?: Block
}

const paddingTops: {
  value: string
  label: string
}[] = [
  { value: 'pt-0', label: '0' },
  { value: 'pt-1', label: '1' },
  { value: 'pt-2', label: '2' },
  { value: 'pt-3', label: '3' },
  { value: 'pt-4', label: '4' },
  { value: 'pt-5', label: '5' },
  { value: 'pt-6', label: '6' },
  { value: 'pt-7', label: '7' },
  { value: 'pt-8', label: '8' },
  { value: 'pt-9', label: '9' },
  { value: 'pt-10', label: '10' },
]

const paddingBottoms = [
  { value: 'pb-0', label: '0' },
  { value: 'pb-1', label: '1' },
  { value: 'pb-2', label: '2' },
  { value: 'pb-3', label: '3' },
  { value: 'pb-4', label: '4' },
  { value: 'pb-5', label: '5' },
  { value: 'pb-6', label: '6' },
  { value: 'pb-7', label: '7' },
  { value: 'pb-8', label: '8' },
  { value: 'pb-9', label: '9' },
  { value: 'pb-10', label: '10' },
]

const marginTops = [
  { value: 'mt-0', label: '0' },
  { value: 'mt-1', label: '1' },
  { value: 'mt-2', label: '2' },
  { value: 'mt-3', label: '3' },
  { value: 'mt-4', label: '4' },
  { value: 'mt-5', label: '5' },
  { value: 'mt-6', label: '6' },
  { value: 'mt-7', label: '7' },
  { value: 'mt-8', label: '8' },
  { value: 'mt-9', label: '9' },
  { value: 'mt-10', label: '10' },
]

const marginBottoms = [
  { value: 'mb-0', label: '0' },
  { value: 'mb-1', label: '1' },
  { value: 'mb-2', label: '2' },
  { value: 'mb-3', label: '3' },
  { value: 'mb-4', label: '4' },
  { value: 'mb-5', label: '5' },
  { value: 'mb-6', label: '6' },
  { value: 'mb-7', label: '7' },
  { value: 'mb-8', label: '8' },
  { value: 'mb-9', label: '9' },
  { value: 'mb-10', label: '10' },
]

const mobileColSpanOptions = [{ value: 'col-span-full', label: 'Full Width' }]

const tabletColSpanOptions = [
  { value: 'md:col-span-full', label: 'Full Width' },
  { value: 'md:col-span-1', label: '1/2' },
]

const laptopColSpanOptions = [
  { value: 'lg:col-span-full', label: 'Full Width' },
  { value: 'lg:col-span-2', label: '1/2' },
  { value: 'lg:col-span-1', label: '1/4' },
]

const desktopColSpanOptions = [
  { value: 'xl:col-span-full', label: 'Full Width' },
  { value: 'xl:col-span-2', label: '1/2' },
  { value: 'xl:col-span-1', label: '1/4' },
]

const BlockConfigurationForm = ({ showForm, setShowForm, onConfigUpdate, block }: Properties) => {
  const { formData, setFormValue, setAll } = useCustomForm({
    paddingTop: '',
    paddingBottom: '',
    marginTop: '',
    marginBottom: '',
    mobileWidth: '',
    tabletWidth: '',
    laptopWidth: '',
    desktopWidth: '',
  })

  useEffect(() => {
    if (block != null) {
      setAll({
        paddingTop: block.paddingTop ?? '',
        paddingBottom: block.paddingBottom ?? '',
        marginTop: block.marginTop ?? '',
        marginBottom: block.marginBottom ?? '',
        mobileWidth: block.mobileWidth ?? 'col-span-full',
        tabletWidth: block.tabletWidth ?? 'md:col-span-full',
        laptopWidth: block.laptopWidth ?? 'lg:col-span-full',
        desktopWidth: block.desktopWidth ?? 'xl:col-span-full',
      })
    }
  }, [block, setAll])

  const submitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setShowForm(false)
      onConfigUpdate(formData)
    },
    [onConfigUpdate, setShowForm, formData]
  )

  return (
    <>
      {showForm && (
        <Modal
          setShowModal={setShowForm}
          title='Block Configuration'
        >
          <form
            className='flex flex-col gap-2 p-5'
            onSubmit={submitForm}
          >
            <div className='flex flex-col'>
              <SelectList
                label='Padding Top'
                list={paddingTops}
                value={formData.paddingTop}
                dataKey='value'
                displayKey='label'
                setValue={setFormValue('paddingTop')}
              />
            </div>
            <div className='flex flex-col'>
              <SelectList
                label='Padding Bottom'
                list={paddingBottoms}
                value={formData.paddingBottom}
                dataKey='value'
                displayKey='label'
                setValue={setFormValue('paddingBottom')}
              />
            </div>
            <div className='flex flex-col'>
              <SelectList
                label='Margin Top'
                list={marginTops}
                value={formData.marginTop}
                dataKey='value'
                displayKey='label'
                setValue={setFormValue('marginTop')}
              />
            </div>
            <div className='flex flex-col'>
              <SelectList
                label='Margin Bottom'
                list={marginBottoms}
                value={formData.marginBottom}
                dataKey='value'
                displayKey='label'
                setValue={setFormValue('marginBottom')}
              />
            </div>
            <div className='flex flex-col'>
              <SelectList
                label='Width (Mobile)'
                list={mobileColSpanOptions}
                value={formData.mobileWidth}
                dataKey='value'
                displayKey='label'
                setValue={setFormValue('mobileWidth')}
              />
            </div>
            <div className='flex flex-col'>
              <SelectList
                label={'Width (Tablet)'}
                setValue={setFormValue('tabletWidth')}
                value={formData.tabletWidth}
                list={tabletColSpanOptions}
                dataKey='value'
                displayKey='label'
              />
            </div>
            <div className='flex flex-col'>
              <SelectList
                setValue={setFormValue('laptopWidth')}
                list={laptopColSpanOptions}
                dataKey='value'
                displayKey='label'
                label={'Width (Laptop)'}
                value={formData.laptopWidth}
              />
            </div>
            <div className='flex flex-col'>
              <SelectList
                setValue={setFormValue('desktopWidth')}
                list={desktopColSpanOptions}
                dataKey='value'
                displayKey='label'
                label={'Width (Desktop)'}
                value={formData.desktopWidth}
              />
            </div>
            <div className='flex justify-end'>
              <ActionButton label='Save' />
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}

export default BlockConfigurationForm
