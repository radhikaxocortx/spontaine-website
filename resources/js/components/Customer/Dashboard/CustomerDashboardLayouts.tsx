import { showError, showSuccess } from '@/components/ui/alerts'
import { LaravelFlash } from '@/components/ui/ui_interfaces'
import AppLayout from '@/Layouts/AppLayout'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
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
      <AppLayout>
        <AppLayoutPadding>
          <main>{children}</main>
        </AppLayoutPadding>
      </AppLayout>
    </div>
  )
}
