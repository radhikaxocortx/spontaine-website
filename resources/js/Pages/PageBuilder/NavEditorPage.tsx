import NavEditor from '@/Modules/NavEditor/NavEditor'
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
