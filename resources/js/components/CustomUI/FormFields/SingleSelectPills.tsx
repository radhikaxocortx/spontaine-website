import { Button } from '@/components/ui/button'
import StrongText from '@/typography/StrongText'

interface SingleSelectPillsProps {
  options: string[]
  value: string
  label?: string
  setValue: (val: string) => void
}

export function SingleSelectPills({ options, value, setValue, label }: SingleSelectPillsProps) {
  return (
    <>
      <StrongText className='mb-2'>{label}</StrongText>
      <div className='flex flex-wrap gap-2'>
        {options.map((option) => (
          <Button
            key={option}
            variant={value === option ? 'outline' : 'ghost'}
            className={`rounded-full border px-4 py-1 ${value === option ? '' : 'border-muted'}`}
            onClick={() => setValue(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </>
  )
}
