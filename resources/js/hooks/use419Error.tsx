import { showError } from '@/Components/ui/alerts'
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'

const use419Error = (toast = true) => {
  const errors = usePage().props.errors as Record<string, string>

  useEffect(() => {
    if (!toast) {
      return
    }
    const keys = Object.keys(errors)
    keys.forEach((key) => {
      showError(errors[key])
    })
  }, [errors, toast])

  return errors
}

export default use419Error
