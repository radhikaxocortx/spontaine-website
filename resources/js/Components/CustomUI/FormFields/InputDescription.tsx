import { getFormStyle } from '@/Components/CustomUI/FormFields/InputText'
import { Textarea } from '@/components/ui/textarea'
import ErrorText from '@/typography/ErrorText'
import NormalText from '@/typography/NormalText'
import { FormFieldProp } from '../../ui/ui_interfaces'

export default function InputDescription({
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
      <NormalText>{label}</NormalText>
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
