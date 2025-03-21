import DatePicker from '@/Components/CustomUI/FormFields/DatePicker'
import DynamicSelectList from '@/Components/CustomUI/FormFields/DynamicSelectList'
import DynamicSelectPills from '@/Components/CustomUI/FormFields/DynamicSelectPills'
import FileInput from '@/Components/CustomUI/FormFields/FileInput'
import InputDescription from '@/Components/CustomUI/FormFields/InputDescription'
import { PhoneInput } from '@/Components/CustomUI/FormFields/PhoneInput'
import { EntityTemplateFormItem } from '@/Components/Interface/data_interface'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import NormalText from '@/typography/NormalText'

interface Props {
  updateTextValue: (entityItemId: number, value: string) => void
  updateFileValue: (entityItemId: number, value: File | null) => void
  item: EntityTemplateFormItem
}

export default function InfoGroupForm({ updateTextValue, updateFileValue, item }: Readonly<Props>) {
  const fileInputLabel = (itemType: string) => {
    switch (itemType) {
      case 'pdf':
        return '(PDF)'
      case 'word_document':
        return '(Word document)'
      default:
        return ''
    }
  }
  const findFileType = (type: string): string => {
    if (type === 'pdf') return 'application/pdf'
    if (type === 'word_document')
      return '.doc,.docx,.rtf,.odt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    if (type === 'image') return 'image/*'
    return ''
  }

  return (
    <div
      className='flex flex-col'
      key={item.id}
    >
      {item.type === 'date' && (
        <DatePicker
          setValue={(value) => updateTextValue(item.id, value)}
          label={item.field_name}
          value={item.value}
        />
      )}
      {item.type === 'checkbox' && (
        <div className='flexs'>
          <Checkbox
            onCheckedChange={(val) => updateTextValue(item.id, val ? 'true' : 'false')}
            checked={item.value === 'true'}
          />
          <NormalText>{item.field_name}</NormalText>
        </div>
      )}
      {(item.type === 'text' || item.type === 'number') && (
        <Input
          setValue={(value) => updateTextValue(item.id, value)}
          value={item.value}
          label={item.field_name}
        />
      )}
      {item.type === 'long_text' && (
        <InputDescription
          setValue={(value) => updateTextValue(item.id, value)}
          label={item.field_name}
          value={item.value}
        />
      )}
      {item.type === 'phone_number' && (
        <PhoneInput
          value={item.value || ''}
          onChange={(val) => updateTextValue(item.id, val || '')}
          label={item.field_name}
        />
      )}
      {item.type === 'dropdown' && (
        <DynamicSelectList
          url={route('unique-ref-data-values', {
            domain: item.domain,
            parameter: item.parameter,
          })}
          dataKey='value_one'
          displayKey='value_one'
          setValue={(value) => updateTextValue(item.id, value)}
          label={item.field_name}
          showAllOption
          allOptionText={`Select ${item.field_name}`}
          value={item.value}
        />
      )}
      {(item.type === 'pdf' || item.type === 'word_document' || item.type === 'image') && (
        <>
          {item.value != null && item.value != '' && (
            <p className='text-sm'>
              old file:
              <a
                href={route('file-download', {
                  path: item.value,
                })}
                className='link'
                target='_blank'
                rel='noreferrer'
              >
                View
              </a>
            </p>
          )}
          <FileInput
            setValue={(file) => updateFileValue(item.id, file)}
            label={`${item.field_name} ${fileInputLabel(item.type)}`}
            accept={findFileType(item.type)}
          />
        </>
      )}
      {item.type === 'single_list_pills' && (
        <DynamicSelectPills
          type='single'
          fetchUrl={route('unique-ref-data-values', {
            domain: item.domain,
            parameter: item.parameter,
          })}
          value={item.value || ''}
          setValue={(val) => updateTextValue(item.id, val)}
        />
      )}

      {item.type === 'multi_list_pills' && (
        <DynamicSelectPills
          type='multi'
          fetchUrl={route('unique-ref-data-values', {
            domain: item.domain,
            parameter: item.parameter,
          })}
          value={item.value || []}
          setValue={(val) => updateTextValue(item.id, val)}
        />
      )}
    </div>
  )
}
