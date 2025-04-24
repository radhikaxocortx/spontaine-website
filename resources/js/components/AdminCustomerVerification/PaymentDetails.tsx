import { getDisplayDate, getTime } from '@/lib/utils'

import NormalText from '@/typography/NormalText'
import StrongText from '@/typography/StrongText'
import { AdminPayment } from '../Interface/data_interface'

interface Props {
  paymentDetails: AdminPayment
}

const PaymentDetails = ({ paymentDetails }: Props) => {
  return (
    <div className='grid grid-cols-2'>
      <NormalText>Amount</NormalText>
      <StrongText>{paymentDetails.amount}</StrongText>
      <NormalText>Payment Method</NormalText>
      <StrongText>{paymentDetails.payment_method}</StrongText>
      <NormalText>Payment Date</NormalText>
      <StrongText>{getDisplayDate(paymentDetails.payment_date)}</StrongText>
      <NormalText>Payment Time</NormalText>
      <StrongText>{getTime(paymentDetails.payment_date)}</StrongText>
      <NormalText>Accounting Reference</NormalText>
      <StrongText>{paymentDetails.accounting_reference}</StrongText>
      <NormalText>Notes</NormalText>
      <StrongText>{paymentDetails.notes}</StrongText>
      <NormalText>Updated By</NormalText>
      <StrongText>{paymentDetails.updated_by.name}</StrongText>
    </div>
  )
}
export default PaymentDetails
