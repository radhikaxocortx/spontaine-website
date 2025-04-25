import { WorkflowItem, WorkflowModule } from '@/components/Interface/data_interface'
import InfoGroupForm from '@/components/WorkflowModule/TemplateGroup/InfoGroupForm'
import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

interface Props {
  customerPriceplanId: number
  workflowModule: WorkflowModule
  additionalInfo: WorkflowItem[]
  setShowForm: Dispatch<SetStateAction<boolean>>
}

const ModuleEdit = ({
  customerPriceplanId,
  workflowModule,
  additionalInfo,
  setShowForm,
}: Props) => {
  const moduleItems = workflowModule.workflow_items ?? []

  const [formData, setFormValue] = useState(() => {
    return moduleItems.map((item) => {
      const matchedValues = additionalInfo.filter((info) => info.workflow_item_id === item.id)

      let value: string[] | string = ''
      if (item.type === 'multi_list_pills') {
        value = matchedValues.flatMap((info) =>
          Array.isArray(info.value) ? info.value : [info.value]
        )
      } else {
        value = matchedValues[0]?.value ?? ''
      }

      return {
        ...item,
        value,
        file: null,
      }
    })
  })

  const updateTextValue = useCallback((id: number, text: string) => {
    setFormValue((prev) => prev.map((item) => (item.id === id ? { ...item, value: text } : item)))
  }, [])

  const updateFileValue = useCallback((id: number, file: File | null) => {
    setFormValue((prev) => prev.map((item) => (item.id === id ? { ...item, file } : item)))
  }, [])

  const customFormData = useMemo(() => {
    return {
      customerPriceplanId: customerPriceplanId,
      additionalInfo: formData.map((item) => ({
        workflow_item_id: item.id,
        type: item.type,
        value: item.value,
        file: item.file,
      })),
    }
  }, [formData, customerPriceplanId])
  const handleSubmit = () => {
    router.post(route('customer-workflow-update'), customFormData, {
      onSuccess: () => setShowForm(false),
    })
  }

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-muted-foreground text-sm'>{workflowModule.description}</p>

      <div className='my-4 space-y-4'>
        {formData
          .sort((a, b) => a.field_number - b.field_number)
          .map((item) => (
            <InfoGroupForm
              key={item.id}
              item={item}
              updateTextValue={updateTextValue}
              updateFileValue={updateFileValue}
            />
          ))}
      </div>

      <div className='flex justify-end'>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default ModuleEdit
