import CustomerDashboardLayout from '@/components/Customer/Dashboard/CustomerDashboardLayouts'
import { CustomerPricePlan } from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'

interface Props {
  customerPriceplan: CustomerPricePlan
}
const CustomerPayment = ({ customerPriceplan }: Props) => {
  console.log(customerPriceplan)
  const validFrom: string = new Date().toISOString().split('T')[0]
  const validity = customerPriceplan.price_plan.validity
  const validFromDate = new Date(validFrom)
  validFromDate.setMonth(validFromDate.getMonth() + validity)

  const validTo: string = validFromDate.toISOString().split('T')[0]

  console.log({ validFrom, validTo })
  const handleIDGenerate = () => {
    router.get(
      route('customer-workflow-create', {
        pricePlanId: customerPriceplan.price_plan_id,
        customerPriceplanId: customerPriceplan.id,
      })
    )
  }
  return (
    <>
      <CustomerDashboardLayout>
        <div>Customer Payment Interface</div>
        <Button onClick={handleIDGenerate}>Next</Button>
      </CustomerDashboardLayout>
    </>
  )
}
export default CustomerPayment
