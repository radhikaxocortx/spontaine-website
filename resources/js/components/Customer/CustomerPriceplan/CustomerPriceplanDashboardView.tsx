import { CustomerPricePlan } from '@/components/Interface/data_interface'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getDisplayDate } from '@/lib/utils'
import { router } from '@inertiajs/react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import CustomerPriceplanCard from './components/CustomerPriceplanCard'
import CustomerPriceplanEmptyState from './components/CustomerPriceplanEmptyState'
import { tabItems } from './constants'

interface Props {
  customerPriceplan: { customerPriceplan: CustomerPricePlan[] } | null
}

interface TabItem {
  label: string
  value: string
}

const CustomerPriceplanDashboardView = ({ customerPriceplan }: Props) => {
  const handleCardClick = (id: number) => {
    router.get(route('customer-workflow-show', id))
  }

  const businessPlans =
    customerPriceplan?.customerPriceplan?.filter((plan) => plan.price_plan.type === 'Business') ??
    []
  const individualPlans =
    customerPriceplan?.customerPriceplan?.filter((plan) => plan.price_plan.type === 'Individual') ??
    []

  const [selectedTab, setSelectedTab] = useState(
    businessPlans.length !== 0 ? 'Business Verification' : 'Individual Verification'
  )

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
    <div className='rounded-lg bg-white shadow-sm'>
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className='w-full p-5'
      >
        <TabsList className='grid w-full grid-cols-2'>
          {tabItems.map((tab: TabItem) => (
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
            <CustomerPriceplanEmptyState type='Business' />
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {businessPlans.map((plan) => (
                <CustomerPriceplanCard
                  key={plan.id}
                  plan={plan}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent
          value='Individual Verification'
          className='mt-4'
        >
          {individualPlans.length === 0 ? (
            <CustomerPriceplanEmptyState type='Individual' />
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {individualPlans.map((plan) => (
                <CustomerPriceplanCard
                  key={plan.id}
                  plan={plan}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CustomerPriceplanDashboardView
