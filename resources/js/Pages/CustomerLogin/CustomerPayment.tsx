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
    router.post(
      route('kadodo-id-generate', {
        customer_priceplan_id: customerPriceplan.id,
        kadodo_id: customerPriceplan.kadodo_id,
        valid_from: validFrom,
        valid_to: validTo,
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
