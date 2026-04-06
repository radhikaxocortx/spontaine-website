import DeleteModal from '@/components/CustomUI/Modal/DeleteModal'
import { ListItemKeys } from '@/components/ListingPage/ListResourcePage'
import ListResourceTablePage from '@/components/ListingPage/ListResourceTablePage'
import { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { router } from '@inertiajs/react'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  pages: Page[]
  filters?: {
    search?: string
    type?: string
    published?: string
    featured?: string
  }
}

interface PageListItem {
  id: number
  title: string
  page_title: string
  type: string
  description: string
  published: string
  featured: string
  actions: {
    action: () => void
    title: string
    boxStyles?: string
    textStyles?: string
  }[]
}

export default function PageIndex({ pages, filters }: Props) {
  const [selectedItem, setSelectedItem] = useState<Page | null>(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { formData, setFormValue } = useCustomForm({
    search: filters?.search ?? '',
    type: filters?.type ?? '',
    published: filters?.published ?? '',
    featured: filters?.featured ?? '',
  })

  const pageTypeOptions = useMemo(() => {
    return [
      { id: 'Page', label: 'Page' },
      { id: 'Blog', label: 'Blog' },
      { id: 'Article', label: 'Article' },
      { id: 'Opinion', label: 'Opinion' },
      { id: 'Whitepapers', label: 'Whitepapers' },
      { id: 'Use Cases', label: 'Use Cases' },
      { id: 'Case Studies', label: 'Case Studies' },
    ]
  }, [])

  const booleanOptions = useMemo(() => {
    return [
      { id: '1', label: 'Yes' },
      { id: '0', label: 'No' },
    ]
  }, [])

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
        placeholder: 'Search by Page Title',
      },
      type: {
        label: 'Type',
        type: 'select',
        setValue: setFormValue('type'),
        list: pageTypeOptions,
        displayKey: 'label',
        dataKey: 'id',
        showAllOption: true,
        allOptionText: 'All Types',
      },
      published: {
        label: 'Published',
        type: 'select',
        setValue: setFormValue('published'),
        list: booleanOptions,
        displayKey: 'label',
        dataKey: 'id',
        showAllOption: true,
        allOptionText: 'All',
      },
      featured: {
        label: 'Featured',
        type: 'select',
        setValue: setFormValue('featured'),
        list: booleanOptions,
        displayKey: 'label',
        dataKey: 'id',
        showAllOption: true,
        allOptionText: 'All',
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, pageTypeOptions, booleanOptions])

  const data = useMemo(() => {
    return pages.map((page) => {
      return {
        id: page.id,
        title: page.title,
        page_title: page.page_title,
        type: page.type,
        description: page.description,
        published: page.published ? 'Yes' : 'No',
        featured: page.featured ? '⭐ Featured' : 'No',

        actions: [
          {
            action: () => {
              setSelectedItem(page)
              setShowUpdateModal(true)
            },
            title: 'EDIT',
          },
          {
            action: () => {
              setSelectedItem(page)
              setShowDeleteModal(true)
            },
            title: 'DELETE',
          },
        ],
      }
    })
  }, [pages])

  const keys = useMemo(() => {
    return [
      {
        key: 'title',
        label: 'Title',
        isCardHeader: true,
      },
      {
        key: 'page_title',
        label: 'Page Title',
        isShownInCard: true,
      },
      {
        key: 'type',
        label: 'Type',
        isShownInCard: true,
      },
      {
        key: 'published',
        label: 'Published',
        isShownInCard: true,
      },
      {
        key: 'featured',
        label: 'Featured',
        isShownInCard: true,
      },
    ] as ListItemKeys<PageListItem>[]
  }, [])

  useEffect(() => {
    if (showUpdateModal && selectedItem) {
      router.get(route('pages.show', { id: selectedItem.id }))
    }
  }, [showUpdateModal, selectedItem])

  return (
    <ListResourceTablePage
      rows={data}
      keys={keys}
      primaryKey={'id'}
      title='Pages'
      formItems={formItems}
      formData={formData}
      searchUrl={route('pages.index')}
      addUrl={route('pages.create')}
    >
      <div>
        {showDeleteModal && selectedItem && (
          <DeleteModal
            title={`Delete ${selectedItem.title}`}
            setShowModal={setShowDeleteModal}
            url={route('pages.destroy', { id: selectedItem.id })}
          >
            <p>Are you sure you want to delete {selectedItem.title}?</p>
          </DeleteModal>
        )}
      </div>
    </ListResourceTablePage>
  )
}
