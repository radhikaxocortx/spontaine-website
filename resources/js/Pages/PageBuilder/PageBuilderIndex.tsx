import PageIndex, { PageBuilder } from '@/Modules/Pages/PageIndex'
interface Props {
  pages: PageBuilder[]
}

const PageBuilderIndex = ({ pages }: Props) => {
  return <PageIndex pages={pages} />
}
export default PageBuilderIndex
