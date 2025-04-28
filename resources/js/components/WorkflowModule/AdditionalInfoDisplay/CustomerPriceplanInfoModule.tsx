import Modal from '@/components/CustomUI/Modal/Modal'
import {
  ModuleStatusVerification,
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
import { Checkbox } from '@/components/ui/checkbox'
import NormalText from '@/typography/NormalText'
import StrongText from '@/typography/StrongText'
import { router } from '@inertiajs/react'
import { Bell } from 'lucide-react'
import { useState } from 'react'
import ModuleEdit from './ModuleEdit'

interface Props {
  workflowModule: WorkflowModule
  additionalInfo: WorkflowItem[]
  customerWorkflowID: number
  moduleUpdateStatus: ModuleStatusVerification | undefined
}

export default function CustomerPriceplanInfoModule({
  workflowModule,
  additionalInfo,
  customerWorkflowID,
  moduleUpdateStatus,
}: Readonly<Props>) {
  const [expandedValue, setExpandedValue] = useState<string | undefined>()
  const [updated, setUpdated] = useState<boolean>(false)
  const [statusOpen, setStatusOpen] = useState<boolean>(false)
  const [editModule, setEditModule] = useState<boolean>(false)
  const hasFieldsWithValues = workflowModule.workflow_items.some(
    (item) => additionalInfo.find((info) => info.workflow_item_id === item.id)?.value
  )

  const handleUpdated = () => {
    router.post(
      route('customer-workflow-status-update'),
      {
        customer_workflow_id: customerWorkflowID,
        module_id: workflowModule.id,
        customer_status: true,
      },
      {
        onSuccess: () => {
          setUpdated(false)
        },
      }
    )
  }

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
            {moduleUpdateStatus?.allow_update && !moduleUpdateStatus?.customer_updated && (
              <span
                className='ml-auto cursor-pointer font-normal text-blue-600 hover:font-semibold hover:text-blue-700'
                onClick={(e) => {
                  e.stopPropagation()
                  setEditModule(true)
                }}
              >
                Edit
              </span>
            )}
            <Button
              className='ml-auto'
              variant='outline'
              size='sm'
              onClick={(e) => {
                e.stopPropagation()
                setStatusOpen(true)
              }}
            >
              <Bell className='h-4 w-4' />
            </Button>
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-6'>
            <div>
              {moduleUpdateStatus?.allow_update && !moduleUpdateStatus?.customer_updated && (
                <div className='flex items-center gap-2'>
                  <div className='flex p-2'>
                    <Checkbox
                      onCheckedChange={(checked) => setUpdated(!!checked)}
                      checked={updated}
                    />
                    <NormalText className='pl-2'>Mark as updated</NormalText>
                  </div>
                  <span className='text-muted-foreground text-sm'></span>
                </div>
              )}
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {statusOpen && (
        <Modal
          setShowModal={setStatusOpen}
          title={`Your Request is ${moduleUpdateStatus?.status ?? 'Processing'}`}
        >
          <div className='p-3'>
            <StrongText>{moduleUpdateStatus?.customer_notes ?? ''}</StrongText>
          </div>
          <Button
            onClick={() => setStatusOpen(false)}
            size='sm'
          >
            OK
          </Button>
        </Modal>
      )}
      {editModule && (
        <Modal
          setShowModal={setEditModule}
          title={`Edit ${workflowModule.name}`}
        >
          <ModuleEdit
            key={workflowModule.id}
            customerPriceplanId={moduleUpdateStatus?.customer_workflow_id ?? 0}
            workflowModule={workflowModule}
            setShowForm={setEditModule}
            additionalInfo={additionalInfo}
          />
        </Modal>
      )}
      {updated && (
        <Modal
          setShowModal={setUpdated}
          title='Confirm update?'
        >
          <div>By marking as updated You can't able to add or remove data you added.</div>
          <div className='flex justify-end gap-2'>
            <Button onClick={() => setUpdated(false)}>Cancel</Button>
            <Button onClick={handleUpdated}>Mark as updated</Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
