import { flexRender } from '@tanstack/react-table'
import { useReactTable } from '@tanstack/react-table'
import type { TableRowByType, TableDataType } from '.'

export default function Thead({ table }: { table: ReturnType<typeof useReactTable<TableRowByType[TableDataType]>> }) {
  console.log(table.getHeaderGroups())
  return (
    <thead className="grid grid-cols-subgrid col-span-full rounded-t-md border border-gray-300">
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
  )
}