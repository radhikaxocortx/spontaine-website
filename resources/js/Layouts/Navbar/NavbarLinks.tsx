import { Language } from '@/Components/ui/ui_interfaces'
import { NavMenuRecord } from '@/Modules/PageBuilder/page_interfaces'
import { usePage } from '@inertiajs/react'
import NavMegaMenu from './NavMegaMenu'

const NavbarLinks = () => {
  const { nav, lang = 'en' } = usePage().props as unknown as {
    nav?: NavMenuRecord[]
    lang?: Language
  }

  return (
    <div className='hidden xl:flex'>
      {nav?.map((menuItem) => {
        return (
          <NavMegaMenu
            menu={menuItem}
            lang={lang}
            key={menuItem.id.toString()}
          />
        )
      })}
    </div>
  )
}

export default NavbarLinks
