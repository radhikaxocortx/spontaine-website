import { Model } from '@/Components/Interface/data_interface'

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

export interface CreateResponse<T> {
  data: {
    created: boolean
    message: string
    record?: T
  }
}
