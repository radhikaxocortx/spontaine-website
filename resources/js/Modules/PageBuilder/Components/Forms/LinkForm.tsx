import ActionButton from '@/Components/CustomUI/FormFields/ActionButton'
import InputCheckBox from '@/Components/CustomUI/FormFields/InputCheckBox'
import InputText from '@/Components/CustomUI/FormFields/InputText'
import { LinkData } from '@/Modules/PageBuilder/page_interfaces'
import { useEffect, useState } from 'react'

interface Properties {
  onLink: (data: LinkData | null) => void
  data?: LinkData
  showRemove?: boolean
}

const LinkForm = ({ onLink, data, showRemove = false }: Properties) => {
  const [linkName, setLinkName] = useState('')
  const [malayalamName, setMalayalamName] = useState('')
  const [link, setLink] = useState('')
  const [external, setExternal] = useState(false)

  useEffect(() => {
    if (data != null) {
      setLink(data.link == null ? '' : data.link)
      setLinkName(data.name.english == null ? '' : data.name.english)
      setMalayalamName(data.name.malayalam == null ? '' : data.name.malayalam)
      setExternal(data.external)
    }
  }, [data])

  const addLink = () => {
    onLink({
      name: {
        english: linkName,
        malayalam: malayalamName,
      },
      link,
      external,
    })
  }

  console.log(link)

  return (
    <>
      <div className='flex w-full flex-col p-2'>
        <InputText
          label='English Name'
          value={linkName}
          setValue={setLinkName}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <InputText
          label='Malayalam Name'
          value={malayalamName}
          setValue={setMalayalamName}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <InputText
          label='link'
          value={link}
          setValue={setLink}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <InputCheckBox
          label='Link To Another Website'
          value={external}
          toggleValue={() => setExternal((old) => !old)}
        />
      </div>
      <div className='flex w-full justify-end gap-x-2 p-2'>
        <ActionButton
          label={data == null ? 'ADD' : 'UPDATE'}
          onClick={addLink}
        />
        {showRemove && (
          <ActionButton
            label='REMOVE'
            variant='destructive'
            onClick={() => onLink(null)}
          />
        )}
      </div>
    </>
  )
}

export default LinkForm
