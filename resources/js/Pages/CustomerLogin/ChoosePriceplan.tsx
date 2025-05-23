import { Customer, PricePlan } from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import useInertiaPost from '@/hooks/useInertiaPost'
import AppLayout from '@/Layouts/AppLayout'
import NormalText from '@/typography/NormalText'
import Paragraph from '@/typography/Paragraph'
import StrongText from '@/typography/StrongText'
import { usePage } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'

interface Props {
  pricePlan: PricePlan[]
}

const ChoosePriceplan = ({ pricePlan }: Props) => {
  const userInfo = usePage().props.auth as unknown as { customer: Customer }
  const User = useMemo(() => {
    return userInfo.customer ?? null
  }, [userInfo])
  const customerId = User?.id

  const { post } = useInertiaPost(route('update-priceplan'))
  const handleSubmit = useCallback(
    (pricePlan: PricePlan) => {
      post({
        price_plan_id: pricePlan.id,
        customer_id: customerId,
      })
    },
    [post, customerId]
  )

  return (
    <>
      <AppLayout>
        <div className='flex w-full justify-center gap-10 p-4'>
          {pricePlan.map((pricePlan) => (
            <Card
              key={pricePlan.id}
              className='hover:bg-primary-50 hover:shadow-lg'
            >
              <div className='flex flex-col p-4'>
                <StrongText>{`${pricePlan.name} (${pricePlan.code})`}</StrongText>
                <NormalText>{`${pricePlan.rate} / ${pricePlan.validity} months`}</NormalText>
                <Paragraph>{pricePlan.description}</Paragraph>
                <Button
                  onClick={() => handleSubmit(pricePlan)}
                  variant='outline'
                >
                  Select
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </AppLayout>
    </>
  )
}
export default ChoosePriceplan
