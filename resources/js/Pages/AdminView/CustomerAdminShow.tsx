import { CustomerPricePlan } from '@/Components/Interface/data_interface'
import ShowResourcePage, { ShowPageItem } from '@/Components/ShowPage/ShowResourcePage'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import StrongText from '@/typography/StrongText'
import { useMemo } from 'react'

interface Props {
  customerPriceplan: CustomerPricePlan
}

const CustomerAdminShow = ({ customerPriceplan }: Props) => {
  console.log(customerPriceplan)
  const displayValues = useMemo(() => {
    return [
      {
        label: 'First Name',
        content: customerPriceplan.customer.first_name,
        id: 1,
        type: 'text',
      },
      {
        label: 'Last Name',
        id: 2,
        content: customerPriceplan.customer.last_name,
        type: 'text',
      },
      {
        label: 'Address',
        id: 3,
        content: customerPriceplan.customer.address_line_1,
        type: 'text',
      },
      {
        label: 'City',
        content: customerPriceplan.customer.city,
        id: 4,
        type: 'text',
      },
      {
        label: 'Country',
        content: customerPriceplan.customer.country,
        id: 5,
        type: 'text',
      },
      {
        label: 'Postal Code',
        content: customerPriceplan.customer.postal_code,
        id: 6,
        type: 'text',
      },
      {
        label: 'Telephone',
        content: customerPriceplan.customer.telephone,
        id: 7,
        type: 'text',
      },
      {
        label: 'Email',
        content: customerPriceplan.customer.email,
        id: 8,
        type: 'text',
      },
    ] as ShowPageItem[]
  }, [customerPriceplan])

  return (
    <ShowResourcePage
      title={customerPriceplan.customer.first_name}
      items={displayValues}
    >
      {customerPriceplan.price_plan && (
        <Accordion
          type='single'
          collapsible
        >
          <AccordionItem value={customerPriceplan.price_plan.name}>
            <AccordionTrigger>
              {`${customerPriceplan.price_plan.name} (${customerPriceplan.price_plan.code})`}
            </AccordionTrigger>

            <AccordionContent>
              <div>
                <StrongText>{customerPriceplan.price_plan.description}</StrongText>
              </div>
              <div className='mt-2 grid grid-cols-2'></div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </ShowResourcePage>
  )
}

export default CustomerAdminShow
