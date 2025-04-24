import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { User } from '@/types'
import { usePage } from '@inertiajs/react'
import { Dispatch, FormEvent, SetStateAction, useCallback, useMemo } from 'react'
import { ReferenceData } from '../Interface/data_interface'

interface Props {
  customerWorkflowID: number
  amount: number
  setShowForm: Dispatch<SetStateAction<boolean>>
  paymentMethods: ReferenceData[]
}

const AddPayment = ({ customerWorkflowID, amount, setShowForm, paymentMethods }: Props) => {
  const userInfo = usePage().props.auth as unknown as { user: User }
  const User = useMemo(() => {
    return userInfo.user ?? null
  }, [userInfo])
  const userId = User?.id
  const { formData, setFormValue } = useCustomForm({
    amount: amount,
    payment_method: '',
    notes: '',
    accounting_reference: '',
  })

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      amount: {
        label: 'Amount',
        type: 'number',
        disabled: true,
        setValue: setFormValue('amount'),
      },
      payment_method: {
        label: 'Payment Method',
        type: 'select',
        setValue: setFormValue('payment_method'),
        list: paymentMethods,
        displayKey: 'value_one',
        dataKey: 'value_one',
      },
      notes: {
        label: 'Notes',
        type: 'textarea',
        setValue: setFormValue('notes'),
      },
      accounting_reference: {
        label: 'Accounting Reference',
        type: 'text',
        setValue: setFormValue('accounting_reference'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, paymentMethods])

  const onComplete = useCallback(() => {
    setShowForm(false)
  }, [setShowForm])

  const { post, loading, errors } = useInertiaPost(route('add-payment'), {
    onComplete,
  })
  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      post({
        ...formData,
        customer_workflow_id: customerWorkflowID,
        payment_date: new Date().toISOString(),
        updated_by: userId,
      })
    },
    [formData, post, customerWorkflowID, userId]
  )

  console.log(formData)
  console.log(customerWorkflowID)
  console.log(new Date().toISOString())
  return (
    <div className='ml-4 w-full'>
      <FormBuilder
        loading={loading}
        errors={errors}
        formData={formData}
        onFormSubmit={handleFormSubmit}
        formItems={formItems}
        buttonText='Confirm Paymnent'
        formStyles='md:grid-cols-1 p-2'
      />
    </div>
  )
}

export default AddPayment
