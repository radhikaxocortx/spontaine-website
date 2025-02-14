import Sidebar from '@/Layouts/Sidebar'
import { PropsWithChildren, ReactNode } from 'react'

export default function Dashboard({ children }: PropsWithChildren<{ header?: ReactNode }>) {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
