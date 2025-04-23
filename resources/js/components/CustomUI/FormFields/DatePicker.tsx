import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import NormalText from '@/typography/NormalText'
import { format } from 'date-fns'
import { useState } from 'react'
import { FormFieldProp } from '../../ui/ui_interfaces'

interface DatePickerProp extends FormFieldProp {
  min?: Date
  max?: Date
}

export default function DatePicker({
  label,
  value,
  error,
  setValue,
  placeholder = 'Select date',
  min,
  max,
  disabled = false,
}: DatePickerProp) {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col gap-2'>
      <NormalText>{label}</NormalText>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-full justify-start text-left'
            disabled={disabled}
          >
            <NormalText>{value ? format(new Date(value), 'yyyy-MM-dd') : placeholder}</NormalText>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          className='w-auto p-0'
        >
          <Calendar
            mode='single'
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => {
              if (date) {
                setValue(format(date, 'yyyy-MM-dd'))
                setOpen(false)
              }
            }}
            fromDate={min}
            toDate={max}
          />
        </PopoverContent>
      </Popover>
      {error && <div className='text-sm text-red-500'>{error}</div>}
    </div>
  )
}
