import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { formatDate } from '@/lib/utils'
import { Dispatch, FormEvent, SetStateAction, useCallback, useMemo } from 'react'
import { CustomerWorkflowStatus, ReferenceData } from '../Interface/data_interface'

interface Props {
  customerWorkflowID: number
  setShowForm: Dispatch<SetStateAction<boolean>>
  customerWorkflowStatus: CustomerWorkflowStatus | undefined
  statuses: ReferenceData[]
}

const UpdateCustomerWorkflowStatus = ({
  customerWorkflowID,
  setShowForm,
  customerWorkflowStatus,
  statuses,
}: Props) => {
  const { formData, setFormValue } = useCustomForm({
    status: customerWorkflowStatus?.status ?? 'processing',
    notes: customerWorkflowStatus?.notes ?? '',
    customer_notes: customerWorkflowStatus?.customer_notes ?? '',
    kadodo_id: customerWorkflowStatus?.kadodo_id ?? '',
  })
  const statusDate = formatDate(new Date())

  const onComplete = useCallback(() => {
    setShowForm(false)
  }, [setShowForm])

  const { post, loading, errors } = useInertiaPost(
    customerWorkflowStatus
      ? route('customer-workflow-authenticate-update')
      : route('customer-workflow-authenticate'),
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
        dataKey: 'value_one',
        displayKey: 'value_one',
        setValue: setFormValue('status'),
      },
      notes: {
        type: 'textarea',
        placeholder: 'Enter  Notes',
        label: ' Notes',
        setValue: setFormValue('notes'),
      },
      customer_notes: {
        type: 'textarea',
        placeholder: 'Enter Customer Notes',
        label: 'Customer Notes',
        setValue: setFormValue('customer_notes'),
      },

      kadodo_id: {
        label: 'Kadodo ID',
        type: 'text',
        placeholder: 'Enter Kadodo ID',
        setValue: setFormValue('kadodo_id'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, statuses])

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      post({
        ...formData,
        customer_workflow_id: customerWorkflowID,
        status_date: statusDate,
        ...(customerWorkflowStatus?.id && { _method: 'PATCH' }),
      })
    },
    [formData, post, customerWorkflowID, statusDate, customerWorkflowStatus?.id]
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

export default UpdateCustomerWorkflowStatus
