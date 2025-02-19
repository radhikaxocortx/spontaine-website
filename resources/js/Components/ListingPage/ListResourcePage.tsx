import CardHeader from '@/components/ui/Card/CardHeader'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import DashboardPadding from '@/Layouts/DashboardLayout'
import Dashboard from '@/Pages/Dashboard'
import { router } from '@inertiajs/react'
import React, { useCallback, useRef } from 'react'
import FilterOldValues from '../OldSearch/FilterOldValues'
import { BreadcrumbItemLink } from '../ui/BreadCrumb'
import Pagination from '../ui/Pagination/Pagination'
import { Paginator } from '../ui/ui_interfaces'
import CardGridView from './CardGridView'

export interface ListItemKeys<T> {
  key: keyof T
  label: string
  isCardHeader?: boolean
  isShownInCard?: boolean
  textStyles?: string
  boxStyles?: string
  hideLabel?: boolean
  isLink?: boolean
  actionStyle?: string
}

interface Props<
  U extends keyof T,
  T extends Record<U, string | number | null | undefined> &
    Record<
      'actions',
      { action: () => void; title: string; boxStyles?: string; textStyles?: string }[]
    >,
  Q,
  P extends keyof Q,
  R extends keyof L,
  S extends keyof L,
  L extends Record<R, string | number> & Record<S, string | number | null>,
> {
  keys: ListItemKeys<T>[]
  primaryKey: keyof T
  rows: T[]
  formData: Q
  formStyles?: string
  formItems: Record<P, FormItem<Q[P], R, S, L>>
  paginator?: Paginator<{}>
  title?: string
  subheading?: string
  searchUrl?: string
  backUrl?: string
  onBackClick?: (e?: React.MouseEvent<HTMLButtonElement>) => unknown
  addUrl?: string
  onAddClick?: (e?: React.MouseEvent<HTMLButtonElement>) => unknown
  editUrl?: string
  onEditClick?: (e?: React.MouseEvent<HTMLButtonElement>) => unknown
  deleteUrl?: string
  onDeleteClick?: (e?: React.MouseEvent<HTMLButtonElement>) => unknown
  existingUserUrl?: string
  onFolderIconClick?: (e?: React.MouseEvent<HTMLButtonElement>) => unknown
  pageDescription?: string
  type?: string
  subtype?: string
  buttonText?: string
  oldValues?: Record<string, string>
  cardStyles?: string
  gridStyles?: string
  layoutStyle?: string
  onCardClick?: (id: number | string) => void
  isAddButton?: boolean
  selectedHeading?: string
  breadCrumbs?: BreadcrumbItemLink[]
  isDualHeading?: string
}

export default function ListResourcePage<
  U extends keyof T,
  T extends Record<U, string | number | null | undefined> &
    Record<
      'actions',
      { action: () => void; title: string; boxStyles?: string; textStyles?: string }[]
    >,
  Q,
  P extends keyof Q,
  R extends keyof L,
  S extends keyof L,
  L extends Record<R, string | number> & Record<S, string | number | null>,
>({
  rows,
  primaryKey,
  keys,
  paginator,
  title = 'List',
  formItems,
  formData,
  searchUrl,
  backUrl,
  onBackClick,
  addUrl,
  onAddClick,
  editUrl,
  formStyles,
  onEditClick,
  deleteUrl,
  onDeleteClick,
  existingUserUrl,
  onFolderIconClick,
  type,
  subtype,
  oldValues,
  subheading,
  cardStyles,
  gridStyles,
  layoutStyle,
  onCardClick,
  isAddButton = true,
  selectedHeading,
  breadCrumbs,
  buttonText,
  isDualHeading,
}: Readonly<Props<U, T, Q, P, R, S, L>>) {
  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchUrl == null) {
      return
    }

    router.get(searchUrl, {
      ...formData,
    } as Record<string, string | number>)
  }

  const handleAddAction = useCallback(() => {
    if (addUrl == null) {
      return
    }

    router.get(addUrl)
  }, [addUrl])

  const cardRef = useRef<HTMLDivElement>(null)

  const handleCardRef = useCallback(() => {
    if (cardRef.current == null) {
      return
    }
    cardRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div>
      <Dashboard>
        <DashboardPadding>
          <div className='flex flex-col gap-5'>
            <div ref={cardRef}>
              <CardHeader
                title={title}
                // addUrl={addUrl}
                backUrl={backUrl}
                onBackClick={onBackClick}
                onAddClick={onAddClick}
                editUrl={editUrl}
                onEditClick={onEditClick}
                deleteUrl={deleteUrl}
                onDeleteClick={onDeleteClick}
                subheading={subheading}
                breadCrumb={breadCrumbs}
                existingUserUrl={existingUserUrl}
                onFolderIconClick={onFolderIconClick}
                isDualHeading={isDualHeading}
              />
            </div>
            <div className='flex flex-col gap-10 py-5'>
              <div className='flex flex-col gap-5'>
                <FormBuilder
                  formData={formData}
                  onFormSubmit={onSearchSubmit}
                  formItems={formItems}
                  loading={false}
                  buttonText={buttonText ? buttonText : 'Search'}
                  formStyles={`md:grid-cols-3 lg:grid-cols-4 ${formStyles}`}
                />
              </div>
            </div>
          </div>

          <FilterOldValues
            oldValues={oldValues}
            searchUrl={searchUrl}
          />
          <CardGridView
            keys={keys}
            primaryKey={primaryKey}
            rows={rows}
            onAddClick={handleAddAction}
            cardStyles={cardStyles}
            gridStyles={gridStyles}
            onCardClick={onCardClick}
            layoutStyles={layoutStyle}
            isAddButton={isAddButton}
          />
          {paginator != null && <Pagination pagination={paginator} />}
        </DashboardPadding>
      </Dashboard>
    </div>
  )
}
