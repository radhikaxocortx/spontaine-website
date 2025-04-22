import { showError, showSuccess } from '@/Components/ui/alerts'
import { LaravelFlash } from '@/Components/ui/ui_interfaces'
import CustomerSidebar from '@/Layouts/CustomerSidebar'
import { usePage } from '@inertiajs/react'
import { PropsWithChildren, ReactNode, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

export default function CustomerDashboardLayout({
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const { flash } = usePage().props as unknown as { flash?: LaravelFlash }
  useEffect(() => {
    if (flash?.error != null) {
      showError(flash.error)
    }
    if (flash?.message != null) {
      showSuccess(flash.message)
    }
  }, [flash])
  return (
    <div className='min-h-screen bg-beige-50'>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        toastClassName='toast-container'
      />
      <CustomerSidebar />
      <main>{children}</main>
    </div>
  )
}
