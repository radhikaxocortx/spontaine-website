import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { User } from '@/types'
import { usePage } from '@inertiajs/react'
import { Dispatch, FormEvent, SetStateAction, useCallback, useMemo } from 'react'
import { Country, CustomerPricePlan, ReferenceData } from '../Interface/data_interface'

interface Props {
  customerPriceplan: CustomerPricePlan
  setShowForm: Dispatch<SetStateAction<boolean>>
  country: Country
  paymentMethods: ReferenceData[]
}

const AddPayment = ({ customerPriceplan, setShowForm, country, paymentMethods }: Props) => {
  const userInfo = usePage().props.auth as unknown as { user: User }
  const User = useMemo(() => {
    return userInfo.user ?? null
  }, [userInfo])

  const priceplanRate = Number(customerPriceplan.price_plan?.rate ?? 0)
  const discountAmount = 0

  const amountPayable = priceplanRate - discountAmount
  const taxRate = Number(country?.tax_rate ?? 0)

  const taxAmount = ((amountPayable * taxRate) / 100).toFixed(2)
  const totalAmount = (amountPayable + (amountPayable * taxRate) / 100).toFixed(2)

  const { formData, setFormValue } = useCustomForm({
    priceplan_id: customerPriceplan.priceplan_id,
    price_plan_amount: priceplanRate,
    tax_amount: taxAmount,
    total_amount: totalAmount,
    payment_amount: totalAmount,

    payment_method: '',
    coupon_id: null,
    discount_amount: 0,
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
      price_plan_amount: {
        label: 'Price Plan Amount',
        type: 'number',
        setValue: setFormValue('price_plan_amount'),
        disabled: true,
      },
      tax_amount: {
        label: 'Tax Amount',
        type: 'number',
        disabled: true,
        setValue: setFormValue('tax_amount'),
      },
      total_amount: {
        label: 'Total Amount',
        disabled: true,
        type: 'number',
        setValue: setFormValue('total_amount'),
      },
      payment_amount: {
        label: 'Payment Amount',
        disabled: true,
        type: 'number',
        setValue: setFormValue('payment_amount'),
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
        type: 'text',
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
  const data = useMemo(() => {
    return {
      customer_priceplan_id: customerPriceplan.id,
      price_plan_amount: Number(priceplanRate),
      tax_amount: Number(taxAmount),
      total_amount: Number(totalAmount),
      payment_amount: Number(totalAmount),
      payment_status: 'completed',
      payment_method: formData.payment_method,
      coupon_id: null,
      discount_amount: 0,
      notes: formData.notes ?? '',
      accounting_reference: formData.accounting_reference,
      updated_by: User?.id ?? 0,
    }
  }, [customerPriceplan.id, priceplanRate, taxAmount, totalAmount, User?.id, formData])

  const { post, loading, errors } = useInertiaPost(route('add-payment'), {
    onComplete,
  })
  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      post(data)
    },
    [post, data]
  )

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
