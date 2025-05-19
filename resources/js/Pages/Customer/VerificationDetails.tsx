import ApplicationLogo from '@/components/CustomUI/ApplicationLogo'
import {
  CustomerPricePlan,
  KadodoID,
  ModuleStatusVerification,
} from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import AppLayout from '@/Layouts/AppLayout'
import { Printer } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

interface Props {
  kadodoId: KadodoID
  customerPriceplan: CustomerPricePlan
  moduleVerification: ModuleStatusVerification
}

const formatDateLong = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

const VerificationDetails = ({ kadodoId, customerPriceplan }: Props) => {
  const companyName = customerPriceplan.customer.company?.company_legal_entity_name || ''
  const org = customerPriceplan.customer.company
  const address = org
    ? [
        org.company_address_line_1,
        org.company_address_line_2,
        org.company_city,
        org.company_postal_code,
        org.company_country,
      ]
        .filter(Boolean)
        .join(', ')
    : ''
  const kadodoID = kadodoId.kadodo_id
  const validTo = formatDateLong(kadodoId.valid_to)

  return (
    <AppLayout>
      <div className='flex w-full flex-col items-center justify-center p-6'>
        {/* Print Button */}
        <div className='mr-10 flex w-full justify-end pr-10'>
          <Button
            type='button'
            onClick={() => window.print()}
            variant='default'
            size='icon'
            className='mb-4 print:hidden'
            aria-label='Print Certificate'
          >
            <Printer className='h-5 w-5' />
          </Button>
        </div>
        <div
          className='relative flex h-[842px] w-[595px] flex-col items-center justify-center gap-2 rounded-xl border-3 border-secondary-500 bg-white/80 shadow-xl'
          style={{ background: `url(/imge/cert-bg.png) center/cover no-repeat` }}
        >
          {/* Logo */}
          <ApplicationLogo className='mb-4 h-14' />
          {/* Title */}
          <h1 className='mb-2 font-serif text-3xl tracking-widest text-primary-950'>
            VERIFIED BUSINESS
          </h1>

          {/* QR Code */}
          <div className='my-4 flex flex-col items-center gap-2'>
            <QRCodeSVG
              value={route('verification-details', kadodoID)}
              size={80}
            />
            {/* Kadodo ID */}
            <div className='mb-4 font-mono text-lg tracking-widest text-indigo-800'>{kadodoID}</div>
          </div>

          {/* Certificate Text */}
          <div className='mb-2 text-center text-sm text-secondary-950'>
            WE CONFIRM, BASED ON DIRECT AUDITS PERFORMED THAT
          </div>
          {/* Company Name */}
          <div className='mb-1 text-center text-lg font-bold uppercase tracking-wide text-indigo-900'>
            {companyName}
          </div>
          {/* Address */}
          <div className='mb-4 text-center text-xs text-gray-700'>{address}</div>
          {/* Credentials Text */}
          <div className='mb-4 text-center text-xs text-gray-700'>
            POSSESSES CREDENTIALS THAT MATCH KADODO AFRICA <br /> BUSINESS VERIFICATION STANDARDS.
          </div>
          {/* Validity */}
          <div className='mb-1 text-center text-xs text-gray-700'>CERTIFICATE VALID UNTIL</div>
          <div className='mb-8 text-center text-base font-semibold text-indigo-900'>{validTo}</div>
        </div>
      </div>
    </AppLayout>
  )
}
export default VerificationDetails
