import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import useNameUrl from '@/Modules/PageBuilder/hooks/UseNameUrl'
import { FormEvent, useCallback, useEffect, useMemo } from 'react'

export default function PageCreate() {
  const { formData, setFormValue } = useCustomForm({
    title: '',
    page_title: '',
    description: '',
    url: '',
    published: false,
    featured: false,
    type: 'Page',
    preview_image: '',
    preview_video: '',
    author: '',
  })
  const Url = useNameUrl(formData.title)

  useEffect(() => {
    setFormValue('url')(Url)
  }, [formData.title, setFormValue, Url])
  const { post, loading, errors } = useInertiaPost(route('pages.store'))

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
        list: [
          { value: 'Page', label: 'Page' },
          { value: 'Blog', label: 'Blog' },
          { value: 'Article', label: 'Article' },
          { value: 'Opinion', label: 'Opinion' },
        ],
        dataKey: 'value',
        displayKey: 'label',
      },
      preview_image: {
        type: 'file',
        label: 'Preview Image',
        setValue: setFormValue('preview_image'),
      },
      preview_video: {
        type: 'file',
        label: 'Preview Video (Optional)',
        setValue: setFormValue('preview_video'),
        accept: 'video/*',
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
      post(formData)
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
      buttonText='Create'
    />
  )
}
