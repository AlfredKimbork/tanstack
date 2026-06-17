import type { LoggedInUser } from '#/integrations/tanstack-query/root-provider'
import type { Row } from '@tanstack/react-table'

import Tdata from './Tdata'

export default function Trow({ row, dataType, loggedInUser }: { row: Row<any>, dataType: 'users' | 'products', loggedInUser: LoggedInUser }) {
  return (
    <tr key={row.id} className="border border-gray-300 grid grid-cols-subgrid col-span-full last:rounded-b-md">
            {row.getVisibleCells().map(cell => (
              <Tdata key={cell.id} row={row} cell={cell} loggedInUser={loggedInUser} dataType={dataType}  />
            ))}
          </tr>
  )
}