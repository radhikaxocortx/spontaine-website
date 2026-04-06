import ManageMedia from '@/Modules/PageBuilder/Pages/ManageMedia'
import { Paginator } from '@/components/ui/ui_interfaces'

interface MediaRecord {
  id: number
  name: string
  url: string | null
  file_key: string
  mime: string
  type: 'document' | 'image' | 'video'
  created_at: string | null
}

interface TypeOption {
  value: 'all' | 'document' | 'image' | 'video'
  label: string
}

interface Props {
  media: Paginator<MediaRecord>
  filters: {
    type: 'all' | 'document' | 'image' | 'video'
    search: string
  }
  typeOptions: TypeOption[]
}

const ManageMediaPage = ({ media, filters, typeOptions }: Props) => {
  return (
    <ManageMedia
      media={media}
      filters={filters}
      typeOptions={typeOptions}
    />
  )
}

export default ManageMediaPage
