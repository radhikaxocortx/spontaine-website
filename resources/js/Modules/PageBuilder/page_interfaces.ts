import { Model } from '@/Components/Interface/data_interface'
import { FooterDataInterface } from '../FooterEditor/FooterEditor'

export const loremIpsum = 'lorem ipsum'
export const placeholderParagraph =
  'Veritatis omnis at minima. Voluptas sunt eos aperiam non minus. Voluptatem voluptas quam amet. ' +
  'Qui enim sit et cumque doloribus facilis neque.Dolores in molestias cum excepturi reiciendis.'

export const placeholderTitle = 'In dicta dolore numquam qui dolor'

export const placeholderImage = {
  url: '/placeholder.jpeg',
  caption: 'placeholder image',
}

export interface Page {
  id: number
  title: string
  page_title: string
  description: string
  url: string
  published: boolean
  type: string
  preview_image: string
  blocks: PageBlock
}

export interface PageDataDependencies {}

export interface RequiredTextData {
  english: string
  malayalam: string | null
}

export interface LinkData {
  link: string | null
  name: TextData
  external: boolean
}

export interface BlockLink extends LinkData {
  id: number
}

export interface TextData {
  english: string | null
  malayalam: string | null
}

export interface PageBlock {
  lastUUID: number
  blocks: Block[]
}

export interface Block extends BlockConfiguration {
  id: number
  position: number
  blockName: string
}

export interface BlockConfiguration {
  paddingTop?: string
  paddingBottom?: string
  marginTop?: string
  marginBottom?: string
  mobileWidth?: string
  tabletWidth?: string
  laptopWidth?: string
  desktopWidth?: string
}

export interface BlockImage {
  url?: string
  caption?: string
}

export interface BlockVideo {
  url?: string
  mime?: string
}

export interface ListItem<T> {
  id: number
  item: T
}

export interface ItemListField<T> {
  lastUUID: number
  items: ListItem<T>[]
}

export interface Image extends Model {
  name: string
  url: string | null
  mime: string
}

export interface Video extends Model {
  name: string
  url: string | null
  mime: string
}

export interface CreateResponse<T> {
  data: {
    created: boolean
    message: string
    record?: T
  }
}
export interface ImageBlock extends BlockConfiguration {
  title: TextData
  description: ItemListField<TextData>
  image?: BlockImage | null
  link?: LinkData | null
  video?: BlockVideo | null
  videoLink?: TextData | null
  date?: TextData
  categoryLink?: LinkData
  category?: TextData
}
export const imageBlock = {
  title: {
    english: placeholderTitle,
    malayalam: placeholderTitle,
  },
  description: {
    lastUUID: 1,
    items: [
      {
        id: 1,
        item: {
          english: placeholderParagraph,
          malayalam: placeholderParagraph,
        },
      },
    ],
  },
  image: placeholderImage,
}

export interface NavSection {
  id: number
  section: RequiredTextData
  lastUUID: number
  links: BlockLink[]
}
export interface NavMenuItem {
  lastUUID: number
  items: NavSection[]
}

export interface NavMenuRecord extends Model {
  section: string
  section_malayalam: string | null
  items: NavMenuItem
  isButton?: boolean
}
export interface FooterData extends Model {
  items: FooterDataInterface
}
