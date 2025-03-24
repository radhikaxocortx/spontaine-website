import { ReferenceData } from '@/Components/Interface/data_interface'
import { FormItem } from '@/FormBuilder/FormBuilder'
import FormPage from '@/FormBuilder/FormPage'
import useCustomForm from '@/hooks/useCustomForm'
import { useMemo } from 'react'

interface Props {
  type: ReferenceData[]
}
const PricePlanCreate = ({ type }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    name: '',
    code: '',
    type: '',
    description: '',
    min_quantity_required: '',
    rate: '',
    additional_rate: '',
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
        type: 'textarea',
        setValue: setFormValue('description'),
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
      title='Create Price Plan'
      url={route('price-plan.store')}
      backUrl={route('price-plan.index')}
    />
  )
}
export default PricePlanCreate
