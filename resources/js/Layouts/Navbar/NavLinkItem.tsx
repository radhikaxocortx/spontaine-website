import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Language } from '@/components/ui/ui_interfaces'
import { cleanupRipples, createRippleEffect } from '@/lib/ripple-utils'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

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
      {/* {hasSubMenuItems && (
        <ChevronDownIcon
          className='-mr-1 ml-1 h-4 w-4 text-neutral-400'
          aria-hidden='true'
        />
      )} */}
    </>
  )

  if (isButton) {
    return (
      <Button
        className='relative overflow-hidden rounded-full bg-white/20 py-4 text-white shadow-2xl transition-all duration-300 2xl:text-lg'
        asChild
      >
        <Link
          href={linkInfo?.link ?? '#'}
          target={linkInfo?.external ? '_blank' : undefined}
          rel={linkInfo?.external ? 'noopener noreferrer' : undefined}
        >
          <span className='nav-cta-text'>{renderContent()}</span>
          <ArrowRight
            aria-hidden='true'
            className='ml-2 h-4 w-4'
          />
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
            className={`relative overflow-hidden rounded-full py-4 font-display text-lg text-white transition-all duration-300 2xl:text-lg ${navigationMenuTriggerStyle()} text-spontaine-dark/60 hover:text-spontaine-light/70`}
            onMouseEnter={(e) => createRippleEffect(e, 'rgba(0, 0, 0, 0.08)')}
            onMouseLeave={(e) => cleanupRipples(e.currentTarget)}
          >
            <div className='inline-flex items-center'>{renderContent()}</div>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavLinkItem
