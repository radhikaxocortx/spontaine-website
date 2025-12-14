import { Language } from '@/components/ui/ui_interfaces'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { FooterDataInterface } from '@/Modules/PageBuilder/FooterEditor/FooterEditor'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import AppLayoutPadding from '../AppLayoutPadding'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
  blockData?: FooterDataInterface
}

const Footer = ({ editMode, onFieldEdit, language, blockData }: Properties) => {
  const arcRef = useRef(null)

  useEffect(() => {
    const arc = arcRef.current

    const normalArc = 'm1440 96c-213.6-61.2-459-96-720-96s-506.4 34.8-720 96v41.3h1440z'
    const inwardArc = 'm1440 96c-213.6-51.2-459-86-720-86s-506.4 24.8-720 86v41.3h1440z'

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: arcRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(arc, {
      morphSVG: inwardArc,
      duration: 1.2,
      ease: 'power2.inOut',
    }).to(arc, {
      morphSVG: normalArc,
      duration: 1.2,
      ease: 'power2.inOut',
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <footer className='relative bg-spontaine-dark pt-20 text-white'>
      {/* TOP ARC - matches SectionAlignedAction bottom arc pattern */}
      <div className='absolute left-0 top-0 w-full -translate-y-[calc(100%-1px)]'>
        <svg
          viewBox='0 0 1440 96'
          preserveAspectRatio='none'
          className='w-full'
        >
          <path
            ref={arcRef}
            fill='#343434'
            d='m1440 96c-213.6-61.2-459-96-720-96s-506.4 34.8-720 96v41.3h1440z'
          />
        </svg>
      </div>

      <AppLayoutPadding>
        <div className='space-y-2'>
          {/* Top Section: Logo + Navigation Columns */}
          <div className='relative w-full'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[300px_1fr]'>
              {/* Left: Logo + Company Info */}
              <div className='space-y-4'>
                {/* Logo */}
                <a href='/'>
                  <div className='h-16 w-40'>
                    <img
                      src='/imge/intuon-logo.png'
                      alt='Intuon Analytics'
                      className='h-full w-full object-contain'
                    />
                  </div>
                </a>

                {/* Company Address */}
                <div className='font-body text-xs leading-relaxed text-spontaine-white-soft'>
                  <p className='font-bold text-spontaine-white-soft'>
                    INTUON ANALYTICS PRIVATE LIMITED
                  </p>
                  <p className='mb-4 font-bold text-spontaine-white-soft'>CIN: 4HHKH454fg564676</p>
                  <p className='mb-0'>9th Floor</p>
                  <p className='mb-0'>Jomer Symphony</p>
                  <p className='mb-0'>Vytila, Kochi</p>
                  <p>INDIA</p>
                </div>
              </div>

              {/* Right: Navigation Columns */}
              <div className='grid grid-cols-1 gap-x-8 justify-self-end sm:grid-cols-4'>
                {/*Section One - COMPANY*/}
                <div>
                  <h3 className='mb-4 font-body text-base font-bold uppercase tracking-wide text-spontaine-accent-bright'>
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
                  </h3>
                  <ul className=''>
                    {blockData?.oneLinks?.items?.map((item) => {
                      return (
                        <li key={item.id.toString()}>
                          <InertiaLink
                            className='font-body text-xs leading-relaxed text-spontaine-white-soft transition-colors hover:text-white'
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

                {/*Section Two - POLICIES*/}
                <div>
                  <h3 className='mb-4 font-body text-base font-bold uppercase tracking-wide text-spontaine-accent-bright'>
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
                  </h3>
                  <ul className=''>
                    {blockData?.twoLinks?.items?.map((item) => {
                      return (
                        <li key={item.id.toString()}>
                          <InertiaLink
                            className='font-body text-xs leading-relaxed text-spontaine-white-soft transition-colors hover:text-white'
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

                {/*Section Three - RESOURCES*/}
                <div>
                  <h3 className='mb-4 font-body text-base font-bold uppercase tracking-wide text-spontaine-accent-bright'>
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
                  </h3>
                  <ul className=''>
                    {blockData?.threeLinks?.items?.map((item) => {
                      return (
                        <li key={item.id.toString()}>
                          <InertiaLink
                            className='font-body text-xs leading-relaxed text-spontaine-white-soft transition-colors hover:text-white'
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
              </div>
            </div>
          </div>

          {/* Bottom Section: Copyright & Compliance */}
          <div className='space-y-1 pt-8'>
            {/* Copyright */}
            <div className='text-center font-body text-xs text-spontaine-white-soft'>
              <Localization
                text={blockData?.copyright}
                language={language}
              />
              {editMode && onFieldEdit != null && (
                <EditLabel
                  label='Edit Copyright'
                  onClick={() =>
                    onFieldEdit({
                      action: 'INSERT',
                      field: 'copyright',
                      oldValue: blockData?.copyright,
                      fieldType: 'text',
                    })
                  }
                />
              )}
              {blockData?.copyrightLink != null && (
                <InertiaLink
                  className='transition hover:opacity-75'
                  language={language}
                  link={blockData?.copyrightLink}
                />
              )}
              {editMode && onFieldEdit != null && (
                <EditLabel
                  label='Edit Copyright Link'
                  onClick={() =>
                    onFieldEdit({
                      action: 'UPDATE',
                      field: 'copyrightLink',
                      oldValue: blockData?.copyrightLink,
                      fieldType: 'link',
                    })
                  }
                />
              )}
            </div>

            {/* Compliance Text */}
            <div className='mx-auto max-w-2xl pb-2 text-center font-body text-xs leading-relaxed text-spontaine-white-faint'>
              <Localization
                text={blockData?.compliance}
                language={language}
              />
              {editMode && onFieldEdit != null && (
                <EditLabel
                  label='Edit Compliance'
                  onClick={() =>
                    onFieldEdit({
                      action: 'INSERT',
                      field: 'compliance',
                      oldValue: blockData?.compliance,
                      fieldType: 'text',
                    })
                  }
                />
              )}
            </div>
          </div>

          {/* Social Links (Hidden for now to match design) */}
          <div className='hidden items-center justify-center space-x-3'>
            {blockData?.facebook != null && (
              <a
                href={blockData?.facebook?.link ?? ''}
                target='_blank'
                rel='noreferrer'
                className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-blue-600 hover:text-white'
              >
                <svg
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                    clipRule='evenodd'
                  />
                </svg>
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

            {blockData?.twitter != null && (
              <a
                href={blockData?.twitter?.link ?? ''}
                target='_blank'
                rel='noreferrer'
                className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-gray-900 hover:text-white'
              >
                <svg
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
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

            {blockData?.youtube != null && (
              <a
                href={blockData?.youtube?.link ?? ''}
                target='_blank'
                rel='noreferrer'
                className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-red-600 hover:text-white'
              >
                <svg
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z'
                    clipRule='evenodd'
                  />
                </svg>
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

            {blockData?.instagram != null && (
              <a
                href={blockData?.instagram?.link ?? ''}
                target='_blank'
                rel='noreferrer'
                className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500 hover:text-white'
              >
                <svg
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                    clipRule='evenodd'
                  />
                </svg>
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
      </AppLayoutPadding>
    </footer>
  )
}

export default Footer
