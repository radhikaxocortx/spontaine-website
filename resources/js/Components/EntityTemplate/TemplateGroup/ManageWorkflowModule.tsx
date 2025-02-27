import DeleteModal from '@/Components/CustomUI/Modal/DeleteModal'
import Modal from '@/Components/CustomUI/Modal/Modal'
import { EntityTemplate } from '@/Components/Interface/data_interface'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useState } from 'react'
import EntityTemplateUpdateForm from './EntityTemplateUpdateForm'

interface Props {
  module: EntityTemplate[]
}

export default function ManageWorkflowModule({ module }: Readonly<Props>) {
  const [editModal, setEditModal] = useState<EntityTemplate | null>(null)
  const [selectedModule, setSelectedModule] = useState<EntityTemplate | null>(null)

  return (
    <Accordion
      type='single'
      collapsible
    >
      {Array.isArray(module) &&
        module.map((workflowModule) => (
          <AccordionItem
            key={workflowModule.id}
            value={String(workflowModule.id)}
          >
            <AccordionTrigger>
              <div className='flex gap-2'>
                <div className='p-2 text-left'>{workflowModule.sequence}</div>
                <div className='p-2 text-left'>{workflowModule.name}</div>
                <div className='p-2 text-left'>{workflowModule.description}</div>
                <div
                  onClick={() => setEditModal(workflowModule)}
                  className='p-2 text-left'
                >
                  EDIT
                </div>
                <div
                  onClick={() => setSelectedModule(workflowModule)}
                  className='p-2 text-left'
                >
                  DELETE
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p>More details about {workflowModule.name} can go here.</p>
            </AccordionContent>

            {/* Delete Modal */}
            {selectedModule && (
              <DeleteModal
                setShowModal={() => setSelectedModule(null)}
                title={`Delete ${selectedModule?.name ?? ''}`}
                url={selectedModule ? route('entity-templates.destroy', selectedModule.id) : '#'}
              >
                <p>
                  Are you sure you want to delete this Workflow Module? All associated items will
                  also be deleted.
                </p>
              </DeleteModal>
            )}

            {/* Edit Modal */}
            {editModal && (
              <Modal
                setShowModal={() => setEditModal(null)}
                title='Edit Workflow Module'
              >
                <EntityTemplateUpdateForm
                  entityTemplate={editModal}
                  setShowForm={() => setEditModal(null)}
                />
              </Modal>
            )}
          </AccordionItem>
        ))}
    </Accordion>
  )
}

// <div
//   className='flex flex-col gap-2'
//   key={module.id}
// >
//   <div className='flex justify-between'>
//     <div className='flex flex-col'>
//       <h1>
//         # {group.group_number}) {group.name}
//       </h1>
//       <p className='text-xs'>{group.description}</p>
//     </div>
//     <div className='flex justify-end gap-5'>
//       <EditButton onClick={() => setShowEditModal(true)} />
//       <DeleteButton onClick={() => setShowDeleteModal(true)} />
//     </div>
//   </div>
//   <ManageTemplateItems group={group} />
//   {showEditModal && (
//     <Modal
//       setShowModal={setShowEditModal}
//       title='Update Group'
//     >
//       <TemplateGroupUpdateForm
//         group={group}
//         setShowForm={setShowEditModal}
//       />
//     </Modal>
//   )}
//   {showDeleteModal && (
//     <DeleteModal
//       setShowModal={setShowDeleteModal}
//       title={`Delete ${module.name}`}
//       url={route('entity-template.destroy', module.id)}
//     >
//       <p>
//         Are you sure you want to delete this Workflow Module, all associated items will also
//         will be deleted?
//       </p>
//     </DeleteModal>
//   )}
// </div>
