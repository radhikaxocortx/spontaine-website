import NavEditor from '@/Modules/PageBuilder/NavEditor/NavEditor'
import Dashboard from '../Dashboard'

interface Properties {
  sections: { section: string }[]
}

const NavEditorPage = ({ sections }: Properties) => {
  return (
    <Dashboard>
      <NavEditor sections={sections} />
    </Dashboard>
  )
}

export default NavEditorPage
