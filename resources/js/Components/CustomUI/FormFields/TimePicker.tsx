import { Input } from '@/components/ui/input'
import NormalText from '@/typography/NormalText'
import { FormFieldProp } from '../../ui/ui_interfaces'

export default function TimePicker({
  label,
  value,
  error,
  setValue,
  placeholder,
  disabled = false,
  readonly = false,
}: FormFieldProp) {
  return (
    <>
      <NormalText>{label}</NormalText>
      <Input
        type='time'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className='rounded-lg border border-gray-300 bg-accent-light py-3 pl-3 text-sm text-gray-800 shadow-sm focus:border-indigo-700 focus:outline-none disabled:bg-gray-100'
        disabled={disabled}
        readOnly={readonly}
      />
      {error && <div className='error-text'>{error}</div>}
    </>
  )
}
