import { WorkflowModule } from '@/components/Interface/data_interface'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { Dispatch, FormEvent, SetStateAction, useCallback, useMemo } from 'react'

interface Props {
  entityTemplate: WorkflowModule
  setShowForm: Dispatch<SetStateAction<boolean>>
}

export default function EntityTemplateUpdateForm({
  entityTemplate,

  setShowForm,
}: Readonly<Props>) {
  const onComplete = useCallback(() => {
    setShowForm(false)
  }, [setShowForm])

  const { post, loading, errors } = useInertiaPost(
    route('entity-templates.update', entityTemplate.id),
    {
      onComplete,
    }
  )
  const { formData, setFormValue } = useCustomForm({
    sequence: entityTemplate?.sequence ?? '',
    name: entityTemplate?.name ?? '',
    description: entityTemplate?.description ?? '',
    workflow_id: entityTemplate?.workflow_id,
    prev_button: entityTemplate?.prev_button ?? '',
    next_button: entityTemplate?.next_button ?? '',
  })
  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      workflow_id: {
        setValue: setFormValue('workflow_id'),
        hidden: true,
      },
      sequence: {
        type: 'text',
        label: 'Sequence Number',
        setValue: setFormValue('sequence'),
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
      prev_button: {
        type: 'text',
        label: 'Previous Button Label',
        setValue: setFormValue('prev_button'),
      },
      next_button: {
        type: 'text',
        label: 'Next Button Label',
        setValue: setFormValue('next_button'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])
  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      post({
        ...formData,
        _method: 'PATCH',
      })
    },
    [post, formData]
  )

  return (
    <FormBuilder
      onFormSubmit={onFormSubmit}
      loading={loading}
      errors={errors}
      formData={formData}
      formItems={formItems}
      buttonText='Add'
      formStyles='w-1/2 md:grid-cols-1'
    />
  )
}
