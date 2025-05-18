import { router } from '@inertiajs/react'
import { Pencil } from 'lucide-react'
import React from 'react'
import ButtonBorderIcon from './ButtonBorderIcon'

interface Props {
  link?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown
  className?: string
}

export default function EditButton({ link, onClick, className }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (link != null) {
      router.get(link)
      return
    }
    if (onClick != null) {
      onClick(e)
    }
  }

  return (
    <ButtonBorderIcon
      onClick={handleClick}
      className={className}
    >
      <Pencil className='h-4 w-4' />
    </ButtonBorderIcon>
  )
}
