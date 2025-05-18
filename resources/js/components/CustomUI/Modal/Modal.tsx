import { Button } from '@/components/ui/button'
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
}: Readonly<Properties>) {
  return (
    <Dialog
      open
      onOpenChange={setShowModal}
    >
      <DialogContent
        className={`mt-10 max-h-[90vh] overflow-y-auto ${large ? 'max-w-5xl' : 'max-w-lg'}`}
      >
        <DialogHeader className='pb-4'>
          {title && <DialogTitle>{title}</DialogTitle>}
          {showCloseButton && (
            <DialogClose asChild>
              <Button
                className='absolute right-4 top-4 rounded-full p-1 hover:bg-gray-200'
                onClick={() => setShowModal(false)}
              >
                <X className='h-5 w-5' />
              </Button>
            </DialogClose>
          )}
        </DialogHeader>
        <div className='overflow-y-auto'>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
