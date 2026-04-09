import FullSpinnerWrapper from '@/components/CustomUI/FullSpinnerWrapper'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import CountrySelect from '@/components/ui/country-select'
import { Input } from '@/components/ui/input'
import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import SectionBody from '@/typography/SectionBody'
import SectionDescription from '@/typography/SectionDescription'
import SectionSubheading from '@/typography/SectionSubheading'
import React from 'react'
import useCustomForm from '../../../hooks/useCustomForm'
import useInertiaPost from '../../../hooks/useInertiaPost'
import AddLabel from '../Components/AddLabel'
import { BlocKFieldInfo } from '../Components/BlockEditor/BlockEditor'
import EditLabel from '../Components/EditLabel'
import Localization from '../Components/Localization'
import {
  BlockConfiguration,
  BlockImage,
  ItemListField,
  LinkData,
  TextData,
} from '../page_interfaces'

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: LeadCaptureBlockInterface
  language?: Language
}

export interface LeadCaptureBlockInterface extends BlockConfiguration {
  backgroundImage?: BlockImage
  modalBackgroundImage?: BlockImage
  leftTitle?: TextData
  leftDescription?: ItemListField<TextData>
  rightTitle?: TextData
  submitButton?: LinkData
  privacyStatement?: TextData
  mailSubject?: TextData
  receiverMail?: TextData
}

export const leadCaptureBlock: LeadCaptureBlockInterface = {
  backgroundImage: {
    url: '/imge/home/contact.png',
    caption: 'Lead capture background',
  },
  modalBackgroundImage: {
    url: '/imge/home/contact.png',
    caption: 'Lead capture modal background',
  },
  leftTitle: {
    english: 'Grab This Report Now',
    malayalam: 'Grab This Report Now',
  },
  leftDescription: {
    lastUUID: 1,
    items: [
      {
        id: 1,
        item: {
          english:
            'Unlock practical insights from our latest report. Share your details and get instant access.',
          malayalam:
            'Unlock practical insights from our latest report. Share your details and get instant access.',
        },
      },
    ],
  },
  rightTitle: {
    english: 'Download Report',
    malayalam: 'Download Report',
  },
  submitButton: {
    name: {
      english: 'Download Report',
      malayalam: 'Download Report',
    },
    link: null,
    external: false,
  },
  privacyStatement: {
    english: 'I agree to the privacy policy and consent to being contacted.',
    malayalam: 'I agree to the privacy policy and consent to being contacted.',
  },
  mailSubject: {
    english: 'Lead Capture Form Submission',
    malayalam: 'Lead Capture Form Submission',
  },
  receiverMail: {
    english: 'desk@intuonfx.com',
    malayalam: 'desk@intuonfx.com',
  },
}

