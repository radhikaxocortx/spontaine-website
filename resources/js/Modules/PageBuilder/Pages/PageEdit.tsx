import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import { PAGE_TYPE_OPTIONS } from '@/Modules/PageBuilder/constants/pageTypes'
import useNameUrl from '@/Modules/PageBuilder/hooks/UseNameUrl'
import { FormEvent, useCallback, useEffect, useMemo } from 'react'

import { Page } from '@/Modules/PageBuilder/page_interfaces'

interface Props {
  page: Page
}

export default function PageEdit({ page }: Props) {
  const { formData, setFormValue } = useCustomForm({
    title: page.title,
    page_title: page.page_title,
    description: page.description,
    url: page.url,
    published: page.published,
    featured: page.featured || false,
    type: page.type,
    preview_image: null,
    cover_image: null,
    preview_video: null,
    download_url: page.download_url || '',
    author: page.author || '',
  })
  const Url = useNameUrl(formData.title)

  useEffect(() => {
    setFormValue('url')(Url)
  }, [formData.title, setFormValue, Url])
  const { post, loading, errors } = useInertiaPost(route('pages.update', page.id))

  const formItems = useMemo(<
    T,
    U extends keyof T,
    K extends keyof L,
    G extends keyof L,
    L extends Record<K, string | number> & Record<G, string | number | null>,
  >() => {
    return {
      title: {
        type: 'text',
        label: 'Title',
        setValue: setFormValue('title'),
      },
      page_title: {
        type: 'text',
        label: 'Page Title',
        setValue: setFormValue('page_title'),
      },

      url: {
        type: 'text',
        label: 'Url',
        setValue: setFormValue('url'),
        disabled: true,
      },

      type: {
        type: 'select',
        label: 'Type',
        setValue: setFormValue('type'),
        list: PAGE_TYPE_OPTIONS,
        dataKey: 'value',
        displayKey: 'label',
      },
      preview_image: {
        type: 'file',
        label: 'Preview Image',
        setValue: setFormValue('preview_image'),
      },
      cover_image: {
        type: 'file',
        label: 'Cover Image (Optional)',
        setValue: setFormValue('cover_image'),
      },
      preview_video: {
        type: 'file',
        label: 'Preview Video (Optional)',
        setValue: setFormValue('preview_video'),
        accept: 'video/*',
      },
      download_url: {
        type: 'text',
        label: 'Download Report URL (Relative Path, Optional)',
        setValue: setFormValue('download_url'),
        // placeholder: '/media/file/document/your-file-key',
      },
      description: {
        type: 'textarea',
        label: 'Description',
        setValue: setFormValue('description'),
      },
      author: {
        type: 'text',
        label: 'Author (Optional)',
        setValue: setFormValue('author'),
      },
      published: {
        type: 'checkbox',
        label: 'Published',
        setValue: setFormValue('published'),
      },
      featured: {
        type: 'checkbox',
        label: 'Featured',
        setValue: setFormValue('featured'),
      },
    } as Record<U, FormItem<T[U], K, G, L>>
  }, [setFormValue])

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      post({
        ...formData,
        _method: 'PATCH',
      })
    },
    [post, formData]
  )
  return (
    <FormBuilder
      formData={formData}
      onFormSubmit={onFormSubmit}
      formItems={formItems}
      loading={loading}
      errors={errors}
      buttonText='Update'
    />
  )
}
