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
  workflow_modules: EntityTemplate[]
}

export interface EntityTemplate extends Model {
  workflow_id: number
  sequence: number
  name: string
  description: string | null
  workflow_items: EntityTemplateItem[]
  prev_button: string | null
  next_button: string | null
}

export interface EntityTemplateItem extends Model {
  workflow_module_id: number
  field_number: number
  field_name: string
  type: string
  domain: string | null
  parameter: string | null
  default_value: string | null
  placeholder: string | null
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
  type: string
  min_quantity_required: number
  rate: number
  additional_rate: number | null
}

export interface Country extends Model {
  name: string
  code: string
  description: string
  currency: string
  currency_code: string
  base_cxy_conv_rate: number
  tax_name: string
  tax_code: string
  tax_rate: number
}
