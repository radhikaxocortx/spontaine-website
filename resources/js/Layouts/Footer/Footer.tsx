import ApplicationLogo from '@/components/CustomUI/ApplicationLogo'
import { Language } from '@/components/ui/ui_interfaces'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { FooterDataInterface } from '@/Modules/PageBuilder/FooterEditor/FooterEditor'
import { Link } from '@inertiajs/react'

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
  blockData?: FooterDataInterface
}

const Footer = ({ editMode, onFieldEdit, language, blockData }: Properties) => {
  return (
    <div className='w-full border-t border-neutral-200 bg-neutral-50 px-4 md:px-6 lg:px-20 xl:px-32 2xl:px-64'>
      <div className='relative w-full py-24 lg:py-28'>
        <div className='grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10'>
          <div className='col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col'>
            <div className='col-span-2 md:col-span-1'>
              <Link
                href='/public'
                className={`ttnc-logo text-primary-6000 inline-block w-36 focus:outline-none focus:ring-0`}
              >
                <ApplicationLogo />
              </Link>
            </div>
          </div>
          {/*Section One*/}
          <div className='text-sm'>
            <h2 className='font-nav font-semibold'>
              <Localization
                text={blockData?.sectionOne}
                language={language}
              />
              {editMode && onFieldEdit != null && (
                <EditLabel
                  onClick={() =>
                    onFieldEdit({
                      action: 'INSERT',
                      field: 'sectionOne',
                      oldValue: blockData?.sectionOne,
                      fieldType: 'text',
                    })
                  }
                />
              )}
            </h2>
            <ul className='mt-5 space-y-4'>
              {blockData?.oneLinks?.items?.map((item) => {
                return (
                  <li key={item.id.toString()}>
                    <InertiaLink
                      className='transition hover:opacity-75'
                      language={language}
                      link={item.item}
                    />
                    {editMode && onFieldEdit != null && (
                      <EditLabel
                        onClick={() =>
                          onFieldEdit({
                            action: 'UPDATE',
                            field: 'oneLinks',
                            oldValue: item.item,
                            fieldType: 'links',
                            itemIndex: item.id,
                          })
                        }
                      />
                    )}
                  </li>
                )
              })}
              {editMode && onFieldEdit != null && (
                <li>
                  <EditLabel
                    label='ADD LINK'
                    onClick={() =>
                      onFieldEdit({
                        action: 'INSERT',
                        fieldType: 'links',
                        field: 'oneLinks',
                        oldValue: null,
                      })
                    }
                  />
                </li>
              )}
            </ul>
          </div>
          {/*Section Two*/}
          <div className='text-sm'>
            <h2 className='font-nav font-semibold'>
              <Localization
                text={blockData?.sectionTwo}
                language={language}
              />
              {editMode && onFieldEdit != null && (
                <EditLabel
                  onClick={() =>
                    onFieldEdit({
                      action: 'INSERT',
                      field: 'sectionTwo',
                      oldValue: blockData?.sectionTwo,
                      fieldType: 'text',
                    })
                  }
                />
              )}
            </h2>
            <ul className='mt-5 space-y-4'>
              {blockData?.twoLinks?.items?.map((item) => {
                return (
                  <li key={item.id.toString()}>
                    <InertiaLink
                      className='transition hover:opacity-75'
                      language={language}
                      link={item.item}
                    />
                    {editMode && onFieldEdit != null && (
                      <EditLabel
                        onClick={() =>
                          onFieldEdit({
                            action: 'UPDATE',
                            field: 'twoLinks',
                            oldValue: item.item,
                            fieldType: 'links',
                            itemIndex: item.id,
                          })
                        }
                      />
                    )}
                  </li>
                )
              })}
              {editMode && onFieldEdit != null && (
                <li>
                  <EditLabel
                    label='ADD LINK'
                    onClick={() =>
                      onFieldEdit({
                        action: 'INSERT',
                        fieldType: 'links',
                        field: 'twoLinks',
                        oldValue: null,
                      })
                    }
                  />
                </li>
              )}
            </ul>
          </div>
          {/*Section Three*/}
          <div className='text-sm'>
            <h2 className='font-nav font-semibold'>
              <Localization
                text={blockData?.sectionThree}
                language={language}
              />
              {editMode && onFieldEdit != null && (
                <EditLabel
                  onClick={() =>
                    onFieldEdit({
                      action: 'INSERT',
                      field: 'sectionThree',
                      oldValue: blockData?.sectionThree,
                      fieldType: 'text',
                    })
                  }
                />
              )}
            </h2>
            <ul className='mt-5 space-y-4'>
              {blockData?.threeLinks?.items?.map((item) => {
                return (
                  <li key={item.id.toString()}>
                    <InertiaLink
                      className='transition hover:opacity-75'
                      language={language}
                      link={item.item}
                    />
                    {editMode && onFieldEdit != null && (
                      <EditLabel
                        onClick={() =>
                          onFieldEdit({
                            action: 'UPDATE',
                            field: 'threeLinks',
                            oldValue: item.item,
                            fieldType: 'links',
                            itemIndex: item.id,
                          })
                        }
                      />
                    )}
                  </li>
                )
              })}
              {editMode && onFieldEdit != null && (
                <li>
                  <EditLabel
                    label='ADD LINK'
                    onClick={() =>
                      onFieldEdit({
                        action: 'INSERT',
                        fieldType: 'links',
                        field: 'threeLinks',
                        oldValue: null,
                      })
                    }
                  />
                </li>
              )}
            </ul>
          </div>
          {/*Section Four*/}
          <div className='text-sm'>
            <h2 className='font-nav font-semibold'>
              <Localization
                text={blockData?.sectionFour}
                language={language}
              />
              {editMode && onFieldEdit != null && (
                <EditLabel
                  onClick={() =>
                    onFieldEdit({
                      action: 'INSERT',
                      field: 'sectionFour',
                      oldValue: blockData?.sectionFour,
                      fieldType: 'text',
                    })
                  }
                />
              )}
            </h2>
            <ul className='mt-5 space-y-4'>
              {blockData?.fourLinks?.items?.map((item) => {
                return (
                  <li key={item.id.toString()}>
                    <InertiaLink
                      className='transition hover:opacity-75'
                      language={language}
                      link={item.item}
                    />
                    {editMode && onFieldEdit != null && (
                      <EditLabel
                        onClick={() =>
                          onFieldEdit({
                            action: 'UPDATE',
                            field: 'fourLinks',
                            oldValue: item.item,
                            fieldType: 'links',
                            itemIndex: item.id,
                          })
                        }
                      />
                    )}
                  </li>
                )
              })}
              {editMode && onFieldEdit != null && (
                <li>
                  <EditLabel
                    label='ADD LINK'
                    onClick={() =>
                      onFieldEdit({
                        action: 'INSERT',
                        fieldType: 'links',
                        field: 'fourLinks',
                        oldValue: null,
                      })
                    }
                  />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/*Social Links*/}
      <div className={`flex flex-wrap items-center gap-5`}>
        <div className='flex'>
          {blockData?.facebook != null && (
            <a
              href={blockData?.facebook?.link ?? ''}
              target='_blank'
              rel='noreferrer'
              className='font-nav flex items-center rounded bg-[#3b5998] p-2 leading-none text-white transition hover:bg-[#2d4373]'
            >
              <i className='la la-facebook la-1x'></i>
            </a>
          )}
          {editMode && onFieldEdit != null && (
            <EditLabel
              label='Edit Facebook Link'
              onClick={() =>
                onFieldEdit({
                  action: 'INSERT',
                  field: 'facebook',
                  fieldType: 'link',
                  oldValue: blockData?.facebook,
                })
              }
            />
          )}
        </div>
        {/*  Social Link FOr Twitter */}
        <div className='flex'>
          {blockData?.twitter != null && (
            <a
              href={blockData?.twitter?.link ?? ''}
              target='_blank'
              rel='noreferrer'
              className='font-nav flex rounded bg-[#1da1f2] p-2 leading-none text-white transition hover:bg-[#1da1f2]'
            >
              <i className='la la-twitter la-1x'></i>
            </a>
          )}
          {editMode && onFieldEdit != null && (
            <EditLabel
              label='Edit Twitter Link'
              onClick={() =>
                onFieldEdit({
                  action: 'INSERT',
                  field: 'twitter',
                  fieldType: 'link',
                  oldValue: blockData?.twitter,
                })
              }
            />
          )}
        </div>
        {/*  Social Link FOr Youtube */}
        <div className='flex'>
          {blockData?.youtube != null && (
            <a
              href={blockData?.youtube?.link ?? ''}
              target='_blank'
              rel='noreferrer'
              className='font-nav flex items-center justify-center rounded bg-[#ff0000] p-2 leading-none text-white transition hover:bg-[#ff0000]'
            >
              <i className='la la-youtube la-1x'></i>
            </a>
          )}
          {editMode && onFieldEdit != null && (
            <EditLabel
              label='Edit Youtube Link'
              onClick={() =>
                onFieldEdit({
                  action: 'INSERT',
                  field: 'youtube',
                  fieldType: 'link',
                  oldValue: blockData?.youtube,
                })
              }
            />
          )}
        </div>
        {/*  Social Link FOr Instagram */}
        <div className='flex'>
          {blockData?.instagram != null && (
            <a
              href={blockData?.instagram?.link ?? ''}
              target='_blank'
              rel='noreferrer'
              className='font-nav flex rounded bg-[#e1306c] p-2 text-white transition hover:bg-[#e1306c]'
            >
              <i className='la la-instagram la-1x'></i>
            </a>
          )}
          {editMode && onFieldEdit != null && (
            <EditLabel
              label='Edit Instagram Link'
              onClick={() =>
                onFieldEdit({
                  action: 'INSERT',
                  field: 'instagram',
                  fieldType: 'link',
                  oldValue: blockData?.instagram,
                })
              }
            />
          )}
        </div>
      </div>
      <div className='m-2 text-center text-xs'>
        Application developed & supported by{' '}
        <a
          className='text-blue-600 underline'
          href='https://xocortx.com/'
          target='_blank'
          rel='noreferrer'
        >
          XOCORTX
        </a>{' '}
        © Content managed by Travancore Palace, New Delhi. Some Restrictions May Apply.
      </div>
    </div>
  )
}

export default Footer
