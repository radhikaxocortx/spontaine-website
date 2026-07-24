import { ItemListField, TextData } from '@/Modules/PageBuilder/page_interfaces'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import {
  createDefaultAccordionItem,
  createDefaultClause,
  createDefaultSection,
  DPASectionData,
} from './types'

type ClauseFieldName = 'title' | 'numberLabel' | 'description'
type AccordionFieldName = 'title' | 'description'

interface DPAAccordionHandlersParams {
  sections?: ItemListField<DPASectionData>
  language: Language
  onSectionsChange: (sections: ItemListField<DPASectionData>) => void
}

interface DPAAccordionHandlers {
  onSectionFieldChange: (sectionId: number, value: string) => void
  onClauseFieldChange: (
    sectionId: number,
    clauseId: number,
    fieldName: ClauseFieldName,
    value: string
  ) => void
  onAccordionFieldChange: (
    sectionId: number,
    clauseId: number,
    accordionId: number,
    fieldName: AccordionFieldName,
    value: string
  ) => void
  addSection: () => void
  removeSection: (sectionId: number) => void
  addClause: (sectionId: number) => void
  removeClause: (sectionId: number, clauseId: number) => void
  addAccordion: (sectionId: number, clauseId: number) => void
  removeAccordion: (sectionId: number, clauseId: number, accordionId: number) => void
}

const withLanguageValue = (text: TextData, language: Language, value: string): TextData => {
  return {
    english: language === 'en' ? value : text.english,
    malayalam: language === 'mal' ? value : text.malayalam,
  }
}

