import FullSpinnerWrapper from '@/components/CustomUI/FullSpinnerWrapper'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import HeroHeadline from '@/typography/HeroHeadline'
import HeroTextBlock from '@/typography/HeroTextBlock'
import React from 'react'
import useCustomForm from '../../../hooks/useCustomForm'
import useInertiaPost from '../../../hooks/useInertiaPost'
import AddLabel from '../Components/AddLabel'
import { BlocKFieldInfo } from '../Components/BlockEditor/BlockEditor'
import EditLabel from '../Components/EditLabel'
import Localization from '../Components/Localization'
import { BlockConfiguration, ItemListField, LinkData, TextData } from '../page_interfaces'

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: ContactUsBlockInterface
  language?: Language
}

export interface ContactUsBlockInterface extends BlockConfiguration {
  lineOne?: TextData
  lineTwo?: TextData
  lineThree?: TextData
  iframe?: TextData
  phone?: TextData
  email?: TextData
  title?: TextData
  titleOne?: TextData
  titleTwo?: TextData
  mailSubject?: TextData
  receiverMail?: TextData
  description?: ItemListField<TextData>
  twitter?: LinkData
  facebook?: LinkData
  instagram?: LinkData
}

const ContactUS = ({ editMode = false, onFieldEdit, blockData, language = 'en' }: Properties) => {
  const { formData, setFormValue } = useCustomForm({
    name: '',
    email: '',
    phone: '',
    about: '',
    message: '',
    privacy_policy: false,
  })

  const aboutOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'other', label: 'Other' },
  ]

  const { post, loading } = useInertiaPost('/send-contact-mail', {
    showErrorToast: true,
    preserveState: false,
    preserveScroll: true,
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post({
      ...formData,
      subject: blockData?.mailSubject?.english,
      receiver_mail: blockData?.receiverMail?.english,
    })
  }

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      <AppLayoutPadding>
        <div className='flex w-full flex-col items-center justify-center gap-6'>
          <div className='flex flex-col items-start justify-between sm:gap-8 md:flex-row md:gap-0 2xl:items-start 2xl:gap-12'>
            <div className='flex w-full flex-col gap-6 text-left 2xl:gap-10'>
              <HeroHeadline className='w-full text-primary-950 md:w-3/4 2xl:w-2/3'>
                <Localization
                  language={language}
                  text={blockData?.title}
                />
                {editMode && onFieldEdit != null && (
                  <EditLabel
                    label='Edit Title'
                    onClick={() =>
                      onFieldEdit({
                        action: 'INSERT',
                        field: 'title',
                        fieldType: 'text',
                        oldValue: blockData?.title,
                      })
                    }
                  />
                )}
              </HeroHeadline>
              <div className='flex w-full flex-col gap-4 md:w-3/4 2xl:w-2/3'>
                {blockData?.description?.items.map((item) => (
                  <HeroTextBlock
                    className='text-neutral-graige-600'
                    key={item.id.toString()}
                  >
                    <Localization
                      text={item.item}
                      language={language}
                    />
                    {editMode && onFieldEdit != null && (
                      <EditLabel
                        onClick={() => {
                          onFieldEdit({
                            field: 'description',
                            fieldType: 'textItems',
                            oldValue: item.item,
                            action: 'UPDATE',
                            itemIndex: item.id,
                          })
                        }}
                      />
                    )}
                  </HeroTextBlock>
                ))}
                {editMode && onFieldEdit != null && (
                  <AddLabel
                    onClick={() => {
                      onFieldEdit({
                        field: 'description',
                        fieldType: 'textItems',
                        oldValue: null,
                        action: 'INSERT',
                      })
                    }}
                    label='Add Subtitle Line'
                  />
                )}
              </div>
            </div>
            <form
              onSubmit={onSubmit}
              className='mt-5 flex w-full flex-col items-start justify-start space-y-4 md:mt-0 md:space-y-6 2xl:w-1/2'
            >
              <div className='flex w-full flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Full Name</label>
                  <Input
                    type='text'
                    placeholder='Enter your full name'
                    value={formData.name}
                    onChange={(e) => setFormValue('name')(e.target.value)}
                    className='w-full'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Email</label>
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={(e) => setFormValue('email')(e.target.value)}
                    className='w-full'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Phone</label>
                  <Input
                    type='text'
                    placeholder='Enter your phone'
                    value={formData.phone}
                    onChange={(e) => setFormValue('phone')(e.target.value)}
                    className='w-full'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>About</label>
                  <Select
                    value={formData.about}
                    onValueChange={(value) => setFormValue('about')(value)}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select an option' />
                    </SelectTrigger>
                    <SelectContent>
                      {aboutOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Message</label>
                  <Textarea
                    placeholder='Enter your message'
                    value={formData.message}
                    onChange={(e) => setFormValue('message')(e.target.value)}
                    className='min-h-[120px] w-full'
                  />
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='privacy-policy'
                  checked={formData.privacy_policy}
                  onCheckedChange={(checked) => setFormValue('privacy_policy')(!!checked)}
                />
                <label
                  htmlFor='privacy-policy'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  You agree to our{' '}
                  <a
                    href='/privacy-policy'
                    className='text-primary-700 hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    friendly privacy policy
                  </a>
                </label>
              </div>
              <FullSpinnerWrapper processing={loading}>
                <Button
                  className='w-full'
                  type='submit'
                  disabled={!formData.privacy_policy}
                  variant='default'
                >
                  Submit
                </Button>
              </FullSpinnerWrapper>
            </form>
          </div>
        </div>
        {editMode && onFieldEdit != null && (
          <div className='flex w-full flex-wrap gap-4'>
            <span>
              <Localization
                language={language}
                text={blockData?.mailSubject}
              />
            </span>
            <EditLabel
              label='Mail Subject'
              onClick={() =>
                onFieldEdit({
                  action: 'INSERT',
                  field: 'mailSubject',
                  fieldType: 'text',
                  oldValue: blockData?.mailSubject,
                })
              }
            />
            <span>
              <Localization
                language={language}
                text={blockData?.receiverMail}
              />
            </span>
            <EditLabel
              label='Mail Address'
              onClick={() =>
                onFieldEdit({
                  action: 'INSERT',
                  field: 'receiverMail',
                  fieldType: 'text',
                  oldValue: blockData?.receiverMail,
                })
              }
            />
          </div>
        )}
      </AppLayoutPadding>
    </div>
  )
}

export default ContactUS
