import { FormItem } from '@/FormBuilder/FormBuilder'
import StepperFormPage from '@/FormBuilder/StepperFormPage'
import useCustomForm from '@/hooks/useCustomForm'
import AppLayout from '@/Layouts/AppLayout'
import HeroHeadline from '@/typography/HeroHeadline'
import HeroTextBlock from '@/typography/HeroTextBlock'
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
        type: 'text',
        setValue: setFormValue('telephone'),
      },
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
      },
      retype_password: {
        label: 'Confirm Password',
        placeholder: 'Retype Password',
        type: 'password',
        setValue: setFormValue('retype_password'),
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
        setValue: (value: string) => setFormValue('company_country')(value.toUpperCase()),
        hidden: formData.have_company === false,
      },
      company_postal_code: {
        label: 'Postal Code of Company',
        placeholder: 'Enter Postal Code',
        type: 'text',
        setValue: setFormValue('company_postal_code'),
        hidden:
          formData.have_company === false ||
          formData.company_country?.toUpperCase() === 'SIERRA LEONE'.toUpperCase(),
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
    } as Record<
      keyof typeof formData,
      FormItem<string | boolean, string, string, Record<string, string>>
    >
  }, [setFormValue, formData])

  const steps = [
    {
      title: 'Personal Information',
      fields: ['first_name', 'last_name', 'telephone', 'email'] as const,
      requiredFields: ['first_name', 'last_name', 'telephone', 'email'] as const,
      validationRules: {
        email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        first_name: (value: string) => value.length > 0,
        telephone: (value: string) => /^\+?[\d\s-]{10,}$/.test(value),
      },
    },
    {
      title: 'Address Details',
      fields: [
        'address_line1',
        'address_line2',
        'city',
        'country',
        'postal_code',
        'have_company',
      ] as const,
      requiredFields: ['address_line1', 'city', 'country'] as const,
    },
    {
      title: 'Company Information',
      fields: [
        'company_legal_entity_name',
        'company_address_line1',
        'company_address_line2',
        'company_city',
        'company_country',
        'company_postal_code',
        'company_tax_id',
        'company_registration_id',
      ] as const,
      requiredFields: [
        'company_legal_entity_name',
        'company_address_line1',
        'company_city',
        'company_country',
      ] as const,
      hidden: !formData.have_company,
    },
    {
      title: 'Account Security',
      fields: ['password', 'retype_password'] as const,
      requiredFields: ['password', 'retype_password'] as const,
      validationRules: {
        password: (value: string) => value.length >= 8,
        retype_password: (value: string) => value === formData.password,
      },
    },
  ] as const

  return (
    <AppLayout>
      <div className='m-4 grid min-h-screen grid-cols-1 rounded-xl bg-primary-100 md:grid-cols-2'>
        <div className='relative flex flex-col'>
          <div className='flex flex-1 flex-col gap-8 p-8 md:p-12 lg:p-16'>
            {/* Header */}
            <div className='gap-4'>
              <HeroHeadline className='text-primary-950'>Get Started</HeroHeadline>
              <HeroTextBlock className='text-neutral-graige-600'>
                Verify your business or individual profile to build trust, gain credibility, and
                unlock new opportunities across Africa.
              </HeroTextBlock>
            </div>

            {/* Form */}
            <div className='flex-1'>
              <div className='min-h-[600px]'>
                <StepperFormPage
                  formItems={formItems}
                  formData={formData}
                  steps={steps}
                  buttonText='Verify Email'
                  url={route('sign-up.store')}
                  onStepChange={(step) => {
                    console.log(`Moving to step ${step + 1}`)
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className='relative hidden h-full rounded-xl md:block'>
          <img
            src='/imge/signup.png'
            alt='Verification Process'
            className='absolute inset-0 h-full w-full rounded-xl object-cover object-center'
          />
          <div className='absolute inset-0 bg-black/10' />
        </div>
      </div>
    </AppLayout>
  )
}
export default CustomerCreate
