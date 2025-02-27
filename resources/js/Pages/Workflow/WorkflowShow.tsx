import DeleteModal from '@/Components/CustomUI/Modal/DeleteModal'
import { Workflow } from '@/Components/Interface/data_interface'
import ShowResourcePage, { ShowPageItem } from '@/Components/ShowPage/ShowResourcePage'
import { useMemo, useState } from 'react'

interface Props {
  workflow: Workflow
}
const WorkflowShow = ({ workflow }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }
  const displayValues = useMemo(() => {
    return [
      {
        label: ' Name',
        content: workflow.name,
        id: 1,
        type: 'text',
      },
      {
        label: 'Description',
        id: 2,
        content: workflow.description,
        type: 'text',
      },
      {
        label: 'Country',
        content: workflow.country.name,
        id: 3,
        type: 'text',
      },
      {
        label: 'Price Plan ',
        content: workflow.priceplan.name,
        id: 4,
        type: 'text',
      },
      {
        label: 'Status',
        content: workflow.status,
        id: 5,
        type: 'text',
      },
      {
        label: 'Active From',
        content: workflow.active_from,
        id: 6,
        type: 'text',
      },
    ] as ShowPageItem[]
  }, [workflow])
  return (
    <ShowResourcePage
      items={displayValues}
      title={workflow.name}
      editUrl={route('workflow.edit', { workflow: workflow.id })}
      backUrl={route('workflow.index')}
      onDeleteClick={handleDeleteClick}
    >
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          title={`Delete ${workflow.name}`}
          url={route('workflow.destroy', workflow.id)}
        >
          <p>Are you sure you want to delete {workflow.name}?</p>
        </DeleteModal>
      )}
    </ShowResourcePage>
  )
}
export default WorkflowShow
