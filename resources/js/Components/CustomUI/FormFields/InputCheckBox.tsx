import { Checkbox } from '@/components/ui/checkbox'
import ErrorText from '@/typography/ErrorText'
import NormalText from '@/typography/NormalText'
import { CheckboxProp } from '../../ui/ui_interfaces'

export default function InputCheckBox({
  label,
  value,
  toggleValue,
  disabled = false,
  error,
}: CheckboxProp) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-2 text-sm'>
        <Checkbox
          checked={value}
          onCheckedChange={toggleValue}
          disabled={disabled}
        />
        <NormalText>{label}</NormalText>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}
