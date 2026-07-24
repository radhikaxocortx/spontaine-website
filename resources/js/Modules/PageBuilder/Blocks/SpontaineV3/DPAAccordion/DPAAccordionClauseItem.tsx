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
    <article
      className={
        editMode ? 'space-y-3 border-b border-spontaine-border-subtle pb-6' : 'space-y-2 pb-2'
      }
    >
      {!editMode && (
        <>
          {(clause.item.title.english != null || clause.item.title.malayalam != null) &&
            (clause.item.title.english !== '' || clause.item.title.malayalam !== '') && (
              <h3 className='mb-2 mt-0 font-display text-xl font-semibold leading-tight tracking-[-0.035em] text-spontaine-accent-dark'>
                <Localization
                  text={clause.item.title}
                  language={language}
                />
              </h3>
            )}

          <p className='mb-5 font-body text-[17px] leading-[1.55] text-spontaine-text-primary md:text-[18px]'>
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
              <label className='mb-1 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-spontaine-gray-cool'>
                Clause Title (Optional)
              </label>
              <input
                className='w-full rounded-lg border border-spontaine-border-medium bg-spontaine-light px-3 py-2 font-body text-sm text-spontaine-text-primary focus:border-spontaine-gray-soft focus:outline-none focus:ring-0'
                value={
                  language === 'en'
                    ? (clause.item.title.english ?? '')
                    : (clause.item.title.malayalam ?? '')
                }
                onChange={(e) => onClauseFieldChange(sectionId, clause.id, 'title', e.target.value)}
              />
            </div>
            <div>
              <label className='mb-1 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-spontaine-gray-cool'>
                Number Label (Optional)
              </label>
              <input
                className='w-full rounded-lg border border-spontaine-border-medium bg-spontaine-light px-3 py-2 font-body text-sm text-spontaine-text-primary focus:border-spontaine-gray-soft focus:outline-none focus:ring-0'
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
            <label className='mb-1 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-spontaine-gray-cool'>
              Clause Description (Optional)
            </label>
            <textarea
              className='w-full rounded-lg border border-spontaine-border-medium bg-spontaine-light px-3 py-2 font-body text-sm text-spontaine-text-primary focus:border-spontaine-gray-soft focus:outline-none focus:ring-0'
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
            className='border-t border-spontaine-border-subtle py-3'
          >
            <AccordionTrigger className='py-0 text-left font-body text-[16px] font-semibold text-spontaine-text-primary hover:text-spontaine-accent-dark hover:no-underline [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-spontaine-accent-dark [&[data-state=open]>svg]:rotate-45'>
              {!editMode && (
                <Localization
                  text={accordion.item.title}
                  language={language}
                />
              )}
              {editMode && (
                <div className='w-full pr-4'>
                  <label className='mb-1 block text-left font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-spontaine-gray-cool'>
                    Accordion Title (Optional)
                  </label>
                  <input
                    className='w-full rounded-lg border border-spontaine-border-medium bg-spontaine-light px-3 py-2 font-body text-sm text-spontaine-text-primary focus:border-spontaine-gray-soft focus:outline-none focus:ring-0'
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
                <p className='m-0 pl-4 pt-2 font-body text-[14px] leading-[1.55] text-spontaine-text-secondary'>
                  <Localization
                    text={accordion.item.description}
                    language={language}
                  />
                </p>
              )}
              {editMode && (
                <div className='space-y-2 pt-2'>
                  <label className='mb-1 block text-left font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-spontaine-gray-cool'>
                    Accordion Description (Optional)
                  </label>
                  <textarea
                    className='w-full rounded-lg border border-spontaine-border-medium bg-spontaine-light px-3 py-2 font-body text-sm text-spontaine-text-primary focus:border-spontaine-gray-soft focus:outline-none focus:ring-0'
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
