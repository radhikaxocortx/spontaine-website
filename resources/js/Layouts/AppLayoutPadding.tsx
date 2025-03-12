import React from 'react'

interface Properties {
  children: React.ReactNode
}

const AppLayoutPadding = ({ children }: Properties) => {
  return (
    <div className='flex w-full max-w-7xl flex-col justify-center px-4 md:px-6 lg:px-20 xl:px-20 2xl:px-64'>
      {children}
    </div>
  )
}

export default AppLayoutPadding
