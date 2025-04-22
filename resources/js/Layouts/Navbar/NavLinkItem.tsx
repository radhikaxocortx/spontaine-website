import { Button } from '@/Components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/Components/ui/navigation-menu'
import { Language } from '@/Components/ui/ui_interfaces'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { Link } from '@inertiajs/react'
import { ChevronDownIcon } from 'lucide-react'

interface Properties {
  item: NavMenu
  lang?: Language
}

const NavLinkItem = ({ item, lang = 'en' }: Properties) => {
  const hasSubMenuItems = item.items?.items && item.items.items.length > 0
  const isButton = item.is_link === 1
  const linkInfo = item.link_info

  const renderContent = () => (
    <>
      <Localization
        text={{
          english: item.title,
          malayalam: item.title_malayalam ?? '',
        }}
        language={lang}
      />
      {hasSubMenuItems && (
        <ChevronDownIcon
          className='-mr-1 ml-1 h-4 w-4 text-neutral-400'
          aria-hidden='true'
        />
      )}
    </>
  )

  if (isButton) {
    return (
      <Button
        className='2xl:text-lg'
        asChild
      >
        <Link
          href={linkInfo?.link ?? '#'}
          target={linkInfo?.external ? '_blank' : undefined}
          rel={linkInfo?.external ? 'noopener noreferrer' : undefined}
        >
          {renderContent()}
        </Link>
      </Button>
    )
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            href={linkInfo?.link ?? '#'}
            target={linkInfo?.external ? '_blank' : undefined}
            rel={linkInfo?.external ? 'noopener noreferrer' : undefined}
            className={`2xl:text-lg ${navigationMenuTriggerStyle()}`}
          >
            <div className='inline-flex items-center'>{renderContent()}</div>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavLinkItem
