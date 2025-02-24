import { EntityTemplateItem, ReferenceData } from '@/Components/Interface/data_interface'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useFetchList from '@/hooks/useFetchList'
import { FormEvent, useMemo } from 'react'

interface Props {
  item?: EntityTemplateItem
  errors: Record<string, string | unknown>
  loading: boolean
  onSubmit: (data: Record<string, string | boolean | number>) => void
}

const types = [
  { name: 'Text', value: 'text' },
  { name: 'Date', value: 'date' },
  { name: 'Number', value: 'number' },
  { name: 'Long Text', value: 'long_text' },
  { name: 'Dropdown', value: 'dropdown' },
  { name: 'Image', value: 'image' },
  { name: 'PDF', value: 'pdf' },
  { name: 'Word Document', value: 'word_document' },
]

const getDefaultValue = (type: string) => {
  switch (type) {
    case 'dropdown':
      return 'dynamicSelect'
    case 'date':
      return 'date'
    default:
      return 'text'
  }
}

export default function TemplateItemForm({
  errors,
  loading = false,
  onSubmit,
  item,
}: Readonly<Props>) {
  const [domains] = useFetchList<ReferenceData>(route('domain-list'))
  const { formData, setFormValue } = useCustomForm({
    field_number: item?.field_number.toString() ?? '',
    field_name: item?.field_name ?? '',
    type: item?.type ?? 'text',
    domain: item?.domain ?? '',
    parameter: item?.parameter ?? '',
    default_value: item?.default_value ?? '',
  })

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      field_number: {
        type: 'text',
        label: 'Field Number',
        setValue: setFormValue('field_number'),
      },
      field_name: {
        type: 'text',
        label: 'Field Name',
        setValue: setFormValue('field_name'),
      },
      type: {
        type: 'select',
        label: 'Value',
        setValue: setFormValue('type'),
        list: types,
        dataKey: 'value',
        displayKey: 'name',
        showAllOption: true,
        allOptionText: 'All',
      },
      domain: {
        label: 'Domain',
        type: 'select',
        setValue: (domain: string) => {
          setFormValue('domain')(domain)
          setFormValue('parameter')('')
        },
        list: domains,
        displayKey: 'domain',
        dataKey: 'domain',
        hidden: formData.type !== 'dropdown',
      },
      parameter: {
        label: 'Parameter',
        type: 'dynamicSelect',
        setValue: setFormValue('parameter'),
        displayKey: 'parameter',
        dataKey: 'parameter',
        selectListUrl: route('parameter-list', {
          domain: domains.find((domain) => domain.domain === formData.domain)?.id ?? '',
        }),
        hidden: formData.type !== 'dropdown',
      },
      default_value: {
        type: getDefaultValue(formData.type),
        label: 'Default Value',
        setValue: setFormValue('default_value'),
        dataKey: 'value_one',
        selectListUrl: route('unique-ref-data-values', {
          domain: formData.domain,
          parameter: formData.parameter,
        }),
        displayKey: 'value_one',
        showAllOption: true,
        allOptionText: 'Select Default Value',
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, formData.type, domains, formData.domain, formData.parameter])
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ ...formData })
  }

  return (
    <FormBuilder
      formData={formData}
      onFormSubmit={handleFormSubmit}
      formItems={formItems}
      loading={loading}
      errors={errors}
      formStyles='w-full md:grid-cols-1 p-2'
    />
  )
}
