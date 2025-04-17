import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { formatDate } from '@/lib/utils'
import { FormEvent, useCallback, useMemo } from 'react'

interface Props {
  customerWorkflowID: number
  workflowModuleID: number
}

const statuses = [
  { Value: 'processing', label: 'Processsing' },
  { Value: 'approved', label: 'Approved' },
  { Value: 'rejected', label: 'Rejected' },
]
const ModuleStatusUpdate = ({ customerWorkflowID, workflowModuleID }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    status: '',
    customer_notes: '',
    internal_notes: '',
    allow_update: false,
  })

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      status: {
        type: 'select',
        placeholder: 'Select Status',
        label: 'Select Status',
        list: statuses,
        dataKey: 'Value',
        displayKey: 'label',
        setValue: setFormValue('status'),
      },
      customer_notes: {
        type: 'textarea',
        placeholder: 'Enter Customer Notes',
        label: 'Customer Notes',
        setValue: setFormValue('customer_notes'),
      },
      internal_notes: {
        type: 'textarea',
        placeholder: 'Enter Internal Notes',
        label: 'Internal Notes',
        setValue: setFormValue('internal_notes'),
      },
      allow_update: {
        type: 'checkbox',
        label: 'Allow Update',
        setValue: setFormValue('allow_update'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])

  const { post, loading, errors } = useInertiaPost(route('workflow-module-authenticate'))
  const verificationDate = formatDate(new Date())

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      post({
        ...formData,
        customer_workflow_id: customerWorkflowID,
        workflow_module_id: workflowModuleID,
        verification_date: verificationDate,
      })
    },
    [post, formData, customerWorkflowID, workflowModuleID, verificationDate]
  )

  return (
    <div className='ml-4 w-full'>
      <FormBuilder
        loading={loading}
        errors={errors}
        formData={formData}
        onFormSubmit={handleFormSubmit}
        formItems={formItems}
        buttonText='UPDATE'
        formStyles='md:grid-cols-1 p-2'
      />
    </div>
  )
}
export default ModuleStatusUpdate
