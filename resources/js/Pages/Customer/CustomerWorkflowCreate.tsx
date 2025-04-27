import CustomerDashboardLayout from '@/components/Customer/Dashboard/CustomerDashboardLayouts'
import { Card } from '@/components/CustomUI/Card/card'
import { WorflowFormItem, Workflow } from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import WorkflowModuleInfoForm from '@/components/WorkflowModule/WorkflowModuleInfoForm'
import useFetchRecord from '@/hooks/useFetchPagination'
import DashboardPadding from '@/Layouts/DashboardLayout'
import Heading from '@/typography/Heading'
import Paragraph from '@/typography/Paragraph'
import SubHeading from '@/typography/SubHeading'
import { router } from '@inertiajs/react'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  pricePlanId: number
  customerPriceplanId: number
}

const CustomerWorkflowCreate = ({ pricePlanId, customerPriceplanId }: Props) => {
  const [workflow] = useFetchRecord<{ workflow: Workflow | null }>(
    route('workflow-module', {
      name: 'Business Verification',
      pricePlanId: pricePlanId,
    })
  )

  const [additionalInfo, setAdditionalInfo] = useState<WorflowFormItem[]>([])
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)

  useEffect(() => {
    if (!workflow?.workflow?.workflow_modules) return

    const info = workflow.workflow.workflow_modules.flatMap((module) => {
      if (!module.workflow_items) return []
      return module.workflow_items
        .sort((a, b) => a.field_number - b.field_number)
        .map((item) => ({
          ...item,
          value: item.default_value ?? '',
          file: null,
        }))
    })

    setAdditionalInfo(info)
  }, [workflow])

  const sortedModules = [...(workflow?.workflow?.workflow_modules ?? [])].sort(
    (a, b) => a.sequence - b.sequence
  )
  const currentModule = sortedModules[currentModuleIndex]

  const customFormData = useMemo(() => {
    return {
      customerPriceplanId: customerPriceplanId,
      additionalInfo: additionalInfo.map((item) => {
        return {
          workflow_item_id: item.id,
          type: item.type,
          value: item.value,
          file: item.file,
        }
      }),
    }
  }, [additionalInfo, customerPriceplanId])

  const handleSubmit = () => {
    router.post(route('customer-workflow-save'), customFormData)
  }

  return (
    <CustomerDashboardLayout>
      <DashboardPadding>
        <div className='mx-auto py-6'>
          <div className='mb-8 text-center'>
            <Heading className='text-2xl font-bold text-gray-900'>Your Business Profile</Heading>
            <Paragraph className='mt-3 text-lg text-gray-600'>
              This profile will be verified in great detail. Therefore, it is important that the
              data that you enter is as accurate as possible. Please follow the steps outlined
              below. this process is expected to take 5-15 minutes. Thank you for your patience.
            </Paragraph>
          </div>

          {!workflow?.workflow && (
            <div className='flex items-center justify-center py-12'>
              <div className='text-center'>
                <div className='mb-4 h-12 w-12 animate-spin rounded-full border-4 border-secondary-500 border-t-transparent'></div>
                <Paragraph className='text-gray-600'>Loading verification steps...</Paragraph>
              </div>
            </div>
          )}

          {workflow?.workflow && (
            <>
              <div className='mb-8 flex items-center justify-center'>
                <div className='flex items-center'>
                  {sortedModules.map((module, index) => (
                    <div
                      key={module.id}
                      className='flex items-center'
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
                          index === currentModuleIndex
                            ? 'bg-secondary-500 text-white ring-4 ring-secondary-200'
                            : index < currentModuleIndex
                              ? 'bg-secondary-200 text-white ring-2 ring-secondary-100'
                              : 'bg-primary-graige-100 text-gray-600 ring-2 ring-primary-graige-200'
                        }`}
                      >
                        <span className='text-lg font-semibold'>{index + 1}</span>
                      </div>
                      {index < sortedModules.length - 1 && (
                        <div
                          className={`mx-2 h-1 w-16 rounded-xl transition-all duration-300 ${
                            index < currentModuleIndex
                              ? 'bg-primary-graige-900 shadow-md'
                              : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Card className='overflow-hidden rounded-xl border-0 bg-white p-0 shadow-xl'>
                {currentModule && (
                  <>
                    <div className='border-b border-gray-200 px-6 py-4'>
                      <SubHeading className='text-xl text-gray-900'>
                        {currentModule.name}
                      </SubHeading>
                      <Paragraph className='mt-1 text-gray-600'>
                        {currentModule.description}
                      </Paragraph>
                    </div>

                    <div className='flex flex-col gap-6 p-6'>
                      <div className='flex flex-col gap-4'>
                        <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
                          <WorkflowModuleInfoForm
                            additionalInfo={additionalInfo}
                            setAdditionalInfo={setAdditionalInfo}
                            module={currentModule}
                          />
                        </div>
                      </div>

                      <div className='mt-6 flex justify-between border-t border-gray-200 pt-4'>
                        {currentModuleIndex > 0 ? (
                          <Button
                            onClick={() => setCurrentModuleIndex((prev) => prev - 1)}
                            variant='outline'
                            className='min-w-[120px]'
                          >
                            {currentModule?.prev_button ?? 'Previous'}
                          </Button>
                        ) : (
                          <div />
                        )}
                        {currentModuleIndex < sortedModules.length - 1 ? (
                          <Button
                            onClick={() =>
                              setCurrentModuleIndex((prev) =>
                                Math.min(prev + 1, sortedModules.length - 1)
                              )
                            }
                            className='min-w-[120px]'
                          >
                            {currentModule?.next_button ?? 'Next'}
                          </Button>
                        ) : (
                          <Button
                            onClick={handleSubmit}
                            className='min-w-[120px]'
                          >
                            Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </>
          )}
        </div>
      </DashboardPadding>
    </CustomerDashboardLayout>
  )
}

export default CustomerWorkflowCreate
