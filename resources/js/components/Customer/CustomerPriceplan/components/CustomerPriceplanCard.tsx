import { CustomerPricePlan } from '@/components/Interface/data_interface'
import { getDisplayDate } from '@/lib/utils'
import NormalText from '@/typography/NormalText'
import SmallText from '@/typography/SmallText'
import StrongText from '@/typography/StrongText'
import { router } from '@inertiajs/react'
import { AlertCircle, Bell, Calendar, CheckCircle2, Clock, FileText } from 'lucide-react'

interface Props {
  plan: CustomerPricePlan
}

const CustomerPriceplanCard = ({ plan }: Readonly<Props>) => {
  const handleCardClick = (id: number) => {
    router.get(route('customer-workflow-show', id))
  }

  const getStatusIcon = (status: string | undefined) => {
    if (status === 'Completed' || status === 'Verified') {
      return <CheckCircle2 className='h-5 w-5 text-alert-700' />
    }
    return <AlertCircle className='h-5 w-5 text-highlight-500' />
  }

  const calculateExpiryDate = (createdAt: string | null | undefined, validity: number) => {
    if (!validity || !createdAt) return 'Not set'
    const createdDate = new Date(createdAt)
    const expiryDate = new Date(createdDate.setDate(createdDate.getDate() + validity))
    return getDisplayDate(expiryDate.toISOString())
  }

  const formatDate = (date: string | null | undefined) => {
    if (!date) return 'Not set'
    return getDisplayDate(date)
  }

  const hasModuleUpdates = (plan: CustomerPricePlan) => {
    return (
      plan.verification_status?.customer_notes || plan.verification_status?.status !== 'Completed'
    )
  }

  return (
    <div
      onClick={() => handleCardClick(plan.id)}
      className='cursor-pointer rounded-lg border bg-white p-4 transition-shadow hover:shadow-md'
    >
      {hasModuleUpdates(plan) && (
        <div className='flex items-center justify-end gap-2 rounded-full px-3 py-1'>
          <Bell className='h-4 w-4 text-primary-500' />
          <SmallText className='text-primary-600'>Updates</SmallText>
        </div>
      )}
      <div className='mb-4 flex flex-col gap-2'>
        <h3 className='text-lg font-semibold text-black-tertiary-950'>{plan.price_plan.name}</h3>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2 rounded-full bg-alert-50 px-3 py-1'>
            {getStatusIcon(plan.verification_status?.status)}
            <SmallText
              className={`${
                plan.verification_status?.status === 'Completed' ||
                plan.verification_status?.status === 'Verified'
                  ? 'text-alert-700'
                  : 'text-highlight-600'
              }`}
            >
              {plan.verification_status?.status ?? 'Not Started'}
            </SmallText>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <div className='flex items-center gap-2 text-neutral-600'>
          <Calendar className='h-4 w-4' />
          <NormalText>
            <StrongText>Created:</StrongText> {formatDate(plan.created_at)}
          </NormalText>
        </div>
        <div className='flex items-center gap-2 text-neutral-600'>
          <FileText className='h-4 w-4' />
          <NormalText>
            <StrongText>Plan Type:</StrongText> {plan.price_plan.type}
          </NormalText>
        </div>
        <div className='flex items-center gap-2 text-neutral-600'>
          <Clock className='h-4 w-4' />
          <NormalText>
            <StrongText>Expiry:</StrongText>{' '}
            {calculateExpiryDate(plan.created_at, plan.price_plan.validity)}
          </NormalText>
        </div>
        {plan.verification_status?.customer_notes && (
          <div className='mt-2 rounded bg-primary-50 p-2'>
            <SmallText className='text-primary-700'>
              {plan.verification_status.customer_notes}
            </SmallText>
          </div>
        )}
      </div>

      <div className='mt-4 border-t border-neutral-100 pt-3'>
        <button className='text-sm font-medium text-primary-600 hover:text-primary-800'>
          View Details
        </button>
      </div>
    </div>
  )
}

export default CustomerPriceplanCard