export const createDPAAccordionHandlers = ({
  sections,
  language,
  onSectionsChange,
}: DPAAccordionHandlersParams): DPAAccordionHandlers => {
  const onSectionFieldChange: DPAAccordionHandlers['onSectionFieldChange'] = (sectionId, value) => {
    if (sections == null) {
      return
    }

    onSectionsChange({
      ...sections,
      items: sections.items.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              item: {
                ...section.item,
                sectionTitle: withLanguageValue(section.item.sectionTitle, language, value),
              },
            }
          : section
      ),
    })
  }

  const onClauseFieldChange: DPAAccordionHandlers['onClauseFieldChange'] = (
    sectionId,
    clauseId,
    fieldName,
    value
  ) => {
    if (sections == null) {
      return
    }

    onSectionsChange({
      ...sections,
      items: sections.items.map((section) => {
        if (section.id !== sectionId) {
          return section
        }

        return {
          ...section,
          item: {
            ...section.item,
            clauses: {
              ...section.item.clauses,
              items: section.item.clauses.items.map((clause) =>
                clause.id === clauseId
                  ? {
                      ...clause,
                      item: {
                        ...clause.item,
                        [fieldName]: withLanguageValue(clause.item[fieldName], language, value),
                      },
                    }
                  : clause
              ),
            },
          },
        }
      }),
    })
  }

  const onAccordionFieldChange: DPAAccordionHandlers['onAccordionFieldChange'] = (
    sectionId,
    clauseId,
    accordionId,
    fieldName,
    value
  ) => {
    if (sections == null) {
      return
    }

    onSectionsChange({
      ...sections,
      items: sections.items.map((section) => {
        if (section.id !== sectionId) {
          return section
        }

        return {
          ...section,
          item: {
            ...section.item,
            clauses: {
              ...section.item.clauses,
              items: section.item.clauses.items.map((clause) => {
                if (clause.id !== clauseId) {
                  return clause
                }

                return {
                  ...clause,
                  item: {
                    ...clause.item,
                    accordions: {
                      ...clause.item.accordions,
                      items: clause.item.accordions.items.map((accordion) =>
                        accordion.id === accordionId
                          ? {
                              ...accordion,
                              item: {
                                ...accordion.item,
                                [fieldName]: withLanguageValue(
                                  accordion.item[fieldName],
                                  language,
                                  value
                                ),
                              },
                            }
                          : accordion
                      ),
                    },
                  },
                }
              }),
            },
          },
        }
      }),
    })
  }

  const addSection: DPAAccordionHandlers['addSection'] = () => {
    if (sections == null) {
      return
    }

    onSectionsChange({
      ...sections,
      lastUUID: sections.lastUUID + 1,
      items: [
        ...sections.items,
        {
          id: sections.lastUUID + 1,
          item: createDefaultSection(),
        },
      ],
    })
  }

  const removeSection: DPAAccordionHandlers['removeSection'] = (sectionId) => {
    if (sections == null) {
      return
    }

    onSectionsChange({
      ...sections,
      items: sections.items.filter((section) => section.id !== sectionId),
    })
  }

  const addClause: DPAAccordionHandlers['addClause'] = (sectionId) => {
    if (sections == null) {
      return
    }

    onSectionsChange({
      ...sections,
      items: sections.items.map((section) => {
        if (section.id !== sectionId) {
          return section
        }

        const clauses = section.item.clauses

        return {
          ...section,
          item: {
            ...section.item,
            clauses: {
              ...clauses,
              lastUUID: clauses.lastUUID + 1,
              items: [
                ...clauses.items,
                {
                  id: clauses.lastUUID + 1,
                  item: createDefaultClause(),
                },
              ],
            },
          },
        }
      }),
    })
  }

  const removeClause: DPAAccordionHandlers['removeClause'] = (sectionId, clauseId) => {
    if (sections == null) {
      return
    }

    onSectionsChange({
      ...sections,
      items: sections.items.map((section) => {
        if (section.id !== sectionId) {
          return section
        }

        return {
          ...section,
          item: {
            ...section.item,
            clauses: {
              ...section.item.clauses,
              items: section.item.clauses.items.filter((clause) => clause.id !== clauseId),
            },
          },
        }
      }),
    })
  }

  const addAccordion: DPAAccordionHandlers['addAccordion'] = (sectionId, clauseId) => {
    if (sections == null) {
      return
    }

    onSectionsChange({
      ...sections,
      items: sections.items.map((section) => {
        if (section.id !== sectionId) {
          return section
        }

        return {
          ...section,
          item: {
            ...section.item,
            clauses: {
              ...section.item.clauses,
              items: section.item.clauses.items.map((clause) => {
                if (clause.id !== clauseId) {
                  return clause
                }

                const accordions = clause.item.accordions

                return {
                  ...clause,
                  item: {
                    ...clause.item,
                    accordions: {
                      ...accordions,
                      lastUUID: accordions.lastUUID + 1,
                      items: [
                        ...accordions.items,
                        {
                          id: accordions.lastUUID + 1,
                          item: createDefaultAccordionItem(),
                        },
                      ],
                    },
                  },
                }
              }),
            },
          },
        }
      }),
    })
  }

  const removeAccordion: DPAAccordionHandlers['removeAccordion'] = (
    sectionId,
    clauseId,
    accordionId
  ) => {
    if (sections == null) {
      return
    }

    onSectionsChange({
      ...sections,
      items: sections.items.map((section) => {
        if (section.id !== sectionId) {
          return section
        }

        return {
          ...section,
          item: {
            ...section.item,
            clauses: {
              ...section.item.clauses,
              items: section.item.clauses.items.map((clause) => {
                if (clause.id !== clauseId) {
                  return clause
                }

                return {
                  ...clause,
                  item: {
                    ...clause.item,
                    accordions: {
                      ...clause.item.accordions,
                      items: clause.item.accordions.items.filter(
                        (accordion) => accordion.id !== accordionId
                      ),
                    },
                  },
                }
              }),
            },
          },
        }
      }),
    })
  }

  return {
    onSectionFieldChange,
    onClauseFieldChange,
    onAccordionFieldChange,
    addSection,
    removeSection,
    addClause,
    removeClause,
    addAccordion,
    removeAccordion,
  }
}
