import { Button } from '@/components/ui/button'
import StrongText from '@/typography/StrongText'

interface MultiSelectPillsProps {
  options: string[]
  values: string[]
  setValues: (val: string[]) => void
  label?: string
}

export function MultiSelectPills({ options, values, setValues, label }: MultiSelectPillsProps) {
  const toggleValue = (option: string) => {
    if (values.includes(option)) {
      setValues(values.filter((v) => v !== option))
    } else {
      setValues([...values, option])
    }
  }

  return (
    <>
      <div className='mb-2'>
        <StrongText>{label}</StrongText>
      </div>
      <div className='flex flex-wrap gap-2'>
        {options.map((option) => (
          <Button
            key={option}
            variant={values.includes(option) ? 'secondary' : 'ghost'}
            className={`rounded-full border px-4 py-1 ${
              values.includes(option) ? '' : 'border-muted'
            }`}
            onClick={() => toggleValue(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </>
  )
}
