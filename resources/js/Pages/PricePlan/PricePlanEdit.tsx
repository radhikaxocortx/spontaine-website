import { PricePlan, ReferenceData } from '@/Components/Interface/data_interface'
import { FormItem } from '@/FormBuilder/FormBuilder'
import FormPage from '@/FormBuilder/FormPage'
import useCustomForm from '@/hooks/useCustomForm'
import { useMemo } from 'react'

interface Props {
  pricePlan: PricePlan
  type: ReferenceData[]
}

const PricePlanEdit = ({ pricePlan, type }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    name: pricePlan.name,
    code: pricePlan.code,
    type: pricePlan.type,
    description: pricePlan.description,
    min_quantity_required: pricePlan.min_quantity_required,
    rate: pricePlan.rate,
    additional_rate: pricePlan.additional_rate ? pricePlan.additional_rate : null,
    validity: pricePlan.validity,
  })
  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      name: {
        label: 'Price Plan Name',
        type: 'text',
        setValue: setFormValue('name'),
      },
      code: {
        label: 'Price Plan Code',
        type: 'text',
        setValue: setFormValue('code'),
      },
      type: {
        label: 'Type',
        type: 'select',
        setValue: setFormValue('type'),
        list: type,
        dataKey: 'value_one',
        displayKey: 'value_one',
      },
      description: {
        label: 'Price Plan Description',
        type: 'text',
        setValue: setFormValue('description'),
      },
      validity: {
        label: 'Validity (months)',
        type: 'number',
        setValue: setFormValue('validity'),
      },
      min_quantity_required: {
        label: 'Min Quantity Required',
        type: 'number',
        setValue: setFormValue('min_quantity_required'),
      },
      rate: {
        label: 'Rate',
        type: 'text',
        setValue: setFormValue('rate'),
      },
      additional_rate: {
        label: 'Additional Rate',
        type: 'text',
        setValue: setFormValue('additional_rate'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, type])

  return (
    <FormPage
      formItems={formItems}
      formData={formData}
      title='Edit Price Plan'
      url={route('price-plan.update', { pricePlan: pricePlan.id })}
      backUrl={route('price-plan.index')}
      isPatchRequest
    />
  )
}
export default PricePlanEdit
