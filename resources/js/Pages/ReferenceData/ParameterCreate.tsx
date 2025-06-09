import { ReferenceDataDomain, ReferenceDataParameter } from '@/components/Interface/data_interface'
import { FormItem } from '@/FormBuilder/FormBuilder'
import FormPage from '@/FormBuilder/FormPage'
import useCustomForm from '@/hooks/useCustomForm'
import { useMemo } from 'react'

interface Props {
  domains: ReferenceDataDomain[]
  parameter?: ReferenceDataParameter
}

const ParameterCreate = ({ domains, parameter }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    domain_id: parameter?.domain_id || '',
    parameter: parameter?.parameter || '',
    has_second_value: parameter?.has_second_value || false,
  })

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      domain_id: {
        label: 'Domain',
        type: 'select',
        setValue: setFormValue('domain_id'),
        list: domains,
        displayKey: 'domain',
        dataKey: 'id',
      },
      parameter: {
        label: 'Parameter',
        type: 'text',
        setValue: setFormValue('parameter'),
      },
      has_second_value: {
        label: 'Has Second Value',
        type: 'checkbox',
        setValue: setFormValue('has_second_value'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, domains])

  return (
    <FormPage
      formItems={formItems}
      formData={formData}
      title={parameter ? 'Update Reference Data Parameter' : 'Create Reference Data Parameter'}
      url={
        parameter
          ? route('parameter-management.update', parameter.id)
          : route('parameter-management.store')
      }
      backUrl={route('parameter-management.index')}
      isPatchRequest={!!parameter}
    />
  )
}

export default ParameterCreate
