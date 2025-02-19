import { PricePlan } from '@/Components/Interface/data_interface'
import ListResourcePage from '@/Components/ListingPage/ListResourcePage'
import { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import { router } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'

interface Props {
  pricePlans: PricePlan[]
}

const PricePlanIndex = ({ pricePlans }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    search: '',
  })

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      search: {
        label: 'Search',
        type: 'text',
        setValue: setFormValue('search'),
        placeholder: 'Search by Price Plan Name',
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])

  const data = useMemo(() => {
    return pricePlans.map((pricePlan) => {
      return {
        id: pricePlan.id,
        name: pricePlan.name,
        code: pricePlan.code,
        actions: [],
      }
    })
  }, [pricePlans])

  const keys = useMemo(() => {
    return [
      {
        key: 'name',
        label: 'Name',
      },
      {
        key: 'code',
        label: 'Code',
      },
    ]
  }, [])

  const handleCardClick = useCallback((id: number) => {
    router.get(route('price-plan.show', id))
  }, [])

  return (
    <ListResourcePage
      keys={keys}
      primaryKey='id'
      rows={data}
      title='Price Plan'
      formItems={formItems}
      formData={formData}
      addUrl={route('price-plan.create')}
      onCardClick={handleCardClick}
      searchUrl={route('price-plan.index')}
    />
  )
}
export default PricePlanIndex
