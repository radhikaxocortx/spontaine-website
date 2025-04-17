import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { formatDate } from '@/lib/utils'
import { Dispatch, FormEvent, SetStateAction, useCallback, useMemo } from 'react'
import { ModuleStatusVerification } from '../Interface/data_interface'

interface Props {
  customerWorkflowID: number
  workflowModuleID: number
  setShowForm: Dispatch<SetStateAction<boolean>>
  moduleStatus: ModuleStatusVerification | undefined
}

const statuses = [
  { Value: 'processing', label: 'Processing' },
  { Value: 'approved', label: 'Approved' },
  { Value: 'rejected', label: 'Rejected' },
]

const ModuleStatusUpdate = ({
  customerWorkflowID,
  workflowModuleID,
  setShowForm,
  moduleStatus,
}: Props) => {
  const { formData, setFormValue } = useCustomForm({
    status: moduleStatus?.status ?? 'processing',
    customer_notes: moduleStatus?.customer_notes ?? '',
    internal_notes: moduleStatus?.internal_notes ?? '',
    allow_update: moduleStatus?.allow_update ?? false,
  })

  const verificationDate = formatDate(new Date())

  const onComplete = useCallback(() => {
    setShowForm(false)
  }, [setShowForm])

  const { post, loading, errors } = useInertiaPost(
    moduleStatus
      ? route('workflow-module-authenticate-update', moduleStatus.id)
      : route('workflow-module-authenticate'),
    {
      onComplete,
    }
  )

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

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      post({
        ...formData,
        customer_workflow_id: customerWorkflowID,
        module_id: workflowModuleID,
        verification_date: verificationDate,
        ...(moduleStatus?.id && { _method: 'PATCH' }),
      })
    },
    [formData, post, customerWorkflowID, workflowModuleID, verificationDate, moduleStatus?.id]
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
