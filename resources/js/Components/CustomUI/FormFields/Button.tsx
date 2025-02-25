import { Button } from '@/components/ui/button'
import NormalText from '@/typography/NormalText'
import StrongText from '@/typography/StrongText'
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
          <NormalText>{label}</NormalText>
        </Link>
      )}
      {!processing && link == null && (
        <Button
          onClick={onClick}
          disabled={disabled}
          type={type}
          variant={variant}
        >
          <StrongText>{label}</StrongText>
        </Button>
      )}
      {/* {processing && <Spinner svgStyle={svgStyle} />} */}
    </>
  )
}
