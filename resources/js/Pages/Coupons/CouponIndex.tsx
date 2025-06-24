import { Coupon } from '@/components/Interface/data_interface'
import ListResourcePage from '@/components/ListingPage/ListResourcePage'
import { Paginator } from '@/components/ui/ui_interfaces'
import { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import { router } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'

interface Props {
  coupons: Paginator<Coupon>
}

const CouponIndex = ({ coupons }: Props) => {
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
        placeholder: 'Search by Promotion Code',
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])

  const data = useMemo(() => {
    return coupons.data.map((coupon) => {
      return {
        id: coupon.id,
        code: coupon.coupon_code,
        plan: coupon.price_plan.name,
        actions: [],
      }
    })
  }, [coupons])

  const keys = useMemo(() => {
    return [
      {
        key: 'code',
        label: 'Code',
      },
      {
        key: 'plan',
        label: 'Price Plan',
      },
    ]
  }, [])

  const handleCardClick = useCallback((id: number) => {
    router.get(route('coupon.show', id))
  }, [])

  return (
    <ListResourcePage
      keys={keys}
      primaryKey='id'
      rows={data}
      title='Promotions'
      formItems={formItems}
      formData={formData}
      addUrl={route('coupon.create')}
      onCardClick={handleCardClick}
      searchUrl={route('coupon.index')}
      paginator={coupons}
    />
  )
}
export default CouponIndex
