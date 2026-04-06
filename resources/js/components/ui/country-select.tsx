import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getCountries } from 'react-phone-number-input'
import en from 'react-phone-number-input/locale/en'

interface CountryOption {
  code: string
  name: string
}

interface CountrySelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const countryOptions: CountryOption[] = getCountries()
  .map((code) => ({
    code,
    name: (en as Record<string, string>)[code] ?? code,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

const CountrySelect = ({ value, onChange, placeholder = 'Select country' }: CountrySelectProps) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)

  const selectedCountry = useMemo(() => {
    return countryOptions.find((country) => country.code === value) ?? null
  }, [value])

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (normalizedQuery === '') {
      return countryOptions
    }

    return countryOptions.filter((country) => {
      return (
        country.name.toLowerCase().includes(normalizedQuery) ||
        country.code.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [query])

  useEffect(() => {
    if (listRef.current == null) {
      return
    }

    listRef.current.scrollTop = 0
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
    }
  }, [open])

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='h-9 w-full justify-between rounded-md border-neutral-200 px-3 py-1 text-left text-sm font-normal'
        >
          <span className={cn('truncate', selectedCountry == null && 'text-xs text-neutral-500')}>
            {selectedCountry?.name ?? placeholder}
          </span>
          <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            className='placeholder:text-xs'
            placeholder='Search country...'
            value={query}
            onValueChange={setQuery}
          />
          <CommandList ref={listRef}>
            <CommandEmpty>No country found.</CommandEmpty>
            {filteredCountries.map((country) => (
              <CommandItem
                key={country.code}
                value={`${country.name} ${country.code}`}
                onSelect={() => {
                  onChange(country.code)
                  setQuery('')
                  setOpen(false)
                }}
              >
                <Check
                  className={cn('h-4 w-4', value === country.code ? 'opacity-100' : 'opacity-0')}
                />
                <span>{country.name}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CountrySelect
