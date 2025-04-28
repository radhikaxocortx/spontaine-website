import Pagination from '@/components/CustomUI/Pagination/Pagination'
import { CustomerPricePlan } from '@/components/Interface/data_interface'
import { TabsContent } from '@/components/ui/tabs'
import { Paginator } from '@/components/ui/ui_interfaces'
import VerificationRequestsTable from './VerificationRequestsTable'

interface VerificationTabContentProps {
  value: string
  requests: CustomerPricePlan[]
  pagination: Paginator<CustomerPricePlan>
  onViewClick: (id: number | string) => void
}

const VerificationTabContent = ({
  value,
  requests,
  pagination,
  onViewClick,
}: VerificationTabContentProps) => {
  return (
    <TabsContent
      value={value}
      className='mt-4'
    >
      <VerificationRequestsTable
        requests={requests}
        onViewClick={onViewClick}
      />
      <div className='mt-4 w-full'>
        <Pagination pagination={pagination} />
      </div>
    </TabsContent>
  )
}

export default VerificationTabContent
