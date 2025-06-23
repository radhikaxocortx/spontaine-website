import { Coupon, PricePlan } from '@/components/Interface/data_interface'
import { FormItem } from '@/FormBuilder/FormBuilder'
import FormPage from '@/FormBuilder/FormPage'
import useCustomForm from '@/hooks/useCustomForm'
import { useMemo } from 'react'

interface Props {
  pricePlans: PricePlan[]
  coupon?: Coupon
}
const CouponCreate = ({ pricePlans, coupon }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    coupon_code: coupon?.coupon_code ?? '',
    start_date: coupon?.start_date ?? '',
    end_date: coupon?.end_date ?? '',
    discount_percent: coupon?.discount_percent ?? '',
    discount_limit: coupon?.discount_limit ?? '',
    price_plan_id: coupon?.price_plan_id ?? '',
  })

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      coupon_code: {
        label: 'Promotion Code',
        type: 'text',
        setValue: setFormValue('coupon_code'),
      },
      start_date: {
        label: 'Start Date',
        type: 'date',
        setValue: setFormValue('start_date'),
      },
      end_date: {
        label: 'End Date',
        type: 'date',
        setValue: setFormValue('end_date'),
      },
      discount_percent: {
        label: 'Discount Percent',
        type: 'number',
        setValue: setFormValue('discount_percent'),
      },
      discount_limit: {
        label: 'Discount Limit',
        type: 'number',
        setValue: setFormValue('discount_limit'),
      },
      price_plan_id: {
        label: 'Price Plan',
        type: 'select',
        setValue: setFormValue('price_plan_id'),
        list: pricePlans,
        dataKey: 'id',
        displayKey: 'name',
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, pricePlans])
  return (
    <FormPage
      formItems={formItems}
      formData={formData}
      title={coupon ? 'Edit Promotion' : 'Create Promotion'}
      url={coupon ? route('coupon.update', coupon.id) : route('coupon.store')}
      backUrl={route('coupon.index')}
      isPatchRequest={!!coupon}
    />
  )
}

export default CouponCreate
