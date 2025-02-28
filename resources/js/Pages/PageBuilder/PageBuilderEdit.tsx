import CardHeader from '@/Components/CustomUI/Card/CardHeader'
import DashboardPadding from '@/Layouts/DashboardLayout'
import PageEdit from '@/Modules/Pages/PageEdit'
import { PageBuilder } from '@/Modules/Pages/PageIndex'
import Dashboard from '../Dashboard'

interface Props {
  page: PageBuilder
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
