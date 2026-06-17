import { createFileRoute, Link } from '@tanstack/react-router';
import type { Product } from '#/../generated/prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '#/components/Table';
import { useState } from 'react';


export const Route = createFileRoute('/dashboard/products/')({
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
      <Link to="/dashboard/products/new" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" target="_blank">
        Add Product
      </Link>
    </>
  )
}
