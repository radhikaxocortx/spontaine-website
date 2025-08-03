import React from 'react'

interface Properties {
  children: React.ReactNode
  className?: string
}

const AppSectionPadding = ({ children, className = '' }: Properties) => {
  return (
    <div className={`flex min-h-screen items-center py-4 md:py-10 lg:py-16 xl:py-10 ${className}`}>
      {children}
    </div>
  )
}

export default AppSectionPadding
