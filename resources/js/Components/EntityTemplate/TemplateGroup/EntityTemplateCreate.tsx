import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { Dispatch, FormEvent, SetStateAction, useCallback, useMemo } from 'react'

interface Props {
  workflowId: number
  setShowForm: Dispatch<SetStateAction<boolean>>
}

export default function EntityTemplateCreate({ workflowId, setShowForm }: Readonly<Props>) {
  const onComplete = useCallback(() => {
    setShowForm(false)
  }, [setShowForm])

  const { post, loading, errors } = useInertiaPost(route('entity-templates.store'), {
    onComplete,
  })
  const { formData, setFormValue } = useCustomForm({
    sequence: '',
    name: '',
    description: '',
    workflow_id: workflowId,
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
      step: {
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
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])
  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      console.log('formdata', formData)
      post(formData)
    },
    [post, formData]
  )
  console.log(formData)
  return (
    <FormBuilder
      // isPatchRequest={entityTemplate != null}
      // url={
      //   entityTemplate != null
      //     ? route('entity-templates.update', entityTemplate.id)
      //     : route('entity-templates.store')
      // }
      onFormSubmit={onFormSubmit}
      loading={loading}
      errors={errors}
      formData={formData}
      formItems={formItems}
      buttonText='Add'
      // title={entityTemplate != null ? 'Edit Workflow' : 'Create Workflow'}
      // backUrl={
      //   entityTemplate != null
      //     ? route('entity-templates.show', entityTemplate.id)
      //     : route('entity-templates.index')
      // }
      formStyles='w-1/2 md:grid-cols-1'
    />
  )
}
