import usePermissionCheck from '@/Modules/Perrmissions/usePermissionCheck'
import { useMemo } from 'react'
import SidebarMenuItems from './sidebar-menu-items'

export function useFilteredSidebarItems() {
  const { can } = usePermissionCheck()

  return useMemo(() => {
    return SidebarMenuItems.map((menu) => {
      const filteredItems = menu.items.filter((item) => can(item.permission))
      return filteredItems.length > 0 ? { ...menu, items: filteredItems } : null
    }).filter((menu): menu is NonNullable<typeof menu> => menu !== null)
  }, [can])
}

export default useFilteredSidebarItems
