import React from 'react'

interface Properties {
  children: React.ReactNode
}

const AppLayoutPadding = ({ children }: Properties) => {
  return (
    <div className='mx-auto flex w-full max-w-[2000px] flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32'>
      {children}
    </div>
  )
}

export default AppLayoutPadding
