import PaymentInfo from '@/components/AdminCustomerVerification/PaymentInfo'
import UpdateCustomerWorkflowStatus from '@/components/AdminCustomerVerification/UpdateCustomerWorkflowStatus'
import VerificationStatus from '@/components/AdminCustomerVerification/VerificationStatus'
import CardHeader from '@/components/CustomUI/Card/CardHeader'
import Modal from '@/components/CustomUI/Modal/Modal'
import {
  Country,
  CustomerPricePlan,
  CustomerPriceplanWorkflowItem,
  CustomerWorkflowStatus,
  ModuleStatusVerification,
  ReferenceData,
  Workflow,
} from '@/components/Interface/data_interface'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import AdminAdditionalInfoModule from '@/components/WorkflowModule/AdditionalInfoDisplay/AdminAdditionalInfoModule'
import DashboardPadding from '@/Layouts/DashboardLayout'
import NormalText from '@/typography/NormalText'
import StrongText from '@/typography/StrongText'
import { router } from '@inertiajs/react'
import { useMemo, useState } from 'react'
import Dashboard from '../Dashboard'
import ContactDetails from './components/ContactDetails'
import KadodoIdDetails from './components/KadodoIdDetails'
import OrganizationDetails from './components/OrganizationDetails'

interface Props {
  customerPriceplan: CustomerPricePlan
  customerPriceplanInfo?: CustomerPriceplanWorkflowItem[]
  CustomerPriceplanTemplate?: Workflow
  customerModuleStatus?: ModuleStatusVerification[]
  customerWorkflowStatus: CustomerWorkflowStatus
  statuses: ReferenceData[]
  paymentMethods: ReferenceData[]
  countryDetail: Country
}

const CustomerAdminShow = ({
  customerPriceplan,
  customerPriceplanInfo,
  CustomerPriceplanTemplate,
  customerModuleStatus,
  customerWorkflowStatus,
  statuses,
  paymentMethods,
  countryDetail,
}: Props) => {
  const [updateStatus, setUpdateStatus] = useState<boolean>(false)
  const [updated, setUpdated] = useState<boolean>(false)
  const [viewStatus, setViewStatus] = useState<boolean>(false)
  const [generateKadodoID, setGenerateKadodoID] = useState<boolean>(false)
  const isBusinessVerification = useMemo(() => {
    return customerPriceplan.price_plan.type.toLowerCase().includes('business')
  }, [customerPriceplan.price_plan.type])

  const kadodoIdGenerate = () => {
    router.get(route('kadodo-id-generate', { customerPriceplanId: customerPriceplan.id }))
  }

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

  const handleUpdated = () => {
    router.get(route('verification-completed', { customerPriceplanId: customerPriceplan.id }))
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
        <div className='flex'>
          {!customerPriceplan?.verification_status?.mark_as_updated && (
            <div className='flex p-2'>
              <Checkbox
                onCheckedChange={(checked) => setUpdated(!!checked)}
                checked={updated}
              />
              <NormalText className='pl-2'>Mark verification Completed</NormalText>
            </div>
          )}
          <div>
            {customerPriceplan?.verification_status?.mark_as_updated &&
            !customerPriceplan?.kadodo_i_d ? (
              <Button
                variant='link'
                onClick={() => setGenerateKadodoID(true)}
              >
                Generate Kadodo ID
              </Button>
            ) : null}
          </div>

          {!customerPriceplan?.verification_status?.mark_as_updated ? (
            <Button
              variant='link'
              onClick={() => setUpdateStatus(true)}
            >
              Update Status
            </Button>
          ) : (
            <Button
              variant={'link'}
              onClick={() => setViewStatus(true)}
            >
              View Status
            </Button>
          )}
        </div>
        <div className='space-y-6'>
          {customerPriceplan?.kadodo_i_d && (
            <KadodoIdDetails kadodoID={customerPriceplan.kadodo_i_d} />
          )}
          {/* Organization Details - Shown prominently for business verifications */}
          {isBusinessVerification && <OrganizationDetails customerPriceplan={customerPriceplan} />}

          {/* Contact Details - Collapsible section */}
          <ContactDetails customerPriceplan={customerPriceplan} />

          <PaymentInfo
            customerPriceplan={customerPriceplan}
            country={countryDetail}
            paymentMethods={paymentMethods}
          />

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
                      statusUpdate={
                        customerPriceplan?.verification_status?.mark_as_updated ? false : true
                      }
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

        {updated && (
          <Modal
            setShowModal={setUpdated}
            title='Verification Completed'
          >
            <div>
              Once marked as completed, you will no longer be able to change statuses on this
              request. Are you sure?
            </div>
            <div className='flex justify-end gap-2'>
              <Button onClick={() => setUpdated(false)}>Cancel</Button>
              <Button onClick={handleUpdated}>Mark as updated</Button>
            </div>
          </Modal>
        )}
        {viewStatus && (
          <Modal
            setShowModal={setViewStatus}
            title='Verification Status'
          >
            <VerificationStatus verificationStatus={customerWorkflowStatus} />
          </Modal>
        )}
        {generateKadodoID && !customerPriceplan?.payment_details && (
          <Modal
            setShowModal={setGenerateKadodoID}
            title='Complete Payment'
          >
            Make Sure Payment Completed Before Generating Kadodo ID
            <Button
              onClick={() => setGenerateKadodoID(false)}
              className='ml-auto mt-2'
            >
              OK
            </Button>
          </Modal>
        )}
        {generateKadodoID && customerPriceplan?.payment_details && (
          <Modal
            setShowModal={setGenerateKadodoID}
            title='Generate Kadodo ID'
          >
            Are you sure to generate Kadodo ID?
            <br />
            <Button
              onClick={() => kadodoIdGenerate()}
              className='ml-auto mt-2'
            >
              OK
            </Button>
          </Modal>
        )}
      </DashboardPadding>
    </Dashboard>
  )
}

export default CustomerAdminShow
