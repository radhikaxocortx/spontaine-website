import { Card } from '@/Components/CustomUI/Card/card'
import StepperForm from '@/Components/CustomUI/FormFields/StepperForm'
import { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import AppLayout from '@/Layouts/AppLayout'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { useMemo } from 'react'

type FormData = {
  first_name: string
  last_name: string
  telephone: string
  address_line1: string
  address_line2: string
  city: string
  country: string
  postal_code: string
  email: string
  password: string
  retype_password: string
  have_company: boolean
  company_legal_entity_name: string
  company_address_line1: string
  company_address_line2: string
  company_city: string
  company_postal_code: string
  company_country: string
  company_tax_id: string
  company_registration_id: string
}

const CustomerCreate = () => {
  const { formData, setFormValue } = useCustomForm<FormData>({
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

  const steps = useMemo(() => {
    const baseSteps = [
      {
        title: 'Personal Information',
        formItems: {
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
          email: {
            label: 'Email',
            placeholder: 'Enter Email',
            type: 'email',
            setValue: setFormValue('email'),
          },
        } as Record<
          keyof FormData,
          FormItem<FormData[keyof FormData], string, string, Record<string, string>>
        >,
      },
      {
        title: 'Address Information',
        formItems: {
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
          keyof FormData,
          FormItem<FormData[keyof FormData], string, string, Record<string, string>>
        >,
      },
      {
        title: 'Company Information',
        formItems: {
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
          keyof FormData,
          FormItem<FormData[keyof FormData], string, string, Record<string, string>>
        >,
      },
      {
        title: 'Account Security',
        formItems: {
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
        } as Record<
          keyof FormData,
          FormItem<FormData[keyof FormData], string, string, Record<string, string>>
        >,
      },
    ]

    // If company checkbox is not checked, remove the company information step
    if (!formData.have_company) {
      return baseSteps.filter((step) => step.title !== 'Company Information')
    }

    return baseSteps
  }, [setFormValue, formData])

  const handleSubmit = () => {
    // Handle form submission
  }

  return (
    <AppLayout>
      <AppLayoutPadding>
        <Card className='m-4'>
          <div className='grid min-h-screen grid-cols-1 rounded-xl md:grid-cols-2'>
            {/* Left Panel - Form */}
            <div className='p-8'>
              <div className='mx-auto max-w-xl'>
                {/* Title and Description */}
                <div className='mb-8'>
                  <h1 className='mb-2 text-2xl font-bold'>Get Started</h1>
                  <p className='text-gray-600'>
                    Verify your business or individual profile to build trust, gain credibility, and
                    unlock new opportunities across Africa.
                  </p>
                </div>

                {/* Stepper Form */}
                <StepperForm
                  steps={steps}
                  formData={formData}
                  onFormSubmit={handleSubmit}
                  buttonText='Continue'
                />
              </div>
            </div>

            {/* Right Panel - Image */}
            <div className='hidden rounded-xl md:block'>
              <img
                src='/imge/sideimage.png'
                alt='Payment Terminal'
                className='h-full w-full rounded-r-xl object-cover'
              />
            </div>
          </div>
        </Card>
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default CustomerCreate
