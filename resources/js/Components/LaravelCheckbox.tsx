import { Input } from '@/components/ui/input'
import { InputHTMLAttributes } from 'react'

export default function LaravelCheckbox({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      {...props}
      type='checkbox'
      className={
        'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' + className
      }
    />
  )
}
