import { Country, CustomerPricePlan } from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useInertiaPost from '@/hooks/useInertiaPost'
import AppLayout from '@/Layouts/AppLayout'
import { useCallback, useMemo, useState } from 'react'

interface Props {
  customerPriceplan: CustomerPricePlan
  countryDetail: Country
}

const CustomerPayment = ({ customerPriceplan, countryDetail }: Props) => {
  const [amount, setAmount] = useState('')

  const rate = Number(customerPriceplan?.price_plan?.rate ?? 0)
  const taxRate = Number(countryDetail?.tax_rate ?? 0)

  const taxAmount = ((rate * taxRate) / 100).toFixed(2)
  const totalAmount = (rate + (rate * taxRate) / 100).toFixed(2)

  const isAmountValid = amount === totalAmount

  const data = useMemo(() => {
    return {
      customer_priceplan_id: customerPriceplan.id,
      price_plan_amount: rate,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      payment_amount: amount,
      payment_status: 'completed',
    }
  }, [amount, customerPriceplan.id, rate, taxAmount, totalAmount])

  const { post } = useInertiaPost(route('update-customer-payment'))
  const handleSubmit = useCallback(() => {
    if (isAmountValid) post(data)
  }, [post, data, isAmountValid])

  return (
    <AppLayout>
      <div>Customer Payment Interface</div>
      <div className='grid grid-cols-2 gap-4 p-5'>
        <div>Price Plan Name</div>
        <div>{customerPriceplan.price_plan.name}</div>
        <div>Price Plan Rate</div>
        <div>{customerPriceplan.price_plan.rate}</div>
        <div>Tax Rate</div>
        <div>{countryDetail.tax_rate}</div>
        <div>Tax Amount</div>
        <div>{taxAmount}</div>
        <div>Total Amount</div>
        <div>{totalAmount}</div>
      </div>
      <div className='flex items-center gap-4'>
        <Input
          type='number'
          placeholder='Enter Amount'
          className='w-1/6 p-5'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          className='w-1/6 p-5'
          disabled={!isAmountValid}
        >
          Pay
        </Button>
      </div>
      {!isAmountValid && amount && (
        <div className='text-red-600'>Amount must equal ₹{totalAmount}</div>
      )}
    </AppLayout>
  )
}

export default CustomerPayment
