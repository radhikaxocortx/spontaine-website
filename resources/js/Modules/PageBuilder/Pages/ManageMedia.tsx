import DeleteModal from '@/components/CustomUI/Modal/DeleteModal'
import { ListItemKeys } from '@/components/ListingPage/ListResourcePage'
import ListResourceTablePage from '@/components/ListingPage/ListResourceTablePage'
import { Paginator } from '@/components/ui/ui_interfaces'
import { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import UploadMediaForm from '@/Modules/PageBuilder/Pages/components/UploadMediaForm'
import { router, usePage } from '@inertiajs/react'
import { FormEvent, useMemo, useState } from 'react'

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

interface ManageMediaProps {
  media: Paginator<MediaRecord>
  filters: {
    type: 'all' | 'document' | 'image' | 'video'
    search: string
  }
  typeOptions: TypeOption[]
}

interface ValidationErrors {
  name?: string
  type?: string
  file?: string
}

interface MediaListItem {
  id: number
  name: string
  type: string
  mime: string
  url: string
  actions: {
    action: () => void
    title: string
    boxStyles?: string
    textStyles?: string
  }[]
}

const typeLabelMap: Record<string, string> = {
  document: 'Document',
  image: 'Image',
  video: 'Video',
}

const ManageMedia = ({ media, filters, typeOptions }: ManageMediaProps) => {
  const { errors } = usePage().props as unknown as { errors: ValidationErrors }
  const [activeType, setActiveType] = useState(filters.type || 'all')
  const [name, setName] = useState('')
  const [uploadType, setUploadType] = useState<'document' | 'image' | 'video'>('document')
  const [file, setFile] = useState<File | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [deleteItem, setDeleteItem] = useState<MediaRecord | null>(null)
  const [processing, setProcessing] = useState(false)
  const { formData, setFormValue } = useCustomForm({
    type: filters.type || 'all',
    search: filters.search || '',
  })

  const filteredTypeOptions = useMemo(
    () => typeOptions.filter((option) => option.value !== 'all'),
    [typeOptions]
  )

  const onTypeChange = (nextType: 'all' | 'document' | 'image' | 'video') => {
    setActiveType(nextType)
    setFormValue('type')(nextType)
    router.get(
      route('manage-media.index'),
      {
        type: nextType,
        search: formData.search,
      },
      {
        preserveState: true,
        replace: true,
      }
    )
  }

  const onUploadSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (file == null) {
      return
    }

    setProcessing(true)

    router.post(
      route('media-upload'),
      {
        type: uploadType,
        filter_type: activeType,
        name,
        file,
        search: formData.search,
      },
      {
        forceFormData: true,
        preserveScroll: true,
        onFinish: () => setProcessing(false),
        onSuccess: () => {
          setShowUploadModal(false)
          setFile(null)
          setName('')
        },
      }
    )
  }

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      search: {
        label: 'Search',
        type: 'text',
        setValue: setFormValue('search'),
        placeholder: 'Search by name',
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])

  const keys = useMemo(() => {
    return [
      {
        key: 'name',
        label: 'Name',
        isCardHeader: true,
      },
      {
        key: 'type',
        label: 'Type',
        isShownInCard: true,
      },
      {
        key: 'mime',
        label: 'Mime',
        isShownInCard: true,
      },
      {
        key: 'url',
        label: 'URL',
        isShownInCard: true,
      },
    ] as ListItemKeys<MediaListItem>[]
  }, [])

  const rows = useMemo(() => {
    return media.data.map((item) => {
      const fileKey = item.file_key || String(item.id)

      const fileViewUrl = route(
        'manage-media.file',
        {
          type: item.type,
          key: fileKey,
        },
        false
      )

      const fileDownloadUrl = route(
        'manage-media.file',
        {
          type: item.type,
          key: fileKey,
          download: 1,
        },
        false
      )

      return {
        id: item.id,
        name: item.name,
        type: typeLabelMap[item.type] || item.type,
        mime: item.mime,
        url: fileViewUrl,
        actions: [
          {
            action: () => {
              window.open(fileViewUrl, '_blank', 'noopener,noreferrer')
            },
            title: 'VIEW',
          },
          {
            action: () => {
              window.open(fileDownloadUrl, '_blank', 'noopener,noreferrer')
            },
            title: 'DOWNLOAD',
          },
          {
            action: () => setDeleteItem(item),
            title: 'DELETE',
            textStyles: 'text-red-600 hover:text-red-700',
          },
        ],
      }
    })
  }, [media])

  return (
    <ListResourceTablePage
      rows={rows}
      keys={keys}
      primaryKey='id'
      title='Manage Media'
      paginator={media}
      formItems={formItems}
      formData={formData}
      searchUrl={route('manage-media.index')}
      formStyles='lg:grid-cols-3'
    >
      <div className='mb-20 mt-4 flex flex-wrap items-center justify-between gap-10'>
        <div className='flex flex-wrap gap-8'>
          {typeOptions.map((option) => {
            const isActive = activeType === option.value
            return (
              <button
                key={option.value}
                onClick={() => onTypeChange(option.value)}
                className={`rounded-full px-7 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-spontaine-highlight text-spontaine-dark'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
        <button
          type='button'
          onClick={() => setShowUploadModal(true)}
          className='rounded-md border border-spontaine-dark bg-spontaine-light px-7 py-8 text-sm font-semibold text-spontaine-dark shadow-lg transition hover:bg-spontaine-gray'
        >
          Upload Media
        </button>
      </div>

      <UploadMediaForm
        showModal={showUploadModal}
        processing={processing}
        typeOptions={
          filteredTypeOptions as Array<{ value: 'document' | 'image' | 'video'; label: string }>
        }
        uploadType={uploadType}
        name={name}
        errors={errors}
        onUploadTypeChange={setUploadType}
        onNameChange={setName}
        onFileChange={setFile}
        onClose={() => setShowUploadModal(false)}
        onSubmit={onUploadSubmit}
      />

      {deleteItem != null && (
        <DeleteModal
          title={`Delete ${deleteItem.name}`}
          setShowModal={(show) => {
            if (!show) {
              setDeleteItem(null)
            }
          }}
          url={route('manage-media.destroy', {
            type: deleteItem.type,
            id: deleteItem.id,
            _query: {
              type: activeType,
              search: formData.search,
            },
          })}
          preserveState={true}
          onSuccess={() => setDeleteItem(null)}
        >
          <p>Are you sure you want to delete this media file?</p>
        </DeleteModal>
      )}
    </ListResourceTablePage>
  )
}

export default ManageMedia
