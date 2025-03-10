import React from 'react'
import Navbar from './NavBar'

interface Properties {
  children: React.ReactNode
}

const AppLayout = ({ children }: Properties) => {
  return (
    <>
      <Navbar />
      <div className='relative min-h-screen w-full bg-white'>{children}</div>
    </>
  )
}

export default AppLayout
