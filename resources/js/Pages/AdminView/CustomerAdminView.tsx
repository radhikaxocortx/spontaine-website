import CardHeader from '@/components/CustomUI/Card/CardHeader'
import { CustomerPricePlan } from '@/components/Interface/data_interface'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Paginator } from '@/components/ui/ui_interfaces'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import DashboardPadding from '@/Layouts/DashboardLayout'
import { router } from '@inertiajs/react'
import { useCallback, useMemo, useState } from 'react'
import Dashboard from '../Dashboard'
import VerificationTabContent from './components/VerificationTabContent'

interface Props {
  customerPriceplans: Paginator<CustomerPricePlan>
}

const CustomerAdminView = ({ customerPriceplans }: Props) => {
  const [activeTab, setActiveTab] = useState('business')
  const { formData, setFormValue } = useCustomForm({
    search: '',
  })

  const formItems = useMemo(() => {
    return {
      search: {
        label: 'Search',
        type: 'text',
        setValue: setFormValue('search'),
        placeholder: 'Search by Customer, price plan',
      } as FormItem<string, never, never, never>,
    }
  }, [setFormValue])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.get(route('customer-admin-view'), {
      ...formData,
      type: activeTab,
    } as Record<string, string | number>)
  }

  const handleCardClick = useCallback((id: number | string) => {
    router.get(route('customer-admin-show', id))
  }, [])

  const filteredRequests = useMemo(() => {
    return customerPriceplans.data.filter((request) => {
      const pricePlanType = request.price_plan.type.toLowerCase()
      return activeTab === 'business'
        ? pricePlanType.includes('business')
        : pricePlanType.includes('individual')
    })
  }, [customerPriceplans.data, activeTab])

  const paginatedData = useMemo(() => {
    const total = filteredRequests.length
    const perPage = customerPriceplans.per_page
    const currentPage = customerPriceplans.current_page
    const lastPage = Math.ceil(total / perPage)

    return {
      ...customerPriceplans,
      data: filteredRequests,
      total,
      last_page: lastPage,
      from: (currentPage - 1) * perPage + 1,
      to: Math.min(currentPage * perPage, total),
    }
  }, [filteredRequests, customerPriceplans])

  return (
    <Dashboard>
      <DashboardPadding>
        <CardHeader title='VERIFICATION REQUESTS' />
        <div className='mt-4 flex flex-col gap-5'>
            <FormBuilder
              formData={formData}
              onFormSubmit={handleSearch}
              formItems={formItems}
              loading={false}
              buttonText='Search'
            formStyles={`md:grid-cols-3 lg:grid-cols-4`}
            />
        </div>
        <div className='flex flex-col gap-10 py-5'>
          <Tabs
            defaultValue='business'
            className='w-full'
            onValueChange={setActiveTab}
          >
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='business'>Business Verifications</TabsTrigger>
              <TabsTrigger value='personal'>Individual Verifications</TabsTrigger>
            </TabsList>

            <VerificationTabContent
              value='business'
              requests={filteredRequests}
              pagination={paginatedData}
              onViewClick={handleCardClick}
            />

            <VerificationTabContent
              value='personal'
              requests={filteredRequests}
              pagination={paginatedData}
              onViewClick={handleCardClick}
            />
          </Tabs>
        </div>
      </DashboardPadding>
    </Dashboard>
  )
}

export default CustomerAdminView
