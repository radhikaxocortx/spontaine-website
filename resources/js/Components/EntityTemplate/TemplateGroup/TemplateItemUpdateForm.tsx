import { WorkflowModuleItem } from '@/Components/Interface/data_interface'
import useInertiaPost from '@/hooks/useInertiaPost'
import { Dispatch, SetStateAction, useCallback } from 'react'
import TemplateItemForm from './TemplateItemForm'

interface Props {
  templateItem: WorkflowModuleItem
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function TemplateItemUpdateForm({ templateItem, setShowModal }: Readonly<Props>) {
  const onComplete = useCallback(() => {
    setShowModal(false)
  }, [setShowModal])

  const { post, errors, loading } = useInertiaPost(
    route('entity-template-item.update', templateItem.id),
    {
      onComplete,
    }
  )

  const onSubmit = useCallback(
    (data: Record<string, string | boolean | number>) => {
      post({
        _method: 'PUT',
        workflow_module_id: templateItem.workflow_module_id,
        ...data,
      })
    },
    [post, templateItem]
  )

  return (
    <TemplateItemForm
      errors={errors}
      loading={loading}
      onSubmit={onSubmit}
      item={templateItem}
    />
  )
}
