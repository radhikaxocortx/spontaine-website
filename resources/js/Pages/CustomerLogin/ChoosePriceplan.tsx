import CustomerWorkflow from '@/Components/Customer/CustomerWorkflow'
import CustomerDashboardLayout from '@/Components/Customer/Dashboard/CustomerDashboardLayouts'
import { PricePlan } from '@/Components/Interface/data_interface'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import { useMemo, useState } from 'react'

interface Props {
  pricePlan: PricePlan[]
}

const ChoosePriceplan = ({ pricePlan }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    priceplan: '',
  })

  const [workflow, setWorkflow] = useState<boolean>(false)

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      priceplan: {
        type: 'select',
        placeholder: 'Select Priceplan',
        label: 'Priceplan',
        list: pricePlan,
        dataKey: 'name',
        displayKey: 'name',

        setValue: (value: string) => {
          setFormValue('priceplan')(value)
        },
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, pricePlan])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setWorkflow(true)
  }
  return (
    <>
      {workflow === false && (
        <CustomerDashboardLayout>
          <FormBuilder
            loading={false}
            formData={formData}
            formItems={formItems}
            onFormSubmit={handleSubmit}
            buttonText='Next'
            formStyles='items-center p-5'
          ></FormBuilder>
        </CustomerDashboardLayout>
      )}
      {workflow && <CustomerWorkflow pricePlan={formData.priceplan} />}
    </>
  )
}
export default ChoosePriceplan
