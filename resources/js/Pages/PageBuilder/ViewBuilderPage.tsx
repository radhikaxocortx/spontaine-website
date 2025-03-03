import ViewBuilder from '@/Modules/PageBuilder/Pages/ViewBuilder'
import { Page } from '@/Modules/PageBuilder/page_interfaces'

interface Props {
  page: Page
}

export default function ViewBuilderPage({ page }: Props) {
  return <ViewBuilder page={page} />
}
