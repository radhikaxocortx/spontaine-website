import { Language } from '@/components/ui/ui_interfaces'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { usePage } from '@inertiajs/react'
import DropdownMenuComponent from './DropdownMenu'

const NavbarLinks = () => {
  const { nav, lang = 'en' } = usePage().props as unknown as {
    nav?: NavMenu[]
    lang?: Language
  }

  return (
    <div className='hidden space-x-2 lg:flex'>
      {nav?.map((menuItem) => {
        return (
          <DropdownMenuComponent
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
