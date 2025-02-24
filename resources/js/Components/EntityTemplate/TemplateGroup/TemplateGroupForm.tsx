import { EntityTemplate } from '@/Components/Interface/data_interface'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { Dispatch, FormEvent, SetStateAction, useCallback, useMemo } from 'react'

interface Props {
  entityTemplate: EntityTemplate
  setShowForm: Dispatch<SetStateAction<boolean>>
}

export default function TemplateGroupForm({ entityTemplate, setShowForm }: Readonly<Props>) {
  const { formData, setFormValue } = useCustomForm({
    group_number: '',
    name: '',
    description: '',
    entity_template_id: entityTemplate.id,
  })

  const onComplete = useCallback(() => {
    setShowForm(false)
  }, [setShowForm])

  const { post, loading, errors } = useInertiaPost(route('entity-template-group.store'), {
    onComplete,
  })

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      group_number: {
        type: 'text',
        label: 'Group Number',
        setValue: setFormValue('group_number'),
      },
      name: {
        type: 'text',
        label: 'Group Name',
        setValue: setFormValue('name'),
      },
      description: {
        type: 'textarea',
        label: 'Description',
        setValue: setFormValue('description'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      post(formData)
    },
    [post, formData]
  )

  return (
    <FormBuilder
      formData={formData}
      onFormSubmit={onFormSubmit}
      formItems={formItems}
      loading={loading}
      errors={errors}
      buttonText='Add'
      formStyles='md:w-full md:grid-cols-1 p-2'
    />
  )
}
