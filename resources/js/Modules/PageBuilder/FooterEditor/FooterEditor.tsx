import { Button } from '@/components/ui/button'
import { Language } from '@/components/ui/ui_interfaces'
import use419Error from '@/hooks/use419Error'
import {
  BlockImage,
  FooterData,
  ItemListField,
  LinkData,
  PageBlock,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'
import { router } from '@inertiajs/react'
import { useReducer, useState } from 'react'
import BlockEditor from '../Components/BlockEditor/BlockEditor'
import PageBuilderService from '../hooks/pageBuilderService'

export interface FooterDataInterface {
  image?: BlockImage | null
  sectionOne: TextData | null
  sectionTwo: TextData | null
  sectionThree: TextData | null
  sectionFour: TextData | null
  oneLinks?: ItemListField<LinkData>
  twoLinks?: ItemListField<LinkData>
  threeLinks?: ItemListField<LinkData>
  fourLinks?: ItemListField<LinkData>
  twitter?: LinkData
  facebook?: LinkData
  instagram?: LinkData
  youtube?: LinkData
  copyright?: TextData | null
  copyrightLink?: LinkData | null
}

const defaultFooterData: FooterDataInterface = {
  image: null,
  sectionOne: { english: '', malayalam: '' },
  sectionTwo: { english: '', malayalam: '' },
  sectionThree: { english: '', malayalam: '' },
  sectionFour: { english: '', malayalam: '' },
  oneLinks: {
    lastUUID: 0,
    items: [],
  },
  twoLinks: {
    lastUUID: 0,
    items: [],
  },
  threeLinks: {
    lastUUID: 0,
    items: [],
  },
  fourLinks: {
    lastUUID: 0,
    items: [],
  },
}

interface Properties {
  footer: FooterData
}

const getPage = (footer: FooterData | null): PageBlock => {
  let data = defaultFooterData
  if (footer != null && footer.items != null) {
    data = footer.items
  }
  return {
    lastUUID: 1,
    blocks: [
      {
        id: 1,
        blockName: 'Footer',
        position: 1,
        ...data,
      },
    ],
  }
}

const FooterEditor = ({ footer }: Properties) => {
  const [footerData, dispatch] = useReducer(PageBuilderService, getPage(footer))
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en')

  use419Error()

  const saveChanges = () => {
    router.post('/footer-editor', {
      data: footerData.blocks[0],
    } as unknown as FormData)
  }

  const changeLanguage = () => {
    if (selectedLanguage === 'en') {
      setSelectedLanguage('mal')
    } else {
      setSelectedLanguage('en')
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-between gap-5'>
        <Button onClick={saveChanges}>SAVE</Button>
        <Button
          variant='secondary'
          onClick={changeLanguage}
        >
          {selectedLanguage === 'en' ? 'English' : 'Alt Lang'}
        </Button>
      </div>
      {footerData.blocks.length > 0 && (
        <BlockEditor
          block={footerData.blocks[0]}
          dispatch={dispatch}
          language={selectedLanguage}
        />
      )}
    </div>
  )
}

export default FooterEditor
