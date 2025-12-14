import MetaTags from '@/components/MetaTags'
import { showError, showSuccess } from '@/components/ui/alerts'
import { LaravelFlash } from '@/components/ui/ui_interfaces'
import ResolveComponent from '@/Modules/PageBuilder/Components/ResolveComponent'
import { PageBuilderProvider } from '@/Modules/PageBuilder/contexts/PageBuilderContext'
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
    <PageBuilderProvider renderMode='page'>
      <div className=''>
        {page.blocks.blocks.map((element, index) => {
          return (
            <Fragment key={element.id?.toString() ?? `block-${index}`}>
              <ResolveComponent
                key={element.id ?? index}
                blockName={element.blockName}
                block={element}
                language={'en'}
                dependencies={{}}
                currentDate=''
              />
            </Fragment>
          )
        })}
        <MetaTags
          title={page.page_title}
          description={page.description}
          image={page.preview_image}
          noIndex={false}
        />
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
    </PageBuilderProvider>
  )
}
