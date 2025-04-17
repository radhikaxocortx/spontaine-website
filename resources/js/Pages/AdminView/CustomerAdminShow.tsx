import {
  CustomerPricePlan,
  CustomerPriceplanWorkflowItem,
  Workflow,
} from '@/Components/Interface/data_interface'
import ShowResourcePage, { ShowPageItem } from '@/Components/ShowPage/ShowResourcePage'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import AdminAdditionalInfoModule from '@/Components/WorkflowModule/AdditionalInfoDisplay/AdminAdditionalInfoModule'
import { useMemo, useState } from 'react'

interface Props {
  customerPriceplan: CustomerPricePlan
  customerPriceplanInfo?: CustomerPriceplanWorkflowItem[]
  CustomerPriceplanTemplate?: Workflow
}

const CustomerAdminShow = ({
  customerPriceplan,
  customerPriceplanInfo,
  CustomerPriceplanTemplate,
}: Props) => {
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
      customerPriceplan.customer.company_id && {
        label: 'Customer Organization',
        content: customerPriceplan.customer.company?.company_legal_entity_name,
        id: 9,
        type: 'text',
      },
      customerPriceplan.customer.company_id && {
        label: 'Organization Address',
        content: customerPriceplan.customer.company?.company_address_line_1,
        id: 10,
        type: 'text',
      },
      customerPriceplan.customer.company.company_postal_code && {
        label: 'Organization Postal Code',
        content: customerPriceplan.customer.company?.company_postal_code,
        id: 11,
        type: 'text',
      },
      customerPriceplan.customer.company_id && {
        label: 'Organizaton Country',
        content: customerPriceplan.customer.company?.company_country,
        id: 12,
        type: 'text',
      },
      customerPriceplan.customer.company_id && {
        label: 'Organization Tax ID',
        content: customerPriceplan.customer.company?.company_tax_id,
        id: 13,
        type: 'text',
      },
      customerPriceplan.customer.company_id && {
        label: 'Organization Registration ID',
        content: customerPriceplan.customer.company?.company_registration_id,
        id: 14,
        type: 'text',
      },
    ] as ShowPageItem[]
  }, [customerPriceplan])

  const [expandedValue, setExpandedValue] = useState<string | undefined>()
  console.log(customerPriceplan)

  return (
    <ShowResourcePage
      title={customerPriceplan.customer.first_name}
      items={displayValues}
    >
      {customerPriceplan.price_plan && (
        <div
          className={`bg-1stop-accent2 mt-4 rounded-lg border shadow-sm transition-all duration-200 ${expandedValue ? 'h-full' : 'h-[60px]'}`}
        >
          <Accordion
            type='single'
            collapsible
            value={expandedValue}
            onValueChange={setExpandedValue}
            className='w-full'
          >
            <AccordionItem value={customerPriceplan.price_plan.name}>
              <AccordionTrigger className='cursor-pointer px-6 transition-colors duration-200 hover:bg-[#F1F5F9]'>
                <span className='font-semibold'>
                  {`${customerPriceplan.price_plan.name} (${customerPriceplan.price_plan.code})`}
                </span>
              </AccordionTrigger>

              <AccordionContent className='px-6 pb-6'>
                <div>
                  <span>{customerPriceplan.price_plan.description}</span>
                </div>
                <div className='mt-2 grid grid-cols-2'>
                  <div>Type</div>
                  <div>{customerPriceplan.price_plan.type}</div>
                  <div>Minimum Quantity Required</div>
                  <div>{customerPriceplan.price_plan.min_quantity_required}</div>
                  <div>Rate</div>
                  <div>{customerPriceplan.price_plan.rate}</div>
                  <div>Additional Rate</div>
                  <div>{customerPriceplan.price_plan.additional_rate}</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {customerPriceplanInfo && (
        <div className='my-5 grid grid-cols-1 gap-5'>
          {CustomerPriceplanTemplate?.workflow_modules
            ?.sort((a, b) => a.sequence - b.sequence)
            .map((module) => {
              return (
                <AdminAdditionalInfoModule
                  key={module.id}
                  workflowModule={module}
                  additionalInfo={customerPriceplanInfo}
                  customerWorkflowID={customerPriceplan.id}
                />
              )
            })}
        </div>
      )}
    </ShowResourcePage>
  )
}

export default CustomerAdminShow
