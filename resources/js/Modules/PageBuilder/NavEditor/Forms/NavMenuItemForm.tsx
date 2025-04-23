import ActionButton from '@/components/CustomUI/FormFields/ActionButton'
import InputCheckBox from '@/components/CustomUI/FormFields/InputCheckBox'
import InputText from '@/components/CustomUI/FormFields/InputText'
import useCustomForm from '@/hooks/useCustomForm'
import { useCallback } from 'react'
import { NavMenu } from '../../page_interfaces'

export interface NavMenuItemFormData {
  position: string
  title: string
  title_malayalam: string
  is_link: boolean
  link?: string
  name?: string
  is_external?: boolean
}

interface Properties {
  onSubmit: (data: NavMenuItemFormData | null) => void
  menuItem?: Pick<
    NavMenu,
    'id' | 'title' | 'title_malayalam' | 'is_link' | 'link_info' | 'position'
  > | null
}

const NavMenuItemForm = ({ onSubmit, menuItem }: Properties) => {
  const { formData, setFormValue, toggleBoolean } = useCustomForm<NavMenuItemFormData>({
    position: menuItem?.position.toString() ?? '0',
    title: menuItem?.title ?? '',
    title_malayalam: menuItem?.title_malayalam ?? '',
    is_link: true,
    link: menuItem?.link_info?.link ?? '',
    name: menuItem?.link_info?.name.english ?? '',
    is_external: menuItem?.link_info?.external ?? false,
  })

  const onFormSubmit = useCallback(() => {
    onSubmit(formData)
  }, [formData, onSubmit])

  return (
    <>
      <div className='flex w-full flex-col p-2'>
        <InputText
          label='Position'
          value={formData.position.toString()}
          setValue={setFormValue('position')}
          error=''
          type='number'
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <InputText
          label='Title'
          value={formData.title}
          setValue={setFormValue('title')}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <InputText
          label='Title (Malayalam)'
          value={formData.title_malayalam}
          setValue={setFormValue('title_malayalam')}
          error=''
        />
      </div>

      <div className='flex w-full flex-col p-2'>
        <InputText
          label='Link'
          value={formData.link ?? ''}
          setValue={setFormValue('link')}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <InputText
          label='Name'
          value={formData.name ?? ''}
          setValue={setFormValue('name')}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <InputCheckBox
          label='Is External Link'
          value={formData.is_external ?? false}
          toggleValue={toggleBoolean('is_external')}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <InputCheckBox
          label='Is Button'
          value={formData.is_link}
          toggleValue={toggleBoolean('is_link')}
          error=''
        />
      </div>

      <div className='flex w-full justify-end gap-x-2 p-2'>
        <ActionButton
          label={menuItem == null ? 'Create' : 'Update'}
          onClick={onFormSubmit}
        />
      </div>
    </>
  )
}

export default NavMenuItemForm
