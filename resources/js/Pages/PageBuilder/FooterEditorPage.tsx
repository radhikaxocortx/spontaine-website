import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import FooterEditor from '@/Modules/FooterEditor/FooterEditor'
import { FooterData } from '@/Modules/PageBuilder/page_interfaces'
import Dashboard from '../Dashboard'

interface Properties {
  footer: FooterData
}

const FooterEditorPage = ({ footer }: Properties) => {
  return (
    <Dashboard>
      <AppLayoutPadding>
        <FooterEditor footer={footer} />
      </AppLayoutPadding>
    </Dashboard>
  )
}

export default FooterEditorPage
