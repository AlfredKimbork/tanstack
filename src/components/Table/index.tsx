import { useState, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'

import { useLoggedInUser } from '#/integrations/tanstack-query/root-provider'

import { getServerUsers } from '#/lib/utils/userServerFunctions';
import { getServerProducts } from '#/lib/utils/productServerFunctions';

import type { ColumnDef, SortingState } from '@tanstack/react-table'
import type { User, Product } from '#/../generated/prisma/client'
import Thead from './Thead'
import Trow from './Trow'

export type TableRowByType = { users: User, products: Product }
export type TableDataType = keyof TableRowByType
export type TableProps<TDataType extends TableDataType> = {
  columns: ColumnDef<TableRowByType[TDataType], any>[]
  dataType: TDataType
  search: string | number
}

export default function Table<TDataType extends TableDataType>({columns, dataType, search }: TableProps<TDataType>) {
  const loggedInUser = useLoggedInUser();

  const [sorting, setSorting] = useState<SortingState>([]);
  const sortby = sorting[0]?.id || 'id';
  const direction = sorting[0]?.desc ? 'desc' : 'asc';

  const { data: serverData } = dataType === 'users' 
    ? useQuery({ 
        queryKey: ['users', sortby, direction], 
        queryFn: () => getServerUsers({ data: { sortby: sortby as 'id' | 'username' | 'email' | 'administrator' | 'created_at', direction } }),
        enabled: dataType === 'users',
      })
    : useQuery({ 
        queryKey: ['products', sortby, direction], 
        queryFn: () => getServerProducts({ data: { sortby: sortby as 'name' | 'id' | 'created_at' | 'price' | 'inventory', direction } }),
        enabled: dataType === 'products',
      })

  
  const data = useMemo(() => {
    if (dataType === 'users') {
      const userRows = (serverData ?? []) as User[]

      return typeof search === 'string'
        ? userRows.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()) 
          || user.email.toLowerCase().includes(search.toLowerCase()))
        : userRows.filter((user) => user.id === search)
    } else {
      const productRows = (serverData ?? []) as Product[]

      return typeof search === 'string'
        ? productRows.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
        : productRows.filter((product) => product.id === search)
    }
  }, [dataType, serverData, search]);

  const table = useReactTable({
      data: data as TableRowByType[TDataType][],
      columns: columns as ColumnDef<TableRowByType[TDataType], unknown>[],
      debugTable: true,
      getCoreRowModel: getCoreRowModel(),
      state: {
        sorting,
      },
      onSortingChange: setSorting,
    });

  return (
    <table className="bg-white p-8 rounded-md w-full grid grid-cols-[2rem_repeat(3,auto)_6rem]">
      <Thead table={table as any} />
      <tbody className="grid grid-cols-subgrid col-span-full rounded-b-md">
        {table.getRowModel().rows.map(row => (
          <Trow key={row.id} row={row} dataType={dataType} loggedInUser={loggedInUser} />
        ))}
      </tbody>
    </table>
  )
}