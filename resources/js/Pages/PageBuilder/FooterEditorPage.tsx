import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import FooterEditor, { FooterDataInterface } from '@/Modules/FooterEditor/FooterEditor'
import Dashboard from '../Dashboard'

interface Properties {
  footer: FooterDataInterface
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
