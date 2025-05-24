import { Country, CustomerPricePlan } from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useInertiaPost from '@/hooks/useInertiaPost'
import AppLayout from '@/Layouts/AppLayout'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { useCallback, useMemo, useState } from 'react'

interface Props {
  customerPriceplan: CustomerPricePlan
  countryDetail: Country
}

const CustomerPayment = ({ customerPriceplan, countryDetail }: Props) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card')

  const rate = Number(customerPriceplan?.price_plan?.rate ?? 0)
  const taxRate = Number(countryDetail?.tax_rate ?? 0)

  const taxAmount = ((rate * taxRate) / 100).toFixed(2)
  const totalAmount = (rate + (rate * taxRate) / 100).toFixed(2)

  const data = useMemo(() => {
    return {
      customer_priceplan_id: customerPriceplan.id,
      price_plan_amount: rate,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      payment_amount: totalAmount,
      payment_status: 'completed',
      payment_method: paymentMethod,
    }
  }, [customerPriceplan.id, rate, taxAmount, totalAmount, paymentMethod])

  const { post } = useInertiaPost(route('update-customer-payment'))
  const handleSubmit = useCallback(() => {
    post(data)
  }, [post, data])

  return (
    <AppLayout>
      <AppLayoutPadding>
        <div className='p-6'>
          <h1 className='mb-6 text-2xl font-bold'>Complete Your Payment</h1>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            <Card className='flex h-full flex-col justify-between'>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className='flex-1'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-gray-600'>Price Plan Name</div>
                  <div className='font-medium'>{customerPriceplan.price_plan.name}</div>
                  <div className='text-gray-600'>Price Plan Rate</div>
                  <div className='font-medium'>₹{customerPriceplan.price_plan.rate}</div>
                  <div className='text-gray-600'>Tax Rate</div>
                  <div className='font-medium'>{countryDetail.tax_rate}%</div>
                  <div className='text-gray-600'>Tax Amount</div>
                  <div className='font-medium'>₹{taxAmount}</div>
                </div>
              </CardContent>
              <CardFooter className='mt-auto grid grid-cols-2 gap-4 border-t pt-4'>
                <div className='font-semibold text-gray-600'>Total Amount</div>
                <div className='text-lg font-bold'>₹{totalAmount}</div>
              </CardFooter>
            </Card>

            <Card className=''>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className='flex gap-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='credit-card'
                      id='credit-card'
                    />
                    <Label
                      htmlFor='credit-card'
                      className='flex items-center gap-2'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='h-6 w-6'
                        aria-hidden='true'
                      >
                        <rect
                          width='20'
                          height='14'
                          x='2'
                          y='5'
                          rx='2'
                        />
                        <line
                          x1='2'
                          x2='22'
                          y1='10'
                          y2='10'
                        />
                      </svg>
                      Credit Card
                    </Label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='paystack'
                      id='paystack'
                    />
                    <Label
                      htmlFor='paystack'
                      className='flex items-center gap-2'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='h-6 w-6'
                      >
                        <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                      </svg>
                      Paystack
                    </Label>
                  </div>
                </RadioGroup>
                {paymentMethod === 'credit-card' && (
                  <div className='space-y-4 py-6'>
                    <div>
                      <Label htmlFor='card-name'>Name on Card</Label>
                      <Input
                        id='card-name'
                        placeholder='Full Name as on Card'
                        className='mt-1'
                      />
                    </div>
                    <div>
                      <Label htmlFor='card-number'>Card Number</Label>
                      <Input
                        id='card-number'
                        placeholder='1234 5678 9012 3456'
                        className='mt-1'
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <Label htmlFor='expiry'>Expiry Date</Label>
                        <Input
                          id='expiry'
                          placeholder='MM/YY'
                          className='mt-1'
                        />
                      </div>
                      <div>
                        <Label htmlFor='cvv'>CVV</Label>
                        <Input
                          id='cvv'
                          placeholder='123'
                          className='mt-1'
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className='mt-6 flex items-center gap-4'>
                  <Input
                    type='number'
                    placeholder='Enter Amount'
                    className='w-1/3'
                    value={totalAmount}
                    disabled
                  />
                  <Button
                    onClick={handleSubmit}
                    className='w-1/3'
                  >
                    {paymentMethod === 'credit-card' ? 'Pay with Card' : 'Pay with Paystack'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default CustomerPayment
