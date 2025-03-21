import { Country, ReferenceData } from '@/Components/Interface/data_interface'
import { FormItem } from '@/FormBuilder/FormBuilder'
import FormPage from '@/FormBuilder/FormPage'
import useCustomForm from '@/hooks/useCustomForm'
import { useMemo } from 'react'

interface Props {
  country: Country
  currency: ReferenceData[]
}
const CountryEdit = ({ currency, country }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    name: country.name,
    code: country.code,
    description: country.description,
    currency: country.currency,
    currency_code: country.currency_code,
    currency_symbol: country.currency_symbol,
    base_cxy_conv_rate: country.base_cxy_conv_rate,
    tax_name: country.tax_name,
    tax_code: country.tax_code,
    tax_rate: country.tax_rate,
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
        label: 'Name of Country',
        type: 'text',
        setValue: setFormValue('name'),
      },
      code: {
        label: 'Country Code',
        type: 'text',
        setValue: setFormValue('code'),
      },
      description: {
        label: 'Description',
        type: 'textarea',
        setValue: setFormValue('description'),
      },
      currency: {
        label: 'Currency',
        type: 'select',
        setValue: setFormValue('currency'),
        list: currency,
        dataKey: 'value_one',
        displayKey: 'value_one',
      },
      currency_code: {
        label: 'Currency Code',
        type: 'text',
        setValue: setFormValue('currency_code'),
      },
      currency_symbol: {
        label: 'Currency Symbol',
        type: 'text',
        setValue: setFormValue('currency_symbol'),
      },
      base_cxy_conv_rate: {
        label: 'Base Currency Conversion Rate',
        type: 'number',
        setValue: setFormValue('base_cxy_conv_rate'),
      },
      tax_name: {
        label: 'Tax Name',
        type: 'text',
        setValue: setFormValue('tax_name'),
      },
      tax_code: {
        label: 'Tax Code',
        type: 'text',
        setValue: setFormValue('tax_code'),
      },
      tax_rate: {
        label: 'Tax Rate (%)',
        type: 'number',
        setValue: setFormValue('tax_rate'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, currency])

  return (
    <FormPage
      formItems={formItems}
      formData={formData}
      isPatchRequest
      title='Edit Country'
      url={route('country.update', country.id)}
      backUrl={route('country.show', country.id)}
    />
  )
}
export default CountryEdit
