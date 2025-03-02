import PageIndex from '@/Modules/PageBuilder/Pages/PageIndex'
import { Page } from '@/Modules/PageBuilder/page_interfaces'

interface Props {
  pages: Page[]
}

const PageBuilderIndex = ({ pages }: Props) => {
  return <PageIndex pages={pages} />
}
export default PageBuilderIndex
