import CustomerDashboardLayout from '@/Components/Customer/Dashboard/CustomerDashboardLayouts'
import { Customer, PricePlan } from '@/Components/Interface/data_interface'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { usePage } from '@inertiajs/react'
import { FormEvent, useCallback, useMemo } from 'react'

interface Props {
  pricePlan: PricePlan[]
}

const ChoosePriceplan = ({ pricePlan }: Props) => {
  const userInfo = usePage().props.auth as unknown as { customer: Customer }
  const User = useMemo(() => {
    return userInfo.customer ?? null
  }, [userInfo])
  const customerId = User?.id

  const { formData, setFormValue } = useCustomForm({
    priceplan_id: '',
  })

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      priceplan_id: {
        type: 'select',
        placeholder: 'Select Priceplan',
        label: 'Priceplan',
        list: pricePlan,
        dataKey: 'id',
        displayKey: 'name',

        setValue: (value: string) => {
          setFormValue('priceplan_id')(value)
        },
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, pricePlan])

  const { post, loading, errors } = useInertiaPost(route('update-priceplan'))
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      post({
        price_plan_id: formData.priceplan_id,
        customer_id: customerId,
      })
    },
    [post, formData, customerId]
  )
  return (
    <>
      <CustomerDashboardLayout>
        <FormBuilder
          loading={loading}
          errors={errors}
          formData={formData}
          formItems={formItems}
          onFormSubmit={handleSubmit}
          buttonText='Next'
          formStyles='items-center p-5'
        ></FormBuilder>
      </CustomerDashboardLayout>
    </>
  )
}
export default ChoosePriceplan
