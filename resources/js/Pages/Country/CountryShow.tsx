import { Country } from '@/Components/Interface/data_interface'
import ShowResourcePage, { ShowPageItem } from '@/Components/ShowPage/ShowResourcePage'
import DeleteModal from '@/Components/ui/Modal/DeleteModal'
import { useMemo, useState } from 'react'

interface Props {
  country: Country
}

const CountryShow = ({ country }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }
  const displayValues = useMemo(() => {
    return [
      {
        label: 'Name of Country',
        content: country.name,
        id: 1,
        type: 'text',
      },
      {
        label: 'Country Code',
        id: 2,
        content: country.code,
        type: 'text',
      },
      {
        label: 'Description',
        id: 3,
        content: country.description,
        type: 'text',
      },
      {
        label: 'Currency',
        content: country.currency,
        id: 4,
        type: 'text',
      },
      {
        label: 'Currency Code',
        content: country.currency_code,
        id: 5,
        type: 'text',
      },
      {
        label: 'Base Currency Conversion Rate',
        content: country.base_cxy_conv_rate,
        id: 6,
        type: 'text',
      },
      {
        label: 'Tax Name',
        content: country.tax_name,
        id: 7,
        type: 'text',
      },
      {
        label: 'Tax Code',
        content: country.tax_code,
        id: 8,
        type: 'text',
      },
      {
        label: 'Tax Rate(%)',
        content: country.tax_rate,
        id: 9,
        type: 'text',
      },
    ] as ShowPageItem[]
  }, [country])
  return (
    <ShowResourcePage
      items={displayValues}
      title={country.name}
      editUrl={route('country.edit', { country: country.id })}
      backUrl={route('country.index')}
      onDeleteClick={handleDeleteClick}
    >
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          title={`Delete ${country.name}`}
          url={route('country.destroy', country.id)}
        >
          <p>Are you sure you want to delete {country.name}?</p>
        </DeleteModal>
      )}
    </ShowResourcePage>
  )
}

export default CountryShow
