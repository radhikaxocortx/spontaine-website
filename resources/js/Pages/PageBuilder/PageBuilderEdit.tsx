import CardHeader from '@/Components/CustomUI/Card/CardHeader'
import DashboardPadding from '@/Layouts/DashboardLayout'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import PageEdit from '@/Modules/PageBuilder/Pages/PageEdit'
import Dashboard from '../Dashboard'

interface Props {
  page: Page
}

const PageBuilderEdit = ({ page }: Props) => {
  console.log(page)
  return (
    <Dashboard>
      <DashboardPadding>
        <CardHeader title='Edit Page Builder ' />
        <PageEdit page={page} />
      </DashboardPadding>
    </Dashboard>
  )
}
export default PageBuilderEdit
