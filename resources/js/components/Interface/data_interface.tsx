import { User } from '@/types'

export interface Model {
  id: number
  created_at?: string | null
  updated_at?: string | null
  created_by?: number | null
  updated_by?: number | null
}

export interface ReferenceDataDomain extends Model {
  domain: string
}

export interface ReferenceDataParameter extends Model {
  domain_id: number
  parameter: string
  has_second_value: boolean
  domain: ReferenceDataDomain
}
export interface Workflow extends Model {
  name: string
  description: string
  country: Country
  country_id: number
  priceplan_id: number
  priceplan: PricePlan
  status: string
  active_from: string
  workflow_modules: WorkflowModule[]
}

export interface WorkflowModule extends Model {
  workflow_id: number
  sequence: number
  name: string
  description: string | null
  workflow_items: WorkflowModuleItem[]
  prev_button: string | null
  next_button: string | null
}

export interface WorkflowModuleItem extends Model {
  workflow_module_id: number
  field_number: number
  field_name: string
  external_field_name: string | null
  type: string
  domain: string | null
  parameter: string | null
  default_value: string | null
  placeholder: string | null
}

export interface WorflowFormItem extends WorkflowModuleItem {
  value: string | string[]
  file: File | null
}
export interface ReferenceData extends Model {
  domain_id: number
  parameter_id: number
  domain: string
  parameter: string
  sort_order: number
  value_one: string
  value_two: string | null
}

export interface PricePlan extends Model {
  name: string
  code: string
  description: string
  validity: number
  type: string
  min_quantity_required: number
  rate: number
}

export interface Country extends Model {
  name: string
  code: string
  description: string
  currency: string
  currency_code: string
  currency_symbol: string
  base_cxy_conv_rate: number
  tax_name: string
  tax_code: string
  tax_rate: number
}

export interface Customer extends Model {
  first_name: string
  last_name: string
  telephone: string
  address_line_1: string
  address_line_2: string
  city: string
  country: string
  postal_code: string
  email: string
  password: string
  company_id: number
  email_verified: boolean
  company: CustomerOrganization
}

export interface CustomerOrganization extends Model {
  company_legal_entity_name: string
  company_address_line_1: string
  company_address_line_2: string
  company_city: string
  company_postal_code: string
  company_country: string
  company_tax_id: string
  company_registration_id: string
}

export interface CustomerPricePlan extends Model {
  customer_id: number
  priceplan_id: number
  price_plan: PricePlan
  kadodo_id: string
  customer: Customer
  verification_status?: CustomerWorkflowStatus
  payment_details?: AdminPayment
  kadodo_i_d?: KadodoID
}

export interface KadodoID extends Model {
  customer_priceplan_id: number
  kadodo_id: string
  valid_from: string
  valid_to: string
}

export interface WorkflowItem extends Model {
  workflow_item_id: number
  value: string | null
  number_value: number | null
  date_value: string | null
  mime_type: string | null
}

export interface CustomerPriceplanWorkflowItem extends WorkflowItem {
  customer_priceplan_id: number
}

export interface ModuleStatusVerification extends Model {
  customer_workflow_id: number
  module_id: number
  status: string
  customer_notes: string
  internal_notes: string
  verification_date: string
  allow_update: boolean
  customer_updated: boolean
}

export interface CustomerWorkflowStatus extends Model {
  customer_workflow_id: number
  status: string
  notes: string
  customer_notes: string
  status_date: string
  mark_as_updated: boolean
}

export interface AdminPayment extends Omit<Model, 'updated_by'> {
  customer_workflow_id: number
  amount: number
  payment_method: string
  notes: string
  payment_date: string
  accounting_reference: string
  updated_by: User
}

export interface PersonalInfo {
  first_name: string
  last_name: string
  telephone: string
  email: string
}

export interface AddressDetail {
  address_line1: string
  address_line2: string
  city: string
  country: string
  postal_code: string
  have_company: boolean
}

export interface CompanyInfo {
  company_legal_entity_name: string
  company_address_line1: string
  company_address_line2: string
  company_city: string
  company_country: string
  company_postal_code: string
  company_tax_id: string
  company_registration_id: string
}
