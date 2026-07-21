import type {
  Block,
  BlockConfiguration,
  ItemListField,
  LinkData,
  TextData,
} from '../../../page_interfaces'

export type EnquiryKey =
  | 'general_enquiries'
  | 'partner_enquiries'
  | 'investor_enquiries'
  | 'career_enquiries'
  | 'support'
  | 'other'

export type RequiredFieldKey = 'name' | 'email' | 'phone' | 'message'

export interface ContactUsBlockInterface extends Block, BlockConfiguration {
  lineOne?: TextData
  lineTwo?: TextData
  lineThree?: TextData
  iframe?: TextData
  phone?: TextData
  email?: TextData
  backgroundColor?: TextData
  descriptionColor?: TextData
  eyebrow?: TextData
  eyebrowColor?: TextData
  overlapTop?: TextData
  roundedTop?: TextData
  textColor?: TextData
  title?: TextData
  titleOneColor?: TextData
  titleOne?: TextData
  titleTwoColor?: TextData
  titleTwo?: TextData
  mailSubject?: TextData
  receiverMail?: TextData
  description?: ItemListField<TextData>
  twitter?: LinkData
  facebook?: LinkData
  instagram?: LinkData
}

export const enquiryOptions: readonly { key: EnquiryKey; label: string }[] = [
  { key: 'general_enquiries', label: 'General' },
  { key: 'partner_enquiries', label: 'Partnership' },
  { key: 'investor_enquiries', label: 'Investment' },
  { key: 'career_enquiries', label: 'Careers' },
  { key: 'support', label: 'Support' },
  { key: 'other', label: 'Other' },
]

export const fieldClass =
  'w-full rounded-xl border border-neutral-200 bg-spontaine-surface-paper px-4 py-3 font-body text-[15px] text-spontaine-text-primary shadow-sm transition-colors placeholder:text-spontaine-gray-cool focus:border-spontaine-accent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0'
