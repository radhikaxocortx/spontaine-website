import CustomerDashboardLayout from '@/Components/Customer/Dashboard/CustomerDashboardLayouts'
import BreadCrumbs, { BreadcrumbItemLink } from '@/Components/CustomUI/BreadCrumb'
import {
  CustomerPricePlan,
  CustomerPriceplanWorkflowItem,
  Workflow,
} from '@/Components/Interface/data_interface'
import CustomerPriceplanInfoModule from '@/Components/WorkflowModule/AdditionalInfoDisplay/CustomerPriceplanInfoModule'
import StrongText from '@/typography/StrongText'

interface Props {
  customerPriceplan: CustomerPricePlan
  customerPriceplanInfo?: CustomerPriceplanWorkflowItem[]
  CustomerPriceplanTemplate?: Workflow
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
}: Props) => {
  console.log(CustomerPriceplanTemplate)
  return (
    <CustomerDashboardLayout>
      <div className='p-5'>
        <BreadCrumbs breadcrumbItems={breadcrumbs} />
        <div>
          Business Verification for{''}
          <StrongText>
            {customerPriceplan.customer?.first_name}
            {''}
            {customerPriceplan.customer?.last_name}
          </StrongText>
          <br />
          <StrongText>KADODO ID : {customerPriceplan.kadodo_id}</StrongText>
        </div>{' '}
        {customerPriceplanInfo && (
          <div className='my-5 grid grid-cols-1 gap-5'>
            {CustomerPriceplanTemplate?.workflow_modules
              ?.sort((a, b) => a.sequence - b.sequence)
              .map((module) => {
                return (
                  <CustomerPriceplanInfoModule
                    key={module.id}
                    workflowModule={module}
                    additionalInfo={customerPriceplanInfo}
                    customerWorkflowID={customerPriceplan.id}
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
