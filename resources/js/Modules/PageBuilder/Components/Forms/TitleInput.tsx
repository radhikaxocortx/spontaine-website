import ActionButton from '@/components/CustomUI/FormFields/ActionButton'
import InputText from '@/components/CustomUI/FormFields/InputText'
import { RequiredTextData } from '@/Modules/PageBuilder/page_interfaces'
import { useCallback, useEffect } from 'react'
import useCustomForm from '../../../../hooks/useCustomForm'

interface Properties {
  onSubmit: (data: RequiredTextData | null) => void
  data?: RequiredTextData | null
  showRemove?: boolean
}

const TitleInput = ({ onSubmit, showRemove = false, data }: Properties) => {
  const { formData, setFormValue, setAll } = useCustomForm({
    english: '',
    malayalam: '',
  })

  useEffect(() => {
    if (data != null) {
      setAll({
        english: data.english,
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
        <InputText
          label='Value'
          value={formData.english ?? ''}
          setValue={setFormValue('english')}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <InputText
          label='Value (Malayalam)'
          value={formData.malayalam ?? ''}
          setValue={setFormValue('malayalam')}
          error=''
        />
      </div>
      <div className='flex w-full justify-end gap-x-2 p-2'>
        <ActionButton
          label='ADD'
          onClick={onFormSubmit}
        />
        {showRemove && (
          <ActionButton
            variant='destructive'
            label='REMOVE'
            onClick={() => onSubmit(null)}
          />
        )}
      </div>
    </>
  )
}

export default TitleInput
