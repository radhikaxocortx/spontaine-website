import { CustomerPricePlan } from '@/Components/Interface/data_interface'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getDisplayDate } from '@/lib/utils'
import StrongText from '@/typography/StrongText'
import { router } from '@inertiajs/react'
import { useState } from 'react'

interface Props {
  customerPriceplan: CustomerPricePlan[] | null
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
  return (
    <div>
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
        <TabsContent value='Business Verification'>
          <div className='grid w-full grid-cols-6 p-2'>
            <div>Received On</div>
            <div>Plan</div>
            <div>Kadodo ID</div>
            <div>Status</div>
            <div>Expiry</div>
          </div>
          {customerPriceplan?.customerPriceplan?.map((customerPriceplan) => (
            <div
              key={customerPriceplan.id}
              className='grid w-full grid-cols-6 p-2'
            >
              <div>{getDisplayDate(customerPriceplan.created_at)}</div>
              <div>{customerPriceplan.price_plan.name}</div>
              <div>{customerPriceplan.kadodo_id}</div>
              <div>{customerPriceplan.verification_status?.status ?? 'Processing'}</div>
              <div></div>
              <div
                onClick={() => handleCardClick(customerPriceplan.id)}
                className='cursor-pointer'
              >
                <StrongText>View</StrongText>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default CustomerPriceplanDashboardView
