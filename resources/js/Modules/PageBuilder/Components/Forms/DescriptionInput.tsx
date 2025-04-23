import ActionButton from '@/components/CustomUI/FormFields/ActionButton'
import InputDescription from '@/components/CustomUI/FormFields/InputDescription'
import useCustomForm from '@/hooks/useCustomForm'
import { RequiredTextData, TextData } from '@/Modules/PageBuilder/page_interfaces'
import { useCallback, useEffect } from 'react'

interface Properties {
  onSubmit: (data: RequiredTextData | null) => void
  data?: TextData | null
  showRemove?: boolean
}

const DescriptionInput = ({ onSubmit, showRemove = false, data }: Properties) => {
  const { formData, setFormValue, setAll } = useCustomForm({
    english: '',
    malayalam: '',
  })

  useEffect(() => {
    if (data != null) {
      setAll({
        english: data.english ?? '',
        malayalam: data.malayalam ?? '',
      })
    }
  }, [data, setAll])

  const onFormSubmit = useCallback(() => {
    onSubmit(formData)
  }, [formData, onSubmit])

  return (
    <>
      <div className='flex w-full flex-col p-2'>
        <InputDescription
          label='Value'
          value={formData.english ?? ''}
          setValue={setFormValue('english')}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <InputDescription
          label='Value (Malayalam)'
          value={formData.malayalam ?? ''}
          setValue={setFormValue('malayalam')}
          error=''
        />
      </div>
      <div className='flex w-full justify-end gap-x-2 p-2'>
        <ActionButton
          label={data == null ? 'ADD' : 'UPDATE'}
          onClick={onFormSubmit}
        />
        {showRemove && (
          <ActionButton
            label='REMOVE'
            onClick={() => onSubmit(null)}
            variant='destructive'
          />
        )}
      </div>
    </>
  )
}

export default DescriptionInput
