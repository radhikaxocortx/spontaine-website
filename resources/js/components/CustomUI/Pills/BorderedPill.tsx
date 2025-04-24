import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface Properties {
  value: string
  onClose?: () => void
  type?: 'info' | 'success' | 'danger' | 'warning' | 'default'
}

const pillVariants = {
  info: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  default: 'bg-white border border-black text-black',
}

const BorderedPill = ({ value, onClose, type = 'default' }: Properties) => {
  return (
    <Badge className={`flex items-center gap-2 rounded-2xl px-4 py-1 ${pillVariants[type]}`}>
      <span>{value}</span>
      {onClose && (
        <X
          className='h-4 w-4 cursor-pointer'
          onClick={onClose}
        />
      )}
    </Badge>
  )
}

export default BorderedPill
