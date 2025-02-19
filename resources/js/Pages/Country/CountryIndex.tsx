import { Country } from '@/Components/Interface/data_interface'
import ListResourcePage from '@/Components/ListingPage/ListResourcePage'
import { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import { router } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'

interface Props {
  countries: Country[]
}

const CountryIndex = ({ countries }: Props) => {
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
        placeholder: 'Search by Country Name',
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])

  const data = useMemo(() => {
    return countries.map((country) => {
      return {
        id: country.id,
        name: country.name,
        code: country.code,
        actions: [],
      }
    })
  }, [countries])

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
    router.get(route('country.show', id))
  }, [])

  return (
    <ListResourcePage
      keys={keys}
      primaryKey='id'
      rows={data}
      title='Country'
      formItems={formItems}
      formData={formData}
      addUrl={route('country.create')}
      onCardClick={handleCardClick}
      searchUrl={route('country.index')}
    />
  )
}
export default CountryIndex
