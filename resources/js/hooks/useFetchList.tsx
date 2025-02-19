import { handleHttpErrors } from '@/Components/ui/alerts'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

export default function useFetchList<T>(url: string): [T[], boolean] {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<T[]>([])

  const fetchList = useCallback(async () => {
    setLoading(true)
    setList([])
    try {
      const { data } = await axios.get(url)
      setList(data)
    } catch (error) {
      handleHttpErrors(error)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  return [list, loading]
}
