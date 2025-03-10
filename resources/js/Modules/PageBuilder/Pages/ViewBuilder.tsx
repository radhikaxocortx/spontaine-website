import ResolveComponent from '@/Modules/PageBuilder/Components/ResolveComponent'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { Fragment } from 'react'

interface Props {
  page: Page
}

export default function ViewBuilder({ page }: Props) {
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
    </div>
  )
}
