import { showError, showSuccess } from '@/components/ui/alerts'
import { LaravelFlash } from '@/components/ui/ui_interfaces'
import ResolveComponent from '@/Modules/PageBuilder/Components/ResolveComponent'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { usePage } from '@inertiajs/react'
import { Fragment, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

interface Props {
  page: Page
}

export default function ViewBuilder({ page }: Props) {
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
    <div className=''>
      {page.blocks.blocks.map((element) => {
        return (
          <Fragment key={element.id.toString()}>
            <ResolveComponent
              key={element.id}
              blockName={element.blockName}
              block={element}
              language={'en'}
              dependencies={{}}
              currentDate=''
            />
          </Fragment>
        )
      })}
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
    </div>
  )
}
