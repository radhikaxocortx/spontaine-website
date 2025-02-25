import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import React from 'react'

interface Properties {
  label: string
  onClick?: (e: React.FormEvent<HTMLButtonElement>) => void
  variant?: 'link' | 'secondary' | 'default' | 'destructive' | 'outline' | 'ghost' | null
  processing?: boolean
  disabled?: boolean
  link?: string
  type?: 'reset' | 'submit' | 'button'
}

export default function NormalButton({
  label,
  onClick,
  variant = 'default',
  processing = false,
  disabled = false,
  type = 'submit',

  link,
}: Properties) {
  return (
    <>
      {link != null && processing != null && (
        <Link
          href={link}
          as='a'
        >
          {label}
        </Link>
      )}
      {!processing && link == null && (
        <Button
          onClick={onClick}
          disabled={disabled}
          type={type}
          variant={variant}
        >
          {label}
        </Button>
      )}
      {/* {processing && <Spinner svgStyle={svgStyle} />} */}
    </>
  )
}
