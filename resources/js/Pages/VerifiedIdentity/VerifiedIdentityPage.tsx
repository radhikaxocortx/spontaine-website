import { CustomerPricePlan } from '@/components/Interface/data_interface'
import AppLayout from '@/Layouts/AppLayout'
import VerifiedIdentityCard from '@/Pages/CustomerLogin/VerifiedIdentityCard'

interface VerifiedIdentityCardProps {
  customerPricePlan: CustomerPricePlan
}

export default function VerifiedIdentityPage({ customerPricePlan }: VerifiedIdentityCardProps) {
  return (
    <AppLayout>
      <VerifiedIdentityCard customerPricePlan={customerPricePlan} />
    </AppLayout>
  )
}
