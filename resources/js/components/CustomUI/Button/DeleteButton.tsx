import { router } from '@inertiajs/react'
import { Trash } from 'lucide-react'
import React from 'react'
import ButtonBorderIcon from './ButtonBorderIcon'

interface Props {
  link?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown
  className?: string
}

export default function DeleteButton({ link, onClick, className }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (link != null) {
      router.get(link)
      return
    }
    if (onClick != null) {
      onClick(event)
    }
  }

  return (
    <ButtonBorderIcon
      onClick={handleClick}
      className={className}
    >
      <Trash className='h-4 w-4' />
    </ButtonBorderIcon>
  )
}
