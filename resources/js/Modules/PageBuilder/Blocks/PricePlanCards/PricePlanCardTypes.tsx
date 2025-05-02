import {
  Block,
  BlockConfiguration,
  ItemListField,
  LinkData,
  RequiredTextData,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'

export interface PricePlanCard {
  id?: number
  name: TextData
  price: TextData
  duration: TextData
  billing: TextData
  link: LinkData
  features: ItemListField<RequiredTextData>
  isPopular: boolean
}

export interface PricePlanBlock extends Block, BlockConfiguration {
  title: TextData
  description: TextData
  actions: ItemListField<PricePlanCard>
}

export const defaultPricePlanBlock = {
  description: { english: 'In dicta dolore numquam qui dolor', malayalam: '' },
  title: { english: 'lorem ipsum', malayalam: '' },
  actions: {
    lastUUID: 0,
    items: [],
  },
}

export const defaultPricePlanCard: PricePlanCard = {
  name: { english: 'Basic Plan', malayalam: '' },
  price: { english: 'GH₵10', malayalam: '' },
  duration: { english: 'month', malayalam: '' },
  billing: { english: 'Billed Annually', malayalam: '' },
  link: {
    external: false,
    link: '',
    name: { english: 'Get Started', malayalam: '' },
  },
  features: {
    lastUUID: 1,
    items: [
      {
        id: 1,
        item: {
          english: 'Access to all basic features',
          malayalam: '',
        },
      },
    ],
  },
  isPopular: false,
}
