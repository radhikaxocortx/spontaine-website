import Navbar from '@/Layouts/Navbar/Navbar'
import { FooterDataInterface } from '@/Modules/FooterEditor/FooterEditor'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import React from 'react'
import Footer from './Footer/Footer'

interface Properties {
  children: React.ReactNode
}

const AppLayout = ({ children }: Properties) => {
  // Get footer data from Inertia shared props
  const { footer } = usePage<PageProps & { footer: { items: FooterDataInterface } }>().props

  return (
    <>
      <Navbar />
      <div className='relative min-h-screen w-full bg-white'>{children}</div>
      <Footer blockData={footer.items} />
    </>
  )
}

export default AppLayout
