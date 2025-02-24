import { EntityTemplate } from '@/Components/Interface/data_interface'
import { FormItem } from '@/FormBuilder/FormBuilder'
import FormPage from '@/FormBuilder/FormPage'
import useCustomForm from '@/hooks/useCustomForm'
import { useMemo } from 'react'

interface Props {
  entityTemplate?: EntityTemplate
}

export default function EntityTemplateCreate({ entityTemplate }: Readonly<Props>) {
  const { formData, setFormValue } = useCustomForm({
    step: entityTemplate?.step ?? '',
    name: entityTemplate?.name ?? '',
    description: entityTemplate?.description ?? '',
  })
  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      step: {
        type: 'text',
        label: 'Step',
        setValue: setFormValue('step'),
      },
      name: {
        type: 'text',
        label: 'Name',
        setValue: setFormValue('name'),
      },
      description: {
        type: 'textarea',
        label: 'Description',
        setValue: setFormValue('description'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])

  return (
    <FormPage
      isPatchRequest={entityTemplate != null}
      url={
        entityTemplate != null
          ? route('entity-templates.update', entityTemplate.id)
          : route('entity-templates.store')
      }
      formData={formData}
      formItems={formItems}
      title={entityTemplate != null ? 'Edit Workflow' : 'Create Workflow'}
      backUrl={
        entityTemplate != null
          ? route('entity-templates.show', entityTemplate.id)
          : route('entity-templates.index')
      }
      formStyles='w-1/2 md:grid-cols-1'
      type='settings'
      subtype='entity-templates'
      selectedHeading='configurations'
    />
  )
}
