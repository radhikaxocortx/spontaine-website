import { Card } from '@/components/CustomUI/Card/card'
import { WorflowFormItem, Workflow } from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import WorkflowModuleInfoForm from '@/components/WorkflowModule/WorkflowModuleInfoForm'
import useFetchRecord from '@/hooks/useFetchPagination'
import DashboardPadding from '@/Layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import Dashboard from './Dashboard'

const WorkflowTest = () => {
  const [workflow, loadingTemplate] = useFetchRecord<{ workflow: Workflow | null }>(
    route('workflow-module', {
      name: 'Business',
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

  return (
    <Dashboard>
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
                <Button
                  onClick={() =>
                    setCurrentModuleIndex((prev) => Math.min(prev + 1, sortedModules.length - 1))
                  }
                >
                  {currentModule?.next_button ?? 'Next'}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </DashboardPadding>
    </Dashboard>
  )
}

export default WorkflowTest
