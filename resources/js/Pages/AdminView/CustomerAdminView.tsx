import CardHeader from '@/components/CustomUI/Card/CardHeader'
import Pagination from '@/components/CustomUI/Pagination/Pagination'
import { CustomerPricePlan } from '@/components/Interface/data_interface'
import { Paginator } from '@/components/ui/ui_interfaces'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import DashboardPadding from '@/Layouts/DashboardLayout'
import { getDisplayDate } from '@/lib/utils'
import NormalText from '@/typography/NormalText'
import Paragraph from '@/typography/Paragraph'
import { router } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'
import Dashboard from '../Dashboard'

interface Props {
  customerPriceplans: Paginator<CustomerPricePlan>
}

const CustomerAdminView = ({ customerPriceplans }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    search: '',
  })
  const formItems = useMemo(() => {
    return {
      search: {
        label: 'Search',
        type: 'text',
        setValue: setFormValue('search'),
        placeholder: 'Search by Customer,priceplan',
      } as FormItem<string, never, never, never>,
    }
  }, [setFormValue])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    router.get(route('customer-admin-view'), {
      ...formData,
    } as Record<string, string | number>)
  }

  const handleCardClick = useCallback((id: number | string) => {
    router.get(route('customer-admin-show', id))
  }, [])
  return (
    <Dashboard>
      <DashboardPadding>
        <CardHeader title='CUSTOMERS' />
        <div className='flex flex-col gap-10 py-5'>
          <div className='flex flex-col gap-5'>
            <FormBuilder
              formData={formData}
              onFormSubmit={handleSearch}
              formItems={formItems}
              loading={false}
              buttonText='Search'
              formStyles={`md:grid-cols-3 lg:grid-cols-4 `}
            />
          </div>
        </div>
        <div className='space-y-2 py-5'>
          <div className='grid grid-cols-4 gap-4 rounded-md bg-gray-50 p-3'>
            <NormalText>CUSTOMER</NormalText>
            <NormalText>TELEPHONE</NormalText>
            <NormalText>PRICE PLAN</NormalText>
            <NormalText>SUBSCRIBED ON</NormalText>
          </div>

          {customerPriceplans.data.map((customerPriceplan) => (
            <div
              key={customerPriceplan.id}
              className='rounded-mdp-3 group relative grid grid-cols-4 items-center gap-4 p-2 hover:cursor-pointer hover:bg-white'
              onClick={() => handleCardClick(customerPriceplan.id)}
            >
              <Paragraph>{customerPriceplan.customer.first_name}</Paragraph>
              <Paragraph>{customerPriceplan.customer.telephone}</Paragraph>
              <Paragraph>{customerPriceplan.price_plan.name}</Paragraph>
              <Paragraph>{getDisplayDate(customerPriceplan.created_at)}</Paragraph>
            </div>
          ))}
        </div>
        <Pagination pagination={customerPriceplans} />
      </DashboardPadding>
    </Dashboard>
  )
}

export default CustomerAdminView
