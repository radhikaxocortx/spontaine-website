import { CustomerPricePlan } from '@/components/Interface/data_interface'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getDisplayDate } from '@/lib/utils'
import { useCallback } from 'react'

interface VerificationRequestsTableProps {
  requests: CustomerPricePlan[]
  onViewClick: (id: number | string) => void
}

const getStatusBadge = (status: string | undefined) => {
  const statusColors = {
    'Not Started': 'bg-gray-100 text-gray-800',
    'In Process': 'bg-yellow-100 text-yellow-800',
    pending: 'bg-yellow-100 text-yellow-800',
    verified: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }
  const currentStatus = status || 'Not Started'
  return (
    <Badge
      className={`${statusColors[currentStatus as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}
    >
      {currentStatus.replace('-', ' ').toUpperCase()}
    </Badge>
  )
}

const VerificationRequestsTable = ({ requests, onViewClick }: VerificationRequestsTableProps) => {
  const handleRowClick = useCallback(
    (id: number | string) => {
      onViewClick(id)
    },
    [onViewClick]
  )

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CUSTOMER</TableHead>
            <TableHead>TELEPHONE</TableHead>
            <TableHead>PRICE PLAN</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>SUBSCRIBED ON</TableHead>
            <TableHead className='text-right'>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow
              key={request.id}
              className='cursor-pointer hover:bg-gray-50'
              onClick={() => handleRowClick(request.id)}
            >
              <TableCell>{request.customer.first_name}</TableCell>
              <TableCell>{request.customer.telephone}</TableCell>
              <TableCell>{request.price_plan.name}</TableCell>
              <TableCell>{getStatusBadge(request.verification_status?.status)}</TableCell>
              <TableCell>{getDisplayDate(request.created_at)}</TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end gap-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRowClick(request.id)
                    }}
                  >
                    View
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default VerificationRequestsTable
