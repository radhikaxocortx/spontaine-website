import { EntityTemplate } from '@/Components/Interface/data_interface'
import ListResourcePage, { ListItemKeys } from '@/Components/ListingPage/ListResourcePage'
import { Paginator } from '@/Components/ui/ui_interfaces'
import { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'

import { router } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'

interface Props {
  entityTemplates: Paginator<EntityTemplate>
}

interface FormFields {
  search: string
}

export default function EntityTemplateIndex({ entityTemplates }: Readonly<Props>) {
  //holds data
  const { formData, setFormValue } = useCustomForm<FormFields>({
    search: '',
  })

  //input elements list
  const formItems = useMemo(() => {
    return {
      search: {
        label: 'Search',
        type: 'text',
        setValue: setFormValue('search'),
      } as FormItem<string, never, never, never>,
    }
  }, [setFormValue])

  // keys(table col titles) for the table
  const keys = useMemo(() => {
    return [
      {
        key: 'name',
        label: 'Name',
        hideLabel: true,
        isCardHeader: true,
      },
    ] as ListItemKeys<Partial<EntityTemplate>>[]
  }, [])

  //table data
  const data = useMemo(() => {
    return entityTemplates.data.map((record) => {
      return {
        id: record.id,
        name: record.name,
        actions: [],
      }
    })
  }, [entityTemplates])

  const openTemplate = useCallback((id: number | string) => {
    router.get(route('entity-templates.show', id))
  }, [])

  return (
    <ListResourcePage
      title='Workflow'
      keys={keys}
      primaryKey={'id'}
      rows={data}
      formData={formData}
      formItems={formItems}
      addUrl={route('entity-templates.create')}
      searchUrl={route('entity-templates.index')}
      paginator={entityTemplates}
      onCardClick={openTemplate}
    />
  )
}
