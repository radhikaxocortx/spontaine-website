import ApplicationLogoWhite from '@/components/CustomUI/ApplicationLogoWhite'
import { CustomerPricePlan, KadodoID } from '@/components/Interface/data_interface'
import clsx from 'clsx'
import { QRCodeSVG } from 'qrcode.react'

interface VerifiedIdentityCardProps {
  customerPricePlan: CustomerPricePlan
}

const getCardType = (pricePlanType?: string) => {
  if (!pricePlanType) return 'identity'
  return pricePlanType.toLowerCase() === 'business' ? 'business' : 'identity'
}

const cardStyles = {
  identity: 'bg-gradient-to-br from-yellow-200 to-yellow-500 text-gray-900',
  business: 'bg-gradient-to-br from-indigo-200 to-indigo-600 text-white',
  blurred: 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-400 filter',
}

const cardLabels = {
  identity: 'Verified Identity',
  business: 'Verified Business',
}

const cardBackgrounds = {
  identity: '/imge/KadodoIdIndividual.png',
  business: '/imge/KadodoIdBusiness.png',
  blurred: '/imge/KadodoIdPending.png',
}

const VerifiedIdentityCard = ({ customerPricePlan }: VerifiedIdentityCardProps) => {
  const kadodoIdObj: KadodoID | undefined = customerPricePlan.kadodo_i_d
  const isGenerated = Boolean(customerPricePlan.kadodo_i_d?.kadodo_id)
  const cardType = getCardType(customerPricePlan.price_plan?.type)
  const cardClass = isGenerated ? cardStyles[cardType] : cardStyles.blurred
  const label = isGenerated ? cardLabels[cardType] : 'Verified'
  const name =
    customerPricePlan.customer?.company?.company_legal_entity_name ||
    `${customerPricePlan.customer?.first_name ?? ''} ${customerPricePlan.customer?.last_name ?? ''}`.trim()
  const kadodoId = kadodoIdObj?.kadodo_id || 'KD-XXXX-XXXXXX'
  const validTo = kadodoIdObj?.valid_to
    ? new Date(kadodoIdObj.valid_to).toLocaleDateString()
    : 'DD/MM/YYYY'

  const qrValue = isGenerated ? route('verification-details', kadodoId) : ''
  const cardBg = isGenerated ? cardBackgrounds[cardType] : cardBackgrounds.blurred

  return (
    <div
      className={clsx(
        'relative flex h-[220px] w-[340px] flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-xl',
        cardClass,
        !isGenerated && 'pointer-events-none select-none blur-sm filter backdrop-blur-lg'
      )}
      style={{
        letterSpacing: '1.5px',
        backgroundImage: `url(${cardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='flex items-center justify-between'>
        <span className='text-lg font-bold'>{label}</span>
        <ApplicationLogoWhite className='h-7' />
      </div>
      <div className='pl-2'>
        <div className='truncate font-id-font text-base'>{name}</div>

        <div className='flex justify-between'>
          <div className='mt-4 flex flex-col gap-4'>
            <div className='font-id-font text-sm tracking-widest'>{kadodoId}</div>
            <div className='font-id-font text-xs'>VALID UNTIL {validTo}</div>
          </div>
          <div className='flex flex-col items-center'>
            <span className='mb-1 text-xs'>DETAILS</span>
            <div
              className={clsx(
                'rounded bg-white p-1',
                isGenerated ? 'border border-yellow-400' : 'border border-gray-300'
              )}
            >
              <QRCodeSVG
                value={qrValue}
                size={48}
                level='M'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifiedIdentityCard
