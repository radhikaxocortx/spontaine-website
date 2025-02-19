import { ReferenceData, ReferenceDataDomain } from '@/Components/Interface/data_interface'
import ListResourcePage, { ListItemKeys } from '@/Components/ListingPage/ListResourcePage'
import { Paginator } from '@/Components/ui/ui_interfaces'
import { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import { router } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'

interface Props {
  referenceData: Paginator<ReferenceData>
  domains: ReferenceDataDomain[]
  oldDomain: string
  oldParameter: string
  oldValue: string
}

const cols = ['Domain', 'Parameter', 'Position', 'Value One', 'Value Two']

const ReferenceDataIndex = ({
  referenceData,
  domains,
  oldDomain,
  oldValue,
  oldParameter,
}: Props) => {
  const { formData, setFormValue } = useCustomForm({
    domain_id: oldDomain,
    parameter_id: oldParameter,
    value: oldValue,
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
        showAllOption: true,
        allOptionText: 'All Domain',
      },
      parameter_id: {
        label: 'Parameter',
        type: 'dynamicSelect',
        setValue: setFormValue('parameter_id'),
        displayKey: 'parameter',
        dataKey: 'id',
        selectListUrl: route('parameter-list', {
          domain: formData.domain_id,
        }),
        showAllOption: true,
        allOptionText: 'All Parameter',
      },
      value: {
        label: 'Value',
        type: 'text',
        setValue: setFormValue('value'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, domains, formData.domain_id])

  const data = useMemo(() => {
    return referenceData.data.map((row) => {
      return {
        id: row.id,
        domain: row.domain,
        parameter: row.parameter,
        sort_order: row.sort_order,
        value_one: row.value_one,
        value_two: row.value_two,
        actions: [],
      }
    })
  }, [referenceData])

  const keys = useMemo(() => {
    return [
      {
        key: 'domain',
        label: 'Domain',
        isCardHeader: true,
      },
      {
        key: 'parameter',
        label: 'Parameter',
        isShownInCard: true,
        hideLabel: true,
      },
      {
        key: 'sort_order',
        label: 'Position',
      },
      {
        key: 'value_one',
        label: 'Value One',
        isShownInCard: true,
      },
      {
        key: 'value_two',
        label: 'Value Two',
        isShownInCard: true,
      },
    ] as ListItemKeys<Partial<ReferenceData>>[]
  }, [])

  const handleCardOpen = useCallback((id: number | string) => {
    router.get(route('reference-data.edit', id))
  }, [])

  return (
    <ListResourcePage
      rows={data}
      keys={keys}
      primaryKey={'id'}
      title='Reference Data'
      paginator={referenceData}
      formItems={formItems}
      formData={formData}
      searchUrl={route('reference-data.index')}
      addUrl={route('reference-data.create')}
      onCardClick={handleCardOpen}
      type='settings'
      subtype='reference-data'
      selectedHeading='configurations'
    />
  )
}

export default ReferenceDataIndex
