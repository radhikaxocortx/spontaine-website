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
  className?: string
}

export default function ActionButton({
  label,
  onClick,
  variant = 'default',
  processing = false,
  disabled = false,
  type = 'submit',
  className,
  link,
}: Properties) {
  return (
    <>
      {link != null && processing != null && (
        <Link
          href={link}
          as='a'
          className={className}
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
          className={className}
        >
          <StrongText>{label}</StrongText>
        </Button>
      )}
      {/* {processing && <Spinner svgStyle={svgStyle} />} */}
    </>
  )
}
