import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import React from 'react'

interface Properties {
  children?: React.ReactNode
  setShowModal: (value: boolean) => unknown
  title?: string
  large?: boolean
  showCloseButton?: boolean
}

export default function Modal({
  children,
  setShowModal,
  title,
  large = false,
  showCloseButton = false,
}: Properties) {
  return (
    <Dialog
      open
      onOpenChange={setShowModal}
    >
      <DialogContent className={large ? 'max-w-2xl' : 'max-w-lg'}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {showCloseButton && (
            <DialogClose asChild>
              <button
                className='absolute right-4 top-4 rounded-full p-1 hover:bg-gray-200'
                onClick={() => setShowModal(false)}
              >
                <X className='h-5 w-5' />
              </button>
            </DialogClose>
          )}
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
