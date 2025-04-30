import { KadodoID } from '@/components/Interface/data_interface'
import { Card } from '@/components/ui/card'
import { getDisplayDate } from '@/lib/utils'
import StrongText from '@/typography/StrongText'

interface Props {
  kadodoID: KadodoID
}

const KadodoIdDetails = ({ kadodoID }: Props) => {
  return (
    <Card className='mb-6 p-6'>
      <div className='flex items-center justify-between'>
        <StrongText>Kadodo ID : {kadodoID.kadodo_id}</StrongText>
        <StrongText>Valid From : {getDisplayDate(kadodoID.valid_from)}</StrongText>
        <StrongText>Valid To : {getDisplayDate(kadodoID.valid_to)}</StrongText>
      </div>
    </Card>
  )
}
export default KadodoIdDetails
