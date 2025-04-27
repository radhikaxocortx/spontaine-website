import { CustomerPricePlan } from '@/components/Interface/data_interface'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getDisplayDate } from '@/lib/utils'
import NormalText from '@/typography/NormalText'
import SmallText from '@/typography/SmallText'
import StrongText from '@/typography/StrongText'
import { router } from '@inertiajs/react'
import { AlertCircle, Bell, Calendar, CheckCircle2, Clock, FileText, Info } from 'lucide-react'
import { useState } from 'react'

interface Props {
  customerPriceplan: { customerPriceplan: CustomerPricePlan[] } | null
}

const tabItems = [
  {
    label: 'Business Verification',
    value: 'Business Verification',
  },
  {
    label: 'Individual Verification',
    value: 'Individual Verification',
  },
]

const CustomerPriceplanDashboardView = ({ customerPriceplan }: Props) => {
  const [selectedTab, setSelectedTab] = useState('Business Verification')

  const handleCardClick = (id: number) => {
    router.get(route('customer-workflow-show', id))
  }

  const businessPlans =
    customerPriceplan?.customerPriceplan?.filter((plan) => plan.price_plan.type === 'Business') ??
    []
  const individualPlans =
    customerPriceplan?.customerPriceplan?.filter((plan) => plan.price_plan.type === 'Individual') ??
    []

  const getStatusIcon = (status: string | undefined) => {
    if (status === 'Completed') {
      return <CheckCircle2 className='h-5 w-5 text-alert-500' />
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
    <div className='rounded-lg bg-white shadow-sm'>
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className='w-full p-5'
      >
        <TabsList className='grid w-full grid-cols-2'>
          {tabItems.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent
          value='Business Verification'
          className='mt-4'
        >
          {businessPlans.length === 0 ? (
            <div className='flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-12'>
              <Info className='mb-4 h-12 w-12 text-neutral-400' />
              <h3 className='mb-2 text-lg font-semibold text-neutral-700'>
                No Business Verification Plans
              </h3>
              <p className='max-w-md text-center text-neutral-500'>
                There are currently no business verification plans associated with this account.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {businessPlans.map((customerPriceplan) => (
                <div
                  key={customerPriceplan.id}
                  onClick={() => handleCardClick(customerPriceplan.id)}
                  className='cursor-pointer rounded-lg border bg-white p-4 transition-shadow hover:shadow-md'
                >
                  {hasModuleUpdates(customerPriceplan) && (
                    <div className='flex items-center justify-end gap-2 rounded-full px-3 py-1'>
                      <Bell className='h-4 w-4 text-primary-500' />
                      <SmallText className='text-primary-600'>Updates</SmallText>
                    </div>
                  )}
                  <div className='mb-4 flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold text-black-tertiary-950'>
                      {customerPriceplan.price_plan.name}
                    </h3>
                    <div className='flex items-center gap-2'>
                      <div className='flex items-center gap-2 rounded-full bg-alert-50 px-3 py-1'>
                        {getStatusIcon(customerPriceplan.verification_status?.status)}
                        <SmallText
                          className={`${
                            customerPriceplan.verification_status?.status === 'Completed'
                              ? 'text-alert-600'
                              : 'text-highlight-600'
                          }`}
                        >
                          {customerPriceplan.verification_status?.status ?? 'Processing'}
                        </SmallText>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <div className='flex items-center gap-2 text-neutral-600'>
                      <Calendar className='h-4 w-4' />
                      <NormalText>
                        <StrongText>Created:</StrongText> {formatDate(customerPriceplan.created_at)}
                      </NormalText>
                    </div>
                    <div className='flex items-center gap-2 text-neutral-600'>
                      <FileText className='h-4 w-4' />
                      <NormalText>
                        <StrongText>Plan Type:</StrongText> Business
                      </NormalText>
                    </div>
                    <div className='flex items-center gap-2 text-neutral-600'>
                      <Clock className='h-4 w-4' />
                      <NormalText>
                        <StrongText>Expiry:</StrongText>{' '}
                        {calculateExpiryDate(
                          customerPriceplan.created_at,
                          customerPriceplan.price_plan.validity
                        )}
                      </NormalText>
                    </div>
                    {customerPriceplan.verification_status?.customer_notes && (
                      <div className='mt-2 rounded bg-primary-50 p-2'>
                        <SmallText className='text-primary-700'>
                          {customerPriceplan.verification_status.customer_notes}
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
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent
          value='Individual Verification'
          className='mt-4'
        >
          {individualPlans.length === 0 ? (
            <div className='flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-12'>
              <Info className='mb-4 h-12 w-12 text-neutral-400' />
              <h3 className='mb-2 text-lg font-semibold text-neutral-700'>
                No Individual Verification Plans
              </h3>
              <p className='max-w-md text-center text-neutral-500'>
                There are currently no individual verification plans associated with this account.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {individualPlans.map((customerPriceplan) => (
                <div
                  key={customerPriceplan.id}
                  onClick={() => handleCardClick(customerPriceplan.id)}
                  className='cursor-pointer rounded-lg border bg-white p-4 transition-shadow hover:shadow-md'
                >
                  {hasModuleUpdates(customerPriceplan) && (
                    <div className='flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1'>
                      <Bell className='h-4 w-4 text-primary-500' />
                      <SmallText className='text-primary-600'>Updates</SmallText>
                    </div>
                  )}
                  <div className='mb-4 flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold text-black-tertiary-950'>
                      {customerPriceplan.price_plan.name}
                    </h3>
                    <div className='flex items-center gap-2'>
                      <div className='flex items-center gap-2 rounded-full bg-alert-50 px-3 py-1'>
                        {getStatusIcon(customerPriceplan.verification_status?.status)}
                        <SmallText
                          className={`${
                            customerPriceplan.verification_status?.status === 'Completed'
                              ? 'text-alert-600'
                              : 'text-highlight-600'
                          }`}
                        >
                          {customerPriceplan.verification_status?.status ?? 'Processing'}
                        </SmallText>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <div className='flex items-center gap-2 text-neutral-600'>
                      <Calendar className='h-4 w-4' />
                      <NormalText>
                        <StrongText>Created:</StrongText> {formatDate(customerPriceplan.created_at)}
                      </NormalText>
                    </div>
                    <div className='flex items-center gap-2 text-neutral-600'>
                      <FileText className='h-4 w-4' />
                      <NormalText>
                        <StrongText>Plan Type:</StrongText> Individual
                      </NormalText>
                    </div>
                    <div className='flex items-center gap-2 text-neutral-600'>
                      <Clock className='h-4 w-4' />
                      <NormalText>
                        <StrongText>Expiry:</StrongText>{' '}
                        {calculateExpiryDate(
                          customerPriceplan.created_at,
                          customerPriceplan.price_plan.validity
                        )}
                      </NormalText>
                    </div>
                    {customerPriceplan.verification_status?.customer_notes && (
                      <div className='mt-2 rounded bg-primary-50 p-2'>
                        <SmallText className='text-primary-700'>
                          {customerPriceplan.verification_status.customer_notes}
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
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default CustomerPriceplanDashboardView
