import { flexRender } from '@tanstack/react-table'
import type { User } from '#/../generated/prisma/client'
import type { LoggedInUser } from '#/integrations/tanstack-query/root-provider'
import type { Row } from '@tanstack/react-table'
import SwitchAdmin from './SwitchAdmin';
import AdjustPrice from './AdjustPrice';

export default function Tdata({row, cell, loggedInUser, dataType} : { row: Row<any>, cell: any, loggedInUser: LoggedInUser, dataType: 'users' | 'products' }) {

  return (
    <td 
      key={cell.id} 
      className={`text-left text-sm text-gray-700 odd:bg-gray-50 p-2 flex items-center justify-between
        ${cell.column.id === 'email' || cell.column.id === 'username' 
          ? 'overflow-x-auto' 
          : ''
        } 
      `}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
      {dataType === 'users' && cell.column.id === 'administrator' && (row.original as User).email !== loggedInUser!.email && (
        <SwitchAdmin row={row} />
      )}
      {cell.column.id === 'inventory' || cell.column.id === 'price' ?  (
        <AdjustPrice cell={cell} row={row} />
      ) : null}
    </td>
  )
}