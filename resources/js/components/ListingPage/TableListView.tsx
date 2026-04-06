import { ListItemKeys } from '@/components/ListingPage/ListResourcePage'
import { cn } from '@/utils'

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
  tableWrapperStyles?: string
  tableStyles?: string
}

export default function TableListView<
  U extends keyof T,
  T extends Record<U, string | number | null | undefined> &
    Record<
      'actions',
      { action: () => void; title: string; boxStyles?: string; textStyles?: string }[]
    >,
>({ keys, primaryKey, rows, tableWrapperStyles, tableStyles }: Readonly<Props<U, T>>) {
  return (
    <div className={cn('overflow-x-auto rounded bg-white p-5', tableWrapperStyles)}>
      <table className={cn('min-w-full divide-y divide-spontaine-dark', tableStyles)}>
        <thead>
          <tr>
            {keys.map((key) => (
              <th
                key={key.key as string}
                className='px-4 py-3 text-left text-sm font-semibold text-gray-700'
              >
                {key.label}
              </th>
            ))}
            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-spontaine-dark/30'>
          {rows.map((row) => (
            <tr key={row[primaryKey] as string | number}>
              {keys.map((rowKey) => (
                <td
                  key={rowKey.key as string}
                  className='max-w-[280px] px-4 py-3 text-sm text-gray-700'
                >
                  <span className='break-all'>{(row[rowKey.key] as string) ?? '-'}</span>
                </td>
              ))}
              <td className='px-4 py-3 text-sm'>
                <div className='flex flex-wrap gap-3'>
                  {row.actions.map((action) => (
                    <button
                      key={action.title}
                      onClick={action.action}
                      className={cn(
                        'text-blue-500 underline hover:text-blue-600',
                        action.textStyles
                      )}
                    >
                      {action.title}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={keys.length + 1}
                className='px-4 py-8 text-center text-sm text-gray-500'
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
