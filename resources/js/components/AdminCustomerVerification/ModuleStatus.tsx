import NormalText from '@/typography/NormalText'
import StrongText from '@/typography/StrongText'
import { ModuleStatusVerification } from '../Interface/data_interface'

interface Props {
  moduleStatus: ModuleStatusVerification | undefined
}

const ModuleStatus = ({ moduleStatus }: Props) => {
  return (
    <div className='grid grid-cols-2'>
      <NormalText> Status </NormalText>
      <StrongText>{moduleStatus?.status}</StrongText>
      <NormalText>Customer Notes</NormalText>
      <StrongText>{moduleStatus?.customer_notes}</StrongText>
      <NormalText>Internal Notes</NormalText>
      <StrongText>{moduleStatus?.internal_notes}</StrongText>
      <NormalText>Allow Updates</NormalText>
      <NormalText>{moduleStatus?.allow_update ? 'Yes' : 'No'}</NormalText>
    </div>
  )
}
export default ModuleStatus
