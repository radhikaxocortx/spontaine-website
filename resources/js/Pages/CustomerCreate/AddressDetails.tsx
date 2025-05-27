import { AddressDetail } from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { router } from '@inertiajs/react'
import { FormEvent, useCallback, useMemo } from 'react'

interface Props {
  addressDetails?: AddressDetail | null
}

const AddressDetails = ({ addressDetails }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    address_line1: addressDetails?.address_line1 ?? '',
    address_line2: addressDetails?.address_line2 ?? '',
    city: addressDetails?.city ?? '',
    country: addressDetails?.country ?? '',
    postal_code: addressDetails?.postal_code ?? '',
    have_company: addressDetails?.have_company ?? false,
  })

  const formItems = useMemo(() => {
    return {
      address_line1: {
        label: 'Address Line 1',
        placeholder: 'Enter Address ',
        type: 'text',
        setValue: setFormValue('address_line1'),
      },
      address_line2: {
        label: 'Address Line 2',
        placeholder: 'Enter Address ',
        type: 'text',
        setValue: setFormValue('address_line2'),
      },
      city: {
        label: 'City',
        placeholder: 'Enter City',
        type: 'text',
        setValue: setFormValue('city'),
      },
      country: {
        label: 'Country',
        placeholder: 'Enter Country',
        type: 'text',
        setValue: (value: string) => setFormValue('country')(value.toUpperCase()),
      },
      postal_code: {
        label: 'Postal Code',
        placeholder: 'Enter Postal Code',
        type: 'text',
        setValue: setFormValue('postal_code'),
        hidden: formData.country?.toUpperCase() === 'SIERRA LEONE'.toUpperCase(),
      },
      have_company: {
        label: 'Are you signing up on behalf of a company? ',
        type: 'checkbox',
        setValue: setFormValue('have_company'),
      },
    } as Record<
      keyof typeof formData,
      FormItem<string | boolean, string, string, Record<string, string>>
    >
  }, [setFormValue, formData])

  const { post, loading, errors } = useInertiaPost(route('address-details'))
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
            router.get(route('previous-address-details'))
          }}
        >
          Previous
        </Button>
        <Button type='submit'>Next</Button>
      </div>
    </FormBuilder>
  )
}

export default AddressDetails
