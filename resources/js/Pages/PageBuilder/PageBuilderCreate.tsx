import CardHeader from '@/Components/CustomUI/Card/CardHeader'
import DashboardPadding from '@/Layouts/DashboardLayout'
import PageCreate from '@/Modules/PageBuilder/Pages/PageCreate'
import Dashboard from '../Dashboard'

export default function PageBuilderCreate() {
  return (
    <Dashboard>
      <DashboardPadding>
        <CardHeader title='Create Pages ' />
        <PageCreate />
      </DashboardPadding>
    </Dashboard>
  )
}
