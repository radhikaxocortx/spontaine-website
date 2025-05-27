import DatePicker from '@/components/CustomUI/FormFields/DatePicker'
import DynamicSelectList from '@/components/CustomUI/FormFields/DynamicSelectList'
import DynamicSelectPills from '@/components/CustomUI/FormFields/DynamicSelectPills'
import FileInput from '@/components/CustomUI/FormFields/FileInput'
import InputDescription from '@/components/CustomUI/FormFields/InputDescription'
import InputText from '@/components/CustomUI/FormFields/InputText'
import { PhoneInput } from '@/components/CustomUI/FormFields/PhoneInput'
import { WorflowFormItem } from '@/components/Interface/data_interface'
import { Checkbox } from '@/components/ui/checkbox'
import NormalText from '@/typography/NormalText'

interface Props {
  updateTextValue: (entityItemId: number, value: string) => void
  updateFileValue: (entityItemId: number, value: File | null) => void
  item: WorflowFormItem
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
          placeholder={item.placeholder ?? ''}
          value={item.value}
        />
      )}
      {item.type === 'checkbox' && (
        <div className='flex p-2'>
          <Checkbox
            onCheckedChange={(val) => updateTextValue(item.id, val ? 'true' : 'false')}
            checked={item.value === 'true'}
          />
          <NormalText className='pl-2'>{item.field_name}</NormalText>
        </div>
      )}
      {(item.type === 'text' || item.type === 'number') && (
        <InputText
          setValue={(value) => updateTextValue(item.id, value)}
          value={item.value}
          label={item.field_name}
          placeholder={item.placeholder ?? ''}
        />
      )}
      {item.type === 'long_text' && (
        <InputDescription
          setValue={(value) => updateTextValue(item.id, value)}
          label={item.field_name}
          value={item.value}
          placeholder={item.placeholder ?? ''}
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
          placeholder={item.placeholder ?? ''}
        />
      )}
      {(item.type === 'pdf' || item.type === 'word_document' || item.type === 'image') && (
        <div className='space-y-2'>
          {item.value && (
            <p className='text-sm'>
              Old file:{' '}
              <a
                href={route('file-download', { path: item.value })}
                className='text-blue-600 underline'
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
            placeholder={item.placeholder ?? ''}
          />
          {item.file && (
            <div className='flex items-center gap-2 text-sm text-gray-700'>
              <span>
                <strong>{item.file.name}</strong>
              </span>
              <button
                type='button'
                className='text-red-500'
                onClick={() => updateFileValue(item.id, null)}
              >
                x
              </button>
            </div>
          )}
        </div>
      )}

      {item.type === 'single_list_pills' && (
        <DynamicSelectPills
          type='single'
          fetchUrl={route('unique-ref-data-values', {
            domain: item.domain,
            parameter: item.parameter,
          })}
          value={item.value || ''}
          label={item.field_name}
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
          label={item.field_name}
          setValue={(val) => updateTextValue(item.id, val)}
        />
      )}
    </div>
  )
}
