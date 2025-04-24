import ModuleStatusUpdate from '@/components/AdminCustomerVerification/ModuleStatusUpdate'
import Modal from '@/components/CustomUI/Modal/Modal'
import {
  ModuleStatusVerification,
  ReferenceData,
  WorkflowItem,
  WorkflowModule,
} from '@/components/Interface/data_interface'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface Props {
  workflowModule: WorkflowModule
  additionalInfo: WorkflowItem[]
  customerWorkflowID: number
  moduleStatus?: ModuleStatusVerification
  statuses: ReferenceData[]
}

export default function AdminAdditionalInfoModule({
  workflowModule,
  additionalInfo,
  customerWorkflowID,
  moduleStatus,
  statuses,
}: Readonly<Props>) {
  const [updateModuleStatus, setUpdateModuleStatus] = useState(false)
  const [expandedValue, setExpandedValue] = useState<string | undefined>()

  const hasFieldsWithValues = workflowModule.workflow_items.some(
    (item) => additionalInfo.find((info) => info.workflow_item_id === item.id)?.value
  )

  return (
    <div
      className={`bg-1stop-accent2 rounded-lg border shadow-sm transition-all duration-200 ${expandedValue ? 'h-full' : 'h-[60px]'}`}
    >
      <Accordion
        type='single'
        collapsible
        value={expandedValue}
        onValueChange={setExpandedValue}
        className='w-full'
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger className='cursor-pointer px-6 transition-colors duration-200 hover:bg-[#F1F5F9]'>
            <span className='font-semibold'>{workflowModule.name}</span>
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-6'>
            <div className='mr-auto p-2'>
              <Button onClick={() => setUpdateModuleStatus(true)}>Update Status</Button>
            </div>
            {hasFieldsWithValues ? (
              <>
                <div className='grid gap-4'>
                  {workflowModule.workflow_items
                    .sort((a, b) => a.field_number - b.field_number)
                    .map((item) => {
                      const matchingInfo = additionalInfo.filter(
                        (info) => info.workflow_item_id === item.id
                      )
                      const values = matchingInfo.map((info) => info.value).filter(Boolean)
                      if (values.length === 0) return null
                      return (
                        <div
                          key={item.id}
                          className='flex flex-col gap-1'
                        >
                          <span className='text-muted-foreground text-xs font-medium'>
                            {item.field_name}
                          </span>
                          <span className='text-sm'>{values.join(', ')}</span>
                        </div>
                      )
                    })}
                </div>
              </>
            ) : (
              <div className='flex h-full items-center justify-center py-4'>
                <span className='text-muted-foreground text-sm'>No information available</span>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {updateModuleStatus && (
        <Modal
          setShowModal={setUpdateModuleStatus}
          title='Update Status'
        >
          <ModuleStatusUpdate
            workflowModuleID={workflowModule.id}
            customerWorkflowID={customerWorkflowID}
            setShowForm={setUpdateModuleStatus}
            moduleStatus={moduleStatus}
            statuses={statuses}
          />
        </Modal>
      )}
    </div>
  )
}
