import { CustomerPricePlan } from '@/components/Interface/data_interface'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import StrongText from '@/typography/StrongText'

interface OrganizationDetailsProps {
  customerPriceplan: CustomerPricePlan
}

const OrganizationDetails = ({ customerPriceplan }: OrganizationDetailsProps) => {
  if (!customerPriceplan.customer.company_id) return null

  return (
    <Card className='mb-6 p-6'>
      <div className='mb-4 flex items-center justify-between'>
        <StrongText className='text-xl'>Organization Details</StrongText>
        <Badge
          variant='outline'
          className='bg-blue-50 text-blue-700'
        >
          {customerPriceplan.price_plan.type.toUpperCase()}
        </Badge>
      </div>
      <div className='space-y-4'>
        <div className='text-lg font-semibold'>
          {customerPriceplan.customer.company?.company_legal_entity_name}
        </div>
        <div className='space-y-1 text-gray-600'>
          <div>{customerPriceplan.customer.company?.company_address_line_1}</div>
          <div>
            {customerPriceplan.customer.company?.company_postal_code}{' '}
            {customerPriceplan.customer.company?.company_country}
          </div>
        </div>
        <div className='flex gap-4 text-sm text-gray-500'>
          <div>
            <span className='font-medium'>Tax ID:</span>{' '}
            {customerPriceplan.customer.company?.company_tax_id}
          </div>
          <div>
            <span className='font-medium'>Registration ID:</span>{' '}
            {customerPriceplan.customer.company?.company_registration_id}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default OrganizationDetails
