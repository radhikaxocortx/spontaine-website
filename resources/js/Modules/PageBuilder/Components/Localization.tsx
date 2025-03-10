import { Language } from '@/Components/ui/ui_interfaces'
import { useMemo } from 'react'
import { TextData } from '../page_interfaces'

interface Properties {
  text?: TextData | null
  language?: Language
}

export const displayText = (text?: TextData | null, language = 'en') => {
  if (text == null) {
    return ''
  }
  if (language == 'en') {
    return text.english
  }
  if (text.malayalam == null || text.malayalam === '') {
    return text.english
  }
  return text.malayalam
}

const Localization = ({ text, language = 'en' }: Properties) => {
  const value = useMemo(() => {
    return displayText(text, language)
  }, [text, language])

  return <>{value}</>
}

export default Localization
