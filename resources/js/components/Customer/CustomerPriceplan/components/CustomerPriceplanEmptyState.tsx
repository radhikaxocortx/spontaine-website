import { Info } from 'lucide-react'

interface Props {
  type: 'Business' | 'Individual'
}

const CustomerPriceplanEmptyState = ({ type }: Readonly<Props>) => {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-12'>
      <Info className='mb-4 h-12 w-12 text-neutral-400' />
      <h3 className='mb-2 text-lg font-semibold text-neutral-700'>No {type} Verification Plans</h3>
      <p className='max-w-md text-center text-neutral-500'>
        There are currently no {type.toLowerCase()} verification plans associated with this account.
      </p>
    </div>
  )
}

export default CustomerPriceplanEmptyState
