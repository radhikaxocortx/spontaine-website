import NavEditor from '@/Modules/PageBuilder/NavEditor/NavEditor'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import Dashboard from '../Dashboard'

interface Properties {
  menuItems: Pick<
    NavMenu,
    'id' | 'title' | 'title_malayalam' | 'is_link' | 'link_info' | 'position'
  >[]
}

const NavEditorPage = ({ menuItems }: Properties) => {
  return (
    <Dashboard>
      <NavEditor menuItems={menuItems} />
    </Dashboard>
  )
}

export default NavEditorPage
