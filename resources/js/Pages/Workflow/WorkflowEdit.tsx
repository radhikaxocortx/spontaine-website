import { Country, PricePlan, ReferenceData, Workflow } from '@/Components/Interface/data_interface'
import { FormItem } from '@/FormBuilder/FormBuilder'
import FormPage from '@/FormBuilder/FormPage'
import useCustomForm from '@/hooks/useCustomForm'
import { useMemo, useState } from 'react'

interface Props {
  workflow: Workflow
  status: ReferenceData[]
}

const WorkflowEdit = ({ workflow, status }: Props) => {
  const [country, setCountry] = useState<Country | null>(workflow.country)
  const [pricePlan, setPricePlan] = useState<PricePlan | null>(workflow.priceplan)
  const { formData, setFormValue } = useCustomForm({
    name: workflow.name,
    country_id: workflow.country_id.toString(),
    priceplan_id: workflow.priceplan_id.toString(),
    status: workflow.status,
    active_from: workflow.active_from,
    description: workflow.description,
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
        label: 'Name',
        placeholder: 'Enter Name',
        type: 'text',
        setValue: setFormValue('name'),
      },
      country_id: {
        type: 'autocomplete',
        placeholder: 'Enter Country name or code',
        label: 'Country',

        autoCompleteSelection: country,
        dataKey: 'id',
        displayKey: 'name',
        displayKey2: 'code',
        selectListUrl: route('country-list', {
          search: '',
        }),
        setValue: (value: Country | null) => {
          setCountry(value)
          setFormValue('country_id')(value?.id.toString() ?? '')
        },
      },
      priceplan_id: {
        type: 'autocomplete',
        placeholder: 'Enter Price Plan name or code',
        label: 'Price Plan',

        autoCompleteSelection: pricePlan,
        dataKey: 'id',
        displayKey: 'name',
        displayKey2: 'code',
        selectListUrl: route('priceplan-list', {
          search: '',
        }),
        setValue: (value: PricePlan | null) => {
          setPricePlan(value)
          setFormValue('priceplan_id')(value?.id.toString() ?? '')
        },
      },
      status: {
        label: 'Status',
        type: 'select',
        setValue: setFormValue('status'),
        list: status,
        dataKey: 'value_one',
        displayKey: 'value_one',
      },
      active_from: {
        label: 'Active From',
        type: 'date',
        setValue: setFormValue('active_from'),
      },
      description: {
        label: 'Description',
        type: 'textarea',
        setValue: setFormValue('description'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, status, country, pricePlan])

  return (
    <FormPage
      formItems={formItems}
      formData={formData}
      title='Update Workflow'
      url={route('workflow.update', workflow.id)}
      backUrl={route('workflow.index')}
    />
  )
}
export default WorkflowEdit
