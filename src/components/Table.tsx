import { useState, useMemo } from 'react'

import { useServerFn } from '@tanstack/react-start'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

import { useLoggedInUser } from '#/integrations/tanstack-query/root-provider'

import getServerUsers from '#/lib/utils/UserFn/getServerUsers'
import getServerProducts from '#/lib/utils/ProductFn/getServerProducts'
import updateServerAdministrator from '#/lib/utils/UserFn/updateServerAdministrator'
import updateServerProduct from '#/lib/utils/ProductFn/updateServerProduct'

import type { ColumnDef, SortingState } from '@tanstack/react-table'
import type { User, Product } from '#/../generated/prisma/client'

type TableRowByType = { users: User, products: Product }
type TableDataType = keyof TableRowByType
type TableProps<TDataType extends TableDataType> = {
  columns: ColumnDef<TableRowByType[TDataType], any>[]
  dataType: TDataType
  search: string | number
}

export default function Table<TDataType extends TableDataType>({columns, dataType, search }: TableProps<TDataType>) {
  const loggedInUser = useLoggedInUser();
  const queryClient = useQueryClient()

  const getUsers = useServerFn(getServerUsers)
  const getProducts = useServerFn(getServerProducts)
  const updateAdministrator = useServerFn(updateServerAdministrator)
  const updateInventory = useServerFn(updateServerProduct)

  const [sorting, setSorting] = useState<SortingState>([]);
  const sortby = sorting[0]?.id || 'id';
  const direction = sorting[0]?.desc ? 'desc' : 'asc';

  const { data: serverData } = dataType === 'users' 
    ? useQuery({ 
        queryKey: ['users', sortby, direction], 
        queryFn: () => getUsers({ data: { sortby: sortby as 'id' | 'username' | 'email' | 'administrator' | 'created_at', direction } }),
        enabled: dataType === 'users',
      })
    : useQuery({ 
        queryKey: ['products', sortby, direction], 
        queryFn: () => getProducts({ data: { sortby: sortby as 'name' | 'id' | 'created_at' | 'price' | 'inventory', direction } }),
        enabled: dataType === 'products',
      })

  const mutation = (dataType === 'users' 
    ? useMutation({
    mutationFn: (variables: { id: number; administrator: boolean }) =>
      updateAdministrator({ data: variables }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [dataType] })
      },
    })
    : useMutation({
      mutationFn: (variables: { id: number; inventory?: number; price?: string }) =>
        updateInventory({ data: variables }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [dataType] })
        },
      })) as { mutate: (variables: { id: number; administrator?: boolean; inventory?: number; price?: string }) => void };
  
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
      <thead className="grid grid-cols-subgrid col-span-full">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className="grid grid-cols-subgrid col-span-full border border-gray-300 rounded-t-md">
            {headerGroup.headers.map(header => (
              <th key={header.id} className="text-left font-bold text-sm text-gray-800 even:bg-gray-200 odd:bg-gray-300 p-2">
                <div 
                  {...{
                    className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                    onClick: header.column.getToggleSortingHandler(),
                  }} 
                  >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted() as string] ?? null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="grid grid-cols-subgrid col-span-full rounded-b-md">
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="border border-gray-300 grid grid-cols-subgrid col-span-full last:rounded-b-md">
            {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id} 
                  className={`text-left text-sm text-gray-700 odd:bg-gray-50 p-2 
                    ${cell.column.id === 'email' 
                      || cell.column.id === 'username' 
                        ? 'overflow-x-auto' 
                        : ''
                    } 
                    ${(cell.row.original as User).email !== loggedInUser!.email 
                        || (cell.row.original as Product).inventory
                          ? 'flex items-center justify-between' 
                          : ''
                    }
                  `}
                >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                {dataType === 'users' && cell.column.id === 'administrator' && (row.original as User).email !== loggedInUser!.email && (
                  <button
                    className="ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-xs"
                    onClick={() =>
                      mutation.mutate({
                        id: (row.original as User).id,
                        administrator: !(row.original as User).administrator,
                      })
                    }
                  >
                    Switch admin
                  </button>
                )}
                {cell.column.id === 'inventory' || cell.column.id === 'price' ?  (
                  <button
                    tabIndex={1}
                    className={`ml-4 px-2 py-1  text-white rounded  transition-colors text-xs ${(cell.row.original as Product).inventory === 0 ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                    onClick={() => {
                      if (cell.column.id === 'price') {
                        const newPrice = Number(prompt('Adjust price for ' + (row.original as Product).name)?.trim())
                        if (!isNaN(newPrice)) mutation.mutate({
                          id: (row.original as Product).id,
                          price: newPrice.toString(),
                        })
                      } else{
                        const newInventory = Number(prompt('Adjust inventory for ' + (row.original as Product).name)?.trim())
                        if (!isNaN(newInventory)) mutation.mutate({
                          id: (row.original as Product).id,
                          inventory: newInventory,
                        })
                      }
                    }}
                  >
                    Adjust
                  </button>
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}