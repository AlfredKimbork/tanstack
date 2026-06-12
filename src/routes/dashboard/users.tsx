import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { User } from '../../../generated/prisma/client'
import { createColumnHelper } from '@tanstack/react-table'
import Table from '#/components/tables/Table'

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
      <input 
        type="text" 
        placeholder="Search users..." 
        value={search} 
        onChange={(e) => setSearch(parseInt(e.target.value) || e.target.value)} 
        className="mb-4 p-2 border border-gray-300 rounded" 
      />
      <Table columns={columns} dataType="users" search={search} />
    </>
  )
}
