import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Language } from '@/components/ui/ui_interfaces'
import { cleanupRipples, createRippleEffect } from '@/lib/ripple-utils'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import NavLinkItem from './NavLinkItem'

interface Properties {
  menu: NavMenu
  lang?: Language
}

const DropdownMenuComponent = ({ menu, lang = 'en' }: Properties) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasSubMenuItems = menu.items?.items && menu.items.items.length > 0

  if (!hasSubMenuItems) {
    return (
      <NavLinkItem
        item={menu}
        lang={lang}
      />
    )
  }

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DropdownMenuTrigger asChild>
        <button
          className={`2xl:text-lg ${navigationMenuTriggerStyle()}`}
          onMouseEnter={(e) => {
            setIsOpen(true)
            createRippleEffect(e, 'rgba(255, 255, 255, 0.3)')
          }}
          onMouseLeave={(e) => {
            setIsOpen(false)
            cleanupRipples(e.currentTarget)
          }}
        >
          <div className='inline-flex items-center'>
            <Localization
              text={{
                english: menu.title,
                malayalam: menu.title_malayalam ?? '',
              }}
              language={lang}
            />
            <ChevronDownIcon
              className='-mr-1 ml-1 h-4 w-4 text-neutral-400'
              aria-hidden='true'
            />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {menu.items?.items.map((item) => (
          <div
            key={item.id}
            className='py-1'
          >
            <div className='px-2 py-1.5 text-sm font-semibold text-gray-600'>
              <Localization
                text={item.section}
                language={lang}
              />
            </div>
            {item.links.map((link) => (
              <DropdownMenuItem
                key={link.id}
                className='cursor-pointer'
              >
                <InertiaLink
                  className='text-neutral-6000 inline-flex w-full items-center rounded px-2 py-1 font-normal hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200'
                  link={link}
                  language={lang}
                />
              </DropdownMenuItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownMenuComponent
