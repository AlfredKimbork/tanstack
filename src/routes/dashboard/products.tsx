import { createFileRoute } from '@tanstack/react-router';
import type { Product } from '../../../generated/prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '#/components/tables/Table';
import { useState } from 'react';

export const Route = createFileRoute('/dashboard/products')({
  component: RouteComponent,
})

const columnHelper = createColumnHelper<Product>()
const columns = [
  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: () => 'Price',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('inventory', {
    header: () => 'Inventory',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('created_at', {
    header: () => 'Created At',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
]

function RouteComponent() {
  const [search, setSearch] = useState<number | string>('')
  // product name, price, inventory, edit button, delete button
  return (
    <>
      <input 
          type="text" 
          placeholder="Search products..." 
          value={search} 
          onChange={(e) => setSearch(parseInt(e.target.value) || e.target.value)} 
          className="mb-4 p-2 border border-gray-300 rounded" 
        />
      <Table columns={columns} dataType="products" search={search} />
    </>
  )
}
