import AddButton from '@/components/CustomUI/Button/AddButton'
import { ListItemKeys } from '@/components/ListingPage/ListResourcePage'
import { Card } from '@/components/ui/card'
import NormalText from '@/typography/NormalText'
import StrongText from '@/typography/StrongText'
import SubHeading from '@/typography/SubHeading'
import { cn } from '@/utils'
import React, { useMemo } from 'react'

interface Props<
  U extends keyof T,
  T extends Record<U, string | number | null | undefined> &
    Record<
      'actions',
      { title: string; boxStyles?: string; textStyles?: string; action: () => void }[]
    >,
> {
  keys: ListItemKeys<T>[]
  primaryKey: keyof T
  rows: T[]
  onAddClick?: (e: React.MouseEvent<HTMLButtonElement>) => unknown
  gridStyles?: string
  cardStyles?: string
  onCardClick?: (id: number | string) => void
  layoutStyles?: string
  addButtonText?: string
  isAddButton?: boolean
  isChecklist?: boolean
}

export default function CardGridView<
  U extends keyof T,
  T extends Record<U, string | number | null | undefined> &
    Record<
      'actions',
      { action: () => void; title: string; boxStyles?: string; textStyles?: string }[]
    >,
>({
  keys,
  primaryKey,
  rows,
  onAddClick,
  cardStyles,
  gridStyles,
  onCardClick,
  layoutStyles,
  addButtonText,
  isAddButton = true,
  isChecklist = false,
}: Readonly<Props<U, T>>) {
  const titleKey = useMemo(() => {
    return keys.find((key) => key.isCardHeader)
  }, [keys])

  const isUsingTitleClick = useMemo(() => {
    return titleKey?.isLink ?? false
  }, [titleKey])

  const handleCardDivClick = (id: number | string) => {
    if (isUsingTitleClick || onCardClick == null) {
      return
    }
    onCardClick(id)
  }

  const handleTitleClick = (id: number | string) => {
    if (!isUsingTitleClick || onCardClick == null) {
      return
    }
    onCardClick(id)
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-5 rounded bg-white p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        layoutStyles
      )}
    >
      {isAddButton && (
        <AddButton
          onClick={onAddClick}
          buttonText={addButtonText ?? 'Add new'}
        />
      )}

      {rows.map((row) => {
        return (
          <Card
            className={cn(
              `flex flex-col gap-2 p-2 ${isUsingTitleClick ? '' : 'cursor-pointer'}`,
              row['viewStyle' as keyof typeof row] as string | undefined,
              cardStyles
            )}
            key={row[primaryKey] as string}
            onClick={() => handleCardDivClick(row[primaryKey] as string)}
          >
            {/*  Title Row*/}
            {titleKey != null && (
              <div className='flex'>
                <SubHeading
                  onClick={() => handleTitleClick(row[primaryKey] as string | number)}
                  className={`${!isUsingTitleClick ? '' : 'cursor-pointer transition hover:scale-105'}`}
                >
                  {(row[titleKey.key as keyof typeof row] as string) !== null &&
                  row[titleKey.key as keyof typeof row]?.toString().includes(':') ? (
                    <div>
                      <span>{row[titleKey.key as keyof typeof row]?.toString().split(':')[0]}</span>
                      <span className=''>
                        :{row[titleKey.key as keyof typeof row]?.toString().split(':')[1]}
                      </span>
                    </div>
                  ) : (
                    <span className=''>{row[titleKey.key] as string}</span>
                  )}
                </SubHeading>

                <div>{isChecklist && <i className='la la-tag'></i>}</div>
              </div>
            )}
            {/* Data Grid */}
            <div className={`${cn('grid grid-cols-1 gap-2', gridStyles)}`}>
              {keys
                .filter((key) => !key.isCardHeader)
                .map((rowKey) => (
                  <div
                    className={cn(
                      `flex flex-col gap-0 ${isUsingTitleClick ? '' : 'cursor-pointer'}`,
                      rowKey.boxStyles
                    )}
                    key={rowKey.key as string}
                  >
                    {(rowKey.hideLabel == null || !rowKey.hideLabel) && (
                      <NormalText className=''>{rowKey.label as string} : </NormalText>
                    )}
                    <StrongText
                      className={cn(
                        '',
                        rowKey.textStyles != null
                          ? (row[rowKey.textStyles as keyof typeof row] as string)
                          : ''
                      )}
                    >
                      {row[rowKey.key] as string}
                    </StrongText>
                  </div>
                ))}
              {/*Actions*/}
              <div className={`col-span-full flex gap-3`}>
                {row.actions.map((action) => (
                  <button
                    className={`text-blue-500 underline hover:text-blue-600 ${action.textStyles}`}
                    key={action.title}
                    onClick={action.action}
                  >
                    {action.title}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
