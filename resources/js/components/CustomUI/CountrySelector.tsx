import Image from '@/components/CustomUI/Image'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/utils'
import React from 'react'

// List of African countries with their flags
const africanCountries = [
  {
    code: 'GH',
    name: 'Ghana',
    flag: '/images/flags/gh.svg',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '/images/flags/ng.svg',
  },
  {
    code: 'KE',
    name: 'Kenya',
    flag: '/images/flags/ke.svg',
  },

  {
    code: 'ZA',
    name: 'South Africa',
    flag: '/images/flags/za.svg',
  },
  {
    code: 'EG',
    name: 'Egypt',
    flag: '/images/flags/eg.svg',
  },
  {
    code: 'ET',
    name: 'Ethiopia',
    flag: '/images/flags/et.svg',
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    flag: '/images/flags/tz.svg',
  },
  {
    code: 'UG',
    name: 'Uganda',
    flag: '/images/flags/ug.svg',
  },
  {
    code: 'RW',
    name: 'Rwanda',
    flag: '/images/flags/rw.svg',
  },
  // Add more African countries as needed
]

interface CountrySelectorProps {
  className?: string
}

export default function CountrySelector({ className }: CountrySelectorProps) {
  const [selectedCountry, setSelectedCountry] = React.useState(africanCountries[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className={cn('flex h-9 w-9 items-center justify-center rounded-full p-0', className)}
        >
          <Image
            src={selectedCountry.flag}
            alt={`${selectedCountry.name} flag`}
            className='h-9 w-9 rounded-full object-cover'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[200px]'
      >
        {africanCountries.map((country) => (
          <DropdownMenuItem
            key={country.code}
            onClick={() => setSelectedCountry(country)}
            className='cursor-pointer'
          >
            <Image
              src={country.flag}
              alt={`${country.name} flag`}
              className='mr-2 h-5 w-5 rounded-full object-cover'
            />
            <span className='text-sm'>{country.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
