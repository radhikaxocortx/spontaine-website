import { AddressDetail, CompanyInfo, PersonalInfo } from '@/components/Interface/data_interface'
import { Progress } from '@/components/ui/progress'
import AppLayout from '@/Layouts/AppLayout'
import HeroHeadline from '@/typography/HeroHeadline'
import HeroTextBlock from '@/typography/HeroTextBlock'
import AccountSecurity from './AccountSecurity'
import AddressDetails from './AddressDetails'
import CompanyInformation from './CompanyInformation'
import PersonalInformation from './PersonalInformation'

interface Props {
  priceplan_id?: number | null
  step: number
  personalInformation?: PersonalInfo
  addressDetails?: AddressDetail
  companyInformation?: CompanyInfo
}

const CustomerCreatePage = ({
  priceplan_id,
  step,
  personalInformation,
  addressDetails,
  companyInformation,
}: Props) => {
  const heading =
    step === 1
      ? 'Personal Information'
      : step === 2
        ? 'Address Details'
        : step === 3
          ? 'Company Information'
          : step === 4
            ? 'Account Security'
            : 'Thank You'

  const progress = step * 25

  return (
    <AppLayout>
      <div className='min-h-screen bg-primary-100 p-4 md:grid md:grid-cols-2'>
        {/* Left Side: Form Section */}
        <div className='flex w-full flex-1 flex-col gap-8 p-8 lg:p-16'>
          <div className=''>
            <div className='mb-6 gap-4'>
              <HeroHeadline className='text-primary-950'>Get Started</HeroHeadline>
              <HeroTextBlock className='text-neutral-graige-600'>
                Verify your business or individual profile to build trust, gain credibility, and
                unlock new opportunities across Africa.
              </HeroTextBlock>
            </div>
            <div className='w-full rounded-xl bg-white p-5 shadow-md'>
              {/* Stepper Progress */}
              <div className='px-5'>
                <div className='mb-4 pt-10'>
                  <Progress
                    value={progress}
                    className='h-2'
                  />
                </div>
                <h3 className='text-primary mb-4 pb-10 text-lg font-semibold'>{heading}</h3>
              </div>
              {/* Form */}
              <div className='px-5'>
                {step === 1 && (
                  <PersonalInformation
                    priceplan_id={priceplan_id ?? null}
                    personalInformation={personalInformation}
                  />
                )}
                {step === 2 && <AddressDetails addressDetails={addressDetails} />}
                {step === 3 && <CompanyInformation companyInformation={companyInformation} />}
                {step === 4 && <AccountSecurity />}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image Section */}
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

export default CustomerCreatePage
