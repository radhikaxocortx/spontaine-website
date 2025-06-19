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
import StrongText from '@/typography/StrongText'
import { router } from '@inertiajs/react'
import { Bell, Info, User } from 'lucide-react'
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

  const isUpdateAllowed = moduleUpdateStatus?.allow_update && !moduleUpdateStatus?.customer_updated
  const hasCustomerNotes = Boolean(moduleUpdateStatus?.customer_notes)

  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 ${
        expandedValue ? 'h-full' : 'h-[60px]'
      }`}
    >
      <Accordion
        type='single'
        collapsible
        value={expandedValue}
        onValueChange={setExpandedValue}
        className='w-full'
      >
        <AccordionItem
          value='item-1'
          className='border-none'
        >
          <AccordionTrigger
            className={`cursor-pointer px-6 transition-colors duration-200 hover:bg-gray-50 ${
              isUpdateAllowed ? 'bg-primary-graige-100' : ''
            }`}
          >
            <div className='flex items-center'>
              <div className='flex items-center gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full'>
                  <Info className='h-4 w-4 text-primary-600' />
                </div>
                <span className='font-semibold'>{workflowModule.name}</span>
              </div>
              {hasCustomerNotes && isUpdateAllowed && (
                <Button
                  className='ml-auto'
                  variant='ghost'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation()
                    setStatusOpen(true)
                  }}
                >
                  <Bell className='h-6 w-6 font-bold text-red-500' />
                </Button>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-6 pt-4'>
            <div className='space-y-6'>
              {/* Status Section */}
              <div className='overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm'>
                <div className='mb-4 flex items-center justify-end'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-gray-600'>Current Status:</span>
                    <span className='rounded-full bg-secondary-100 px-3 py-1 text-sm font-medium text-secondary-700'>
                      {moduleUpdateStatus?.status ?? 'Not Started'}
                    </span>
                  </div>
                </div>
                <div className='mb-4 space-y-4'>
                  {hasCustomerNotes && (
                    <div className='flex items-start gap-3'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-secondary-100 ring-2 ring-secondary-50'>
                        <User className='h-4 w-4 text-secondary-600' />
                      </div>
                      <div className='flex-1'>
                        <div className='mb-1 flex items-center gap-2'>
                          <span className='text-sm font-medium text-gray-700'>
                            Verification Team
                          </span>
                          <span className='text-xs text-gray-500'>
                            {moduleUpdateStatus?.updated_at
                              ? new Date(moduleUpdateStatus.updated_at).toLocaleDateString()
                              : ''}
                          </span>
                        </div>
                        <div className='relative rounded-xl rounded-tl-none bg-white p-3 shadow-sm ring-1 ring-gray-100 before:absolute before:left-[-8px] before:top-0 before:border-8 before:border-transparent before:border-r-white before:border-t-white'>
                          <p className='text-sm text-gray-600'>
                            {moduleUpdateStatus?.customer_notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* {hasInternalNotes && (
                    <div className='flex items-start gap-3'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 ring-2 ring-primary-50'>
                        <AlertCircle className='h-4 w-4 text-primary-600' />
                      </div>
                      <div className='flex-1'>
                        <div className='mb-1 flex items-center gap-2'>
                          <span className='text-sm font-medium text-gray-700'>Admin</span>
                          <span className='text-xs text-gray-500'>
                            {moduleUpdateStatus?.updated_at
                              ? new Date(moduleUpdateStatus.updated_at).toLocaleDateString()
                              : ''}
                          </span>
                        </div>
                        <div className='relative rounded-xl rounded-tl-none bg-white p-3 shadow-sm ring-1 ring-gray-100 before:absolute before:left-[-8px] before:top-0 before:border-8 before:border-transparent before:border-r-white before:border-t-white'>
                          <p className='text-sm text-gray-600'>
                            {moduleUpdateStatus?.internal_notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>

              {/* Selected Options Section */}
              {hasFieldsWithValues && (
                <div className='overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm'>
                  <div className='grid gap-4'>
                    {workflowModule.workflow_items
                      .sort((a, b) => a.field_number - b.field_number)
                      .map((item) => {
                        const matchingInfo = additionalInfo.filter(
                          (info) => info.workflow_item_id === item.id
                        )

                        const values = matchingInfo
                          .map((info) => {
                            const isFileType = ['image', 'pdf', 'word_document'].includes(item.type)
                            if (isFileType && typeof info.value === 'string') {
                              const parts = info.value.split('/')
                              return parts[parts.length - 1]
                            }
                            return info.value
                          })
                          .filter(Boolean)

                        if (values.length === 0) return null

                        return (
                          <div
                            key={item.id}
                            className='flex flex-col gap-1 rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100'
                          >
                            <span className='text-muted-foreground text-xs font-medium'>
                              {item.external_field_name ?? item.field_name}
                            </span>
                            <span className='text-sm'>{values.join(', ')}</span>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}

              <div className='flex items-center justify-end gap-4'>
                {/* Update Controls */}

                <div className='flex items-center'>
                  {isUpdateAllowed && (
                    <Button
                      variant='default'
                      size='sm'
                      onClick={() => setEditModule(true)}
                      className='flex items-center gap-2'
                    >
                      Edit Details
                    </Button>
                  )}
                </div>

                {isUpdateAllowed && (
                  <div className='flex items-center justify-end rounded-xl shadow-sm'>
                    <Button
                      variant={updated ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setUpdated(!updated)}
                      disabled={updated}
                      className={updated ? 'cursor-not-allowed opacity-50' : ''}
                    >
                      {updated ? 'Marked' : 'Mark Completed'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {statusOpen && (
        <Modal
          setShowModal={setStatusOpen}
          title={`Your Request is ${moduleUpdateStatus?.status ?? 'Not Started'}`}
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
          <div>
            You are about to submit the module to the verification team. This action is
            irreversible. Are you sure?
          </div>
          <div className='flex justify-end gap-2'>
            <Button onClick={() => setUpdated(false)}>Cancel</Button>
            <Button onClick={handleUpdated}>Mark as updated</Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
