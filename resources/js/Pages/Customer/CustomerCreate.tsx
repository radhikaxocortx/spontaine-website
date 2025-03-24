import { FormItem } from '@/FormBuilder/FormBuilder'
import FormPage from '@/FormBuilder/FormPage'
import useCustomForm from '@/hooks/useCustomForm'
import { useMemo } from 'react'

const CustomerCreate = () => {
  const { formData, setFormValue } = useCustomForm({
    first_name: '',
    last_name: '',
    telephone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    country: '',
    postal_code: '',
    email: '',
    password: '',
    retype_password: '',
    have_company: false,
    company_legal_entity_name: '',
    company_address_line1: '',
    company_address_line2: '',
    company_city: '',
    company_postal_code: '',
    company_country: '',
    company_tax_id: '',
    company_registration_id: '',
  })
  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
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
        type: 'text',
        setValue: setFormValue('telephone'),
      },
      address_line1: {
        label: 'Address Line 1',
        placeholder: 'Enter Address ',
        type: 'textarea',
        setValue: setFormValue('address_line1'),
      },
      address_line2: {
        label: 'Address Line 2',
        placeholder: 'Enter Address ',
        type: 'textarea',
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
        setValue: setFormValue('country'),
      },
      postal_code: {
        label: 'Postal Code',
        placeholder: 'Enter Postal Code',
        type: 'text',
        setValue: setFormValue('postal_code'),
      },
      email: {
        label: 'Email',
        placeholder: 'Enter Email',
        type: 'email',
        setValue: setFormValue('email'),
      },
      password: {
        label: 'Password',
        placeholder: 'Enter Password',
        type: 'password',
        setValue: setFormValue('password'),
        validate: (val: string) => {
          if (!val) return 'Password is required'
          return true
        },
      },
      retype_password: {
        label: 'Retype Password',
        placeholder: 'Retype Password',
        type: 'password',
        setValue: setFormValue('retype_password'),
        validate: (val: string) => {
          if (!val) return 'Please confirm your password'
          if (val !== formData.password) return 'Passwords do not match'
          return true
        },
      },
      have_company: {
        label: 'Are you signing up on behalf of a company? ',
        type: 'checkbox',
        setValue: setFormValue('have_company'),
      },
      company_legal_entity_name: {
        label: 'Company Legal Entity Name',
        placeholder: 'Enter Company Legal Entity Name',
        type: 'text',
        setValue: setFormValue('company_legal_entity_name'),
        hidden: formData.have_company === false,
      },
      company_address_line1: {
        label: 'Company Address Line 1',
        placeholder: 'Enter Company Address ',
        type: 'textarea',
        setValue: setFormValue('company_address_line1'),
        hidden: formData.have_company === false,
      },
      company_address_line2: {
        label: 'Company Address Line 2',
        placeholder: 'Enter Company Address ',
        type: 'textarea',
        setValue: setFormValue('company_address_line2'),
        hidden: formData.have_company === false,
      },
      company_city: {
        label: 'City Where Company Located ',
        placeholder: 'Enter  City',
        type: 'text',
        setValue: setFormValue('company_city'),
        hidden: formData.have_company === false,
      },
      company_country: {
        label: 'Country of Company',
        placeholder: 'Enter Country',
        type: 'text',
        setValue: setFormValue('company_country'),
        hidden: formData.have_company === false,
      },
      company_postal_code: {
        label: 'Postal Code of Company',
        placeholder: 'Enter Postal Code',
        type: 'text',
        setValue: setFormValue('company_postal_code'),
        hidden: formData.have_company === false,
      },

      company_tax_id: {
        label: 'Company Tax ID',
        placeholder: 'Enter Company Tax ID',
        type: 'text',
        setValue: setFormValue('company_tax_id'),
        hidden: formData.have_company === false,
      },
      company_registration_id: {
        label: 'Company Registration ID',
        placeholder: 'Enter Company Registration ID',
        type: 'text',
        setValue: setFormValue('company_registration_id'),
        hidden: formData.have_company === false,
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, formData])

  return (
    <FormPage
      formItems={formItems}
      formData={formData}
      title='Sign Up'
      url={route('sign-up.store')}
    />
  )
}
export default CustomerCreate
