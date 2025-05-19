import { PersonalInfo } from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { FormEvent, useCallback, useMemo } from 'react'

interface Props {
  priceplan_id: number | null
  personalInformation?: PersonalInfo
}

const PersonalInformation = ({ priceplan_id, personalInformation }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    priceplan_id: priceplan_id,
    first_name: personalInformation?.first_name ?? '',
    last_name: personalInformation?.last_name ?? '',
    telephone: personalInformation?.telephone ?? '',
    email: personalInformation?.email ?? '',
  })

  const formItems = useMemo(() => {
    return {
      first_name: {
        label: 'First Name',
        placeholder: 'Enter First Name',
        type: 'text',
        setValue: setFormValue('first_name'),
      },
      last_name: {
        label: 'Last Name',
        placeholder: 'Enter Last Name',
        type: 'text',
        setValue: setFormValue('last_name'),
      },
      telephone: {
        label: 'Telephone',
        placeholder: 'Enter Telephone No.',
        type: 'phone',
        setValue: setFormValue('telephone'),
      },
      email: {
        label: 'Email',
        placeholder: 'Enter Email',
        type: 'email',
        setValue: setFormValue('email'),
      },
    } as Record<
      keyof typeof formData,
      FormItem<string | boolean, string, string, Record<string, string>>
    >
  }, [setFormValue])

  const { post, loading, errors } = useInertiaPost(route('personal-information'))
  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      post({
        ...formData,
      })
    },
    [formData, post]
  )

  return (
    <FormBuilder
      formItems={formItems}
      formData={formData}
      onFormSubmit={handleFormSubmit}
      loading={loading}
      errors={errors}
      hideSubmitButton={true}
    >
      <div className='col-span-2 flex flex-row justify-end gap-4'>
        <Button type='submit'>Next</Button>
      </div>
    </FormBuilder>
  )
}

export default PersonalInformation
