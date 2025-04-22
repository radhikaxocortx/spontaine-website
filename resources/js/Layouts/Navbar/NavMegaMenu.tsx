import { Language } from '@/Components/ui/ui_interfaces'
import useWindowResize from '@/hooks/useWindowResize'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { useEffect, useRef, useState } from 'react'
import NavLinkItem from './NavLinkItem'

interface Properties {
  menu: NavMenu
  lang?: Language
}

const NavMegaMenu = ({ menu, lang = 'en' }: Properties) => {
  const [isHover, setIsHover] = useState(false)

  const menuReference = useRef<HTMLDivElement | null>(null)
  const dropdownReference = useRef<HTMLDivElement | null>(null)

  const [menuTitleLeftOffset, setMenuTitleLeftOffset] = useState(0)
  const [dropdownOffset, setDropdownOffset] = useState(100)

  const screenWidth = useWindowResize()

  useEffect(() => {
    //get menu title position from left
    if (menuReference.current && dropdownReference.current) {
      const menuTitlePosition = menuReference.current.getBoundingClientRect().left
      const dropdownWidth = dropdownReference.current.getBoundingClientRect().width
      setMenuTitleLeftOffset(menuTitlePosition)
      //if menu is outside of screen, set dropdownOffset
      if (menuTitlePosition + dropdownWidth > screenWidth) {
        const calculatedDropdownOffset =
          Math.ceil(menuTitlePosition + dropdownWidth - screenWidth) + 20
        setDropdownOffset(calculatedDropdownOffset < 0 ? 0 : calculatedDropdownOffset)
        return
      }
      //if menu is inside of screen, set dropdownOffset to 0
      setDropdownOffset(0)
    }
  }, [screenWidth, isHover])

  const hasSubMenuItems = menu.items?.items && menu.items.items.length > 0

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/*Menu Title*/}
      <div ref={menuReference}>
        <NavLinkItem
          item={menu}
          lang={lang}
        />
      </div>
      {hasSubMenuItems && (
        <div
          ref={dropdownReference}
          style={{
            transform: `translateX(-${dropdownOffset}px)`,
            left: menuTitleLeftOffset,
          }}
          className={`absolute ${isHover ? 'block' : 'hidden'} z-10 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl`}
        >
          <div className='w-full overflow-hidden rounded-lg text-sm shadow-lg ring-1 ring-black ring-opacity-5'>
            <div className={`relative grid w-full gap-1 bg-white px-3 py-6 lg:grid-cols-3`}>
              {menu.items?.items.map((item) => (
                <div key={item.id}>
                  <div className='px-2'></div>
                  <p className='my-2 px-2 py-1 text-base font-bold text-neutral-900'>
                    <Localization
                      text={item.section}
                      language={lang}
                    />
                  </p>
                  <ul className='grid space-y-1'>
                    {item.links.map((link) => {
                      return (
                        <li key={link.id}>
                          <InertiaLink
                            className='text-neutral-6000 inline-flex items-center rounded px-2 py-1 font-normal hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200'
                            link={link}
                            language={lang}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavMegaMenu
