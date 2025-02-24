import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Paginator } from '../../ui/ui_interfaces'

const PaginationComponent = ({ pagination }: { pagination: Paginator<{}> }) => {
  return (
    <div className='flex w-full flex-wrap items-center justify-between gap-y-4 py-2'>
      <p className='mt-auto self-center text-sm text-gray-700'>
        Showing <span className='small-1stop'>{pagination.from}</span> to{' '}
        <span className='small-1stop'>{pagination.to}</span> of {pagination.total}
      </p>
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          {pagination.links[0]?.url && (
            <PaginationItem>
              <PaginationPrevious href={pagination.links[0].url} />
            </PaginationItem>
          )}

          {/* Page Numbers */}
          {pagination.links.slice(1, -1).map((link, index) => {
            if (!link.url) {
              return <PaginationEllipsis key={index} />
            }
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href={link.url}
                  isActive={link.active}
                >
                  {link.label}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          {/* Next Button */}
          {pagination.links[pagination.links.length - 1]?.url && (
            <PaginationItem>
              <PaginationNext href={pagination.links[pagination.links.length - 1].url} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default PaginationComponent
