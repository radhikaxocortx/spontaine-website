import { CustomerPricePlan } from '@/components/Interface/data_interface'
import { Card } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import StrongText from '@/typography/StrongText'
import { useState } from 'react'

interface ContactDetailsProps {
  customerPriceplan: CustomerPricePlan
}

const ContactDetails = ({ customerPriceplan }: ContactDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className='mb-6 p-6'>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className='flex items-center justify-between'>
          <StrongText className='text-xl'>Contact Details</StrongText>
          <CollapsibleTrigger className='text-sm text-gray-500 hover:text-gray-700'>
            {isOpen ? 'Hide Details' : 'Show Details'}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <div>
                <span className='font-medium'>Name:</span>
                <p>{`${customerPriceplan.customer.first_name} ${customerPriceplan.customer.last_name}`}</p>
              </div>
              <div>
                <span className='font-medium'>Email:</span>
                <p>{customerPriceplan.customer.email}</p>
              </div>
              <div>
                <span className='font-medium'>Telephone:</span>
                <p>{customerPriceplan.customer.telephone}</p>
              </div>
            </div>
            <div className='space-y-2'>
              <div>
                <span className='font-medium'>Address:</span>
                <p>{customerPriceplan.customer.address_line_1}</p>
              </div>
              <div>
                <span className='font-medium'>City:</span>
                <p>{customerPriceplan.customer.city}</p>
              </div>
              <div>
                <span className='font-medium'>Country:</span>
                <p>{customerPriceplan.customer.country}</p>
              </div>
              <div>
                <span className='font-medium'>Postal Code:</span>
                <p>{customerPriceplan.customer.postal_code}</p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default ContactDetails
