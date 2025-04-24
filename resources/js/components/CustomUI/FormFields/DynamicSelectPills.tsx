import useFetchList from '@/hooks/useFetchList'
import { MultiSelectPills } from './MultipleSelectPills'
import { SingleSelectPills } from './SingleSelectPills'

interface Props {
  type: 'single' | 'multi'
  fetchUrl: string
  value: string | string[]
  label?: string
  setValue: (val: string | string[]) => void
}

type OptionItem = {
  value_one: string
  [key: string]: any
}

const DynamicSelectPills = ({ type, fetchUrl, value, setValue, label }: Props) => {
  const [list] = useFetchList<OptionItem>(fetchUrl)
  const options = list?.map((item) => item.value_one).filter(Boolean) || []

  return type === 'single' ? (
    <SingleSelectPills
      options={options}
      value={value as string}
      label={label}
      setValue={setValue as (val: string) => void}
    />
  ) : (
    <MultiSelectPills
      options={options}
      label={label}
      values={value as string[]}
      setValues={setValue as (val: string[]) => void}
    />
  )
}

export default DynamicSelectPills
