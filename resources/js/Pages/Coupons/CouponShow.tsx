import DeleteModal from '@/components/CustomUI/Modal/DeleteModal'
import { Coupon } from '@/components/Interface/data_interface'
import ShowResourcePage, { ShowPageItem } from '@/components/ShowPage/ShowResourcePage'
import { getDisplayDate } from '@/lib/utils'
import { useMemo, useState } from 'react'

interface Props {
  coupon: Coupon
}

const CouponShow = ({ coupon }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }
  const displayValues = useMemo(() => {
    return [
      {
        label: 'Promotion Code',
        content: coupon.coupon_code,
        id: 1,
        type: 'text',
      },
      {
        label: 'Start Date',
        id: 2,
        content: getDisplayDate(coupon.start_date),
        type: 'text',
      },
      {
        label: 'End Date',
        id: 3,
        content: getDisplayDate(coupon.end_date),
        type: 'text',
      },
      {
        label: 'Discount Percent',
        content: coupon.discount_percent,
        id: 4,
        type: 'text',
      },
      {
        label: 'Discount Limit',
        content: coupon.discount_limit,
        id: 5,
        type: 'text',
      },
      {
        label: 'Price Plan',
        content: coupon.price_plan.name,
        id: 6,
        type: 'text',
      },
    ] as ShowPageItem[]
  }, [coupon])
  return (
    <ShowResourcePage
      items={displayValues}
      title={coupon.coupon_code}
      editUrl={route('coupon.edit', { coupon: coupon.id })}
      backUrl={route('coupon.index')}
      onDeleteClick={handleDeleteClick}
    >
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          title={`Delete ${coupon.coupon_code}`}
          url={route('coupon.destroy', coupon.id)}
        >
          <p>Are you sure you want to delete {coupon.coupon_code}?</p>
        </DeleteModal>
      )}
    </ShowResourcePage>
  )
}

export default CouponShow
