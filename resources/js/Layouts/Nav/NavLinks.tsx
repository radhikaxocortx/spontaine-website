import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Link } from '@inertiajs/react'

export function NavLinks() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href='/'>
            <NavigationMenuLink className={`2xl:text-lg ${navigationMenuTriggerStyle()}`}>
              Solutions
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/products'>
            <NavigationMenuLink className={`2xl:text-lg ${navigationMenuTriggerStyle()}`}>
              Company
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/pricing'>
            <NavigationMenuLink className={`2xl:text-lg ${navigationMenuTriggerStyle()}`}>
              Resources
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/contact-us'>
            <NavigationMenuLink className={`2xl:text-lg ${navigationMenuTriggerStyle()}`}>
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
