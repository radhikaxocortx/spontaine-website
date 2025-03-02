import DeleteModal from '@/Components/CustomUI/Modal/DeleteModal'
import ListResourcePage, { ListItemKeys } from '@/Components/ListingPage/ListResourcePage'
import { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { router } from '@inertiajs/react'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  pages: Page[]
}

export default function PageIndex({ pages }: Props) {
  const [selectedItem, setSelectedItem] = useState<Page | null>(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { formData, setFormValue } = useCustomForm({
    search: '',
  })

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
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])

  const data = useMemo(() => {
    return pages.map((page) => {
      return {
        id: page.id,
        title: page.title,
        page_title: page.page_title,
        type: page.type,
        description: page.description,

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
        key: 'description',
        label: 'Description',
        isShownInCard: true,
      },
    ] as ListItemKeys<Partial<Page>>[]
  }, [])

  useEffect(() => {
    if (showUpdateModal && selectedItem) {
      router.get(route('pages.show', { id: selectedItem.id }))
    }
  }, [showUpdateModal, selectedItem])

  return (
    <ListResourcePage
      rows={data}
      keys={keys}
      primaryKey={'id'}
      title='Page Builder'
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
    </ListResourcePage>
  )
}
