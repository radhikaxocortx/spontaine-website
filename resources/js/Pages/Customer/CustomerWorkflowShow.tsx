import CustomerDashboardLayout from '@/components/Customer/Dashboard/CustomerDashboardLayouts'
import BreadCrumbs, { BreadcrumbItemLink } from '@/components/CustomUI/BreadCrumb'
import {
  CustomerPricePlan,
  CustomerPriceplanWorkflowItem,
  ModuleStatusVerification,
  Workflow,
} from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import CustomerPriceplanInfoModule from '@/components/WorkflowModule/AdditionalInfoDisplay/CustomerPriceplanInfoModule'
import { getDisplayDate } from '@/lib/utils'
import StrongText from '@/typography/StrongText'

interface Props {
  customerPriceplan: CustomerPricePlan
  customerPriceplanInfo?: CustomerPriceplanWorkflowItem[]
  CustomerPriceplanTemplate?: Workflow
  moduleUpdateStatus?: ModuleStatusVerification[]
}

const breadcrumbs: BreadcrumbItemLink[] = [
  {
    item: 'Dashboard',
    link: 'customer-dashboard',
  },
  {
    item: 'Plan Detail',
    link: '',
  },
]

const CustomerWorkflowShow = ({
  customerPriceplan,
  customerPriceplanInfo,
  CustomerPriceplanTemplate,
  moduleUpdateStatus,
}: Props) => {
  return (
    <CustomerDashboardLayout>
      <div className='p-5'>
        <div className='flex justify-between'>
          <BreadCrumbs breadcrumbItems={breadcrumbs} />
          <Button className='justify-end'>INVOICE</Button>
        </div>
        <div>
          Business Verification for{''}
          <StrongText>
            {customerPriceplan.customer?.first_name}
            {''}
            {customerPriceplan.customer?.last_name}
          </StrongText>
          <br />
          <StrongText>
            KADODO ID : {customerPriceplan.kadodo_i_d?.kadodo_id || 'not generated'}
            <br />
            {customerPriceplan.kadodo_i_d?.valid_from && (
              <>
                Valid From : {getDisplayDate(customerPriceplan.kadodo_i_d?.valid_from)}
                <br />
                Valid To : {getDisplayDate(customerPriceplan.kadodo_i_d?.valid_to)}
              </>
            )}
          </StrongText>
        </div>
        {customerPriceplanInfo && (
          <div className='my-5 grid grid-cols-1 gap-5'>
            {CustomerPriceplanTemplate?.workflow_modules
              ?.sort((a, b) => a.sequence - b.sequence)
              .map((module) => {
                const moduleStatus = moduleUpdateStatus?.find(
                  (status) => status.module_id == module.id
                )
                return (
                  <CustomerPriceplanInfoModule
                    key={module.id}
                    workflowModule={module}
                    additionalInfo={customerPriceplanInfo}
                    customerWorkflowID={customerPriceplan.id}
                    moduleUpdateStatus={moduleStatus}
                  />
                )
              })}
          </div>
        )}
      </div>
    </CustomerDashboardLayout>
  )
}
export default CustomerWorkflowShow
