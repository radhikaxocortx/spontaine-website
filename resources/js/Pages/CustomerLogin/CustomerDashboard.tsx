import CustomerDashboardLayout from '@/Components/Customer/Dashboard/CustomerDashboardLayouts'
import { Customer, CustomerPricePlan } from '@/Components/Interface/data_interface'
import useFetchRecord from '@/hooks/useFetchPagination'
import Heading from '@/typography/Heading'
import Paragraph from '@/typography/Paragraph'
import StrongText from '@/typography/StrongText'
import { usePage } from '@inertiajs/react'
import { useMemo } from 'react'

export default function CustomerDashboard() {
  const userInfo = usePage().props.auth as unknown as { customer: Customer }
  const User = useMemo(() => {
    return userInfo.customer ?? null
  }, [userInfo])
  const customerId = User?.id

  const [customerPriceplan, loading] = useFetchRecord<{ customerPriceplan: CustomerPricePlan }>(
    route('find-customer-priceplan', {
      customerId: customerId,
    })
  )

  console.log(customerPriceplan)
  return (
    <div>
      <CustomerDashboardLayout>
        <div className='m-5'>
          <Heading>Hello {User?.first_name}</Heading>
          <Paragraph>
            You are subscribed to{' '}
            <StrongText>
              {customerPriceplan?.customerPriceplan?.price_plan?.name.toUpperCase()}
            </StrongText>
          </Paragraph>
        </div>
      </CustomerDashboardLayout>
    </div>
  )
}