const LeadCapture = ({ editMode = false, onFieldEdit, blockData, language = 'en' }: Properties) => {
  const [focusedField, setFocusedField] = React.useState<
    'name' | 'businessEmail' | 'organization' | null
  >(null)
  const [showDownloadModal, setShowDownloadModal] = React.useState(false)

  const { formData, setFormValue } = useCustomForm({
    name: '',
    businessEmail: '',
    organization: '',
    country: '',
    privacyPolicy: false,
  })

  const resolveDownloadFileName = React.useCallback(
    (headerValue: string | null, fallback: string) => {
      if (headerValue == null || headerValue.trim() === '') {
        return fallback
      }

      const encodedMatch = headerValue.match(/filename\*=UTF-8''([^;]+)/i)

      if (encodedMatch?.[1]) {
        try {
          return decodeURIComponent(encodedMatch[1])
        } catch {
          return fallback
        }
      }

      const regularMatch = headerValue.match(/filename="?([^";]+)"?/i)

      return regularMatch?.[1] ? regularMatch[1] : fallback
    },
    []
  )

  const resolveExtensionFromContentType = React.useCallback((contentType: string): string => {
    const normalized = contentType.toLowerCase()

    if (normalized.includes('application/pdf')) return 'pdf'
    if (normalized.includes('application/msword')) return 'doc'
    if (
      normalized.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    ) {
      return 'docx'
    }
    if (normalized.includes('application/vnd.ms-excel')) return 'xls'
    if (normalized.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      return 'xlsx'
    }
    if (normalized.includes('text/plain')) return 'txt'

    return ''
  }, [])

  const shouldHandleDownloadInApp = React.useCallback((downloadLink: string): boolean => {
    try {
      const parsed = new URL(downloadLink, window.location.origin)

      if (parsed.origin !== window.location.origin) {
        return false
      }

      return (
        parsed.pathname.startsWith('/media/file/') ||
        parsed.pathname.startsWith('/storage/documents/')
      )
    } catch {
      return false
    }
  }, [])

  const downloadFileAndShowModal = React.useCallback(
    async (downloadLink: string, preferredBaseName?: string) => {
      try {
        const absoluteUrl = new URL(downloadLink, window.location.origin)
        const response = await fetch(absoluteUrl.toString(), {
          credentials: 'same-origin',
        })

        if (!response.ok) {
          window.location.href = downloadLink

          return
        }

        const blob = await response.blob()
        const fallbackSegment = absoluteUrl.pathname.split('/').filter(Boolean).pop() ?? 'download'
        const fallbackExtension = fallbackSegment.includes('.')
          ? (fallbackSegment.split('.').pop()?.toLowerCase() ?? '')
          : ''
        const contentType = response.headers.get('Content-Type') ?? ''
        const contentTypeExtension = resolveExtensionFromContentType(contentType)
        const sanitizedPreferredBaseName =
          preferredBaseName?.trim().replace(/[\\/:*?"<>|]+/g, '_') ?? ''
        const fallbackName =
          sanitizedPreferredBaseName !== ''
            ? `${sanitizedPreferredBaseName}.${
                fallbackExtension !== '' ? fallbackExtension : contentTypeExtension || 'pdf'
              }`
            : fallbackSegment
        const fileName = resolveDownloadFileName(
          response.headers.get('Content-Disposition'),
          fallbackName
        )

        const objectUrl = window.URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = objectUrl
        anchor.download = fileName
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
        window.URL.revokeObjectURL(objectUrl)

        setShowDownloadModal(true)
      } catch {
        window.location.href = downloadLink
      }
    },
    [resolveDownloadFileName, resolveExtensionFromContentType]
  )

  const { post, loading } = useInertiaPost('/send-lead-capture-mail', {
    showErrorToast: true,
    preserveState: true,
    preserveScroll: true,
    onComplete: () => {
      const searchParams =
        typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
      const queryDownload = searchParams?.get('download') ?? ''
      const requestedResource = searchParams?.get('resource') ?? ''
      const configuredDownload = blockData?.submitButton?.link ?? ''
      const link = queryDownload !== '' ? queryDownload : configuredDownload

      if (link == null || link === '') {
        return
      }

      const normalizeDownloadLink = (rawLink: string) => {
        const trimmedLink = rawLink.trim()
        const isAbsolute =
          trimmedLink.startsWith('http://') ||
          trimmedLink.startsWith('https://') ||
          trimmedLink.startsWith('/')
        const normalized = isAbsolute ? trimmedLink : `/${trimmedLink}`

        const publicNormalized = normalized.replace(/^\/manage-media\/file\//, '/media/file/')

        // Media endpoint should force download while preserving file naming from server.
        if (!publicNormalized.includes('/media/file/')) {
          return publicNormalized
        }

        try {
          const parsed = new URL(publicNormalized, window.location.origin)
          parsed.searchParams.set('download', '1')

          return `${parsed.pathname}${parsed.search}${parsed.hash}`
        } catch {
          const hasQuery = publicNormalized.includes('?')

          return `${publicNormalized}${hasQuery ? '&' : '?'}download=1`
        }
      }

      const downloadLink = normalizeDownloadLink(link)

      if (blockData?.submitButton?.external) {
        window.location.href = downloadLink
        return
      }

      if (shouldHandleDownloadInApp(downloadLink)) {
        void downloadFileAndShowModal(downloadLink, requestedResource)
        return
      }

      window.location.href = downloadLink
    },
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const searchParams =
      typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    const queryDownload = searchParams?.get('download') ?? ''
    const requestedResource = searchParams?.get('resource') ?? ''
    const configuredDownload = blockData?.submitButton?.link ?? ''
    const rawDownloadLink = queryDownload !== '' ? queryDownload : configuredDownload

    const resolveDownloadedFileName = (rawLink: string, fallbackName: string) => {
      if (fallbackName !== '') {
        return fallbackName
      }

      if (rawLink === '') {
        return null
      }

      try {
        const parsed = new URL(rawLink, window.location.origin)
        const segment = parsed.pathname.split('/').filter(Boolean).pop()

        return segment == null ? null : decodeURIComponent(segment)
      } catch {
        return null
      }
    }

    const downloadedFileName = resolveDownloadedFileName(rawDownloadLink, requestedResource)

    const countryName =
      typeof Intl !== 'undefined' && formData.country !== ''
        ? (new Intl.DisplayNames(['en'], { type: 'region' }).of(formData.country) ??
          formData.country)
        : formData.country

    const receiverMailRaw = blockData?.receiverMail?.english || 'desk@intuonfx.com'
    const receiverMail = receiverMailRaw
      .split(/[\n,;]+/)
      .map((email) => email.trim())
      .filter((email) => email !== '')
      .join(',')

    post({
      name: formData.name,
      email: formData.businessEmail,
      organization: formData.organization,
      country: formData.country,
      country_name: countryName,
      download_file_name: downloadedFileName,
      privacy_policy: formData.privacyPolicy,
      subject: blockData?.mailSubject?.english || 'Lead Capture Form Submission',
      receiver_mail: receiverMail,
    })
  }

  return (
    <section
      className={`relative mb-10 overflow-hidden bg-white py-28 ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      <AppLayoutPadding>
        <div className='relative z-10 px-2 pt-4 md:px-4 lg:px-4 xl:px-32'>
          <div
            className='relative overflow-hidden rounded-[15px] bg-cover bg-center shadow-xl'
            style={{
              backgroundImage: `url('${blockData?.modalBackgroundImage?.url ?? '/imge/home/contact.png'}')`,
            }}
          >
            <div className='via-[#0f3d2a]/78 to-[#0f3d2a]/52 absolute inset-0 bg-gradient-to-r from-[#0f3d2a]/90' />
            <div className='relative z-10 grid grid-cols-1 lg:grid-cols-2'>
              <div className='relative flex flex-col items-center justify-start p-8 text-white md:justify-start md:p-8 lg:justify-center lg:p-12'>
                <div className='relative z-10 flex flex-col items-center space-y-8 md:items-center lg:items-start lg:space-y-10'>
                  <h3 className='font-heading text-[34px] font-bold leading-tight text-white md:text-[38px] lg:text-[44px]'>
                    <Localization
                      text={blockData?.leftTitle ?? leadCaptureBlock.leftTitle}
                      language={language}
                    />
                  </h3>

                  {editMode && onFieldEdit && (
                    <div className='flex flex-wrap gap-4'>
                      <EditLabel
                        label='Edit Modal Background Image'
                        onClick={() =>
                          onFieldEdit({
                            action: 'INSERT',
                            field: 'modalBackgroundImage',
                            fieldType: 'image',
                            oldValue: blockData?.modalBackgroundImage,
                          })
                        }
                      />
                      <EditLabel
                        label='Edit Left Title'
                        onClick={() =>
                          onFieldEdit({
                            action: 'UPDATE',
                            field: 'leftTitle',
                            fieldType: 'text',
                            oldValue: blockData?.leftTitle,
                          })
                        }
                      />
                    </div>
                  )}

                  <div className='space-y-2 md:space-y-2 md:text-center lg:space-y-4 lg:text-start'>
                    {(
                      blockData?.leftDescription?.items ??
                      leadCaptureBlock.leftDescription?.items ??
                      []
                    ).map((item) => (
                      <SectionDescription
                        key={item.id}
                        theme='dark'
                        size='large'
                        centered={false}
                        className='text-lg leading-[1.6] text-white/95'
                      >
                        <Localization
                          text={item.item}
                          language={language}
                        />
                        {editMode && onFieldEdit && (
                          <EditLabel
                            label='Edit Description'
                            onClick={() =>
                              onFieldEdit({
                                field: 'leftDescription',
                                fieldType: 'textItems',
                                oldValue: item.item,
                                action: 'UPDATE',
                                itemIndex: item.id,
                              })
                            }
                          />
                        )}
                      </SectionDescription>
                    ))}
                    {editMode && onFieldEdit && (
                      <AddLabel
                        label='Add Description Line'
                        onClick={() =>
                          onFieldEdit({
                            field: 'leftDescription',
                            fieldType: 'textItems',
                            oldValue: null,
                            action: 'INSERT',
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-center'>
                <div className='m-4 flex flex-col items-start justify-center rounded-lg bg-white p-8 lg:m-10'>
                  <div className='space-y-2 pb-6'>
                    <SectionSubheading
                      theme='light'
                      size='large'
                      weight='semibold'
                      centered={false}
                      className='leading-tight text-spontaine-dark'
                    >
                      <Localization
                        text={blockData?.rightTitle ?? leadCaptureBlock.rightTitle}
                        language={language}
                      />
                    </SectionSubheading>
                    {editMode && onFieldEdit && (
                      <EditLabel
                        label='Edit Right Title'
                        onClick={() =>
                          onFieldEdit({
                            action: 'UPDATE',
                            field: 'rightTitle',
                            fieldType: 'text',
                            oldValue: blockData?.rightTitle,
                          })
                        }
                      />
                    )}
                    {/* <div>
                      <p className='text-xs'>Please fill in this form to start your download.</p>
                    </div> */}
                    <SectionBody
                      theme='gray'
                      size='xs'
                      centered={false}
                    >
                      Please fill in this form to start your download.
                    </SectionBody>
                  </div>

                  <form
                    onSubmit={onSubmit}
                    className='space-y-5'
                  >
                    <Input
                      className='placeholder:text-xs'
                      placeholder={focusedField === 'name' ? '' : 'Your Name'}
                      value={formData.name}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormValue('name')(e.target.value)}
                      required
                    />

                    <Input
                      className='placeholder:text-xs'
                      type='email'
                      placeholder={focusedField === 'businessEmail' ? '' : 'Your business email'}
                      value={formData.businessEmail}
                      onFocus={() => setFocusedField('businessEmail')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormValue('businessEmail')(e.target.value)}
                      required
                    />

                    <Input
                      className='placeholder:text-xs'
                      placeholder={focusedField === 'organization' ? '' : 'Your organization'}
                      value={formData.organization}
                      onFocus={() => setFocusedField('organization')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormValue('organization')(e.target.value)}
                      required
                    />

                    <div className='space-y-2'>
                      <CountrySelect
                        value={formData.country}
                        onChange={(value) => setFormValue('country')(value)}
                        placeholder='Select country'
                      />
                    </div>

                    <div className='space-y-3'>
                      <div className='flex items-start gap-3'>
                        <Checkbox
                          id='lead-capture-privacy'
                          checked={formData.privacyPolicy}
                          onCheckedChange={(checked) => setFormValue('privacyPolicy')(!!checked)}
                        />
                        <SectionBody
                          theme='gray'
                          size='xs'
                          centered={false}
                        >
                          <label htmlFor='lead-capture-privacy'>
                            <Localization
                              text={
                                blockData?.privacyStatement ?? leadCaptureBlock.privacyStatement
                              }
                              language={language}
                            />
                          </label>
                        </SectionBody>
                      </div>
                      {editMode && onFieldEdit && (
                        <EditLabel
                          label='Edit Privacy Statement'
                          onClick={() =>
                            onFieldEdit({
                              action: 'UPDATE',
                              field: 'privacyStatement',
                              fieldType: 'text',
                              oldValue: blockData?.privacyStatement,
                            })
                          }
                        />
                      )}
                    </div>

                    <div className='pt-4'>
                      <FullSpinnerWrapper processing={loading}>
                        <Button
                          type='submit'
                          className='w-full bg-spontaine-accent text-spontaine-dark hover:bg-spontaine-accent-dark'
                          disabled={
                            !formData.name ||
                            !formData.businessEmail ||
                            !formData.organization ||
                            !formData.country ||
                            !formData.privacyPolicy
                          }
                        >
                          <Localization
                            text={
                              blockData?.submitButton?.name ?? leadCaptureBlock.submitButton?.name
                            }
                            language={language}
                          />
                        </Button>
                      </FullSpinnerWrapper>
                      {editMode && onFieldEdit && (
                        <div className='mt-4'>
                          <EditLabel
                            label='Edit Submit Button + Download Document'
                            onClick={() =>
                              onFieldEdit({
                                action: 'UPDATE',
                                field: 'submitButton',
                                fieldType: 'link',
                                oldValue: blockData?.submitButton ?? leadCaptureBlock.submitButton,
                              })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </form>

                  {editMode && onFieldEdit && (
                    <div className='mt-12 flex flex-wrap gap-4 rounded-md bg-gray-100 p-4'>
                      <EditLabel
                        label='Edit Mail Subject'
                        onClick={() =>
                          onFieldEdit({
                            action: 'UPDATE',
                            field: 'mailSubject',
                            fieldType: 'text',
                            oldValue: blockData?.mailSubject,
                          })
                        }
                      />
                      <EditLabel
                        label='Edit Receiver Email'
                        onClick={() =>
                          onFieldEdit({
                            action: 'UPDATE',
                            field: 'receiverMail',
                            fieldType: 'text',
                            oldValue: blockData?.receiverMail,
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {showDownloadModal && (
          <div className='fixed inset-0 z-[80] flex items-center justify-center px-4'>
            <button
              type='button'
              className='absolute inset-0 bg-black/45 backdrop-blur-[2px]'
              aria-label='Close download complete modal'
              onClick={() => setShowDownloadModal(false)}
            />
            <div className='relative w-full max-w-md rounded-2xl border border-spontaine-accent/20 bg-white p-8 shadow-2xl duration-300 animate-in fade-in zoom-in-95'>
              <SectionSubheading
                theme='light'
                size='large'
                weight='semibold'
                centered={false}
                className='text-spontaine-dark'
              >
                Download Complete
              </SectionSubheading>
              <SectionBody
                theme='gray'
                size='sm'
                centered={false}
                className='mt-3'
              >
                Your report was downloaded successfully.
              </SectionBody>

              <div className='mt-8 flex flex-wrap items-center gap-3'>
                <Button
                  type='button'
                  className='bg-spontaine-accent text-spontaine-dark hover:bg-spontaine-accent-dark'
                  onClick={() => setShowDownloadModal(false)}
                >
                  Close
                </Button>
                <a
                  href='/resources'
                  className='text-sm font-medium text-spontaine-dark underline decoration-spontaine-accent/50 underline-offset-4 transition hover:decoration-spontaine-accent'
                >
                  Back to Resources
                </a>
              </div>
            </div>
          </div>
        )}
      </AppLayoutPadding>
    </section>
  )
}

export default LeadCapture
