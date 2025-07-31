import React from 'react'

interface Properties {
  children: React.ReactNode
  className?: string
}

const AppSectionPadding = ({ children, className = '' }: Properties) => {
  return <div className={`py-12 ${className}`}>{children}</div>
}

export default AppSectionPadding
