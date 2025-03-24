import { Button } from '@/components/ui/button'

interface SingleSelectPillsProps {
  options: string[]
  value: string
  setValue: (val: string) => void
}

export function SingleSelectPills({ options, value, setValue }: SingleSelectPillsProps) {
  return (
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
  )
}
