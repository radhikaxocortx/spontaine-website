import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import DPAAccordionClauseItem from './DPAAccordionClauseItem'
import { DPASectionData } from './types'

interface SectionItem {
  id: number
  item: DPASectionData
}

interface DPAAccordionSectionCardProperties {
  section: SectionItem
  editMode: boolean
  language: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
  onSectionFieldChange: (sectionId: number, value: string) => void
  onRemoveSection: (sectionId: number) => void
  onAddClause: (sectionId: number) => void
  onClauseFieldChange: (
    sectionId: number,
    clauseId: number,
    fieldName: 'title' | 'numberLabel' | 'description',
    value: string
  ) => void
  onRemoveClause: (sectionId: number, clauseId: number) => void
  onAddAccordion: (sectionId: number, clauseId: number) => void
  onAccordionFieldChange: (
    sectionId: number,
    clauseId: number,
    accordionId: number,
    fieldName: 'title' | 'description',
    value: string
  ) => void
  onRemoveAccordion: (sectionId: number, clauseId: number, accordionId: number) => void
}

const DPAAccordionSectionCard = ({
  section,
  editMode,
  language,
  onFieldEdit,
  onSectionFieldChange,
  onRemoveSection,
  onAddClause,
  onClauseFieldChange,
  onRemoveClause,
  onAddAccordion,
  onAccordionFieldChange,
  onRemoveAccordion,
}: DPAAccordionSectionCardProperties) => {
  return (
    <div
      className={
        editMode
          ? 'rounded-2xl border border-spontaine-border-subtle bg-spontaine-surface-paper p-4 shadow-surface sm:p-6'
          : 'w-full rounded-2xl border border-spontaine-border-subtle bg-spontaine-surface-paper p-5 text-left shadow-surface md:p-7'
      }
    >
      <div
        className={
          editMode
            ? 'rounded-xl bg-spontaine-surface-cream px-4 py-5 sm:px-7'
            : 'rounded-xl bg-spontaine-surface-cream px-5 py-6 md:px-7 md:py-8'
        }
      >
        {!editMode && (
          <h2 className='m-0 font-display text-lg font-bold leading-[0.98] tracking-[-0.05em] text-spontaine-text-primary md:text-xl'>
            <Localization
              text={section.item.sectionTitle}
              language={language}
            />
          </h2>
        )}

        {editMode && (
          <div className='space-y-3'>
            <label className='block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-spontaine-gray-cool'>
              Section Title
            </label>
            <textarea
              className='w-full rounded-lg border border-spontaine-border-medium bg-spontaine-light px-3 py-2 font-body text-[18px] text-spontaine-text-primary focus:border-spontaine-gray-soft focus:outline-none focus:ring-0'
              rows={2}
              value={
                language === 'en'
                  ? (section.item.sectionTitle.english ?? '')
                  : (section.item.sectionTitle.malayalam ?? '')
              }
              onChange={(e) => onSectionFieldChange(section.id, e.target.value)}
            />
            <div className='flex items-center justify-between'>
              {onFieldEdit != null && (
                <EditLabel
                  label='Open Text Editor'
                  onClick={() =>
                    onFieldEdit({
                      field: 'sections',
                      oldValue: section.item.sectionTitle,
                      itemField: 'sectionTitle',
                      itemIndex: section.id,
                      fieldType: 'text',
                      action: 'UPDATE',
                    })
                  }
                />
              )}
              <EditLabel
                label='Remove Section'
                onClick={() => onRemoveSection(section.id)}
              />
            </div>
          </div>
        )}
      </div>

      <div className={editMode ? 'space-y-5 px-1 pt-6 sm:px-0' : 'space-y-5 pt-6'}>
        {section.item.clauses.items.map((clause) => (
          <DPAAccordionClauseItem
            key={clause.id}
            clause={clause}
            sectionId={section.id}
            editMode={editMode}
            language={language}
            onClauseFieldChange={onClauseFieldChange}
            onRemoveClause={onRemoveClause}
            onAddAccordion={onAddAccordion}
            onAccordionFieldChange={onAccordionFieldChange}
            onRemoveAccordion={onRemoveAccordion}
          />
        ))}

        {editMode && (
          <div className='pt-2'>
            <AddLabel
              label='ADD CLAUSE'
              onClick={() => onAddClause(section.id)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default DPAAccordionSectionCard
