import ModuleStatus from '@/components/AdminCustomerVerification/ModuleStatus'
import ModuleStatusUpdate from '@/components/AdminCustomerVerification/ModuleStatusUpdate'
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
import { AlertCircle, User } from 'lucide-react'
import { useState } from 'react'

interface Props {
  workflowModule: WorkflowModule
  additionalInfo: WorkflowItem[]
  customerWorkflowID: number
  moduleStatus?: ModuleStatusVerification
  statusUpdate: boolean
}

export default function AdminAdditionalInfoModule({
  workflowModule,
  additionalInfo,
  customerWorkflowID,
  moduleStatus,
  statusUpdate,
}: Readonly<Props>) {
  const [updateModuleStatus, setUpdateModuleStatus] = useState(false)
  const [expandedValue, setExpandedValue] = useState<string | undefined>()
  const [statusOpen, setStatusOpen] = useState<boolean>(false)

  const hasCustomerNotes = Boolean(moduleStatus?.customer_notes)
  const hasInternalNotes = Boolean(moduleStatus?.internal_notes)

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
            {statusUpdate ? (
              <div className='mr-auto p-2'>
                <Button
                  variant='link'
                  onClick={() => setUpdateModuleStatus(true)}
                >
                  Update Status
                </Button>
              </div>
            ) : (
              <div className='px-6 pb-6'>
                <Button
                  variant='link'
                  onClick={() => setStatusOpen(true)}
                >
                  View Module Status
                </Button>
              </div>
            )}
            {/* Status Section */}
            <div className='overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm'>
              <div className='mb-4 flex items-center justify-end'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium text-gray-600'>Current Status:</span>
                  <span className='rounded-full bg-secondary-100 px-3 py-1 text-sm font-medium text-secondary-700'>
                    {moduleStatus?.status ?? 'Not Started'}
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
                        <span className='text-sm font-medium text-gray-700'>Customer Note</span>
                        <span className='text-xs text-gray-500'>
                          {moduleStatus?.updated_at
                            ? new Date(moduleStatus.updated_at).toLocaleDateString()
                            : ''}
                        </span>
                      </div>
                      <div className='relative rounded-xl rounded-tl-none bg-white p-3 shadow-sm ring-1 ring-gray-100 before:absolute before:left-[-8px] before:top-0 before:border-8 before:border-transparent before:border-r-white before:border-t-white'>
                        <p className='text-sm text-gray-600'>{moduleStatus?.customer_notes}</p>
                      </div>
                    </div>
                  </div>
                )}
                {hasInternalNotes && (
                  <div className='flex items-start gap-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 ring-2 ring-primary-50'>
                      <AlertCircle className='h-4 w-4 text-primary-600' />
                    </div>
                    <div className='flex-1'>
                      <div className='mb-1 flex items-center gap-2'>
                        <span className='text-sm font-medium text-gray-700'>Internal Note</span>
                        <span className='text-xs text-gray-500'>
                          {moduleStatus?.updated_at
                            ? new Date(moduleStatus.updated_at).toLocaleDateString()
                            : ''}
                        </span>
                      </div>
                      <div className='relative rounded-xl rounded-tl-none bg-white p-3 shadow-sm ring-1 ring-gray-100 before:absolute before:left-[-8px] before:top-0 before:border-8 before:border-transparent before:border-r-white before:border-t-white'>
                        <p className='text-sm text-gray-600'>{moduleStatus?.internal_notes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='grid gap-4 p-2'>
              {workflowModule.workflow_items
                .sort((a, b) => a.field_number - b.field_number)
                .map((item) => {
                  const matchingInfo = additionalInfo.filter(
                    (info) => info.workflow_item_id === item.id
                  )
                  const values = matchingInfo.map((info) => info.value).filter(Boolean)

                  const isFileType =
                    item.type === 'pdf' || item.type === 'word_document' || item.type === 'image'

                  const filePath = values[0]

                  return (
                    <div
                      key={item.id}
                      className='flex flex-col gap-1'
                    >
                      <span className='text-muted-foreground text-xs font-medium'>
                        {item.external_field_name ?? item.field_name}
                      </span>

                      {/* Render file download or image preview */}
                      {isFileType && filePath ? (
                        item.type === 'image' ? (
                          <img
                            className='max-h-60 max-w-xs rounded'
                            alt={item.field_name}
                            src={route('file-download', { path: filePath })}
                          />
                        ) : (
                          <a
                            href={route('file-download', { path: filePath })}
                            className='link text-blue-600 hover:underline'
                            target='_blank'
                            rel='noreferrer'
                          >
                            Download
                          </a>
                        )
                      ) : (
                        <span className='text-sm'>
                          {values.length > 0 ? values.join(', ') : 'No data available'}
                        </span>
                      )}
                    </div>
                  )
                })}
            </div>
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
          />
        </Modal>
      )}
      {statusOpen && (
        <Modal
          setShowModal={setStatusOpen}
          title='Module Status'
        >
          <ModuleStatus moduleStatus={moduleStatus}></ModuleStatus>
        </Modal>
      )}
    </div>
  )
}
