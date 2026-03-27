import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import { DPAClauseData } from './types'

interface ClauseItem {
  id: number
  item: DPAClauseData
}

interface DPAAccordionClauseItemProperties {
  clause: ClauseItem
  sectionId: number
  editMode: boolean
  language: Language
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

const DPAAccordionClauseItem = ({
  clause,
  sectionId,
  editMode,
  language,
  onClauseFieldChange,
  onRemoveClause,
  onAddAccordion,
  onAccordionFieldChange,
  onRemoveAccordion,
}: DPAAccordionClauseItemProperties) => {
  return (
    <article className={editMode ? 'space-y-3 border-b border-primary-200 pb-6' : 'space-y-2 pb-2'}>
      {!editMode && (
        <>
          {(clause.item.title.english != null || clause.item.title.malayalam != null) &&
            (clause.item.title.english !== '' || clause.item.title.malayalam !== '') && (
              <h3 className='text-spontaine-dpa-accent mb-[5px] mt-0 font-body text-[20px] font-semibold leading-tight'>
                <Localization
                  text={clause.item.title}
                  language={language}
                />
              </h3>
            )}

          <p className='text-spontaine-dpa-title mb-5 font-body text-[19px] leading-[1.5]'>
            {(clause.item.numberLabel.english != null ||
              clause.item.numberLabel.malayalam != null) &&
              (clause.item.numberLabel.english !== '' ||
                clause.item.numberLabel.malayalam !== '') && (
                <strong className='mr-2 font-semibold'>
                  <Localization
                    text={clause.item.numberLabel}
                    language={language}
                  />
                </strong>
              )}
            <Localization
              text={clause.item.description}
              language={language}
            />
          </p>
        </>
      )}

      {editMode && (
        <div className='space-y-3'>
          <div className='grid gap-3 sm:grid-cols-2'>
            <div>
              <label className='mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-primary-900'>
                Clause Title (Optional)
              </label>
              <input
                className='w-full rounded-md border border-primary-300 px-3 py-2 font-body text-sm text-primary-950'
                value={
                  language === 'en'
                    ? (clause.item.title.english ?? '')
                    : (clause.item.title.malayalam ?? '')
                }
                onChange={(e) => onClauseFieldChange(sectionId, clause.id, 'title', e.target.value)}
              />
            </div>
            <div>
              <label className='mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-primary-900'>
                Number Label (Optional)
              </label>
              <input
                className='w-full rounded-md border border-primary-300 px-3 py-2 font-body text-sm text-primary-950'
                value={
                  language === 'en'
                    ? (clause.item.numberLabel.english ?? '')
                    : (clause.item.numberLabel.malayalam ?? '')
                }
                onChange={(e) =>
                  onClauseFieldChange(sectionId, clause.id, 'numberLabel', e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <label className='mb-1 block font-body text-xs font-semibold uppercase tracking-wide text-primary-900'>
              Clause Description (Optional)
            </label>
            <textarea
              className='w-full rounded-md border border-primary-300 px-3 py-2 font-body text-sm text-primary-950'
              rows={4}
              value={
                language === 'en'
                  ? (clause.item.description.english ?? '')
                  : (clause.item.description.malayalam ?? '')
              }
              onChange={(e) =>
                onClauseFieldChange(sectionId, clause.id, 'description', e.target.value)
              }
            />
          </div>

          <div className='flex justify-end'>
            <EditLabel
              label='Remove Clause'
              onClick={() => onRemoveClause(sectionId, clause.id)}
            />
          </div>
        </div>
      )}

      <Accordion
        type='single'
        collapsible
        className='w-full'
      >
        {clause.item.accordions.items.map((accordion) => (
          <AccordionItem
            key={accordion.id}
            value={`${sectionId}-${clause.id}-${accordion.id}`}
            className='border-spontaine-dpa-divider border-t py-[10px]'
          >
            <AccordionTrigger className='text-spontaine-dpa-summary [&>svg]:text-spontaine-dpa-accent py-0 font-body text-[16px] font-semibold hover:no-underline [&>svg]:h-6 [&>svg]:w-6 [&[data-state=open]>svg]:rotate-45'>
              {!editMode && (
                <Localization
                  text={accordion.item.title}
                  language={language}
                />
              )}
              {editMode && (
                <div className='w-full pr-4'>
                  <label className='mb-1 block text-left font-body text-xs font-semibold uppercase tracking-wide text-primary-900'>
                    Accordion Title (Optional)
                  </label>
                  <input
                    className='w-full rounded-md border border-primary-300 px-3 py-2 font-body text-sm text-primary-950'
                    value={
                      language === 'en'
                        ? (accordion.item.title.english ?? '')
                        : (accordion.item.title.malayalam ?? '')
                    }
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      onAccordionFieldChange(
                        sectionId,
                        clause.id,
                        accordion.id,
                        'title',
                        e.target.value
                      )
                    }
                  />
                </div>
              )}
            </AccordionTrigger>
            <AccordionContent>
              {!editMode && (
                <p className='text-spontaine-dpa-muted m-0 pl-[15px] pt-[5px] font-body text-[14px] leading-[1.5]'>
                  <Localization
                    text={accordion.item.description}
                    language={language}
                  />
                </p>
              )}
              {editMode && (
                <div className='space-y-2 pt-2'>
                  <label className='mb-1 block text-left font-body text-xs font-semibold uppercase tracking-wide text-primary-900'>
                    Accordion Description (Optional)
                  </label>
                  <textarea
                    className='w-full rounded-md border border-primary-300 px-3 py-2 font-body text-sm text-primary-950'
                    rows={4}
                    value={
                      language === 'en'
                        ? (accordion.item.description.english ?? '')
                        : (accordion.item.description.malayalam ?? '')
                    }
                    onChange={(e) =>
                      onAccordionFieldChange(
                        sectionId,
                        clause.id,
                        accordion.id,
                        'description',
                        e.target.value
                      )
                    }
                  />
                  <div className='flex justify-end'>
                    <EditLabel
                      label='Remove Accordion'
                      onClick={() => onRemoveAccordion(sectionId, clause.id, accordion.id)}
                    />
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {editMode && (
        <div className='pt-2'>
          <AddLabel
            label='ADD ACCORDION'
            onClick={() => onAddAccordion(sectionId, clause.id)}
          />
        </div>
      )}
    </article>
  )
}

export default DPAAccordionClauseItem
