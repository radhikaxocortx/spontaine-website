import CustomerDashboardLayout from '@/Components/Customer/Dashboard/CustomerDashboardLayouts'
import { Card } from '@/Components/CustomUI/Card/card'
import { WorflowFormItem, Workflow } from '@/Components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import WorkflowModuleInfoForm from '@/Components/WorkflowModule/WorkflowModuleInfoForm'
import useFetchRecord from '@/hooks/useFetchPagination'
import DashboardPadding from '@/Layouts/DashboardLayout'
import { router } from '@inertiajs/react'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  pricePlanId: number
  customerPriceplanId: number
}

const CustomerWorkflowCreate = ({ pricePlanId, customerPriceplanId }: Props) => {
  const [workflow, loadingTemplate] = useFetchRecord<{ workflow: Workflow | null }>(
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

  useEffect(() => {
    if (workflow?.workflow?.workflow_modules == null) {
      return
    }

    const additionalInfo = workflow?.workflow?.workflow_modules.flatMap((module) => {
      if (module.workflow_items == null) {
        return []
      }
      return module.workflow_items
        .sort((a, b) => a.field_number - b.field_number)
        .map((item) => {
          return {
            ...item,
            value: item.default_value ?? '',
            file: null,
          }
        })
    })

    setAdditionalInfo(additionalInfo)
  }, [workflow])

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
        <Card className='p-4'>
          {currentModule && (
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col p-2'>
                <h1 className='text-lg font-bold'>{currentModule.name}</h1>
                <p>{currentModule.description}</p>
                <WorkflowModuleInfoForm
                  additionalInfo={additionalInfo}
                  setAdditionalInfo={setAdditionalInfo}
                  module={currentModule}
                />
              </div>

              <div className='mt-4 flex justify-between'>
                {currentModuleIndex > 0 ? (
                  <Button onClick={() => setCurrentModuleIndex((prev) => prev - 1)}>
                    {currentModule?.prev_button ?? 'Previous'}
                  </Button>
                ) : (
                  <div></div>
                )}
                {currentModuleIndex < sortedModules.length - 1 ? (
                  <Button
                    onClick={() =>
                      setCurrentModuleIndex((prev) => Math.min(prev + 1, sortedModules.length - 1))
                    }
                  >
                    {currentModule?.next_button ?? 'Next'}
                  </Button>
                ) : (
                  <Button onClick={handleSubmit}>Submit</Button>
                )}
              </div>
            </div>
          )}
        </Card>
      </DashboardPadding>
    </CustomerDashboardLayout>
  )
}

export default CustomerWorkflowCreate
