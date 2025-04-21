import { handleHttpErrors } from '@/Components/ui/alerts'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { NavMenuItem } from '../page_interfaces'

const useFetchNavSection = (section: string) => {
  const [menuItem, setMenuItem] = useState<NavMenuItem | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response: { data: { section: { items: NavMenuItem } | null } } = await axios.get(
        `/nav-editor/${section}`
      )
      setMenuItem(response.data.section?.items ?? { lastUUID: 0, items: [] })
    } catch (error) {
      handleHttpErrors(error)
    } finally {
      setLoading(false)
    }
  }, [section])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { menuItem, loading }
}

export default useFetchNavSection
