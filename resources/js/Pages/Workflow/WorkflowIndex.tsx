import { Workflow } from '@/components/Interface/data_interface'
import ListResourcePage from '@/components/ListingPage/ListResourcePage'
import { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import { router } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'

interface Props {
  workflows: Workflow[]
}

const WorkflowIndex = ({ workflows }: Props) => {
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
        placeholder: 'Search by Workflow Name',
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])

  const data = useMemo(() => {
    return workflows.map((workflows) => {
      return {
        id: workflows.id,
        name: workflows.name,
        actions: [],
      }
    })
  }, [workflows])

  const keys = useMemo(() => {
    return [
      {
        key: 'name',
        label: 'Name',
      },
    ]
  }, [])

  const handleCardClick = useCallback((id: number) => {
    router.get(route('workflow.show', id))
  }, [])

  return (
    <ListResourcePage
      keys={keys}
      primaryKey='id'
      rows={data}
      title='Workflows'
      formItems={formItems}
      formData={formData}
      addUrl={route('workflow.create')}
      onCardClick={handleCardClick}
      searchUrl={route('workflow.index')}
    />
  )
}
export default WorkflowIndex
