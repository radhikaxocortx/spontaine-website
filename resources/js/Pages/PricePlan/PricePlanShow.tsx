import DeleteModal from '@/components/CustomUI/Modal/DeleteModal'
import { PricePlan } from '@/components/Interface/data_interface'
import ShowResourcePage, { ShowPageItem } from '@/components/ShowPage/ShowResourcePage'
import { useMemo, useState } from 'react'

interface Props {
  pricePlan: PricePlan
}

const PricePlanShow = ({ pricePlan }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }
  const displayValues = useMemo(() => {
    return [
      {
        label: 'Price Plan Name',
        content: pricePlan.name,
        id: 1,
        type: 'text',
      },
      {
        label: 'Price Plan Code',
        id: 2,
        content: pricePlan.code,
        type: 'text',
      },
      {
        label: 'Price Plan Type',
        content: pricePlan.type,
        id: 3,
        type: 'text',
      },
      {
        label: 'Price Plan Description',
        content: pricePlan.description,
        id: 4,
        type: 'text',
      },
      {
        label: 'Validity (months)',
        content: pricePlan.validity,
        id: 5,
        type: 'text',
      },
      {
        label: 'Min Quantity Required',
        content: pricePlan.min_quantity_required,
        id: 6,
        type: 'text',
      },
      {
        label: 'Rate',
        content: pricePlan.rate,
        id: 7,
        type: 'text',
      },
    ] as ShowPageItem[]
  }, [pricePlan])
  return (
    <ShowResourcePage
      items={displayValues}
      title={pricePlan.name}
      editUrl={route('price-plan.edit', { pricePlan: pricePlan.id })}
      backUrl={route('price-plan.index')}
      onDeleteClick={handleDeleteClick}
    >
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          title={`Delete ${pricePlan.name}`}
          url={route('price-plan.destroy', pricePlan.id)}
        >
          <p>Are you sure you want to delete {pricePlan.name}?</p>
        </DeleteModal>
      )}
    </ShowResourcePage>
  )
}

export default PricePlanShow
