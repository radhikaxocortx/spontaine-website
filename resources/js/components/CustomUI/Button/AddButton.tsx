import { router } from '@inertiajs/react'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import ButtonBorderIcon from './ButtonBorderIcon'

interface Props {
  link?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown
  buttonText?: string
  className?: string
}

export default function AddButton({ link, onClick, buttonText, className }: Props) {
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
      <div className='flex flex-col items-center'>
        <PlusIcon className='h-4 w-4' />
        {buttonText}
      </div>
    </ButtonBorderIcon>
  )
}
