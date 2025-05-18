import { showError, showSuccess } from '@/components/ui/alerts'
import { LaravelFlash } from '@/components/ui/ui_interfaces'
import { usePage } from '@inertiajs/react'
import { PropsWithChildren, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

export default function Guest({ children }: PropsWithChildren) {
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
    <div
      className='flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat pt-6 sm:justify-center sm:pt-0'
      style={{ backgroundImage: 'url(/imge/admin-login.jpeg)' }}
    >
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
      {/* <div>
        <Link href='/'>
          <ApplicationLogo className='h-20 w-20 fill-current text-gray-500' />
        </Link>
      </div> */}

      <div className='mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg'>
        {children}
      </div>
    </div>
  )
}
