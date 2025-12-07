import { Model } from '@/components/Interface/data_interface'
import { FooterDataInterface } from '@/Modules/PageBuilder/FooterEditor/FooterEditor'

export const loremIpsum = 'lorem ipsum'
export const placeholderParagraph =
  'Veritatis omnis at minima. Voluptas sunt eos aperiam non minus. Voluptatem voluptas quam amet. ' +
  'Qui enim sit et cumque doloribus facilis neque.Dolores in molestias cum excepturi reiciendis.'

export const placeholderTitle = 'In dicta dolore numquam qui dolor'

export const placeholderImage = {
  url: '/placeholder.jpeg',
  caption: 'placeholder image',
}

export interface Page extends Model {
  title: string
  page_title: string
  description: string
  url: string
  published: boolean
  featured: boolean
  type: 'Page' | 'Blog' | 'Article' | 'Opinion'
  preview_image: string
  preview_video?: string
  author?: string
  blocks: PageBlock
}

export interface PageDataDependencies {}

export interface RequiredTextData {
  english: string
  malayalam: string | null
}

export interface NavLinkMedia {
  type?: 'image' | 'video' | null
  source?: 'upload' | 'url' | null
  pathOrUrl?: string | null
  thumbnail?: string | null
}

export interface LinkData {
  link: string | null
  name: TextData
  external: boolean
  description?: TextData | null
  media?: NavLinkMedia | null
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

export interface NavSectionLinks {
  id: number
  section: RequiredTextData
  lastUUID: number
  links: BlockLink[]
}

export interface NavMenuSection {
  lastUUID: number
  items: NavSectionLinks[]
}

export interface NavMenu extends Model {
  title: string
  title_malayalam: string | null
  items: NavMenuSection
  is_link: 1 | 0
  link_info: LinkData | null
  position: number
}

export interface FooterData extends Model {
  items: FooterDataInterface
}
