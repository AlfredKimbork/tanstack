import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { User } from '../../../generated/prisma/client'
import { createColumnHelper } from '@tanstack/react-table'
import Table from '#/components/Table'

export const Route = createFileRoute('/dashboard/users')({
  component: RouteComponent,
})

const columnHelper = createColumnHelper<User>()
const columns = [
  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('username', {
    header: () => 'Username',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: () => 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('administrator', {
    header: () => 'Admin',
    cell: (info) => info.getValue() ? "Yes" : "No",
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
        <h2 className="text-xl font-bold mb-4">Manage Users</h2>
        <input 
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-sm text-gray-700 placeholder-gray-400 focus:placeholder-gray-500" 
          type="text" 
          placeholder="Search users..." 
          value={search} 
          onChange={(e) => setSearch(parseInt(e.target.value) || e.target.value)} 
        />
      </header>
      <Table columns={columns} dataType="users" search={search} />
    </>
  )
}
