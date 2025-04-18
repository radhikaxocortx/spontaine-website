import { Dispatch, SetStateAction, useCallback } from 'react'
import { WorflowFormItem, WorkflowModule } from '../Interface/data_interface'
import InfoGroupForm from './TemplateGroup/InfoGroupForm'

interface Props {
  additionalInfo: WorflowFormItem[]
  setAdditionalInfo: Dispatch<SetStateAction<WorflowFormItem[]>>
  module: WorkflowModule
}

export default function WorkflowModuleInfoForm({
  additionalInfo,
  module,
  setAdditionalInfo,
}: Readonly<Props>) {
  const updateTextValue = useCallback(
    (id: number, text: string) => {
      setAdditionalInfo((prev) =>
        prev.map((item) => (item.id === id ? { ...item, value: text } : item))
      )
    },
    [setAdditionalInfo]
  )

  const updateFileValue = useCallback(
    (id: number, file: File | null) => {
      setAdditionalInfo((prev) => prev.map((item) => (item.id === id ? { ...item, file } : item)))
    },
    [setAdditionalInfo]
  )

  return (
    <div className='my-5 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-1'>
      {additionalInfo
        .filter((item) => item.workflow_module_id === module.id)
        .sort((a, b) => a.field_number - b.field_number)
        .map((item) => (
          <InfoGroupForm
            updateTextValue={updateTextValue}
            updateFileValue={updateFileValue}
            item={item}
            key={item.id}
          />
        ))}
    </div>
  )
}
