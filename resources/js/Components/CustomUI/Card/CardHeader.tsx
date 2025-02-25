import BreadCrumbs, { BreadcrumbItemLink } from '@/Components/CustomUI/BreadCrumb'
import AddButton from '@/Components/CustomUI/Button/AddButton'
import BackButton from '@/Components/CustomUI/Button/BackButton'
import DeleteButton from '@/Components/CustomUI/Button/DeleteButton'
import EditButton from '@/Components/CustomUI/Button/EditButton'
import Heading from '@/typography/Heading'

interface Props {
  title: string
  backUrl?: string
  addUrl?: string
  editUrl?: string
  deleteUrl?: string | null
  existingUserUrl?: string
  onFolderIconClick?: () => unknown
  onAddClick?: () => unknown
  onBackClick?: () => unknown
  onEditClick?: () => unknown
  onDeleteClick?: () => unknown
  subheading?: string
  breadCrumb?: BreadcrumbItemLink[]
  titleClassName?: string
  isDualHeading?: string
}

export default function CardHeader({
  title,
  backUrl,
  addUrl,
  onAddClick,
  onBackClick,
  editUrl,
  onEditClick,
  deleteUrl,
  onDeleteClick,
  subheading,
  breadCrumb,
  titleClassName,
}: Props) {
  return (
    <div className=''>
      <div className='flex flex-wrap items-center justify-between gap-5 py-4'>
        <div className='flex items-center gap-5'>
          {(backUrl != null || onBackClick != null) && (
            <BackButton
              link={backUrl}
              onClick={onBackClick}
            />
          )}
          <div className='flex flex-col'>
            <Heading className={`${titleClassName}`}>{title}</Heading>

            <BreadCrumbs breadcrumbItems={breadCrumb} />
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          {(editUrl != null || onEditClick != null) && (
            <EditButton
              link={editUrl}
              onClick={onEditClick}
            />
          )}
          {(deleteUrl != null || onDeleteClick != null) && (
            <DeleteButton
              link={deleteUrl}
              onClick={onDeleteClick}
            />
          )}
          {(addUrl != null || onAddClick != null) && (
            <AddButton
              link={addUrl}
              onClick={onAddClick}
            />
          )}
        </div>
      </div>
      <div className=''>{subheading ?? ''}</div>
    </div>
  )
}
