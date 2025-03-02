import DashboardPadding from '@/Layouts/DashboardLayout'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import PageBuilder from '@/Modules/PageBuilder/Pages/PageBuilder'
import Dashboard from '@/Pages/Dashboard'

interface Props {
  page: Page
}

export default function UIBuilderPage({ page }: Props) {
  return (
    <Dashboard>
      <DashboardPadding>
        <PageBuilder
          page={page}
          dependencies={{}}
        />
      </DashboardPadding>
    </Dashboard>
  )
}
