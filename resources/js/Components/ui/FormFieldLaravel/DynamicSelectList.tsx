import useFetchList from '@/hooks/useFetchList'
import { FormFieldProp } from '../ui_interfaces'
import SelectList from './SelectList'

interface Props<
  K extends keyof T,
  G extends keyof T,
  T extends Record<string, string | number> & Record<string, string | number | null>,
> extends FormFieldProp {
  url: string
  dataKey: K
  displayKey: G
  showAllOption?: boolean
  allOptionText?: string
  showLabel?: boolean
}

export default function DynamicSelectList<
  K extends keyof T,
  G extends keyof T,
  T extends Record<string, string | number> & Record<string, string | number | null>,
>({
  value,
  label,
  error,
  setValue,
  url,
  dataKey,
  displayKey,
  showAllOption = false,
  allOptionText,
  style,
  disabled,
  showLabel,
}: Props<K, G, T>) {
  const [list] = useFetchList<T>(url)

  return (
    <SelectList
      list={list}
      dataKey={dataKey}
      displayKey={displayKey}
      setValue={setValue}
      value={value}
      label={label}
      showLabel={showLabel}
      showAllOption={showAllOption}
      allOptionText={allOptionText}
      disabled={disabled}
      style={style}
      error={error}
    />
  )
}
