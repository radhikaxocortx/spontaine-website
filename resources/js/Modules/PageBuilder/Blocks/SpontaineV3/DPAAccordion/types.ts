import {
  Block,
  BlockConfiguration,
  ItemListField,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'

export interface DPAAccordionItemData {
  title: TextData
  description: TextData
}

export interface DPAClauseData {
  title: TextData
  numberLabel: TextData
  description: TextData
  accordions: ItemListField<DPAAccordionItemData>
}

export interface DPASectionData {
  sectionTitle: TextData
  clauses: ItemListField<DPAClauseData>
}

export interface DPAAccordionBlockData extends BlockConfiguration, Block {
  backgroundColor?: TextData
  overlapTop?: TextData
  roundedTop?: TextData
  sections: ItemListField<DPASectionData>
  textColor?: TextData
}

export const createEmptyText = (): TextData => ({
  english: '',
  malayalam: '',
})

export const createDefaultAccordionItem = (): DPAAccordionItemData => ({
  title: createEmptyText(),
  description: createEmptyText(),
})

export const createDefaultClause = (): DPAClauseData => ({
  title: createEmptyText(),
  numberLabel: createEmptyText(),
  description: createEmptyText(),
  accordions: {
    lastUUID: 0,
    items: [],
  },
})

export const createDefaultSection = (): DPASectionData => ({
  sectionTitle: {
    english: 'Purpose & Scope',
    malayalam: 'Purpose & Scope',
  },
  clauses: {
    lastUUID: 1,
    items: [
      {
        id: 1,
        item: {
          ...createDefaultClause(),
          title: {
            english: '2. Purpose',
            malayalam: '2. Purpose',
          },
          numberLabel: {
            english: '2.1',
            malayalam: '2.1',
          },
          description: {
            english:
              'The Processor shall process Customer Content, which may include Personal Data, in accordance with this DPA while providing the Services.',
            malayalam:
              'The Processor shall process Customer Content, which may include Personal Data, in accordance with this DPA while providing the Services.',
          },
          accordions: {
            lastUUID: 1,
            items: [
              {
                id: 1,
                item: {
                  title: {
                    english: 'Limited Processing (3.1)',
                    malayalam: 'Limited Processing (3.1)',
                  },
                  description: {
                    english:
                      "The Processor shall process Personal Data only to the extent necessary to provide the Services in accordance with the Agreement, this DPA, and the Controller's documented instructions.",
                    malayalam:
                      "The Processor shall process Personal Data only to the extent necessary to provide the Services in accordance with the Agreement, this DPA, and the Controller's documented instructions.",
                  },
                },
              },
            ],
          },
        },
      },
    ],
  },
})

export const dpaAccordionBlock: Omit<
  DPAAccordionBlockData,
  keyof Block | keyof BlockConfiguration
> = {
  sections: {
    lastUUID: 1,
    items: [
      {
        id: 1,
        item: createDefaultSection(),
      },
    ],
  },
}
