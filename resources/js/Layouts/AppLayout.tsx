import Navbar from '@/Layouts/Navbar/Navbar'
import React from 'react'
import Footer from './Footer/Footer'

interface Properties {
  children: React.ReactNode
}

const AppLayout = ({ children }: Properties) => {
  return (
    <>
      <Navbar />
      <div className='relative min-h-screen w-full bg-white'>{children}</div>
      <Footer />
    </>
  )
}

export default AppLayout
