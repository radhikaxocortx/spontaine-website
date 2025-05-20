import { CompanyInfo } from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { router } from '@inertiajs/react'
import { FormEvent, useCallback, useMemo } from 'react'

interface Props {
  companyInformation?: CompanyInfo
}

const CompanyInformation = ({ companyInformation }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    company_legal_entity_name: companyInformation?.company_legal_entity_name ?? '',
    company_address_line1: companyInformation?.company_address_line1 ?? '',
    company_address_line2: companyInformation?.company_address_line2 ?? '',
    company_city: companyInformation?.company_city ?? '',
    company_country: companyInformation?.company_country ?? '',
    company_postal_code: companyInformation?.company_postal_code ?? '',
    company_tax_id: companyInformation?.company_tax_id ?? '',
    company_registration_id: companyInformation?.company_registration_id ?? '',
  })

  const formItems = useMemo(() => {
    return {
      company_legal_entity_name: {
        label: 'Company Legal Entity Name',
        placeholder: 'Enter Company Legal Entity Name',
        type: 'text',
        setValue: setFormValue('company_legal_entity_name'),
      },
      company_address_line1: {
        label: 'Company Address Line 1',
        placeholder: 'Enter Company Address ',
        type: 'textarea',
        setValue: setFormValue('company_address_line1'),
      },
      company_address_line2: {
        label: 'Company Address Line 2',
        placeholder: 'Enter Company Address ',
        type: 'textarea',
        setValue: setFormValue('company_address_line2'),
      },
      company_city: {
        label: 'City Where Company Located ',
        placeholder: 'Enter  City',
        type: 'text',
        setValue: setFormValue('company_city'),
      },
      company_country: {
        label: 'Country of Company',
        placeholder: 'Enter Country',
        type: 'text',
        setValue: (value: string) => setFormValue('company_country')(value.toUpperCase()),
      },
      company_postal_code: {
        label: 'Postal Code of Company',
        placeholder: 'Enter Postal Code',
        type: 'text',
        setValue: setFormValue('company_postal_code'),
        hidden: formData.company_country?.toUpperCase() === 'SIERRA LEONE'.toUpperCase(),
      },
      company_tax_id: {
        label: 'Company Tax ID',
        placeholder: 'Enter Company Tax ID',
        type: 'text',
        setValue: setFormValue('company_tax_id'),
      },
      company_registration_id: {
        label: 'Company Registration ID',
        placeholder: 'Enter Company Registration ID',
        type: 'text',
        setValue: setFormValue('company_registration_id'),
      },
    } as Record<
      keyof typeof formData,
      FormItem<string | boolean, string, string, Record<string, string>>
    >
  }, [setFormValue, formData])

  const { post, loading, errors } = useInertiaPost(route('company-information'))
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
            router.get(route('previous-company-information'))
          }}
        >
          Previous
        </Button>
        <Button type='submit'>Next</Button>
      </div>
    </FormBuilder>
  )
}

export default CompanyInformation
