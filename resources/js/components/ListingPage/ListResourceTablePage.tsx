import CardHeader from '@/components/CustomUI/Card/CardHeader'
import Pagination from '@/components/CustomUI/Pagination/Pagination'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import DashboardPadding from '@/Layouts/DashboardLayout'
import Dashboard from '@/Pages/Dashboard'
import { router } from '@inertiajs/react'
import React, { useRef } from 'react'
import { BreadcrumbItemLink } from '../CustomUI/BreadCrumb'
import FilterOldValues from '../OldSearch/FilterOldValues'
import { Paginator } from '../ui/ui_interfaces'
import { ListItemKeys } from './ListResourcePage'
import TableListView from './TableListView'

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
  paginator?: Paginator<object>
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
  buttonText?: string
  oldValues?: Record<string, string>
  breadCrumbs?: BreadcrumbItemLink[]
  isDualHeading?: string
  tableWrapperStyles?: string
  tableStyles?: string
  children?: React.ReactNode
}

export default function ListResourceTablePage<
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
  oldValues,
  subheading,
  breadCrumbs,
  buttonText,
  isDualHeading,
  tableWrapperStyles,
  tableStyles,
  children,
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

  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <Dashboard>
        <DashboardPadding>
          <div className='flex flex-col gap-5'>
            <div ref={cardRef}>
              <CardHeader
                title={title}
                backUrl={backUrl}
                addUrl={addUrl}
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

          {children}
        </DashboardPadding>
        <TableListView
          keys={keys}
          primaryKey={primaryKey}
          rows={rows}
          tableWrapperStyles={tableWrapperStyles}
          tableStyles={tableStyles}
        />

        {paginator != null && <Pagination pagination={paginator} />}
      </Dashboard>
    </div>
  )
}
