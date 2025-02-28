import DeleteModal from '@/Components/CustomUI/Modal/DeleteModal'
import Modal from '@/Components/CustomUI/Modal/Modal'
import EntityTemplateCreate from '@/Components/EntityTemplate/TemplateGroup/EntityTemplateCreate'
import ManageWorkflowModule from '@/Components/EntityTemplate/TemplateGroup/ManageWorkflowModule'
import { Workflow } from '@/Components/Interface/data_interface'
import ShowResourcePage, { ShowPageItem } from '@/Components/ShowPage/ShowResourcePage'
import { Button } from '@/components/ui/button'
import { useMemo, useState } from 'react'
interface Props {
  workflow: Workflow
}
const WorkflowShow = ({ workflow }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [addWorkflowModuleModal, setAddWorkflowModuleModal] = useState(false)

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }
  const handleAddWorkflowModule = () => {
    setAddWorkflowModuleModal(true)
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
      <div className='ml-auto p-3'>
        <Button
          variant='secondary'
          onClick={handleAddWorkflowModule}
        >
          Add Workflow Module
        </Button>
      </div>
      {workflow.workflow_modules && (
        <div>
          <ManageWorkflowModule module={workflow.workflow_modules} />
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          title={`Delete ${workflow.name}`}
          url={route('workflow.destroy', workflow.id)}
        >
          <p>Are you sure you want to delete {workflow.name}?</p>
        </DeleteModal>
      )}
      {addWorkflowModuleModal && (
        <Modal
          setShowModal={setAddWorkflowModuleModal}
          title={`Add Workflow Module`}
        >
          <EntityTemplateCreate
            workflowId={workflow.id}
            setShowForm={setAddWorkflowModuleModal}
          />
        </Modal>
      )}
    </ShowResourcePage>
  )
}
export default WorkflowShow
