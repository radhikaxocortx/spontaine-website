import NormalText from '@/typography/NormalText'
import StrongText from '@/typography/StrongText'
import { CustomerWorkflowStatus } from '../Interface/data_interface'

interface Props {
  verificationStatus: CustomerWorkflowStatus
}

const VerificationStatus = ({ verificationStatus }: Props) => {
  return (
    <div className='grid grid-cols-2'>
      <NormalText> Status </NormalText>
      <StrongText>{verificationStatus.status}</StrongText>
      <NormalText>Customer Notes</NormalText>
      <StrongText>{verificationStatus.customer_notes}</StrongText>
      <NormalText>Internal Notes</NormalText>
      <StrongText>{verificationStatus.notes}</StrongText>
    </div>
  )
}

export default VerificationStatus
