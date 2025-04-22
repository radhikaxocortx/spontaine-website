import CustomerPriceplanDashboardView from '@/Components/Customer/CustomerPriceplan/CustomerPriceplanDashboardView'
import CustomerDashboardLayout from '@/Components/Customer/Dashboard/CustomerDashboardLayouts'
import { Customer, CustomerPricePlan } from '@/Components/Interface/data_interface'
import useFetchRecord from '@/hooks/useFetchPagination'
import Heading from '@/typography/Heading'
import { usePage } from '@inertiajs/react'
import { useMemo } from 'react'

export default function CustomerDashboard() {
  const userInfo = usePage().props.auth as unknown as { customer: Customer }
  const User = useMemo(() => {
    return userInfo.customer ?? null
  }, [userInfo])
  const customerId = User?.id

  const [customerPriceplan, loading] = useFetchRecord<{ customerPriceplan: CustomerPricePlan[] }>(
    route('find-customer-priceplan', {
      customerId: customerId,
    })
  )

  return (
    <div>
      <CustomerDashboardLayout>
        <div className='m-5'>
          <Heading>Welcome, {User?.first_name}</Heading>
          <div>
            <CustomerPriceplanDashboardView customerPriceplan={customerPriceplan} />
          </div>
        </div>
      </CustomerDashboardLayout>
    </div>
  )
}
