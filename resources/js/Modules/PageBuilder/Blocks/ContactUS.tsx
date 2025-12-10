import FullSpinnerWrapper from '@/components/CustomUI/FullSpinnerWrapper'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import SectionBody from '@/typography/SectionBody'
import SectionDescription from '@/typography/SectionDescription'
import SectionSubheading from '@/typography/SectionSubheading'
import React from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
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
    message: '',
    privacy_policy: false,
    general_enquiries: false,
    partner_enquiries: false,
    investor_enquiries: false,
    career_enquiries: false,
    support: false,
    other: false,
  })

  const { post, loading } = useInertiaPost('/send-contact-mail', {
    showErrorToast: true,
    preserveState: false,
    preserveScroll: true,
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    post({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      privacy_policy: true, // Auto-accept since no checkbox in UI
      subject: blockData?.mailSubject?.english || 'Contact Form Submission',
      receiver_mail: blockData?.receiverMail?.english || 'desk@inboxfx.com',
      general_enquiries: formData.general_enquiries,
      partner_enquiries: formData.partner_enquiries,
      investor_enquiries: formData.investor_enquiries,
      career_enquiries: formData.career_enquiries,
      support: formData.support,
      other: formData.other,
    })
  }

  return (
    <div
      className={`py-8 ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
      style={
        {
          // Hide phone input flags
          '--PhoneInputCountryFlag-display': 'none',
          '--PhoneInputCountryIcon-display': 'none',
        } as React.CSSProperties
      }
    >
      <AppLayoutPadding>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Left Column - Contact Form */}
          <div className='space-y-8'>
            {/* Title and Description */}
            <div className='space-y-4'>
              <SectionSubheading
                theme='light'
                size='2xl'
              >
                <Localization
                  language={language}
                  text={
                    blockData?.title || {
                      english: "Let's level up together.",
                      malayalam: "Let's level up together.",
                    }
                  }
                />
              </SectionSubheading>
              {editMode && onFieldEdit && (
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

              <div className='h-1 w-16 bg-lime-400'></div>

              <div className='space-y-2'>
                {blockData?.description?.items.map((item) => (
                  <SectionDescription
                    key={item.id.toString()}
                    theme='muted'
                    size='medium'
                    maxWidth='4xl'
                    centered={false}
                  >
                    <Localization
                      text={item.item}
                      language={language}
                    />
                    {editMode && onFieldEdit && (
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
                  </SectionDescription>
                )) || (
                  <SectionDescription
                    theme='light'
                    size='medium'
                    maxWidth='4xl'
                    centered={false}
                  >
                    A senior member of of our staff reads every message sent from this interface. We
                    would love to hear from you.
                  </SectionDescription>
                )}
                {editMode && onFieldEdit && (
                  <AddLabel
                    onClick={() => {
                      onFieldEdit({
                        field: 'description',
                        fieldType: 'textItems',
                        oldValue: null,
                        action: 'INSERT',
                      })
                    }}
                    label='Add Description Line'
                  />
                )}
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={onSubmit}
              className='space-y-6'
            >
              {/* Name Field */}
              <div className='space-y-2'>
                <SectionBody
                  theme='light'
                  size='xs'
                  weight='bold'
                  centered={false}
                  className=''
                >
                  Name
                </SectionBody>
                <Input
                  type='text'
                  placeholder='Your name'
                  value={formData.name}
                  onChange={(e) => setFormValue('name')(e.target.value)}
                  className='w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-gray-400 focus:outline-none focus:ring-0'
                  required
                />
              </div>

              {/* Email Field */}
              <div className='space-y-2'>
                <SectionBody
                  theme='light'
                  size='xs'
                  weight='bold'
                  centered={false}
                  className=''
                >
                  Email
                </SectionBody>
                <Input
                  type='email'
                  placeholder='you@company.com'
                  value={formData.email}
                  onChange={(e) => setFormValue('email')(e.target.value)}
                  className='w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-gray-400 focus:outline-none focus:ring-0'
                  required
                />
              </div>

              {/* Phone Field with Country Code */}
              <div className='space-y-2'>
                <SectionBody
                  theme='light'
                  size='xs'
                  weight='bold'
                  centered={false}
                  className=''
                >
                  Phone number
                </SectionBody>
                <PhoneInput
                  placeholder='Enter phone number'
                  value={formData.phone}
                  onChange={(value) => setFormValue('phone')(value || '')}
                  defaultCountry='IN'
                  international
                  countryCallingCodeEditable={false}
                  countrySelectComponent={({ value, onChange, options }) => (
                    <select
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className='flex h-10 w-20 items-center justify-between rounded-l-md border border-gray-300 bg-white px-3 py-3 text-sm focus:border-gray-400 focus:outline-none focus:ring-0'
                    >
                      {options.map(({ value }: { value: string; label: string }) => (
                        <option
                          key={value}
                          value={value}
                        >
                          {value} {/* Shows country code like +1, +91, etc */}
                        </option>
                      ))}
                    </select>
                  )}
                  numberInputProps={{
                    className:
                      'flex h-10 w-full rounded-r-md border border-gray-300 border-l-0 bg-white px-4 py-3 text-sm focus:border-gray-400 focus:outline-none focus:ring-0',
                  }}
                  className='flex w-full'
                />
              </div>

              {/* How can we help field */}
              <div className='space-y-2'>
                <SectionBody
                  theme='light'
                  size='xs'
                  weight='bold'
                  centered={false}
                  className=''
                >
                  How can we help?
                </SectionBody>
                <Textarea
                  placeholder='Tell us how we can help you...'
                  value={formData.message}
                  onChange={(e) => setFormValue('message')(e.target.value)}
                  className='min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-gray-400 focus:outline-none focus:ring-0'
                  required
                />
              </div>

              {/* Enquiries Checkboxes */}
              <div className='space-y-4'>
                <SectionBody
                  theme='light'
                  size='xs'
                  weight='bold'
                  centered={false}
                  className=''
                >
                  Enquiries
                </SectionBody>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='general'
                      checked={formData.general_enquiries}
                      onCheckedChange={(checked) => setFormValue('general_enquiries')(!!checked)}
                    />
                    <SectionBody
                      theme='light'
                      size='xs'
                      weight='bold'
                      centered={false}
                      className=''
                    >
                      <label htmlFor='general'>General Enquiries</label>
                    </SectionBody>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='partner'
                      checked={formData.partner_enquiries}
                      onCheckedChange={(checked) => setFormValue('partner_enquiries')(!!checked)}
                    />
                    <SectionBody
                      theme='light'
                      size='xs'
                      weight='bold'
                      centered={false}
                      className=''
                    >
                      <label htmlFor='partner'>Partner Enquiries</label>
                    </SectionBody>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='investor'
                      checked={formData.investor_enquiries}
                      onCheckedChange={(checked) => setFormValue('investor_enquiries')(!!checked)}
                    />
                    <SectionBody
                      theme='light'
                      size='xs'
                      weight='bold'
                      centered={false}
                      className=''
                    >
                      <label htmlFor='investor'>Investor Enquiries</label>
                    </SectionBody>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='career'
                      checked={formData.career_enquiries}
                      onCheckedChange={(checked) => setFormValue('career_enquiries')(!!checked)}
                    />
                    <SectionBody
                      theme='light'
                      size='xs'
                      weight='bold'
                      centered={false}
                      className=''
                    >
                      <label htmlFor='career'>Career Enquiries</label>
                    </SectionBody>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='support'
                      checked={formData.support}
                      onCheckedChange={(checked) => setFormValue('support')(!!checked)}
                    />
                    <SectionBody
                      theme='light'
                      size='xs'
                      weight='bold'
                      centered={false}
                      className=''
                    >
                      <label htmlFor='support'>Support</label>
                    </SectionBody>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='other'
                      checked={formData.other}
                      onCheckedChange={(checked) => setFormValue('other')(!!checked)}
                    />
                    <SectionBody
                      theme='light'
                      size='xs'
                      weight='bold'
                      centered={false}
                      className=''
                    >
                      <label htmlFor='other'>Other</label>
                    </SectionBody>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className='pt-4 md:pt-20'>
                <FullSpinnerWrapper processing={loading}>
                  <Button
                    type='submit'
                    className='w-full bg-lime-400 text-black hover:bg-lime-500'
                    disabled={
                      !formData.name || !formData.email || !formData.phone || !formData.message
                    }
                  >
                    Send Message
                  </Button>
                </FullSpinnerWrapper>
              </div>
            </form>
          </div>

          {/* Right Column - Content Sections */}
          <div className='space-y-8'>
            {/* Hero Image */}
            <div className='overflow-hidden rounded-lg'>
              <img
                src='/imge/home/contact.png'
                alt='Office meeting'
                className='h-48 w-full object-cover'
              />
            </div>

            {/* For Partners Section */}
            <div className='space-y-4'>
              <SectionSubheading
                theme='light'
                size='large'
                weight='semibold'
                centered={false}
              >
                For Partners
              </SectionSubheading>
              <SectionBody
                theme='gray'
                size='sm'
                weight='normal'
                lineHeight='relaxed'
                centered={false}
              >
                We work closely with system integrators, consultants, and technology partners to
                deliver break-through data-driven transformation to Organizations. Reach out to
                explore partnership opportunities.
              </SectionBody>
            </div>

            {/* For Investors Section */}
            <div className='space-y-4'>
              <SectionSubheading
                theme='light'
                size='large'
                weight='semibold'
                centered={false}
              >
                For Investors
              </SectionSubheading>
              <SectionBody
                theme='gray'
                size='sm'
                weight='normal'
                lineHeight='relaxed'
                centered={false}
              >
                We’re building a platform for a grossly under-served area with exploding demand, and
                strong global potential.
              </SectionBody>
              <SectionBody
                theme='gray'
                size='sm'
                weight='normal'
                lineHeight='relaxed'
                centered={false}
              >
                Connect with us to learn about our vision, traction, and future plans.
              </SectionBody>
            </div>

            {/* Careers Section */}
            <div className='space-y-4'>
              <SectionSubheading
                theme='light'
                size='large'
                weight='semibold'
                centered={false}
              >
                Careers
              </SectionSubheading>
              <SectionBody
                theme='gray'
                size='sm'
                weight='normal'
                lineHeight='relaxed'
                centered={false}
              >
                We’re looking for talented, passionate, self-driven individuals who thrive in
                fast-moving environments. Send us your details - we’d love to hear from you.
              </SectionBody>
            </div>

            {/* Contact Information */}
            <div className='space-y-4 border-t border-gray-200 pt-8'>
              <div className='space-y-2'>
                <p className='text-sm text-gray-600'>Visit us:</p>
                <div className='text-sm text-gray-900'>
                  <SectionBody
                    theme='gray'
                    size='xs'
                    weight='normal'
                    lineHeight='relaxed'
                    centered={false}
                  >
                    9th Floor, Jomer Symphony,
                    <br />
                    Ponnurunni East, Vyttila,
                    <br />
                    Kochi, Kerala 682028
                  </SectionBody>
                </div>
              </div>
              <div className='font-space-grotesk text-sm'>
                <a
                  href='mailto:desk@inboxfx.com'
                  className='text-gray-900 underline hover:text-lime-600'
                >
                  desk@intuonfx.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Mode Controls */}
        {editMode && onFieldEdit && (
          <div className='mt-8 flex w-full flex-wrap gap-4 rounded-lg bg-gray-100 p-4'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium'>Mail Subject:</span>
              <span className='text-sm'>
                <Localization
                  language={language}
                  text={blockData?.mailSubject}
                />
              </span>
              <EditLabel
                label='Edit Mail Subject'
                onClick={() =>
                  onFieldEdit({
                    action: 'INSERT',
                    field: 'mailSubject',
                    fieldType: 'text',
                    oldValue: blockData?.mailSubject,
                  })
                }
              />
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium'>Receiver Email:</span>
              <span className='text-sm'>
                <Localization
                  language={language}
                  text={blockData?.receiverMail}
                />
              </span>
              <EditLabel
                label='Edit Mail Address'
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
          </div>
        )}
      </AppLayoutPadding>
    </div>
  )
}

export default ContactUS
