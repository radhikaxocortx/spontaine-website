import { Button } from '@/components/ui/button'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { router } from '@inertiajs/react'
import { FormEvent, useCallback, useMemo } from 'react'

const AccountSecurity = () => {
  const { formData, setFormValue } = useCustomForm({
    password: '',
    retype_password: '',
  })

  const formItems = useMemo(() => {
    return {
      password: {
        label: 'Password',
        placeholder: 'Enter Password',
        type: 'password',
        setValue: setFormValue('password'),
      },
      retype_password: {
        label: 'Retype Password',
        placeholder: 'Retype Password',
        type: 'password',
        setValue: setFormValue('retype_password'),
      },
    } as Record<
      keyof typeof formData,
      FormItem<string | boolean, string, string, Record<string, string>>
    >
  }, [setFormValue])

  const { post, loading, errors } = useInertiaPost(route('account-security'))
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
      <div className='col-span-2 flex flex-row justify-between gap-4'>
        <Button
          type='button'
          variant='outline'
          onClick={() => {
            router.get(route('previous-account-security'))
          }}
        >
          Previous
        </Button>
        <Button type='submit'>Next</Button>
      </div>
    </FormBuilder>
  )
}

export default AccountSecurity
