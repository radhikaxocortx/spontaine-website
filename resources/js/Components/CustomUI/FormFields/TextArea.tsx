import { Textarea } from '@/components/ui/textarea'
import ErrorText from '@/typography/ErrorText'
import { FormFieldProp } from '../../ui/ui_interfaces'
import { getFormStyle } from './TextInput'

export default function TextArea({
  label,
  value,
  error,
  setValue,
  placeholder,
  disabled,
  style = 'normal',
}: FormFieldProp) {
  return (
    <>
      <label className='mb-1 text-sm tracking-normal text-gray-800'>{label}</label>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        name='description'
        disabled={disabled}
        className={getFormStyle(style)}
      ></Textarea>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  )
}
