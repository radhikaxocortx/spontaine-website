import { CustomerPricePlan } from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'

interface VerificationCertificateCardProps {
  readonly customerPricePlan: CustomerPricePlan
}

const VerificationCertificateCard = ({ customerPricePlan }: VerificationCertificateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className='mb-8 flex w-full flex-col pt-4'
    >
      <div className='flex w-1/2 flex-col items-center'>
        <div className='mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 shadow-md'>
          <BadgeCheck className='h-8 w-8 text-primary-700' />
        </div>

        <Button
          onClick={() =>
            router.visit(route('verification-details', customerPricePlan.kadodo_i_d?.kadodo_id))
          }
          className=''
          variant='outline'
        >
          Your Certificate
        </Button>
      </div>
    </motion.div>
  )
}

export default VerificationCertificateCard
