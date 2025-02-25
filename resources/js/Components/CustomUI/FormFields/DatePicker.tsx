import { Input } from '@/components/ui/input'
import NormalText from '@/typography/NormalText'
import { FormFieldProp } from '../../ui/ui_interfaces'

interface DatePickerProp extends FormFieldProp {
  min?: string
  max?: string
}

export default function DatePicker({
  label,
  value,
  error,
  setValue,
  placeholder,
  min,
  max,
  disabled = false,
}: DatePickerProp) {
  return (
    <>
      <NormalText>{label}</NormalText>
      <Input
        type='date'
        value={value}
        min={min}
        max={max}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className='rounded border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-800 shadow-sm focus:border-indigo-700 focus:outline-none disabled:bg-gray-100'
        disabled={disabled}
      />
      {error && <div className='error-text'>{error}</div>}
    </>
  )
}
