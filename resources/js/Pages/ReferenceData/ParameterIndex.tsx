import DeleteModal from '@/components/CustomUI/Modal/DeleteModal'
import { ReferenceDataParameter } from '@/components/Interface/data_interface'
import ListResourcePage from '@/components/ListingPage/ListResourcePage'
import { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import { router } from '@inertiajs/react'
import { useMemo, useState } from 'react'

interface Props {
  parameters: ReferenceDataParameter[]
}

const ParameterIndex = ({ parameters }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ReferenceDataParameter | null>(null)
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
        placeholder: 'Search by Parameter Name',
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])

  const data = useMemo(() => {
    return parameters.map((parameter) => {
      return {
        id: parameter.id,
        name: parameter.parameter,
        domain: parameter.domain.domain,
        actions: [
          {
            action: () => {
              router.get(route('parameter-management.edit', parameter.id))
            },
            title: 'EDIT',
          },
          {
            action: () => {
              setSelectedItem(parameter)
              setShowDeleteModal(true)
            },
            title: 'DELETE',
          },
        ],
      }
    })
  }, [parameters])

  const keys = useMemo(() => {
    return [
      {
        key: 'name',
        label: 'Name',
      },
      {
        key: 'domain',
        label: 'Domain',
      },
    ]
  }, [])

  return (
    <ListResourcePage
      keys={keys}
      primaryKey='id'
      rows={data}
      title='Reference Data Parameter'
      formItems={formItems}
      formData={formData}
      addUrl={route('parameter-management.create')}
      searchUrl={route('parameter-management.index')}
    >
      {showDeleteModal && (
        <DeleteModal
          title='Delete Parameter'
          setShowModal={setShowDeleteModal}
          url={route('parameter-management.destroy', selectedItem?.id)}
        >
          Are you sure you want to delete {selectedItem?.parameter}?
        </DeleteModal>
      )}
    </ListResourcePage>
  )
}
export default ParameterIndex
