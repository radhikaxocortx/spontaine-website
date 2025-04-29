import AddPayment from '@/components/AdminCustomerVerification/AddPayment'
import PaymentDetails from '@/components/AdminCustomerVerification/PaymentDetails'
import UpdateCustomerWorkflowStatus from '@/components/AdminCustomerVerification/UpdateCustomerWorkflowStatus'
import CardHeader from '@/components/CustomUI/Card/CardHeader'
import Modal from '@/components/CustomUI/Modal/Modal'
import {
  CustomerPricePlan,
  CustomerPriceplanWorkflowItem,
  CustomerWorkflowStatus,
  ModuleStatusVerification,
  ReferenceData,
  Workflow,
} from '@/components/Interface/data_interface'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import AdminAdditionalInfoModule from '@/components/WorkflowModule/AdditionalInfoDisplay/AdminAdditionalInfoModule'
import DashboardPadding from '@/Layouts/DashboardLayout'
import StrongText from '@/typography/StrongText'
import { router } from '@inertiajs/react'
import { useMemo, useState } from 'react'
import Dashboard from '../Dashboard'
import ContactDetails from './components/ContactDetails'
import OrganizationDetails from './components/OrganizationDetails'

interface Props {
  customerPriceplan: CustomerPricePlan
  customerPriceplanInfo?: CustomerPriceplanWorkflowItem[]
  CustomerPriceplanTemplate?: Workflow
  customerModuleStatus?: ModuleStatusVerification[]
  customerWorkflowStatus: CustomerWorkflowStatus
  statuses: ReferenceData[]
  paymentMethods: ReferenceData[]
}

const CustomerAdminShow = ({
  customerPriceplan,
  customerPriceplanInfo,
  CustomerPriceplanTemplate,
  customerModuleStatus,
  customerWorkflowStatus,
  statuses,
  paymentMethods,
}: Props) => {
  const [updateStatus, setUpdateStatus] = useState<boolean>(false)
  const [paymentModal, setPaymentModal] = useState<boolean>(false)
  const [showPayment, setShowPayment] = useState<boolean>(false)

  const isBusinessVerification = useMemo(() => {
    return customerPriceplan.price_plan.type.toLowerCase().includes('business')
  }, [customerPriceplan.price_plan.type])

  const getStatusBadge = (status: string | undefined) => {
    const statusColors = {
      'Not Started': 'bg-gray-100 text-gray-800',
      'In Process': 'bg-yellow-100 text-yellow-800',
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    }
    const currentStatus = status || 'Not Started'
    return (
      <Badge
        className={`${statusColors[currentStatus as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}
      >
        {currentStatus.replace('-', ' ').toUpperCase()}
      </Badge>
    )
  }

  const handleKadodoId = () => {
    console.log(customerPriceplan.kadodo_id)
    router.get(route('verification-details', { kadodoId: customerPriceplan.kadodo_id }))
  }

  return (
    <Dashboard>
      <DashboardPadding>
        <CardHeader
          title='Kadodo Verification Request'
          titleClassName='text-3xl font-semibold'
        />

        <div className='flex items-center space-x-2 py-2'>
          <StrongText className='text-xl'>{`${customerPriceplan.price_plan.name} (${customerPriceplan.price_plan.code})`}</StrongText>
          {getStatusBadge(customerWorkflowStatus?.status)}
        </div>
        <div
          onClick={handleKadodoId}
          className='cursor-pointer'
        >
          Kadodo Id
        </div>
        <div className='flex'>
          <Button
            variant='link'
            onClick={() => setUpdateStatus(true)}
          >
            Update Status
          </Button>
          {customerPriceplan.payment_details ? (
            <Button
              variant='link'
              onClick={() => setShowPayment(true)}
            >
              View Payment Details
            </Button>
          ) : (
            <Button
              variant='link'
              onClick={() => setPaymentModal(true)}
            >
              Add Payment
            </Button>
          )}
        </div>
        <div className='space-y-6'>
          {/* Organization Details - Shown prominently for business verifications */}
          {isBusinessVerification && <OrganizationDetails customerPriceplan={customerPriceplan} />}

          {/* Contact Details - Collapsible section */}
          <ContactDetails customerPriceplan={customerPriceplan} />

          {/* Workflow Modules */}
          {customerPriceplanInfo && (
            <div className='space-y-6'>
              <StrongText className='text-xl'>Verification Workflow</StrongText>
              {CustomerPriceplanTemplate?.workflow_modules
                ?.sort((a, b) => a.sequence - b.sequence)
                .map((module) => {
                  const ModuleStatus = customerModuleStatus?.find(
                    (status) => status.module_id === module.id
                  )
                  return (
                    <AdminAdditionalInfoModule
                      key={module.id}
                      workflowModule={module}
                      additionalInfo={customerPriceplanInfo}
                      customerWorkflowID={customerPriceplan.id}
                      moduleStatus={ModuleStatus}
                    />
                  )
                })}
            </div>
          )}
        </div>

        {/* Modals */}
        {updateStatus && (
          <Modal
            setShowModal={setUpdateStatus}
            title='Update Status'
          >
            <UpdateCustomerWorkflowStatus
              customerWorkflowID={customerPriceplan.id}
              setShowForm={setUpdateStatus}
              customerWorkflowStatus={customerWorkflowStatus}
              statuses={statuses}
            />
          </Modal>
        )}

        {paymentModal && (
          <Modal
            setShowModal={setPaymentModal}
            title='Add Payment'
          >
            <AddPayment
              customerWorkflowID={customerPriceplan.id}
              setShowForm={setPaymentModal}
              amount={customerPriceplan.price_plan.rate}
              paymentMethods={paymentMethods}
            />
          </Modal>
        )}

        {showPayment && customerPriceplan.payment_details && (
          <Modal
            setShowModal={setShowPayment}
            title='Payment Details'
          >
            <PaymentDetails paymentDetails={customerPriceplan.payment_details} />
          </Modal>
        )}
      </DashboardPadding>
    </Dashboard>
  )
}

export default CustomerAdminShow
