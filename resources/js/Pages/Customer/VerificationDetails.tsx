import {
  CustomerPricePlan,
  KadodoID,
  ModuleStatusVerification,
} from '@/components/Interface/data_interface'
import { getDisplayDate } from '@/lib/utils'

interface Props {
  kadodoId: KadodoID
  customerPriceplan: CustomerPricePlan
  moduleVerification: ModuleStatusVerification
}

const VerificationDetails = ({ kadodoId, customerPriceplan }: Props) => {
  return (
    <div className='p-5'>
      <div>VERIFIED BUSINESS</div>
      <div>KADODO ID : {kadodoId.kadodo_id}</div>
      <div>Organization Name : {customerPriceplan.customer.company?.company_legal_entity_name}</div>
      <div>Customer Name : {customerPriceplan.customer.first_name} </div>
      <div>Verification Type : {customerPriceplan.price_plan.type}</div>
      <div>Valid Upto : {getDisplayDate(kadodoId.valid_to)}</div>
      <div>Verification Status : {customerPriceplan?.verification_status?.status}</div>
    </div>
  )
}
export default VerificationDetails
