import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import ErrorText from '@/typography/ErrorText'
import NormalText from '@/typography/NormalText'
import { cn } from '@/utils'

interface Properties<
  K extends keyof T,
  G extends keyof T,
  T extends Record<K, string | number> & Record<G, string | number | null>,
> {
  label?: string
  value?: string | number
  error?: string
  disabled?: boolean
  setValue: (value: string) => unknown
  list: T[]
  dataKey: K
  displayKey: G
  showLabel?: boolean
}

export default function RadioButton<
  K extends keyof T,
  G extends keyof T,
  T extends Record<K, string | number> & Record<G, string | number | null>,
>({
  label,
  value,
  error,
  disabled = false,
  setValue,
  list,
  dataKey,
  displayKey,
  showLabel = true,
}: Properties<K, G, T>) {
  return (
    <div className='flex flex-col gap-2'>
      {label != null && showLabel && <NormalText className='font-medium'>{label}</NormalText>}
      <RadioGroup
        value={value != null ? String(value) : ''}
        onValueChange={(val) => setValue(val)}
        className='flex flex-col gap-2'
        disabled={disabled}
      >
        {list.map((item) => (
          <div
            key={String(item[dataKey])}
            className='flex items-center gap-2'
          >
            <RadioGroupItem
              value={String(item[dataKey])}
              id={String(item[dataKey])}
              disabled={disabled}
            />
            <label
              htmlFor={String(item[dataKey])}
              className={cn('text-sm', disabled && 'opacity-50')}
            >
              {item[displayKey]}
            </label>
          </div>
        ))}
      </RadioGroup>
      {error != null && <ErrorText>{error}</ErrorText>}
    </div>
  )
}
