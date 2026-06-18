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
      <header className="w-full flex flex-col gap-4 justify-start items-start bg-white p-4 rounded-md shadow w-full max-w-4xl mx-auto sm:p-6 lg:p-8">
        <h2 className="text-xl font-bold mb-4">Manage Products</h2>
        <div className="w-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between "> 
          <input 
            className="p-2 border border-gray-300 rounded w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-sm text-gray-700 placeholder-gray-400 focus:placeholder-gray-500" 
            type="text" 
            placeholder="Search products..." 
            value={search} 
            onChange={(e) => setSearch(parseInt(e.target.value) || e.target.value)} 
            />
          <Link to="/dashboard/products/new" className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Product
          </Link>
        </div>
      </header>
      <Table columns={columns} dataType="products" search={search} />
    </>
  )
}
