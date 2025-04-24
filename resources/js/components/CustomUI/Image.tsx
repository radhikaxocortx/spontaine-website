import { cn } from '@/utils'
import React from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

export default function Image({ className, src, alt, ...props }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('', className)}
      {...props}
    />
  )
}
