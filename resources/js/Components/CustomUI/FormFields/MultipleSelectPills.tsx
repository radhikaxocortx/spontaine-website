import { Button } from '@/components/ui/button'

interface MultiSelectPillsProps {
  options: string[]
  values: string[]
  setValues: (val: string[]) => void
}

export function MultiSelectPills({ options, values, setValues }: MultiSelectPillsProps) {
  const toggleValue = (option: string) => {
    if (values.includes(option)) {
      setValues(values.filter((v) => v !== option))
    } else {
      setValues([...values, option])
    }
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {options.map((option) => (
        <Button
          key={option}
          variant={values.includes(option) ? 'outline' : 'ghost'}
          className={`rounded-full border px-4 py-1 ${
            values.includes(option) ? '' : 'border-muted'
          }`}
          onClick={() => toggleValue(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  )
}
