import { Button } from '@/Components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/Components/ui/navigation-menu'
import { Language } from '@/Components/ui/ui_interfaces'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { ChevronDownIcon } from 'lucide-react'

interface Properties {
  item: NavMenu
  lang?: Language
}

const NavLinkItem = ({ item, lang = 'en' }: Properties) => {
  const hasSubMenuItems = item.items?.items && item.items.items.length > 0
  const isButton = item.is_link ?? false

  if (isButton) {
    return (
      <Button
        variant='outline'
        className='2xl:text-lg'
      >
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
      </Button>
    )
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={`2xl:text-lg ${navigationMenuTriggerStyle()}`}>
            <div className='inline-flex items-center'>
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
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavLinkItem
