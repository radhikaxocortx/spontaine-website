import { Language } from '@/components/ui/ui_interfaces'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { Link, usePage } from '@inertiajs/react'

const NavbarLinks = () => {
  const { nav, lang = 'en' } = usePage().props as unknown as {
    nav?: NavMenu[]
    lang?: Language
  }

  return (
    <div className='flex items-center gap-7'>
      {nav?.map((menuItem) => (
        <Link
          key={menuItem.id.toString()}
          href={menuItem.link_info?.link ?? '#'}
          target={menuItem.link_info?.external ? '_blank' : undefined}
          rel={menuItem.link_info?.external ? 'noopener noreferrer' : undefined}
          className='font-body text-[15px] font-medium text-spontaine-text-primary transition-colors duration-200 hover:text-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark'
        >
          <Localization
            text={{
              english: menuItem.title,
              malayalam: menuItem.title_malayalam ?? '',
            }}
            language={lang}
          />
        </Link>
      ))}
    </div>
  )
}

export default NavbarLinks
