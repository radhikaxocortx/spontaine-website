import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import { ItemListField, LinkData } from '@/Modules/PageBuilder/page_interfaces'
import { Language } from '@/components/ui/ui_interfaces'

export interface BreadCrumbLink {
  name: string
  link: string | null
}

interface Properties {
  links: ItemListField<LinkData>
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
}

const BreadCrumb = ({ links, editMode, onFieldEdit, language = 'en' }: Properties) => {
  const linksLength = links.items.length

  return (
    <div>
      {links.items.map((link, index) => {
        return (
          <span
            className='font-space-grotesk text-xs'
            key={link.id.toString()}
          >
            <InertiaLink
              link={link.item}
              className='mdButtonText text-slate-600 hover:text-lime-700 hover:underline'
            />
            {editMode && onFieldEdit != null && (
              <EditLabel
                onClick={() =>
                  onFieldEdit({
                    field: 'links',
                    fieldType: 'links',
                    oldValue: link.item,
                    action: 'UPDATE',
                    itemIndex: link.id,
                  })
                }
              />
            )}
            {index === linksLength - 1 ? '  ' : ' / '}
          </span>
        )
      })}
    </div>
  )
}

export default BreadCrumb
