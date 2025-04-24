import CustomerDashboardLayout from '@/components/Customer/Dashboard/CustomerDashboardLayouts'
import { Customer, PricePlan } from '@/components/Interface/data_interface'
import { Card } from '@/components/ui/card'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import Heading from '@/typography/Heading'
import NormalText from '@/typography/NormalText'
import Paragraph from '@/typography/Paragraph'
import StrongText from '@/typography/StrongText'
import { usePage } from '@inertiajs/react'
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

interface Props {
  pricePlan: PricePlan[]
}

const ChoosePriceplan = ({ pricePlan }: Props) => {
  const userInfo = usePage().props.auth as unknown as { customer: Customer }
  const User = useMemo(() => {
    return userInfo.customer ?? null
  }, [userInfo])
  const customerId = User?.id

  const { formData, setFormValue } = useCustomForm({
    priceplan_id: '',
  })

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      priceplan_id: {
        type: 'select',
        placeholder: 'Select Priceplan',
        label: 'Priceplan',
        list: pricePlan,
        dataKey: 'id',
        displayKey: 'name',

        setValue: (value: string) => {
          setFormValue('priceplan_id')(value)
        },
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue, pricePlan])

  const { post, loading, errors } = useInertiaPost(route('update-priceplan'))
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      post({
        price_plan_id: formData.priceplan_id,
        customer_id: customerId,
      })
    },
    [post, formData, customerId]
  )

  const [selectedPriceplan, setSelectedPriceplan] = useState<PricePlan | null>(null)
  useEffect(() => {
    if (formData.priceplan_id) {
      const selected = pricePlan.find(
        (pricePlan) => pricePlan.id.toString() === formData.priceplan_id
      )
      setSelectedPriceplan(selected ?? null)
    }
  }, [formData.priceplan_id, pricePlan])

  return (
    <>
      <CustomerDashboardLayout>
        <FormBuilder
          loading={loading}
          errors={errors}
          formData={formData}
          formItems={formItems}
          onFormSubmit={handleSubmit}
          buttonText='Next'
          formStyles='items-center p-5'
        >
          <br />
          {selectedPriceplan && (
            <>
              <Card className='w-full p-2'>
                <div className='flex flex-col p-5'>
                  <Heading>{`${selectedPriceplan.name} (${selectedPriceplan.code})`}</Heading>
                  <Paragraph>{selectedPriceplan.description}</Paragraph>
                  <div className='p-3'>
                    <NormalText>
                      Rate : <StrongText>{selectedPriceplan.rate}</StrongText>
                    </NormalText>
                    <br />
                  </div>
                </div>
              </Card>
            </>
          )}
        </FormBuilder>
      </CustomerDashboardLayout>
    </>
  )
}
export default ChoosePriceplan
