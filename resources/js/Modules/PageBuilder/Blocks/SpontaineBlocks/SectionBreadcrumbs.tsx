import BreadCrumb from '@/components/CustomUI/Breadcrumb/BreadCrumb'
import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import { BlockConfiguration, ItemListField, LinkData } from '../../page_interfaces'

export interface SectionBreadcrumbsData extends BlockConfiguration {
  links: ItemListField<LinkData>
}

export const breadcrumbsData: SectionBreadcrumbsData = {
  links: {
    lastUUID: 0,
    items: [],
  },
}

interface Properties {
  block?: SectionBreadcrumbsData
  editMode?: boolean
  language?: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const SectionBreadcrumbs = ({ block, editMode, language, onFieldEdit }: Properties) => {
  return (
    <AppLayoutPadding>
      {block != null && (
        <div
          className={`flex flex-col gap-4 py-4 ${block?.marginTop} ${block?.marginBottom} ${block?.paddingTop} ${block?.paddingBottom} `}
        >
          <BreadCrumb
            links={block.links}
            editMode={editMode}
            onFieldEdit={onFieldEdit}
            language={language}
          />
          {editMode && onFieldEdit != null && (
            <div className='flex'>
              <div className='flex flex-col'>
                <AddLabel
                  label='ADD LINK'
                  onClick={() =>
                    onFieldEdit({
                      field: 'links',
                      fieldType: 'links',
                      oldValue: null,
                      action: 'INSERT',
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </AppLayoutPadding>
  )
}

export default SectionBreadcrumbs
