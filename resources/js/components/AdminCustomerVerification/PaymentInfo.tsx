import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import StrongText from '@/typography/StrongText'
import { useState } from 'react'
import Modal from '../CustomUI/Modal/Modal'
import { Country, CustomerPricePlan, ReferenceData } from '../Interface/data_interface'
import { Button } from '../ui/button'
import AddPayment from './AddPayment'

interface Props {
  customerPriceplan: CustomerPricePlan
  country: Country
  paymentMethods: ReferenceData[]
}

const PaymentInfo = ({ customerPriceplan, country, paymentMethods }: Props) => {
  const paymentDetails = customerPriceplan.payment_details
  const [isOpen, setIsOpen] = useState(false)
  const [addPayment, setAddPayment] = useState(false)
  console.log(addPayment)
  return (
    <Card className='mb-6 p-6'>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className='flex items-center justify-between'>
          <StrongText className='text-xl'>Payment Details</StrongText>
          {paymentDetails?.payment_status === 'completed' ? (
            <div>
              <Badge className='bg-green-100 text-green-800'>
                {paymentDetails?.payment_status}
              </Badge>
            </div>
          ) : (
            <div>
              <Badge className='bg-red-100 text-red-800'>Pending</Badge>
            </div>
          )}
          <CollapsibleTrigger className='text-sm text-gray-500 hover:text-gray-700'>
            {isOpen ? 'Hide Details' : 'Show Details'}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <Button
            variant='link'
            onClick={() => setAddPayment(true)}
          >
            Add Payment
          </Button>
          <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <div>
                <span className='font-medium'>Priceplan:</span>
                <p>{customerPriceplan.price_plan.name}</p>
              </div>
              {paymentDetails && (
                <>
                  <div>
                    <span className='font-medium'>Amount:</span>
                    <p>{paymentDetails.price_plan_amount ?? 0}</p>
                  </div>
                  <div>
                    <span className='font-medium'>Discount:</span>
                    <p>{paymentDetails.discount_amount ?? 0}</p>
                  </div>
                  <div>
                    <span className='font-medium'>Tax:</span>
                    <p>{paymentDetails.tax_amount ?? 0}</p>
                  </div>
                </>
              )}
            </div>
            <div className='space-y-2'>
              {paymentDetails && (
                <>
                  <div>
                    <span className='font-medium'>Total:</span>
                    <p>{paymentDetails.total_amount ?? 0}</p>
                  </div>
                  <div>
                    <span className='font-medium'>Payment Method:</span>
                    <p>{paymentDetails.payment_method}</p>
                  </div>
                  {paymentDetails.coupon_id && (
                    <div>
                      <span className='font-medium'>Coupon:</span>
                      <p>{paymentDetails.coupon.coupon_code}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {addPayment && (
            <Modal
              setShowModal={setAddPayment}
              title='Add Payment'
            >
              <AddPayment
                customerPriceplan={customerPriceplan}
                setShowForm={setAddPayment}
                country={country}
                paymentMethods={paymentMethods}
              />
            </Modal>
          )}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default PaymentInfo
