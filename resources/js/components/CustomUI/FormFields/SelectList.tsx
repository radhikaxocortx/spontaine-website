import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ErrorText from '@/typography/ErrorText'
import NormalText from '@/typography/NormalText'
import { useMemo } from 'react'

export interface Properties<
  K extends keyof T,
  G extends keyof T,
  T extends Record<K, number | string> & Record<G, number | string | null>,
> {
  label?: string
  type?: 'text' | 'email' | 'password' | 'number'
  value?: string | number
  error?: string
  styles?: string
  placeholder?: string
  setValue: (value: string) => unknown
  disabled?: boolean
  readonly?: boolean
  isDate?: boolean
  isTime?: boolean
  preventFormSubmit?: boolean
  style?: 'normal' | 'bottom-border' | 'dark'
  required?: boolean
  list: T[]
  dataKey: K
  displayKey: G
  showAllOption?: boolean
  allOptionText?: string
  showLabel?: boolean
  className?: string
}

const getStyle = (style: 'normal' | 'bottom-border' | 'dark') => {
  switch (style) {
    case 'normal': {
      return ` w-full appearance-none rounded-lg border border-gray-300 py-3 pl-3 text-sm text-gray-800
      shadow-sm focus:border-indigo-700 focus:outline-none disabled:bg-gray-100`
    }
    case 'bottom-border': {
      return `mt-0 block w-full border-0 border-b-2 border-gray-200 bg-neutral-50 px-0.5 bodybold text-sm focus:border-black focus:ring-0`
    }

    case 'dark': {
      return 'w-full appearance-none rounded border border-transparent bg-white py-3 pl-3 text-sm text-gray-800 focus:border-indigo-700  focus:outline-none dark:bg-gray-800 dark:text-gray-100'
    }
    default: {
      return ''
    }
  }
}

export default function SelectList<
  K extends keyof T,
  G extends keyof T,
  T extends Record<K, number | string> & Record<G, number | string | null>,
>({
  value,
  label,
  error,
  setValue,
  list,
  dataKey,
  displayKey,
  showAllOption = false,
  allOptionText,
  style = 'normal',
  disabled = false,
  showLabel = true,
  className,
}: Properties<K, G, T>) {
  const selectedOption = useMemo(() => {
    const index = list.findIndex((item) => {
      return item[dataKey] == value
    })
    return index === -1 ? '' : `${value}`
  }, [value, dataKey, list])

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {showLabel && label != null && (
        <NormalText className='text-sm font-medium'>{label}</NormalText>
      )}
      <Select
        onValueChange={setValue}
        value={selectedOption}
        disabled={disabled}
      >
        <SelectTrigger className={getStyle(style)}>
          <SelectValue placeholder={allOptionText || `Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {showAllOption && <SelectItem value='all'>{allOptionText}</SelectItem>}
          {!showAllOption && label && (
            <SelectItem
              value='none'
              disabled
            >
              Select {label}
            </SelectItem>
          )}
          {list.map((item) => (
            <SelectItem
              key={String(item[dataKey])}
              value={String(item[dataKey])}
            >
              {item[displayKey]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}
