import BreadCrumbs, { BreadcrumbItemLink } from '@/components/CustomUI/BreadCrumb'
import AddButton from '@/components/CustomUI/Button/AddButton'
import BackButton from '@/components/CustomUI/Button/BackButton'
import DeleteButton from '@/components/CustomUI/Button/DeleteButton'
import EditButton from '@/components/CustomUI/Button/EditButton'
import Heading from '@/typography/Heading'
import SubHeading from '@/typography/SubHeading'

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
      <SubHeading>{subheading ?? ''}</SubHeading>
    </div>
  )
}
