import CustomerPriceplanDashboardView from '@/components/Customer/CustomerPriceplan/CustomerPriceplanDashboardView'
import CustomerDashboardLayout from '@/components/Customer/Dashboard/CustomerDashboardLayouts'
import {
  Customer,
  CustomerPricePlan,
  CustomerWorkflowStatus,
  PricePlan,
  Workflow,
} from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import useFetchRecord from '@/hooks/useFetchPagination'
import Heading from '@/typography/Heading'
import LargeText from '@/typography/LargeText'
import NormalText from '@/typography/NormalText'
import Paragraph from '@/typography/Paragraph'
import { router, usePage } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import ChoosePriceplan from './ChoosePriceplan'
import VerifiedIdentityCard from './VerifiedIdentityCard'

interface DashboardPageProps {
  auth: {
    customer: Customer
  }
  pricePlan: PricePlan[]
}

interface CustomerPricePlanWithVerification extends Omit<CustomerPricePlan, 'verification_status'> {
  verification_status?: CustomerWorkflowStatus
  price_plan_id: number
}

export default function CustomerDashboard() {
  const { auth, pricePlan } = usePage().props as unknown as DashboardPageProps

  const User = useMemo(() => {
    return auth.customer ?? null
  }, [auth])
  const customerId = User?.id

  const [customerPriceplan, isLoadingPriceplan] = useFetchRecord<{
    customerPriceplan: CustomerPricePlanWithVerification[]
  }>(
    route('find-customer-priceplan', {
      customerId: customerId,
    })
  )

  const [customerWorkflowItems, isLoadingWorkflow] = useFetchRecord<{
    workflow: Workflow | null
  }>(
    route('workflow-module', {
      name: 'Business Verification',
      pricePlanId: customerPriceplan?.customerPriceplan?.[0]?.price_plan_id,
    })
  )

  const hasPricePlan = Boolean(customerPriceplan?.customerPriceplan?.length)
  const currentPricePlan = customerPriceplan?.customerPriceplan?.[0]
  const hasWorkflow = Boolean(
    customerWorkflowItems?.workflow?.workflow_modules &&
      customerWorkflowItems.workflow.workflow_modules.length > 0
  )

  const handleStartWorkflow = () => {
    if (currentPricePlan) {
      router.visit(
        `/customer-workflow-create/${currentPricePlan.price_plan_id}/${currentPricePlan.id}`
      )
    }
  }

  // Show loading state if either priceplan or workflow is loading
  if (isLoadingPriceplan || isLoadingWorkflow) {
    return (
      <div className='min-h-screen bg-primary-graige-50'>
        <CustomerDashboardLayout>
          <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
            <div className='border-secondary rounded-lg border-l-4 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
              <div className='flex items-center justify-center py-8'>
                <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent'></div>
              </div>
            </div>
          </div>
        </CustomerDashboardLayout>
      </div>
    )
  }

  const renderContent = () => {
    // If we don't have a price plan yet
    if (!hasPricePlan) {
      return <ChoosePriceplan pricePlan={pricePlan} />
    }

    // If we have a price plan and workflow data is ready
    if (hasWorkflow) {
      return (
        <div className='border-secondary rounded-lg border-l-4 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
          <Heading className='mb-4 text-black-tertiary-950'>Your Plans</Heading>
          <div className='border-t border-neutral-100 pt-4'>
            <CustomerPriceplanDashboardView customerPriceplan={customerPriceplan} />
          </div>
        </div>
      )
    }

    // If we have a price plan but no workflow yet
    return (
      <div className='border-secondary rounded-lg border-l-4 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <Heading className='mb-4 text-black-tertiary-950'>
            Start Your Business Verification
          </Heading>
          <Paragraph className='mb-6 max-w-md text-neutral-600'>
            Complete your business verification process to start using our services. This is a
            required step to activate your account.
          </Paragraph>
          <Button
            onClick={handleStartWorkflow}
            className='rounded-lg bg-primary-950 px-6 py-2 text-white transition-colors duration-200 hover:bg-primary-900'
          >
            Start Verification
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-primary-graige-50'>
      <CustomerDashboardLayout>
        <div className='mx-auto px-4 py-8 sm:px-6 lg:px-8'>
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mb-8'
          >
            <div className='border-primary rounded-lg p-6'>
              <div className='flex w-full flex-col gap-6 md:flex-row'>
                <div className='flex w-full flex-col'>
                  <LargeText className='text-black-tertiary-950'>
                    Welcome back,{' '}
                    <LargeText className='text-primary-500'>{User?.first_name}</LargeText>!
                  </LargeText>
                  <div>
                    <NormalText className='text-neutral-600'>
                      {hasPricePlan
                        ? hasWorkflow
                          ? "Here's an overview of your current plan and usage."
                          : "Let's get started with your business verification process."
                        : "Let's get you started with a price plan that suits your needs."}
                    </NormalText>
                  </div>
                </div>
                {hasPricePlan && currentPricePlan && (
                  <div className='w-full'>
                    <VerifiedIdentityCard customerPricePlan={currentPricePlan} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='grid grid-cols-1 gap-6'
          >
            {renderContent()}
          </motion.div>
        </div>
      </CustomerDashboardLayout>
    </div>
  )
}
