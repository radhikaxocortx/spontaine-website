import React from 'react'

import { cn } from '@/lib/utils'

interface Properties {
  children: React.ReactNode
  className?: string
}

const AppLayoutPadding = ({ children, className }: Properties) => {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-[2000px] flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32',
        className
      )}
    >
      {children}
    </div>
  )
}

export default AppLayoutPadding
